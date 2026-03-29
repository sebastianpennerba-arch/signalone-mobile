/**
 * SignalOne – Type Definitions
 *
 * These types mirror the API contract exactly.
 * All fields are optional to ensure the app never crashes on partial data.
 */

// ---------------------------------------------------------------------------
// Sensei
// ---------------------------------------------------------------------------

export interface Recommendation {
  problem?: string | null;
  reason?: string | null;
  action?: string | null;
}

export interface Sensei {
  score?: number | null;
  summary?: string | null;
  recommendations?: Recommendation[] | null;
}

// ---------------------------------------------------------------------------
// Workspace
// ---------------------------------------------------------------------------

export interface Workspace {
  name?: string | null;
}

// ---------------------------------------------------------------------------
// Campaign
// ---------------------------------------------------------------------------

export interface Campaign {
  name?: string | null;
  spend?: number | string | null;
  revenue?: number | string | null;
  status?: string | null;
}

// ---------------------------------------------------------------------------
// Root State
// ---------------------------------------------------------------------------

export interface RootState {
  sensei?: Sensei | null;
  workspace?: Workspace | null;
  campaigns?: Campaign[] | null;
}

// ---------------------------------------------------------------------------
// API Response Envelope
// ---------------------------------------------------------------------------

export type ApiSuccess = {
  ok: true;
  data: RootState;
};

export type ApiError = {
  ok: false;
  error: string;
};

export type ApiResponse = ApiSuccess | ApiError;
