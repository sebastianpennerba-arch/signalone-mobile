/**
 * SignalOne – API Layer
 *
 * Single responsibility: fetch GET /api/state and return the typed response.
 * Handles Authorization headers and 401 Unauthorized errors.
 */

import { STATE_ENDPOINT, AUTH_TOKEN } from "../../config/api";
import type { ApiResponse } from "../types";

const REQUEST_TIMEOUT_MS = 15_000;

/**
 * Fetches the current application state from the SignalOne backend.
 * Returns the raw API response envelope – success or error – without mutation.
 */
export async function fetchState(): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Auth token header support
      ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
    };

    const response = await fetch(STATE_ENDPOINT, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 401 Unauthorized specifically
    if (response.status === 401) {
      return {
        ok: false,
        error: "Unauthorized: Please log in again.",
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        error: `Server responded with status ${response.status}`,
      };
    }

    const json: ApiResponse = await response.json();
    return json;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: "Request timed out. Please try again." };
    }

    const message =
      err instanceof Error ? err.message : "An unknown error occurred.";
    return { ok: false, error: message };
  }
}
