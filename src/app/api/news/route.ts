import { NextResponse } from "next/server";
import axios from "axios";

import { api } from "@/lib/axios";

export async function GET() {
  try {
    const { data } = await api.get("/news");

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
