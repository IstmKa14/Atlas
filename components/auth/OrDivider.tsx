import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export function OrDivider() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>OR</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e7e5e4",
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#a8a29e",
    letterSpacing: 1.2,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
