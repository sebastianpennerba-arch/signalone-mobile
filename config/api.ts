/**
 * SignalOne – API Configuration
 */
export const API_BASE_URL = "https://app.signalone.cloud";
export const LOGIN_URL = `${API_BASE_URL}/login`;
export const STATE_ENDPOINT = `${API_BASE_URL}/api/state`;

/**
 * Secure Storage Keys
 */
export const AUTH_TOKEN_KEY = "signalone_auth_token";

/**
 * Global Auth State (In-memory cache)
 */
export let AUTH_TOKEN: string | null = null;

export function setAuthToken(token: string | null): void {
  AUTH_TOKEN = token;
}
