import React from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";

const ORB = 300;

interface OrbLayerProps {
  variant?: "login" | "signup";
}

export function OrbLayer({ variant = "login" }: OrbLayerProps) {
  const isLogin = variant === "login";

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View
        style={[
          styles.orb,
          isLogin ? styles.orbTopRightLogin : styles.orbTopRightSignup,
        ]}
      />
      <View
        style={[
          styles.orb,
          isLogin ? styles.orbLeftCenterLogin : styles.orbLeftCenterSignup,
        ]}
      />
      <View
        style={[
          styles.orb,
          isLogin ? styles.orbBottomRightLogin : styles.orbBottomRightSignup,
        ]}
      />
      <View
        style={[
          styles.orb,
          isLogin ? styles.orbBottomLeftLogin : styles.orbBottomLeftSignup,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: "absolute",
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
  },
  // Login Variants
  orbTopRightLogin: {
    backgroundColor: "#f4c5a8",
    top: -ORB * 0.3,
    right: -ORB * 0.3,
    opacity: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: "#f4c5a8",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.55,
        shadowRadius: 80,
      },
    }),
  },
  orbLeftCenterLogin: {
    backgroundColor: "#a7e5d3",
    top: "35%",
    left: -ORB * 0.45,
    opacity: 0.4,
  },
  orbBottomRightLogin: {
    backgroundColor: "#c8b8e0",
    bottom: -ORB * 0.35,
    right: -ORB * 0.35,
    opacity: 0.45,
  },
  orbBottomLeftLogin: {
    backgroundColor: "#e8b8c4",
    bottom: -ORB * 0.45,
    left: -ORB * 0.4,
    opacity: 0.3,
  },

  // Signup Variants (Slightly smaller ORB in signup.tsx but we'll adapt by just using the same ORB size, just different colors)
  orbTopRightSignup: {
    backgroundColor: "#a8c8e8", // sky
    top: -ORB * 0.3,
    right: -ORB * 0.3,
    opacity: 0.48,
    ...Platform.select({
      ios: {
        shadowColor: "#a8c8e8",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 70,
      },
    }),
  },
  orbLeftCenterSignup: {
    backgroundColor: "#a7e5d3", // mint
    top: "25%",
    left: -ORB * 0.45,
    opacity: 0.38,
  },
  orbBottomRightSignup: {
    backgroundColor: "#c8b8e0", // lavender
    bottom: -ORB * 0.35,
    right: -ORB * 0.3,
    opacity: 0.42,
  },
  orbBottomLeftSignup: {
    backgroundColor: "#f4c5a8", // peach
    bottom: -ORB * 0.4,
    left: -ORB * 0.4,
    opacity: 0.28,
  },
});
