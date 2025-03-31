"use client";

import React, { useState } from "react";
import { MbtiCard } from "@/features/mbti/components/MbtiCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MbtiPage() {
  const [testStarted, setTestStarted] = useState(false);

  const startTest = () => {
    setTestStarted(true);
    // 실제 테스트 시작 로직을 추가할 수 있습니다
    window.location.href = '/tests/mbti/start';  // 실제 테스트 페이지로 리디렉션
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-between items-center"
        >
          <Link href="/" className="flex items-center text-purple-800 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>홈으로</span>
          </Link>
          <h1 className="text-3xl font-bold text-center">MBTI 빠르고 정확하게!</h1>
          <div className="w-8"></div>
        </motion.div>
        
        <div className="p-4">
          <MbtiCard
            title="MBTI 빠르고 정확하게!"
            description="20개의 질문으로 당신의 성격 유형을 정확하게 분석해 드립니다."
            imageUrl="https://blogger.googleusercontent.com/img/a/AVvXsEgTe9x3WFzi7SUAvTqEvnThlLpoEqxtEV9l7IxRByB6KacW6PnSNu8YdDmXloWzuME_v7G8cPpe1ftCjfLU9qoXj_4k87eNgna8u8NEPTVvhDU-aHheaQbQgcqTeEilvFLGor-oQ8FWro_3pbb96PIvQJE6Orc7HsrxFr0h3eg824EhoPLibzDsDkyfPOE"
            onClick={startTest}
            duration="5분"
            participants="2.3만명"
          />
        </div>
      </div>
    </div>
  );
} 