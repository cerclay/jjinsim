"use client";

import React from 'react';
import { motion } from 'framer-motion';

type Choice = {
  text: string;
  type: string;
};

type Question = {
  id: number;
  text: string;
  choices: Choice[];
};

type TestQuestionSectionProps = {
  question: Question;
  currentStep: number;
  totalQuestions: number;
  onSelectAnswer: (questionId: number, selectedType: string) => void;
  isAnimating: boolean;
};

export const TestQuestionSection = ({
  question,
  currentStep,
  totalQuestions,
  onSelectAnswer,
  isAnimating,
}: TestQuestionSectionProps) => {
  // 프로그레스 퍼센트 계산
  const progressPercent = ((currentStep - 1) / totalQuestions) * 100;

  return (
    <div className="max-w-md mx-auto">
      {/* 프로그레스 바 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>질문 {currentStep} / {totalQuestions}</span>
          <span>{Math.round(progressPercent)}% 완료</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-600"
            initial={{ width: `${((currentStep - 2) / totalQuestions) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 질문 */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {question.text}
        </h2>
      </motion.div>

      {/* 선택지 */}
      <div className="space-y-4">
        {question.choices.map((choice, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            <button
              className="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 text-left"
              onClick={() => !isAnimating && onSelectAnswer(question.id, choice.type)}
              disabled={isAnimating}
            >
              <p className="text-gray-800 font-medium">{choice.text}</p>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 