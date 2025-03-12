import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { message: "Use another password" },
        { status: 400 }
      );
    }

    await api.post(`/auth/reset-password/${resetToken}`, {
      newPassword,
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
