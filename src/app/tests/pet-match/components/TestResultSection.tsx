"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share, Twitter, Facebook, Copy, Repeat } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [isCopied, setIsCopied] = useState(false);

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

  // 결과 공유하기 기능
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '나랑 찰떡인 반려동물은?',
        text: `나는 '${result.title}'이라는 결과가 나왔어요! 내 성격과 딱 맞는 반려동물은 ${result.emoji}입니다. 당신도 테스트 해보세요!`,
        url: window.location.href,
      });
    }
  };

  // 결과 URL 복사
  const handleCopyLink = () => {
    const shareText = `나는 '${result.title}'이라는 결과가 나왔어요! 내 성격과 딱 맞는 반려동물은 ${result.emoji}입니다. 당신도 테스트 해보세요! ${window.location.href}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
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

      {/* 공유 버튼 섹션 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleShare}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-5 font-medium rounded-xl flex items-center justify-center gap-2"
          >
            <Share size={18} />
            결과 공유하기
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="flex-1 py-5 rounded-xl font-medium border-purple-200 flex items-center justify-center gap-2"
            >
              <Copy size={18} />
              {isCopied ? '복사 완료!' : '링크 복사'}
            </Button>
            
            <Button
              onClick={onRestart}
              variant="outline"
              className="flex-1 py-5 rounded-xl font-medium border-purple-200 flex items-center justify-center gap-2"
            >
              <Repeat size={18} />
              다시 테스트
            </Button>
          </div>
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