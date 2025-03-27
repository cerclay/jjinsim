'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function StressCheckCard() {
  return (
    <div className="h-full">
      <Link href="/stress-check" className="block h-full">
        <motion.div 
          className="relative w-full rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 썸네일 이미지 */}
          <div className="relative aspect-video">
            <Image 
              src="https://blogger.googleusercontent.com/img/a/AVvXsEjugZz1t1M1h_2aXzumcj-afULGj_5KndsXnxRKHRgyIzBNefPl5XAwFstHLvgK2xB0GXoJEswTWjwG1JDEs7ZzR0PSqek1-0SpybstGU8STmYCBQYfTm_l3sKIuxIq-j1mTGCOTa2UzWEwldmgAm7Gw0U3Ey8NRfIQjIg6ElkmYm76Sy01Yxi15qWYSwA" 
              alt="스트레스 지수 체크" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
            />
            
            {/* 배지 표시 */}
            <div className="absolute bottom-3 right-3 z-10 flex gap-2">
              <motion.div 
                className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                신규
              </motion.div>
              <motion.div 
                className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                추천
              </motion.div>
            </div>
          </div>

          {/* 컨텐츠 정보 */}
          <div className="p-3 bg-white flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base tracking-tight leading-snug">
                스트레스 지수 체크 - <span className="text-purple-700">나 지금 멘탈 몇 % 남았지?</span>
              </h3>
              <motion.button 
                className="flex-shrink-0 text-gray-700 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  // 북마크 토글 기능
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark size={16} />
              </motion.button>
            </div>
            
            <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium text-purple-700">New!</span>
              </span>
              
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">1분</span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
} 