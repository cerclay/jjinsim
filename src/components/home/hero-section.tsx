"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export function HeroSection() {
  // 애니메이션 효과를 위한 변수 설정
  const imageVariants = {
    initial: { scale: 1.05, filter: "blur(2px)" },
    animate: { 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.5,
        ease: "easeOut" 
      } 
    }
  };
  
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        delay: 0.5,
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div 
      className="px-4 py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/tests/love-test">
        <motion.div 
          className="relative w-full rounded-xl overflow-hidden aspect-[5/3] shadow-xl"
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          {/* 배경 이미지 */}
          <motion.div
            className="absolute inset-0"
            variants={imageVariants}
            initial="initial"
            animate="animate"
          >
            <Image 
              src="/images/pug-dog.jpg"
              alt="연애 스타일 테스트" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </motion.div>
          
          {/* 그라데이션 오버레이 효과 */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/30 via-red-500/20 to-black/70" />
          
          {/* 텍스트 콘텐츠 */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-end p-5"
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-white font-extrabold text-3xl drop-shadow-lg">당신의 연애 스타일은?</h2>
            <p className="text-white/90 text-sm mt-1 drop-shadow-md">당신의 사랑 방식을 알아보세요</p>
            
            <div className="mt-3">
              <motion.span 
                className="inline-block bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                테스트 시작하기
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </Link>
      
      {/* 검색창 */}
      <motion.div 
        className="relative mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="relative bg-white shadow-lg rounded-full p-1 border border-gray-100">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="원하는 테스트를 검색해보세요" 
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 py-2 px-4 rounded-full focus:outline-none text-sm"
              aria-label="검색"
            />
            <motion.button 
              type="button"
              className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-2 ml-1 transition-colors duration-200"
              aria-label="검색하기"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 