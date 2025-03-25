"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConcernInput } from "@/features/tarot-consultation/components/ConcernInput";
import { TarotCardSelector } from "@/features/tarot-consultation/components/TarotCardSelector";
import { TarotReading } from "@/features/tarot-consultation/components/TarotReading";
import { useTarotReading } from "@/features/tarot-consultation/api";
import { Sparkles, RefreshCw } from "lucide-react";
import { MAJOR_ARCANA, TarotCard } from "@/features/tarot-consultation/constants/tarot-cards";
import Head from "next/head";
import Image from "next/image";

export default function TarotConsultationPage() {
  const [concern, setConcern] = useState("");
  const [selectedCards, setSelectedCards] = useState<
    { card: TarotCard; isReversed: boolean }[]
  >([]);
  const [isConcernSubmitted, setIsConcernSubmitted] = useState(false);
  const { generateReading, reading, isLoading, error, resetReading } = useTarotReading();

  // 고민 입력 처리
  const handleConcernSubmit = (userConcern: string) => {
    setConcern(userConcern);
    setIsConcernSubmitted(true);
  };

  // 카드 선택 처리
  const handleCardSelect = (cards: { card: TarotCard; isReversed: boolean }[]) => {
    setSelectedCards(cards);
    generateReading(concern, cards);
  };

  // 초기 상태로 리셋
  const handleReset = () => {
    setConcern("");
    setSelectedCards([]);
    setIsConcernSubmitted(false);
    resetReading();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white overflow-hidden relative">
      {/* 백그라운드 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/2 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 헤더 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mx-auto mb-4">
            <Image 
              src="/images/tarot-header.png" 
              alt="타로 상담" 
              width={150} 
              height={150}
              className="mx-auto mb-2"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            타로 카드 상담
            <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            과거, 현재, 미래를 알려주는 타로 카드를 통해 당신의 고민에 대한 인사이트를 얻어보세요.
            각 카드는 당신에게 특별한 메시지를 전달합니다.
          </p>
        </motion.div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 mb-8">
          <AnimatePresence mode="wait">
            {/* 단계 1: 고민 입력 */}
            {!isConcernSubmitted && (
              <motion.div
                key="concern-input"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <ConcernInput onSubmit={handleConcernSubmit} />
              </motion.div>
            )}

            {/* 단계 2: 카드 선택 */}
            {isConcernSubmitted && selectedCards.length < 3 && (
              <motion.div
                key="card-selection"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <TarotCardSelector 
                  onCardsSelected={handleCardSelect} 
                  isLoading={isLoading}
                />
              </motion.div>
            )}

            {/* 단계 3: 결과 표시 */}
            {selectedCards.length === 3 && reading && (
              <motion.div
                key="reading-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TarotReading 
                  cards={selectedCards} 
                  reading={reading} 
                  concern={concern}
                  onReset={handleReset}
                />
              </motion.div>
            )}

            {/* 로딩 표시 */}
            {selectedCards.length === 3 && isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
                    <div className="absolute inset-6 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-300 border-l-transparent animate-spin animation-delay-300"></div>
                  </div>
                  <p className="text-lg font-medium text-purple-800">타로 카드를 해석하고 있습니다...</p>
                  <p className="text-sm text-gray-500">깊은 통찰력을 끌어올리는 중입니다</p>
                </div>
              </motion.div>
            )}

            {/* 에러 표시 */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
              >
                <p className="text-red-700 mb-2">죄송합니다, 타로 해석 중 문제가 발생했습니다.</p>
                <p className="text-gray-600 text-sm mb-4">{error}</p>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center mx-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도하기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 푸터 */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>이 타로 상담은 재미 요소로, 중요한 결정에 사용하지 마세요.</p>
          <p className="mt-1">© 2023 타로 상담 서비스</p>
        </div>
      </div>
    </div>
  );
} 