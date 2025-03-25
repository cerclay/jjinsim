"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Briefcase, Laugh } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// 사회생활 캐릭터 테스트 문항 정의 (data.json의 데이터 사용)
const questions = [
  {
    id: 1,
    question: "상사가 갑자기 '할 말 있는데' 라고 불렀다. 당신의 반응은?",
    options: [
      { id: 1, text: "'나 뭐 잘못했나?' 숨 멎고 뇌정지", score: 0 },
      { id: 2, text: "'네 말씀하세요!' 쿨하게 대답하지만 속으론 불안", score: 1 },
      { id: 3, text: "'예, 방으로 가겠습니다' 멘탈 평정. 이건 또 무슨 일이지?", score: 2 }
    ]
  },
  {
    id: 2,
    question: "회의 중 누가 말이 너무 많고 논지가 흐트러진다. 당신은?",
    options: [
      { id: 1, text: "'제 요지는 이렇습니다' 정리해버림", score: 2 },
      { id: 2, text: "눈치 보며 메모만 하다가 끝", score: 1 },
      { id: 3, text: "끄덕끄덕 리액션만 함. '끝나기만 해라…'", score: 0 }
    ]
  },
  {
    id: 3,
    question: "단톡방에서 누가 오타+어색한 농담을 했다. 당신은?",
    options: [
      { id: 1, text: "'ㅋㅋㅋㅋ' 자동반응으로 리액션 보냄", score: 1 },
      { id: 2, text: "굳이… 아무 말 안 함. 묵묵히 일함", score: 2 },
      { id: 3, text: "적당히 눈치 보며 이모지 하나 툭", score: 0 }
    ]
  },
  {
    id: 4,
    question: "업무 실수를 했을 때 당신의 대처는?",
    options: [
      { id: 1, text: "정확히 요점만 정리해 책임지고 리포트함", score: 2 },
      { id: 2, text: "일단 사과하고, 이후 고칠 방안을 제시함", score: 1 },
      { id: 3, text: "'아 망했다…' 당황하며 조용히 수정함", score: 0 }
    ]
  },
  {
    id: 5,
    question: "회식 중 상사가 말도 안 되는 썰을 늘어놓는다",
    options: [
      { id: 1, text: "'와~ 진짜 대단하세요~' 현실 리액션봇", score: 1 },
      { id: 2, text: "눈 피하며 음식만 조용히 먹는다", score: 0 },
      { id: 3, text: "'그건 아닌 것 같은데요?' 팩트 한 방 투척", score: 2 }
    ]
  },
  {
    id: 6,
    question: "보고서를 상사가 뜯어고치기 시작했다. 당신은?",
    options: [
      { id: 1, text: "'다음부턴 이렇게 써야지' 학습 시작", score: 2 },
      { id: 2, text: "'그렇게까지 해야 하나…' 마음속 불만만", score: 1 },
      { id: 3, text: "'그냥 해달라는 대로 하지 뭐' 무의미의 강", score: 0 }
    ]
  },
  {
    id: 7,
    question: "'워라밸'이란 단어를 들었을 때 드는 생각은?",
    options: [
      { id: 1, text: "있으면 좋고, 없으면 퇴사한다.", score: 2 },
      { id: 2, text: "현실은 야근과 눈치의 향연이지…", score: 0 },
      { id: 3, text: "적당히 조율하면서 맞춰가는 거지", score: 1 }
    ]
  },
  {
    id: 8,
    question: "후배가 실수했을 때 당신의 반응은?",
    options: [
      { id: 1, text: "'이건 이렇게 하면 돼' 조용히 정리해줌", score: 1 },
      { id: 2, text: "'왜 그랬어?' 원인부터 따진다", score: 2 },
      { id: 3, text: "'괜찮아~' 하고 스스로 처리함", score: 0 }
    ]
  },
  {
    id: 9,
    question: "퇴근 5분 전 갑자기 긴급 업무가 들어왔다!",
    options: [
      { id: 1, text: "정색은 안 하지만 속으로 분노", score: 1 },
      { id: 2, text: "'이건 내일 해도 되지 않나요?' 정면 돌파", score: 2 },
      { id: 3, text: "묵묵히 앉아서 다시 컴퓨터 킴", score: 0 }
    ]
  },
  {
    id: 10,
    question: "휴가를 눈치 안 보고 쓰려면?",
    options: [
      { id: 1, text: "규정대로 사유 쓰고, 미리 공지하고 씀", score: 2 },
      { id: 2, text: "'혹시 가능할까요…?' 눈치 봄", score: 0 },
      { id: 3, text: "대충 적당히 타이밍 봐서 슬쩍 씀", score: 1 }
    ]
  }
];

