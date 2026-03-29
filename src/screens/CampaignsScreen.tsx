/**
 * CampaignsScreen – Lists all campaigns from data.campaigns.
 *
 * Each row displays:
 *   - name
 *   - spend
 *   - revenue
 *   - status (if present)
 *
 * Values are rendered exactly as received from the API.
 * No calculations, no formatting beyond safe string coercion.
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
  StatusBadge,
} from "../components";
import { useAppState } from "../hooks/useAppState";
import { Colors, FontSize, FontWeight, Radius, Spacing } from "../theme";
import type { Campaign } from "../types";

// ---------------------------------------------------------------------------
// Helpers – safe display only, no business logic
// ---------------------------------------------------------------------------

function safeString(value: string | number | null | undefined): string {
  if (value == null) return "—";
  return String(value);
}

// ---------------------------------------------------------------------------
// CampaignRow
// ---------------------------------------------------------------------------
interface CampaignRowProps {
  campaign: Campaign;
}

function CampaignRow({ campaign }: CampaignRowProps): React.ReactElement {
  return (
    <View style={styles.row}>
      {/* Name + Status */}
      <View style={styles.rowHeader}>
        <Text style={styles.campaignName} numberOfLines={1} ellipsizeMode="tail">
          {safeString(campaign.name)}
        </Text>
        {campaign.status ? (
          <StatusBadge status={campaign.status} />
        ) : null}
      </View>

      {/* Metrics */}
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Spend</Text>
          <Text style={styles.metricValue}>{safeString(campaign.spend)}</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Revenue</Text>
          <Text style={styles.metricValue}>{safeString(campaign.revenue)}</Text>
        </View>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// CampaignsScreen
// ---------------------------------------------------------------------------
export function CampaignsScreen(): React.ReactElement {
  const { status, data, error, refresh } = useAppState();

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState message={error} onRetry={refresh} />;

  const campaigns = Array.isArray(data?.campaigns) ? data!.campaigns! : [];

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
          <Text style={styles.screenTitle}>Campaigns</Text>
          <Text style={styles.subtitle}>
            {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
          </Text>
        </View>

        <SectionHeader title="All Campaigns" />

        {campaigns.length === 0 ? (
          <EmptyState message="No campaigns found." />
        ) : (
          campaigns.map((campaign, idx) => (
            <CampaignRow key={idx} campaign={campaign} />
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
  row: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  campaignName: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  metrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  metric: {
    gap: 2,
  },
  metricLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metricValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
});
