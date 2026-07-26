import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView className="flex-1 px-base pt-xl" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-start mb-lg">
          <View>
            <Text className="font-display text-display-md text-ink leading-tight">Good morning,</Text>
            <Text className="font-display text-display-md text-ink leading-tight">Aryan</Text>
            <Text className="font-sans text-body-sm text-body mt-2">Every moment you capture,</Text>
            <Text className="font-sans text-body-sm text-body">becomes a part of your story.</Text>
          </View>
          <View className="h-10 w-10 rounded-full bg-surface-strong overflow-hidden items-center justify-center">
            <Feather name="user" size={20} color="#a8a29e" />
          </View>
        </View>

        {/* Capture Card */}
        <TouchableOpacity className="bg-surface-card rounded-xl p-base flex-row items-center justify-between mb-section shadow-card">
          <View className="flex-row items-center flex-1">
            <View className="h-12 w-12 rounded-full bg-canvas-soft border border-hairline-soft items-center justify-center mr-sm">
              <Feather name="plus" size={24} color="#0c0a09" />
            </View>
            <View className="flex-1 pr-sm">
              <Text className="font-sans-medium text-body-strong text-ink mb-1">Capture a new moment</Text>
              <Text className="font-sans text-caption text-muted">Add photos, notes, or voice and let Atlas remember it.</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#0c0a09" />
        </TouchableOpacity>

        {/* Today Stats */}
        <View className="mb-lg">
          <View className="flex-row justify-between items-center mb-sm">
            <Text className="font-sans-medium text-body-strong text-ink">Today</Text>
            <TouchableOpacity>
              <Text className="font-sans text-caption text-muted">View timeline</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="font-sans-medium text-title-md text-ink">3</Text>
              <Text className="font-sans text-caption text-muted text-center mt-1">Moments</Text>
              <Text className="font-sans text-caption text-muted text-center">Captured</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="font-sans-medium text-title-md text-ink">2</Text>
              <Text className="font-sans text-caption text-muted text-center mt-1">Reflections</Text>
              <Text className="font-sans text-caption text-muted text-center">Generated</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="font-sans-medium text-title-md text-ink">12</Text>
              <Text className="font-sans text-caption text-muted text-center mt-1">Minutes</Text>
              <Text className="font-sans text-caption text-muted text-center">Reflecting</Text>
            </View>
          </View>
        </View>

        {/* Recent Moments */}
        <View className="mb-lg">
          <View className="flex-row justify-between items-center mb-sm">
            <Text className="font-sans-medium text-body-strong text-ink">Recent Moments</Text>
            <TouchableOpacity>
              <Text className="font-sans text-caption text-muted">View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-sm" contentContainerStyle={{ gap: 12 }}>
            <View className="w-32 h-40 bg-surface-strong rounded-xl p-xs justify-end relative overflow-hidden">
              <View className="absolute inset-0 bg-[#f4c5a8] opacity-30" />
              <View className="bg-surface-card/90 rounded p-xs">
                <Text className="font-sans-medium text-caption text-ink">Morning Calm</Text>
                <Text className="font-sans text-[10px] text-muted">Today, 8:15 AM</Text>
              </View>
            </View>
            <View className="w-32 h-40 bg-surface-strong rounded-xl p-xs justify-end relative overflow-hidden">
              <View className="absolute inset-0 bg-canvas-soft" />
              <View className="bg-surface-card/90 rounded p-xs">
                <Text className="font-sans-medium text-caption text-ink">Idea Dump</Text>
                <Text className="font-sans text-[10px] text-muted">Yesterday</Text>
              </View>
            </View>
            <View className="w-32 h-40 bg-surface-strong rounded-xl p-xs justify-end relative overflow-hidden">
              <View className="absolute inset-0 bg-[#a8c8e8] opacity-30" />
              <View className="bg-surface-card/90 rounded p-xs">
                <Text className="font-sans-medium text-caption text-ink">Hike to Peace</Text>
                <Text className="font-sans text-[10px] text-muted">Yesterday</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* AI Insight */}
        <View className="mb-section">
          <View className="flex-row justify-between items-center mb-sm">
            <Text className="font-sans-medium text-body-strong text-ink">From Your AI</Text>
            <TouchableOpacity className="bg-canvas-soft px-sm py-xxs rounded-full border border-hairline">
              <Text className="font-sans text-[10px] text-ink font-medium">Ask Atlas</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#f4c5a8]/20 rounded-xl p-base flex-row shadow-card items-center">
            <View className="h-10 w-10 bg-surface-card rounded-full items-center justify-center shadow-card mr-sm">
              <Feather name="moon" size={20} color="#0c0a09" />
            </View>
            <View className="flex-1">
              <Text className="font-sans text-[10px] text-muted mb-1 uppercase tracking-wider font-semibold">Daily Insight</Text>
              <Text className="font-sans-medium text-body-sm text-ink mb-1">You captured calm moments today.</Text>
              <Text className="font-sans text-caption text-muted">Peace seems to be your theme.</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#0c0a09" className="ml-sm" />
          </View>
        </View>
        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
