import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { api } from "@/lib/axios";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!session || !session.user.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.get("/events", {
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
