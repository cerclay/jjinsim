"use client";

import React, { useState, useEffect } from "react";
import { TravelTest } from "@/features/travel-match/components/TravelTest";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import testData from "../data.json";

export default function TravelMatchStartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setData(testData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBackToIntro = () => {
    router.push('/tests/travel-match');
  };

  if (loading) {
    return (
      <main className="py-8 px-4 min-h-screen bg-white">
        <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">테스트 데이터를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 px-4 min-h-screen bg-white">
      <div className="max-w-[500px] mx-auto space-y-8">
        <TravelTest 
          questions={data.questions}
          results={data.results}
          onBack={handleBackToIntro}
        />
      </div>
    </main>
  );
} 