/**
 * SignalOne – Auth Context & Hook
 *
 * Handles:
 *   - Secure storage of the auth token
 *   - Web-based login flow via Expo WebBrowser
 *   - Global auth state management
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import { AUTH_TOKEN_KEY, LOGIN_URL, setAuthToken as setGlobalAuthToken } from "../../config/api";

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Load token from secure storage on mount
  useEffect(() => {
    async function loadToken() {
      try {
        const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
          setGlobalAuthToken(storedToken);
        }
      } catch (e) {
        console.error("Failed to load token", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  // 2. Login flow: Open WebBrowser and listen for redirect
  const login = useCallback(async () => {
    const redirectUrl = Linking.createURL("auth-callback");
    const authUrl = `${LOGIN_URL}?redirect_uri=${encodeURIComponent(redirectUrl)}`;

    try {
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === "success") {
        const { url } = result;
        const params = Linking.parse(url);
        const newToken = params.queryParams?.token as string;

        if (newToken) {
          await SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken);
          setToken(newToken);
          setGlobalAuthToken(newToken);
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }, []);

  // 3. Logout flow: Clear storage and state
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    setToken(null);
    setGlobalAuthToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
