import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

import { api } from "@/lib/axios";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const accessToken = localStorage.getItem("accessToken");

    const response = await api.post("/reports", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API error:", error);

    let errorMessage = "Failed to submit report. Please try again.";
    let statusCode = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      statusCode = error.response.status;
    }

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
