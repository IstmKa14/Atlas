import { Redirect } from "expo-router";

/**
 * Root entry — redirects to the onboarding flow.
 * Once auth is implemented, this will conditionally redirect
 * to the authenticated home screen instead.
 */
export default function Root() {
  return <Redirect href="/onboarding" />;
}
