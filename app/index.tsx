import { PostHogProvider, usePostHog } from 'posthog-react-native';
import { useEffect } from 'react';
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <PostHogProvider apiKey="phc_lw7avLE9sYgTmocLLe0kpfsUobxSeFyAqDym62Mayah"
      autocapture={true}
      options={{
        host: "https://posthogv2.apessolutionsdev.com",
      }}>
      <HomeScreen />
    </PostHogProvider>
  );
}



const HomeScreen = () => {
  const posthog = usePostHog();
  useEffect(() => {
    posthog.screen("Home");
  }, [posthog]);
  const handleClick = () => {
    posthog.capture("Button clicked", { screen: "Home" });
    console.log("Button clicked!");
  };

  return <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Pressable onPress={handleClick}>
      <Text>Edit app/index.tsx to edit this screen</Text>
    </Pressable>
  </View>;
}