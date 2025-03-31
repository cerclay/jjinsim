"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AttachmentQuestionComponent } from "./AttachmentQuestion";
import { AttachmentResultComponent } from "./AttachmentResult";
import { Button } from "@/components/ui/button";
import { calculateAttachmentResult, getAttachmentData, shuffleQuestions } from "../utils/calculateResult";
import { ATTACHMENT_QUESTIONS } from "../constants/testData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AttachmentTestProps {
  onBack?: () => void;
}

export function AttachmentTest({ onBack }: AttachmentTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState(ATTACHMENT_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트 마운트 시 문제 섞기
    try {
      setShuffledQuestions(shuffleQuestions(ATTACHMENT_QUESTIONS));
      setIsLoading(false);
    } catch (error) {
      console.error("질문 로딩 중 오류 발생:", error);
      setIsLoading(false);
    }
  }, []);

  const isComplete = answers.length === shuffledQuestions.length;

  const handleSelectOption = (optionType: string) => {
    try {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = optionType;

      setAnswers(newAnswers);

      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const attachmentResult = calculateAttachmentResult(newAnswers);
        setResult(attachmentResult);
        setResultData(getAttachmentData(attachmentResult));
      }
    } catch (error) {
      console.error("선택 처리 중 오류 발생:", error);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    try {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setResult(null);
      setResultData(null);
      // 다시 문제 섞기
      setShuffledQuestions(shuffleQuestions(ATTACHMENT_QUESTIONS));
    } catch (error) {
      console.error("테스트 재시작 중 오류 발생:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-6">
      {!isComplete || !result ? (
        <>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {onBack ? (
              <button
                onClick={onBack}
                className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span>테스트 소개로 돌아가기</span>
              </button>
            ) : (
              <Link href="/tests/attachment-style" passHref>
                <button className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors font-medium">
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  <span>테스트 소개로 돌아가기</span>
                </button>
              </Link>
            )}
          </motion.div>
          
          <AttachmentQuestionComponent 
            question={shuffledQuestions[currentQuestionIndex]}
            currentQuestion={currentQuestionIndex}
            totalQuestions={shuffledQuestions.length}
            onSelectOption={handleSelectOption}
            onPrevious={handlePrevious}
          />
        </>
      ) : (
        <AttachmentResultComponent 
          result={result}
          resultData={resultData}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
} 