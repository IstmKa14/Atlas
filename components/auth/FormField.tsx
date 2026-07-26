import React from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

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

export const FormField = React.forwardRef<TextInput, FormFieldProps>(
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
            style={[styles.fieldInput, { outlineStyle: "none" } as any]}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor="#a8a29e"
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

const styles = StyleSheet.create({
  fieldWrapper: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#292524",
    letterSpacing: 0.1,
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  fieldInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d6d3d1",
    height: 52,
    paddingHorizontal: 16,
  },
  fieldInputFocused: {
    borderColor: "#0c0a09",
    borderWidth: 2,
  },
  fieldInputError: {
    borderColor: "#dc2626",
    borderWidth: 1.5,
  },
  fieldInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: "#0c0a09",
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    padding: 0,
    borderWidth: 0,
  },
  fieldTrailing: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldError: {
    fontSize: 12,
    fontWeight: "400",
    color: "#dc2626",
    marginTop: 4,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
