import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomShopList from "@/components/RandomShopList";
import { ShopItem } from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
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

// 🌟 디스크립션 템플릿: {dongName} 바로 뒤에 붙여쓴 '출장마사지' 배치 (40종)
const descTemplates = [
  (dong: string) => `${dong} 출장 마사지 전문 바로힐링! 선입금 없는 100% 현장 결제와 검증된 테라피스트의 방문 힐링 케어를 지금 확인하세요.`,
  (dong: string) => `${dong} 출장마사지 안심 예약 플랫폼. 정직한 정찰제 시스템으로 과도한 피로와 뭉친 근육을 부드럽게 풀어드립니다.`,
  (dong: string) => `${dong} 출장마사지 추천 제휴 안내. 내 집에서 가장 편안하게 누리는 프라이빗 1:1 맞춤형 바디케어 프로그램.`,
  (dong: string) => `${dong} 출장 마사지 빠른 방문 서비스. 릴렉싱부터 전신 스트레칭까지 예약금 걱정 없이 안전하게 이용해 보세요.`,
  (dong: string) => `${dong} 출장 마사지 투명 정찰제 안내. 전지역 신속 매칭과 철저한 위생 관리로 최고의 휴식을 선사합니다.`,
  (dong: string) => `${dong} 출장 마사지 1등 웰니스 플랫폼. 예약금 요구 없이 관리사 도착 후 결제하는 안전한 시스템을 보장합니다.`,
  (dong: string) => `${dong} 출장 마사지 피로회복 솔루션! 야근과 일상 스트레스로 지친 현대인을 위한 맞춤 테라피를 제공합니다.`,
  (dong: string) => `${dong} 출장 마사지 엄선된 전문 테라피스트 방문. 쾌적한 내 공간에서 품격 높은 힐링 시간을 경험해 보세요.`,
  (dong: string) => `${dong} 출장 마사지 정통 릴렉싱 케어. 머리부터 발끝까지 뭉친 전신 피로를 부드러운 손길로 완벽히 케어합니다.`,
  (dong: string) => `${dong} 출장마사지 선입금 ZERO 보장! 신뢰할 수 있는 후불 정찰제로 불안감 없이 편안하게 쉬어가세요.`,
  (dong: string) => `${dong} 출장마사지 24시간 안심 안내. 고객님이 계신 곳 어디든 신속하고 안전하게 방문 상담을 도와드립니다.`,
  (dong: string) => `${dong} 출장 마사지 프리미엄 홈스파 서비스. 특급 호텔식 테라피 프로그램을 프라이빗한 환경에서 누려보세요.`,
  (dong: string) => `${dong} 출장 마사지 바디케어 명가 바로힐링. 신체 밸런스 회복과 림프 순환을 돕는 정밀 케어를 제공합니다.`,
  (dong: string) => `${dong} 출장 마사지 빠른 예약 시스템. 복잡한 절차 없이 간편한 문의로 전문 관리사의 손길을 만나보세요.`,
  (dong: string) => `${dong} 출장 마사지 100% 현장 결제 원칙. 사기나 예약금 피해 걱정 전혀 없는 안심 매칭 플랫폼입니다.`,
  (dong: string) => `${dong} 출장 마사지 차별화된 감성 케어. 지친 일상에 깊은 휴식과 따뜻한 활력을 불어넣어 드립니다.`,
  (dong: string) => `${dong} 출장 마사지 완벽한 컨디션 회복. 맞춤형 압 조절과 스트레칭으로 뻐근한 관절을 부드럽게 이완합니다.`,
  (dong: string) => `${dong} 출장 마사지 믿고 부르는 검증된 샵. 고객 평점과 솔직 후기로 입증된 안심 제휴 네트워크입니다.`,
  (dong: string) => `${dong} 출장 마사지 맞춤 웰니스 가이드. 과중한 업무와 운동 후 뭉친 근육을 확실하게 케어해 드립니다.`,
  (dong: string) => `${dong} 출장 마사지 군더더기 없는 깔끔한 방문. 철저한 청결 소독과 정갈한 매너를 기본으로 약속합니다.`,
  (dong: string) => `${dong} 출장 마사지 내 집안의 안식처 완성. 이동 번거로움 없이 원하는 시간에 편안하게 이용해 보세요.`,
  (dong: string) => `${dong} 출장 마사지 체계적인 바디 솔루션. 개인별 체형과 피로 부위에 최적화된 맞춤 테라피를 안내합니다.`,
  (dong: string) => `${dong} 출장 마사지 힐링의 새로운 기준. 부드러운 아로마와 깊은 압의 조화로 묵은 피로를 씻어냅니다.`,
  (dong: string) => `${dong} 출장 마사지 신속 방문 케어. 지역별 담당 테라피스트 매칭으로 대기 시간을 최소화해 드립니다.`,
  (dong: string) => `${dong} 출장마사지 거품 없는 합리적 정찰제. 추가 요금이나 불필요한 옵션 강요 없이 투명하게 운영됩니다.`,
  (dong: string) => `${dong} 출장 마사지 고객 만족도 최상위 제휴처. 친절한 매너와 숙련된 실력으로 감동을 전해드립니다.`,
  (dong: string) => `${dong} 출장 마사지 정직한 현장 후불제. 직접 관리사를 만나신 후 결제하므로 언제나 안전합니다.`,
  (dong: string) => `${dong} 출장마사지 활력 충전 릴렉스 프로그램. 숙면을 취하지 못하는 분들을 위한 편안한 케어를 선사합니다.`,
  (dong: string) => `${dong} 출장 마사지 전문 자격 테라피스트 파견. 정확한 관리 테크닉으로 차원이 다른 시원함을 선물합니다.`,
  (dong: string) => `${dong} 출장 마사지 스트레스 제로존 완성. 복잡한 생각은 비우고 온전한 쉼에만 집중할 수 있도록 돕습니다.`,
  (dong: string) => `${dong} 출장 마사지 최적의 휴식 솔루션. 하루 일과를 마치고 나만을 위해 준비하는 특별한 힐링 선물입니다.`,
  (dong: string) => `${dong} 출장 마사지 목·어깨 집중 케어. 모니터와 스마트폰으로 굳어진 상체를 집중적으로 이완해 드립니다.`,
  (dong: string) => `${dong} 출장마사지 안전 제일 운영 정책. 불법 요구를 철저히 배제하고 건전한 휴식 문화만을 선도합니다.`,
  (dong: string) => `${dong} 출장마사지 심신 안정 아로마 테라피. 은은한 향과 섬세한 압으로 림프의 원활한 순환을 돕습니다.`,
  (dong: string) => `${dong} 출장마사지 신뢰의 이름 바로힐링. 예약부터 케어 완료까지 철저하게 고객 만족을 책임집니다.`,
  (dong: string) => `${dong} 출장 마사지 부담 없는 힐링 라이프. 언제든 편안한 시간대에 맞춰 전문 케어를 신청할 수 있습니다.`,
  (dong: string) => `${dong} 출장 마사지 전신 피로 해소 명소. 몸이 무겁고 찌뿌둥할 때 망설임 없이 찾는 안심 힐링 공간입니다.`,
  (dong: string) => `${dong} 출장 마사지 수준 높은 홈 테라피. 외부 샵에 가지 않고도 최고급 호텔 스파를 내 방에서 누려보세요.`,
  (dong: string) => `${dong} 출장 마사지 정성 어린 방문 서비스. 1:1 전담 마스터가 지친 몸과 마음을 세심하게 보살펴드립니다.`,
  (dong: string) => `${dong} 출장마사지 즉시 상담 및 예약 접수. 검증된 지역별 파트너 정보와 상세 코스를 지금 확인하세요.`
];

