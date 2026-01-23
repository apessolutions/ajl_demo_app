import { HOME_CUSTOM_EVENTS, SCREEN_NAMES } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from 'posthog-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, PixelRatio, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';

export default function Index() {
  return (
    <HomeScreen />
  );
}



const HomeScreen = () => {
  const posthog = usePostHog();
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState<string>("Loading...");
  const screenData = Dimensions.get('window');
  const screenWidth = screenData.width;
  const screenHeight = screenData.height;
  const pixelRatio = PixelRatio.get();
  
  // Device information
  const deviceModel = Device.modelName || "Unknown";
  const deviceManufacturer = Device.manufacturer || "Unknown";
  const osType = Device.osName || Platform.OS || "Unknown";
  const osVersion = Device.osVersion || "Unknown";
  const locales = Localization.getLocales();
  const calendars = Localization.getCalendars();
  const timezone = calendars[0]?.timeZone || "Unknown";
  const firstLocale = locales[0];
  const locale = firstLocale ? `${firstLocale.languageCode}${firstLocale.regionCode ? `-${firstLocale.regionCode}` : ''}` : "Unknown";
  const language = firstLocale?.languageCode || "Unknown";
  
  // Get total device memory
  const getTotalMemory = (): string => {
    try {
      // Check if totalMemory is available (it may not be on all platforms)
      if (Device.totalMemory != null && Device.totalMemory > 0) {
        const memoryInGB = Device.totalMemory / (1024 * 1024 * 1024);
        if (memoryInGB >= 1) {
          return `${memoryInGB.toFixed(2)} GB`;
        } else {
          const memoryInMB = Device.totalMemory / (1024 * 1024);
          return `${memoryInMB.toFixed(0)} MB`;
        }
      }
      return "N/A";
    } catch (error) {
      console.error("Error getting device memory:", error);
      return "N/A";
    }
  };
  
  const totalMemory = getTotalMemory();

  useEffect(() => {
    posthog.screen(SCREEN_NAMES.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setIpAddress("Unable to fetch IP");
      }
    };

    fetchIpAddress();
  }, []);

  const handleSignUp = () => {
    posthog.capture(HOME_CUSTOM_EVENTS.SIGNUP_BUTTON_CLICK);
    router.push("/signup/personal-info");
  };

  const handleLogin = () => {
    posthog.capture(HOME_CUSTOM_EVENTS.LOGIN_BUTTON_CLICK);
  };

  const handleCashJameel = () => {
    posthog.capture(HOME_CUSTOM_EVENTS.CASH_JAMEEL_BUTTON_CLICK);
    router.push("/cash-jameel/welcome");
  };

  const infoItems = [
    { label: "IP", value: ipAddress },
    { label: "Width", value: `${screenWidth}px` },
    { label: "Height", value: `${screenHeight}px` },
    { label: "Ratio", value: pixelRatio.toString() },
    { label: "Model", value: deviceModel },
    { label: "Brand", value: deviceManufacturer },
    { label: "OS", value: osType },
    { label: "OS Ver", value: osVersion },
    { label: "TZ", value: timezone },
    { label: "Lang", value: language },
    { label: "Locale", value: locale },
    { label: "Memory", value: totalMemory },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {infoItems.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCashJameel}>
          <Text style={styles.buttonText}>Cash Jameel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  infoItem: {
    flex: 1,
    minWidth: "30%",
    maxWidth: "48%",
    padding: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    margin: 2,
  },
  infoLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "left",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});