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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* 헤더 섹션 */}
      <header className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-40 z-0" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-pink-400/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 sm:mb-6 inline-block"
            >
              <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto shadow-lg">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
              </span>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              찐심, 당신의 내면을 비추는 거울
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-2">
              나 자신을 더 깊이 이해하고, 타인과의 관계를 개선하며, 
              진정한 내면의 성장을 경험할 수 있는 지혜의 여정을 시작하세요.
            </p>
          </motion.div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* 찐심 소개 섹션 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              찐심이란?
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900"
            >
              진정한 마음을 찾아가는 여정
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2"
            >
              찐심은 '진정한 마음(眞心)'을 뜻하는 이름처럼 여러분의 진짜 내면을 발견할 수 있는 심리 테스트 플랫폼입니다. 
              최신 심리학적 이론과 빅데이터 분석을 바탕으로 다양한 테스트를 제공하여 자기 이해와 성장의 기회를 제공합니다. 
              나를 알아가는 과정은 때로는 도전적이지만, 항상 의미 있고 보람찬 여정입니다.
            </motion.p>
          </div>

          {/* 찐심 소개 섹션의 카드 */}
          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30" />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=2069&auto=format&fit=crop" 
                  alt="자기 성찰과 성장을 상징하는 이미지" 
                  width={800}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover object-center" 
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    자기 성찰의 여정
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    찐심은 단순한 테스트 이상의 의미를 가집니다. 자신의 내면을 탐색하고, 
                    잠재된 강점을 발견하며, 성장 가능성을 열어가는 자기 성찰의 여정에 
                    동행자가 되어 드립니다.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl blur opacity-30" />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2068&auto=format&fit=crop" 
                  alt="관계 개선" 
                  width={800}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover object-center" 
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white flex items-center">
                    <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                    관계의 지혜
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    자신을 이해하는 것은 타인을 이해하는 첫걸음입니다. 찐심의 테스트를 통해 
                    나와 타인의 다양성을 인정하고 존중하며, 더 건강하고 풍요로운 인간관계를 
                    형성할 수 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 서비스 특징 섹션 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 sm:mb-16 md:mb-24 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 py-8 sm:py-12 md:py-16 rounded-2xl sm:rounded-3xl"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              서비스 특징
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900"
            >
              찐심만의 특별한 경험
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2"
            >
              찐심은 단순한 심리 테스트를 넘어 몰입감 있는 자기 탐색의 여정을 선사합니다.
              편안하면서도 통찰력 있는 경험을 통해 자신의 내면을 새롭게 발견해보세요.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto px-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 테스트 항목 섹션 - 가시성 강화 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 sm:mb-16 md:mb-24"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              다양한 테스트
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900"
            >
              나를 발견하는 다양한 방법
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8"
            >
              찐심은 40여 가지의 다양한 테스트를 통해 나의 성격, 관계 스타일, 강점, 
              커리어 적성 등 다양한 측면에서 자신을 이해할 수 있는 기회를 제공합니다.
              각 테스트는 심리학적 연구와 데이터를 기반으로 설계되어 재미있으면서도
              의미 있는 결과를 얻을 수 있습니다. 당신의 내면에 숨겨진 보석을 찾아보세요.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 max-w-md mx-auto px-4">
            {tests.map((test, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#1e293b] text-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all border border-purple-900/20"
              >
                <h3 className="font-bold text-base sm:text-lg text-white mb-2 text-center">
                  {test.name}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm text-center">
                  {test.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-6 sm:mt-8 md:mt-10"
          >
            <Link href="/tests">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base shadow-md">
                모든 테스트 보기
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        {/* 팀 소개 섹션 - 가치관 중심으로 변경 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 sm:mb-16 md:mb-24"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              찐심 팀의 가치
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900"
            >
              우리가 소중히 여기는 가치
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2"
            >
              찐심은 심리학, 디자인, 개발 분야의 전문가들이 모여 다음과 같은 가치를 바탕으로
              여러분에게 최고의 자기 발견 경험을 제공하기 위해 노력하고 있습니다.
              이러한 가치는 우리가 만드는 모든 콘텐츠와 서비스에 깊이 반영되어 있습니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto px-4">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${value.color} rounded-xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[350px] justify-between`}
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className={`${value.titleColor} text-lg sm:text-xl md:text-2xl font-extrabold mb-3 sm:mb-4 text-center`}>
                    {value.title}
                  </h3>
                </div>
                <p className="text-white text-sm sm:text-base leading-relaxed font-medium text-center px-1 mb-2">
                  {value.description.split('. ').map((sentence, i, arr) => (
                    <React.Fragment key={i}>
                      {sentence}{i < arr.length - 1 ? '. ' : ''}
                      {i === 0 && <br className="hidden md:block" />}
                      {i === 0 && <br className="hidden md:block" />}
                    </React.Fragment>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* 서비스 비전 섹션 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 sm:mb-16 md:mb-20"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              찐심의 비전
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900"
            >
              더 나은 자기 이해와 성장의 미래
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2"
            >
              우리는 찐심이 단순한 심리 테스트를 넘어 개인의 성장과 사회적 연결을 증진하는 
              플랫폼으로 발전해 나가길 바랍니다. 사람들이 자신을 이해하고, 타인을 존중하며, 
              더 나은 세상을 만들어가는 데 기여하는 것이 찐심의 궁극적인 목표입니다.
            </motion.p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl overflow-hidden relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-grid-white/10 opacity-20" />
            <div className="relative p-6 sm:p-10 md:p-16 text-white">
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                    <Shield className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    우리의 약속
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">과학적 근거에 기반한 신뢰할 수 있는 테스트 제공</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">개인정보 보호와 안전한 사용자 경험 보장</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">지속적인 연구와 혁신을 통한 서비스 개선</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">다양성을 존중하고 포용하는 플랫폼 구축</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                    <Coffee className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    함께 성장하는 방법
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">정기적인 테스트 참여로 자기 이해 깊이기</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">결과를 친구들과 공유하며 서로 이해하기</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">피드백을 통해 더 나은 찐심 만들기에 동참</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3">✦</span>
                      <span className="text-sm sm:text-base">지속적인 자기 성찰과 성장을 위한 여정 함께하기</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA 섹션 - 모바일 최적화 개선 */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-4"
        >
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl" />
            
            <motion.h2 
              variants={itemVariants} 
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900"
            >
              지금 찐심과 함께 진정한 자아를 발견하세요
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto"
            >
              다양한 심리 테스트를 통해 자신을 더 깊이 이해하고, 
              더 나은 관계를 만들며, 더 풍요로운 삶을 살아갈 수 있습니다.
              지금 바로 첫 테스트를 시작해 보세요.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link href="/" className="w-full sm:w-auto">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base shadow-md w-full sm:w-auto">
                  테스트 시작하기
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
              <Link href="/tests" className="w-full sm:w-auto">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base shadow-md w-full sm:w-auto">
                  모든 테스트 보기
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* 푸터 - 모바일 최적화 */}
      <footer className="py-4 sm:py-6 md:py-8 border-t border-gray-200 mt-8 sm:mt-12 md:mt-16 px-4">
        <div className="container mx-auto text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 찐심. 모든 권리 보유. 
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            함께 더 나은 자기 이해와 성장을 위한 여정을 만들어갑니다.
          </p>
        </div>
      </footer>
    </div>
  );
} 