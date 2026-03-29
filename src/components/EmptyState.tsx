/**
 * EmptyState – Inline empty placeholder for lists or missing sections.
 * Used when data exists but a particular collection is empty or null.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Spacing, Radius } from "../theme";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "No data available.",
}: EmptyStateProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    marginTop: Spacing.md,
  },
  message: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    textAlign: "center",
  },
});
