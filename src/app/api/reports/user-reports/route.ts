// src/app/api/reports/user-reports/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { api } from "@/lib/axios";

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.get("/reports/user-reports", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
