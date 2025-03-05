import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

/**
 * This route handles the callback from the backend after Google authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Get the tokens from the URL query parameters
    // (Your backend should redirect here with these parameters)
    const searchParams = request.nextUrl.searchParams;
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    // If there's an error or missing tokens, redirect to login with error
    if (error || !accessToken || !refreshToken) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(error || "Authentication failed")}`,
          request.url
        )
      );
    }

    // Create a JWT for NextAuth session
    // This is a simplified example - in production, use a proper secret
    const secret = new TextEncoder().encode(
      process.env.NEXTAUTH_SECRET || "your-secret-key"
    );

    const token = await new SignJWT({
      sub: "google-user", // You might want to include user ID here
      provider: "google",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // Set the tokens in cookies so the client can access them
    const cookieStore = await cookies();

    // Set a cookie with the auth tokens that the client-side code can read
    cookieStore.set(
      "google-auth-tokens",
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
      {
        httpOnly: false, // Allow JavaScript access
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      }
    );

    // Set the NextAuth session token
    cookieStore.set("next-auth.session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    // Redirect to a page that will handle storing the tokens in Zustand
    return NextResponse.redirect(new URL("/auth/google-callback", request.url));
  } catch (error) {
    console.error("Google callback error:", error);

    return NextResponse.redirect(
      new URL(
        "/login?error=Something went wrong during authentication",
        request.url
      )
    );
  }
}
