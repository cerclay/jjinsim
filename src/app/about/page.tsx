"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Users, Brain, Star, Clock, Share2, Lightbulb, Shield, Coffee, BookOpen, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// 서비스 특징 데이터
const features = [
  {
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    title: "심층적인 심리 분석",
    description: "최신 심리학 연구와 빅데이터를 기반으로 한 정확하고 심층적인 분석 결과를 제공합니다. 각 테스트는 심리학적 원리와 통계적 검증을 거쳐 신뢰성을 확보했습니다."
  },
  {
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    title: "다양한 테스트 콘텐츠",
    description: "MBTI, 퍼스널컬러, 성격유형 등 40여 가지의 다양한 테스트 콘텐츠를 무료로 즐길 수 있습니다. 자기 이해부터 인간관계, 직업 적성까지 다양한 영역을 탐색해보세요."
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    title: "빠르고 간편한 진행",
    description: "평균 3-5분 내에 완료할 수 있는 최적화된 테스트로 부담 없이 참여할 수 있습니다. 바쁜 일상 속에서도 자신을 돌아볼 수 있는 소중한 시간을 가져보세요."
  },
  {
    icon: <Share2 className="h-5 w-5 text-green-500" />,
    title: "소셜 공유 기능",
    description: "나의 결과를 친구들과 쉽게 공유하고 비교하며 더 깊은 관계를 만들어 보세요. 서로의 성격 차이를 이해하며 더 깊은 대화와 공감대를 형성할 수 있습니다."
  }
];