// 결과 유형 정의
const resultTypes = [
  {
    range: "0 ~ 5",
    title: "🍃 눈치 만렙 생존러",
    description: "당신은 회사에서 최대한 튀지 않고, 바람처럼 존재하는 '온도조절형 생존러'입니다. 잘못된 리액션은 피하고, 공기 흐름을 읽는 데 집중하죠. '살아남는 게 이기는 것'이란 말을 온몸으로 실천 중!",
    tag: "#눈치챔피언 #리액션기계 #회사내_투명인간",
    imageUrl: "https://picsum.photos/id/1025/400/400",
    emoji: "🤫",
    color: "green"
  },
  {
    range: "6 ~ 10",
    title: "🧤 부드러운 중재자형",
    description: "갈등보단 화합, 강함보단 유연함! 당신은 조직 내에서 사람들을 부드럽게 이어주는 중간다리 같은 존재예요. 문제는 정면돌파보단 '잘 풀어가기'를 선호하는 타입!",
    tag: "#온화한협상가 #회사내_조율러 #쌓이는스트레스는_혼자해결",
    imageUrl: "https://picsum.photos/id/1054/400/400",
    emoji: "🧠",
    color: "blue"
  },
  {
    range: "11 ~ 15",
    title: "🧠 분석형 현실주의자",
    description: "당신은 일 잘하는 사람이 되고 싶고, 될 수 있는 능력자! 감정보다는 논리로 움직이며, 보고서에 '왜?'가 3번은 들어갑니다. 괜히 쿨해 보이는 게 아니라, 진짜 이성적이에요.",
    tag: "#팩트기반보고서 #회사의DB #공감은옵션",
    imageUrl: "https://picsum.photos/id/1022/400/400",
    emoji: "🧠",
    color: "purple"
  },
  {
    range: "16 ~ 19",
    title: "🦊 회의 90% 무표정관종",
    description: "겉은 무표정, 속은 불타는 열정! 관심 받고 싶진 않은데, 똑 부러지는 피드백은 꼭 남깁니다. '일은 깔끔히, 리액션은 최소한으로'가 모토. 정작 사람들은 당신을 조용한 카리스마라 생각함.",
    tag: "#무표정장인 #숨은야망러 #단톡조용_일할땐프로",
    imageUrl: "https://picsum.photos/id/1059/400/400",
    emoji: "🦊",
    color: "orange"
  },
  {
    range: "20",
    title: "💼 돌직구 상위보스형",
    description: "말 돌리는 거 싫어하고, 눈치 게임도 질색. 그냥 논리와 기준대로 움직이는 당신은 팀장이거나, 팀장이 될 사람입니다. 리더십 있고 직선적인 성향으로 사람을 이끌지만, 너무 팩폭하면 눈물 나올 수 있어요 😇",
    tag: "#일단팩트부터 #돌직구보스 #회사생활은_전략게임",
    imageUrl: "https://picsum.photos/id/1072/400/400",
    emoji: "💼",
    color: "red"
  }
];

// 결과 점수 범위를 숫자 배열로 변환하는 함수
const parseRange = (range: string): [number, number] => {
  if (range.includes("~")) {
    const [min, max] = range.split("~").map(r => parseInt(r.trim()));
    return [min, max];
  } else {
    const singleValue = parseInt(range.trim());
    return [singleValue, singleValue];
  }
};

export default function SocialCharacterTest() {
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
  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion]: score };
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
    
    // 점수에 맞는 결과 유형 찾기
    const result = resultTypes.find(type => {
      const [min, max] = parseRange(type.range);
      return score >= min && score <= max;
    });
    
    setResultType(result || resultTypes[0]);
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
    if (!resultType) return;
    
    if (navigator.share) {
      navigator.share({
        title: '사회생활 캐릭터 테스트 결과',
        text: `${userName}님은 "${resultType.title}" 유형입니다! ${resultType.tag}`,
        url: window.location.href,
      })
      .catch((error) => console.log('공유하기 실패:', error));
    } else {
      const shareText = `${userName}님은 "${resultType.title}" 유형입니다! ${resultType.tag}`;
      alert(`공유하기가 지원되지 않습니다. 결과를 복사해서 공유해보세요:\n\n${shareText}`);
    }
  };

  // 애니메이션 변수
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  // 이모지 애니메이션
  const emojiVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      } 
    }
  };

  // 결과 배경색 설정
  const getResultBgColor = () => {
    if (!resultType) return "from-blue-50 to-indigo-100";
    
    switch(resultType.color) {
      case "green": return "from-green-50 to-emerald-100";
      case "blue": return "from-blue-50 to-sky-100";
      case "purple": return "from-purple-50 to-indigo-100";
      case "orange": return "from-amber-50 to-orange-100";
      case "red": return "from-red-50 to-rose-100";
      default: return "from-blue-50 to-indigo-100";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${step === 'result' && resultType ? getResultBgColor() : 'from-blue-50 to-indigo-100'} p-4`}>
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
                  <Briefcase className="h-16 w-16 text-indigo-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">나의 사회생활 생존 캐릭터는?</h1>
                <p className="text-gray-600 mb-6">회의, 단톡, 보고서, 회식... 회사라는 정글에서 당신은 어떤 생존 캐릭터일까요?</p>
                
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>소요 시간: 약 3분</span>
                  </div>
                  <p>10가지 질문으로 당신의 '직장 내 캐릭터 유형'을 알아보세요!</p>
                  <p className="mt-1 text-indigo-500">유쾌하고 현실감 넘치는 결과가 기다리고 있어요.</p>
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
                  {questions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full bg-white border border-gray-300 hover:bg-indigo-50 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-between text-left"
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
                <motion.div 
                  className="flex justify-center mb-6"
                  variants={emojiVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="text-6xl">
                    {resultType.emoji}
                  </div>
                </motion.div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {userName}님은
                </h2>
                <h1 className="text-2xl font-extrabold text-indigo-600 mb-3">
                  {resultType.title}
                </h1>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {resultType.tag.split(' ').map((tag, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-indigo-200">
                    <img 
                      src={resultType.imageUrl} 
                      alt="Character" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {resultType.description}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    점수: {totalScore}/20
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={restartTest}
                    className="bg-white border border-indigo-500 text-indigo-500 hover:bg-indigo-50 py-2 rounded-lg flex items-center justify-center"
                    variant="outline"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    다시 테스트
                  </Button>
                  
                  <Button
                    onClick={shareResult}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Link href="/tests/new" className="flex items-center justify-center text-sm text-gray-600 hover:text-indigo-600">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    다른 테스트 보기
                  </Link>
                </div>
                
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Laugh className="h-4 w-4" />
                    <span>재미로 즐기는 테스트입니다 😊</span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 