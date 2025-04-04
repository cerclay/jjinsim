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
    tagLine: "상사 앞에선 투명 인간, 뒤에선 불평 대장!",
    funFact: "당신의 능력: 상사가 화났을 때 '존재감 감소' 기술 발동!",
    survivalTip: "계속 이대로만 가면 10년 후에도 같은 자리... 가끔은 의견도 내보자!",
    tag: "#눈치챔피언 #리액션기계 #회사내_투명인간",
    imageUrl: "https://picsum.photos/id/1025/400/400",
    gifUrl: "https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif",
    emoji: "🤫",
    color: "green"
  },
  {
    range: "6 ~ 10",
    title: "🧤 부드러운 중재자형",
    description: "갈등보단 화합, 강함보단 유연함! 당신은 조직 내에서 사람들을 부드럽게 이어주는 중간다리 같은 존재예요. 문제는 정면돌파보단 '잘 풀어가기'를 선호하는 타입!",
    tagLine: "회식자리의 분위기 메이커, 사무실의 평화 수호자!",
    funFact: "당신의 능력: 상사와 후배 사이 감정 통역 담당!",
    survivalTip: "너무 중재만 하다 보면 내 의견은 어디로 갔지? 가끔은 내 주장도 필요해요!",
    tag: "#온화한협상가 #회사내_조율러 #쌓이는스트레스는_혼자해결",
    imageUrl: "https://picsum.photos/id/1054/400/400",
    gifUrl: "https://media.giphy.com/media/l0HlKrB02QY0f1mbm/giphy.gif",
    emoji: "🧠",
    color: "blue"
  },
  {
    range: "11 ~ 15",
    title: "🧠 분석형 현실주의자",
    description: "당신은 일 잘하는 사람이 되고 싶고, 될 수 있는 능력자! 감정보다는 논리로 움직이며, 보고서에 '왜?'가 3번은 들어갑니다. 괜히 쿨해 보이는 게 아니라, 진짜 이성적이에요.",
    tagLine: "감정은 잠시 넣어두고, 논리로 승부하는 엑셀 마스터!",
    funFact: "당신의 능력: 복잡한 업무도 5분 만에 엑셀로 정리 완료!",
    survivalTip: "데이터는 정확하지만 사람의 마음은 그렇지 않아요. 가끔은 감성도 필요해요!",
    tag: "#팩트기반보고서 #회사의DB #공감은옵션",
    imageUrl: "https://picsum.photos/id/1022/400/400",
    gifUrl: "https://media.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif",
    emoji: "🧠",
    color: "purple"
  },
  {
    range: "16 ~ 19",
    title: "🦊 회의 90% 무표정관종",
    description: "겉은 무표정, 속은 불타는 열정! 관심 받고 싶진 않은데, 똑 부러지는 피드백은 꼭 남깁니다. '일은 깔끔히, 리액션은 최소한으로'가 모토. 정작 사람들은 당신을 조용한 카리스마라 생각함.",
    tagLine: "무표정으로 회의실을 장악하는 카리스마의 소유자!",
    funFact: "당신의 능력: 한마디 한 번에 회의 분위기 완전 반전!",
    survivalTip: "표정 관리는 좋지만 너무 무표정이면 오해받기 쉬워요. 가끔은 미소도 필요해요!",
    tag: "#무표정장인 #숨은야망러 #단톡조용_일할땐프로",
    imageUrl: "https://picsum.photos/id/1059/400/400",
    gifUrl: "https://media.giphy.com/media/7JsQ5EQTZlQHRFPrjt/giphy.gif",
    emoji: "🦊",
    color: "orange"
  },
  {
    range: "20",
    title: "💼 돌직구 상위보스형",
    description: "말 돌리는 거 싫어하고, 눈치 게임도 질색. 그냥 논리와 기준대로 움직이는 당신은 팀장이거나, 팀장이 될 사람입니다. 리더십 있고 직선적인 성향으로 사람을 이끌지만, 너무 팩폭하면 눈물 나올 수 있어요 😇",
    tagLine: "회의실에 들어오는 순간 모두가 자세를 고치는 카리스마!",
    funFact: "당신의 능력: '그건 안 될 것 같은데요'라는 한마디로 회의 끝내기!",
    survivalTip: "돌직구도 좋지만 가끔은 커브볼도 필요해요. 모든 사람이 돌직구를 받아낼 준비가 되어있지 않아요!",
    tag: "#일단팩트부터 #돌직구보스 #회사생활은_전략게임",
    imageUrl: "https://picsum.photos/id/1072/400/400",
    gifUrl: "https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 py-10">
      <div className="container mx-auto px-4 max-w-[500px]">
        {/* 인트로 화면 */}
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-3xl font-bold text-purple-800 mb-4">나의 사회 생활 케릭터는?!</h1>
              <div className="mb-6 text-gray-600">
                <p className="mb-2">회사, 학교, 모임에서 나는 어떤 유형의 소통가일까?</p>
                <p>10개의 질문으로 나의 진짜 사회생활 캐릭터를 알아보세요!</p>
              </div>
              
              <div className="w-full max-w-xs mb-8">
                <Card className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-2 text-purple-700 mb-3">
                    <Trophy size={18} />
                    <h3 className="font-semibold">이런 걸 알 수 있어요</h3>
                  </div>
                  <ul className="space-y-2 text-left text-gray-700 text-sm">
                    <li className="flex items-start">
                      <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                      <span>나의 사회생활 핵심 스타일</span>
                    </li>
                    <li className="flex items-start">
                      <Laugh className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                      <span>어떤 상황에서 내가 빛날까?</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                      <span>사회생활에서 내 장단점은?</span>
                    </li>
                  </ul>
                </Card>
                
                <Input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mb-4 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
                
                <Button
                  onClick={startTest}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  테스트 시작하기
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">약 3분 소요 • 10개 질문</p>
            </motion.div>
          )}
          
          {/* 테스트 화면 */}
          {step === "test" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[500px] mx-auto"
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">진행도 {Math.round(progress)}%</span>
                  <span className="text-sm font-medium text-gray-600">{currentQuestion + 1}/{questions.length}</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-purple-600" />
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                      onClick={() => handleAnswer(option.score)}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* 결과 화면 */}
          {step === "result" && resultType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[500px] mx-auto pb-10"
            >
              <motion.div 
                className={`bg-gradient-to-b ${getResultBgColor()} shadow-xl rounded-2xl overflow-hidden`}
                initial={{ borderRadius: "1rem" }}
                animate={{ borderRadius: ["1rem", "2rem", "1rem"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <motion.div 
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        rotate: [0, 20, 0, -20, 0]
                      }}
                      transition={{ duration: 1.5 }}
                      className="mb-4"
                    >
                      <h2 className="text-2xl font-extrabold text-gray-800 mb-2">{resultType.title}</h2>
                    </motion.div>
                    
                    <div className="flex justify-center mb-4">
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
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <p className="text-gray-700 mb-4 leading-relaxed">{resultType.description}</p>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                      <h3 className="font-bold text-purple-700 mb-2">⚡ 숨겨진 능력</h3>
                      <p className="text-gray-700">{resultType.funFact}</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                      <h3 className="font-bold text-orange-500 mb-2">💡 생존 팁</h3>
                      <p className="text-gray-700">{resultType.survivalTip}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-4"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">🏷️ 당신을 설명하는 키워드</h3>
                    <div className="flex flex-wrap gap-2">
                      {resultType.tag.split(' ').map((tag, index) => (
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
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-sm text-gray-600 mb-4 text-center"
                  >
                    <p>{userName}님과 같은 유형은 전체 사용자 중 약 {Math.floor(Math.random() * 20) + 10}%입니다</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Clock size={14} />
                      <span>
                        테스트 완료: {format(new Date(), 'yyyy년 MM월 dd일')}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-6 flex flex-col space-y-3"
              >
                <Button 
                  onClick={shareResult}
                  className="bg-purple-600 hover:bg-purple-700 text-white group relative overflow-hidden"
                  variant="default"
                >
                  <span className="z-10 flex items-center">
                    <Share2 size={16} className="mr-2" />
                    결과 공유하기
                  </span>
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                
                <Button 
                  onClick={restartTest}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <RefreshCcw size={16} className="mr-2" />
                  다시 테스트하기
                </Button>
                
                <Link href="/tests" className="w-full">
                  <Button 
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    <ChevronLeft size={16} className="mr-2" />
                    다른 테스트 보러가기
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 