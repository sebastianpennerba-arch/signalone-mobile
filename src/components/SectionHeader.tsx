/**
 * SectionHeader – Consistent section title used across all screens.
 */

import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors, FontSize, FontWeight, Spacing } from "../theme";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({
  title,
}: SectionHeaderProps): React.ReactElement {
  return <Text style={styles.header}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
});
