import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";

import { api } from "@/lib/axios";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const token = session?.user.accessToken;

  try {
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await api.post("/donation", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          message: error.response.data.message || "Failed to process donation",
        },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
