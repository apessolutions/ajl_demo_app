import { CASH_JAMEEL_CUSTOM_EVENTS, SCREEN_NAMES } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const options = {
  title: "Welcome",
};

export default function CashJameelWelcomePage() {
  const router = useRouter();
  const postHog = usePostHog();

  useEffect(() => {
    postHog.screen(SCREEN_NAMES.CASH_JAMEEL_WELCOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLetsGo = () => {
    postHog.capture(CASH_JAMEEL_CUSTOM_EVENTS.CASH_JAMEEL_LETS_GO_BUTTON_CLICK);
    router.push("/cash-jameel/cash-financing");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Pressable style={styles.button} onPress={handleLetsGo}>
        <Text style={styles.buttonText}>Let&apos;s Go</Text>
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

