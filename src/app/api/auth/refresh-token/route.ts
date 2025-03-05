import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 }
      );
    }

    const response = await api.post("/auth/refresh-token", {
      refreshToken: body.refreshToken,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Token refresh error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "Token refresh failed" },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Token refresh failed" },
      { status: 500 }
    );
  }
}
