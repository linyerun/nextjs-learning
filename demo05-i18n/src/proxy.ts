import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale } from "@dict/index";

export default function proxy(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  if (locales.some((locale) => req.nextUrl.pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }
  const headers = {
    "accept-language": req.headers.get("accept-language") || "",
  };
  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();
  const lang = match(languages, locales, defaultLocale);
  const pathname = req.nextUrl.pathname;
  req.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", //跳过内部匹配路径
  ],
};
