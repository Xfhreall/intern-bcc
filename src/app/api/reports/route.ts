import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

import { authOptions } from "@/lib/authOptions";
import { api } from "@/lib/axios";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const token = session?.user.accessToken;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();

    const response = await api.post("/reports", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to submit report",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!session || !session.user.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.get("/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "Fetching data failed" },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Fetching data failed" },
      { status: 500 }
    );
  }
}
