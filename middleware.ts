import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/sign-in",
  "/set-password",
  "/account-created",
  "/forgot-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const authCookie = request.cookies.get("aquaris.auth")?.value;
  const isAuthenticated = !!authCookie;

  if (!isPublic && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
