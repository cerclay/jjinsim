"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MbtiCard } from "@/features/mbti/components/MbtiCard";
import { MbtiTest } from "@/features/mbti/components/MbtiTest";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const mbtiQuestions = [
  {
    id: 1,
    text: "모임에서 당신은 주로...",
    options: [
      { text: "새로운 사람들과 대화를 시작하는 편이다", value: "E" },
      { text: "아는 사람들과 조용히 대화하는 편이다", value: "I" }
    ]
  },
  {
    id: 2,
    text: "새로운 정보를 접할 때 당신은...",
    options: [
      { text: "구체적인 사실과 세부사항에 집중한다", value: "S" },
      { text: "전체적인 의미와 가능성을 고려한다", value: "N" }
    ]
  },
  {
    id: 3,
    text: "어려운 결정을 내릴 때 당신은...",
    options: [
      { text: "논리와 사실에 기반하여 판단한다", value: "T" },
      { text: "상황과 감정을 고려하여 결정한다", value: "F" }
    ]
  },
  {
    id: 4,
    text: "일상생활에서 당신은...",
    options: [
      { text: "계획적이고 체계적으로 진행하는 것이 좋다", value: "J" },
      { text: "유연하게 상황에 따라 진행하는 것이 좋다", value: "P" }
    ]
  },
  {
    id: 5,
    text: "대화할 때 당신은...",
    options: [
      { text: "폭넓게 여러 사람과 대화하는 것을 선호한다", value: "E" },
      { text: "깊이 있게 소수의 사람과 대화하는 것을 선호한다", value: "I" }
    ]
  },
  {
    id: 6,
    text: "새로운 기술이나 아이디어를 접했을 때...",
    options: [
      { text: "실용성과 현실적 적용 가능성을 먼저 생각한다", value: "S" },
      { text: "창의적인 활용 방법과 미래 가능성을 먼저 생각한다", value: "N" }
    ]
  },
  {
    id: 7,
    text: "갈등 상황에서 당신은...",
    options: [
      { text: "객관적 사실과 원칙에 따라 문제를 해결하려 한다", value: "T" },
      { text: "모두의 감정과 조화를 고려하여 해결하려 한다", value: "F" }
    ]
  },
  {
    id: 8,
    text: "여행을 갈 때 당신은...",
    options: [
      { text: "철저한 계획과 일정을 미리 세우는 편이다", value: "J" },
      { text: "대략적인 방향만 정하고 즉흥적으로 결정하는 편이다", value: "P" }
    ]
  },
  {
    id: 9,
    text: "에너지를 얻는 방식은...",
    options: [
      { text: "다른 사람들과 함께 있을 때 에너지가 충전된다", value: "E" },
      { text: "혼자만의 시간을 가질 때 에너지가 충전된다", value: "I" }
    ]
  },
  {
    id: 10,
    text: "정보를 처리할 때 당신은...",
    options: [
      { text: "경험과 현실적인 관찰에 의존한다", value: "S" },
      { text: "패턴과 직관적인 통찰력에 의존한다", value: "N" }
    ]
  },
  {
    id: 11,
    text: "친구가 고민을 털어놓을 때 당신은...",
    options: [
      { text: "문제 해결을 위한 논리적인 조언을 제공한다", value: "T" },
      { text: "공감하며 정서적 지지를 먼저 제공한다", value: "F" }
    ]
  },
  {
    id: 12,
    text: "업무나 과제를 수행할 때...",
    options: [
      { text: "마감기한을 정하고 체계적으로 진행한다", value: "J" },
      { text: "압박감 속에서 영감을 받아 집중적으로 처리한다", value: "P" }
    ]
  }
];

export default function MbtiPage() {
  const [showTest, setShowTest] = useState(false);

  const handleStartTest = () => {
    setShowTest(true);
  };

  const handleBackToIntro = () => {
    setShowTest(false);
  };

  return (
    <main className="py-8 px-4 bg-white text-black">
      <div className="max-w-[500px] mx-auto space-y-8">
        {!showTest ? (
          <>
            <div className="mb-10 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="text-sm">홈으로 돌아가기</span>
              </Link>
              
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold mt-6 mb-2 text-black relative"
              >
                MBTI 성격 유형 검사
                <div className="h-1 w-28 bg-gradient-to-r from-rose-500 to-orange-500 absolute -bottom-2 left-1/2 transform -translate-x-1/2 rounded-full"></div>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg mt-6 text-gray-700"
              >
                자신의 성격 유형을 알아보고 더 나은 자기 이해의 시간을 가져보세요.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={handleStartTest}
            >
              <MbtiCard />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="p-6 border-none shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-black drop-shadow-sm flex items-center">
                  <span className="mr-2 text-2xl">💡</span>
                  <span className="text-black">테스트 알고리즘</span>
                </h2>
                <div className="space-y-3 text-black">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full text-xs font-bold bg-rose-500 text-white w-5 h-5 flex items-center justify-center mt-0.5">1</div>
                    <p className="text-black">12개의 질문에 답변하면 당신의 성격 성향을 분석합니다. 🧠✨</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full text-xs font-bold bg-pink-500 text-white w-5 h-5 flex items-center justify-center mt-0.5">2</div>
                    <p className="text-black">각 질문은 MBTI의 4가지 지표를 측정하는 데 사용됩니다. 📊</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full text-xs font-bold bg-orange-500 text-white w-5 h-5 flex items-center justify-center mt-0.5">3</div>
                    <p className="text-black">당신의 답변을 바탕으로 가장 가까운 16가지 MBTI 유형 중 하나를 찾아드립니다! 🎯</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full text-xs font-bold bg-amber-500 text-white w-5 h-5 flex items-center justify-center mt-0.5">4</div>
                    <p className="text-black">결과를 통해 당신의 성격 특성과 장점을 알아보세요. 🌟</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        ) : (
          <MbtiTest 
            questions={mbtiQuestions}
            onBack={handleBackToIntro}
          />
        )}
      </div>
    </main>
  );
}