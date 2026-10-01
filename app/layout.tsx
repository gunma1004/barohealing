import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 경기, 인천, 서울 출장 프리미엄 마사지 & 테라피`,
    template: `%s | ${SITE_NAME}`
  },
  description: "경기, 인천, 서울 출장마사지 수도권 전 지역에서 만나는 검증된 프리미엄 테라피. 편안하게 누리는 100% 안심 바디케어 서비스를 경험해 보세요.",
  keywords: [
    "바로힐링",
    "프리미엄 출장마사지",
    "수도권 출장 케어",
    "바디케어 플랫폼",
    "맞춤형 힐링",
    "안심 후불제",
    "릴렉싱 웰니스"
  ],
  alternates: {
    canonical: SITE_URL,
  },
  // 👇 바로힐링 사이트용 네이버 소유확인 코드를 새로 발급받아 아래에 넣어주세요 👇
  verification: {
    other: {
      "naver-site-verification": "0ad4e1b00a0ad4816c2def8bdc237dee7d7f5314",
    },
  },
  openGraph: {
    title: `${SITE_NAME} | 경기, 인천, 서울 출장 프리미엄 마사지 & 테라피`,
    description: "경기, 인천, 서울 출장마사지 수도권 전 지역에서 만나는 검증된 프리미엄 테라피. 검증된 전문가의 안심 방문 바디케어 서비스 안내.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "바로힐링 프리미엄 출장 테라피 및 마사지안내",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}