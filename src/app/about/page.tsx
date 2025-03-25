"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Users, Brain } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pt-6">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* 헤더 섹션 */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold gradient-text">찐심 소개</h1>
            <p className="text-sm text-gray-600">당신의 내면을 비추는 심리테스트 플랫폼</p>
          </div>

          {/* 메인 이미지 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img 
              src="https://picsum.photos/id/1065/600/400" 
              alt="찐심 서비스 이미지" 
              className="w-full h-48 object-cover"
            />
          </motion.div>

          {/* 서비스 소개 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-lg p-5 shadow-sm space-y-5"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-indigo-500" />
                찐심이란?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                찐심은 '진정한 마음'을 뜻하는 이름처럼 여러분의 진짜 내면을 발견할 수 있는 심리테스트 플랫폼입니다. 
                다양한 심리 테스트를 통해 자신을 더 깊이 이해하고, 다른 사람들과의 관계에서도 더 나은 소통을 할 수 있는 
                통찰력을 제공합니다.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-indigo-500" />
                주요 서비스
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-indigo-600">1</span>
                  </span>
                  <span>
                    <span className="font-medium">다양한 심리 테스트:</span> 퍼스널 컬러, MBTI, 색맹, 애착 유형 등 다양한 심리 테스트를 제공합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-indigo-600">2</span>
                  </span>
                  <span>
                    <span className="font-medium">상세한 결과 분석:</span> 테스트 결과에 대한 심층적인 분석과 해석을 제공합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-indigo-600">3</span>
                  </span>
                  <span>
                    <span className="font-medium">결과 공유 기능:</span> 테스트 결과를 친구들과 쉽게 공유할 수 있습니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-indigo-600">4</span>
                  </span>
                  <span>
                    <span className="font-medium">맞춤형 추천:</span> 사용자의 성향에 맞는 테스트를 추천해 드립니다.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-500" />
                찐심의 비전
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                찐심은 단순한 심리 테스트를 넘어 자기 성장과 더 나은 인간관계를 위한 통찰력을 제공하고자 합니다. 
                우리는 모든 사람이 자신의 내면을 이해하고 더 나은 삶을 살아갈 수 있도록 돕는 것을 목표로 합니다.
              </p>
            </div>
          </motion.div>

          {/* 테스트 시작하기 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center"
          >
            <Link href="/" className="inline-flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all">
              테스트 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          {/* 팀 소개 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-lg p-5 shadow-sm space-y-3"
          >
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-indigo-500" />
              만든 사람들
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              찐심은 심리학, 디자인, 개발 등 다양한 분야의 전문가들이 모여 만든 서비스입니다.
              우리는 사용자들이 자신의 내면을 더 깊이 이해하고 성장할 수 있도록 지속적으로 
              새로운 테스트와 기능을 개발하고 있습니다.
            </p>
          </motion.div>

          {/* 푸터 */}
          <div className="text-center text-xs text-gray-500 py-4">
            © 2024 찐심(JJinSim). All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
} 