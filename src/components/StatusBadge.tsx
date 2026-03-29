/**
 * StatusBadge – Pill-shaped badge for campaign status strings.
 * Renders the raw status value as received from the API.
 * Color mapping is purely cosmetic – no business logic.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Radius, Spacing, FontWeight } from "../theme";

interface StatusBadgeProps {
  status: string;
}

type BadgeVariant = "green" | "yellow" | "red" | "neutral";

function resolveVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (s === "active" || s === "running" || s === "live") return "green";
  if (s === "paused" || s === "pending" || s === "review") return "yellow";
  if (s === "stopped" || s === "rejected" || s === "error") return "red";
  return "neutral";
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; text: string }
> = {
  green: { bg: Colors.statusGreenBg, text: Colors.statusGreen },
  yellow: { bg: Colors.statusYellowBg, text: Colors.statusYellow },
  red: { bg: Colors.statusRedBg, text: Colors.statusRed },
  neutral: { bg: Colors.surfaceAlt, text: Colors.textSecondary },
};

export function StatusBadge({ status }: StatusBadgeProps): React.ReactElement {
  const variant = resolveVariant(status);
  const { bg, text } = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textTransform: "capitalize",
  },
});
