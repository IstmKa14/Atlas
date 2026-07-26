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
import { useRouter, Href } from "expo-router";
import { useSignIn, useSSO } from "@clerk/expo";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { GoogleIcon } from "../../../components/icons/GoogleIcon";
import { AppleIcon } from "../../../components/icons/AppleIcon";

import { FormField } from "../../../components/auth/FormField";
import { OAuthButton } from "../../../components/auth/OAuthButton";
import { OrDivider } from "../../../components/auth/OrDivider";
import { OrbLayer } from "../../../components/auth/OrbLayer";
import { AtlasLogo } from "../../../components/auth/AuthLogos";

const COLORS = {
  canvas: "#f5f5f5",
  ink: "#0c0a09",
  muted: "#777169",
  mutedSoft: "#a8a29e",
  hairline: "#e7e5e4",
  surfaceCard: "#ffffff",
  error: "#dc2626",
} as const;

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

  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const handleSignIn = useCallback(async () => {
    if (!signIn) return;
    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);
    if (!emailOk || !passOk) return;

    setIsLoading(true);
    try {
      const { error } = await signIn.password({ emailAddress: email, password });
      
      if (error) {
        if (error.errors && error.errors[0]) {
          setEmailError(error.errors[0].longMessage || error.errors[0].message);
        }
        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            const url = decorateUrl('/');
            router.replace(url as Href);
          }
        });
      }
    } catch (e: any) {
      if (e.errors && e.errors[0]) {
        setEmailError(e.errors[0].longMessage || e.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, password, validateEmail, validatePassword, router, signIn]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
    }
  }, [startSSOFlow, router]);

  const handleAppleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_apple' });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
    }
  }, [startSSOFlow, router]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <OrbLayer variant="login" />

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
          <AtlasLogo />

          <View style={styles.headingBlock}>
            <Text style={styles.headlineText}>Welcome back</Text>
            <Text style={styles.subheadText}>Sign in to continue your journey</Text>
          </View>

          <View style={styles.oauthBlock}>
            <OAuthButton
              icon={<GoogleIcon size={20} />}
              label="Continue with Google"
              onPress={handleGoogleSignIn}
            />
            <OAuthButton
              icon={<AppleIcon size={19} color={COLORS.ink} />}
              label="Continue with Apple"
              onPress={handleAppleSignIn}
            />
          </View>

          <OrDivider />

          <View style={styles.formBlock}>
            <FormField
              label="Email"
              value={email}
              onChangeText={(t) => { setEmail(t); if (emailError) setEmailError(""); }}
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
              onChangeText={(t) => { setPassword(t); if (passwordError) setPasswordError(""); }}
              onBlur={() => {
                setPasswordFocused(false);
                if (password) validatePassword(password);
              }}
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

            <TouchableOpacity
              style={styles.forgotRow}
              activeOpacity={0.6}
              onPress={() => {}}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

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
  oauthBlock: {
    gap: 10,
    marginBottom: 20,
  },
  formBlock: {
    gap: 4,
    marginBottom: 20,
  },
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
