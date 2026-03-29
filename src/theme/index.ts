/**
 * SignalOne – Design Theme
 *
 * Central source of truth for colors, spacing, typography, and radius values.
 * All UI components reference this file – no inline magic numbers.
 */

export const Colors = {
  // Background
  background: "#0F1117",
  surface: "#1A1D27",
  surfaceAlt: "#22263A",
  border: "#2A2E42",

  // Text
  textPrimary: "#F0F2FF",
  textSecondary: "#8A8FA8",
  textMuted: "#555A72",

  // Brand
  brand: "#5B6EF5",
  brandLight: "#7B8EFF",

  // Status
  statusGreen: "#22C55E",
  statusYellow: "#EAB308",
  statusRed: "#EF4444",

  // Score backgrounds (subtle tints)
  statusGreenBg: "#052E16",
  statusYellowBg: "#1C1A00",
  statusRedBg: "#2D0A0A",

  // Tab bar
  tabActive: "#5B6EF5",
  tabInactive: "#555A72",
  tabBar: "#13161F",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 6,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
  xxl: 40,
} as const;

export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
