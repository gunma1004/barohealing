import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

// 🌟 1단: '출장' + 코스 + '마사지'를 완전히 띄어 쓴 수식어 패턴 (40종)
const spacedServicePatterns = [
  "출장 스웨디시 마사지",
  "출장 릴렉스 마사지",
  "출장 아로마 마사지",
  "출장 바디케어 마사지",
  "출장 타이 마사지",
  "출장 딥티슈 마사지",
  "출장 프리미엄 마사지",
  "출장 감성힐링 마사지",
  "출장 맞춤형 마사지",
  "출장 전신케어 마사지",
  "출장 홈 테라피 마사지",
  "출장 힐링케어 마사지",
  "출장 에스테틱 마사지",
  "출장 림프순환 마사지",
  "출장 시그니처 마사지",
  "출장 스트레칭 마사지",
  "출장 피로회복 마사지",
  "출장 호텔식 마사지",
  "출장 프라이빗 마사지",
  "출장 웰니스 마사지",
  "출장 힐링 테라피 마사지",
  "출장 소프트스웨디시 마사지",
  "출장 딥릴렉스 마사지",
  "출장 오일케어 마사지",
  "출장 전신이완 마사지",
  "출장 활력케어 마사지",
  "출장 체형맞춤 마사지",
  "출장 건식타이 마사지",
  "출장 딥케어 마사지",
  "출장 명품힐링 마사지",
  "출장 안심방문 마사지",
  "출장 스페셜케어 마사지",
  "출장 집중관리 마사지",
  "출장 감성테라피 마사지",
  "출장 소프트터치 마사지",
  "출장 근육이완 마사지",
  "출장 밸런스케어 마사지",
  "출장 릴렉세이션 마사지",
  "출장 베이직힐링 마사지",
  "출장 VIP케어 마사지"
];

// 🌟 2단: 서브 안내 및 신뢰 문구 패턴 (8종)
const bookingPatterns = [
  "100% 안심 후불제 예약",
  "투명 정찰제 실시간 매칭",
  "검증된 테라피스트 방문",
  "전지역 빠른 방문 상담",
  "선입금 없는 프라이빗 케어",
  "당일 신속 홈케어 안내",
  "정직한 정찰제 안심 예약",
  "1:1 프라이빗 맞춤 안내"
];

