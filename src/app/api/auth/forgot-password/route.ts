import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { message: "Email are required" },
        { status: 400 }
      );
    }

    const response = await api.post("/auth/forgot-password", {
      email: body.email,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "Request failed" },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json({ message: "Request failed" }, { status: 500 });
  }
}
