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
    tagLine: "평생 자기 자신으로 사는 희귀종!",
    funFact: "당신이 변신하면... 그래도 당신입니다! 슈퍼히어로 영화에서 악당이 변장해도 바로 알아볼 수 있는 유형이죠. 🦸‍♂️",
    superpower: "특기: 어떤 파티에 가도 항상 동일한 모습으로 등장하기",
    personalities: ["안정적", "일관된", "예측 가능한"],
    imageUrl: "https://picsum.photos/id/1012/400/400",
    gifUrl: "https://media.giphy.com/media/9PrqNHPAdWyJLa9H1t/giphy.gif",
    color: "blue"
  },
  {
    type: "유동형",
    range: [16, 25],
    title: "상황 적응형 유동 인격",
    description: "당신은 상황에 따라 유연하게 적응하는 유형입니다. 다양한 상황과 사람들에게 맞춰 자신의 행동과 태도를 조절할 수 있는 능력이 있지만, 핵심적인 자아는 일관됩니다. 사교적 상황에서 적응력이 뛰어나지만, 때로는 진정한 자신이 누구인지 고민할 수 있어요.",
    tagLine: "카멜레온급 적응력의 소유자! 회식자리 단골 인기스타~",
    funFact: "당신의 특기: 회사에서는 진지, 친구들과는 드립력 폭발, 가족들과는 또 다른 모드 변신! '저 사람 성격이 세 개야?' 소리 들어본 적 있죠?",
    superpower: "특기: 말투와 행동을 상황에 맞게 바꿔서 어디서든 인기인으로 등극",
    personalities: ["적응력 있는", "유연한", "사교적인"],
    imageUrl: "https://picsum.photos/id/177/400/400",
    gifUrl: "https://media.giphy.com/media/l2Jhv9GPuEf6TaJhe/giphy.gif",
    color: "green"
  },
  {
    type: "다면형",
    range: [26, 34],
    title: "다면적 인격 보유형",
    description: "당신은 여러 다른 면모를 가진 복합적인 성격의 소유자입니다. 상황에 따라 상당히 다른 모습을 보일 수 있으며, 때로는 이런 변화에 스스로도 놀랄 수 있습니다. 이러한 다면성은 창의적인 생각과 다양한 관점을 가질 수 있게 해주지만, 때로는 일관성을 유지하는 데 어려움을 느낄 수 있어요.",
    tagLine: "오늘의 나는 어떤 나? 매일 아침이 서프라이즈!",
    funFact: "당신의 일상: '어제는 내향적이었는데 오늘은 갑자기 왜 이렇게 외향적이지?' 친구들이 '너 정말 알다가도 모르겠어...'라고 자주 말하는 편!",
    superpower: "특기: 하루에도 여러 버전의 나를 만나는 재미가 있음. 지루할 틈이 없는 인생!",
    personalities: ["복합적인", "창의적인", "변화무쌍한"],
    imageUrl: "https://picsum.photos/id/1083/400/400",
    gifUrl: "https://media.giphy.com/media/3ohzdMvc1w2VlFOpRC/giphy.gif",
    color: "purple"
  },
  {
    type: "분할형",
    range: [35, 40],
    title: "뚜렷한 다중 인격 성향",
    description: "당신은 매우 뚜렷하게 구분되는 여러 인격 상태를 경험할 가능성이 있습니다. 감정, 취향, 행동 패턴이 상황에 따라 크게 달라질 수 있으며, 때로는 기억의 단절을 경험할 수도 있습니다. 이는 스트레스나 트라우마에 대응하는 심리적 방어 기제일 수 있으며, 전문가의 도움을 통해 더 통합된 자아를 발전시키는 것이 도움이 될 수 있어요. 참고: 이 테스트 결과는 단순 재미용이며, 정확한 진단을 위해서는 전문가와 상담하세요.",
    tagLine: "내 안의 캐릭터들이 돌아가며 주인공 되는 인생 드라마!",
    funFact: "당신의 일상: '저번에 그거 샀다고? 내가? 기억이 안 나는데...' 옷장을 열면 전혀 다른 스타일의 옷들이 있어서 본인도 당황스러울 때가 있죠!",
    superpower: "특기: 한 사람의 몸으로 여러 명의 인생을 살 수 있음. 드라마틱한 인생을 원하는 분께 강추!",
    personalities: ["뚜렷한 변화", "단절적인", "복합적인"],
    imageUrl: "https://picsum.photos/id/1059/400/400",
    gifUrl: "https://media.giphy.com/media/l46Cz2g2TDZVCGc4U/giphy.gif",
    color: "pink"
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 결과 배경색 설정
  const getResultBgColor = () => {
    if (!resultType) return "from-purple-100 to-indigo-100";
    
    switch(resultType.color) {
      case "blue": return "from-blue-50 to-indigo-100";
      case "green": return "from-green-50 to-emerald-100";
      case "purple": return "from-purple-50 to-violet-100";
      case "pink": return "from-pink-50 to-rose-100";
      default: return "from-purple-100 to-indigo-100";
    }
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
                <h1 className="text-3xl font-bold text-purple-800 mb-4">다중인격 테스트</h1>
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
              className="bg-gradient-to-b from-purple-50 to-indigo-50 rounded-xl shadow-lg overflow-hidden"
            >
              <motion.div
                className={`bg-gradient-to-b ${getResultBgColor()} rounded-xl overflow-hidden`}
                initial={{ borderRadius: "1rem" }}
                animate={{ borderRadius: ["1rem", "1.5rem", "1rem"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      rotate: [0, 15, 0, -15, 0] 
                    }}
                    transition={{ duration: 1.5 }}
                    className="mb-4"
                  >
                    <h1 className="text-2xl font-extrabold text-purple-800 mb-2">
                      {resultType.title}
                    </h1>
                  </motion.div>
                  
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                      }}
                      className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg"
                    >
                      <img 
                        src={resultType.gifUrl} 
                        alt={resultType.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4"
                  >
                    <p className="text-xl font-bold mb-2">"{userName}님은 바로..."</p>
                    <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      {resultType.tagLine}
                    </h3>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <p className="text-gray-700 mb-4 leading-relaxed">{resultType.description}</p>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                      <h3 className="font-bold text-purple-700 mb-2">😂 유머 포인트</h3>
                      <p className="text-gray-700">{resultType.funFact}</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                      <h3 className="font-bold text-orange-500 mb-2">✨ 숨겨진 능력</h3>
                      <p className="text-gray-700">{resultType.superpower}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-4"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">🔍 당신의 주요 특성</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {resultType.personalities.map((trait, index) => (
                        <motion.span 
                          key={index} 
                          className="px-3 py-1.5 bg-white bg-opacity-70 text-gray-800 text-sm rounded-full font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 1 + (index * 0.1),
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "rgba(255,255,255,0.9)" 
                          }}
                        >
                          {trait}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="bg-white bg-opacity-50 rounded-lg p-4 mb-6"
                  >
                    <p className="text-sm text-yellow-800 font-medium">
                      <span className="font-bold">전문가 한 마디:</span> 이 테스트는 단순 재미용이며, 실제 다중인격장애(해리성 정체성 장애)는 전문가에 의한 정확한 진단이 필요합니다. 전 세계 인구의 약 2%만이 아침에 일어나서 '오늘은 내가 누구지?' 생각하지 않는다고 합니다. (농담입니다! 😜)
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-sm text-gray-600 mb-4 text-center"
                  >
                    <p>{userName}님과 같은 유형은 전체 테스트 참여자 중 약 {Math.floor(Math.random() * 20) + 5}%입니다</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Clock size={14} />
                      <span>
                        테스트 완료: {endTime && format(endTime, 'yyyy년 MM월 dd일 HH:mm')}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="p-6 grid grid-cols-2 gap-3"
              >
                <Button
                  onClick={restartTest}
                  className="bg-white border border-purple-500 text-purple-600 hover:bg-purple-50 py-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
                  variant="outline"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  다시 테스트
                </Button>
                
                <Button
                  onClick={shareResult}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="z-10 flex items-center">
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </span>
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                
                <div className="col-span-2 mt-4">
                  <Link href="/tests" className="flex items-center justify-center text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    다른 테스트 보기
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 