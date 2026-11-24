import prisma from "@/lib/prisma";
import { withTimestamp } from "@/lib/datetime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    code: 0,
    message: "success",
    data: users.map(withTimestamp),
  });
}

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  return NextResponse.json({
    code: 0,
    message: "success",
    data: withTimestamp(user),
  });
}
