/**
 * AppNavigator – Bottom-tab navigation for SignalOne.
 *
 * Includes Auth Guard:
 *   - If no token: Show LoginScreen
 *   - If token: Show Main Tabs (Overview | Insights | Campaigns)
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { OverviewScreen } from "../screens/OverviewScreen";
import { InsightsScreen } from "../screens/InsightsScreen";
import { CampaignsScreen } from "../screens/CampaignsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { useAuth } from "../hooks/useAuth";
import { Colors, FontSize, FontWeight, Spacing } from "../theme";

export type RootTabParamList = {
  Overview: undefined;
  Insights: undefined;
  Campaigns: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

// ---------------------------------------------------------------------------
// Simple SVG-free icon using text glyphs
// ---------------------------------------------------------------------------
interface TabIconProps {
  label: string;
  focused: boolean;
}

function TabIcon({ label, focused }: TabIconProps): React.ReactElement {
  const icons: Record<string, string> = {
    Overview: "◎",
    Insights: "✦",
    Campaigns: "▤",
  };
  return (
    <Text
      style={[
        styles.tabIcon,
        { color: focused ? Colors.tabActive : Colors.tabInactive },
      ]}
    >
      {icons[label] ?? "•"}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Main Tab Navigator
// ---------------------------------------------------------------------------
function MainTabs(): React.ReactElement {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Campaigns" component={CampaignsScreen} />
    </Tab.Navigator>
  );
}

// ---------------------------------------------------------------------------
// Root Navigator (Auth Guard)
// ---------------------------------------------------------------------------
export function AppNavigator(): React.ReactElement {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  header: {
    backgroundColor: Colors.tabBar,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  logoutButton: {
    marginRight: Spacing.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceAlt,
  },
  logoutText: {
    color: Colors.statusRed,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  tabIcon: {
    fontSize: 18,
    lineHeight: 22,
  },
});
