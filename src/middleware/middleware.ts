import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (pathname.startsWith("/api/v1/auth/google/callback")) {
    // Mendapatkan URL baru
    const url = request.nextUrl.clone();

    // Mengubah path ke handler callback kita
    url.pathname = "/auth/callback";

    // Mempertahankan query parameters (penting untuk parameter code)
    // URL query sudah otomatis dipertahankan dalam NextResponse.redirect

    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));

    const response = NextResponse.redirect(loginUrl);

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/register/:path*",
    "/api/v1/auth/google/callback",
  ],
};
