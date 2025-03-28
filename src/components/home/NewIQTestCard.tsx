'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewIQTestCard() {
  return (
    <Link href="/tests/iq-test" className="block">
      <motion.div 
        className="relative w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-40">
          <Image 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ" 
            alt="IQ 테스트"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* 뱃지 */}
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 text-gray-900">나의 진짜 IQ테스트 - 유머버전</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은?
          </p>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>8,752명 참여</span>
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>3분 소요</span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 