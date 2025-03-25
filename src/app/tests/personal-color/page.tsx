"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, Upload, Share2, RefreshCw, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { analyzePersonalColor } from '@/lib/gemini';

// 퍼스널컬러 테스트 질문 데이터 - 더 재미있는 질문으로 수정
const questions = [
  {
    id: 1,
    text: "친구들이 내 피부 톤을 뭐라고 말하나요?",
    options: [
      { id: 'a', text: "햇볕 아래 황금빛이 돌아요", color: "warm" },
      { id: 'b', text: "건강한 복숭아 같다고 해요", color: "warm" },
      { id: 'c', text: "백설공주처럼 하얗대요", color: "cool" },
      { id: 'd', text: "창백한 달빛 같대요", color: "cool" },
    ]
  },
  {
    id: 2,
    text: "내 손목의 혈관은 어떤 색으로 보이나요?",
    options: [
      { id: 'a', text: "올리브색 빛이 나는 녹색", color: "warm" },
      { id: 'b', text: "풀잎 같은 녹색", color: "warm" },
      { id: 'c', text: "보라색이 감도는 파란색", color: "cool" },
      { id: 'd', text: "밤하늘 같은 짙은 파란색", color: "cool" },
    ]
  },
  {
    id: 3,
    text: "거울 앞에서 어떤 색상의 옷을 입었을 때 가장 화사해 보이나요?",
    options: [
      { id: 'a', text: "가을 낙엽 같은 오렌지색", color: "warm" },
      { id: 'b', text: "오후의 햇살 같은 골드색", color: "warm" },
      { id: 'c', text: "시원한 바다 같은 파란색", color: "cool" },
      { id: 'd', text: "로맨틱한 라벤더 퍼플", color: "cool" },
    ]
  },
  {
    id: 4,
    text: "여름 휴가지에서 내 피부는 어떻게 변하나요?",
    options: [
      { id: 'a', text: "구운 빵처럼 황금빛으로 변해요", color: "warm" },
      { id: 'b', text: "카라멜처럼 갈색으로 그을려요", color: "warm" },
      { id: 'c', text: "화끈거리며 금방 빨개져요", color: "cool" },
      { id: 'd', text: "불 꺼진 랍스터처럼 새빨개져요", color: "cool" },
    ]
  },
  {
    id: 5,
    text: "친구 결혼식, 어떤 액세서리가 내 모습을 빛나게 할까요?",
    options: [
      { id: 'a', text: "해바라기 같은 골드 목걸이", color: "warm" },
      { id: 'b', text: "석양빛 로즈골드 귀걸이", color: "warm" },
      { id: 'c', text: "달빛 같은 실버 팔찌", color: "cool" },
      { id: 'd', text: "서리 내린 듯한 화이트골드 반지", color: "cool" },
    ]
  },
  {
    id: 6,
    text: "내 화장품 파우치를 열면 어떤 립스틱이 가장 많나요?",
    options: [
      { id: 'a', text: "생기 넘치는 코랄", color: "warm" },
      { id: 'b', text: "달콤한 피치 오렌지", color: "warm" },
      { id: 'c', text: "우아한 로즈 핑크", color: "cool" },
      { id: 'd', text: "매혹적인 베리 와인", color: "cool" },
    ]
  },
  {
    id: 7,
    text: "SNS에서 가장 많은 좋아요를 받은 내 셀카의 톤은?",
    options: [
      { id: 'a', text: "따뜻한 황금빛 필터", color: "warm" },
      { id: 'b', text: "노을빛 오렌지 필터", color: "warm" },
      { id: 'c', text: "시원한 블루톤 필터", color: "cool" },
      { id: 'd', text: "환상적인 퍼플 필터", color: "cool" },
    ]
  },
  {
    id: 8,
    text: "엄마가 사준 스웨터 중 가장 잘 어울린다고 칭찬받은 색은?",
    options: [
      { id: 'a', text: "카페라떼 같은 베이지색", color: "warm" },
      { id: 'b', text: "아이스크림 같은 크림색", color: "warm" },
      { id: 'c', text: "마시멜로우 같은 화이트", color: "cool" },
      { id: 'd', text: "포도주스 같은 버건디", color: "cool" },
    ]
  },
];

