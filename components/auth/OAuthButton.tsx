import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform } from "react-native";

export function OAuthButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.oauthBtn}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.oauthIcon}>{icon}</View>
      <Text style={styles.oauthLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  oauthBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e7e5e4",
    height: 56,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  oauthIcon: {
    width: 24,
    alignItems: "center",
    marginRight: 0,
  },
  oauthLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#0c0a09",
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    marginRight: 24,
  },
});