// 서비스 장점 데이터
const benefits = [
  {
    title: "자기 이해의 여정",
    description: "나 자신의 내면을 더 깊이 이해하고 강점과 약점을 파악할 수 있습니다. 심리학자 칼 융은 '자기인식은 심리적 발전의 첫 번째 단계'라고 했습니다. 찐심의 테스트는 이 여정의 첫 발걸음입니다."
  },
  {
    title: "관계 개선과 공감 확대",
    description: "타인의 성격을 이해하며 더 원활한 의사소통과 관계 형성에 도움을 줍니다. 심리학 연구에 따르면 상대방의 성격 유형을 이해하는 것만으로도 갈등이 30% 감소한다고 합니다."
  },
  {
    title: "잠재력 발견과 성장 기회",
    description: "자신의 잠재력을 발견하고 개인적 성장을 위한 인사이트를 얻을 수 있습니다. 긍정심리학의 창시자 마틴 셀리그먼은 '자신의 강점을 아는 것이 행복의 첫 걸음'이라고 강조했습니다."
  },
  {
    title: "재미와 휴식, 일상의 활력",
    description: "가볍게 즐기며 스트레스를 해소하고 일상에 활력을 더할 수 있습니다. 자기 성찰이 반드시 무거운 과정일 필요는 없습니다. 재미있는 테스트를 통해 자신을 알아가는 과정 자체가 즐거운 경험이 될 수 있습니다."
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

// 심리학 관점 데이터 (새로 추가)
const psychologyPerspectives = [
  {
    title: "인지심리학의 관점",
    description: "인지심리학에서는 우리가 세상을 어떻게 인식하고 해석하는지가 중요합니다. 찐심의 테스트는 당신만의 독특한 사고 패턴과 의사결정 방식을 파악하는 데 도움을 줍니다.",
    icon: <Brain className="h-7 w-7 text-indigo-500" />
  },
  {
    title: "성격심리학의 통찰",
    description: "성격심리학은 인간의 다양한 특성과 행동 패턴을 연구합니다. 찐심 테스트를 통해 빅파이브 성격 특성(개방성, 성실성, 외향성, 친화성, 신경증)과 같은 과학적 모델에 기반한 자신의 성격을 이해할 수 있습니다.",
    icon: <Users className="h-7 w-7 text-blue-500" />
  },
  {
    title: "긍정심리학의 힘",
    description: "긍정심리학은 인간의 강점과 잠재력에 초점을 맞춥니다. 찐심은 당신의 강점을 발견하고 이를 일상에서 활용함으로써 더 충만한 삶을 살 수 있도록 안내합니다.",
    icon: <Sparkles className="h-7 w-7 text-yellow-500" />
  },
  {
    title: "사회심리학적 이해",
    description: "우리는 모두 사회적 존재입니다. 찐심 테스트는 당신이, 대인관계, 사회적 상호작용, 그리고 집단 내에서의 역할을 이해하는 데 새로운 시각을 제공합니다.",
    icon: <BookOpen className="h-7 w-7 text-green-500" />
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 히어로 섹션 */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-purple-50 to-white px-4">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
              찐심(JJinSim) - 찐한 심리테스트
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              당신의 내면을 비추는 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 inline-block mt-1">
                특별한 심리여행
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              찐심은 단순한 테스트를 넘어 자기 성찰과 성장을 위한 안내자가 되고자 합니다. 
              심리학에 기반한 즐겁고 의미 있는 경험을 통해 당신의 숨겨진 모습을 발견하고
              더 충만한 삶을 살아갈 수 있도록 돕겠습니다.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/tests" 
                className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                테스트 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#why-psychology"
                className="inline-flex items-center bg-white border border-gray-300 hover:border-purple-300 text-gray-700 hover:text-purple-600 font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                심리학의 중요성
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 심리학의 중요성 섹션 (새로 추가) */}
      <section id="why-psychology" className="py-12 md:py-20 bg-white px-4">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">심리학, 우리 삶을 비추는 등불</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                현대 사회에서 심리학은 단순한 학문이 아닌, 우리 삶의 질을 향상시키는 실질적인 도구가 되었습니다.
                자신과 타인을 이해하는 과정은 더 행복하고 의미 있는 삶으로 나아가는 첫걸음입니다.
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed">
              <p>
                <span className="text-purple-600 font-semibold">우리는 왜 자신을 알아야 할까요?</span> 소크라테스는 "너 자신을 알라"고 말했습니다. 
                이 간단한 명제는 수천 년이 지난 지금도 여전히 유효합니다. 자기 이해는 단순한 자아도취가 아닌, 
                현명한 선택과 건강한 관계, 그리고 행복한 삶을 위한 필수 요소입니다.
              </p>
              
              <p>
                현대 심리학 연구에 따르면, 자신의 성격, 강점, 약점, 가치관을 명확히 아는 사람들은 
                <span className="font-semibold"> 스트레스에 더 잘 대처하고, 더 만족스러운 관계를 유지하며, 직업적으로도 더 큰 성취감을 느낀다</span>고 합니다.
                찐심은 이러한 자기 이해의 여정을 더 즐겁고 접근하기 쉽게 만들고자 합니다.
              </p>
              
              <p>
                심리학자 칼 융은 "만나지 못한 자신의 그림자와 마주하는 것이 인생에서 가장 중요한 과제"라고 했습니다.
                찐심의 다양한 테스트는 당신이 미처 알지 못했던 내면의 측면들을 발견하고,
                <span className="font-semibold"> 온전한 자아를 향한 통합의 여정</span>을 돕습니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {psychologyPerspectives.map((perspective, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-white shadow-sm mr-4">
                      {perspective.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{perspective.title}</h3>
                      <p className="text-gray-700 text-sm">{perspective.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 서비스 특징 섹션 */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-purple-600 block mb-2">우리의 특별함</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">찐심이 특별한 이유</h2>
            <p className="text-lg text-gray-700">
              찐심은 단순한 심리테스트가 아닌, 당신의 내면을 더 깊이 이해할 수 있는 여정을 제공합니다.
              과학적 근거와 사용자 경험에 대한 끊임없는 고민이 만든 결과입니다.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="p-3 rounded-full bg-purple-50 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 서비스 장점 섹션 */}
      <section className="py-12 md:py-20 bg-white px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-purple-600 block mb-2">성장의 여정</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">찐심과 함께하는 내면 여행</h2>
            <p className="text-lg text-gray-700">
              찐심의 테스트를 통해 얻을 수 있는 가치와 인사이트를 소개합니다.
              단순한 호기심을 넘어 진정한 자기 성장으로 이어지는 경험을 만나보세요.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col sm:flex-row bg-gray-50 p-6 rounded-xl border border-gray-100"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* 추가: 사용자 경험 이야기 */}
          <motion.div 
            className="max-w-4xl mx-auto mt-16 bg-purple-50 p-6 md:p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-200 rounded-full flex items-center justify-center">
                  <PenLine className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">한 사용자의 이야기</h3>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "처음에는 그저 호기심으로 시작했던 찐심 테스트가 제 인생의 전환점이 되었습니다. MBTI 테스트를 통해 제 성격을 깊이 이해하게 되었고, 이를 바탕으로 진로를 재설정했습니다. 또한 애착유형 테스트는 제 연애 패턴을 이해하는 데 큰 도움이 되었어요. 이제는 더 건강한 관계를 맺고 있습니다."
                </blockquote>
                <p className="text-sm text-gray-600">김미영, 29세, 직장인</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 테스트 소개 섹션 */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-purple-600 block mb-2">다양한 테스트</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">당신을 위한 맞춤 테스트</h2>
            <p className="text-lg text-gray-700">
              찐심에서 제공하는 다양한 테스트를 통해 자신을 발견하세요.
              각 테스트는 특별한 영역에서 당신의 모습을 비춰줍니다.
            </p>
            <p className="text-base text-gray-600 mt-4">
              심리학자 하워드 가드너는 "사람마다 다양한 종류의 지능을 가지고 있다"고 말했습니다.
              마찬가지로, 자신을 이해하는 방법 역시 다양합니다. 여러 테스트를 통해 다각도로 자신을 관찰해보세요.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tests.map((test, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{test.name}</h3>
                <p className="text-gray-700 text-sm mb-5 flex-grow">{test.description}</p>
                <Link 
                  href="/tests" 
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center mt-auto"
                >
                  테스트 하기
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link 
              href="/tests" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              모든 테스트 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 팀 가치관 섹션 */}
      <section className="py-12 md:py-20 bg-gray-900 text-white px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-purple-300 block mb-2">우리의 철학</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">찐심이 추구하는 가치</h2>
            <p className="text-lg text-gray-300">
              찐심이 추구하는 핵심 가치와 철학을 소개합니다.
              우리는 이 가치를 바탕으로 모든 서비스를 만들고 발전시켜 나갑니다.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamValues.map((value, index) => (
              <motion.div 
                key={index} 
                className="rounded-xl overflow-hidden h-full flex flex-col"
                variants={itemVariants}
              >
                <div className={`${value.color} p-6`}>
                  <div className="p-3 bg-white/20 rounded-full w-fit mb-4">
                    {value.icon}
                  </div>
                  <h3 className={`${value.titleColor} text-2xl mb-3`}>{value.title}</h3>
                </div>
                <div className="bg-gray-800 p-6 flex-grow">
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="max-w-3xl mx-auto mt-12 md:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6">우리의 미션</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              "모든 사람이 자신의 내면을 이해하고, 그 이해를 바탕으로 더 의미 있는 삶을 살아갈 수 있도록 돕는 것"
            </p>
            <div className="h-1 w-24 bg-purple-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">당신의 내면 여행을 시작하세요</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              쉽고 재미있는 테스트로 숨겨진 자신의 모습을 발견하고 성장할 수 있는 기회를 찾아보세요.
              당신이 잘 몰랐던 내면의 모습이 기다리고 있습니다.
            </p>
            <div className="quote italic text-white/80 mb-10 max-w-2xl mx-auto">
              <p>"자신을 아는 것은 모든 지혜의 시작이다." - 아리스토텔레스</p>
            </div>
            <Link 
              href="/tests" 
              className="inline-flex items-center bg-white text-purple-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              테스트 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 