"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Share2, RefreshCcw, ChevronLeft, Star, Shield, Ship, MapPin, Music, Crown, Scroll, Sparkles, Award, Heart, Clock, PieChart, Users, LayoutGrid } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import testData from './data.json';
import Confetti from 'react-confetti';
import { TestData } from '@/types/tests';

// 애니메이션 변수
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      when: "beforeChildren",
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const popInVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
      delay: 0.2
    }
  }
};

const floatVariants: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity, 
      repeatType: "mirror", 
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// 결과 아이콘 매핑
const resultIcons: Record<string, React.ReactNode> = {
  scholar: <Scroll className="h-16 w-16 text-yellow-300" />,
  general: <Shield className="h-16 w-16 text-yellow-300" />,
  artist: <Music className="h-16 w-16 text-yellow-300" />,
  merchant: <MapPin className="h-16 w-16 text-yellow-300" />,
  noble: <Crown className="h-16 w-16 text-yellow-300" />,
  clown: <Sparkles className="h-16 w-16 text-yellow-300" />,
  hermit: <Heart className="h-16 w-16 text-yellow-300" />,
  servant: <Award className="h-16 w-16 text-yellow-300" />,
};

// 결과별 색상 그라데이션 매핑
const resultColors: Record<string, string> = {
  scholar: 'from-blue-700 to-indigo-900',
  general: 'from-red-700 to-red-900',
  artist: 'from-pink-600 to-purple-800',
  merchant: 'from-amber-600 to-orange-800',
  noble: 'from-purple-600 to-indigo-900',
  clown: 'from-violet-600 to-fuchsia-800',
  hermit: 'from-emerald-600 to-teal-900',
  servant: 'from-blue-600 to-cyan-800',
};

// 재미있는 역사 팩트
const historyFacts = [
  "조선시대에는 매달 보름에 머리를 감는 풍습이 있었습니다.",
  "삼국시대 신라의 화랑은 미모가 뛰어난 젊은 남성들로 구성되었습니다.",
  "고려시대에는 여성도 재혼이 자유로웠으나, 조선시대에는 제한되었습니다.",
  "장영실은 조선의 천문학자로 자격루와 앙부일구 등을 발명했습니다.",
  "고려시대에는 거란, 몽골 등의 외세 침입이 30여 차례 있었습니다.",
  "조선시대 양반들은 밤에도 갓을 벗지 않고 잠을 잤다는 기록이 있습니다.",
  "고구려 고분 벽화에는 말을 타고 활을 쏘는 기마무사의 모습이 많이 그려져 있습니다.",
  "세종대왕 시대에는 농사에 관한 책 '농사직설'이 편찬되었습니다.",
  "조선시대 서당에서는 '천자문'이라는 책으로 한자를 배우기 시작했습니다.",
  "고려청자는 비색(翡色)이라 불리는 독특한 비취색으로 유명합니다."
];

// 배경 이미지 URL 목록
const backgroundImages = [
  'https://picsum.photos/id/1059/800/1200', // 숲
  'https://picsum.photos/id/1043/800/1200', // 성
  'https://picsum.photos/id/146/800/1200',  // 산
  'https://picsum.photos/id/110/800/1200',  // 꽃
];

// ChartPieIcon은 Lucide에 없는 아이콘이므로 직접 컴포넌트로 만듭니다
const ChartPieIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
  </svg>
);

