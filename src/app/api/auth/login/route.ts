import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await api.post("/auth/login", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "Authentication failed" },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
