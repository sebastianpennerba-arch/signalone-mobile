/**
 * InsightsScreen – Displays up to 5 Sensei recommendations.
 *
 * Each recommendation shows:
 *   - problem
 *   - reason
 *   - action
 *
 * All fields are optional. Missing fields show a safe fallback.
 * The list is capped at 5 items as per spec (slice, no computation).
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
import type { Recommendation } from "../types";

const MAX_RECOMMENDATIONS = 5;

// ---------------------------------------------------------------------------
// RecommendationCard
// ---------------------------------------------------------------------------
interface RecommendationCardProps {
  item: Recommendation;
  index: number;
}

function RecommendationCard({
  item,
  index,
}: RecommendationCardProps): React.ReactElement {
  return (
    <View style={styles.card}>
      {/* Index badge */}
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>

      <View style={styles.cardBody}>
        {/* Problem */}
        {item.problem ? (
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Problem</Text>
            <Text style={styles.fieldValue}>{item.problem}</Text>
          </View>
        ) : null}

        {/* Reason */}
        {item.reason ? (
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Reason</Text>
            <Text style={styles.fieldValue}>{item.reason}</Text>
          </View>
        ) : null}

        {/* Action */}
        {item.action ? (
          <View style={[styles.fieldBlock, styles.actionBlock]}>
            <Text style={styles.fieldLabel}>Action</Text>
            <Text style={[styles.fieldValue, styles.actionText]}>
              {item.action}
            </Text>
          </View>
        ) : null}

        {/* Fallback if all fields are missing */}
        {!item.problem && !item.reason && !item.action ? (
          <Text style={styles.fallback}>No details available.</Text>
        ) : null}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// InsightsScreen
// ---------------------------------------------------------------------------
export function InsightsScreen(): React.ReactElement {
  const { status, data, error, refresh } = useAppState();

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState message={error} onRetry={refresh} />;

  const recommendations = data?.sensei?.recommendations ?? [];
  const visible = Array.isArray(recommendations)
    ? recommendations.slice(0, MAX_RECOMMENDATIONS)
    : [];

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
          <Text style={styles.screenTitle}>Insights</Text>
          <Text style={styles.subtitle}>
            Top recommendations from Sensei
          </Text>
        </View>

        <SectionHeader
          title={`Recommendations (${visible.length} of ${MAX_RECOMMENDATIONS} max)`}
        />

        {visible.length === 0 ? (
          <EmptyState message="No recommendations available." />
        ) : (
          visible.map((item, idx) => (
            <RecommendationCard key={idx} item={item} index={idx} />
          ))
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
  screenTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  card: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  indexText: {
    color: Colors.textPrimary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  cardBody: {
    flex: 1,
    gap: Spacing.sm,
  },
  fieldBlock: {
    gap: 2,
  },
  fieldLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  fieldValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  actionBlock: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  actionText: {
    color: Colors.brandLight,
  },
  fallback: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
});
