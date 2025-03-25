"use client";

import React from "react";
import { MbtiCard } from "@/features/mbti/components/MbtiCard";

export default function MbtiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">나의 MBTI는?</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          16가지 성격 유형 중 당신은 어디에 속하는지 알아보세요
        </p>
        <MbtiCard
          title="나의 MBTI는?"
          description="16가지 성격 유형 중 당신은 어디에 속하는지 알아보세요"
          duration="5분"
          participants="8.5만명"
          onClick={() => console.log("MBTI 테스트 시작")}
        />
      </div>
    </div>
  );
} 