import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const response = await api.post("/auth/verify-otp", {
      email: body.email,
      otp: body.otp,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "OTP verification failed" },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}
