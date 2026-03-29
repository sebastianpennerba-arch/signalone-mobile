/**
 * LoadingState – Full-screen loading indicator.
 * Shown while the API request is in-flight.
 */

import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Spacing } from "../theme";

export function LoadingState(): React.ReactElement {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.brand} />
      <Text style={styles.label}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
});
