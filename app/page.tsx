import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

export const metadata: Metadata = {
  // 스팸 키워드 배제 및 클린한 웰니스 전문 용어 사용
  title: `${SITE_NAME} | 수도권 프리미엄 방문 바디케어`,
  description: "경기·인천·서울 지역의 검증된 프리미엄 홈 케어 & 방문 바디케어 정보 플랫폼! 내 공간에서 누리는 100% 안심 맞춤형 웰니스 서비스를 확인하세요.",
  keywords: [
    "바로힐링",
    "Baro Wellness",
    "홈케어플랫폼",
    "방문 바디케어",
    "프리미엄 홈테라피",
    "맞춤형 웰니스",
    "안심 후불제",
    "경기 방문케어",
    "인천 바디케어",
    "서울 홈케어",
    "릴렉싱 케어"
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | 경기·인천·서울 방문 바디케어 예약`,
    description: "내 주변 검증된 프리미엄 방문 바디케어 정보 총집합! 안전하고 편안한 맞춤 홈 케어 서비스를 바로힐링에서 만나보세요.",
    url: SITE_URL,
    siteName: `${SITE_NAME} (Baro Wellness)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "바로힐링 - 프리미엄 홈 케어 & 방문 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 수도권 프리미엄 방문 바디케어`,
    description: "경기·인천·서울 검증된 방문 바디케어 제휴 정보 및 프리미엄 홈 케어 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}