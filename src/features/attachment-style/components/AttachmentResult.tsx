"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttachmentResult } from "../constants/testData";
import { Share2, RefreshCw, Download, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface AttachmentResultProps {
  result: string;
  resultData: AttachmentResult | null;
  onRestart: () => void;
}

export function AttachmentResultComponent({ result, resultData, onRestart }: AttachmentResultProps) {
  useEffect(() => {
    // 결과 페이지 로딩 시 색종이 효과
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!resultData) return null;

  // 공유 기능
  const handleShare = async () => {
    const shareData = {
      title: '애착유형 테스트',
      text: `나의 애착유형은 '${resultData.title}'이에요! 당신의 애착유형도 알아보세요.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 클립보드에 복사
        await navigator.clipboard.writeText(`나의 애착유형은 '${resultData.title}'이에요! 당신의 애착유형도 알아보세요. ${window.location.href}`);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.error('공유 중 오류 발생:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-md mx-auto px-4 pb-10"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Card className="overflow-hidden border-none shadow-xl">
          <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 p-6 text-white text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-rose-500 text-5xl w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            >
              {resultData.title.split(' ')[0]}
            </motion.div>
            
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-extrabold mt-6 mb-3 drop-shadow-sm"
            >
              {resultData.title.split(' ').slice(1).join(' ')}
            </motion.h2>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="flex flex-wrap justify-center gap-2 mt-3"
            >
              {resultData.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          <div className="p-6 pt-5 bg-white">
            <div className="mb-6 border-b border-gray-100 pb-5 relative">
              <div className="flex justify-center -mt-10 mb-5">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="w-64 h-64 overflow-hidden border-4 border-white shadow-lg rounded-lg"
                >
                  <img 
                    src={resultData.gifUrl} 
                    alt={resultData.title} 
                    className="w-full h-full object-cover" 
                    loading="eager"
                  />
                </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-gray-800 text-base leading-relaxed"
              >
                {resultData.description}
              </motion.p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleShare}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-5 font-medium flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                결과 공유하기
              </Button>
              
              <Button 
                onClick={onRestart}
                variant="outline"
                className="w-full py-5 font-medium flex items-center justify-center gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <RefreshCw size={18} />
                테스트 다시하기
              </Button>
              
              <Link href="/tests" passHref>
                <Button
                  variant="ghost"
                  className="w-full py-5 font-medium flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  다른 테스트 둘러보기
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="p-5 border-none shadow-md bg-white overflow-hidden">
          <h3 className="font-bold text-lg mb-4 flex items-center text-gray-900">
            <span className="mr-2 text-2xl">💌</span> 
            <span>애착 유형 가이드</span>
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-rose-50 rounded-lg">
              <h4 className="font-semibold text-rose-600 mb-1">👉 이럴 때 당신이 빛나요!</h4>
              <p className="text-gray-700">
                {result === 'secure' && '상대방을 믿고 안정감을 주는 연애를 하실 때 가장 빛나는 타입이에요. 다양한 가치관을 존중하는 당신은 건강한, 장기적인 연애에 최적화되어 있어요!'}
                {result === 'anxious' && '세심하고 따뜻한 배려로 상대방을 챙기는 연애를 하실 때 가장 빛나는 타입이에요. 당신의 진심어린 관심은 상대방에게 큰 사랑으로 전해진답니다!'}
                {result === 'avoidant' && '독립적이고 자기 주관이 뚜렷한 연애를 하실 때 가장 빛나는 타입이에요. 당신의 차분함과 신중함은 연애에서 큰 강점이랍니다!'}
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-1">💭 연애 팁</h4>
              <p className="text-gray-700">
                {result === 'secure' && '당신은 이미 건강한 연애 방식을 가지고 있어요. 그 균형감각을 잃지 말고, 때론 상대방에게 조금 더 적극적으로 감정을 표현해 보는 것도 좋아요!'}
                {result === 'anxious' && '상대방의 행동을 과도하게 해석하지 않도록 노력해보세요. 불안함을 느낄 때는 심호흡을 하고, 확인하고 싶은 마음을 솔직하게 말해보는 것도 방법이에요.'}
                {result === 'avoidant' && '가끔은 마음의 문을 조금 더 열어보는 것이 어떨까요? 감정 표현이 어렵더라도, 작은 것부터 시작해보세요. 상대방은 당신의 작은 표현에도 큰 기쁨을 느낄 거에요.'}
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-1">✨ 함께하면 좋은 유형</h4>
              <p className="text-gray-700">
                {result === 'secure' && '당신은 모든 유형과 잘 어울리지만, 특히 불안형(anxious)에게 안정감을 줄 수 있어요. 회피형(avoidant)과도 균형 잡힌 관계를 형성할 수 있는 능력이 있답니다!'}
                {result === 'anxious' && '안정형(secure)과 만나면 편안함을 느낄 수 있어요. 회피형(avoidant)과는 초반에 강한 끌림을 느낄 수 있지만 서로 이해하는 노력이 필요해요.'}
                {result === 'avoidant' && '안정형(secure)과 만나면 안정감과 자유를 동시에 경험할 수 있어요. 다른 회피형과 만나면 너무 거리가 생길 수 있고, 불안형과는 서로 맞춰가는 과정이 필요해요.'}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
} 