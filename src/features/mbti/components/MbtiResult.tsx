"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MbtiResultProps {
  result: string;
  resultData: {
    mbti: string;
    title: string;
    description: string;
    tags: string[];
  } | null;
  onRestart: () => void;
}

export function MbtiResult({ result, resultData, onRestart }: MbtiResultProps) {
  const emojis: Record<string, string> = {
    'ISTJ': '📋',
    'ISFJ': '🤲',
    'INFJ': '🔮',
    'INTJ': '🧠',
    'ISTP': '🔧',
    'ISFP': '🎨',
    'INFP': '🦄',
    'INTP': '💡',
    'ESTP': '🏄',
    'ESFP': '🎭',
    'ENFP': '✨',
    'ENTP': '🎯',
    'ESTJ': '👔',
    'ESFJ': '🎁',
    'ENFJ': '🌟',
    'ENTJ': '👑'
  };

  const emoji = result ? emojis[result] || '🎉' : '🎉';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-200 to-orange-200 rounded-2xl blur opacity-30"></div>
        <Card className="overflow-hidden border-none shadow-xl rounded-xl relative">
          <div className="absolute top-4 right-4 z-20">
            <div className="text-4xl animate-bounce">{emoji}</div>
          </div>
          <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 p-6 text-white text-center">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl font-extrabold mb-2 drop-shadow-sm"
            >
              {resultData?.title || `당신의 MBTI는 ${result}입니다!`}
            </motion.h2>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="flex flex-wrap justify-center gap-2 mt-3"
            >
              {resultData?.tags.map((tag: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  className="bg-white/20 rounded-full px-3 py-1.5 text-sm font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <div className="p-5 bg-white relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-white/20 rounded-full"></div>
            <p className="text-base mb-5 text-gray-800 leading-relaxed border-l-4 border-rose-300 pl-3 my-4 italic">{resultData?.description}</p>
            <Button onClick={onRestart} className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-lg py-6 font-bold">
              테스트 다시 도전하기! 🔄
            </Button>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative"
      >
        <Card className="p-5 border-none shadow-md rounded-xl bg-white overflow-hidden">
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <span className="mr-2 text-2xl">📊</span> 
            <span className="text-black font-extrabold">MBTI 유형 분석</span>
          </h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-sm text-gray-800 flex items-center">
                  <span className="text-lg mr-1">🔋</span> 에너지 방향
                </h4>
                <div className="flex gap-2">
                  <span className={result.startsWith('E') ? 'text-rose-600 font-bold text-xs' : 'text-gray-600 text-xs'}>외향형(E)</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className={result.startsWith('I') ? 'text-orange-600 font-bold text-xs' : 'text-gray-600 text-xs'}>내향형(I)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.startsWith('E') ? '75%' : '25%' }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full bg-rose-500 rounded-l"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.startsWith('I') ? '75%' : '25%' }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full bg-orange-500 rounded-r"
                  ></motion.div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-sm text-gray-800 flex items-center">
                  <span className="text-lg mr-1">👁️</span> 인식 기능
                </h4>
                <div className="flex gap-2">
                  <span className={result.includes('S') ? 'text-rose-600 font-bold text-xs' : 'text-gray-600 text-xs'}>감각형(S)</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className={result.includes('N') ? 'text-orange-600 font-bold text-xs' : 'text-gray-600 text-xs'}>직관형(N)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.includes('S') ? '75%' : '25%' }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full bg-rose-500 rounded-l"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.includes('N') ? '75%' : '25%' }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full bg-orange-500 rounded-r"
                  ></motion.div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-sm text-gray-800 flex items-center">
                  <span className="text-lg mr-1">🧩</span> 판단 기능
                </h4>
                <div className="flex gap-2">
                  <span className={result.includes('T') ? 'text-rose-600 font-bold text-xs' : 'text-gray-600 text-xs'}>사고형(T)</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className={result.includes('F') ? 'text-orange-600 font-bold text-xs' : 'text-gray-600 text-xs'}>감정형(F)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.includes('T') ? '75%' : '25%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="h-full bg-rose-500 rounded-l"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.includes('F') ? '75%' : '25%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="h-full bg-orange-500 rounded-r"
                  ></motion.div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-sm text-gray-800 flex items-center">
                  <span className="text-lg mr-1">🧭</span> 생활 양식
                </h4>
                <div className="flex gap-2">
                  <span className={result.endsWith('J') ? 'text-rose-600 font-bold text-xs' : 'text-gray-600 text-xs'}>판단형(J)</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className={result.endsWith('P') ? 'text-orange-600 font-bold text-xs' : 'text-gray-600 text-xs'}>인식형(P)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.endsWith('J') ? '75%' : '25%' }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="h-full bg-rose-500 rounded-l"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: result.endsWith('P') ? '75%' : '25%' }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="h-full bg-orange-500 rounded-r"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 p-3 bg-rose-50 rounded-lg text-center"
          >
            <p className="text-sm text-rose-700">
              당신의 MBTI 성향은 친구들과 비교해보세요! 🔍
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
} 