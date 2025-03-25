"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// 힐링모먼트 테스트 문항 정의
const questions = [
  {
    id: 1,
    question: "힘든 하루 후 가장 위로가 되는 것은?",
    options: [
      { text: "따뜻한 음료와 함께하는 혼자만의 시간", type: "사색형" },
      { text: "친구들과의 수다와 함께하는 시간", type: "사교형" },
      { text: "좋아하는 음악을 크게 틀어놓고 듣기", type: "감성형" },
      { text: "땀을 흘리는 가벼운 운동", type: "활동형" }
    ]
  },
  {
    id: 2,
    question: "여행을 간다면 어떤 장소가 가장 힐링될까요?",
    options: [
      { text: "울창한 숲이 있는 조용한 산속", type: "자연형" },
      { text: "파도 소리가 들리는 해변가", type: "감성형" },
      { text: "다양한 체험을 할 수 있는 관광지", type: "활동형" },
      { text: "예술과 문화를 경험할 수 있는 도시", type: "문화형" }
    ]
  },
  {
    id: 3,
    question: "주말에 시간이 생겼을 때 가장 하고 싶은 것은?",
    options: [
      { text: "집에서 책 읽기나 영화 감상하기", type: "사색형" },
      { text: "새로운 취미 배우기", type: "성장형" },
      { text: "친구들과 만나 맛있는 음식 먹기", type: "사교형" },
      { text: "자연 속에서 산책하거나 하이킹하기", type: "자연형" }
    ]
  },
  {
    id: 4,
    question: "힐링을 위해 집 안에 꼭 있어야 한다고 생각하는 것은?",
    options: [
      { text: "편안한 소파와 담요", type: "안정형" },
      { text: "창문 너머로 보이는 자연 경관", type: "자연형" },
      { text: "좋아하는 음악을 들을 수 있는 스피커", type: "감성형" },
      { text: "나만의 취미 공간", type: "창조형" }
    ]
  },
  {
    id: 5,
    question: "스트레스를 받았을 때 가장 효과적인 해소법은?",
    options: [
      { text: "명상이나 요가로 마음 다스리기", type: "명상형" },
      { text: "격한 운동으로 스트레스 풀기", type: "활동형" },
      { text: "좋아하는 음식으로 위로받기", type: "감각형" },
      { text: "일기 쓰기나 그림 그리기 같은 창작활동", type: "창조형" }
    ]
  },
  {
    id: 6,
    question: "비 오는 날 당신의 기분을 좋게 하는 것은?",
    options: [
      { text: "창가에 앉아 빗소리 들으며 책 읽기", type: "사색형" },
      { text: "따뜻한 차와 함께 좋아하는 영화 보기", type: "안정형" },
      { text: "비 오는 날에 어울리는 음악 듣기", type: "감성형" },
      { text: "비를 맞으며 산책하기", type: "자연형" }
    ]
  },
  {
    id: 7,
    question: "마음의 안정을 얻기 위해 가장 필요한 것은?",
    options: [
      { text: "나를 이해해주는 사람들과의 대화", type: "사교형" },
      { text: "규칙적인 생활 패턴과 루틴", type: "안정형" },
      { text: "자연 속에서 보내는 시간", type: "자연형" },
      { text: "나만의 취미에 몰입하는 시간", type: "몰입형" }
    ]
  },
  {
    id: 8,
    question: "당신에게 '힐링'이란 어떤 의미인가요?",
    options: [
      { text: "마음의 평화를 찾는 것", type: "명상형" },
      { text: "새로운 에너지를 충전하는 것", type: "활력형" },
      { text: "일상에서 벗어나 새로운 경험을 하는 것", type: "모험형" },
      { text: "자신을 돌아보고 성찰하는 시간", type: "성찰형" }
    ]
  }
];

