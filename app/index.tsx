import { HOME_CUSTOM_EVENTS, SCREEN_NAMES } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from 'posthog-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <HomeScreen />
  );
}



const HomeScreen = () => {
  const posthog = usePostHog();
  const router = useRouter();

  useEffect(() => {
    posthog.screen(SCREEN_NAMES.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleDeviceStats = () => {
    router.push("/device-stats");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AJL App</Text>
        <Pressable style={styles.statsButton} onPress={handleDeviceStats}>
          <Text style={styles.statsButtonText}>ⓘ</Text>
        </Pressable>
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
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  statsButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
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