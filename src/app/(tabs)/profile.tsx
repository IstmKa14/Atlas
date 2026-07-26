import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-canvas items-center justify-center">
      <Text className="font-display text-title-md text-ink">Profile (Me)</Text>
    </SafeAreaView>
  );
}