// 🌟 디스크립션 템플릿: {cityName} 직후에 '출장마사지'를 붙여서 배치 (40종)
const descTemplates = [
  (city: string) => `${city} 출장 마사지 전문 바로힐링! 선입금 없는 100% 현장 결제와 검증된 테라피스트의 방문 힐링 케어를 지금 확인하세요.`,
  (city: string) => `${city} 출장마사지 안심 예약 플랫폼. 정직한 정찰제 시스템으로 과도한 피로와 뭉친 근육을 부드럽게 풀어드립니다.`,
  (city: string) => `${city} 출장 마사지 추천 제휴 안내. 내 집에서 가장 편안하게 누리는 프라이빗 1:1 맞춤형 바디케어 프로그램.`,
  (city: string) => `${city} 출장 마사지 빠른 방문 서비스. 릴렉싱부터 전신 스트레칭까지 예약금 걱정 없이 안전하게 이용해 보세요.`,
  (city: string) => `${city} 출장 마사지 투명 정찰제 안내. 수도권 전역 신속 매칭과 철저한 위생 관리로 최고의 휴식을 선사합니다.`,
  (city: string) => `${city} 출장 마사지 1등 웰니스 플랫폼. 예약금 요구 없이 관리사 도착 후 결제하는 안전한 시스템을 보장합니다.`,
  (city: string) => `${city} 출장 마사지 피로회복 솔루션! 야근과 일상 스트레스로 지친 현대인을 위한 맞춤 테라피를 제공합니다.`,
  (city: string) => `${city} 출장 마사지 엄선된 전문 테라피스트 방문. 쾌적한 내 공간에서 품격 높은 힐링 시간을 경험해 보세요.`,
  (city: string) => `${city} 출장 마사지 정통 릴렉싱 케어. 머리부터 발끝까지 뭉친 전신 피로를 부드러운 손길로 완벽히 케어합니다.`,
  (city: string) => `${city} 출장 마사지 선입금 ZERO 보장! 신뢰할 수 있는 후불 정찰제로 불안감 없이 편안하게 쉬어가세요.`,
  (city: string) => `${city} 출장 마사지 24시간 안심 안내. 고객님이 계신 곳 어디든 신속하고 안전하게 방문 상담을 도와드립니다.`,
  (city: string) => `${city} 출장 마사지 프리미엄 홈스파 서비스. 특급 호텔식 테라피 프로그램을 프라이빗한 환경에서 누려보세요.`,
  (city: string) => `${city} 출장 마사지 바디케어 명가 바로힐링. 신체 밸런스 회복과 림프 순환을 돕는 정밀 케어를 제공합니다.`,
  (city: string) => `${city} 출장마사지 빠른 예약 시스템. 복잡한 절차 없이 간편한 문의로 전문 관리사의 손길을 만나보세요.`,
  (city: string) => `${city} 출장 마사지 100% 현장 결제 원칙. 사기나 예약금 피해 걱정 전혀 없는 안심 매칭 플랫폼입니다.`,
  (city: string) => `${city} 출장 마사지 차별화된 감성 케어. 지친 일상에 깊은 휴식과 따뜻한 활력을 불어넣어 드립니다.`,
  (city: string) => `${city} 출장 마사지 완벽한 컨디션 회복. 맞춤형 압 조절과 스트레칭으로 뻐근한 관절을 부드럽게 이완합니다.`,
  (city: string) => `${city} 출장 마사지 믿고 부르는 검증된 샵. 고객 평점과 솔직 후기로 입증된 안심 제휴 네트워크입니다.`,
  (city: string) => `${city} 출장 마사지 맞춤 웰니스 가이드. 과중한 업무와 운동 후 뭉친 근육을 확실하게 케어해 드립니다.`,
  (city: string) => `${city} 출장 마사지 군더더기 없는 깔끔한 방문. 철저한 청결 소독과 정갈한 매너를 기본으로 약속합니다.`,
  (city: string) => `${city} 출장 마사지 내 집안의 안식처 완성. 이동 번거로움 없이 원하는 시간에 편안하게 이용해 보세요.`,
  (city: string) => `${city} 출장 마사지 체계적인 바디 솔루션. 개인별 체형과 피로 부위에 최적화된 맞춤 테라피를 안내합니다.`,
  (city: string) => `${city} 출장 마사지 힐링의 새로운 기준. 부드러운 아로마와 깊은 압의 조화로 묵은 피로를 씻어냅니다.`,
  (city: string) => `${city} 출장 마사지 신속 방문 케어. 권역별 담당 테라피스트 매칭으로 대기 시간을 최소화해 드립니다.`,
  (city: string) => `${city} 출장 마사지 거품 없는 합리적 정찰제. 추가 요금이나 불필요한 옵션 강요 없이 투명하게 운영됩니다.`,
  (city: string) => `${city} 출장 마사지 고객 만족도 최상위 제휴처. 친절한 매너와 숙련된 실력으로 감동을 전해드립니다.`,
  (city: string) => `${city} 출장 마사지 정직한 현장 후불제. 직접 관리사를 만나신 후 결제하므로 언제나 안전합니다.`,
  (city: string) => `${city} 출장 마사지 활력 충전 릴렉스 프로그램. 숙면을 취하지 못하는 분들을 위한 편안한 케어를 선사합니다.`,
  (city: string) => `${city} 출장 마사지 전문 자격 테라피스트 파견. 정확한 관리 테크닉으로 차원이 다른 시원함을 선물합니다.`,
  (city: string) => `${city} 출장 마사지 스트레스 제로존 완성. 복잡한 생각은 비우고 온전한 쉼에만 집중할 수 있도록 돕습니다.`,
  (city: string) => `${city} 출장 마사지 최적의 휴식 솔루션. 하루 일과를 마치고 나만을 위해 준비하는 특별한 힐링 선물입니다.`,
  (city: string) => `${city} 출장 마사지 목·어깨 집중 케어. 모니터와 스마트폰으로 굳어진 상체를 집중적으로 이완해 드립니다.`,
  (city: string) => `${city} 출장 마사지 안전 제일 운영 정책. 불법 요구를 철저히 배제하고 건전한 휴식 문화만을 선도합니다.`,
  (city: string) => `${city} 출장 마사지 심신 안정 아로마 테라피. 은은한 향과 섬세한 압으로 림프의 원활한 순환을 돕습니다.`,
  (city: string) => `${city} 출장 마사지 신뢰의 이름 바로힐링. 예약부터 케어 완료까지 철저하게 고객 만족을 책임집니다.`,
  (city: string) => `${city} 출장 마사지 부담 없는 힐링 라이프. 언제든 편안한 시간대에 맞춰 전문 케어를 신청할 수 있습니다.`,
  (city: string) => `${city} 출장 마사지 전신 피로 해소 명소. 몸이 무겁고 찌뿌둥할 때 망설임 없이 찾는 안심 힐링 공간입니다.`,
  (city: string) => `${city} 출장 마사지 수준 높은 홈 테라피. 외부 샵에 가지 않고도 최고급 호텔 스파를 내 방에서 누려보세요.`,
  (city: string) => `${city} 출장 마사지 정성 어린 방문 서비스. 1:1 전담 마스터가 지친 몸과 마음을 세심하게 보살펴드립니다.`,
  (city: string) => `${city} 출장 마사지 즉시 상담 및 예약 접수. 검증된 권역별 파트너 정보와 상세 코스를 지금 확인하세요.`
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const seedString = `${cityName}-${city.toLowerCase()}-baro-city-pattern-v2`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const serviceIdx = charSum % spacedServicePatterns.length;
  const bookingIdx = (charSum * 3) % bookingPatterns.length;
  const descIdx = (charSum * 7) % descTemplates.length;

  const finalTitle = `${cityName} ${spacedServicePatterns[serviceIdx]} | ${cityName} ${bookingPatterns[bookingIdx]} - ${SITE_NAME}`;
  const finalDescription = descTemplates[descIdx](cityName);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}`,
    },
    keywords: [
      `${cityName} ${spacedServicePatterns[serviceIdx]}`,
      `${cityName} 출장 스웨디시 마사지`,
      `${cityName} 출장 밸런스 케어 마사지`,
      `${cityName} 출장 베이직 힐링 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}`,
      siteName: `${SITE_NAME} (Baro Wellness)`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districts = region?.districts || {};

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">REGIONAL WELLNESS GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{cityName} 전지역 프리미엄 맞춤 케어 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {cityName} 전역의 세부 권역별 검증된 홈 케어 안내입니다. 원하시는 구·시·군을 선택해 세부 정보를 확인해 보세요.
          </p>
        </section>

        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            📍 {cityName} 세부 권역(구·시·군) 선택
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {Object.entries(districts).map(([dKey, dVal]) => (
              <Link
                key={dKey}
                href={`/${city}/${dKey}`}
                className="px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition text-center flex items-center justify-between"
              >
                <span>{dVal.name}</span>
                <span className="text-sky-500">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}