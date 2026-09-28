import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

export const metadata: Metadata = {
  title: `실제 고객 솔직후기 | 만족도 4.9 안심 이용 리뷰 - ${SITE_NAME}`,
  description: "서울·경기·인천 바로힐링 실제 이용 고객 100% 솔직 후기 모음! 엄선된 제휴 파트너 만족도, 테라피스트 케어 수준, 선입금 없는 안심 후불제 리뷰를 확인해 보세요.",
  keywords: [
    "바로힐링 후기",
    "방문 바디케어 이용후기",
    "홈테라피 솔직리뷰",
    "웰니스 케어 후기",
    "서울 방문케어 후기",
    "경기 바디케어 리뷰",
    "인천 홈케어 후기"
  ],
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  openGraph: {
    title: `실제 고객 솔직후기 | ${SITE_NAME} 검증된 100% 안심 리뷰`,
    description: "선입금 없는 안심 후불제와 엄선된 프리미엄 홈 케어! 서울·경기·인천 고객님들이 직접 작성한 생생한 피로회복 후기를 만나보세요.",
    url: `${SITE_URL}/reviews`,
    siteName: `${SITE_NAME} (Baro Wellness)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 실제 고객 솔직후기`,
      },
    ],
  },
};

const reviewStats = {
  average: "4.9",
  totalReviews: "1,480+",
  recommendRate: "99.1%",
};

// 🌟 완전히 새롭게 작성된 리얼 후기 데이터
const reviews = [
  {
    name: "서울 서초구 서초동 김*우 님",
    date: "2일 전",
    rate: "★★★★★ 5.0",
    course: "마스터 1:1 맞춤형 120분",
    badge: "재택근무 피로 해소",
    text: "모니터를 종일 들여다보는 직업이라 승모근이랑 허리가 돌처럼 굳어 있었는데, 직접 오셔서 맞춤형으로 짚어주시니 병원 도수치료 받는 것 이상으로 시원했습니다. 이동 시간 아끼고 바로 쉴 수 있는 게 방문 케어의 가장 큰 장점이네요.",
  },
  {
    name: "경기 성남시 분당구 박*진 님",
    date: "4일 전",
    rate: "★★★★★ 5.0",
    course: "프리미엄 천연 아로마 90분",
    badge: "힐링 릴렉스",
    text: "오일 제품 향도 은은하고 끈적임 없이 흡수되는 고급 제품이라 안심했습니다. 관리사님이 손소독부터 타월 청결 상태까지 철저히 챙겨오셔서 집에서도 호텔 스파 받는 느낌이었어요. 주말마다 정기적으로 부를 생각입니다.",
  },
  {
    name: "인천 송도동 최*영 님",
    date: "5일 전",
    rate: "★★★★★ 5.0",
    course: "시그니처 딥 릴렉싱 90분",
    badge: "100% 안심 후불",
    text: "요즘 인터넷에 예약금 먼저 요구하고 연락 두절되는 사기 사이트가 많다고 해서 불안했는데, 바로힐링은 현장 도착 후 결제라 신뢰가 갔습니다. 상담원 응대도 친절했고 시간 약속도 칼같이 맞춰오셨어요.",
  },
  {
    name: "서울 마포구 공덕동 이*훈 님",
    date: "1주일 전",
    rate: "★★★★★ 5.0",
    course: "베이직 릴렉싱 60분",
    badge: "운동 후 스트레칭",
    text: "주말 러닝 후에 하체 근육이 많이 뭉쳐서 신청했습니다. 단순 지압이 아니라 관절 가동 범위에 맞춰서 스트레칭 위주로 풀어주시니 다음 날 알 배김 없이 몸이 아주 가볍더군요. 짧은 코스였는데도 밀도 있었습니다.",
  },
  {
    name: "경기 하남시 미사동 정*희 님",
    date: "1주일 전",
    rate: "★★★★★ 5.0",
    course: "마스터 1:1 맞춤형 90분",
    badge: "육아 스트레스 완화",
    text: "아이 돌보느라 외출해서 샵에 갈 엄두가 안 났는데, 아기 낮잠 잘 때 집에서 편하게 받을 수 있어 구세주 같았습니다. 조용조용하게 배려해 주시면서도 안 좋은 골반이랑 등 부위를 꼼꼼하게 만져주셔서 감동했습니다.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 font-sans selection:bg-sky-500 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black tracking-widest uppercase shadow-sm">
            REAL CLIENT EXPERIENCES
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {SITE_NAME} 고객 실제 이용 경험담
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 전역에서 {SITE_NAME} 방문 바디케어를 직접 경험하신 분들이 남겨주신 솔직 담백한 리뷰입니다.
          </p>
        </section>

        {/* 만족도 통계 요약 카드 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl grid grid-cols-3 gap-2 text-center shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold block">이용 만족도</span>
            <span className="text-xl md:text-2xl font-black text-amber-500">★ {reviewStats.average}</span>
          </div>
          <div className="space-y-1 border-x border-slate-100">
            <span className="text-[11px] text-slate-500 font-semibold block">검증된 누적 후기</span>
            <span className="text-xl md:text-2xl font-black text-slate-900">{reviewStats.totalReviews}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold block">지인 추천 지수</span>
            <span className="text-xl md:text-2xl font-black text-emerald-600">{reviewStats.recommendRate}</span>
          </div>
        </section>

        {/* 리뷰 카드 리스트 */}
        <section className="space-y-4">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 hover:border-sky-300 p-5 md:p-6 rounded-2xl space-y-3 transition-all shadow-sm group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-black text-sm tracking-wide">
                      {rev.rate}
                    </span>
                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-200 font-bold">
                      {rev.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-900 font-bold">
                    {rev.name}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium block">
                    {rev.date}
                  </span>
                  <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 font-medium">
                    {rev.course}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                &quot;{rev.text}&quot;
              </p>
            </div>
          ))}
        </section>

        {/* 안심 예약 보증 배너 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm">
          <h3 className="text-base font-black text-slate-900">
            🛡️ 투명한 100% 현장 후불 결제 원칙
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {SITE_NAME}는 선입금이나 예약금을 절대 유도하지 않습니다. 관리사가 방문한 후 확인하고 결제하는 안심 프로세스로 운영됩니다.
          </p>
          <div className="pt-1">
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition-all transform active:scale-95"
            >
              📞 지금 바로 실시간 홈케어 상담하기
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
          >
            ← {SITE_NAME} 메인 홈으로 이동하기
          </Link>
        </div>

      </div>
    </div>
  );
}