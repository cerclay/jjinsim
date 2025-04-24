"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

// 색맹 테스트 레벨 정의 - 각 테스트는 특정 색맹 유형을 검사 (10단계로 확장)
const levels = [
  {
    id: 1,
    question: "다른 색상의 원을 찾으세요",
    description: "빨간색 원을 찾아 클릭하세요",
    difficultly: "매우 쉬움",
    timeLimit: 20,
    gridSize: 3,
    targetColor: "rgb(230, 57, 70)",
    backgroundColor: "rgb(255, 120, 120)",
    pointsForCorrect: 100,
    penaltyForWrong: 5,
    colorBlindnessType: "정상", 
    colorName: "빨간색",
  },
  {
    id: 2,
    question: "다른 색상의 원을 찾으세요",
    description: "초록색 원을 찾아 클릭하세요",
    difficultly: "쉬움",
    timeLimit: 20,
    gridSize: 4,
    targetColor: "rgb(46, 204, 13)",
    backgroundColor: "rgb(100, 204, 50)",
    pointsForCorrect: 120,
    penaltyForWrong: 10,
    colorBlindnessType: "적록색맹1", 
    colorName: "초록색",
  },
  {
    id: 3,
    question: "다른 색상의 원을 찾으세요",
    description: "노란색 원을 찾아 클릭하세요",
    difficultly: "쉬움",
    timeLimit: 18,
    gridSize: 5,
    targetColor: "rgb(248, 222, 34)",
    backgroundColor: "rgb(255, 245, 100)",
    pointsForCorrect: 140,
    penaltyForWrong: 10,
    colorBlindnessType: "황청색맹1", 
    colorName: "노란색",
  },
  {
    id: 4,
    question: "다른 색상의 원을 찾으세요",
    description: "보라색 원을 찾아 클릭하세요",
    difficultly: "보통",
    timeLimit: 18,
    gridSize: 5,
    targetColor: "rgb(121, 80, 242)",
    backgroundColor: "rgb(150, 120, 250)",
    pointsForCorrect: 160,
    penaltyForWrong: 15,
    colorBlindnessType: "청황색맹1", 
    colorName: "보라색",
  },
  {
    id: 5,
    question: "다른 색상의 원을 찾으세요",
    description: "파란색 원을 찾아 클릭하세요",
    difficultly: "보통",
    timeLimit: 16,
    gridSize: 6,
    targetColor: "rgb(0, 126, 167)",
    backgroundColor: "rgb(30, 160, 210)",
    pointsForCorrect: 180,
    penaltyForWrong: 15,
    colorBlindnessType: "청색맹1", 
    colorName: "파란색",
  },
  {
    id: 6,
    question: "다른 색상의 원을 찾으세요",
    description: "빨간색 계열에서 다른 색을 찾으세요",
    difficultly: "약간 어려움",
    timeLimit: 16,
    gridSize: 6,
    targetColor: "rgb(232, 65, 65)",
    backgroundColor: "rgb(232, 100, 100)",
    pointsForCorrect: 200,
    penaltyForWrong: 20,
    colorBlindnessType: "적록색맹2",
    colorName: "빨간색 계열",
  },
  {
    id: 7,
    question: "다른 색상의 원을 찾으세요",
    description: "초록색 계열에서 다른 색을 찾으세요",
    difficultly: "약간 어려움",
    timeLimit: 14,
    gridSize: 7,
    targetColor: "rgb(56, 157, 13)",
    backgroundColor: "rgb(80, 157, 40)",
    pointsForCorrect: 220,
    penaltyForWrong: 20,
    colorBlindnessType: "적록색맹3",
    colorName: "초록색 계열",
  },
  {
    id: 8,
    question: "다른 색상의 원을 찾으세요",
    description: "파란색 계열에서 다른 색을 찾으세요",
    difficultly: "어려움",
    timeLimit: 14,
    gridSize: 7,
    targetColor: "rgb(30, 120, 210)",
    backgroundColor: "rgb(50, 140, 210)",
    pointsForCorrect: 240,
    penaltyForWrong: 25,
    colorBlindnessType: "청색맹2",
    colorName: "파란색 계열",
  },
  {
    id: 9,
    question: "미세한 색상차를 찾으세요",
    description: "보라색 계열에서 다른 색을 찾으세요",
    difficultly: "어려움",
    timeLimit: 12,
    gridSize: 8,
    targetColor: "rgb(132, 80, 220)",
    backgroundColor: "rgb(150, 100, 220)",
    pointsForCorrect: 260,
    penaltyForWrong: 25,
    colorBlindnessType: "청황색맹2",
    colorName: "보라색 계열",
  },
  {
    id: 10,
    question: "미세한 색상차를 찾으세요",
    description: "회색 계열에서 다른 색을 찾으세요",
    difficultly: "매우 어려움",
    timeLimit: 10,
    gridSize: 8,
    targetColor: "rgb(150, 150, 150)",
    backgroundColor: "rgb(180, 180, 180)",
    pointsForCorrect: 300,
    penaltyForWrong: 30,
    colorBlindnessType: "전문가",
    colorName: "회색 계열",
  },
];

