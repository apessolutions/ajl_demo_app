import { SCREEN_NAMES, SIGNUP_CUSTOM_EVENTS } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ThankYouPage() {
  const router = useRouter();
  const postHog = usePostHog();
  
  useEffect(() => {
    postHog.screen(SCREEN_NAMES.SIGNUP_THANK_YOU);
    postHog.capture(SIGNUP_CUSTOM_EVENTS.SIGNUP_THANK_YOU_PAGE_VIEW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSignIn = () => {
    postHog.capture(SIGNUP_CUSTOM_EVENTS.SIGNUP_LOGIN_BUTTON_CLICK);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You</Text>
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

