'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TestResult } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Brain, Star, Lightbulb, Smile, Trophy, RefreshCw, Grid, Copy, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

interface ResultCardProps {
  result: TestResult;
  onRestart: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onRestart }) => {
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 결과가 표시될 때 색종이 효과
  useEffect(() => {
    const duration = 5 * 1000; // 5초 동안 효과 지속
    const animationEnd = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // 여러 색상의 색종이 폭발
      confetti({
        particleCount,
        origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.4) },
        colors: colors,
        gravity: 1,
        spread: 90,
        angle: randomInRange(0, 360),
        startVelocity: 40,
      });
      
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // 다시 테스트하기 버튼 토글 기능
  const handleRestartHover = () => {
    setShowRestartConfirm(true);
  };

  const handleRestartLeave = () => {
    setShowRestartConfirm(false);
  };

  // 결과 카드 우측 하단에 마우스 올리면 다시 테스트하기 버튼이 표시되도록 함
  useEffect(() => {
    const cardElement = resultCardRef.current;
    if (!cardElement) return;
    
    cardElement.addEventListener('mouseenter', handleRestartHover);
    cardElement.addEventListener('mouseleave', handleRestartLeave);
    
    // 모바일 환경에서는 항상 다시 테스트 버튼 표시
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      setShowRestartConfirm(true);
    }
    
    return () => {
      cardElement.removeEventListener('mouseenter', handleRestartHover);
      cardElement.removeEventListener('mouseleave', handleRestartLeave);
    };
  }, [resultCardRef.current]);

  // IQ 점수에 따른 재미있는 분석글 생성
  const getAnalysisText = () => {
    if (result.iqScore < 90) {
      return "당신의 뇌는 지금 '절전 모드'! 하지만 걱정마세요. 똑똑함보다 중요한 건 타고난 귀여움이니까요. 친구들 사이에선 당신이 '순둥이' 포지션이죠? 어려운 문제보단 간식 선택에 더 진지한 당신, 때론 그런 단순함이 더 행복한 비결이랍니다. 결론: 세상이 복잡할 때 당신의 단순함은 최고의 무기!";
    } else if (result.iqScore < 105) {
      return "세상은 빠르게 달리는 토끼보다 꾸준히 가는 거북이를 더 응원합니다. 당신은 '깊은 생각형'! 다른 사람들이 벌써 결론 내릴 때 당신은 아직 고민 중이죠. 하지만 이런 신중함이 때로는 놀라운 통찰력으로 변하곤 합니다. 급할수록 돌아가라는 말이 있듯이, 당신의 '느림의 미학'을 사랑하세요. 결론: 당신의 느린 템포가 만들어낼 인생의 걸작을 기대합니다!";
    } else if (result.iqScore < 120) {
      return "너무 똑똑하지도, 너무 모자라지도 않은 완벽한 균형! 당신은 적당히 눈치도 있고 센스도 있어서 어디서든 환영받는 타입입니다. 고민할 땐 진지하게, 놀 땐 신나게! 삶의 모든 순간을 균형있게 즐기는 당신은 타고난 '인생의 달인'이랍니다. 결론: 어디서든 적응하는 살아있는 레전드 - 바로 당신!";
    } else if (result.iqScore < 135) {
      return "평소엔 숨겨두지만, 필요할 때 번뜩이는 당신의 지능! 친구들이 '어? 이런 것도 알아?' 하고 놀랄 때 속으로 웃고 계시죠? 당신의 뇌는 마치 스텔스 모드의 슈퍼컴퓨터 같아요. 평소엔 평범해 보이지만, 필요할 때 순간 작동하는 놀라운 연산 능력! 이런 숨은 재능, 더 자주 세상에 보여주세요. 결론: 반전매력 폭발 - 누구도 예상 못한 당신의 빛나는 순간!";
    } else {
      return "당신의 머릿속은 어떤 풍경일까요? 아마도 수많은 별이 빛나는 우주 같을 거예요. 남들이 한 번에 하나씩 생각할 때, 당신은 이미 다섯 가지를 동시에 고민하고 있죠. 그런데 가끔은 그 똑똑한 머리를 쉬게 해주세요. 당신의 뇌는 쉴 틈 없이 일하고 있으니까요. 천재의 부담감에서 벗어나 바보처럼 웃을 수 있는 순간도 필요합니다. 결론: 당신의 머리는 멈추지 않는 기차 - 가끔은 역에 정차도 필요해요!";
    }
  };

  // 결과에 따른 아이콘 선택
  const getResultIcon = () => {
    if (result.iqScore < 90) return <Smile className="w-24 h-24 text-amber-400" />;
    if (result.iqScore < 105) return <Star className="w-24 h-24 text-green-500" />;
    if (result.iqScore < 120) return <Lightbulb className="w-24 h-24 text-blue-500" />;
    if (result.iqScore < 135) return <Trophy className="w-24 h-24 text-purple-600" />;
    return <Brain className="w-24 h-24 text-indigo-600" />;
  };

  // 재미있는 밈 이미지 URL (IQ 점수에 따라 다른 이미지)
  const getMemeImageUrl = () => {
    if (result.iqScore < 90) {
      return "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif"; // 순둥이 강아지
    } else if (result.iqScore < 105) {
      return "https://media.giphy.com/media/jRlP4zbERYW5HoCLvX/giphy.gif"; // 천천히 움직이는 거북이
    } else if (result.iqScore < 120) {
      return "https://media.giphy.com/media/3oKIPuMqYfRsyJTWfu/giphy.gif"; // 균형 잡힌 체조선수
    } else if (result.iqScore < 135) {
      return "https://media.giphy.com/media/fwoOoDZpEpdQewQdRR/giphy.gif"; // 번쩍이는 전구
    } else {
      return "https://media.giphy.com/media/l46CyJmS9KUbokzsI/giphy.gif"; // 우주와 은하수
    }
  };

  // 결과 이미지 저장 기능
  const handleDownloadImage = async () => {
    if (!resultCardRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // 다운로드 버튼 숨기기 (이미지에 포함되지 않게)
      const buttonsContainer = resultCardRef.current.querySelector('.card-buttons');
      if (buttonsContainer) buttonsContainer.classList.add('opacity-0');
      
      // 워터마크 추가
      const watermark = document.createElement('div');
      watermark.classList.add('absolute', 'bottom-2', 'right-4', 'text-xs', 'text-gray-400', 'font-medium');
      watermark.textContent = 'jjinsim.com';
      resultCardRef.current.appendChild(watermark);
      
      // 이미지 생성
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2, // 해상도 향상
        backgroundColor: null,
        logging: false,
        useCORS: true, // 외부 이미지 허용
      });
      
      // 워터마크 제거
      resultCardRef.current.removeChild(watermark);
      
      // 버튼 다시 표시
      if (buttonsContainer) buttonsContainer.classList.remove('opacity-0');
      
      // 이미지 다운로드
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `IQ테스트_결과_${result.iqScore}점.png`;
      link.click();
      
    } catch (error) {
      console.error('이미지 저장 실패:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 게임 링크 복사 기능
  const handleCopyGameLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const gameUrl = `${baseUrl}/tests/iq-test`;
    
    navigator.clipboard.writeText(gameUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        
        toast({
          title: "테스트 링크가 복사되었습니다",
          description: "친구에게 공유해보세요!",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
        toast({
          title: "링크 복사 실패",
          description: "다시 시도해주세요",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        ref={resultCardRef}
        className="w-full max-w-[500px] mx-auto bg-white shadow-xl border-t-4 border-blue-500 overflow-hidden relative"
      >
        <CardHeader className="text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-white p-5 rounded-full shadow-md">
              {getResultIcon()}
            </div>
          </motion.div>
          
          <CardTitle className="text-2xl font-bold text-blue-800 mt-3 mb-2">
            {result.resultTitle}
          </CardTitle>
          <CardDescription className="text-md text-gray-600 bg-white rounded-full py-1 px-4 inline-block">
            IQ 점수: {result.iqScore}점
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 px-6">
          <motion.div 
            className="text-center mb-6 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-gray-700 font-medium mb-4">{result.resultDescription}</p>
            
            {/* 밈 이미지 */}
            <div className="w-full max-w-[300px] h-[180px] relative mb-4 overflow-hidden rounded-lg">
              <img 
                src={getMemeImageUrl()} 
                alt={`IQ ${result.iqScore}점 결과에 대한 재미있는 밈 이미지`}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-100"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
              <Brain size={18} className="mr-2" /> 당신의 두뇌 분석
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "{getAnalysisText()}"
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2 justify-center mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {result.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Alert className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 mb-4">
              <AlertTitle className="text-blue-800 font-semibold flex items-center">
                <Trophy size={16} className="mr-2" /> 테스트 결과 요약
              </AlertTitle>
              <AlertDescription className="text-gray-700">
                <div className="mt-2 space-y-1">
                  <p>총 {result.totalQuestions}문제 중 <span className="font-bold text-blue-700">{result.correctAnswers}문제</span> 정답</p>
                  <p>소요 시간: <span className="font-bold text-purple-700">{result.timeSpent}초</span></p>
                  <p>정답률: <span className="font-bold text-green-700">{Math.round((result.correctAnswers / result.totalQuestions) * 100)}%</span></p>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3 p-6 bg-gradient-to-r from-gray-50 to-gray-100 card-buttons transition-opacity duration-200">
          {/* 상단 버튼 영역 */}
          <div className="flex w-full gap-3">
            <Button 
              variant="outline" 
              className="flex-1 gap-2 bg-white text-black border-2 border-purple-500 hover:bg-purple-50 h-11"
              onClick={handleDownloadImage}
              disabled={isDownloading}
            >
              <Download size={16} />
              {isDownloading ? '저장 중...' : '이미지 저장'}
            </Button>
            
            <Link href="/tests" className="flex-1">
              <Button 
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700 h-11" 
              >
                <Grid size={16} />
                다른 테스트 보기
              </Button>
            </Link>
          </div>
          
          {/* 테스트 공유하기 버튼 */}
          <Button
            variant="secondary"
            className="w-full gap-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 hover:bg-green-200 h-11"
            onClick={handleCopyGameLink}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            테스트 공유하기
          </Button>
          
          {/* 다시 테스트하기 버튼 */}
          {showRestartConfirm && (
            <Button 
              className="absolute -bottom-2 sm:bottom-1 right-1 h-8 sm:h-9 min-w-0 px-2 sm:px-3 bg-gray-600 hover:bg-gray-700 opacity-60 hover:opacity-100 rounded-full" 
              onClick={onRestart}
              size="sm"
              title="다시 테스트하기"
              aria-label="다시 테스트하기"
            >
              <RefreshCw size={14} />
              <span className="sr-only sm:not-sr-only sm:ml-1">다시하기</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}; 