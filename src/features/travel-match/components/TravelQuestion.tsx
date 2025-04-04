"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TravelQuestionProps {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestions: number;
  onSelectOption: (optionIndex: number) => void;
  onPrevious: () => void;
}

export function TravelQuestion({
  question,
  options,
  currentQuestion,
  totalQuestions,
  onSelectOption,
  onPrevious,
}: TravelQuestionProps) {
  // 모바일 최적화를 위한 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  // 진행률 계산
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <motion.div 
      className="space-y-6 bg-white rounded-lg shadow-md p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{currentQuestion + 1} / {totalQuestions}</span>
          <span className="font-bold">{Math.floor(progressPercentage)}%</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-gray-100" />
        
        <h2 className="text-xl font-bold mt-6 text-center text-gray-800">{question}</h2>
      </div>

      <div className="space-y-3 mt-6">
        {options.map((option, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => onSelectOption(index)}
              className="w-full py-4 px-6 rounded-lg text-left justify-start
                       hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200
                       transition-all bg-white border border-gray-200 text-gray-700 min-h-16"
              variant="outline"
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      {currentQuestion > 0 && (
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onPrevious}
            variant="ghost" 
            className="text-gray-500 hover:text-gray-800"
          >
            이전 질문으로
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
} 