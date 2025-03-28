"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * 페이지 배경에 장식용 패턴을 표시하는 컴포넌트
 * 페이지의 시각적인 디자인 요소로 사용되며 컨텐츠에 영향을 주지 않습니다.
 */
export default function DesignPatternBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 물결 패턴 */}
      <svg
        className="absolute top-0 left-0 w-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#8B5CF6"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* 도트 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#8B5CF6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 애니메이션 요소 */}
      <motion.div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-200 filter blur-3xl opacity-20"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -left-16 top-1/3 w-72 h-72 rounded-full bg-blue-200 filter blur-3xl opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute left-1/4 bottom-1/4 w-56 h-56 rounded-full bg-pink-200 filter blur-3xl opacity-20"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
} 