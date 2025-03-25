"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// 썸 타는 유형 테스트 문항 정의
const questions = [
  {
    id: 1,
    question: "호감 가는 사람을 발견했을 때 나는...",
    options: [
      { text: "바로 대시해서 적극적으로 내 마음을 표현한다", type: "적극형" },
      { text: "상대방의 반응을 살피며 조금씩 접근한다", type: "탐색형" },
      { text: "주변에 소문내며 상대의 관심을 끌어본다", type: "우회형" },
      { text: "아무런 행동도 취하지 않고 상대가 다가오길 기다린다", type: "관망형" }
    ]
  },
  {
    id: 2,
    question: "데이트 약속을 잡을 때 나는...",
    options: [
      { text: "구체적인 계획을 세워 완벽한 데이트를 준비한다", type: "계획형" },
      { text: "상대방의 취향을 고려해 맞춰본다", type: "배려형" },
      { text: "즉흥적으로 당일에 결정해도 괜찮다", type: "자유형" },
      { text: "상대방이 정해주길 기다린다", type: "수동형" }
    ]
  },
  {
    id: 3,
    question: "문자/카톡을 주고받을 때 나는...",
    options: [
      { text: "답장이 오자마자 바로 확인하고 답장한다", type: "적극형" },
      { text: "적당한 시간 간격을 두고 답장한다", type: "전략형" },
      { text: "이모티콘과 장문의 메시지를 보낸다", type: "표현형" },
      { text: "짧고 간결하게 필요한 내용만 주고받는다", type: "실용형" }
    ]
  },
  {
    id: 4,
    question: "상대방에게 선물을 고를 때 나는...",
    options: [
      { text: "실용적이고 필요한 것을 선물한다", type: "실용형" },
      { text: "감성적이고 의미 있는 것을 선물한다", type: "감성형" },
      { text: "비싸고 브랜드 있는 것을 선물한다", type: "과시형" },
      { text: "직접 만들거나 특별한 경험을 선물한다", type: "창의형" }
    ]
  },
  {
    id: 5,
    question: "썸 단계에서 갈등이 생겼을 때 나는...",
    options: [
      { text: "바로 대화로 풀어나가려고 노력한다", type: "소통형" },
      { text: "상황을 지켜보다가 적절한 타이밍에 해결한다", type: "전략형" },
      { text: "나의 감정을 솔직하게 표현한다", type: "감성형" },
      { text: "갈등을 피하고 넘어가려 한다", type: "회피형" }
    ]
  },
  {
    id: 6,
    question: "상대방의 친구들을 만날 기회가 생기면 나는...",
    options: [
      { text: "적극적으로 친해지려 노력한다", type: "사교형" },
      { text: "예의 바르게 행동하지만 깊은 관계는 피한다", type: "경계형" },
      { text: "상대의 친구에게 내 매력을 어필한다", type: "과시형" },
      { text: "가능하면 만남을 미루거나 피한다", type: "회피형" }
    ]
  },
  {
    id: 7,
    question: "썸이 오래 지속될 때 나는...",
    options: [
      { text: "확실한 관계 정리를 위해 고백한다", type: "진취형" },
      { text: "현재 상황을 즐기며 자연스러운 발전을 기다린다", type: "여유형" },
      { text: "상대의 마음을 떠보는 시그널을 보낸다", type: "탐색형" },
      { text: "다른 사람에게 관심을 돌리기 시작한다", type: "이탈형" }
    ]
  },
  {
    id: 8,
    question: "SNS에서 상대방의 활동을 볼 때 나는...",
    options: [
      { text: "모든 게시물에 좋아요와 댓글을 남긴다", type: "적극형" },
      { text: "은근히 확인하지만 흔적을 남기지 않는다", type: "관찰형" },
      { text: "상대의 관심을 끌기 위한 게시물을 올린다", type: "어필형" },
      { text: "SNS 활동에 큰 의미를 두지 않는다", type: "독립형" }
    ]
  }
];