// 결과 해석 정의 - 유머러스하게 개선
const results = [
  {
    title: "독수리급 색각 능력자",
    description: "당신은 독수리보다 더 예민한 눈을 가졌습니다! 미세한 색상 차이도 놓치지 않는 슈퍼 비전을 소유하셨네요.",
    score: 1600,
    recommendation: "미술관의 큐레이터나 보석 감정사가 될 자격이 충분합니다. 어쩌면 당신의 조상은 무지개를 발견한 사람일지도?",
    emoji: "🦅",
    color: "bg-gradient-to-r from-green-400 to-blue-500",
    explanation: "색상 차이를 구분하는 당신의 능력은 인간의 평균을 훨씬 넘어섭니다. 축하해요, 당신은 인간 스펙트럼 분석기입니다!"
  },
  {
    title: "고양이급 색감 소유자",
    description: "어둠 속에서도 색을 구분할 것 같은 날카로운 시력의 소유자! 고양이처럼 예민한 색각을 가졌습니다.",
    score: 1300,
    recommendation: "디자인, 패션, 미술 분야에서 뛰어난 실력을 발휘할 수 있을 거예요. 또는 숨겨진 그림 찾기 대회에 나가보세요!",
    emoji: "😼",
    color: "bg-gradient-to-r from-blue-400 to-indigo-500",
    explanation: "당신의 색각 능력은 상위 5% 수준입니다. 색상을 다루는 전문가가 되기에 충분한 자질을 갖추셨어요."
  },
  {
    title: "토끼급 색상 인식가",
    description: "토끼처럼 깡충깡충 뛰어다니며 색상을 잘 구분하는 능력자! 대부분의 사람보다 뛰어난 색각을 가졌습니다.",
    score: 1000,
    recommendation: "일상에서 컬러 코디네이터 역할을 맡아보세요. 친구들의 패션 조언자가 될 수 있을 겁니다!",
    emoji: "🐰",
    color: "bg-gradient-to-r from-purple-400 to-pink-500",
    explanation: "색상 구분에 있어 상위 20%의 능력을 보유하고 있어요. 색상 관련 취미를 가져보는 건 어떨까요?"
  },
  {
    title: "개구리급 컬러리스트",
    description: "개구리처럼 다양한 색상 세계를 뛰어다니는 평범한 색각의 소유자! 일반인보다 조금 나은 수준입니다.",
    score: 700,
    recommendation: "색상 구분 능력을 향상시키는 게임이나 앱을 사용해보면 더 발전할 수 있어요.",
    emoji: "🐸",
    color: "bg-gradient-to-r from-green-500 to-teal-400",
    explanation: "약간 평균을 웃도는 색각 능력을 가지고 있습니다. 조금만 더 연습하면 색상 구분 능력이 향상될 거예요!"
  },
  {
    title: "거북이급 색상 감별사",
    description: "거북이처럼 천천히 하지만 꾸준히 색을 구분하는 평범한 색각의 소유자입니다.",
    score: 500,
    recommendation: "급할 것 없어요. 천천히 색상 세계를 탐험해보세요. 조금 더 집중하면 더 다양한 색을 구분할 수 있을 거예요.",
    emoji: "🐢",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    explanation: "평균적인 색각 능력을 가지고 있습니다. 평소 생활에 불편함은 없지만, 미세한 색상 차이는 구분하기 어려울 수 있어요."
  },
  {
    title: "달마시안급 색상 인식자",
    description: "흑백의 세계에서도 재미있게 살아가는 달마시안처럼! 색상 구분에 약간의 어려움이 있을 수 있어요.",
    score: 300,
    recommendation: "특정 색상 조합에 주의를 기울이면 일상 생활에 큰 불편함은 없을 거예요. 달마시안처럼 독특한 시각을 즐겨보세요!",
    emoji: "🐶",
    color: "bg-gradient-to-r from-gray-400 to-blue-300",
    explanation: "특정 색상 범위에서 구분 능력이 약간 저하되어 있습니다. 흑백 영화를 더 감상해보는 건 어떨까요?"
  },
  {
    title: "박쥐급 색감 도전자",
    description: "박쥐처럼 색보다는 다른 감각이 더 뛰어날 수 있어요! 색상 세계에 약간의 도전이 필요합니다.",
    score: 0,
    recommendation: "당신의 색각은 독특합니다! 색상보다 다른 감각이 더 발달했을 수 있어요. 필요하다면 전문의와 상담해보세요.",
    emoji: "🦇",
    color: "bg-gradient-to-r from-red-400 to-purple-500",
    explanation: "색상 구분에 어려움이 있을 수 있지만, 그것이 당신의 다른 뛰어난 능력을 가리지는 못합니다. 당신만의 특별한 시각으로 세상을 보는 것도 멋진 일이에요!"
  },
];

