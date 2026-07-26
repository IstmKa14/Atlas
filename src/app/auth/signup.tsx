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

import { FormField } from "../../../components/auth/FormField";
import { OAuthButton } from "../../../components/auth/OAuthButton";
import { OrDivider } from "../../../components/auth/OrDivider";
import { OrbLayer } from "../../../components/auth/OrbLayer";
import { CompactLogo } from "../../../components/auth/AuthLogos";

const COLORS = {
  canvas: "#f5f5f5",
  ink: "#0c0a09",
  muted: "#777169",
  mutedSoft: "#a8a29e",
  hairline: "#e7e5e4",
  surfaceCard: "#ffffff",
  error: "#dc2626",
} as const;

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
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.replace("/");
  }, [name, email, password, validateName, validateEmail, validatePassword, router]);

  const handleGoogleSignUp = useCallback(async () => {}, []);
  const handleAppleSignUp = useCallback(async () => {}, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <OrbLayer variant="signup" />

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
          <CompactLogo />

          <View style={styles.headingBlock}>
            <Text style={styles.headlineText}>Create your account</Text>
            <Text style={styles.subheadText}>
              Begin your journey of beautiful memories
            </Text>
          </View>

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

          <OrDivider />

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

          <Text style={styles.termsText}>
            By creating an account, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.canvas,
  },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
  },
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
  oauthBlock: {
    gap: 10,
    marginBottom: 20,
  },
  formBlock: {
    gap: 4,
    marginBottom: 12,
  },
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
