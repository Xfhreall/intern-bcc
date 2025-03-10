import { type NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL
    ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    : undefined
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { message: "Authorization code is required" },
        { status: 400 }
      );
    }

    const { tokens } = await googleClient.getToken(code);

    let userInfo;

    if (tokens.id_token) {
      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      userInfo = ticket.getPayload();
    }

    if (!userInfo && tokens.access_token) {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      userInfo = response.data;
    }

    if (!userInfo) {
      return NextResponse.json(
        { message: "Could not retrieve user information" },
        { status: 400 }
      );
    }

    const user = await findOrCreateUser({
      email: userInfo.email!,
      name: userInfo.name,
      googleId: userInfo.sub,
      picture: userInfo.picture,
    });

    const appTokens = await generateTokens(user);
    const redirectUrl = new URL(
      "/api/auth/callback/google",
      process.env.NEXTAUTH_URL
    );

    redirectUrl.searchParams.append("access_token", appTokens.accessToken);
    redirectUrl.searchParams.append("refresh_token", appTokens.refreshToken);

    return NextResponse.redirect(redirectUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorUrl = new URL("/login", process.env.NEXTAUTH_URL);

    errorUrl.searchParams.append("error", "GoogleAuthError");

    return NextResponse.redirect(errorUrl);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, email, name, googleId } = body;

    if (!idToken) {
      return NextResponse.json(
        { message: "ID token is required" },
        { status: 400 }
      );
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid Google token" },
        { status: 401 }
      );
    }

    if (payload.email !== email) {
      return NextResponse.json({ message: "Email mismatch" }, { status: 401 });
    }

    const user = await findOrCreateUser({
      email: payload.email!,
      name: payload.name || name,
      googleId: payload.sub || googleId,
      picture: payload.picture,
    });

    const tokens = await generateTokens(user);

    return NextResponse.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function findOrCreateUser({
  email,
  name,
  googleId,
  picture,
}: {
  email: string;
  name?: string;
  googleId: string;
  picture?: string;
}) {
  return {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    email,
    name: name || email.split("@")[0],
    googleId,
    picture,
  };
}

async function generateTokens(_user: any) {
  return {
    accessToken:
      "mock_access_token_" + Math.random().toString(36).substring(2, 15),
    refreshToken:
      "mock_refresh_token_" + Math.random().toString(36).substring(2, 15),
  };
}
