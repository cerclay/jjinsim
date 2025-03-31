"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

export default function MbtiStartPage() {
  const [showTest, setShowTest] = useState(true);

  const handleBackToIntro = () => {
    window.location.href = '/tests/mbti';
  };

  return (
    <main className="py-8 px-4 bg-white text-black">
      <div className="max-w-[500px] mx-auto space-y-8">
        <MbtiTest 
          questions={mbtiQuestions}
          onBack={handleBackToIntro}
        />
      </div>
    </main>
  );
} 