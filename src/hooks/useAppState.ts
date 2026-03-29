/**
 * SignalOne – useAppState Hook
 *
 * Manages the full data-fetching lifecycle:
 *   loading → success (data) | error
 *
 * Handles 401 Unauthorized errors by clearing the token and returning to login.
 */

import { useState, useEffect, useCallback } from "react";
import { fetchState } from "../api/stateApi";
import type { RootState } from "../types";
import { setAuthToken as setGlobalAuthToken, AUTH_TOKEN_KEY } from "../../config/api";
import * as SecureStore from "expo-secure-store";

export type AppStateStatus = "loading" | "success" | "error";

export interface UseAppStateResult {
  status: AppStateStatus;
  data: RootState | null;
  error: string | null;
  refresh: () => void;
}

export function useAppState(): UseAppStateResult {
  const [status, setStatus] = useState<AppStateStatus>("loading");
  const [data, setData] = useState<RootState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);

    const response = await fetchState();

    if (response.ok) {
      setData(response.data ?? null);
      setStatus("success");
    } else {
      // Handle 401 Unauthorized: Clear token and trigger re-auth
      if (response.error?.toLowerCase().includes("unauthorized")) {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        setGlobalAuthToken(null);
        // The AppNavigator will automatically switch to LoginScreen due to token being null
      }
      
      setError(response.error ?? "Unknown error");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { status, data, error, refresh: load };
}
