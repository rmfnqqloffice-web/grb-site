import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { buildOrganizationLD } from "@/lib/jsonld";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grb-mkt.com"),
  title: {
    default: "그룹비 | 사람의 차이가 마케팅의 차이를 만듭니다",
    template: "%s | 그룹비",
  },
  description:
    "그룹비(GROUPB)는 검색·바이럴·모바일·온라인·오프라인·언론·영상 등 7대 마케팅을 전 분야의 전문 마케터가 집행하는 퍼포먼스 마케팅 에이전시입니다.",
  keywords: [
    "그룹비",
    "GROUPB",
    "GRB",
    "퍼포먼스 마케팅",
    "검색광고",
    "바이럴 마케팅",
    "마케팅 에이전시",
  ],
  authors: [{ name: "그룹비", url: "https://grb-mkt.com" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "그룹비",
    title: "그룹비 | 사람의 차이가 마케팅의 차이를 만듭니다",
    description:
      "다양한 분야의 전문 마케터들이 모여 광고주에게 가장 필요한 마케팅을 제안하는 퍼포먼스 마케팅 에이전시.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn("h-full antialiased", notoSansKR.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationLD()) }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          본문 바로가기
        </a>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
