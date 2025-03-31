"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttachmentQuestion } from "../constants/testData";
import { Heart, ChevronLeft } from "lucide-react";

interface AttachmentQuestionProps {
  question: AttachmentQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onSelectOption: (optionType: string) => void;
  onPrevious: () => void;
}

export function AttachmentQuestionComponent({
  question,
  currentQuestion,
  totalQuestions,
  onSelectOption,
  onPrevious,
}: AttachmentQuestionProps) {
  // 질문마다 다양한 이모지 표시
  const getQuestionEmoji = () => {
    const emojiList = ["💕", "❤️", "💭", "💌", "🫶", "😍", "🥰", "😘", "🤔", "😊", "🌈", "✨"];
    return emojiList[currentQuestion % emojiList.length];
  };

  // 다양한 배경 그라데이션 클래스
  const getBackgroundGradient = () => {
    const gradients = [
      "from-rose-100 to-pink-100",
      "from-purple-100 to-pink-100",
      "from-violet-100 to-indigo-100",
      "from-blue-100 to-cyan-100",
      "from-green-100 to-emerald-100"
    ];
    return gradients[currentQuestion % gradients.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-md mx-auto px-4"
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
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-sm font-medium bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full"
        >
          질문 {currentQuestion + 1} / {totalQuestions}
        </motion.div>
        <div className="w-10"></div> {/* 균형을 위한 더미 요소 */}
      </div>

      <div className="relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${getBackgroundGradient()} rounded-xl blur-sm opacity-60`}></div>
        
        <Card className="relative border-none p-6 shadow-lg bg-white">
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-start">
              <span className="text-4xl mr-3 animate-pulse">{getQuestionEmoji()}</span>
              <h3 className="text-xl font-bold text-gray-800 flex-1">{question.text}</h3>
            </div>
          </motion.div>

          <div className="space-y-3">
            <AnimatePresence>
              {question.choices.map((choice, index) => (
                <motion.div
                  key={`${currentQuestion}-${index}`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    onClick={() => onSelectOption(choice.type)}
                    className="w-full justify-start p-5 text-left bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 group transition-all duration-200"
                  >
                    <div className="flex items-center w-full">
                      <div className="h-7 w-7 min-w-7 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white flex items-center justify-center font-bold mr-3 group-hover:from-rose-500 group-hover:to-pink-500 transition-colors">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-800 group-hover:text-rose-600">
                        {choice.text}
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
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
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
        className="bg-pink-50 p-3 rounded-lg text-center text-sm text-pink-600"
      >
        {currentQuestion < 4 ? 
          "솔직하게 답변해주세요! 여러분의 진짜 연애 스타일을 알아볼 거예요 💘" : 
          currentQuestion < 8 ? 
          "절반 왔어요! 조금만 더 힘내세요. 당신의 애착 유형이 궁금하시죠? 🔍" : 
          "거의 다 왔어요! 곧 재미있는 결과를 확인할 수 있어요! ✨"}
      </motion.div>
    </motion.div>
  );
} 