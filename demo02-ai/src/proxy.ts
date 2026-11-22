import { NextRequest, NextResponse } from "next/server";
import { ProxyConfig } from "next/server";

const corsHeaders: { [k: string]: string } = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config: ProxyConfig = {
  matcher: "/api/v1/:path*",
};
