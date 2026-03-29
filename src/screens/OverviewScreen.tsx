/**
 * OverviewScreen – Displays the Sensei Score, summary, and workspace name.
 *
 * Score color rules (purely cosmetic, no business logic):
 *   >= 80  → green
 *   60–79  → yellow
 *   < 60   → red
 *
 * All fields are optional. Missing data shows a safe fallback string.
 */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  SectionHeader,
} from "../components";
import { useAppState } from "../hooks/useAppState";
import { Colors, FontSize, FontWeight, Radius, Spacing } from "../theme";

// ---------------------------------------------------------------------------
// Score color resolver – display only, no computation
// ---------------------------------------------------------------------------
type ScoreVariant = "green" | "yellow" | "red";

function resolveScoreVariant(score: number): ScoreVariant {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

const scoreColors: Record<ScoreVariant, { ring: string; bg: string; text: string }> = {
  green: {
    ring: Colors.statusGreen,
    bg: Colors.statusGreenBg,
    text: Colors.statusGreen,
  },
  yellow: {
    ring: Colors.statusYellow,
    bg: Colors.statusYellowBg,
    text: Colors.statusYellow,
  },
  red: {
    ring: Colors.statusRed,
    bg: Colors.statusRedBg,
    text: Colors.statusRed,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function OverviewScreen(): React.ReactElement {
  const { status, data, error, refresh } = useAppState();

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState message={error} onRetry={refresh} />;

  const sensei = data?.sensei ?? null;
  const workspace = data?.workspace ?? null;

  const hasScore = sensei?.score != null;
  const score = hasScore ? (sensei!.score as number) : null;
  const variant = score != null ? resolveScoreVariant(score) : null;
  const palette = variant ? scoreColors[variant] : null;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refresh}
            tintColor={Colors.brand}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>SignalOne</Text>
          {workspace?.name ? (
            <Text style={styles.workspaceName}>{workspace.name}</Text>
          ) : null}
        </View>

        {/* Sensei Score Card */}
        <SectionHeader title="Sensei Score" />
        <View
          style={[
            styles.scoreCard,
            palette ? { borderColor: palette.ring, backgroundColor: palette.bg } : {},
          ]}
        >
          {score != null && palette ? (
            <>
              <Text style={[styles.scoreValue, { color: palette.text }]}>
                {score}
              </Text>
              <Text style={styles.scoreLabel}>/ 100</Text>
            </>
          ) : (
            <Text style={styles.scoreFallback}>Score unavailable</Text>
          )}
        </View>

        {/* Summary */}
        <SectionHeader title="Summary" />
        {sensei?.summary ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>{sensei.summary}</Text>
          </View>
        ) : (
          <EmptyState message="No summary available." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  appTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  workspaceName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  scoreValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.xxl + 4,
  },
  scoreLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  scoreFallback: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryText: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
});
