/**
 * LoginScreen – Entry point for unauthenticated users.
 *
 * Provides a "Login via Web" button that triggers the WebBrowser flow.
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { Colors, FontSize, FontWeight, Radius, Spacing } from "../theme";

export function LoginScreen(): React.ReactElement {
  const { login, isLoading } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo / Branding */}
        <View style={styles.branding}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S1</Text>
          </View>
          <Text style={styles.title}>SignalOne</Text>
          <Text style={styles.subtitle}>Mobile Viewer</Text>
        </View>

        {/* Login Action */}
        <View style={styles.actions}>
          <Text style={styles.infoText}>
            Please log in with your SignalOne account to view your dashboard.
          </Text>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={login}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Login via Web"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Securely authenticating via app.signalone.cloud
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: "space-around",
    alignItems: "center",
  },
  branding: {
    alignItems: "center",
    marginTop: Spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: Radius.full,
    backgroundColor: Colors.brand,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  logoText: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl + 8,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  actions: {
    width: "100%",
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  button: {
    backgroundColor: Colors.brand,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: "center",
  },
});
