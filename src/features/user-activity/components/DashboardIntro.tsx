"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Rocket, LineChart, Award, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardIntroProps {
  username: string;
}

export function DashboardIntro({ username }: DashboardIntroProps) {
  // 애니메이션 변수
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const iconItem = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1 }
  };
  
  return (
    <Card className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-0 shadow-sm overflow-hidden mb-4 sm:mb-6">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 -mt-6 sm:-mt-10 -mr-6 sm:-mr-10 bg-purple-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 -mb-8 sm:-mb-12 -ml-8 sm:-ml-12 bg-indigo-200 rounded-full opacity-20"></div>
      
      <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-xl"
          >
            <motion.h2 variants={item} className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
              안녕하세요, <span className="text-purple-600">{username || '방문자'}</span>님!
            </motion.h2>
            
            <motion.p variants={item} className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
              대시보드에서 내 테스트 결과를 확인하고 나의 테스트 성향을 알아보세요. 
              새로운 인사이트를 발견하고 더 많은 테스트에 도전해보세요!
            </motion.p>
            
            <motion.div 
              variants={container} 
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-5"
            >
              <motion.div variants={item} className="flex items-start text-xs sm:text-sm text-gray-600 bg-white/50 p-2 sm:p-2.5 rounded-lg">
                <motion.span 
                  variants={iconItem}
                  className="flex-shrink-0 bg-blue-100 p-1 sm:p-1.5 rounded-md text-blue-600 mr-2"
                >
                  <LineChart className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.span>
                <span className="leading-tight">내 테스트 경향과 패턴을 분석해 드려요</span>
              </motion.div>
              
              <motion.div variants={item} className="flex items-start text-xs sm:text-sm text-gray-600 bg-white/50 p-2 sm:p-2.5 rounded-lg">
                <motion.span 
                  variants={iconItem}
                  className="flex-shrink-0 bg-purple-100 p-1 sm:p-1.5 rounded-md text-purple-600 mr-2"
                >
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.span>
                <span className="leading-tight">테스트를 완료하면 뱃지와 보상을 획득해요</span>
              </motion.div>
              
              <motion.div variants={item} className="hidden sm:flex items-start text-xs sm:text-sm text-gray-600 bg-white/50 p-2 sm:p-2.5 rounded-lg">
                <motion.span 
                  variants={iconItem}
                  className="flex-shrink-0 bg-pink-100 p-1 sm:p-1.5 rounded-md text-pink-600 mr-2"
                >
                  <Rocket className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.span>
                <span className="leading-tight">더 많은 테스트로 자기 이해의 여정을 시작하세요</span>
              </motion.div>
              
              <motion.div variants={item} className="hidden sm:flex items-start text-xs sm:text-sm text-gray-600 bg-white/50 p-2 sm:p-2.5 rounded-lg">
                <motion.span 
                  variants={iconItem}
                  className="flex-shrink-0 bg-amber-100 p-1 sm:p-1.5 rounded-md text-amber-600 mr-2"
                >
                  <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.span>
                <span className="leading-tight">나에 대한 새로운 발견이 기다리고 있어요</span>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item} className="mt-3 sm:mt-4">
              <Link href="/tests">
                <Button variant="default" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all text-xs sm:text-sm h-8 sm:h-9">
                  더 많은 테스트 시작하기
                  <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -10, 0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 sm:p-5 rounded-full shadow-lg"
              >
                <Sparkles className="h-10 w-10 sm:h-16 sm:w-16 text-white" />
              </motion.div>
              
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-pink-500 p-1.5 sm:p-2 rounded-full shadow-md"
              >
                <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
} 