import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomDistrictShopList, { ShopItem } from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

const SITE_URL = "https://barohealing.netlify.app";
const SITE_NAME = "바로힐링";

// 🌟 1단: '출장' + 코스 + '마사지'를 완전히 띄어 쓴 수식어 패턴 (40종)
const spacedServicePatterns = [
  "출장 스웨디시 마사지", "출장 릴렉스 마사지", "출장 아로마 마사지", "출장 바디케어 마사지",
  "출장 타이 마사지", "출장 딥티슈 마사지", "출장 프리미엄 마사지", "출장 감성힐링 마사지",
  "출장 맞춤형 마사지", "출장 전신케어 마사지", "출장 홈 테라피 마사지", "출장 힐링케어 마사지",
  "출장 에스테틱 마사지", "출장 림프순환 마사지", "출장 시그니처 마사지", "출장 스트레칭 마사지",
  "출장 피로회복 마사지", "출장 호텔식 마사지", "출장 프라이빗 마사지", "출장 웰니스 마사지",
  "출장 힐링 테라피 마사지", "출장 소프트스웨디시 마사지", "출장 딥릴렉스 마사지", "출장 오일케어 마사지",
  "출장 전신이완 마사지", "출장 활력케어 마사지", "출장 체형맞춤 마사지", "출장 건식타이 마사지",
  "출장 딥케어 마사지", "출장 명품힐링 마사지", "출장 안심방문 마사지", "출장 스페셜케어 마사지",
  "출장 집중관리 마사지", "출장 감성테라피 마사지", "출장 소프트터치 마사지", "출장 근육이완 마사지",
  "출장 밸런스케어 마사지", "출장 릴렉세이션 마사지", "출장 베이직힐링 마사지", "출장 VIP케어 마사지"
];

// 🌟 2단: 서브 안내 및 예약 패턴 (8종)
const bookingPatterns = [
  "100% 안심 후불제 예약", "투명 정찰제 실시간 매칭", "검증된 테라피스트 방문",
  "전지역 빠른 방문 상담", "선입금 없는 프라이빗 케어", "당일 신속 홈케어 안내",
  "정직한 정찰제 안심 예약", "1:1 프라이빗 맞춤 안내"
];

// 🌟 디스크립션 템플릿: {districtName} 바로 뒤에 붙여쓴 '출장마사지' 배치
const descTemplates = [
  (dist: string) => `${dist} 출장마사지 전문 바로힐링! 선입금 없는 100% 현장 결제와 검증된 테라피스트의 방문 힐링 케어를 지금 확인하세요.`,
  (dist: string) => `${dist} 출장마사지 안심 예약 플랫폼. 정직한 정찰제 시스템으로 과도한 피로와 뭉친 근육을 부드럽게 풀어드립니다.`,
  (dist: string) => `${dist} 출장마사지 추천 제휴 안내. 내 집에서 가장 편안하게 누리는 프라이빗 1:1 맞춤형 바디케어 프로그램.`,
  (dist: string) => `${dist} 출장마사지 빠른 방문 서비스. 릴렉싱부터 전신 스트레칭까지 예약금 걱정 없이 안전하게 이용해 보세요.`,
  (dist: string) => `${dist} 출장마사지 투명 정찰제 안내. 전지역 신속 매칭과 철저한 위생 관리로 최고의 휴식을 선사합니다.`
];

// 🌟 지정해주신 5개 공식 제휴 업체 원본 데이터
const rawShopsData: Record<string, Omit<ShopItem, "id">> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["100% 안심 후불제", "25분 내 신속 방문", "24시간 상시 운영", "전문 관리사 1:1 배정"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 제휴 샵.",
    courses: [
      {
        category: "아로디시 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국인 스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 방문", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    courses: [
      {
        category: "건식 코스",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const locationKeyword = `${cityName} ${districtName}`;

  const seedString = `${locationKeyword}-${district.toLowerCase()}-baro-district-pattern-v3`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const serviceIdx = charSum % spacedServicePatterns.length;
  const bookingIdx = (charSum * 3) % bookingPatterns.length;
  const descIdx = (charSum * 7) % descTemplates.length;

  const finalTitle = `${districtName} ${spacedServicePatterns[serviceIdx]} | ${districtName} ${bookingPatterns[bookingIdx]} - ${SITE_NAME}`;
  const finalDescription = descTemplates[descIdx](districtName);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    keywords: [
      `${districtName} ${spacedServicePatterns[serviceIdx]}`,
      `${districtName} 출장마사지`,
      `${locationKeyword} 홈케어`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}`,
      siteName: `${SITE_NAME} (Baro Wellness)`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const fullTitle = `${cityName} ${districtName}`;

  // 샵 데이터 배열 변환
  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href={`/${city}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {cityName} 전체보기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL WELLNESS GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 프리미엄 방문 케어 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 고객님을 위한 엄선된 홈 테라피 및 바디케어 제휴처 안내입니다. 검증된 프로그램과 투명한 정찰제 정보를 확인해 보세요.
          </p>
        </section>

        {/* 하위 동(읍/면) 선택 칩 리스트 */}
        {districtInfo && districtInfo.dongs && districtInfo.dongs.length > 0 && (
          <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              📍 {districtName} 세부 지역(동·읍·면) 선택
            </h2>
            <div className="flex flex-wrap gap-2">
              {districtInfo.dongs.map((dongName, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}/${encodeURIComponent(dongName)}`}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                >
                  {dongName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 새로고침 시 순서 셔플되는 제휴 샵 목록 */}
        <RandomDistrictShopList
          initialShops={shops}
          fullTitle={fullTitle}
          city={city}
          district={district}
        />
      </main>
    </div>
  );
}