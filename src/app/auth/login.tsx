import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  canvas: "#f5f5f5",
  ink: "#0c0a09",
  primary: "#292524",
  body: "#4e4e4e",
  muted: "#777169",
  mutedSoft: "#a8a29e",
  hairline: "#e7e5e4",
  hairlineStrong: "#d6d3d1",
  surfaceCard: "#ffffff",
  surfaceStrong: "#f0efed",
  error: "#dc2626",
  orbPeach: "#f4c5a8",
  orbMint: "#a7e5d3",
  orbLavender: "#c8b8e0",
  orbRose: "#e8b8c4",
} as const;

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const validateEmail = useCallback((value: string): boolean => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setEmailError(ok ? "" : "Enter a valid email address.");
    return ok;
  }, []);

  const validatePassword = useCallback((value: string): boolean => {
    const ok = value.length >= 6;
    setPasswordError(ok ? "" : "Password must be at least 6 characters.");
    return ok;
  }, []);

  const handleSignIn = useCallback(async () => {
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);
    if (!emailOk || !passOk) return;

    setIsLoading(true);
    // TODO: wire to auth provider
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.replace("/");
  }, [email, password, validateEmail, validatePassword, router]);

  const handleGoogleSignIn = useCallback(async () => {
    // TODO: wire to Google OAuth
  }, []);

  const handleAppleSignIn = useCallback(async () => {
    // TODO: wire to Apple Sign In
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <OrbLayer />

      {/* Back button */}
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={() => router.back()}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.6}
      >
        <SymbolView
          name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
          size={18}
          tintColor={COLORS.ink}
          weight="medium"
        />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 64, paddingBottom: Math.max(insets.bottom, 32) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Brand mark ─────────────────────────────────── */}
          <AtlasLogo />

          {/* ── Heading ────────────────────────────────────── */}
          <View style={styles.headingBlock}>
            <Text style={styles.headlineText}>Welcome back</Text>
            <Text style={styles.subheadText}>Sign in to continue your journey</Text>
          </View>

          {/* ── OAuth buttons ──────────────────────────────── */}
          <View style={styles.oauthBlock}>
            <OAuthButton
              icon={<GoogleIcon />}
              label="Continue with Google"
              onPress={handleGoogleSignIn}
            />
            <OAuthButton
              icon={
                <SymbolView
                  name={{ ios: "applelogo", android: "phone_iphone", web: "phone_iphone" }}
                  size={18}
                  tintColor={COLORS.ink}
                  weight="medium"
                />
              }
              label="Continue with Apple"
              onPress={handleAppleSignIn}
            />
          </View>

          {/* ── Divider ─────────────────────────────────────── */}
          <OrDivider />

          {/* ── Form ────────────────────────────────────────── */}
          <View style={styles.formBlock}>
            <FormField
              label="Email"
              value={email}
              onChangeText={(t) => { setEmail(t); if (emailError) setEmailError(""); }}
              onBlur={() => email && validateEmail(email)}
              onFocus={() => setEmailFocused(true)}
              onSubmitEditing={() => passwordRef.current?.focus()}
              isFocused={emailFocused}
              error={emailError}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              ref={emailRef}
              trailingIcon={
                <SymbolView
                  name={{ ios: "envelope", android: "email", web: "email" }}
                  size={17}
                  tintColor={emailError ? COLORS.error : COLORS.mutedSoft}
                  weight="regular"
                />
              }
            />

            <FormField
              label="Password"
              value={password}
              onChangeText={(t) => { setPassword(t); if (passwordError) setPasswordError(""); }}
              onBlur={() => password && validatePassword(password)}
              onFocus={() => setPasswordFocused(true)}
              onSubmitEditing={handleSignIn}
              isFocused={passwordFocused}
              error={passwordError}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              autoComplete="password"
              returnKeyType="done"
              ref={passwordRef}
              trailingIcon={
                <TouchableOpacity
                  onPress={() => setPasswordVisible((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.6}
                >
                  <SymbolView
                    name={
                      passwordVisible
                        ? { ios: "eye.slash", android: "visibility_off", web: "visibility_off" }
                        : { ios: "eye", android: "visibility", web: "visibility" }
                    }
                    size={17}
                    tintColor={COLORS.mutedSoft}
                    weight="regular"
                  />
                </TouchableOpacity>
              }
            />

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotRow}
              activeOpacity={0.6}
              onPress={() => {/* TODO: forgot password */}}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* ── Primary CTA ─────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.primaryBtnLoading]}
            onPress={handleSignIn}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.primaryBtnText}>Sign in</Text>
            )}
          </TouchableOpacity>

        
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Don&apos;t have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.push("/auth/signup")}
            >
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Atlas Logo mark ──────────────────────────────────────────────────────────

function AtlasLogo() {
  return (
    <View style={styles.logoBlock}>
      {/* The "A" with the gradient orb behind it */}
      <View style={styles.glyphWrapper}>
        <View style={styles.glyphOrb} />
        <Text style={styles.glyphA}>A</Text>
      </View>
      {/* Wave decoration */}
      <View style={styles.wavesRow}>
        <Text style={styles.waveGlyph}>{"~  ~  ~"}</Text>
      </View>
      <Text style={styles.brandName}>ATLAS</Text>
      <Text style={styles.brandTagline}>Your life, beautifully remembered.</Text>
    </View>
  );
}

// ─── OAuth Button ─────────────────────────────────────────────────────────────