// 결과 이미지 URL 매핑
const resultImages: Record<string, string> = {
  scholar: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtBbl6bT_fg6TMcP8Zrs_5N_SSf_TsJTr1BfMdMHszyIAq05xixN7oYYLVKjz49745urKZOJsG6mg7W-Nv8yoAMxLhkOxd7TSrIpqmfBihFCpblNQMOINscxFPu4SMWypxRErFXGeNmd7b2OI78HfDXuWygNNumSkZZjHTpcx6NRpm9M7G3eRasnuY8TA/s320/image_fx_.jpg",
  general: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHTrsPqaK1X2aXod1VznNNcUz4MMF2F3zJyC71cprIkEbbiWUgZ7jy_m6GW99VI80lCkw-UNWf9z2ai8BUlVscWftrvD0A2PnYk-qq4GnhouWSM6ko6JQRR2FAd7i30TZctGaOA7ffjaghEwKPU58U0hrIidIR6mHK01fGHIF_XHBr0A1pUvjxTh0p69w/s320/%EC%9D%B4%EC%88%9C%EC%8B%A0.jpg",
  artist: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQLdK3aKA21Xgz8lgiSZb8Ws_iAp4PEaklaTMa4z1U8joiuyLVkO98UcfxNUcjrMyozotWXQ9b8F8ioYJPffDvsS0m_wP16euQgiM_dKRXsQ9qwDU92KFWoFeZQQlla2wyRlvxsmGdZwMtT4suM4BaHFRr0HQwCpdJPQOlw-msY-5yiJY9hMFNwyWagQo/s320/image_fx_%20(1).jpg",
  merchant: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijVUwmdFXYh35sbFNXanoYNnIcpV6WkJ7H6rz4MCQVgi8T0uifQgwcfbfYXt-lOMQvZoQGx4wtiP8taTU83G6KD3xp25w-bSMLlZDGrBKgx-j1jjs_6CJXe-1LTTtrYfbhJcd0U9yNAzW5QhLzMk7r_zEuB0T8M2YAP-ywsFrl59wLjF9uyDeAMnNERO0/s320/%EC%82%BC%EC%8B%9D%EC%9D%B4.jpg",
  noble: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnGwLoXzpwMbmHYehuG9V1bcnfobk_IpBYgukhxjBjyWOxSDczqH7uz0NuWvsCfDT_EpodTU8yYgoafDFMDSXijB2I5EgqS1StFP8vUB5AlnjqKmbkvanC1ymiIFKmzBRPvbbwYI_gRbr4U4Qmg02ba7jywi18V8_rJ3C2d6Ti5ADklFQQEYZTm3GJv5w/s320/image_fx_%20(3).jpg",
  clown: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh66Hv6rQw0o5RcsPnm0PbKH70q087Ndz8LroZMazzj58earqWE07P3FtwZCHC3Aa01piuF7_RG0fSwi_YUPpTlh4yevvzJfT2WZJc8ObBz7p3DjuezjyH_7lrr16_i1utk6rRloBCBqkbrnk7_fLewz4MTKJxHDRMbFKXm9dCnr-FXLKQ0WhtPZakU2IU/s320/image_fx_%20(4).jpg",
  hermit: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJKNNEIo4l0D2K_xMZsiRp2c6xerLFeFApdVDjX43Ceqy6GiNUNKxgEE3t2GoJ_3CAgb7uQEez3wqCMVis57S2kxAB8vNpeSOv151jDeT-s78rkLmGEdxlW-LI13sgxvzLQJkFibqMx-fIqs55r7fR3GTHUErk-YG98kcl7wHgZsXrW71m16IrD46UVz0/s320/image_fx_%20(2).jpg",
  servant: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0a_j6aLv1Ts0crDbNO70HjGT8qCKkAJidQhfK6U2N27Wb3ca19f60MRhSww9gnlE-AHf0QJvSw9GT-QQQqk-riHgG3dO9jD-UTmhTi_0ghw4h9l1m1Xv5bn8O3nsoXaprhDeg_bf9szBLGjd-ot3FEQgauAHmFYwn-O7xTtbUP8nHYBMVbMdXkaBjsBs/s320/image_fx_%20(5).jpg"
};

