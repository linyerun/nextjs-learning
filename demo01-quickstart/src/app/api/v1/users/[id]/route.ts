import { NextRequest, NextResponse } from "next/server";

interface IPathParams {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<IPathParams> }, // 默认写法就是写params
) {
  const { id } = await params;
  const query = request.nextUrl.searchParams.get("query");
  return NextResponse.json({ id: id, query: query });
}
