import { Redirect } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

/**
 * Root entry — redirects to the onboarding flow or tabs based on auth state.
 */
export default function Root() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/onboarding" />;
}