// 거울 효과 애니메이션 변수
const mirrorRevealVariants: Variants = {
  hidden: { 
    opacity: 0,
    filter: "blur(10px) brightness(1.5)",
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px) brightness(1)",
    scale: 1,
    transition: { 
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const mirrorReflectionVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: [0, 0.4, 0.2, 0.6, 0.4, 0.7, 1],
    transition: {
      duration: 2,
      times: [0, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
      ease: "easeInOut",
      delay: 0.5
    }
  }
};

const staggeredContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// 테스트 썸네일 이미지
const thumbnailImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png";

export default function PastLifeCharacterTest() {
  // 상태 관리
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [traitCounts, setTraitCounts] = useState<Record<string, number>>({});
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const router = useRouter();

  // 윈도우 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 현재 질문 가져오기
  const currentQuestionData = testData.questions[currentQuestion];

  // 트레이트 계산 및 결과 확인 함수
  const calculateResult = () => {
    // 각 트레이트 카운트
    const traits: Record<string, number> = {};
    
    // 선택한 옵션의 트레이트 카운트
    answers.forEach(trait => {
      if (traits[trait]) {
        traits[trait] += 1;
      } else {
        traits[trait] = 1;
      }
    });
    
    setTraitCounts(traits);
    
    // 가장 높은 트레이트 찾기
    let maxTrait = '';
    let maxCount = 0;
    
    Object.entries(traits).forEach(([trait, count]) => {
      if (count > maxCount) {
        maxTrait = trait;
        maxCount = count;
      }
    });
    
    // 두 번째로 높은 트레이트 찾기 (동점인 경우 존재 가능)
    let secondMaxTrait = '';
    let secondMaxCount = 0;
    
    Object.entries(traits).forEach(([trait, count]) => {
      if (trait !== maxTrait && count > secondMaxCount) {
        secondMaxTrait = trait;
        secondMaxCount = count;
      }
    });
    
    // 결과 찾기
    const matchedResult = testData.results.find(r => {
      // 주 트레이트와 부 트레이트 모두 일치
      if (r.traits.length > 1) {
        return r.traits[0] === maxTrait && r.traits[1] === secondMaxTrait;
      }
      // 단일 트레이트만 중요한 경우
      return r.traits[0] === maxTrait;
    });
    
    // 결과를 계산한 후 축하 효과 표시
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }, 300);
    
    return matchedResult || testData.results[0]; // 기본값 반환
  };

  // 선택지 선택 핸들러
  const handleOptionSelect = (optionIndex: number) => {
    if (isTransitioning) return;
    
    // 선택한 옵션의 트레이트 가져오기
    const selectedTrait = currentQuestionData.choices[optionIndex].traits[0];
    
    setSelectedOption(optionIndex);
    setIsTransitioning(true);
    
    // 잠시 후 다음 질문으로 이동
    setTimeout(() => {
      const newAnswers = [...answers, selectedTrait];
      setAnswers(newAnswers);
      
      if (newAnswers.length >= testData.questions.length) {
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
    const shareMessage = `나의 전생 캐릭터는 '${result.title}'입니다. 당신의 전생 캐릭터는? 👉 테스트 해보세요!`;
    
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

  // 테스트 재시작
  const restartTest = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setSelectedOption(null);
    setTraitCounts({});
  };

  // 배경 이미지 랜덤 선택
  const getQuestionBackgroundClass = (index: number) => {
    const i = index % backgroundImages.length;
    return `bg-gradient-to-b from-black/70 to-black/70 bg-cover bg-center`;
  };

  // 랜덤 역사 팩트 가져오기
  const getRandomHistoryFact = () => {
    const randomIndex = Math.floor(Math.random() * historyFacts.length);
    return historyFacts[randomIndex];
  };

  // 현재 날짜 포맷팅
  const formattedDate = format(new Date(), 'yyyy년 MM월 dd일');

  // 트레이트 한글 이름 매핑 함수
  const getTraitInfo = (trait: string) => {
    switch(trait) {
      case 'loyalty':
        return { 
          name: '충성심', 
          description: '조직과 집단을 위해 헌신하는 성향',
          color: 'bg-blue-500'
        };
      case 'intellect':
        return { 
          name: '지성', 
          description: '지적 호기심과 분석적 사고를 가진 성향',
          color: 'bg-indigo-500'
        };
      case 'wit':
        return { 
          name: '재치', 
          description: '순발력과 유머 감각이 뛰어난 성향',
          color: 'bg-amber-500'
        };
      case 'freedom':
        return { 
          name: '자유로움', 
          description: '규칙과 제약에 얽매이지 않는 성향',
          color: 'bg-pink-500'
        };
      case 'clown':
        return { 
          name: '쾌활함', 
          description: '유쾌하고 사람들을 즐겁게 하는 성향',
          color: 'bg-purple-500'
        };
      case 'escapism':
        return { 
          name: '회피성', 
          description: '어려운 상황을 피하고 싶어하는 성향',
          color: 'bg-gray-500'
        };
      case 'ambition':
        return { 
          name: '야망', 
          description: '높은 목표를 향해 도전하는 성향',
          color: 'bg-red-500'
        };
      case 'narcissism':
        return { 
          name: '자기애', 
          description: '자신을 사랑하고 표현하는데 능숙한 성향',
          color: 'bg-yellow-500'
        };
      default:
        return { 
          name: trait, 
          description: '독특한 개성',
          color: 'bg-green-500'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white py-3 px-4 flex items-center justify-between sticky top-0 shadow-sm z-10">
        <Link href="/tests" className="flex items-center text-gray-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="text-sm">테스트 목록</span>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">
          {step === 'result' ? '테스트 결과' : '나의 전생 케릭터는?'}
        </h1>
        <div className="w-8" /> {/* 균형을 위한 빈 공간 */}
      </header>

      {/* 컨페티 효과 */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col">
        {/* 최대 너비 500px로 제한 */}
        <div className="w-full max-w-[500px] mx-auto">
          <AnimatePresence mode="wait">
            {/* 인트로 화면 */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="flex-1 flex flex-col h-full"
              >
                <div className="relative w-full h-[40vh] max-h-[300px] bg-gradient-to-b from-indigo-800 to-purple-900 overflow-hidden">
                  <Image 
                    src={thumbnailImage} 
                    alt="전생 케릭터 테스트" 
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    className="mix-blend-overlay opacity-95"
                    priority
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
                    <motion.h1 
                      variants={itemVariants}
                      className="text-3xl font-bold mb-2 drop-shadow-md"
                    >
                      나의 전생 케릭터는?
                    </motion.h1>
                    <motion.p 
                      variants={itemVariants}
                      className="text-lg mb-3 drop-shadow-md"
                    >
                      12문제로 알아보는 당신의 전생 캐릭터
                    </motion.p>
                    <motion.div 
                      variants={itemVariants}
                      className="flex gap-1 mt-1"
                    >
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md p-5 mb-5"
                    whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 text-2xl">🏯</div>
                      <div>
                        <h2 className="text-xl font-semibold mb-2">당신은 조선시대에 누구였을까요?</h2>
                        <p className="text-gray-600 mb-3">
                          이순신? 궁녀? 아니면 나라를 팔고 싶어한 돌쇠?
                          간단한 심리 테스트로 당신의 전생을 알아보세요!
                        </p>
                        <div className="flex items-center gap-5 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                            <span>약 3분</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1 text-indigo-500" />
                            <span>12문항</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md p-5 mb-8 relative overflow-hidden"
                    whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                    <h3 className="text-md font-medium mb-2 flex items-center">
                      <Scroll className="h-4 w-4 mr-1.5 text-amber-500" />
                      오늘의 역사 팩트
                    </h3>
                    <p className="text-gray-600 text-sm italic">
                      {getRandomHistoryFact()}
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col mt-auto">
                    <Button 
                      onClick={() => setStep('test')} 
                      className="bg-indigo-600 hover:bg-indigo-700 transition-all py-4 rounded-lg shadow-md text-base font-medium"
                      size="lg"
                    >
                      테스트 시작하기
                    </Button>
                    <div className="text-center text-xs text-gray-500 mt-3">
                      {formattedDate} 기준 · 154,321명이 참여
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* 테스트 화면 */}
            {step === 'test' && (
              <motion.div
                key="test"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="flex-1 flex flex-col"
              >
                {/* 진행 상태 표시 */}
                <div className="px-4 py-3 bg-white">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span className="font-medium">
                      진행률: {Math.round(((currentQuestion + 1) / testData.questions.length) * 100)}%
                    </span>
                    <span>
                      {currentQuestion + 1} / {testData.questions.length}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-600 rounded-full"
                      initial={{ width: `${(currentQuestion / testData.questions.length) * 100}%` }}
                      animate={{ width: `${((currentQuestion + 1) / testData.questions.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* 질문 및 선택지 */}
                <div 
                  className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50"
                >
                  <div className="w-full">
                    <motion.div 
                      variants={popInVariants}
                      key={`question-${currentQuestion}`}
                      className="bg-white rounded-xl shadow-lg p-6 mb-5"
                    >
                      <motion.h2 
                        className="text-xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentQuestionData.text}
                      </motion.h2>
                      <p className="text-sm text-gray-500">
                        당신의 성향과 가장 가까운 답변을 선택하세요
                      </p>
                    </motion.div>

                    <div className="space-y-3">
                      {currentQuestionData.choices.map((choice, index) => (
                        <motion.button
                          key={`choice-${index}`}
                          variants={itemVariants}
                          whileHover={!isTransitioning ? { scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" } : {}}
                          whileTap={!isTransitioning ? { scale: 0.98 } : {}}
                          onClick={() => handleOptionSelect(index)}
                          disabled={isTransitioning}
                          className={cn(
                            "w-full text-left bg-white rounded-xl p-4 shadow-md transition-all duration-300",
                            selectedOption === index 
                              ? "ring-2 ring-indigo-500 bg-indigo-50 transform scale-[1.02]" 
                              : "hover:bg-white hover:shadow-lg"
                          )}
                        >
                          <span className="flex items-start">
                            <span className="flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full text-sm font-medium mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-800">{choice.text}</span>
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 결과 화면 */}
            {step === 'result' && result && (
              <motion.div
                key="result"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="flex-1 flex flex-col"
              >
                {/* 결과 헤더 */}
                <div className={`relative py-16 px-6 bg-gradient-to-br ${resultColors[result.id]} text-white text-center`}>
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: 0.2
                    }}
                    className="inline-flex items-center justify-center h-24 w-24 bg-white/20 backdrop-blur-sm rounded-full mb-5 relative"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {resultIcons[result.id] || <Star className="h-16 w-16 text-yellow-300" />}
                    </motion.div>
                    
                    {/* 빛나는 효과 */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.5)" }}
                      animate={{ 
                        boxShadow: ["0 0 0 0 rgba(255,255,255,0.5)", "0 0 0 10px rgba(255,255,255,0)", "0 0 0 0 rgba(255,255,255,0)"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </motion.div>
                  
                  <motion.h2 
                    variants={itemVariants}
                    className="text-3xl font-bold mb-3"
                  >
                    {result.title}
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants}
                    className="text-white/90 mb-4 text-lg"
                  >
                    {result.description}
                  </motion.p>
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-2 mt-4"
                  >
                    {result.tags.map((tag: string, index: number) => (
                      <motion.span 
                        key={index}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* 거울에 나타나는 얼굴 효과 */}
                <div className="py-8 px-4 bg-gray-50">
                  <div className="w-full max-w-[350px] mx-auto">
                    <motion.div 
                      className="relative mx-auto"
                      initial="hidden"
                      animate="visible"
                    >
                      {/* 거울 프레임 */}
                      <div className="relative mx-auto w-full aspect-[3/4] rounded-[40px] overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 p-4">
                        {/* 거울 내부 */}
                        <div className="absolute inset-4 rounded-[30px] overflow-hidden bg-gradient-to-br from-blue-100/80 via-gray-100/90 to-purple-100/80 backdrop-blur-sm flex items-center justify-center">
                          {/* 거울 반사 효과 */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent"
                            variants={mirrorReflectionVariants}
                          />
                          
                          {/* 이미지가 나타나는 효과 */}
                          <motion.div 
                            className="w-[85%] aspect-square relative"
                            variants={mirrorRevealVariants}
                          >
                            {resultImages[result.id] && (
                              <Image 
                                src={resultImages[result.id]} 
                                alt={result.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover rounded-2xl"
                                priority
                              />
                            )}
                          </motion.div>
                        </div>
                        
                        {/* 거울 장식 */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-300/20 rounded-b-full backdrop-blur-sm" />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400/50" />
                      </div>
                      
                      {/* 거울 하단 장식 */}
                      <div className="w-[60%] h-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 mx-auto rounded-b-full shadow-lg" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-center mt-6 text-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      <p className="font-medium italic text-sm">
                        "거울이 당신의 전생을 비춰냅니다..."
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* 결과 본문 */}
                <div className="p-6 space-y-6">
                  {/* 상세 설명 */}
                  <motion.div
                    variants={staggeredContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-md p-5 space-y-4"
                  >
                    <motion.h3 
                      variants={itemVariants}
                      className="text-lg font-semibold text-gray-900 flex items-center"
                    >
                      <Scroll className="h-5 w-5 mr-2 text-indigo-500" />
                      당신의 전생 이야기
                    </motion.h3>
                    
                    <motion.p 
                      variants={itemVariants}
                      className="text-gray-700 leading-relaxed"
                    >
                      {result.fullDescription || `당신은 조선시대 ${result.title}이었군요! ${result.description} 당신의 타고난 성격과 성향은 현재까지도 이어져 오고 있습니다.`}
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <p className="text-gray-700 text-sm italic">
                        {result.id === 'general' && '당신은 임진왜란 당시 백의종군했던 이순신이었습니다. 조선 수군을 이끌며 열두 척의 배로 왜군 133척과 맞서 싸워 승리를 거두었습니다. 당신의 리더십과 충성심은 현재에도 이어지고 있습니다.'}
                        {result.id === 'scholar' && '당신은 밤낮으로 책을 읽고 정치와 철학에 대해 고민했던 조선의 책사였습니다. 왕의 정책을 조언하며 백성들의 삶을 개선하기 위해 노력했습니다. 하지만 당파싸움에 휘말려 고초를 겪기도 했죠.'}
                        {result.id === 'artist' && '당신은 유명한 기생으로, 시와 노래, 춤에 뛰어났습니다. 자유로운 영혼을 지녀 신분의 제약을 뛰어넘는 삶을 살았고, 양반들 사이에서 당신의 이름은 예술의 대명사였습니다.'}
                        {result.id === 'merchant' && '당신은 삼식이라는 이름으로 불리던 상인이었습니다. 머리가 비상하고 말재주가 뛰어나 장사에 재능이 있었지만, 가끔 실수도 하곤 했죠. 하지만 그 실수마저 행운으로 바꾸는 능력을 가졌습니다.'}
                        {result.id === 'noble' && '당신은 양반가의 자제로 태어나 호의호식하는 삶을 살았습니다. 특히 자신의 외모에 자부심이 강해 늘 거울을 보며 미소를 짓곤 했죠. 하지만 가끔은 그 특권에 어울리는 책임감도 발휘했습니다.'}
                        {result.id === 'clown' && '당신은 임금도 웃게 만드는 재주 있는 광대였습니다. 사람들은 당신의 유머에 즐거워했지만, 그 속에 담긴 날카로운 사회 비판을 눈치채지 못했죠. 당신은 웃음 속에 진실을 담아내는 지혜를 가졌습니다.'}
                        {result.id === 'hermit' && '당신은 세상의 번잡함을 떠나 깊은 산속에서 은둔생활을 하던 돌쇠였습니다. 관직도 마다하고 자연과 더불어 사는 삶을 선택했으며, 가끔 마을에 내려와 약재를 나눠주기도 했습니다.'}
                        {result.id === 'servant' && '당신은 양반가의 충직한 하인으로, 주인을 위해 헌신적으로 일했습니다. 궁녀로 입궁하게 되었고, 궁 안에서 벌어지는 복잡한 정치적 상황 속에서도 현명하게 처신했습니다.'}
                      </p>
                    </motion.div>
                  </motion.div>
                  
                  {/* 트레이트 분석 */}
                  <motion.div
                    variants={staggeredContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-md p-5"
                  >
                    <motion.h3 
                      variants={itemVariants}
                      className="text-lg font-semibold text-gray-900 flex items-center mb-4"
                    >
                      <PieChart className="h-5 w-5 mr-2 text-indigo-500" />
                      성향 분석
                    </motion.h3>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      {Object.entries(traitCounts).sort((a, b) => b[1] - a[1]).map(([trait, count], index) => {
                        const traitInfo = getTraitInfo(trait);
                        const percentage = Math.round((count / testData.questions.length) * 100);
                        
                        return (
                          <div key={trait} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-700">{traitInfo.name}</span>
                              <span className="text-gray-600">{percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ 
                                  duration: 1, 
                                  delay: index * 0.2,
                                  type: "spring",
                                  stiffness: 50
                                }}
                                className={`h-full ${traitInfo.color} rounded-full`}
                              />
                            </div>
                            <p className="text-xs text-gray-500 italic">{traitInfo.description}</p>
                          </div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                  
                  {/* 유사한 인물 */}
                  {result.similarCharacters && result.similarCharacters.length > 0 && (
                    <motion.div
                      variants={staggeredContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-xl shadow-md p-5"
                    >
                      <motion.h3 
                        variants={itemVariants}
                        className="text-lg font-semibold text-gray-900 flex items-center mb-4"
                      >
                        <Users className="h-5 w-5 mr-2 text-indigo-500" />
                        비슷한 역사적 인물
                      </motion.h3>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="grid grid-cols-2 gap-3"
                      >
                        {result.similarCharacters.map((character: any, index: number) => (
                          <div 
                            key={index}
                            className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center"
                          >
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                              {character.icon || <Crown className="h-6 w-6 text-indigo-600" />}
                            </div>
                            <span className="font-medium text-gray-800">{character.name}</span>
                            <span className="text-xs text-gray-500">{character.description}</span>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* 한자 운세 카드 */}
                  <motion.div
                    variants={staggeredContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-md p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                    
                    <motion.h3 
                      variants={itemVariants}
                      className="text-lg font-semibold text-gray-900 flex items-center mb-4"
                    >
                      <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                      오늘의 한자 운세
                    </motion.h3>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="flex flex-col md:flex-row gap-6 items-center"
                    >
                      <div className="flex-shrink-0 w-24 h-24 bg-amber-50 rounded-xl border-2 border-amber-100 flex items-center justify-center text-6xl font-bold text-amber-700">
                        {result.id === 'general' && '忠'}
                        {result.id === 'scholar' && '智'}
                        {result.id === 'artist' && '美'}
                        {result.id === 'merchant' && '財'}
                        {result.id === 'noble' && '名'}
                        {result.id === 'clown' && '樂'}
                        {result.id === 'hermit' && '隱'}
                        {result.id === 'servant' && '誠'}
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800 mb-1">
                          {result.id === 'general' && '忠 (충) - 충성'}
                          {result.id === 'scholar' && '智 (지) - 지혜'}
                          {result.id === 'artist' && '美 (미) - 아름다움'}
                          {result.id === 'merchant' && '財 (재) - 재물'}
                          {result.id === 'noble' && '名 (명) - 명예'}
                          {result.id === 'clown' && '樂 (락) - 즐거움'}
                          {result.id === 'hermit' && '隱 (은) - 은둔'}
                          {result.id === 'servant' && '誠 (성) - 성실'}
                        </p>
                        <p className="text-gray-700 italic leading-relaxed">
                          {result.id === 'general' && '충성심과 책임감이 당신의 가장 큰 무기입니다. 오늘 어려운 일이 있더라도 굳건히 헤쳐나갈 수 있을 것입니다. 주변 사람들을 믿고 함께할 때 위기를 극복할 수 있습니다.'}
                          {result.id === 'scholar' && '오늘은 지혜가 빛나는 날입니다. 복잡한 문제도 당신의 분석력으로 해결할 수 있을 것입니다. 새로운 지식을 얻을 기회가 찾아올 것이니 배움의 자세를 유지하세요.'}
                          {result.id === 'artist' && '당신의 창의적 영감이 최고조에 이르는 날입니다. 자유롭게 상상력을 발휘하세요. 예술적 시도가 주변 사람들에게 큰 감동을 줄 것입니다.'}
                          {result.id === 'merchant' && '오늘은 재물운이 강한 날입니다. 기회를 잘 포착하면 예상치 못한 이득을 얻을 수 있습니다. 직관을 믿고 결정을 내리되, 지나친 욕심은 경계하세요.'}
                          {result.id === 'noble' && '오늘 당신의 노력이 인정받을 것입니다. 자신감을 가지되 겸손함을 잃지 마세요. 당신의 리더십이 주변 사람들에게 좋은 영향을 미칠 것입니다.'}
                          {result.id === 'clown' && '오늘은 즐거움이 가득한 날입니다. 당신의 유머와 재치가 어려운 상황을 해결하는 열쇠가 될 것입니다. 긍정적인 태도로 주변 사람들에게 웃음을 선사하세요.'}
                          {result.id === 'hermit' && '오늘은 내면의 평화를 찾기 좋은 날입니다. 잠시 현실에서 벗어나 자신을 돌아볼 시간을 가지세요. 고요함 속에서 중요한 깨달음을 얻을 수 있습니다.'}
                          {result.id === 'servant' && '오늘 당신의 성실함과 노력이 빛을 발할 것입니다. 묵묵히 해온 일들이 좋은 결과로 돌아올 것이니 포기하지 말고 계속 나아가세요. 신뢰를 쌓는 하루가 될 것입니다.'}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* 오늘의 운세 카드 */}
                  <motion.div
                    variants={staggeredContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-md p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                    
                    <motion.h3 
                      variants={itemVariants}
                      className="text-lg font-semibold text-gray-900 flex items-center mb-4"
                    >
                      <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                      조선시대 당신의 하루
                    </motion.h3>
                    
                    <motion.p 
                      variants={itemVariants}
                      className="text-gray-700 italic leading-relaxed"
                    >
                      {result.id === 'general' && '당신은 아침 일찍 일어나 병사들의 훈련을 지휘합니다. 점심에는 왕으로부터 긴급 전서가 도착했습니다. 왜구가 침입한다는 소식입니다. 당신은 즉시 수군을 소집하고 전략 회의를 소집합니다. 저녁에는 가족들에게 편지를 쓰며 하루를 마무리합니다.'}
                      {result.id === 'scholar' && '당신은 새벽부터 일어나 독서와 명상으로 하루를 시작합니다. 오전에는 제자들에게 경전을 가르치고, 오후에는 왕이 내린 정책에 대한 의견서를 작성합니다. 저녁에는 동료 학자들과 차를 마시며 철학적 담론을 나눕니다.'}
                      {result.id === 'artist' && '당신은 늦은 아침에 일어나 거문고를 연주하며 하루를 시작합니다. 오후에는 양반들이 주최한 시회에 초대받아 즉석에서 아름다운 시를 짓습니다. 저녁에는 달빛 아래에서 춤을 추며 자유로운 영혼을 표현합니다.'}
                      {result.id === 'merchant' && '당신은 새벽 시장에 제일 먼저 도착해 좋은 상품을 고릅니다. 오전부터 오후까지 활발하게 거래를 하고, 저녁에는 장부를 정리하며 다음 거래를 계획합니다. 가끔은 외지에서 온 상인들과 교류하며 새로운 정보를 얻습니다.'}
                      {result.id === 'noble' && '당신은 하인들의 시중을 받으며 늦은 아침에 일어납니다. 오전에는 과거시험 준비를 하고, 오후에는 친구들과 말타기나 활쏘기를 즐깁니다. 저녁에는 가문의 어른들과 함께 식사하며 정치 이야기를 나눕니다.'}
                      {result.id === 'clown' && '당신은 아침부터 새로운 공연을 위한 재담을 연습합니다. 낮에는 시장터에서 사람들에게 웃음을 선사하고, 저녁에는 양반 집안의 잔치에 초대받아 공연을 펼칩니다. 밤에는 내일의 공연을 위한 아이디어를 구상합니다.'}
                      {result.id === 'hermit' && '당신은 일출과 함께 일어나 명상을 합니다. 오전에는 약초를 채집하고, 오후에는 책을 읽거나 글을 씁니다. 저녁에는 달을 보며 차를 마시고, 가끔 찾아오는 방문객과 인생의 의미에 대해 이야기를 나눕니다.'}
                      {result.id === 'servant' && '당신은 새벽부터 일어나 주인 가족을 위한 아침 준비를 합니다. 하루 종일 집안일과 심부름을 하며 바쁘게 지내고, 저녁에는 다른 하인들과 함께 내일 일을 계획합니다. 가끔 주인의 특별한 신임을 받아 중요한 임무를 맡기도 합니다.'}
                    </motion.p>
                  </motion.div>
                  
                  {/* 공유 및 재시작 버튼 */}
                  <motion.div
                    variants={staggeredContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3 pt-4"
                  >
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={shareResult}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center shadow-md transition-all relative"
                    >
                      <Share2 className="h-5 w-5 mr-2" />
                      <span>결과 공유하기</span>
                      
                      {showShare && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-10 left-0 right-0 bg-black/80 text-white text-xs py-2 px-4 rounded-md"
                        >
                          클립보드에 복사되었습니다!
                        </motion.div>
                      )}
                    </motion.button>
                    
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={restartTest}
                      className="w-full py-3.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center shadow-sm transition-all"
                    >
                      <RefreshCcw className="h-5 w-5 mr-2" />
                      <span>테스트 다시하기</span>
                    </motion.button>
                    
                    <Link href="/tests">
                      <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg flex items-center justify-center shadow-sm transition-all"
                      >
                        <LayoutGrid className="h-5 w-5 mr-2" />
                        <span>다른 테스트 하기</span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}