import prisma from "@/lib/prisma";
import { withTimestamp } from "@/lib/datetime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const users = await prisma.user.findMany({ where: { id } });
  return NextResponse.json({
    code: 0,
    message: "success",
    data: users && users.length > 0 ? withTimestamp(users[0]) : null,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { name, email, password } = await request.json();
  const id = (await params).id;
  const user = await prisma.user.update({
    where: { id },
    data: { name, email, password },
  });
  return NextResponse.json({
    code: 0,
    message: "success",
    data: withTimestamp(user),
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await prisma.user.delete({ where: { id } });
  console.log("delete user:", user);
  return NextResponse.json({
    code: 0,
    message: "success",
  });
}
