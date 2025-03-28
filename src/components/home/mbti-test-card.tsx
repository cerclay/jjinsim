"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const MbtiTestCard = () => {
  return (
    <Link href="/mbti" className="block">
      <motion.div 
        className="rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-violet-500 to-purple-600"
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-6 text-white relative">
          <div className="w-64 h-64 rounded-full bg-white opacity-5 absolute -top-32 -right-32"></div>
          <div className="w-48 h-48 rounded-full bg-white opacity-5 absolute -bottom-24 -left-24"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">스무고개 MBTI 테스트</h3>
            <p className="text-white/90 text-sm mb-4">
              단 20문항으로, 한국 커뮤니티 감성 듬뿍 담아 내 성격을 '정확(…할 수도?)'하게 알아봅시다!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span>5분</span>
                </div>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                테스트 시작하기
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}; 