"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Heart, Share2, RefreshCcw, ChevronLeft, CheckCircle2, Sparkles, Smile, Camera, Calendar, Clock, Star, CircleDollarSign, Home } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import data from './data.json';

// 애니메이션 변수
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const popInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200
    }
  }
};

// 결과 아이콘 매핑
const resultIcons = [
  { range: "0 ~ 5", icon: <Sparkles className="h-12 w-12 text-pink-500" />, color: "from-pink-400 to-red-400" },
  { range: "6 ~ 10", icon: <Smile className="h-12 w-12 text-orange-500" />, color: "from-orange-400 to-yellow-400" },
  { range: "11 ~ 15", icon: <CircleDollarSign className="h-12 w-12 text-green-500" />, color: "from-green-400 to-teal-400" },
  { range: "16 ~ 19", icon: <Calendar className="h-12 w-12 text-blue-500" />, color: "from-blue-400 to-indigo-400" },
  { range: "20", icon: <Star className="h-12 w-12 text-violet-500" />, color: "from-violet-400 to-purple-400" },
];

// 결과별 흥미로운 정보
const resultFunFacts = {
  "0 ~ 5": {
    emoji: "🌹✨",
    strengths: ["낭만적인 순간 연출", "감성적인 표현력", "이벤트 기획 능력"],
    weaknesses: ["현실 문제에 취약", "즉흥적 지출", "관계에 지나친 에너지 투자"],
    compatibility: "16 ~ 19 계획형 파트너십",
    funnyQuote: "데이트 코스를 짜다가 통장이 텅장이 되어도 괜찮아! 로맨스 앞에 돈이 무슨 소용?"
  },
  "6 ~ 10": {
    emoji: "🏡☕",
    strengths: ["안정적인 관계 유지", "따뜻한 공감 능력", "일상의 소중함 알기"],
    weaknesses: ["약간의 권태기 위험", "새로운 도전 회피", "변화에 저항"],
    compatibility: "11 ~ 15 현실파 듀얼코어",
    funnyQuote: "넷플릭스 보다가 잠들어도 서로 이불 덮어주는 관계가 진정한 사랑이지!"
  },
  "11 ~ 15": {
    emoji: "💼🤝",
    strengths: ["효율적인 문제 해결", "명확한 의사소통", "균형 잡힌 관계 유지"],
    weaknesses: ["감정 표현 부족", "지나친 분석", "융통성 부족"],
    compatibility: "6 ~ 10 가정적인 따뜻이",
    funnyQuote: "결혼은 로맨스 70%에 세금정산 30%가 섞인 현실적 판타지!"
  },
  "16 ~ 19": {
    emoji: "📊📆",
    strengths: ["장기적 목표 설정", "책임감", "안정적인 미래 계획"],
    weaknesses: ["지나친 통제 욕구", "유연성 부족", "즉흥적 재미 놓침"],
    compatibility: "0 ~ 5 로맨틱 감성러",
    funnyQuote: "혼수 가구 배치도 엑셀로 미리 짜놓는 당신, 가구 판매자의 최애 고객!"
  },
  "20": {
    emoji: "🌈🔍",
    strengths: ["독립성", "자기 성장", "명확한 경계"],
    weaknesses: ["지나친 개인주의", "관계에 투자 부족", "냉정함"],
    compatibility: "11 ~ 15 현실파 듀얼코어",
    funnyQuote: "결혼해도 각자 방 쓰는 커플, 싸울 일이 없어서 이혼율 0%!"
  }
};

// 재미있는 결혼 팩트
const marriageFacts = [
  "세계에서 가장 긴 결혼 생활은 86년이었답니다! 비결은... 아마도 무한한 인내심?",
  "통계에 따르면 '함께 자주 웃는 커플'이 더 오래 행복하게 지낸대요. 웃음이 최고의 결혼 비타민!",
  "부부싸움 후 먼저 화해를 청하는 사람이 더 현명하다는 연구 결과가 있어요. 자존심보다 사랑이 우선!",
  "결혼 만족도가 가장 높은 부부는 서로에게 하루에 최소 5번 칭찬한다고 해요!",
  "함께 새로운 경험을 하는 커플이 더 행복하다는 연구 결과가 있어요. 함께 도전하세요!"
];

// 배경 이미지 URL 목록
const backgroundImages = [
  'https://picsum.photos/id/1004/800/1200', // 커플
  'https://picsum.photos/id/1066/800/1200', // 결혼식
  'https://picsum.photos/id/1083/800/1200', // 꽃
  'https://picsum.photos/id/225/800/1200',  // 바다
  'https://picsum.photos/id/429/800/1200',  // 건물
];