interface OAuthButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function OAuthButton({ icon, label, onPress }: OAuthButtonProps) {
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

// ─── Google icon (painted to match the real logo) ─────────────────────────────

function GoogleIcon() {
  return (
    <View style={styles.googleIconWrap}>
      <SymbolView
        name={{ ios: "g.circle.fill", android: "account_circle", web: "account_circle" }}
        size={20}
        tintColor="#4285F4"
        weight="regular"
      />
    </View>
  );
}

// ─── OR Divider ───────────────────────────────────────────────────────────────

function OrDivider() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>OR</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  isFocused?: boolean;
  error?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences";
  autoComplete?: "email" | "password";
  returnKeyType?: "next" | "done";
  trailingIcon?: React.ReactNode;
}

const FormField = React.forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      value,
      onChangeText,
      onBlur,
      onFocus,
      onSubmitEditing,
      isFocused,
      error,
      placeholder,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      autoComplete,
      returnKeyType,
      trailingIcon,
    },
    ref
  ) => {
    const hasError = Boolean(error);
    return (
      <View style={styles.fieldWrapper}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View
          style={[
            styles.fieldInputRow,
            isFocused && styles.fieldInputFocused,
            hasError && styles.fieldInputError,
          ]}
        >
          <TextInput
            ref={ref}
            style={styles.fieldInput}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={COLORS.mutedSoft}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            autoComplete={autoComplete}
            returnKeyType={returnKeyType}
            blurOnSubmit={returnKeyType === "done"}
          />
          {trailingIcon && (
            <View style={styles.fieldTrailing}>{trailingIcon}</View>
          )}
        </View>
        {hasError && (
          <Text style={styles.fieldError}>{error}</Text>
        )}
      </View>
    );
  }
);

FormField.displayName = "FormField";

// ─── Orb layer ────────────────────────────────────────────────────────────────

function OrbLayer() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.orb, styles.orbTopRight]} />
      <View style={[styles.orb, styles.orbLeftCenter]} />
      <View style={[styles.orb, styles.orbBottomRight]} />
      <View style={[styles.orb, styles.orbBottomLeft]} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ORB = 300;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.canvas,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },

  // ── Back button ─────────────────────────────────────
  backBtn: {
    position: "absolute",
    left: 20,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Orbs ────────────────────────────────────────────
  orb: {
    position: "absolute",
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
    opacity: 0.5,
  },
  orbTopRight: {
    backgroundColor: COLORS.orbPeach,
    top: -ORB * 0.3,
    right: -ORB * 0.3,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.orbPeach,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.55,
        shadowRadius: 80,
      },
    }),
  },
  orbLeftCenter: {
    backgroundColor: COLORS.orbMint,
    top: "35%",
    left: -ORB * 0.45,
    opacity: 0.4,
  },
  orbBottomRight: {
    backgroundColor: COLORS.orbLavender,
    bottom: -ORB * 0.35,
    right: -ORB * 0.35,
    opacity: 0.45,
  },
  orbBottomLeft: {
    backgroundColor: COLORS.orbRose,
    bottom: -ORB * 0.45,
    left: -ORB * 0.4,
    opacity: 0.3,
  },

  // ── Logo mark ────────────────────────────────────────
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
        shadowColor: COLORS.orbMint,
        shadowOffset: { width: -14, height: 8 },
        shadowOpacity: 0.75,
        shadowRadius: 28,
      },
    }),
  },
  glyphA: {
    fontSize: 110,
    fontWeight: "700",
    color: COLORS.ink,
    lineHeight: 120,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  wavesRow: {
    marginBottom: 12,
    opacity: 0.3,
  },
  waveGlyph: {
    fontSize: 16,
    color: COLORS.muted,
    letterSpacing: 6,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "300",
    letterSpacing: 11,
    color: COLORS.ink,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 8,
  },
  brandTagline: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.muted,
    letterSpacing: 0.3,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Heading ──────────────────────────────────────────
  headingBlock: {
    alignItems: "center",
    marginBottom: 24,
  },
  headlineText: {
    fontSize: 30,
    fontWeight: "300",
    color: COLORS.ink,
    letterSpacing: -0.4,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 6,
  },
  subheadText: {
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.muted,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── OAuth ────────────────────────────────────────────
  oauthBlock: {
    gap: 10,
    marginBottom: 20,
  },
  oauthBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.hairline,
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
    color: COLORS.ink,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    marginRight: 24, // compensate for icon so text is truly centered
  },
  googleIconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── OR divider ───────────────────────────────────────
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.hairline,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.mutedSoft,
    letterSpacing: 1.2,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Form ─────────────────────────────────────────────
  formBlock: {
    gap: 4,
    marginBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.primary,
    letterSpacing: 0.1,
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  fieldInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.hairlineStrong,
    height: 52,
    paddingHorizontal: 16,
  },
  fieldInputFocused: {
    borderColor: COLORS.ink,
    borderWidth: 2,
  },
  fieldInputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  fieldInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.ink,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    padding: 0,
  },
  fieldTrailing: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldError: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.error,
    marginTop: 4,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Forgot password ──────────────────────────────────
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: 2,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.muted,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Primary CTA ──────────────────────────────────────
  primaryBtn: {
    backgroundColor: COLORS.ink,
    borderRadius: 9999,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryBtnLoading: {
    opacity: 0.75,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  // ── Footer ───────────────────────────────────────────
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.muted,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.ink,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
