"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, Star } from 'lucide-react';

const fortuneTypes = [
  {
    id: 'today',
    title: '오늘의 운세',
    description: '오늘 하루의 운세와 조언을 알려드려요',
    icon: Clock,
    color: 'bg-purple-600',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 via-indigo-50 to-white',
    emoji: '✨'
  },
  {
    id: 'year',
    title: '올해의 운세',
    description: '2025년의 전반적인 운세를 알려드려요',
    icon: Calendar,
    color: 'bg-blue-600',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 via-cyan-50 to-white',
    emoji: '🌈'
  },
  {
    id: 'life',
    title: '인생 운세',
    description: '당신의 인생 흐름과 방향을 알려드려요',
    icon: Star,
    color: 'bg-amber-600',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 via-orange-50 to-white',
    emoji: '🌟'
  }
];

export default function FortunePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-indigo-50 to-white px-4 py-8 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* 헤더 섹션 */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              운세 상담
            </h1>
            <motion.div
              initial={{ rotate: 10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
          </div>
          <p className="text-gray-600 text-lg mt-2 font-medium">
            AI가 분석하는 당신만의 특별한 운세
          </p>
          <div className="mt-4 max-w-sm mx-auto">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full" />
          </div>
        </motion.div>

        {/* 운세 타입 선택 */}
        <div className="space-y-6">
          {fortuneTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={`/tests/fortune-telling/${type.id}`} className="block">
                  <motion.div
                    className={`bg-gradient-to-r ${type.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100`}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className={`${type.color} rounded-xl p-3.5 text-white shadow-md`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className={`text-2xl font-bold ${type.textColor} flex items-center`}>
                          {type.title} <span className="ml-2">{type.emoji}</span>
                        </h3>
                        <p className="text-base text-gray-600 mt-1">{type.description}</p>
                      </div>
                      <motion.div 
                        className="ml-2"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    <div className={`mt-5 h-2 rounded-full bg-gradient-to-r ${type.gradient} shadow-inner opacity-80`} />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 하단 설명 */}
        <motion.div 
          className="mt-12 text-center text-base bg-white p-5 rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-700 font-medium">AI가 분석하는 운세는 재미로만 봐주세요 😊</p>
          <p className="mt-2 text-gray-500">중요한 결정은 신중하게 내려주세요!</p>
        </motion.div>
      </div>
    </div>
  );
} 