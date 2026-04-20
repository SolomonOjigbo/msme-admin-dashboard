import type { AuthUser } from "@/components/auth/AuthContext";
import { mockRequest, mockReject } from "./client";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: AuthUser;
  token: string;
  status: "active" | "pending";
}

export interface InviteMemberPayload {
  email: string;
  role: "Super Admin" | "Admin Officer";
}

export interface SetPasswordPayload {
  token: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

function buildUserFromEmail(email: string): AuthUser {
  const local = email.split("@")[0] || "admin";
  const [first = "John", last = "Ezekude"] = local.includes(".")
    ? local.split(".")
    : [local, "Ezekude"];
  return {
    firstName: first.charAt(0).toUpperCase() + first.slice(1),
    lastName: last.charAt(0).toUpperCase() + last.slice(1),
    email,
    role: "Super Admin",
    initials: (first[0] + (last[0] || first[1] || "")).toUpperCase(),
  };
}

export const AuthApi = {
  signIn(payload: SignInPayload): Promise<SignInResponse> {
    if (!payload.email || !payload.password) {
      return mockReject("Email and password are required", 422);
    }
    return mockRequest({
      user: buildUserFromEmail(payload.email),
      token: "mock-jwt-token",
      status: payload.email.includes("pending") ? "pending" : "active",
    });
  },

  signInWithGoogle(): Promise<SignInResponse> {
    return mockRequest({
      user: buildUserFromEmail("john.ezekude@gmail.com"),
      token: "mock-google-token",
      status: "active" as const,
    });
  },

  signOut(): Promise<{ success: true }> {
    return mockRequest({ success: true as const });
  },

  inviteMember(
    payload: InviteMemberPayload
  ): Promise<{ success: true; email: string }> {
    return mockRequest({ success: true as const, email: payload.email });
  },

  setPassword(_payload: SetPasswordPayload): Promise<{ success: true }> {
    return mockRequest({ success: true as const });
  },

  forgotPassword(
    payload: ForgotPasswordPayload
  ): Promise<{ success: true; email: string }> {
    return mockRequest({ success: true as const, email: payload.email });
  },

  me(): Promise<AuthUser | null> {
    if (typeof window === "undefined") return Promise.resolve(null);
    try {
      const raw = localStorage.getItem("aquaris.auth.user");
      return mockRequest(raw ? (JSON.parse(raw) as AuthUser) : null, 100);
    } catch {
      return mockRequest(null, 100);
    }
  },
};
