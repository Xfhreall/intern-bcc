import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = request.headers.get("host") || "localhost:3000";

  const callbackUrl = `${protocol}://${host}/api/auth/google/callback`;

  const backendUrl =
    process.env.NEXT_PUBLIC_BASE_URL +
    `/auth/google?callback=${encodeURIComponent(callbackUrl)}`;

  return NextResponse.redirect(backendUrl);
}
