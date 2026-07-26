import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export function AtlasLogo() {
  return (
    <View style={styles.logoBlock}>
      <View style={styles.glyphWrapper}>
        <View style={styles.glyphOrb} />
        <Text style={styles.glyphA}>A</Text>
      </View>
      <View style={styles.wavesRow}>
        <Text style={styles.waveGlyph}>{"~  ~  ~"}</Text>
      </View>
      <Text style={styles.brandName}>ATLAS</Text>
      <Text style={styles.brandTagline}>Your life, beautifully remembered.</Text>
    </View>
  );
}

export function CompactLogo() {
  return (
    <View style={styles.logoBlockCompact}>
      <View style={styles.glyphWrapperCompact}>
        <View style={styles.glyphOrbCompact} />
        <Text style={styles.glyphACompact}>A</Text>
      </View>
      <Text style={styles.brandNameCompact}>ATLAS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoBlock: {
    alignItems: "center",
    marginBottom: 28,
  },
  glyphWrapper: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  glyphOrb: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f0d8cc",
    right: 12,
    top: 12,
    opacity: 0.9,
    ...Platform.select({
      ios: {
        shadowColor: "#a7e5d3",
        shadowOffset: { width: -14, height: 8 },
        shadowOpacity: 0.75,
        shadowRadius: 28,
      },
    }),
  },
  glyphA: {
    fontSize: 110,
    fontWeight: "700",
    color: "#0c0a09",
    lineHeight: 120,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  wavesRow: {
    marginBottom: 12,
    opacity: 0.3,
  },
  waveGlyph: {
    fontSize: 16,
    color: "#777169",
    letterSpacing: 6,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "300",
    letterSpacing: 11,
    color: "#0c0a09",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 8,
  },
  brandTagline: {
    fontSize: 14,
    fontWeight: "400",
    color: "#777169",
    letterSpacing: 0.3,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  logoBlockCompact: {
    alignItems: "center",
    marginBottom: 20,
  },
  glyphWrapperCompact: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  glyphOrbCompact: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0d8cc",
    right: 8,
    top: 8,
    opacity: 0.9,
    ...Platform.select({
      ios: {
        shadowColor: "#a7e5d3",
        shadowOffset: { width: -10, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 20,
      },
    }),
  },
  glyphACompact: {
    fontSize: 76,
    fontWeight: "700",
    color: "#0c0a09",
    lineHeight: 82,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  brandNameCompact: {
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 10,
    color: "#0c0a09",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
});
