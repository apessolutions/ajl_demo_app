import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

interface FingerprintData {
  ip_address: string;
  width: number;
  timezone: string;
  platform: string;
  custom_parameters: Record<string, string>;
}

interface MatchResponse {
  matched: boolean;
  custom_parameters: Record<string, string> | null;
  fingerprint_id: string | null;
}

interface DeviceFingerprintContextType {
  fingerprintData: FingerprintData | null;
  matchResponse: MatchResponse | null;
  utmParameters: Record<string, string>;
  setUTMParameters: (params: Record<string, string>) => void;
  isLoading: boolean;
  error: string | null;
}

const DeviceFingerprintContext = createContext<DeviceFingerprintContextType | undefined>(undefined);

const FINGERPRINT_SENT_KEY = "@fingerprint_sent";

export function DeviceFingerprintProvider({ children }: { children: React.ReactNode }) {
  const [fingerprintData, setFingerprintData] = useState<FingerprintData | null>(null);
  const [matchResponse, setMatchResponse] = useState<MatchResponse | null>(null);
  const [utmParameters, setUTMParameters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSentFingerprint, setHasSentFingerprint] = useState<boolean>(false);

  // Collect device fingerprint data
  useEffect(() => {
    const collectFingerprint = async () => {
      try {
        setIsLoading(true);

        // Get screen dimensions
        const screenData = Dimensions.get("window");
        const screenWidth = screenData.width;

        // Get timezone
        const calendars = Localization.getCalendars();
        const timezone = calendars[0]?.timeZone || "Unknown";

        // Fetch IP address
        let ipAddress = "Unknown";
        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          ipAddress = data.ip;
        } catch (err) {
          console.error("Error fetching IP address:", err);
        }

        const fingerprint: FingerprintData = {
          ip_address: ipAddress,
          width: Math.round(screenWidth),
          timezone,
          platform: "mobile",
          custom_parameters: utmParameters,
        };

        setFingerprintData(fingerprint);
        setIsLoading(false);
      } catch (err) {
        console.error("Error collecting fingerprint:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };

    collectFingerprint();
  }, [utmParameters]);

  // Check if fingerprint has been sent before
  useEffect(() => {
    const checkFingerprintStatus = async () => {
      try {
        const hasSent = await AsyncStorage.getItem(FINGERPRINT_SENT_KEY);
        setHasSentFingerprint(hasSent === "true");
      } catch (err) {
        console.error("Error checking fingerprint status:", err);
      }
    };

    checkFingerprintStatus();
  }, []);

  // Post fingerprint to endpoint only on first app launch
  useEffect(() => {
    if (fingerprintData && !isLoading && !hasSentFingerprint) {
      const postFingerprint = async () => {
        try {
          console.log("Posting fingerprint data (first launch):", fingerprintData);

          const response = await fetch(
            "https://ajltrack.apessolutionsdev.com/api/v1/fingerprints/match",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fingerprintData),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result: MatchResponse = await response.json();
          console.log("Fingerprint match response:", result);

          // Store the match response
          setMatchResponse(result);

          // Mark fingerprint as sent
          await AsyncStorage.setItem(FINGERPRINT_SENT_KEY, "true");
          setHasSentFingerprint(true);
        } catch (err) {
          console.error("Error posting fingerprint:", err);
          setError(err instanceof Error ? err.message : "Failed to post fingerprint");
        }
      };

      postFingerprint();
    }
  }, [fingerprintData, isLoading, hasSentFingerprint]);

  const value: DeviceFingerprintContextType = {
    fingerprintData,
    matchResponse,
    utmParameters,
    setUTMParameters,
    isLoading,
    error,
  };

  return (
    <DeviceFingerprintContext.Provider value={value}>
      {children}
    </DeviceFingerprintContext.Provider>
  );
}

export function useDeviceFingerprint() {
  const context = useContext(DeviceFingerprintContext);
  if (context === undefined) {
    throw new Error("useDeviceFingerprint must be used within a DeviceFingerprintProvider");
  }
  return context;
}