// 각 썸 타입별 결과 설명
const flirtingTypes = {
  "적극형": {
    title: "직진 러브헌터",
    description: "당신은 마음에 드는 사람이 생기면 망설임 없이 자신의 감정을 표현하는 타입입니다. 적극적인 접근으로 상대방에게 확실한 관심을 보여주며, 원하는 것을 명확하게 전달하는 스타일이에요. 때로는 상대방이 부담을 느낄 수 있으니 상황에 맞게 템포 조절이 필요할 수 있어요.",
    strengths: ["자신감", "솔직함", "추진력"],
    weaknesses: ["상대방 부담", "조급함"],
    imageUrl: "https://picsum.photos/id/1083/400/400"
  },
  "탐색형": {
    title: "신중한 탐정",
    description: "당신은 상대방에 대해 충분히 알아보고 신중하게 접근하는 타입입니다. 상대방의 반응과 성격을 분석하며 최적의 방법으로 관계를 발전시키려 해요. 안전하게 접근하지만, 때로는 너무 많은 탐색 시간으로 기회를 놓칠 수 있으니 주의하세요.",
    strengths: ["관찰력", "신중함", "전략적"],
    weaknesses: ["우유부단", "과잉분석"],
    imageUrl: "https://picsum.photos/id/1059/400/400"
  },
  "전략형": {
    title: "로맨틱 전략가",
    description: "당신은 관계 발전에 있어 전략적으로 접근하는 타입입니다. 적절한 타이밍에 적절한 행동으로 상대방의 마음을 사로잡는 방법을 알고 있어요. 계산된 행동이 때로는 진정성이 부족해 보일 수 있으니 자연스러움도 함께 유지하는 것이 좋아요.",
    strengths: ["타이밍 감각", "계획성", "상황 파악력"],
    weaknesses: ["과도한 계산", "자연스러움 부족"],
    imageUrl: "https://picsum.photos/id/1040/400/400"
  },
  "감성형": {
    title: "감성 충만 로맨티스트",
    description: "당신은 감정을 중요시하며 로맨틱한 분위기를 만드는 데 능숙한 타입입니다. 상대방에게 특별한 감정과 경험을 선사하려 노력하며, 관계의 감정적 연결을 중요시해요. 때로는 현실적인 부분도 고려할 필요가 있어요.",
    strengths: ["공감력", "감수성", "낭만적"],
    weaknesses: ["감정 과잉", "비현실적"],
    imageUrl: "https://picsum.photos/id/1068/400/400"
  },
  "소통형": {
    title: "열린 대화 전문가",
    description: "당신은 솔직한 대화를 통해 관계를 발전시키는 타입입니다. 오해가 생기면 바로 대화로 풀어나가며, 감정과 생각을 명확하게 표현해요. 건강한 관계 형성에 도움이 되지만, 때로는 모든 것을 말하기보다 여운을 남기는 것도 필요해요.",
    strengths: ["솔직함", "의사소통 능력", "갈등 해결력"],
    weaknesses: ["너무 직설적", "비밀 부족"],
    imageUrl: "https://picsum.photos/id/1080/400/400"
  },
  "배려형": {
    title: "다정한 배려왕",
    description: "당신은 상대방의 필요와 취향을 항상 먼저 생각하는 타입입니다. 작은 것까지 기억하고 챙겨주며 상대방이 편안함을 느끼게 해요. 너무 자신을 희생하지 않도록 균형을 찾는 것이 중요해요.",
    strengths: ["세심함", "공감능력", "이타적"],
    weaknesses: ["자기희생", "과도한 맞춤"],
    imageUrl: "https://picsum.photos/id/1066/400/400"
  },
  "관망형": {
    title: "은근한 기다림",
    description: "당신은 상대방이 먼저 다가오길 기다리는 수동적인 타입입니다. 조용히 매력을 발산하며 상대의 관심을 끌지만, 적극적인 행동은 취하지 않아요. 때로는 자신의 감정을 더 표현하고 행동으로 옮기는 용기가 필요해요.",
    strengths: ["인내심", "신중함", "자연스러움"],
    weaknesses: ["소극적", "기회 상실"],
    imageUrl: "https://picsum.photos/id/1025/400/400"
  }
};

export default function FlirtingStyleTest() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState("intro"); // intro, test, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flirtingType, setFlirtingType] = useState<string>("");
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
  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [currentQuestion]: type };
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
  const finishTest = (finalAnswers: Record<number, string>) => {
    // 각 유형별 카운트
    const typeCounts: Record<string, number> = {};
    
    Object.values(finalAnswers).forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // 가장 많이 나온 유형 찾기
    let maxCount = 0;
    let dominantType = "";
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantType = type;
      }
    });
    
    setFlirtingType(dominantType);
    setEndTime(new Date());
    setStep("result");
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setFlirtingType("");
    setProgress(0);
    setStartTime(null);
    setEndTime(null);
  };

  // 결과 공유
  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: '나의 썸탈때 유형 테스트 결과',
        text: `${userName}님은 "${flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}" 유형입니다!`,
        url: window.location.href,
      })
      .catch((error) => console.log('공유하기 실패:', error));
    } else {
      const shareText = `${userName}님은 "${flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}" 유형입니다!`;
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50 p-4">
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
                  <Heart className="h-16 w-16 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">나의 썸탈때 유형은?</h1>
                <p className="text-gray-600 mb-6">당신이 관심 있는 사람에게 어떻게 다가가는지 알아보세요!</p>
                
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
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>소요 시간: 약 3분</span>
                  </div>
                  <p>8개의 질문을 통해 당신의 썸 스타일을 분석합니다</p>
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
                      onClick={() => handleAnswer(option.type)}
                      className="w-full bg-white border border-gray-300 hover:bg-red-50 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-between text-left"
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

          {step === "result" && flirtingType && (
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
                  {userName}님의 썸 스타일은
                </h2>
                <h1 className="text-2xl font-extrabold text-red-500 mb-6">
                  "{flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}"
                </h1>
                
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.imageUrl} 
                      alt="Flirting Type" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">장점</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.strengths.map((strength, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">단점</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.weaknesses.map((weakness, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {weakness}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    테스트 완료 시간: {endTime && format(endTime, 'yyyy년 MM월 dd일 HH:mm')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={restartTest}
                    className="bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded-lg flex items-center justify-center"
                    variant="outline"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    다시 테스트
                  </Button>
                  
                  <Button
                    onClick={shareResult}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Link href="/tests/new" className="flex items-center justify-center text-sm text-gray-600 hover:text-red-500">
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