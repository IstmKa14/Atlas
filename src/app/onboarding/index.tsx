import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Slide data ──────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "splash" },
  { id: "welcome" },
  { id: "capture" },
  { id: "reflect" },
] as const;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      setActiveIndex(idx);
    },
    []
  );

  const goToNext = useCallback(() => {
    const next = activeIndex + 1;
    if (next < SLIDES.length) {
      scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
      setActiveIndex(next);
    } else {
      // TODO: replace with auth route once auth screens are created
      router.replace("/");
    }
  }, [activeIndex, router]);

  const goToSignIn = useCallback(() => {
    // TODO: replace with auth route once auth screens are created
    router.replace("/");
  }, [router]);

  const skip = useCallback(() => {
    // TODO: replace with auth route once auth screens are created
    router.replace("/");
  }, [router]);

  const isSplash = activeIndex === 0;
  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Atmospheric background orbs — rendered once, always visible */}
      <OrbLayer />

      {/* Skip button — hidden on splash */}
      {!isSplash && (
        <TouchableOpacity
          style={[styles.skipBtn, { top: insets.top + 12 }]}
          onPress={skip}
          activeOpacity={0.6}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        style={styles.scrollView}
      >
        <SlideSplash width={SCREEN_WIDTH} />
        <SlideWelcome width={SCREEN_WIDTH} />
        <SlideCapture width={SCREEN_WIDTH} />
        <SlideReflect width={SCREEN_WIDTH} />
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
      >
        {/* Dot indicators */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={isSplash ? goToNext : isLast ? goToSignIn : goToNext}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>
            {isSplash ? "Get Started" : isLast ? "Begin Your Journey" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Sign in link — only on splash */}
        {isSplash && (
          <View style={styles.signInRow}>
            <Text style={styles.signInLabel}>Already have an account? </Text>
            <TouchableOpacity onPress={goToSignIn} activeOpacity={0.6}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Atmospheric orb layer ────────────────────────────────────────────────────

function OrbLayer() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Top-right peach orb */}
      <View style={[styles.orb, styles.orbTopRight]} />
      {/* Left-center mint orb */}
      <View style={[styles.orb, styles.orbLeftCenter]} />
      {/* Bottom-right lavender orb */}
      <View style={[styles.orb, styles.orbBottomRight]} />
      {/* Bottom-left rose orb */}
      <View style={[styles.orb, styles.orbBottomLeft]} />
    </View>
  );
}

// ─── Slide 0 — Splash / Brand ─────────────────────────────────────────────────

function SlideSplash({ width }: { width: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      {/* Logo lockup */}
      <View style={styles.logoContainer}>
        {/* Atlas "A" glyph — large serif letter with gradient orb */}
        <View style={styles.glyphWrapper}>
          <View style={styles.glyphOrb} />
          <Text style={styles.glyphA}>A</Text>
        </View>

        {/* Wave decoration */}
        <View style={styles.wavesRow}>
          <Text style={styles.waveText}>〜〜〜〜〜〜〜〜〜〜〜</Text>
        </View>

        {/* Brand name */}
        <Text style={styles.brandName}>A T L A S</Text>
        <Text style={styles.brandTagline}>Your life, beautifully remembered.</Text>
      </View>
    </View>
  );
}

// ─── Slide 1 — Welcome / Features ────────────────────────────────────────────

function SlideWelcome({ width }: { width: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.welcomeContent}>
        {/* Eyebrow */}
        <Text style={styles.eyebrow}>WELCOME TO ATLAS</Text>

        {/* Headline */}
        <Text style={styles.displayHeadline}>
          Your life,{"\n"}beautifully{"\n"}remembered.
        </Text>

        {/* Sub-text */}
        <Text style={styles.bodyText}>
          Atlas helps you capture moments, reflect with AI, and rediscover the
          story of your life.
        </Text>

        {/* Feature cards */}
        <View style={styles.featureCards}>
          <FeatureCard
            icon="📷"
            iconBg="#e8f7f2"
            title="Capture Moments"
            description="Save photos, notes, places and memories that matter."
          />
          <FeatureCard
            icon="✦"
            iconBg="#fce9e0"
            title="AI Reflections"
            description="Get beautiful daily, weekly and monthly insights."
          />
          <FeatureCard
            icon="📅"
            iconBg="#ede9f5"
            title="Rediscover & Relive"
            description="Explore your timeline, revisit moments, and see how far you've come."
          />
        </View>
      </View>
    </View>
  );
}

// ─── Slide 2 — Capture ───────────────────────────────────────────────────────

function SlideCapture({ width }: { width: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.centeredSlideContent}>
        <View style={[styles.bigIcon, { backgroundColor: "#e8f7f2" }]}>
          <Text style={styles.bigIconText}>📷</Text>
        </View>
        <Text style={styles.slideEyebrow}>MOMENTS</Text>
        <Text style={styles.slideHeadline}>
          Capture every{"\n"}beautiful detail.
        </Text>
        <Text style={styles.slideBody}>
          Add photos, voice notes, locations, and written reflections.
          Nothing slips through the cracks.
        </Text>
      </View>
    </View>
  );
}

