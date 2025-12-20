import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";

export default function RootLayout() {

  return <PostHogProvider apiKey="phc_lw7avLE9sYgTmocLLe0kpfsUobxSeFyAqDym62Mayah"
    autocapture={true}
    options={{
      host: "https://posthogv2.apessolutionsdev.com",
    }}>
    <Stack />
  </PostHogProvider>;
}
