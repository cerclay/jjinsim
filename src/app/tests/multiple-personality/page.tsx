"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// 다중인격 테스트 문항 정의
const questions = [
  {
    id: 1,
    question: "다른 사람들이 당신에 대해 이해하지 못하는 부분이 있다고 느끼나요?",
    options: [
      { text: "매우 그렇다", value: 4 },
      { text: "그렇다", value: 3 },
      { text: "그렇지 않다", value: 2 },
      { text: "전혀 그렇지 않다", value: 1 }
    ]
  },
  {
    id: 2,
    question: "당신의 성격이 상황에 따라 크게 변한다고 느낀 적이 있나요?",
    options: [
      { text: "매우 자주 느낀다", value: 4 },
      { text: "가끔 느낀다", value: 3 },
      { text: "거의 느끼지 않는다", value: 2 },
      { text: "전혀 느끼지 않는다", value: 1 }
    ]
  },
  {
    id: 3,
    question: "가끔 자신이 한 행동이나 결정을 본인이 한 것 같지 않게 느낀 적이 있나요?",
    options: [
      { text: "매우 자주 그렇다", value: 4 },
      { text: "가끔 그렇다", value: 3 },
      { text: "거의 그렇지 않다", value: 2 },
      { text: "전혀 그렇지 않다", value: 1 }
    ]
  },
  {
    id: 4,
    question: "당신의 취향(음식, 음악, 옷 등)이 갑자기 바뀐 적이 있나요?",
    options: [
      { text: "매우 자주 바뀐다", value: 4 },
      { text: "종종 바뀐다", value: 3 },
      { text: "거의 바뀌지 않는다", value: 2 },
      { text: "전혀 바뀌지 않는다", value: 1 }
    ]
  },
  {
    id: 5,
    question: "가끔 다른 사람이 된 것 같은 느낌을 받은 적이 있나요?",
    options: [
      { text: "자주 그런 느낌을 받는다", value: 4 },
      { text: "가끔 그런 느낌을 받는다", value: 3 },
      { text: "거의 받지 않는다", value: 2 },
      { text: "전혀 받지 않는다", value: 1 }
    ]
  },
  {
    id: 6,
    question: "주변 사람들이 당신에게 종종 '너 오늘 왜 이래?', '평소랑 다른데?' 같은 말을 자주 하나요?",
    options: [
      { text: "매우 자주 듣는다", value: 4 },
      { text: "가끔 듣는다", value: 3 },
      { text: "거의 듣지 않는다", value: 2 },
      { text: "전혀 듣지 않는다", value: 1 }
    ]
  },
  {
    id: 7,
    question: "일상 생활 중 기억나지 않는 시간이 자주 있나요?",
    options: [
      { text: "매우 자주 있다", value: 4 },
      { text: "가끔 있다", value: 3 },
      { text: "거의 없다", value: 2 },
      { text: "전혀 없다", value: 1 }
    ]
  },
  {
    id: 8,
    question: "자신도 모르게 다른 행동 패턴이나 말투를 보인 적이 있나요?",
    options: [
      { text: "매우 자주 있다", value: 4 },
      { text: "가끔 있다", value: 3 },
      { text: "거의 없다", value: 2 },
      { text: "전혀 없다", value: 1 }
    ]
  },
  {
    id: 9,
    question: "당신의 감정이 갑자기 변해서 자신도 당황한 적이 있나요?",
    options: [
      { text: "매우 자주 있다", value: 4 },
      { text: "가끔 있다", value: 3 },
      { text: "거의 없다", value: 2 },
      { text: "전혀 없다", value: 1 }
    ]
  },
  {
    id: 10,
    question: "거울을 볼 때 가끔 낯설게 느껴지는 적이 있나요?",
    options: [
      { text: "매우 자주 그렇다", value: 4 },
      { text: "가끔 그렇다", value: 3 },
      { text: "거의 그렇지 않다", value: 2 },
      { text: "전혀 그렇지 않다", value: 1 }
    ]
  }
];

// 결과 유형 정의
const resultTypes = [
  {
    type: "단일형",
    range: [10, 15],
    title: "안정적인 단일 인격형",
    description: "당신은 매우 일관된 성격과 행동 패턴을 가지고 있습니다. 자신의 정체성이 명확하고 대부분의 상황에서 일관된 자아를 유지합니다. 때로는 상황에 따라 유연하게 대응하는 능력을 기르는 것이 도움이 될 수 있어요.",
    personalities: ["안정적", "일관된", "예측 가능한"],
    imageUrl: "https://picsum.photos/id/1012/400/400"
  },
  {
    type: "유동형",
    range: [16, 25],
    title: "상황 적응형 유동 인격",
    description: "당신은 상황에 따라 유연하게 적응하는 유형입니다. 다양한 상황과 사람들에게 맞춰 자신의 행동과 태도를 조절할 수 있는 능력이 있지만, 핵심적인 자아는 일관됩니다. 사교적 상황에서 적응력이 뛰어나지만, 때로는 진정한 자신이 누구인지 고민할 수 있어요.",
    personalities: ["적응력 있는", "유연한", "사교적인"],
    imageUrl: "https://picsum.photos/id/177/400/400"
  },
  {
    type: "다면형",
    range: [26, 34],
    title: "다면적 인격 보유형",
    description: "당신은 여러 다른 면모를 가진 복합적인 성격의 소유자입니다. 상황에 따라 상당히 다른 모습을 보일 수 있으며, 때로는 이런 변화에 스스로도 놀랄 수 있습니다. 이러한 다면성은 창의적인 생각과 다양한 관점을 가질 수 있게 해주지만, 때로는 일관성을 유지하는 데 어려움을 느낄 수 있어요.",
    personalities: ["복합적인", "창의적인", "변화무쌍한"],
    imageUrl: "https://picsum.photos/id/1083/400/400"
  },
  {
    type: "분할형",
    range: [35, 40],
    title: "뚜렷한 다중 인격 성향",
    description: "당신은 매우 뚜렷하게 구분되는 여러 인격 상태를 경험할 가능성이 있습니다. 감정, 취향, 행동 패턴이 상황에 따라 크게 달라질 수 있으며, 때로는 기억의 단절을 경험할 수도 있습니다. 이는 스트레스나 트라우마에 대응하는 심리적 방어 기제일 수 있으며, 전문가의 도움을 통해 더 통합된 자아를 발전시키는 것이 도움이 될 수 있어요. 참고: 이 테스트 결과는 단순 재미용이며, 정확한 진단을 위해서는 전문가와 상담하세요.",
    personalities: ["뚜렷한 변화", "단절적인", "복합적인"],
    imageUrl: "https://picsum.photos/id/1059/400/400"
  }
];

