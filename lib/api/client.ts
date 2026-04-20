/**
 * Mock API client.
 *
 * Every API module returns mock data via mockRequest().
 * When the real backend is ready, swap the body of each function with a
 * fetch() call to the real endpoint. Signatures and return shapes are stable.
 *
 * Example replacement:
 *   // before
 *   return mockRequest(mockData);
 *   // after
 *   const res = await fetch(`${API_BASE}/msmes`, { headers: authHeaders() });
 *   if (!res.ok) throw new ApiError(res.status, await res.text());
 *   return res.json();
 */

// NEXT_PUBLIC_ prefix replaces VITE_ for Next.js
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Simulate network latency so loading states are visible during development. */
export function mockRequest<T>(data: T, delayMs = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delayMs);
  });
}

/** Simulate a failing request (useful for testing error states). */
export function mockReject(
  message: string,
  status = 400,
  delayMs = 300
): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new ApiError(status, message)),
      delayMs
    );
  });
}

/** Helper for future real implementation — attaches the auth token if present. */
export function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("aquaris.auth.token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
