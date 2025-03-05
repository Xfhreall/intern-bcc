import { NextResponse } from "next/server";

import { api } from "@/lib/axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await api.post("/auth/register", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
