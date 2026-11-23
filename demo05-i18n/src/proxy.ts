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
  // 解析请求头
  const negotiator = new Negotiator({ headers });
  // 获取语言，['zh-CN', 'zh', 'en-US', 'en', 'ja']  // 按优先级从高到低排序
  const languages = negotiator.languages();
  //language-浏览器支持的语言 locales-项目支持的语言 defaultLocale-项目默认语言
  // 匹配语言例如 zh-CN 则 lang 返回 zh， en-US 则 lang 返回 en， 如果没有匹配到则返回默认语言defaultLocale
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
