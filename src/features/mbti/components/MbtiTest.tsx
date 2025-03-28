"use client";

import React, { useState } from "react";
import { MbtiQuestion } from "./MbtiQuestion";
import { MbtiResult } from "./MbtiResult";
import { Button } from "@/components/ui/button";
import { calculateMbtiResult } from "../utils/calculateMbti";
import { getMbtiData } from "../utils/getMbtiData";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface MbtiTestProps {
  questions: {
    id: number;
    text: string;
    options: {
      text: string;
      value: string;
    }[];
  }[];
  onBack: () => void;
}

export function MbtiTest({ questions, onBack }: MbtiTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{
    mbti: string;
    title: string;
    description: string;
    tags: string[];
  } | null>(null);

  const isComplete = answers.length === questions.length;

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions[currentQuestionIndex].options[optionIndex].value;

    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const mbtiResult = calculateMbtiResult(newAnswers);
      setResult(mbtiResult);
      setResultData(getMbtiData(mbtiResult));
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

  return (
    <div className="w-full max-w-[500px] mx-auto px-4">
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
        <MbtiQuestion 
          question={questions[currentQuestionIndex].text}
          options={questions[currentQuestionIndex].options.map(opt => opt.text)}
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onSelectOption={handleSelectOption}
          onPrevious={handlePrevious}
        />
      ) : (
        <MbtiResult 
          result={result}
          resultData={resultData}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
} 