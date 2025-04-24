"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2, Image, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type ResultType = {
  type: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  gifUrl: string;
};

type TestResultSectionProps = {
  result: ResultType;
  onRestart: () => void;
};

export const TestResultSection = ({ result, onRestart }: TestResultSectionProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // 컴포넌트가 마운트되면 축하 이펙트 표시
  useEffect(() => {
    // 컨페티 효과
    const shootConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    shootConfetti();

    // 5초 후에 컨페티 한번 더
    const timer = setTimeout(() => {
      shootConfetti();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 이미지로 저장하기 함수
  const saveAsImage = async () => {
    if (!resultCardRef.current) return;
    setIsSavingImage(true);
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(resultCardRef.current);
      const link = document.createElement('a');
      link.download = `나랑-찰떡인-반려동물-${result.type}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "이미지 저장 완료",
        description: "결과 이미지가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('이미지 저장 오류:', error);
      toast({
        title: "이미지 저장 실패",
        description: "이미지를 저장할 수 없습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSavingImage(false);
    }
  };

  // 다른 테스트 페이지로 이동
  const goToOtherTests = () => {
    router.push('/tests');
  };

  // 테스트 URL 공유 함수
  const shareTestUrl = async () => {
    setIsSharing(true);
    
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      
      toast({
        title: "공유 링크가 복사되었습니다",
        description: "SNS나 메신저에 붙여넣기 하세요",
      });
    } catch (error) {
      console.error('공유 오류:', error);
      toast({
        title: "공유하기 실패",
        description: "링크를 복사할 수 없습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* 결과 헤더 */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block mb-2 bg-purple-100 px-4 py-1 rounded-full text-purple-700 font-medium">
          결과 분석 완료!
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          당신과 찰떡인 반려동물은...
        </h1>
      </motion.div>

      {/* 결과 카드 */}
      <motion.div
        ref={resultCardRef}
        className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-purple-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* 결과 GIF */}
        <div className="w-full aspect-video relative overflow-hidden bg-gray-100">
          <motion.img 
            src={result.gifUrl} 
            alt={result.title} 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* 결과 내용 */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">{result.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800">{result.title}</h2>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">
              {result.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {result.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 버튼 섹션 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col gap-3">
          <Button
            onClick={saveAsImage}
            disabled={isSavingImage}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-5 font-medium rounded-xl flex items-center justify-center gap-2"
          >
            {isSavingImage ? '저장 중...' : (
              <>
                <Image className="h-5 w-5" />
                이미지로 저장하기
              </>
            )}
          </Button>
          
          <Button
            onClick={goToOtherTests}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-5 font-medium rounded-xl flex items-center justify-center gap-2"
          >
            <BookOpen className="h-5 w-5" />
            다른 테스트 보기
          </Button>
          
          <Button
            onClick={shareTestUrl}
            disabled={isSharing}
            className="bg-pink-600 hover:bg-pink-700 text-white w-full py-5 font-medium rounded-xl flex items-center justify-center gap-2"
          >
            {isSharing ? '공유 중...' : (
              <>
                <Share2 className="h-5 w-5" />
                결과 공유하기
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* 추가 정보 */}
      <motion.div
        className="text-center text-gray-500 text-sm bg-white p-4 rounded-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>
          이 테스트는 재미로 즐겨주세요! 실제 반려동물 선택 시에는 본인의 환경과 생활 패턴을 고려해주세요.
        </p>
      </motion.div>
    </div>
  );
}; 