// 각 힐링 유형별 결과 설명
const healingTypes = {
  "사색형": {
    title: "지적 사색가",
    description: "당신은 조용한 환경에서 생각에 잠기는 시간을 통해 힐링을 얻는 타입입니다. 책, 영화, 혹은 단순히 창밖을 바라보며 생각하는 시간이 당신에게는 가장 큰 에너지원이 됩니다. 내면의 대화를 통해 자신을 더 깊이 이해하게 되는 과정에서 치유를 경험해요.",
    recommendations: ["조용한 카페에서 책 읽기", "일기 쓰기", "철학적인 다큐멘터리 시청", "미술관이나 박물관 방문"],
    colors: ["파랑", "보라", "회색"],
    imageUrl: "https://picsum.photos/id/1019/400/400"
  },
  "사교형": {
    title: "활기찬 소통가",
    description: "당신은 다른 사람들과의 교류와 소통을 통해 에너지를 얻는 타입입니다. 친구들과 함께하는 시간, 즐거운 대화, 새로운 사람들과의 만남이 당신에게는 최고의 힐링입니다. 사람들과 감정과 경험을 나누는 과정에서 마음의 짐을 덜어내요.",
    recommendations: ["친구들과 식사하기", "소규모 모임 참여하기", "팀 스포츠 즐기기", "봉사활동 참여하기"],
    colors: ["주황", "노랑", "분홍"],
    imageUrl: "https://picsum.photos/id/1066/400/400"
  },
  "자연형": {
    title: "자연 친화적 탐험가",
    description: "당신은 자연 속에서 가장 큰 안정감과 평화를 느끼는 타입입니다. 숲길 산책, 바다 구경, 별 보기와 같은 자연과의 교감이 당신에게는 최고의 힐링 방법이에요. 자연의 리듬과 조화를 이루는 순간에 진정한 휴식을 경험합니다.",
    recommendations: ["하이킹", "실내 식물 가꾸기", "캠핑", "새소리를 들으며 명상하기"],
    colors: ["초록", "파랑", "갈색"],
    imageUrl: "https://picsum.photos/id/1000/400/400"
  },
  "감성형": {
    title: "감성적 예술가",
    description: "당신은 음악, 미술, 영화 같은 예술적 경험을 통해 감정을 풍부하게 표현하고 치유받는 타입입니다. 좋아하는 음악을 들으며 눈물을 흘리거나, 아름다운 그림을 보며 감동을 느끼는 순간이 당신에게는 큰 위로가 됩니다.",
    recommendations: ["클래식 콘서트 참석", "감성적인 영화 감상", "그림 그리기", "시 쓰기나 읽기"],
    colors: ["보라", "분홍", "하늘색"],
    imageUrl: "https://picsum.photos/id/1055/400/400"
  },
  "활동형": {
    title: "활력 넘치는 액티비스트",
    description: "당신은 몸을 움직이는 활동적인 경험을 통해 스트레스를 해소하고 에너지를 얻는 타입입니다. 운동, 춤, 여행 등 적극적인 활동이 당신에게는 최고의 힐링 방법이에요. 몸을 움직일 때 마음도 자유로워지는 것을 느낍니다.",
    recommendations: ["조깅이나 자전거 타기", "댄스 클래스 참여", "새로운 장소 여행하기", "스포츠 활동"],
    colors: ["빨강", "주황", "노랑"],
    imageUrl: "https://picsum.photos/id/1071/400/400"
  },
  "명상형": {
    title: "평화로운 명상가",
    description: "당신은 고요한 명상과 내면의 평화를 통해 힐링을 찾는 타입입니다. 마음을 비우고 현재에 집중하는 순간에 가장 큰 안정감을 느끼며, 마음의 균형을 찾아가는 과정에서 진정한 치유를 경험합니다.",
    recommendations: ["요가와 명상", "심호흡 연습", "자연 속에서 명상하기", "마음챙김 연습"],
    colors: ["흰색", "연한 파랑", "연한 보라"],
    imageUrl: "https://picsum.photos/id/1060/400/400"
  },
  "창조형": {
    title: "창의적인 제작자",
    description: "당신은 무언가를 만들고 창조하는 과정에서 가장 큰 기쁨과 만족감을 느끼는 타입입니다. 그림 그리기, 글쓰기, 요리 등 창작 활동을 통해 자신을 표현하고 내면의 감정을 풀어냄으로써 치유를 경험합니다.",
    recommendations: ["DIY 프로젝트", "요리 실험", "예술 창작활동", "정원 가꾸기"],
    colors: ["청록색", "노랑", "보라"],
    imageUrl: "https://picsum.photos/id/1081/400/400"
  },
  "안정형": {
    title: "안정 추구 편안함 애호가",
    description: "당신은 익숙하고 편안한 환경에서 안정감을 느끼며 힐링하는 타입입니다. 규칙적인 일상, 따뜻한 집, 익숙한 사람들과의 시간이 당신에게는 가장 큰 위로가 됩니다. 안정된 환경에서 마음의 평화를 찾아요.",
    recommendations: ["집 정리정돈", "따뜻한 차 마시기", "포근한 담요와 함께 휴식", "반려동물과 시간 보내기"],
    colors: ["베이지", "연한 갈색", "연한 초록"],
    imageUrl: "https://picsum.photos/id/1056/400/400"
  }
};

export default function HealingMomentTest() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState("intro"); // intro, test, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [healingType, setHealingType] = useState<string>("");
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
    
    setHealingType(dominantType);
    setEndTime(new Date());
    setStep("result");
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setHealingType("");
    setProgress(0);
    setStartTime(null);
    setEndTime(null);
  };

  // 결과 공유
  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: '힐링모먼트 테스트 결과',
        text: `${userName}님의 힐링 유형은 "${healingTypes[healingType as keyof typeof healingTypes]?.title}"입니다!`,
        url: window.location.href,
      })
      .catch((error) => console.log('공유하기 실패:', error));
    } else {
      const shareText = `${userName}님의 힐링 유형은 "${healingTypes[healingType as keyof typeof healingTypes]?.title}"입니다!`;
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4">
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
                  <Sparkles className="h-16 w-16 text-teal-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">힐링모먼트 테스트</h1>
                <p className="text-gray-600 mb-6">당신에게 가장 힐링이 되는 순간은 언제인가요?</p>
                
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
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>소요 시간: 약 3분</span>
                  </div>
                  <p>8개의 질문을 통해 당신의 힐링 유형을 분석합니다</p>
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
                      className="w-full bg-white border border-gray-300 hover:bg-teal-50 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-between text-left"
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

          {step === "result" && healingType && (
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
                  <Sparkles className="h-16 w-16 text-teal-500" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {userName}님의 힐링 유형은
                </h2>
                <h1 className="text-2xl font-extrabold text-teal-600 mb-6">
                  "{healingTypes[healingType as keyof typeof healingTypes]?.title}"
                </h1>
                
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={healingTypes[healingType as keyof typeof healingTypes]?.imageUrl} 
                      alt="Healing Type" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {healingTypes[healingType as keyof typeof healingTypes]?.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">추천 힐링 활동</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {healingTypes[healingType as keyof typeof healingTypes]?.recommendations.map((activity, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">힐링 컬러</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {healingTypes[healingType as keyof typeof healingTypes]?.colors.map((color, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {color}
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
                    className="bg-white border border-teal-500 text-teal-500 hover:bg-teal-50 py-2 rounded-lg flex items-center justify-center"
                    variant="outline"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    다시 테스트
                  </Button>
                  
                  <Button
                    onClick={shareResult}
                    className="bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Link href="/tests/new" className="flex items-center justify-center text-sm text-gray-600 hover:text-teal-600">
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