interface ColorBlindnessResult {
  type: string;
  typeName: string;
  status: 'normal' | 'mild' | 'severe';
  description: string;
  affectedColors: string[];
}

export default function ColorBlindnessTest() {
  const [step, setStep] = useState<'intro' | 'username' | 'test' | 'result'>('intro');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testResult, setTestResult] = useState<typeof results[0] | null>(null);
  const [targetPosition, setTargetPosition] = useState<[number, number]>([0, 0]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [foundItems, setFoundItems] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [userName, setUserName] = useState('');
  const [levelResults, setLevelResults] = useState<Record<string, boolean>>({});
  const [detailedResults, setDetailedResults] = useState<ColorBlindnessResult[]>([]);

  // 타겟 위치 생성 함수
  const generateTargetPosition = useCallback((gridSize: number) => {
    const targetRow = Math.floor(Math.random() * gridSize);
    const targetCol = Math.floor(Math.random() * gridSize);
    setTargetPosition([targetRow, targetCol]);
  }, []);

  // 사용자 이름 입력 후 테스트 시작
  const startWithUserName = () => {
    if (userName.trim()) {
      startTest();
    }
  };

  // 테스트 시작
  const startTest = useCallback(() => {
    if (!userName.trim()) {
      setStep('username');
      return;
    }
    
    setStep('test');
    setCurrentLevel(0);
    setScore(0);
    setFoundItems(0);
    setWrongClicks(0);
    setLevelResults({});
    const level = levels[0];
    setTimeLeft(level.timeLimit);
    
    // 타겟 위치 초기화
    generateTargetPosition(level.gridSize);
    
    setFeedback(null);
    setShowFeedback(false);
  }, [generateTargetPosition, userName]);

  // 레벨 변경시 타겟 위치 업데이트
  useEffect(() => {
    if (step === 'test' && levels[currentLevel]) {
      generateTargetPosition(levels[currentLevel].gridSize);
    }
  }, [currentLevel, generateTargetPosition, step]);

  // 타이머 기능
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (step === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, timeLeft]);

  // 시간 초과 처리
  const handleTimeout = () => {
    // 시간 초과시 실패로 간주
    updateLevelResult(false);
    
    if (currentLevel < levels.length - 1) {
      moveToNextLevel();
    } else {
      finishTest();
    }
  };

  // 레벨별 결과 업데이트
  const updateLevelResult = (success: boolean) => {
    const level = levels[currentLevel];
    setLevelResults(prev => ({
      ...prev,
      [level.colorBlindnessType]: success
    }));
  };

  // 다음 레벨로 이동
  const moveToNextLevel = () => {
    const nextLevel = currentLevel + 1;
    
    // 피드백 초기화
    setShowFeedback(false);
    setFeedback(null);
    
    // 다음 레벨로 설정
    setCurrentLevel(nextLevel);
    
    // 다음 레벨의 시간 설정
    setTimeLeft(levels[nextLevel].timeLimit);
  };

  // 격자 클릭 처리
  const handleGridClick = (rowIndex: number, colIndex: number) => {
    const isTarget = rowIndex === targetPosition[0] && colIndex === targetPosition[1];

    if (isTarget) {
      // 정답 클릭
      setFeedback('correct');
      setShowFeedback(true);
      
      const currentLevelData = levels[currentLevel];
      const newScore = score + currentLevelData.pointsForCorrect;
      
      setScore(newScore);
      setFoundItems(foundItems + 1);
      
      // 결과 업데이트
      updateLevelResult(true);
      
      // 피드백 후 다음 단계로
      setTimeout(() => {
        setShowFeedback(false);
        moveToNextLevel();
      }, 800);
      
    } else {
      // 오답 클릭
      setFeedback('incorrect');
      setShowFeedback(true);
      
      const currentLevelData = levels[currentLevel];
      const newScore = Math.max(0, score - currentLevelData.penaltyForWrong);
      
      setScore(newScore);
      setWrongClicks(wrongClicks + 1);
      
      // 시간에서 5초 차감
      setTimeLeft(Math.max(1, timeLeft - 5));
      
      // 일정 시간 후 피드백 숨기기
      setTimeout(() => {
        setShowFeedback(false);
      }, 500);
    }
  };

  // 테스트 결과 분석
  const analyzeColorBlindness = (): ColorBlindnessResult[] => {
    const results: ColorBlindnessResult[] = [];
    
    // 적록색맹 분석
    if (levelResults['적록색맹'] === false) {
      results.push({
        type: 'deuteranopia',
        typeName: '적록색맹(녹색맹)',
        status: 'severe',
        description: '녹색과 빨간색의 구분에 어려움이 있습니다. 이는 녹색을 감지하는 원뿔세포의 기능이 저하되어 있을 수 있습니다.',
        affectedColors: ['녹색', '빨간색', '갈색', '주황색']
      });
    } else if (levelResults['적록색맹'] === undefined || wrongClicks > 5) {
      results.push({
        type: 'deuteranomaly',
        typeName: '경미한 적록색맹',
        status: 'mild',
        description: '녹색 계열의 색상을 구분하는 데 약간의 어려움이 있을 수 있습니다.',
        affectedColors: ['녹색', '노란색']
      });
    }
    
    // 청황색맹 분석
    if (levelResults['청황색맹'] === false) {
      results.push({
        type: 'tritanopia',
        typeName: '청황색맹',
        status: 'severe',
        description: '파란색과 노란색의 구분에 어려움이 있습니다. 매우 드문 유형의 색맹입니다.',
        affectedColors: ['파란색', '노란색', '보라색']
      });
    }
    
    // 황청색맹 분석
    if (levelResults['황청색맹'] === false) {
      results.push({
        type: 'tritanomaly',
        typeName: '황청색맹',
        status: 'mild',
        description: '노란색과 파란색 계열의 색상을 구분하는 데 약간의 어려움이 있을 수 있습니다.',
        affectedColors: ['노란색', '파란색']
      });
    }
    
    // 청색맹 분석
    if (levelResults['청색맹'] === false) {
      results.push({
        type: 'protanopia',
        typeName: '청색맹(적색맹)',
        status: 'severe',
        description: '빨간색과 파란색의 구분에 어려움이 있습니다. 이는 적색을 감지하는 원뿔세포의 기능이 저하되어 있을 수 있습니다.',
        affectedColors: ['빨간색', '파란색', '보라색']
      });
    }
    
    // 모든 테스트를 통과했거나 결과가 없는 경우
    if (results.length === 0) {
      results.push({
        type: 'normal',
        typeName: '정상 색각',
        status: 'normal',
        description: '모든 색상을 정상적으로 구분할 수 있습니다.',
        affectedColors: []
      });
    }
    
    return results;
  };

  // 테스트 종료 및 결과 계산
  const finishTest = () => {
    // 색맹 유형 분석
    const colorBlindnessResults = analyzeColorBlindness();
    setDetailedResults(colorBlindnessResults);
    
    // 점수에 따른 결과 인덱스 계산
    let resultIndex = 0;
    for (let i = 0; i < results.length; i++) {
      if (score >= results[i].score) {
        resultIndex = i;
        break;
      }
    }
    
    setTestResult(results[resultIndex]);
    setStep('result');
  };

  // 테스트 재시작
  const restartTest = () => {
    startTest();
  };

  // 테스트 공유하기
  const shareResult = () => {
    if (!testResult) return;
    
    try {
      navigator.clipboard.writeText(
        `🔍 ${userName}님의 색맹테스트 결과: ${testResult.title}\n` +
        `📊 점수: ${score}점\n` +
        `🎯 찾은 항목: ${foundItems}개\n` +
        `❌ 틀린 클릭: ${wrongClicks}회\n` +
        `${detailedResults.length > 0 ? `👁️ 색각 상태: ${detailedResults[0].typeName}\n` : ''}` +
        `📱 당신도 테스트해보세요: ${window.location.origin}/tests/color-blindness`
      );
      alert('결과가 클립보드에 복사되었습니다!');
    } catch (err) {
      alert('결과 공유에 실패했습니다.');
    }
  };

  // 이미지 저장 함수 추가
  const saveAsImage = () => {
    if (!testResult) return;
    
    try {
      const resultCard = document.querySelector('.result-card') as HTMLElement;
      
      if (!resultCard) {
        alert('결과 카드를 찾을 수 없습니다.');
        return;
      }
      
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(resultCard).then((canvas) => {
          const link = document.createElement('a');
          link.download = `${userName}-색맹테스트-결과.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      });
    } catch (err) {
      alert('이미지 저장에 실패했습니다.');
    }
  };
  
  // 다른 테스트 목록 페이지로 이동
  const viewOtherTests = () => {
    window.location.href = '/tests';
  };

  // 애니메이션 효과
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
              key="intro"
              className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
              <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8 text-center"
              variants={itemVariants}
            >
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              색맹테스트
                </h1>
                
                <p className="text-gray-600 mb-6">
                  당신의 색상 인식 능력을 테스트해보세요. 다른 색상의 원을 찾아 클릭하세요!
                </p>
                
                <div className="mb-8 bg-indigo-50 p-5 rounded-2xl text-left">
                  <h2 className="font-semibold text-indigo-700 mb-3 flex items-center">
                    <span className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-indigo-700">i</span>
                    </span>
                    테스트 방법
                  </h2>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>각 단계마다 주어진 시간 내에 다른 색상의 원을 찾아 클릭하세요.</li>
                    <li>정확하게 클릭할수록 높은 점수를 획득합니다.</li>
                    <li>틀리게 클릭하면 점수가 차감됩니다.</li>
                    <li>총 10단계로, 각 단계는 다른 유형의 색맹을 검사합니다.</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl font-medium shadow-md relative z-10"
                  onClick={startTest}
                  type="button"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            
            <motion.div 
                className="bg-white rounded-3xl shadow-lg p-6 text-center"
              variants={itemVariants}
              >
                <h2 className="text-xl font-bold mb-4 text-indigo-700">
                  색맹이란?
                </h2>
                <p className="text-gray-600 text-sm">
                  색맹(색각이상)은 색상을 정상적으로 인식하지 못하는 상태를 말합니다. 
                  이는 유전적 요인이나 후천적 요인에 의해 발생할 수 있으며, 
                  가장 흔한 형태는 적록색맹으로 빨간색과 초록색을 구분하는 데 어려움을 겪습니다.
                </p>
              </motion.div>
          </motion.div>
        )}

          {step === 'username' && (
          <motion.div 
              key="username"
              className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8"
              variants={itemVariants}
            >
                <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  이름을 알려주세요
                </h2>
                
                <p className="text-gray-600 mb-6 text-center text-sm">
                  테스트 결과에 사용될 이름을 입력해주세요.
                </p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (userName.trim()) {
                    startWithUserName();
                  }
                }}>
                  <div className="mb-6">
                    <Input
                      type="text"
                      placeholder="이름 입력 (예: 홍길동)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-4 text-lg rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-0"
                      autoFocus
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl font-medium shadow-md"
                    disabled={!userName.trim()}
                  >
                    테스트 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
            
          {step === 'test' && (
            <motion.div
              key="test"
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="flex justify-between items-center mb-1" variants={itemVariants}>
                <div className="text-xs text-indigo-600 font-medium">
                  <span className="mr-1">{userName}</span>님의 색맹테스트
                </div>
                <div className="text-xs text-gray-500">
                  점수: <span className="font-bold text-indigo-600">{score}</span>
                </div>
            </motion.div>
            
              <Card className="p-4 bg-white rounded-3xl shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-indigo-700">
                    레벨 {currentLevel + 1}/{levels.length}
                  </h2>
                  <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 text-indigo-500 mr-1" />
                    <span className="text-sm font-medium text-indigo-700">{timeLeft}초</span>
                  </div>
                </div>

                <Progress value={(timeLeft / levels[currentLevel].timeLimit) * 100} className="h-2 mb-4" />
                
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {levels[currentLevel].question}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{levels[currentLevel].description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                      난이도: {levels[currentLevel].difficultly}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs mr-2 text-green-600">정확도: {foundItems > 0 ? Math.round((foundItems / (foundItems + wrongClicks)) * 100) : 0}%</span>
                      <span className="text-xs text-purple-600">
                        찾은 항목: {foundItems}/{levels.length}
                  </span>
                    </div>
                  </div>
                </div>

                <div className="aspect-square relative overflow-hidden rounded-2xl border-2 border-indigo-100 shadow-inner bg-white">
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center text-lg font-bold text-white transition-opacity duration-300",
                    showFeedback ? "opacity-100" : "opacity-0",
                    feedback === 'correct' ? "bg-green-500/70" : feedback === 'incorrect' ? "bg-red-500/70" : ""
                  )}>
                    {feedback === 'correct' ? '정답!' : feedback === 'incorrect' ? '오답!' : ''}
                  </div>
                  
                  <div 
                    className="grid gap-1 p-1 h-full w-full"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${levels[currentLevel].gridSize}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${levels[currentLevel].gridSize}, minmax(0, 1fr))`
                    }}
                  >
                    {Array.from({ length: levels[currentLevel].gridSize }).map((_, rowIndex) => (
                      <React.Fragment key={`row-${rowIndex}`}>
                        {Array.from({ length: levels[currentLevel].gridSize }).map((_, colIndex) => {
                          const isTarget = rowIndex === targetPosition[0] && colIndex === targetPosition[1];
                          return (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              className="w-full h-full aspect-square rounded-full cursor-pointer transform transition-all duration-100 hover:scale-95 active:scale-90 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                              style={{
                                backgroundColor: isTarget 
                                  ? levels[currentLevel].targetColor 
                                  : levels[currentLevel].backgroundColor,
                                border: 'none',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}
                              onClick={() => handleGridClick(rowIndex, colIndex)}
                              disabled={showFeedback}
                              aria-label={isTarget ? `정답 버튼` : `오답 버튼`}
                              type="button"
                            />
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  현재 테스트: {levels[currentLevel].colorName} 구분 테스트
                  <span className="block mt-1">화면에서 색상이 다른 원을 클릭하세요</span>
                </div>
              </Card>
          </motion.div>
        )}

        {step === 'result' && testResult && (
          <motion.div 
              key="result"
              className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8 text-center result-card"
              variants={itemVariants}
              >
                <div className={`w-20 h-20 rounded-full ${testResult.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {testResult.emoji}
                </div>
                
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {userName}님의 결과: {testResult.title}
                </h1>
                
                <p className="text-gray-600 mb-6 text-sm">{testResult.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6 text-center">
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <h3 className="text-sm font-semibold text-indigo-700">총점</h3>
                    <p className="text-2xl font-bold text-indigo-600">{score}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <h3 className="text-sm font-semibold text-purple-700">정확도</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {wrongClicks + foundItems > 0 
                        ? Math.round((foundItems / (wrongClicks + foundItems)) * 100) 
                        : 0}%
                    </p>
                  </div>
                </div>
                
                {/* 색맹 유형 분석 결과 */}
                <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-base">👁️</span>
                    당신의 색각 분석 결과
                  </h3>
                  
                  {detailedResults.map((result, index) => (
                    <div key={index} className="mb-4 last:mb-0 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-start mb-1">
                        {result.status === 'normal' ? (
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <CheckCircle2 className="text-green-500 h-5 w-5" />
                          </div>
                        ) : result.status === 'mild' ? (
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                            <AlertTriangle className="text-yellow-500 h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                            <AlertTriangle className="text-red-500 h-5 w-5" />
                          </div>
                        )}
                        <div className="flex-1">
                          <span className={`text-base font-medium ${
                            result.status === 'normal' ? 'text-green-700' : 
                            result.status === 'mild' ? 'text-yellow-700' : 'text-red-700'
                          }`}>
                            {result.typeName}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                          
                          {result.affectedColors.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {result.affectedColors.map((color, i) => (
                                <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700 inline-flex items-center">
                                  {color === '빨간색' && <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>}
                                  {color === '초록색' && <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>}
                                  {color === '파란색' && <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>}
                                  {color === '노란색' && <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>}
                                  {color === '보라색' && <span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>}
                                  {color === '주황색' && <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>}
                                  {color === '갈색' && <span className="w-2 h-2 rounded-full bg-amber-700 mr-1"></span>}
                                  {color}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-base">💡</span>
                    색각 전문가의 한마디
                  </h3>
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-xl">🧙‍♂️</span>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-gray-600 text-sm mb-2">{testResult.recommendation}</p>
                        <p className="text-gray-500 text-xs italic">{testResult.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="inline-block bg-indigo-50 px-4 py-2 rounded-full text-xs text-gray-500">
                    테스트 완료 시간: {format(new Date(), 'yyyy년 MM월 dd일 HH:mm')}
                  </div>
              </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-xl font-medium shadow-md transition-transform hover:scale-105"
                    onClick={saveAsImage}
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>이미지 저장</span>
                    </div>
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white py-5 rounded-xl font-medium shadow-md transition-transform hover:scale-105"
                    onClick={viewOtherTests}
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" />
                      </svg>
                      <span>다른 테스트</span>
                    </div>
                  </Button>
                  <Button 
                    className="bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-xl font-medium shadow-md transition-transform hover:scale-105"
                    onClick={shareResult}
                  >
                    <div className="flex items-center justify-center">
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>공유하기</span>
                    </div>
                  </Button>
                </div>
              </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
} 