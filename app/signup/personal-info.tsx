import { SCREEN_NAMES, SIGNUP_CUSTOM_EVENTS } from "@/constants/events";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PersonalInfoPage() {
  const router = useRouter();
  const postHog = usePostHog();

  useEffect(() => {
    postHog.screen(SCREEN_NAMES.SIGNUP_PERSONAL_INFO);
  }, [postHog]);
  
  const handleNext = () => {
    postHog.capture(SIGNUP_CUSTOM_EVENTS.SIGNUP_PERSONAL_INFO_BUTTON_CLICK);
    router.push("/signup/create-account");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
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

