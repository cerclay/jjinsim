"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { t } = useI18n();
  
  return (
    <section className="relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white -z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent -z-10" />
      
      {/* 메인 히어로 섹션 */}
      <div className="container mx-auto px-4 pt-12 pb-24 md:pt-24 md:pb-32 max-w-7xl">
        <div className="flex justify-center">
          {/* 콘텐츠 영역 */}
          <div className="max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center py-1 px-3 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 mr-1.5" />
                당신의 내면을 비추는 심리테스트
              </div>
              
              <h1 className="flex flex-col gap-2 md:gap-3 lg:gap-4 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
                <span className="leading-none">나를</span>
                <span className="leading-none">발견하는</span>
                <span className="leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500">
                  새로운 방법
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-6 md:mt-8">
                찐심과 함께라면 나의 숨겨진 모습, 잠재력, 그리고 진짜 모습을 발견할 수 있어요. 
                간단한 테스트로 놀라운 인사이트를 얻어보세요!
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/tests" 
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    테스트 시작하기
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    찐심 소개 보기
                  </Link>
                </motion.div>
              </div>
              
              {/* 통계 정보 */}
              <div className="flex flex-wrap gap-12 pt-12 justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-purple-600">100만+</span>
                  <span className="text-gray-600 text-lg">참여자</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-indigo-600">30+</span>
                  <span className="text-gray-600 text-lg">테스트</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-pink-600">95%</span>
                  <span className="text-gray-600 text-lg">만족도</span>
                </div>
              </div>
              
              {/* 장식 요소 */}
              <div className="absolute -z-10 top-1/4 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 bottom-1/4 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 