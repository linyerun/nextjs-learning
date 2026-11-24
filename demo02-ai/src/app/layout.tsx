import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*自托管字体：构建时不依赖 fonts.googleapis.com，Docker 构建可离线复现*/
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "demo02-ai",
  description: "AI demo built on the demo01-quickstart scaffold",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