export default function MarriageTypeTest() {
  // 상태 관리
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  // 점수 계산 및 결과 확인 함수
  const calculateResult = () => {
    const totalScore = answers.reduce((acc, score) => acc + score, 0);
    
    // 데이터에서 해당하는 결과 찾기
    const matchedResult = data.results.find(r => {
      const [min, max] = r.range.split(' ~ ').map(num => parseInt(num));
      return totalScore >= min && totalScore <= max;
    });

    // 결과를 계산한 후 축하 효과 표시
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 500);
    
    return { ...matchedResult, score: totalScore };
  };

  // 결과에 해당하는 아이콘과 색상 가져오기
  const getResultInfo = (resultRange: string) => {
    const matchedInfo = resultIcons.find(item => item.range === resultRange);
    return matchedInfo || resultIcons[0]; // 기본값 반환
  };

  // 선택 효과를 위한 함수
  const handleOptionSelect = (optionId: number, optionScore: number) => {
    setSelectedOption(optionId);
    setIsTransitioning(true);
    
    // 잠시 후 다음 질문으로 이동
    setTimeout(() => {
      const newAnswers = [...answers, optionScore];
      setAnswers(newAnswers);
      
      if (newAnswers.length >= data.questions.length) {
        // 테스트 완료 - 결과 계산
        const result = calculateResult();
        setResult(result);
        setStep('result');
      } else {
        // 다음 질문으로
        setCurrentQuestion(currentQuestion + 1);
      }
      
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 600);
  };

  // 공유 기능
  const shareResult = () => {
    // 공유 메시지 생성
    const shareMessage = `나의 결혼 이상형은 '${result.title}'입니다. 당신의 결혼 이상형은? 👉 테스트 해보세요!`;
    
    // 클립보드에 복사
    navigator.clipboard.writeText(shareMessage)
      .then(() => {
        setShowShare(true);
        setTimeout(() => setShowShare(false), 2000);
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setSelectedOption(null);
  };

  // 현재 진행도 계산
  const progress = step === 'test' 
    ? ((currentQuestion) / data.questions.length) * 100 
    : 0;

  // 질문에 따라 배경 색상 변경
  const getQuestionBackgroundClass = (index: number) => {
    const colors = [
      'from-pink-50 to-red-50',
      'from-red-50 to-orange-50',
      'from-orange-50 to-yellow-50',
      'from-yellow-50 to-green-50',
      'from-green-50 to-emerald-50',
      'from-emerald-50 to-teal-50',
      'from-teal-50 to-cyan-50',
      'from-cyan-50 to-blue-50',
      'from-blue-50 to-indigo-50',
      'from-indigo-50 to-violet-50',
    ];
    
    return colors[index % colors.length];
  };

  // 랜덤 결혼 팩트 가져오기
  const getRandomMarriageFact = () => {
    return marriageFacts[Math.floor(Math.random() * marriageFacts.length)];
  };

  // 결과에 해당하는 재미있는 정보 가져오기
  const getResultFunFact = (resultRange: string) => {
    return resultFunFacts[resultRange as keyof typeof resultFunFacts] || resultFunFacts["11 ~ 15"];
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-b flex flex-col",
      step === 'test' ? getQuestionBackgroundClass(currentQuestion) : "from-pink-50 to-purple-50"
    )}>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link href="/tests" className="flex items-center text-pink-700 font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>뒤로</span>
          </Link>
          {step === 'test' && (
            <div className="text-center">
              <h2 className="text-sm font-medium text-pink-700">
                {currentQuestion + 1} / {data.questions.length}
              </h2>
            </div>
          )}
          <div className="w-16">
            {/* 여백 유지용 */}
          </div>
        </div>
      </header>

      {/* 진행 상태바 */}
      {step === 'test' && (
        <div className="w-full bg-gray-100">
          <div
            className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col p-4 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* 인트로 화면 */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              className="flex-1 flex flex-col justify-between"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-6 text-center mt-6">
                <motion.div variants={itemVariants} className="relative mx-auto h-64 w-full max-w-xs overflow-hidden rounded-xl shadow-lg">
                  <Image 
                    src={backgroundImages[0]}
                    alt="결혼 이상형 테스트" 
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <Heart className="h-8 w-8 text-pink-500 animate-pulse mr-2" />
                    <h1 className="text-xl font-bold text-white">{data.title}</h1>
                  </div>
                </motion.div>

                <motion.p 
                  variants={itemVariants}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {data.description}
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-pink-500" />
                      간단한 10문항
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-pink-500" />
                      소요시간 3분
                    </span>
                  </div>
                </motion.div>

                {/* 재미요소: 하트 애니메이션 */}
                <motion.div 
                  variants={popInVariants}
                  className="relative h-16 w-full"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '50%',
                      }}
                      animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.3
                      }}
                    >
                      <Heart 
                        className={`h-5 w-5 text-${['pink', 'rose', 'red', 'pink', 'rose'][i]}-${400 + i * 100}`} 
                        fill="currentColor"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-auto mb-6">
                <Button 
                  onClick={() => setStep('test')} 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-6 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  테스트 시작하기
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* 테스트 화면 */}
          {step === 'test' && (
            <motion.div
              key="test"
              className="flex-1 flex flex-col justify-between py-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="text-center space-y-1"
                >
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium mb-2">
                    Q{currentQuestion + 1}
                  </span>
                  <h2 className="text-xl font-bold text-pink-800">
                    {data.questions[currentQuestion].text}
                  </h2>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="space-y-3 mt-6"
                >
                  {data.questions[currentQuestion].options.map((option) => (
                    <motion.div
                      key={option.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start py-6 px-4 border-2 bg-white text-left rounded-xl shadow-sm transition-all",
                          selectedOption === option.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-pink-200 hover:bg-pink-50 hover:border-pink-400 hover:shadow-md"
                        )}
                        onClick={() => !isTransitioning && handleOptionSelect(option.id, option.score)}
                        disabled={isTransitioning}
                      >
                        <div className="flex items-center">
                          <div className="flex-1">
                            <span className="text-pink-900 font-medium">{option.text}</span>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* 결과 화면 */}
          {step === 'result' && result && (
            <motion.div
              key="result"
              className="flex-1 flex flex-col justify-between py-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-6">
                {/* 축하 컨페티 효과 */}
                {showConfetti && (
                  <div className="fixed inset-0 z-50 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `-20px`,
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 20 + 10}px`,
                          backgroundColor: ['#FF5E5B', '#D8D8D8', '#FCBF49', '#EF476F', '#06D6A0', '#118AB2'][Math.floor(Math.random() * 6)]
                        }}
                        animate={{
                          y: ['0vh', '100vh'],
                          rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                        }}
                        transition={{
                          duration: 4 + Math.random() * 3,
                          ease: "easeOut",
                          delay: Math.random() * 0.5
                        }}
                      />
                    ))}
                  </div>
                )}

                <motion.div variants={itemVariants} className="text-center">
                  <h2 className="text-lg font-medium text-gray-500">당신의 결혼 이상형은</h2>
                  <motion.h1 
                    className="text-2xl font-bold text-pink-800 mt-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0.8, 1.2, 1],
                      textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(255,105,180,0.5)", "0px 0px 0px rgba(0,0,0,0)"]
                    }}
                    transition={{ 
                      duration: 1.2,
                      times: [0, 0.6, 1]
                    }}
                  >
                    {result.title} {getResultFunFact(result.range).emoji}
                  </motion.h1>
                  
                  {/* 결과 아이콘 */}
                  <motion.div 
                    className="mt-4 flex justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3
                    }}
                  >
                    <div className={`p-5 rounded-full bg-gradient-to-r ${getResultInfo(result.range).color} shadow-lg`}>
                      {getResultInfo(result.range).icon}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
                  <Image 
                    src={backgroundImages[Math.floor(Math.random() * backgroundImages.length)]}
                    alt={result.title}
                    className="object-cover"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <motion.div 
                      className="text-white mb-2 flex flex-wrap gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {result.tag.split(' ').map((tag: string, index: number) => (
                        <motion.span 
                          key={index} 
                          className="inline-block px-2 py-1 bg-pink-500/30 backdrop-blur-sm rounded-full text-xs"
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "rgba(255, 105, 180, 0.5)",
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {result.description}
                  </p>
                </motion.div>

                {/* 재미있는 특성 */}
                <motion.div 
                  variants={itemVariants} 
                  className="bg-gradient-to-r from-white to-pink-50 rounded-xl p-5 shadow-md overflow-hidden relative"
                >
                  <motion.div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-pink-100 rounded-full opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <h3 className="font-medium text-pink-800 flex items-center mb-3">
                    <Sparkles className="h-4 w-4 mr-2 text-pink-500" />
                    당신의 특성
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium text-pink-700 mb-1">장점 💪</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {getResultFunFact(result.range).strengths.map((strength, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1) }}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                            <span>{strength}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-pink-700 mb-1">약점 😅</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {getResultFunFact(result.range).weaknesses.map((weakness, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (index * 0.1) }}
                          >
                            <span className="text-pink-500 mr-1">•</span>
                            <span>{weakness}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-pink-700 mb-1">최고의 궁합 ❤️</h4>
                      <p className="text-xs text-gray-700">{getResultFunFact(result.range).compatibility}</p>
                    </div>
                  </div>
                </motion.div>

                {/* 재미있는 명언 */}
                <motion.div 
                  variants={popInVariants}
                  className="bg-pink-100 rounded-xl p-4 shadow-sm"
                >
                  <div className="relative text-xs text-pink-800 italic">
                    <span className="absolute -top-3 -left-1 text-3xl text-pink-300">"</span>
                    <p className="pt-2 px-3 text-center">
                      {getResultFunFact(result.range).funnyQuote}
                    </p>
                    <span className="absolute -bottom-5 -right-1 text-3xl text-pink-300">"</span>
                  </div>
                </motion.div>

                {/* 재미요소: 퀵 팁 */}
                <motion.div 
                  variants={itemVariants} 
                  className="bg-purple-50 rounded-xl p-4 border border-purple-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <h3 className="font-medium text-purple-900 text-sm flex items-center mb-2">
                    <Sparkles className="h-4 w-4 mr-1 text-purple-500" />
                    나에게 맞는 데이트 팁
                  </h3>
                  <ul className="text-xs text-purple-700 space-y-1.5">
                    {result.range === "0 ~ 5" && (
                      <>
                        <li className="flex items-start">
                          <Heart className="h-3 w-3 mr-1 mt-0.5 text-pink-500" fill="currentColor" />
                          <span>감성적인 영화나 공연을 함께 즐겨보세요.</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="h-3 w-3 mr-1 mt-0.5 text-pink-500" fill="currentColor" />
                          <span>특별한 날엔 깜짝 선물이나 이벤트를 준비해보세요.</span>
                        </li>
                      </>
                    )}
                    {result.range === "6 ~ 10" && (
                      <>
                        <li className="flex items-start">
                          <Home className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>함께 요리하고 영화 보는 홈데이트가 잘 맞을 거예요.</span>
                        </li>
                        <li className="flex items-start">
                          <Home className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>소소한 일상을 함께 나누는 시간을 가져보세요.</span>
                        </li>
                      </>
                    )}
                    {result.range === "11 ~ 15" && (
                      <>
                        <li className="flex items-start">
                          <CircleDollarSign className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>함께 목표를 세우고 달성하는 과정을 즐겨보세요.</span>
                        </li>
                        <li className="flex items-start">
                          <CircleDollarSign className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>서로의 관심사를 존중하는 데이트 방식을 찾아보세요.</span>
                        </li>
                      </>
                    )}
                    {result.range === "16 ~ 19" && (
                      <>
                        <li className="flex items-start">
                          <Calendar className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>장기적인 목표를 함께 세워보는 대화가 좋을 거예요.</span>
                        </li>
                        <li className="flex items-start">
                          <Calendar className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>실용적이면서도 의미 있는 활동을 함께 찾아보세요.</span>
                        </li>
                      </>
                    )}
                    {result.range === "20" && (
                      <>
                        <li className="flex items-start">
                          <Star className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>서로의 독립된 공간과 활동을 존중하는 관계를 만들어보세요.</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="h-3 w-3 mr-1 mt-0.5 text-pink-500" />
                          <span>각자의 취미를 공유하되 강요하지 않는 균형을 찾아보세요.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </motion.div>

                {/* 재미있는 결혼 정보 */}
                <motion.div 
                  variants={itemVariants}
                  className="relative bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 opacity-10">
                    <Heart className="h-20 w-20 text-pink-500" fill="currentColor" />
                  </div>
                  
                  <h3 className="font-medium text-blue-900 text-xs flex items-center mb-2">
                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                    결혼 TMI
                  </h3>
                  <p className="text-xs text-blue-800 relative z-10">
                    {getRandomMarriageFact()}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all"
                      onClick={shareResult}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      공유하기
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all"
                      onClick={restartTest}
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      다시하기
                    </Button>
                  </motion.div>
                </motion.div>

                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-4 left-0 right-0 mx-auto max-w-sm bg-black text-white text-center py-2 px-4 rounded-full shadow-lg"
                  >
                    링크가 복사되었습니다!
                  </motion.div>
                )}
              </div>

              <motion.div variants={itemVariants} className="mt-auto pt-6">
                <Link href="/tests">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="default"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 py-6 rounded-xl shadow-md transition-all hover:shadow-lg"
                    >
                      다른 테스트 하러가기
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 푸터 */}
      <footer className="bg-white/80 backdrop-blur-sm p-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} 나의 결혼 이상형 테스트 | 모든 정보는 재미로만 봐주세요!
      </footer>
    </div>
  );
} 