// 결과 타입 데이터 - 재미있는 설명과 캐릭터 개념 추가
const resultTypes = {
  'warm-spring': {
    title: '봄의 요정 웜톤',
    emoji: '🌸',
    character: '봄의 햇살 요정',
    description: '당신은 봄날의 산들바람처럼 생기 넘치는 봄 웜톤이에요! 햇살처럼 밝고 화사한 컬러가 당신의 매력을 한층 더 빛나게 만들어줍니다.',
    colors: ['#FF9E2C', '#FFD700', '#FF6347', '#32CD32', '#87CEFA'],
    imageUrl: 'https://picsum.photos/id/177/400/400',
    funFact: '봄 웜톤인 당신은 마치 막 피어난 벚꽃처럼 사람들에게 기분 좋은 에너지를 전해주는 타입! 파스타에 비유하자면 따뜻한 봄날 먹는 크림 파스타 같아요. 부드럽고 포근한 매력이 있답니다!',
    characteristics: [
      '노란빛을 띠는 밝은 피부',
      '선명한 색상이 잘 어울림',
      '골드 계열 액세서리가 잘 어울림',
      '밝은 오렌지, 피치, 코랄 등의 색상이 잘 어울림'
    ],
    recommendations: [
      '오렌지, 황금색, 복숭아색',
      '선명한 초록, 청록색',
      '밝은 카멜색, 베이지',
      '피치, 코랄 계열 립'
    ]
  },
  'warm-autumn': {
    title: '가을의 마법사 웜톤',
    emoji: '🍂',
    character: '황금빛 단풍 마법사',
    description: '당신은 가을 숲속의 마법사처럼 깊고 풍부한 매력을 지닌 가을 웜톤이에요! 차분하고 고급스러운 컬러가 당신의 지적인 매력을 더욱 돋보이게 합니다.',
    colors: ['#8B4513', '#DAA520', '#CD853F', '#556B2F', '#A0522D'],
    imageUrl: 'https://picsum.photos/id/237/400/400',
    funFact: '가을 웜톤인 당신은 마치 오랫동안 숙성된 와인처럼 깊은 매력이 있어요. 커피에 비유하자면 깊고 풍부한 풍미의 다크 로스팅 원두 같아요. 숨겨진 깊이가 있는 타입이랍니다!',
    characteristics: [
      '황금빛을 띠는 피부',
      '차분하고 깊이 있는 색이 잘 어울림',
      '골드 액세서리가 잘 어울림',
      '카키, 머스타드, 브라운 등의 컬러가 잘 어울림'
    ],
    recommendations: [
      '머스타드, 카멜, 카키',
      '토마토 레드, 주황색',
      '차분한 황토색, 올리브색',
      '오렌지 브라운 계열 립'
    ]
  },
  'cool-summer': {
    title: '여름의 인어공주 쿨톤',
    emoji: '🌊',
    character: '파스텔 인어공주',
    description: '당신은 여름 바다 속 인어공주처럼 시원하고 청량한 매력의 여름 쿨톤이에요! 부드럽고 연한 파스텔 컬러가 당신의 청순한 매력을 한층 더 빛나게 합니다.',
    colors: ['#B0C4DE', '#E6E6FA', '#DB7093', '#20B2AA', '#BC8F8F'],
    imageUrl: 'https://picsum.photos/id/146/400/400',
    funFact: '여름 쿨톤인 당신은 마치 여름날의 시원한 아이스크림 같아요. 음료로 비유하자면 라벤더 레모네이드 같은 상큼함과 부드러움을 동시에 가진 타입! 주변 사람들에게 청량감을 주는 매력이 있답니다!',
    characteristics: [
      '푸른빛을 띠는 피부',
      '부드럽고 연한 컬러가 잘 어울림',
      '실버 액세서리가 잘 어울림',
      '라벤더, 파스텔 핑크, 소프트 블루 등의 색상이 잘 어울림'
    ],
    recommendations: [
      '라벤더, 소프트 퍼플',
      '로즈 핑크, 파스텔톤',
      '그레이, 소프트 네이비',
      '핑크, 라즈베리 계열 립'
    ]
  },
  'cool-winter': {
    title: '겨울의 눈의 여왕 쿨톤',
    emoji: '❄️',
    character: '눈의 여왕',
    description: '당신은 겨울 왕국의 여왕처럼 선명하고 강렬한 매력의 겨울 쿨톤이에요! 대비가 뚜렷한 컬러가 당신의 시크하고 도도한 매력을 더욱 빛나게 합니다.',
    colors: ['#191970', '#DC143C', '#4B0082', '#FFFFFF', '#000080'],
    imageUrl: 'https://picsum.photos/id/91/400/400',
    funFact: '겨울 쿨톤인 당신은 마치 눈 덮인 겨울 풍경처럼 강렬하고 시크한 매력이 있어요. 디저트로 비유하자면 다크 초콜릿 같은 깊고 진한 매력의 소유자! 첫인상은 차갑지만 알면 알수록 빠져드는 매력이 있답니다!',
    characteristics: [
      '푸른빛을 띠는 창백한 피부',
      '선명하고 대비가 강한 색이 잘 어울림',
      '실버 액세서리가 잘 어울림',
      '퓨시아, 핑크, 강한 레드, 로얄 블루 등의 색상이 잘 어울림'
    ],
    recommendations: [
      '퓨시아, 와인, 레드',
      '블랙, 화이트, 네이비',
      '로얄 블루, 에메랄드',
      '로즈, 핑크, 플럼 계열 립'
    ]
  }
};

