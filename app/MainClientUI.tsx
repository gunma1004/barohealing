"use client";

import { useState } from "react";
import Link from "next/link";
import { regionData } from "@/lib/regions";

export default function MainClientUI() {
  const [activeSido, setActiveSido] = useState("seoul");
  const selectedRegion = regionData[activeSido] || regionData["seoul"];
  const districtsArray = Object.entries(selectedRegion.districts);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-black text-sm">BH</div>
            <div>
              <div className="text-base font-extrabold text-slate-900 leading-none">바로힐링</div>
              <div className="text-[10px] text-slate-400 mt-0.5">BARO WELLNESS PLATFORM</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/prices" className="text-xs font-bold text-slate-600 hover:text-sky-600">이용안내</Link>
            <Link href="/reviews" className="text-xs font-bold text-slate-600 hover:text-sky-600">고객후기</Link>
          </div>
        </div>
      </header>

      {/* 🌟 banner.jpg 배너 영역 */}
      <section className="relative overflow-hidden bg-slate-900 text-center border-b border-slate-200 py-16 px-4">
        <img 
          src="/banner.jpg" 
          alt="바로힐링 프리미엄 홈 테라피 배너" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]" 
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="bg-sky-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            PREMIUM HOME THERAPY
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
            경기·인천·서울 프리미엄 방문 바디케어 플랫폼
          </h1>
          <p className="text-slate-200 text-xs md:text-sm font-medium leading-relaxed">
            수도권 전 지역 투명한 정찰제 및 100% 안심 후불제 시스템으로 <br className="hidden md:block" />가장 편안한 공간에서 완벽한 휴식을 선사합니다.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>📍</span> 수도권 전체 지역별 맞춤 홈 테라피 파트너 찾기
        </h2>

        {/* 시도 선택 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(regionData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveSido(key)}
              className={`px-5 py-2.5 rounded-xl border font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                activeSido === key
                  ? "bg-sky-50 text-sky-700 border-sky-400 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>

        {/* 구/시/군 순서 고정 출력 */}
        <div className="space-y-4">
          {districtsArray.map(([distKey, distVal]) => (
            <div key={distKey} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="font-extrabold text-slate-900 text-base mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>{distVal.name}</span>
                <Link href={`/${activeSido}/${distKey}`} className="text-xs font-bold text-sky-600 hover:underline">
                  권역 전체보기 &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {distVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/${activeSido}/${distKey}/${encodeURIComponent(dong)}`}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition shadow-2xs"
                  >
                    {dong} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-2 text-center md:text-left">
          <div className="font-bold text-white text-sm">바로힐링 (Baro Wellness)</div>
          <p>공식 웹사이트: https://barohealing.netlify.app/</p>
          <p>경기·인천·서울 제휴 웰니스 & 방문 바디케어 플랫폼</p>
          <p className="text-slate-500 pt-2">© 2026 바로힐링. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}