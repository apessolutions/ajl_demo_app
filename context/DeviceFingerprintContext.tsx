import React, { createContext, useContext, useEffect, useState } from "react";
import { Dimensions, PixelRatio, Platform } from "react-native";
import * as Device from "expo-device";
import * as Localization from "expo-localization";

interface FingerprintData {
  ip_address: string;
  width: number;
  height: number;
  timezone: string;
  model: string;
  os_version: string;
  platform: string;
  custom_parameters: Record<string, string>;
}

interface DeviceFingerprintContextType {
  fingerprintData: FingerprintData | null;
  utmParameters: Record<string, string>;
  setUTMParameters: (params: Record<string, string>) => void;
  isLoading: boolean;
  error: string | null;
}

const DeviceFingerprintContext = createContext<DeviceFingerprintContextType | undefined>(undefined);

export function DeviceFingerprintProvider({ children }: { children: React.ReactNode }) {
  const [fingerprintData, setFingerprintData] = useState<FingerprintData | null>(null);
  const [utmParameters, setUTMParameters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Collect device fingerprint data
  useEffect(() => {
    const collectFingerprint = async () => {
      try {
        setIsLoading(true);

        // Get screen dimensions
        const screenData = Dimensions.get("window");
        const screenWidth = screenData.width;
        const screenHeight = screenData.height;

        // Get timezone
        const calendars = Localization.getCalendars();
        const timezone = calendars[0]?.timeZone || "Unknown";

        // Get device model
        const deviceModel = Device.modelName || "Unknown";

        // Get OS version
        const osVersion = Device.osVersion || "Unknown";

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
          height: Math.round(screenHeight),
          timezone,
          model: deviceModel,
          os_version: osVersion,
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

  // Post fingerprint to endpoint
  useEffect(() => {
    if (fingerprintData && !isLoading) {
      const postFingerprint = async () => {
        try {
          console.log("Posting fingerprint data:", fingerprintData);

          const response = await fetch(
            "https://ajltrack.apessolutionsdev.com/api/v1/fingerprints",
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

          const result = await response.json();
          console.log("Fingerprint posted successfully:", result);
        } catch (err) {
          console.error("Error posting fingerprint:", err);
          setError(err instanceof Error ? err.message : "Failed to post fingerprint");
        }
      };

      postFingerprint();
    }
  }, [fingerprintData, isLoading]);

  const value: DeviceFingerprintContextType = {
    fingerprintData,
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
