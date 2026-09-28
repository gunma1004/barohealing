import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    id: string;
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

// 🌟 2단: 서브 안내 및 안심 소구 패턴 (10종)
const bookingPatterns = [
  "100% 안심 후불제 예약", "투명 정찰제 실시간 매칭", "검증된 테라피스트 방문",
  "전지역 빠른 방문 상담", "선입금 없는 프라이빗 케어", "당일 신속 홈케어 안내",
  "정직한 정찰제 안심 예약", "1:1 프라이빗 맞춤 안내", "선입금 ZERO 현장 결제", "피로회복 힐링 솔루션"
];

// 🌟 타이틀 문장 구조 다변화 템플릿 (5가지 형식으로 단조로움 탈피)
const titleStructureTemplates = [
  (dist: string, shop: string, srv: string, book: string) => `${dist} ${shop} ${srv} | ${book} - ${SITE_NAME}`,
  (dist: string, shop: string, srv: string, book: string) => `[${shop}] ${dist} ${srv} 안내 (${book}) | ${SITE_NAME}`,
  (dist: string, shop: string, srv: string, book: string) => `${dist} ${srv} 추천 제휴처 ${shop} | ${book}`,
  (dist: string, shop: string, srv: string, book: string) => `${dist} ${shop} - ${srv} 전문 코스 안내 (${book})`,
  (dist: string, shop: string, srv: string, book: string) => `${shop} (${dist}) 프리미엄 ${srv} | ${book} - ${SITE_NAME}`
];

// 🌟 디스크립션 문장 구성 다변화 템플릿 (구이름 바로 뒤 '출장마사지' 고정 + 다채로운 톤앤매너 10종)
const descTemplates = [
  (dist: string, shop: string, minPrice: string) => `${dist} 출장마사지 공식 파트너 ${shop}! 최저 ${minPrice}부터 시작하는 투명 정찰제와 100% 안심 현장 후불 결제로 편안하게 이용하세요.`,
  (dist: string, shop: string) => `${dist} 출장마사지 신뢰의 이름 바로힐링. ${shop}의 엄선된 전문 테라피스트가 뭉친 전신 근육과 피로를 부드럽게 이완해 드립니다.`,
  (dist: string, shop: string) => `${dist} 출장마사지 빠른 방문 안내. ${shop}은 선입금이나 예약금 요구 없이 계신 곳까지 신속하게 방문하여 맞춤형 힐링을 선사합니다.`,
  (dist: string, shop: string, minPrice: string) => `${dist} 출장마사지 예약 플랫폼. ${shop}의 대표 코스를 ${minPrice}부터 부담 없는 정찰제로 만나보실 수 있습니다.`,
  (dist: string, shop: string) => `${dist} 출장마사지 추천 제휴점 ${shop}! 쾌적한 1:1 프라이빗 케어와 철저한 위생 관리로 호텔 스파급 휴식을 내 집에서 경험해 보세요.`,
  (dist: string, shop: string) => `${dist} 출장마사지 안심 매칭 서비스. 사기 걱정 없는 100% 현장 결제 원칙을 준수하는 ${shop}의 정규 코스와 요금을 지금 확인하세요.`,
  (dist: string, shop: string) => `${dist} 출장마사지 전문 힐링 가이드. 일상과 야근으로 누적된 피로를 ${shop}만의 프리미엄 바디케어 테크닉으로 확실하게 풀어드립니다.`,
  (dist: string, shop: string, minPrice: string) => `${dist} 출장마사지 투명 정찰제 안내. ${shop}의 스웨디시 및 아로마 코스를 ${minPrice}부터 현장 결제로 안전하게 누려보세요.`,
  (dist: string, shop: string) => `${dist} 출장마사지 고객 만족도 우수 제휴처 ${shop}. 친절한 상담과 숙련된 테라피스트의 손길로 차원이 다른 휴식을 선물합니다.`,
  (dist: string, shop: string) => `${dist} 출장마사지 실시간 상담 및 예약. ${shop}과 함께 복잡한 절차 없이 간편하고 안전하게 최고의 홈케어를 시작해 보세요.`
];