export default function MultiplePersonalityTest() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState("intro"); // intro, test, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [resultType, setResultType] = useState<typeof resultTypes[0] | null>(null);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // 테스트 시작
  const startTest = () => {
    if (!userName.trim()) {
      alert("이름을 입력해주세요!");
      return;
    }
    setStep("test");
    setStartTime(new Date());
    setProgress(0);
  };

  // 답변 선택 처리
  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    // 진행 상황 업데이트
    const newProgress = ((currentQuestion + 1) / questions.length) * 100;
    setProgress(newProgress);
    
    // 다음 질문으로 이동 또는 테스트 완료
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  // 테스트 결과 분석
  const finishTest = (finalAnswers: Record<number, number>) => {
    // 총점 계산
    const score = Object.values(finalAnswers).reduce((sum, value) => sum + value, 0);
    setTotalScore(score);
    
    // 점수에 따른 결과 타입 결정
    const result = resultTypes.find(type => 
      score >= type.range[0] && score <= type.range[1]
    ) || resultTypes[0]; // 기본값 설정
    
    setResultType(result);
    setEndTime(new Date());
    setStep("result");
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setTotalScore(0);
    setResultType(null);
    setProgress(0);
    setStartTime(null);
    setEndTime(null);
  };

  // 결과 공유
  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: '다중인격 테스트 결과',
        text: `${userName}님의 인격 유형은 "${resultType?.title}"입니다!`,
        url: window.location.href,
      })
      .catch((error) => console.log('공유하기 실패:', error));
    } else {
      const shareText = `${userName}님의 인격 유형은 "${resultType?.title}"입니다!`;
      alert(`공유하기가 지원되지 않습니다. 결과를 복사해서 공유해보세요:\n\n${shareText}`);
    }
  };

  // 애니메이션 변수
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 p-4">
      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div 
              key="intro"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-16 w-16 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">다중인격 테스트</h1>
                <p className="text-gray-600 mb-6">당신 안에 얼마나 다양한 인격이 존재하는지 알아보세요!</p>
                
                <div className="p-4 bg-yellow-50 rounded-lg mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>참고:</strong> 이 테스트는 재미 목적으로 제작되었으며, 전문적인 심리 진단 도구가 아닙니다. 정확한 심리 상담이 필요하시다면 전문가를 찾아주세요.
                  </p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    테스트를 시작하기 전에 이름을 입력해주세요
                  </label>
                  <Input
                    type="text"
                    placeholder="이름 입력"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  onClick={startTest}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>소요 시간: 약 3분</span>
                  </div>
                  <p>10개의 질문으로 당신의 인격 유형을 분석합니다</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === "test" && (
            <motion.div 
              key="test"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">진행 상황</span>
                    <span className="text-sm text-gray-600">{currentQuestion + 1}/{questions.length}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full bg-white border border-gray-300 hover:bg-purple-50 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-between text-left"
                      variant="outline"
                    >
                      <span>{option.text}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "result" && resultType && (
            <motion.div 
              key="result"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="flex justify-center mb-6">
                  <Trophy className="h-16 w-16 text-yellow-500" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {userName}님의 인격 유형은
                </h2>
                <h1 className="text-2xl font-extrabold text-purple-600 mb-2">
                  "{resultType.title}"
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  점수: {totalScore}/40
                </p>
                
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={resultType.imageUrl} 
                      alt="Personality Type" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {resultType.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">주요 특성</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {resultType.personalities.map((trait, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg mb-6">
                    <p className="text-sm text-yellow-800">
                      <strong>참고:</strong> 이 테스트는 단순 재미용이며, 실제 다중인격장애(해리성 정체성 장애)는 전문가에 의한 정확한 진단이 필요합니다.
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    테스트 완료 시간: {endTime && format(endTime, 'yyyy년 MM월 dd일 HH:mm')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={restartTest}
                    className="bg-white border border-purple-500 text-purple-500 hover:bg-purple-50 py-2 rounded-lg flex items-center justify-center"
                    variant="outline"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    다시 테스트
                  </Button>
                  
                  <Button
                    onClick={shareResult}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Link href="/tests/new" className="flex items-center justify-center text-sm text-gray-600 hover:text-purple-600">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    다른 테스트 보기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 