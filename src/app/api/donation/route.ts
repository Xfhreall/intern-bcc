import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

    const response = await api.post("/donation", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Donate failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
