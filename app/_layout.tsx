import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { PostHogProvider, usePostHog } from "posthog-react-native";
import { useEffect, useRef } from "react";

// Component to handle deep linking and UTM tracking
function DeepLinkHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const posthog = usePostHog();
  const hasProcessedInitialUrl = useRef(false);

  // Extract UTM parameters from query params
  const extractUTMParams = (queryParams: Record<string, any> | null | undefined) => {
    if (!queryParams) return {};

    const utmParams: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmKeys.forEach(key => {
      if (queryParams[key]) {
        utmParams[key] = String(queryParams[key]);
      }
    });

    return utmParams;
  };

  // Register UTM parameters as super properties in PostHog
  const registerUTMParams = (utmParams: Record<string, string>) => {
    if (Object.keys(utmParams).length > 0) {
      console.log("Registering UTM parameters:", utmParams);

      // Register as super properties (will be included in all events)
      posthog?.register(utmParams);

      // Also capture a specific event for attribution tracking
      posthog?.capture('app_opened_with_utm', utmParams);
    }
  };

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const data = Linking.parse(event.url);
      console.log("Deep link received:", data);

      // Extract and register UTM parameters
      const utmParams = extractUTMParams(data.queryParams);
      registerUTMParams(utmParams);

      // Handle both custom scheme (ajl://) and universal links (https://)
      if (data.path) {
        // Navigate to the path from the deep link
        router.push(data.path as any);
      }
    };

    // Get the initial URL if the app was opened via a link
    Linking.getInitialURL().then((url) => {
      if (url && !hasProcessedInitialUrl.current) {
        hasProcessedInitialUrl.current = true;
        const data = Linking.parse(url);
        console.log("Initial URL:", data);

        // Extract and register UTM parameters
        const utmParams = extractUTMParams(data.queryParams);
        registerUTMParams(utmParams);

        // Handle initial navigation
        if (data.path) {
          router.push(data.path as any);
        }
      }
    });

    // Listen for incoming links while the app is open
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [router, posthog]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <PostHogProvider
      apiKey="phc_lw7avLE9sYgTmocLLe0kpfsUobxSeFyAqDym62Mayah"
      autocapture={true}
      options={{
        host: "https://posthogv2.apessolutionsdev.com",
      }}
    >
      <DeepLinkHandler>
        <Stack />
      </DeepLinkHandler>
    </PostHogProvider>
  );
}
