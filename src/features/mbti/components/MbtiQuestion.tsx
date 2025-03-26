"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MbtiQuestionProps {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestions: number;
  onSelectOption: (optionIndex: number) => void;
  onPrevious: () => void;
}

export function MbtiQuestion({
  question,
  options,
  currentQuestion,
  totalQuestions,
  onSelectOption,
  onPrevious,
}: MbtiQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-[500px] mx-auto"
    >
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="text-rose-600 hover:bg-rose-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium text-gray-800">
          질문 {currentQuestion + 1} / {totalQuestions}
        </div>
        <div className="w-10 h-10"></div> {/* Placeholder for layout balance */}
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-200 to-orange-200 rounded-2xl blur opacity-30"></div>
        <Card className="p-5 border-none shadow-lg relative bg-white">
          <div className="absolute top-3 right-3 text-2xl animate-pulse">
            {currentQuestion % 4 === 0 ? "🧠" : 
             currentQuestion % 4 === 1 ? "🤔" : 
             currentQuestion % 4 === 2 ? "❓" : "💭"}
          </div>
          
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-black">
              {question}
            </h3>
          </motion.div>

          <div className="space-y-3 mt-2">
            <AnimatePresence>
              {options.map((option, index) => (
                <motion.div 
                  key={`${currentQuestion}-${index}`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => onSelectOption(index)}
                    className="w-full justify-start p-5 text-left bg-white hover:bg-rose-50 hover:border-rose-300 group transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 text-white flex items-center justify-center font-bold mr-3 text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 font-medium group-hover:text-rose-700 transition-colors">
                        {option}
                      </span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
          ></motion.div>
        </div>
        <div className="mt-2 text-xs text-center text-gray-600">
          테스트 진행률: {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-rose-50 p-3 rounded-lg text-center text-sm text-rose-700"
      >
        {currentQuestion < 5 ? 
          "천천히 생각하고 답변해 보세요! 솔직한 답변이 중요합니다. 💭" : 
          currentQuestion < 10 ? 
          "중간까지 왔어요! 조금만 더 화이팅! 🔥" : 
          "거의 다 왔어요! 곧 결과를 확인할 수 있어요! ✨"}
      </motion.div>
    </motion.div>
  );
} 