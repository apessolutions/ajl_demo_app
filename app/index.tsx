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

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
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