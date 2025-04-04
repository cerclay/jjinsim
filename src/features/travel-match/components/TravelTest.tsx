"use client";

import React, { useState } from "react";
import { TravelQuestion } from "./TravelQuestion";
import { TravelResult } from "./TravelResult";
import { findBestTravelMatch, getTravelData } from "../utils/calculateTravel";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface TravelTestProps {
  questions: {
    id: number;
    text: string;
    options: {
      text: string;
      traits: string[];
    }[];
  }[];
  results: any[];
  onBack: () => void;
}

export function TravelTest({ questions, results, onBack }: TravelTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{
    id: string;
    title: string;
    description: string;
    activities: string[];
    summary: string;
    gifUrl: string;
  } | null>(null);

  const isComplete = answers.length === questions.length;

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions[currentQuestionIndex].options[optionIndex].traits;

    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const travelResult = findBestTravelMatch(newAnswers, results);
      setResult(travelResult);
      setResultData(getTravelData(travelResult, results));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setResultData(null);
  };

  const handleShare = () => {
    // 공유 기능 구현 (실제로는 소셜 공유 등을 구현)
    if (resultData) {
      if (navigator.share) {
        navigator.share({
          title: '나랑 잘 맞는 여행지는?',
          text: `나의 여행 궁합은 "${resultData.title}"이에요! 당신은 어떤 여행지와 잘 맞나요?`,
          url: window.location.href
        }).catch((error) => console.log('공유 실패:', error));
      } else {
        // 공유 API를 지원하지 않는 브라우저
        alert('결과 링크가 복사되었습니다!');
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex justify-between items-center"
      >
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">테스트 소개로 돌아가기</span>
        </button>
      </motion.div>

      {!isComplete || !result ? (
        <TravelQuestion 
          question={questions[currentQuestionIndex].text}
          options={questions[currentQuestionIndex].options.map(opt => opt.text)}
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onSelectOption={handleSelectOption}
          onPrevious={handlePrevious}
        />
      ) : (
        <TravelResult 
          result={result}
          resultData={resultData}
          onRestart={handleRestart}
          onShare={handleShare}
        />
      )}
    </div>
  );
} 