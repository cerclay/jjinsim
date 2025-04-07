"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Users, Brain, Star, Clock, Share2, Lightbulb, Shield, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// 서비스 특징 데이터
const features = [
  {
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    title: "심층적인 심리 분석",
    description: "최신 심리학 연구와 빅데이터를 기반으로 한 정확하고 심층적인 분석 결과를 제공합니다."
  },
  {
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    title: "다양한 테스트 콘텐츠",
    description: "MBTI, 퍼스널컬러, 성격유형 등 40여 가지의 다양한 테스트 콘텐츠를 무료로 즐길 수 있습니다."
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    title: "빠르고 간편한 진행",
    description: "평균 3-5분 내에 완료할 수 있는 최적화된 테스트로 부담 없이 참여할 수 있습니다."
  },
  {
    icon: <Share2 className="h-5 w-5 text-green-500" />,
    title: "소셜 공유 기능",
    description: "나의 결과를 친구들과 쉽게 공유하고 비교하며 더 깊은 관계를 만들어 보세요."
  }
];

// 서비스 장점 데이터
const benefits = [
  {
    title: "자기 이해",
    description: "나 자신의 내면을 더 깊이 이해하고 강점과 약점을 파악할 수 있습니다."
  },
  {
    title: "관계 향상",
    description: "타인의 성격을 이해하며 더 원활한 의사소통과 관계 형성에 도움을 줍니다."
  },
  {
    title: "성장 기회",
    description: "자신의 잠재력을 발견하고 개인적 성장을 위한 인사이트를 얻을 수 있습니다."
  },
  {
    title: "재미와 휴식",
    description: "가볍게 즐기며 스트레스를 해소하고 일상에 활력을 더할 수 있습니다."
  }
];

// 테스트 항목 데이터 - 가시성 향상을 위해 추가
const tests = [
  { 
    name: "MBTI 심층분석", 
    description: "16가지 성격 유형을 통해 당신의 진정한 내면을 발견해 보세요."
  },
  { 
    name: "퍼스널컬러", 
    description: "당신에게 가장 잘 어울리는 색상 팔레트를 찾아드립니다."
  },
  { 
    name: "애착유형", 
    description: "관계에서 당신이 보이는 고유한 패턴을 이해해 보세요."
  },
  { 
    name: "연애스타일", 
    description: "사랑에 빠질 때 당신만의 특별한 방식을 알아보세요."
  },
  { 
    name: "직업적성", 
    description: "당신의 강점을 살릴 수 있는 최적의 직업군을 탐색해 보세요."
  },
  { 
    name: "성격강점", 
    description: "당신만의 특별한 강점과 장점을 발견해 보세요."
  },
  { 
    name: "스트레스 지수", 
    description: "스트레스에 대처하는 당신만의 방식을 알아보세요."
  },
  { 
    name: "결혼관", 
    description: "결혼과 가족에 대한 당신의 가치관을 탐색해 보세요."
  }
];

// 팀 가치관 - 가치 중심으로 변경
const teamValues = [
  {
    title: "진정성",
    description: "우리는 모든 테스트와 결과 분석에 과학적 근거와 진정성을 담습니다. 과장되거나 왜곡된 결과가 아닌, 정확하고 유의미한 인사이트를 제공하기 위해 끊임없이 연구하고 검증합니다.",
    icon: <Heart className="h-8 w-8 text-white" />,
    color: "bg-rose-600",
    titleColor: "text-white font-extrabold"
  },
  {
    title: "창의성",
    description: "복잡한 심리학적 개념을 누구나 쉽게 이해하고 즐길 수 있도록 창의적인 방법을 고민합니다. 우리는 사용자 경험을 최우선으로 생각하며, 항상 새롭고 몰입감 있는 테스트 여정을 디자인합니다.",
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    color: "bg-yellow-600",
    titleColor: "text-white font-extrabold"
  },
  {
    title: "성장 지향",
    description: "찐심은 단순한 테스트를 넘어 사용자의 자기 성장을 돕는 플랫폼이 되고자 합니다. 우리는 테스트 결과가 자기 성찰의 시작점이 되어, 더 나은 삶으로 나아가는 여정에 도움이 되길 바랍니다.",
    icon: <Sparkles className="h-8 w-8 text-white" />,
    color: "bg-blue-600",
    titleColor: "text-white font-extrabold"
  }
];

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-lg">사이트 정보 페이지입니다.</p>
    </div>
  );
} 