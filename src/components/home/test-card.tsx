"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

interface TestCardProps {
  id: string;
  title: string;
  imageUrl: string;
  participants: number;
  isBookmarked?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  className?: string;
}

export function TestCard({
  id,
  title,
  imageUrl,
  participants,
  isBookmarked = false,
  isNew = false,
  isPopular = false,
  className = '',
}: TestCardProps) {
  const { t } = useI18n();
  
  return (
    <Link href={`/tests/${id}`} className={`block ${className}`}>
      <motion.div 
        className="relative w-full rounded-xl overflow-hidden shadow-md outline outline-0 outline-offset-0 outline-purple-400 transition-all duration-300"
        whileHover={{ 
          scale: 1.05, 
          y: -3,
          outline: '3px solid',
          outlineOffset: '2px',
          boxShadow: '0 15px 30px -5px rgba(147, 51, 234, 0.25), 0 0 15px 2px rgba(147, 51, 234, 0.15)'
        }}
        whileTap={{ scale: 0.97 }}
        style={{ aspectRatio: '5/3' }}
      >
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
          loading="lazy"
        />
        
        {/* 그라데이션 오버레이 - 보라색 하이라이트 효과 추가 */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" 
          whileHover={{
            background: "linear-gradient(to bottom, rgba(147, 51, 234, 0.1), rgba(0, 0, 0, 0.7))"
          }}
        />
        
        {/* 배지 표시 */}
        {(isNew || isPopular) && (
          <div className="absolute top-3 left-3 z-10">
            <motion.div 
              className={`${isNew ? 'bg-blue-500' : 'bg-amber-500'} text-white text-xs font-bold px-3 py-1 rounded-md`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {isNew ? t.card_new : t.card_popular}
            </motion.div>
          </div>
        )}
        
        {/* 북마크 버튼 - 효과 개선 */}
        <motion.button 
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white shadow-md"
          onClick={(e) => {
            e.preventDefault();
            // 북마크 토글 기능
          }}
          whileHover={{ 
            scale: 1.2,
            boxShadow: '0 0 10px 2px rgba(147, 51, 234, 0.3)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark 
            size={18} 
            className={isBookmarked ? "fill-indigo-500 text-indigo-500" : ""} 
          />
        </motion.button>
        
        {/* 하단 텍스트 및 정보 */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
          <h3 className="text-white font-bold text-xl drop-shadow-md">{title}</h3>
          <p className="text-white/90 text-sm mt-1 flex items-center drop-shadow-md">
            <span className="inline-block w-2 h-2 bg-white/80 rounded-full mr-2"></span>
            {participants.toLocaleString()}{t.card_participants}
          </p>
          
          <motion.span 
            className="mt-3 inline-block bg-white/30 text-white px-4 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm border border-white/20 shadow-md"
            whileHover={{ 
              scale: 1.12, 
              backgroundColor: 'rgba(147, 51, 234, 0.4)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), 0 0 10px rgba(147, 51, 234, 0.3)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t.card_start_test}
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
} 