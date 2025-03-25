"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bookmark, Check } from 'lucide-react';

export function ColorBlindnessCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/tests/color-blindness');
  };

  // 애니메이션 효과 - 더 확실한 호버 효과
  const cardVariants = {
    initial: { scale: 1, y: 0, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: { 
      scale: 1.08, 
      y: -12,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full rounded-xl overflow-hidden shadow-lg"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      style={{ aspectRatio: '5/3' }}
    >
      {/* 색맹 테스트 이미지 */}
      <Image 
        src="/images/색맹테스트.jpg?v=1" 
        alt="색맹테스트 - 컬러 테스트"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        priority
      />
      
      {/* 그라데이션 오버레이 - 보라색 필터 제거 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      
      {/* 새로운 테스트 배지 */}
      <div className="absolute top-3 left-3 z-10">
        <motion.div 
          className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          NEW
        </motion.div>
      </div>
      
      {/* 북마크 버튼 */}
      <motion.button 
        className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white shadow-md"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bookmark size={18} />
      </motion.button>
      
      {/* 하단 텍스트 및 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <motion.h3 
          className="text-white font-bold text-xl mb-1 drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          색맹 테스트
        </motion.h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.span 
              className="text-white/90 text-xs mr-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              참여자 157,842명
            </motion.span>
            
            <motion.div 
              className="flex items-center text-white/90 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Check size={12} className="mr-1" />
              <span>평균 3분</span>
            </motion.div>
          </div>
          
          <motion.span 
            className="inline-block bg-white/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-transparent hover:border-orange-500 transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            테스트 하기
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
} 