import { CASH_JAMEEL_CUSTOM_EVENTS, SCREEN_NAMES } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CashFinancingPage() {
  const router = useRouter();
  const postHog = usePostHog();

  useEffect(() => {
    postHog.screen(SCREEN_NAMES.CASH_JAMEEL_CASH_FINANCING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    postHog.capture(CASH_JAMEEL_CUSTOM_EVENTS.CASH_JAMEEL_CASH_FINANCING_NEXT_CLICK);
    router.push("/cash-jameel/apply");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash Financing</Text>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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

