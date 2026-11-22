import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  data.id = 1;
  return NextResponse.json({ message: "success", data: data });
}