// ─── Slide 3 — Reflect ───────────────────────────────────────────────────────

function SlideReflect({ width }: { width: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.centeredSlideContent}>
        <View style={[styles.bigIcon, { backgroundColor: "#fce9e0" }]}>
          <Text style={styles.bigIconText}>✦</Text>
        </View>
        <Text style={styles.slideEyebrow}>AI REFLECTIONS</Text>
        <Text style={styles.slideHeadline}>
          Your story,{"\n"}seen clearly.
        </Text>
        <Text style={styles.slideBody}>
          Atlas weaves your memories into weekly and monthly AI summaries
          that help you see the bigger picture.
        </Text>
      </View>
    </View>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconBg, title, description }: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIconWrap, { backgroundColor: iconBg }]}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>
      <View style={styles.featureCardText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{description}</Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ORB_SIZE = SCREEN_WIDTH * 0.75;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // ── Atmospheric orbs ────────────────────────────────
  orb: {
    position: "absolute",
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    opacity: 0.55,
  },
  orbTopRight: {
    // Peach orb — top-right corner
    backgroundColor: "#f4c5a8",
    top: -ORB_SIZE * 0.3,
    right: -ORB_SIZE * 0.25,
    // Soft radial falloff via shadow on iOS, just color on Android
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#f4c5a8",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 80,
        }
      : {}),
  },
  orbLeftCenter: {
    // Mint orb — left side, mid-screen
    backgroundColor: "#a7e5d3",
    top: "30%",
    left: -ORB_SIZE * 0.45,
  },
  orbBottomRight: {
    // Lavender orb — bottom-right
    backgroundColor: "#c8b8e0",
    bottom: -ORB_SIZE * 0.35,
    right: -ORB_SIZE * 0.3,
  },
  orbBottomLeft: {
    // Rose orb — bottom-left
    backgroundColor: "#e8b8c4",
    bottom: -ORB_SIZE * 0.5,
    left: -ORB_SIZE * 0.45,
    opacity: 0.35,
  },

  // ── Skip ────────────────────────────────────────────
  skipBtn: {
    position: "absolute",
    right: 20,
    zIndex: 10,
    backgroundColor: "#ffffff",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e7e5e4",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#292524",
    letterSpacing: 0,
  },

  // ── Scroll / Slides ─────────────────────────────────
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  // ── Splash slide ────────────────────────────────────
  logoContainer: {
    alignItems: "center",
    marginTop: -40,
  },
  glyphWrapper: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  glyphOrb: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f0d8cc",
    right: 10,
    top: 15,
    opacity: 0.85,
    // Soft blend via layered gradient simulation
    shadowColor: "#a7e5d3",
    shadowOffset: { width: -20, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  glyphA: {
    fontSize: 130,
    fontWeight: "700",
    color: "#0c0a09",
    lineHeight: 140,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  wavesRow: {
    marginTop: 4,
    marginBottom: 20,
    opacity: 0.35,
  },
  waveText: {
    fontSize: 13,
    color: "#777169",
    letterSpacing: 2,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "300",
    letterSpacing: 12,
    color: "#0c0a09",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 12,
  },
  brandTagline: {
    fontSize: 15,
    fontWeight: "400",
    color: "#777169",
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Welcome slide ───────────────────────────────────
  welcomeContent: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 80,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2.5,
    color: "#777169",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  displayHeadline: {
    fontSize: 40,
    fontWeight: "300",
    color: "#0c0a09",
    lineHeight: 48,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#4e4e4e",
    lineHeight: 24,
    letterSpacing: 0.16,
    marginBottom: 32,
  },
  featureCards: {
    gap: 12,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e7e5e4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  featureIcon: {
    fontSize: 22,
  },
  featureCardText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0c0a09",
    marginBottom: 3,
    letterSpacing: 0,
  },
  featureDesc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#4e4e4e",
    lineHeight: 20,
    letterSpacing: 0,
  },

  // ── Inner slides (3 & 4) ─────────────────────────────
  centeredSlideContent: {
    alignItems: "flex-start",
    paddingTop: 80,
  },
  bigIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  bigIconText: {
    fontSize: 34,
  },
  slideEyebrow: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2.5,
    color: "#777169",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  slideHeadline: {
    fontSize: 40,
    fontWeight: "300",
    color: "#0c0a09",
    lineHeight: 48,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 16,
  },
  slideBody: {
    fontSize: 16,
    fontWeight: "400",
    color: "#4e4e4e",
    lineHeight: 26,
    letterSpacing: 0.16,
  },

  // ── Footer ───────────────────────────────────────────
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "transparent",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 9999,
    backgroundColor: "#d6d3d1",
  },
  dotActive: {
    backgroundColor: "#292524",
    width: 20,
  },
  primaryBtn: {
    backgroundColor: "#0c0a09",
    borderRadius: 9999,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#0c0a09",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  signInLabel: {
    fontSize: 14,
    color: "#777169",
    fontWeight: "400",
  },
  signInLink: {
    fontSize: 14,
    color: "#0c0a09",
    fontWeight: "600",
  },
});
