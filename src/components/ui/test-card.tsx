"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, Clock } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface TestCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  participants?: number;
  likes?: number;
  isNew?: boolean;
  isPopular?: boolean;
  duration?: string;
  category?: string;
}

export default function TestCard({
  id,
  title,
  description,
  thumbnailUrl,
  participants = 0,
  likes = 0,
  isNew = false,
  isPopular = false,
  duration = "3분",
  category
}: TestCardProps) {
  const { t } = useI18n();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <Link href={`/tests/${id}`} className="flex flex-col h-full">
        {/* 썸네일 이미지 영역 */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
          
          {/* 테스트 소요 시간 */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock size={12} className="mr-1" />
            {duration}
          </div>
          
          {/* NEW / HOT 레이블 */}
          {(isNew || isPopular) && (
            <div className="absolute top-2 left-2 flex gap-1">
              {isNew && (
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
              {isPopular && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  HOT
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* 콘텐츠 영역 */}
        <div className="flex flex-col flex-grow p-3">
          {/* 제목 */}
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm sm:text-base">
            {title}
          </h3>
          
          {/* 설명 */}
          {description && (
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2">
              {description}
            </p>
          )}
          
          {/* 하단 정보 */}
          <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>{participants.toLocaleString()}명</span>
            </div>
            
            <div className="flex items-center">
              <Heart size={14} className="mr-1 text-red-500" />
              <span>{likes.toLocaleString()}</span>
            </div>
            
            {category && (
              <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5">
                {category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 