export default function PersonalColorTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    personalColorType: string;
    skinTone: string;
    confidence: number;
    analysis: string;
  } | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswer = (colorType: string) => {
    const newAnswers = {...answers, [currentQuestionIndex]: colorType};
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const imageBase64 = e.target?.result as string;
          setUploadedImage(imageBase64);
          
          // Gemini API를 사용한 이미지 분석
          const analysis = await analyzePersonalColor(imageBase64);
          setAnalysisResult(analysis);
          setResult(analysis.personalColorType);
          setShowResult(true);
        } catch (error) {
          console.error("이미지 분석 오류:", error);
          // 오류 발생 시 기본 랜덤 결과 제공
          const results = ['warm-spring', 'warm-autumn', 'cool-summer', 'cool-winter'];
          const randomResult = results[Math.floor(Math.random() * results.length)];
          setResult(randomResult);
          setShowResult(true);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateResult = (allAnswers: {[key: number]: string}) => {
    let warmCount = 0;
    let coolCount = 0;
    let brightCount = 0;
    let mutedCount = 0;

    // 웜톤/쿨톤 계산
    Object.values(allAnswers).forEach(answer => {
      if (answer === 'warm') warmCount++;
      else if (answer === 'cool') coolCount++;
      
      // 추가적인 특성을 위한 로직 (간단한 데모 목적)
      if (Math.random() > 0.5) brightCount++;
      else mutedCount++;
    });

    // 결과 타입 결정
    if (warmCount > coolCount) {
      if (brightCount > mutedCount) {
        setResult('warm-spring');
      } else {
        setResult('warm-autumn');
      }
    } else {
      if (brightCount > mutedCount) {
        setResult('cool-summer');
      } else {
        setResult('cool-winter');
      }
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setUploadedImage(null);
  };

  const resultData = result ? resultTypes[result as keyof typeof resultTypes] : null;

  // 애니메이션 설정
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  // 폴라로이드 필름 효과를 위한 애니메이션
  const polaroidAnimation = {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  };

  // 현재 날짜를 yyyy.MM.dd 형식으로 포맷
  const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50 py-6 px-3 sm:py-8 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto">
        <header className="mb-6 sm:mb-8 flex justify-between items-center">
          <Link href="/tests" className="text-orange-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">테스트 목록</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-center text-orange-800">퍼스널컬러 테스트</h1>
          <div className="w-16"></div> {/* 오른쪽 여백용 */}
        </header>

        {!showResult ? (
          <>
            {currentQuestionIndex === 0 && (
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center"
                {...fadeInUp}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  당신의 컬러를 찾아보세요! ✨
                </h2>
                <p className="text-gray-600 mb-6">
                  질문에 답하거나 사진을 업로드하면<br />
                  당신만의 퍼스널컬러를 찾아드립니다!
                </p>
                
                <div className="flex flex-col space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      >
                        <Camera className="h-4 w-4" />
                        <span>사진으로 바로 분석하기</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-auto w-[90%] rounded-lg">
                      <DialogTitle className="sr-only">사진 업로드</DialogTitle>
                      {isLoading ? (
                        <div className="p-6 sm:p-12 text-center">
                          <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto mb-4 text-orange-500" />
                          <h3 className="text-lg font-bold mb-2">분석 중입니다...</h3>
                          <p className="text-gray-500 text-sm">얼굴을 인식하고 퍼스널컬러를 분석하고 있어요!</p>
                        </div>
                      ) : (
                        <div className="p-4 sm:p-6 text-center">
                          <h3 className="text-lg font-bold mb-4">사진 업로드</h3>
                          <p className="text-gray-500 mb-4 text-sm">얼굴이 잘 보이는 사진을 업로드해주세요!</p>
                          <label className="block w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md cursor-pointer transition-colors hover:from-amber-600 hover:to-orange-700">
                            <span className="flex justify-center items-center">
                              <Upload className="h-4 w-4 mr-2" />
                              사진 선택하기
                            </span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="w-full bg-amber-100 text-amber-800 hover:bg-amber-200 font-medium"
                    onClick={() => setCurrentQuestionIndex(1)}
                  >
                    질문으로 테스트하기
                  </Button>
                </div>
              </motion.div>
            )}

            {currentQuestionIndex > 0 && (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                {...fadeInUp}
              >
                {/* 진행 상태 바 */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-6 sm:mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                    {currentQuestion.text}
                  </h2>

                  <div className="space-y-2 sm:space-y-3">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.id}
                        className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 hover:bg-amber-50 rounded-lg text-left transition-colors flex justify-between items-center text-sm sm:text-base"
                        onClick={() => handleAnswer(option.color)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{option.text}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
                    {currentQuestionIndex + 1} / {questions.length}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            {resultData && (
              <div className="flex flex-col items-center">
                {/* 폴라로이드 프레임 */}
                <motion.div 
                  className="bg-white rounded-lg shadow-lg p-2 sm:p-3 mb-5 max-w-[280px] sm:max-w-sm w-full transform rotate-0"
                  {...polaroidAnimation}
                >
                  {/* 이미지 영역 */}
                  <div className="relative overflow-hidden mb-2 sm:mb-4">
                    {uploadedImage ? (
                      <div className="aspect-[4/3] relative overflow-hidden rounded">
                        <img src={uploadedImage} alt="업로드된 이미지" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
                          <span className="text-white text-xs font-medium">{formatDate()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-r from-amber-300 to-orange-400 rounded flex items-center justify-center">
                        <span className="text-5xl sm:text-6xl">{resultData.emoji}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 폴라로이드 하단 정보 */}
                  <div className="px-2 pb-1">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-base sm:text-xl font-bold text-gray-800">
                        {resultData.title}
                      </h2>
                      <span className="text-xs sm:text-sm text-gray-500">{formatDate()}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {resultData.character}
                    </p>
                    
                    {/* 컬러 칩 */}
                    <div className="flex space-x-1 mt-2 sm:mt-3 mb-2">
                      {resultData.colors.map((color, index) => (
                        <motion.div 
                          key={index} 
                          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* 분석 결과 카드 */}
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {analysisResult && (
                    <div className="mb-5 sm:mb-6 bg-amber-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
                      <h3 className="text-base sm:text-lg font-bold text-amber-800 mb-2">AI 분석 결과</h3>
                      <p className="text-gray-700 mb-1 sm:mb-2"><span className="font-semibold">피부 톤:</span> {analysisResult.skinTone}</p>
                      <p className="text-gray-700 mb-2"><span className="font-semibold">분석:</span> {analysisResult.analysis}</p>
                      <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: `${analysisResult.confidence * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">정확도: {Math.round(analysisResult.confidence * 100)}%</p>
                    </div>
                  )}
                  
                  <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6 bg-orange-50 p-3 rounded-lg italic">
                    "{resultData.description}"
                  </p>
                  
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg mb-5 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-orange-800 mb-2">재미있는 사실</h3>
                    <p className="text-sm sm:text-base text-gray-700">{resultData.funFact}</p>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">당신의 특징</h3>
                  <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6 text-sm sm:text-base">
                    {resultData.characteristics.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Sparkles className="text-amber-500 mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">어울리는 컬러</h3>
                  <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6 text-sm sm:text-base">
                    {resultData.recommendations.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div 
                          className="w-4 h-4 rounded-full mr-2 mt-1 shrink-0"
                          style={{ backgroundColor: resultData.colors[index % resultData.colors.length] }}
                        ></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 sm:mt-8 flex flex-col space-y-3">
                    <Button 
                      className="flex justify-center items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white h-10 sm:h-11"
                      onClick={() => window.navigator.share?.({
                        title: '퍼스널컬러 테스트 결과',
                        text: `내 퍼스널컬러는 ${resultData.title}이에요! 당신의 퍼스널컬러도 알아보세요.`
                      })}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>결과 공유하기</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex justify-center items-center space-x-2 bg-gray-100 text-gray-700 hover:bg-gray-200 h-10 sm:h-11"
                      onClick={restartTest}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>테스트 다시하기</span>
                    </Button>
                    
                    <Link href="/tests" className="w-full">
                      <Button 
                        className="w-full bg-white text-gray-700 hover:bg-gray-100 h-10 sm:h-11" 
                        variant="outline"
                      >
                        다른 테스트 하러가기
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 