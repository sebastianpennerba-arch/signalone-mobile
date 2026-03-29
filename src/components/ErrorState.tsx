/**
 * ErrorState – Full-screen error display with a retry button.
 * Shown when the API call fails or returns { ok: false }.
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, FontSize, Spacing, Radius, FontWeight } from "../theme";

interface ErrorStateProps {
  message?: string | null;
  onRetry: () => void;
}

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps): React.ReactElement {
  const displayMessage =
    message && message.trim().length > 0
      ? message
      : "Something went wrong. Please try again.";

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <Text style={styles.title}>Unable to Load Data</Text>
      <Text style={styles.message}>{displayMessage}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onRetry}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Retry loading data"
      >
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Colors.statusRedBg,
    color: Colors.statusRed,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    textAlign: "center",
    lineHeight: 56,
    overflow: "hidden",
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    textAlign: "center",
  },
  message: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.brand,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
