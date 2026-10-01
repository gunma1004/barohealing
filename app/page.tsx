import { Metadata } from "next";
import Link from "next/link";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

export const metadata: Metadata = {
  // 규칙 1: 타이틀은 '출장 [수식어] 마사지' 분리 구조
  title: `${SITE_NAME} | 경기·인천·서울 출장 프리미엄 마사지 & 바디케어 가이드`,
  // 규칙 2: 지역명 바로 뒤에 '출장 마사지' 필수 결합
  description:
    "경기, 인천, 서울 출장 마사지 수도권 전 지역 검증된 프리미엄 홈테라피 안내. 100% 안심 후불제와 체계적인 바디 컨디셔닝 케어를 바로힐링에서 경험해 보세요.",
  keywords: [
    "바로힐링",
    "서울 출장 마사지",
    "경기 출장 마사지",
    "인천 출장 마사지",
    "출장 스웨디시 마사지",
    "출장 타이 마사지",
    "출장 아로마 마사지",
    "홈케어 플랫폼",
    "안심 후불제",
    "프리미엄 웰니스",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | 수도권 출장 힐링 마사지 & 바디 테라피`,
    description:
      "서울, 경기, 인천 출장 마사지 전 지역 안심 테라피 정보 안내. 투명한 정찰제 요금과 프라이빗 케어 가이드.",
    url: SITE_URL,
    siteName: `${SITE_NAME} (Baro Wellness)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "바로힐링 - 수도권 출장 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 경기·인천·서울 출장 프리미엄 마사지`,
    description:
      "경기·인천·서울 출장 마사지 정식 제휴 매장 및 프라이빗 맞춤 테라피 안내",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  // 네이버/구글 봇을 위한 Schema.org FAQ 및 웹사이트 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: `${SITE_NAME} 수도권 힐링 테라피 플랫폼`,
        url: SITE_URL,
        description:
          "서울, 경기, 인천 전 지역 출장 타이, 아로마, 스웨디시 마사지 및 바디 컨디셔닝 정보 포털",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "예약 후 방문까지 소요 시간은 얼마나 걸리나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "서울, 경기, 인천 주요 도심 권역별로 관리 매니저가 상시 대기 중이므로 예약 확정 후 평균 30분~40분 내외로 신속하게 방문 관리가 가능합니다.",
            },
          },
          {
            "@type": "Question",
            name: "선입금 요구나 예약금이 따로 발생하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "바로힐링은 노쇼 예약금이나 선입금을 절대 요구하지 않습니다. 관리사가 현장에 도착한 후 결제하는 100% 현장 후불제로 안전하게 운영됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "자택이 아닌 호텔이나 오피스텔에서도 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 개인 자택은 물론 출장지 비즈니스호텔, 레지던스, 오피스텔 등 프라이빗한 휴식 공간이라면 어디서든 편안하게 케어를 받으실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  const servicePrograms = [
    {
      title: "출장 타이 마사지",
      badge: "스트레칭 & 이완",
      desc: "지친 일상 속 굳어있던 척추와 전신 근육을 정통 수기 압과 스트레칭으로 유연하게 풀어주는 클래식 바디 프로그램.",
      points: ["만성 피로 및 근육 뭉침 해소", "전신 관절 가동성 회복", "체계적인 압 조절 테라피"],
    },
    {
      title: "출장 아로마 마사지",
      badge: "천연 에센셜 오일",
      desc: "고급 식물성 천연 오일을 도포하여 심신 안정과 피부 보습을 돕고, 부드러운 손길로 누적된 스트레스를 녹여내는 릴렉싱 코스.",
      points: ["스트레스 완화 및 숙면 유도", "피부 보습 & 영양 공급", "저자극 부드러운 순환 케어"],
    },
    {
      title: "출장 스웨디시 마사지",
      badge: "프리미엄 림프 케어",
      desc: "따뜻한 오일과 감각적인 유러피언 테크닉으로 림프선을 자극하여 신체 노폐물 배출과 깊은 휴식을 유도하는 최고급 코스.",
      points: ["림프 순환 및 붓기 완화", "감성 힐링 & 신경계 안정", "온도 맞춤형 웜오일 테라피"],
    },
  ];

  const faqs = [
    {
      q: "이용 요금 결제는 어떻게 진행되나요?",
      a: "바로힐링은 불법 선입금 사기를 원천 차단하기 위해 100% 현장 후불제(현금, 계좌이체 등)로 운영됩니다. 관리사가 도착해 직접 대면하기 전까지 어떠한 명목으로도 사전 입금을 요구하지 않습니다.",
    },
    {
      q: "수도권 전 지역 방문이 가능한가요?",
      a: "서울 25개 자치구, 인천(부평, 송도, 청라 등), 경기(수원, 성남, 고양, 용인, 화성 등) 전 지역에 걸쳐 촘촘한 기동 네트워크를 보유하고 있어 언제든 신속하게 이용하실 수 있습니다.",
    },
    {
      q: "당일 즉시 예약도 가능한가요?",
      a: "24시간 365일 연중무휴로 운영되므로 당일 즉시 예약이 가능합니다. 다만 특정 피크 시간대(퇴근 시간, 심야)에는 대기 시간이 발생할 수 있으니 30분~1시간 전 사전 예약을 권장합니다.",
    },
    {
      q: "준비해야 할 물품이 따로 있나요?",
      a: "타월, 최고급 마사지 오일, 일회용 위생용품 등 관리에 필요한 일체의 전문 용품을 관리 매니저가 직접 구비하여 방문하므로 편안한 옷차림으로 기다려 주시기만 하면 됩니다.",
    },
  ];

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden">
      {/* 검색엔진 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0b0914]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#00ff88] rounded-full inline-block"></span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="#programs"
              className="text-xs font-bold text-gray-300 hover:text-white hidden sm:inline-block"
            >
              프로그램 안내
            </a>
            <a
              href="#faq"
              className="text-xs font-bold text-gray-300 hover:text-white hidden sm:inline-block"
            >
              자주 묻는 질문
            </a>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
              수도권 전지역 30분 케어
            </span>
          </div>
        </div>
      </header>

      {/* 기존 클라이언트 인터랙션 영역 (상단 배치) */}
      <div className="relative z-10">
        <MainClientUI />
      </div>

      {/* 검색 봇 및 사용자를 위한 풍부한 정보 섹션 */}
      <main className="max-w-[1000px] mx-auto px-4 py-16 space-y-20 relative z-20">
        
        {/* 서비스 핵심 가치 (신뢰 지표) */}
        <section className="bg-[#141024] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-[700px] mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#00ff88] tracking-widest uppercase">
              BARO WELLNESS STANDARD
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              바로힐링 안심 4대 운영 원칙
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              고객님의 온전한 휴식과 안락함을 위해 타협하지 않는 4가지 약속을 지킵니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-3xl">🛡️</span>
              <h3 className="font-bold text-white text-base">100% 현장 후불제</h3>
              <p className="text-xs text-gray-300">선입금·예약금 없는 안전한 현장 직접 결제 시스템</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-3xl">⏱️</span>
              <h3 className="font-bold text-white text-base">30분 신속 방문망</h3>
              <p className="text-xs text-gray-300">서울·경기·인천 거점별 매니저 상시 대기 시스템</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-3xl">🧴</span>
              <h3 className="font-bold text-white text-base">철저한 청결 위생</h3>
              <p className="text-xs text-gray-300">일회용 커버 및 천연 프리미엄 수입 에센셜 오일 사용</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-3xl">💆</span>
              <h3 className="font-bold text-white text-base">공인 테라피스트</h3>
              <p className="text-xs text-gray-300">체계적인 교육과 실무 수기 테크닉을 이수한 전담 인력</p>
            </div>
          </div>
        </section>

        {/* 상세 프로그램 소개 섹션 */}
        <section id="programs" className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-extrabold text-[#ba8cff] tracking-widest uppercase">
              THERAPY PROGRAMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              맞춤형 출장 힐링 테라피 코스
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              컨디션과 선호 압에 따라 최적화된 바디케어 프로그램을 선택해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePrograms.map((prog, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                      {prog.badge}
                    </span>
                    <span className="text-xs text-gray-400">COURSE 0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{prog.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{prog.desc}</p>
                </div>
                <div className="border-t border-white/10 pt-4 space-y-1.5">
                  {prog.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span className="text-[#00ff88]">✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 자주 묻는 질문 (FAQ) 섹션 */}
        <section id="faq" className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-extrabold text-[#00ff88] tracking-widest uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              자주 묻는 질문 & 이용 가이드
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              고객님들께서 가장 궁금해하시는 질문들을 정리했습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141024] border border-white/10 hover:border-white/20 transition-all space-y-2"
              >
                <h3 className="text-base font-bold text-white flex items-start gap-2">
                  <span className="text-[#00ff88] font-black">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 서비스 권역 상세 안내 (SEO 텍스트 블록) */}
        <section className="bg-[#141024]/60 border border-white/5 rounded-3xl p-6 sm:p-8 text-xs text-gray-400 leading-relaxed space-y-4">
          <h3 className="font-bold text-sm text-gray-300">
            📍 바로힐링 수도권 광역 서비스 커버리지 안내
          </h3>
          <p>
            바로힐링은 서울 전역(강남, 서초, 송파, 마포, 영등포, 용산, 종로 등 25개 자치구), 
            인천광역시(부평, 계양, 남동구, 연수구 송도, 서구 청라 등), 
            경기도 전 권역(수원, 성남 분당·판교, 고양 일산, 용인, 화성 동탄, 안양, 부천, 남양주, 평택 등)을 포괄하는 
            수도권 최대 규모의 출장 홈케어 네트워크를 운영하고 있습니다.
          </p>
          <p>
            복잡한 예약 절차 없이 직관적인 실시간 상담을 통해 계신 곳에서 가장 가까운 베테랑 매니저가 
            신속하게 방문하여 맞춤형 힐링 테라피를 제공해 드립니다.
          </p>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 py-10 px-4 border-t border-white/10 text-center text-xs text-gray-500 space-y-2">
        <p className="font-bold text-gray-400">
          {SITE_NAME} - 서울·경기·인천 출장 힐링 테라피 & 바디케어 플랫폼
        </p>
        <p>100% 현장 후불제 안심 케어 | 24시간 연중무휴 수도권 실시간 상담</p>
        <p className="pt-2 text-[11px] text-gray-600">
          © 2026 {SITE_NAME} (Baro Wellness). All rights reserved.
        </p>
      </footer>
    </div>
  );
}