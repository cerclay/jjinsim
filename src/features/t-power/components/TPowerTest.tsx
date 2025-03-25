"use client";

import { useState, useEffect, useRef } from "react";
import { useTPowerTest } from "../hooks/useTPowerTest";
import { Button } from "@/components/ui/button";
import { TPowerResult } from "../data/types";
import TPowerResultCard from "./TPowerResultCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TPowerTest() {
  const {
    currentQuestion,
    totalQuestions,
    question,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    calculateResult,
    isCompleted,
    progress,
    restart,
  } = useTPowerTest();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<TPowerResult | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const autoTransitionTimer = useRef<NodeJS.Timeout | null>(null);
  
  // 자동 전환 함수를 별도로 정의
  const autoAdvance = (delay: number) => {
    if (autoTransitionTimer.current) {
      clearTimeout(autoTransitionTimer.current);
    }
    
    if (delay === 0) {
      // 즉시 전환
      if (currentQuestion < totalQuestions - 1) {
        nextQuestion();
      } else {
        // 마지막 질문이면 완료 처리
        nextQuestion();
      }
    } else {
      autoTransitionTimer.current = setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          nextQuestion();
        } else {
          // 마지막 질문이면 완료 처리
          nextQuestion();
        }
        autoTransitionTimer.current = null;
      }, delay);
    }
  };
  
  useEffect(() => {
    if (isCompleted) {
      const testResult = calculateResult();
      setResult(testResult);
    }
  }, [isCompleted, calculateResult]);

  useEffect(() => {
    // 현재 질문에 대한 이미 선택한 답변이 있으면 선택된 상태로 보여줌
    if (question) {
      const answerScore = answers[currentQuestion];
      if (answerScore !== null) {
        const selectedOpt = question.options.find(opt => opt.score === answerScore);
        if (selectedOpt) {
          setSelectedOption(selectedOpt.id);
        } else {
          setSelectedOption(null);
        }
      } else {
        setSelectedOption(null);
      }
    }

    // 자동 전환 타이머 정리
    if (autoTransitionTimer.current) {
      clearTimeout(autoTransitionTimer.current);
      autoTransitionTimer.current = null;
    }
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (autoTransitionTimer.current) {
        clearTimeout(autoTransitionTimer.current);
        autoTransitionTimer.current = null;
      }
    };
  }, [currentQuestion, question, answers]);

  const handleOptionSelect = (optionId: number) => {
    // 이미 선택된 옵션을 다시 클릭한 경우에도 자동 전환 트리거
    // UI에서는 선택 상태를 유지하기 위해 상태 업데이트는 건너뜀
    if (selectedOption !== optionId) {
      setSelectedOption(optionId);
      selectAnswer(optionId);
    }
    
    setDirection("right");
    
    // 다음 질문으로 자동 전환
    if (currentQuestion < totalQuestions - 1) {
      console.log("다음 질문으로 즉시 전환");
      autoAdvance(0); // 즉시 전환
    } else {
      console.log("결과 화면으로 즉시 전환");
      autoAdvance(0); // 즉시 전환
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      // 자동 전환 타이머 제거
      if (autoTransitionTimer.current) {
        clearTimeout(autoTransitionTimer.current);
        autoTransitionTimer.current = null;
      }
      
      setDirection("left");
      prevQuestion();
    }
  };

  if (isCompleted && result) {
    return <TPowerResultCard result={result} onRestart={restart} />;
  }

  // 애니메이션 변수
  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-xl bg-white border border-gray-100"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-7">
        {/* 상단 헤더 영역 */}
        <div className="mb-6">
          {/* 질문 번호 및 진행률 표시 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-indigo-700">
              {currentQuestion + 1} / {totalQuestions}
            </span>
            <span className="text-md font-semibold text-indigo-700">{Math.round(progress)}%</span>
          </div>

          {/* 진행 바 (애니메이션 없음) */}
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 및 옵션 */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 leading-tight">
              Q{currentQuestion + 1}. {question?.text}
            </h2>
            
            <div className="space-y-4">
              {question?.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
                    selectedOption === option.id
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: option.id * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                      selectedOption === option.id
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300"
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className={`${selectedOption === option.id ? "text-indigo-700 font-medium" : "text-gray-700"} text-lg`}>
                      {option.text}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 하단 네비게이션 */}
        <div className="flex justify-between items-center">
          {/* 이전 버튼 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              variant="outline"
              className="px-5 py-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-lg"
            >
              이전으로
            </Button>
          </motion.div>

          {/* 진행 상태 인디케이터 - 더 가시성 높은 버전 */}
          <div className="flex items-center">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ 
                  scale: index === currentQuestion ? 1.2 : 1,
                  opacity: index === currentQuestion ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
                className={`w-2.5 h-2.5 mx-0.5 rounded-full ${
                  index < currentQuestion
                    ? "bg-indigo-500"
                    : index === currentQuestion
                    ? "bg-indigo-400 ring-2 ring-indigo-200"
                    : answers[index] !== null
                    ? "bg-indigo-200"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* 다음 버튼 제거, 빈 공간으로 대체하여 좌우 균형 유지 */}
          <div className="w-[89px]"></div>
        </div>
      </div>
    </motion.div>
  );
} 