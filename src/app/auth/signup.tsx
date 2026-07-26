import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { GoogleIcon } from "../../../components/icons/GoogleIcon";
import { AppleIcon } from "../../../components/icons/AppleIcon";

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
  orbSky: "#a8c8e8",
  orbRose: "#e8b8c4",
} as const;

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const validateName = useCallback((value: string): boolean => {
    const ok = value.trim().length >= 2;
    setNameError(ok ? "" : "Please enter your name.");
    return ok;
  }, []);

  const validateEmail = useCallback((value: string): boolean => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setEmailError(ok ? "" : "Enter a valid email address.");
    return ok;
  }, []);

  const validatePassword = useCallback((value: string): boolean => {
    const ok = value.length >= 8;
    setPasswordError(ok ? "" : "Use at least 8 characters.");
    return ok;
  }, []);

  const handleSignUp = useCallback(async () => {
    const nameOk = validateName(name);
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);
    if (!nameOk || !emailOk || !passOk) return;

    setIsLoading(true);
    // TODO: wire to auth provider
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.replace("/");
  }, [name, email, password, validateName, validateEmail, validatePassword, router]);

  const handleGoogleSignUp = useCallback(async () => {
    // TODO: wire to Google OAuth
  }, []);

  const handleAppleSignUp = useCallback(async () => {
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
            {
              paddingTop: insets.top + 64,
              paddingBottom: Math.max(insets.bottom, 32),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Compact brand mark ─────────────────────────── */}
          <CompactLogo />

          {/* ── Heading ─────────────────────────────────────── */}
          <View style={styles.headingBlock}>
            <Text style={styles.headlineText}>Create your account</Text>
            <Text style={styles.subheadText}>
              Begin your journey of beautiful memories
            </Text>
          </View>

          {/* ── OAuth ───────────────────────────────────────── */}
          <View style={styles.oauthBlock}>
            <OAuthButton
              icon={<GoogleIcon size={20} />}
              label="Continue with Google"
              onPress={handleGoogleSignUp}
            />
            <OAuthButton
              icon={<AppleIcon size={19} color={COLORS.ink} />}
              label="Continue with Apple"
              onPress={handleAppleSignUp}
            />
          </View>

          {/* ── OR divider ──────────────────────────────────── */}
          <OrDivider />

          {/* ── Form ────────────────────────────────────────── */}
          <View style={styles.formBlock}>
            <FormField
              label="Full name"
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (nameError) setNameError("");
              }}
              onBlur={() => {
                setNameFocused(false);
                if (name) validateName(name);
              }}
              onFocus={() => setNameFocused(true)}
              onSubmitEditing={() => emailRef.current?.focus()}
              isFocused={nameFocused}
              error={nameError}
              placeholder="Your name"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              ref={nameRef}
              trailingIcon={
                <SymbolView
                  name={{ ios: "person", android: "person", web: "person" }}
                  size={17}
                  tintColor={nameError ? COLORS.error : COLORS.mutedSoft}
                  weight="regular"
                />
              }
            />

            <FormField
              label="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError("");
              }}
              onBlur={() => {
                setEmailFocused(false);
                if (email) validateEmail(email);
              }}
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
              onChangeText={(t) => {
                setPassword(t);
                if (passwordError) setPasswordError("");
              }}
              onBlur={() => {
                setPasswordFocused(false);
                if (password) validatePassword(password);
              }}
              onFocus={() => setPasswordFocused(true)}
              onSubmitEditing={handleSignUp}
              isFocused={passwordFocused}
              error={passwordError}
              placeholder="At least 8 characters"
              secureTextEntry={!passwordVisible}
              autoComplete="new-password"
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
                        ? {
                            ios: "eye.slash",
                            android: "visibility_off",
                            web: "visibility_off",
                          }
                        : {
                            ios: "eye",
                            android: "visibility",
                            web: "visibility",
                          }
                    }
                    size={17}
                    tintColor={COLORS.mutedSoft}
                    weight="regular"
                  />
                </TouchableOpacity>
              }
            />
          </View>

          {/* ── Terms note ──────────────────────────────────── */}
          <Text style={styles.termsText}>
            By creating an account, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          {/* ── Primary CTA ─────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.primaryBtnLoading]}
            onPress={handleSignUp}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.primaryBtnText}>Create account</Text>
            )}
          </TouchableOpacity>

          {/* ── Footer link ─────────────────────────────────── */}
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.back()}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Compact logo (smaller, for sign-up where form is longer) ─────────────────

function CompactLogo() {
  return (
    <View style={styles.logoBlock}>
      <View style={styles.glyphWrapperCompact}>
        <View style={styles.glyphOrbCompact} />
        <Text style={styles.glyphACompact}>A</Text>
      </View>
      <Text style={styles.brandName}>ATLAS</Text>
    </View>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function OAuthButton({
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



function OrDivider() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>OR</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

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
  autoCapitalize?: "none" | "sentences" | "words";
  autoComplete?: "email" | "password" | "new-password" | "name";
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
            underlineColorAndroid="transparent"
          />
          {trailingIcon && (
            <View style={styles.fieldTrailing}>{trailingIcon}</View>
          )}
        </View>
        {hasError && <Text style={styles.fieldError}>{error}</Text>}
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

const ORB = 280;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.canvas,
  },
  flex: { flex: 1 },
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
    opacity: 0.48,
  },
  orbTopRight: {
    backgroundColor: COLORS.orbSky,
    top: -ORB * 0.3,
    right: -ORB * 0.3,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.orbSky,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 70,
      },
    }),
  },
  orbLeftCenter: {
    backgroundColor: COLORS.orbMint,
    top: "25%",
    left: -ORB * 0.45,
    opacity: 0.38,
  },
  orbBottomRight: {
    backgroundColor: COLORS.orbLavender,
    bottom: -ORB * 0.35,
    right: -ORB * 0.3,
    opacity: 0.42,
  },
  orbBottomLeft: {
    backgroundColor: COLORS.orbPeach,
    bottom: -ORB * 0.4,
    left: -ORB * 0.4,
    opacity: 0.28,
  },

  // ── Compact logo mark ────────────────────────────────
  logoBlock: {
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
        shadowColor: COLORS.orbMint,
        shadowOffset: { width: -10, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 20,
      },
    }),
  },
  glyphACompact: {
    fontSize: 76,
    fontWeight: "700",
    color: COLORS.ink,
    lineHeight: 82,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  brandName: {
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 10,
    color: COLORS.ink,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  // ── Heading ──────────────────────────────────────────
  headingBlock: {
    alignItems: "center",
    marginBottom: 24,
  },
  headlineText: {
    fontSize: 28,
    fontWeight: "300",
    color: COLORS.ink,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 6,
  },
  subheadText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.muted,
    letterSpacing: 0.1,
    textAlign: "center",
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
    height: 54,
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
  },
  oauthLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.ink,
    marginRight: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
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
    marginBottom: 12,
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
    borderWidth: 0,
    // @ts-ignore
    outlineStyle: "none",
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

  // ── Terms ─────────────────────────────────────────────
  termsText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.mutedSoft,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  termsLink: {
    fontWeight: "500",
    color: COLORS.muted,
    textDecorationLine: "underline",
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
