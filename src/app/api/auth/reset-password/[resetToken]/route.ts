import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      );
    }

    await api.post(`/auth/reset-password/${token}`, {
      password,
    });

    return NextResponse.json({
      message: "Password reset successful",
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Failed to reset password";

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data?.message || errorMessage;
    }

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
