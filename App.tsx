/**
 * SignalOne – Root Application Entry Point
 *
 * Responsibilities:
 *   - Wrap the app in AuthProvider for token management
 *   - Wrap the app in NavigationContainer + SafeAreaProvider
 *   - Mount the root AppNavigator (Auth Guard)
 */

import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/hooks/useAuth";
import { Colors } from "./src/theme";

export default function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: Colors.brand,
              background: Colors.background,
              card: Colors.tabBar,
              text: Colors.textPrimary,
              border: Colors.border,
              notification: Colors.brand,
            },
            fonts: {
              regular: { fontFamily: "System", fontWeight: "400" },
              medium: { fontFamily: "System", fontWeight: "500" },
              bold: { fontFamily: "System", fontWeight: "700" },
              heavy: { fontFamily: "System", fontWeight: "900" },
            },
          }}
        >
          <StatusBar style="light" backgroundColor={Colors.background} />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