// 🌟 5개 공식 제휴 업체 원본 데이터
const shopDatabase: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
  features: string[];
}> = {
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
  const { city, district, id } = resolvedParams;
  const shop = shopDatabase[id] || shopDatabase["1"];
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const cityText = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";
  const locationPrefix = `${cityText} ${districtName}`;

  // 고유 해시 계산
  const seedString = `${locationPrefix}-${id}-${shop.name}-district-shop-seo-advanced`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const structIdx = charSum % titleStructureTemplates.length;
  const serviceIdx = (charSum * 3) % spacedServicePatterns.length;
  const bookingIdx = (charSum * 5) % bookingPatterns.length;
  const descIdx = (charSum * 7) % descTemplates.length;

  const minPrice = shop.courses[0]?.items[0]?.price || "합리적인 가격";

  // 다변화된 템플릿으로 최종 타이틀 및 설명 생성
  const finalTitle = titleStructureTemplates[structIdx](
    districtName,
    shop.name,
    spacedServicePatterns[serviceIdx],
    bookingPatterns[bookingIdx]
  );
  
  const finalDescription = descTemplates[descIdx](districtName, shop.name, minPrice);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/shop/${id}`,
    },
    keywords: [
      `${districtName} ${shop.name}`,
      `${districtName} ${spacedServicePatterns[serviceIdx]}`,
      `${districtName} 출장마사지`,
      `${locationPrefix} 홈케어`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/shop/${id}`,
      siteName: `${SITE_NAME} (Baro Wellness)`,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: `${locationPrefix} ${shop.name}` }],
    },
  };
}

export default async function DistrictShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, id } = resolvedParams;
  const shop = shopDatabase[id] || shopDatabase["1"];

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const cityText = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";
  const locationPrefix = `${cityText} ${districtName}`;
  
  const displayShopTitle = `${locationPrefix} 안심 방문 케어 - ${shop.name}`;

  const allShopsList = Object.entries(shopDatabase).map(([sId, sVal]) => ({
    id: sId,
    name: sVal.name,
    badge: sVal.badge,
    desc: sVal.desc,
    phone: sVal.phone,
    image: sVal.image,
    active: sId === id
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `${SITE_URL}/${city}/${district}/shop/${id}`,
    "image": `${SITE_URL}${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": locationPrefix,
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 상단 현재 선택된 샵 정보 카드 */}
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.85]" />
            <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">✨ {shop.badge}</span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-white rounded-t-3xl border-t border-slate-100">
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
              📍 {locationPrefix} 방문 제휴처
            </span>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{displayShopTitle}</h1>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{shop.desc}</p>
          </div>
        </section>

        {/* 전체 제휴 샵 목록 보기 카드 섹션 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PARTNER SHOPS IN {districtName}</span>
            <h3 className="text-base md:text-xl font-black text-slate-900 mt-1">
              ✨ {locationPrefix} 공식 제휴처 (총 5곳)
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {allShopsList.map((s) => (
              <div 
                key={s.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  s.active 
                    ? "bg-sky-50/60 border-sky-400 shadow-xs" 
                    : "bg-slate-50 border-slate-200 hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">{s.name}</span>
                      {s.active && <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">선택됨</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/${city}/${district}/shop/${s.id}`}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      s.active
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-600 hover:text-white hover:border-sky-600"
                    }`}
                  >
                    {s.active ? "안내 보기" : "샵 선택"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 가격 안내 */}
        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 {shop.name} 정규 코스 및 요금</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-sky-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a href={`tel:${shop.phone}`} className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-sm">📞 전화예약 ({shop.phone})</a>
          <a href={`sms:${shop.phone}`} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3.5 rounded-2xl text-xs md:text-sm">💬 문자상담</a>
        </div>
      </div>
    </div>
  );
}