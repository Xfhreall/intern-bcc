import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { api } from "@/lib/axios";

export async function GET() {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!session || !session.user.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.get("/reports/user-reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
}