// 🌟 5개 공식 제휴 업체 원본 데이터
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
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);
  
  const locationKeyword = `${cityName} ${districtName} ${dongName}`;

  const seedString = `${locationKeyword}-${district.toLowerCase()}-${dong.toLowerCase()}-baro-dong-pattern-v2`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const serviceIdx = charSum % spacedServicePatterns.length;
  const bookingIdx = (charSum * 3) % bookingPatterns.length;
  const descIdx = (charSum * 7) % descTemplates.length;

  // 💡 [양재동 출장 스웨디시 마사지 | 서초구 100% 안심 후불제 예약 - 바로힐링] 형태
  const finalTitle = `${dongName} ${spacedServicePatterns[serviceIdx]} | ${districtName} ${bookingPatterns[bookingIdx]} - ${SITE_NAME}`;
  
  // 💡 [양재동 출장마사지 전문 바로힐링! ...] 형태
  const finalDescription = descTemplates[descIdx](dongName);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${encodeURIComponent(dong)}`,
    },
    keywords: [
      `${dongName} ${spacedServicePatterns[serviceIdx]}`,
      `${dongName} 출장마사지`,
      `${locationKeyword} 홈케어`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${encodeURIComponent(dong)}`,
      siteName: `${SITE_NAME} (Baro Wellness)`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongMainPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);

  const fullLocation = `${cityName} ${districtName} ${dongName}`;

  // 샵 데이터 배열 변환
  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-16">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME}</Link>
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 전체보기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL WELLNESS GUIDE</span>
          <h1 className="text-2xl md:text-3xl font-black">{fullLocation} 프리미엄 방문 케어 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullLocation} 고객님을 위한 엄선된 홈 테라피 및 바디케어 제휴처 안내입니다. 100% 현장 후불제 시스템으로 안심하고 이용해 보세요.
          </p>
        </section>

        {/* 새로고침 시 순서 셔플되는 제휴 샵 목록 */}
        <RandomShopList 
          initialShops={shops} 
          fullLocation={fullLocation} 
          city={city} 
          district={district} 
          dong={dong} 
        />
      </main>
    </div>
  );
}