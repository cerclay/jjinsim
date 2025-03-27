"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { Badge } from '@/components/ui/badge';

interface TestCardProps {
  id: string;
  title: string;
  imageUrl: string;
  participants: number;
  likes?: number;
  isBookmarked?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  className?: string;
}

export function TestCard({
  id,
  title,
  imageUrl,
  participants = 0,
  likes = 0,
  isBookmarked = false,
  isNew = false,
  isPopular = false,
  className = '',
}: TestCardProps) {
  const { t } = useI18n();
  
  // 참여자 수 포맷
  const formatCount = (count: number) => {
    if (count === 0) return "0";
    if (count >= 10000) return `${Math.floor(count / 10000)}만+`;
    if (count >= 1000) return `${Math.floor(count / 1000)}천+`;
    return count.toLocaleString();
  };
  
  // 테스트 ID에 따라 적절한 경로 설정
  const getTestPath = (id: string) => {
    // IQ 테스트인 경우 특별한 경로 사용
    if (id === 'iq-test') {
      return '/tests/iq-test';
    }
    
    // 다른 테스트들의 경로 패턴
    const testPathMap: Record<string, string> = {
      'stress-check': '/tests/stress-check',
      'mbti': '/tests/mbti',
      // 다른 테스트 경로들 추가...
    };

    return testPathMap[id] || `/tests/${id}`;
  };

  return (
    <div className={`h-full ${className}`}>
      <Link href={getTestPath(id)} className="block h-full">
        <motion.div 
          className="relative w-full rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 썸네일 이미지 */}
          <div className="relative aspect-video">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
            />
            
            {/* 배지 표시 */}
            {(isNew || isPopular) && (
              <div className="absolute bottom-3 right-3 z-10 flex gap-2">
                {isNew && (
                  <motion.div 
                    className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {t.card_new}
                  </motion.div>
                )}
                {isPopular && (
                  <motion.div 
                    className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {t.card_popular}
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* 컨텐츠 정보 */}
          <div className="p-3 bg-white flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base tracking-tight leading-snug">
                {title}
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
                <Bookmark 
                  size={16} 
                  className={isBookmarked ? "fill-indigo-500 text-indigo-500" : ""} 
                />
              </motion.button>
            </div>
            
            <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Users size={14} className="mr-1" />
                <span className="font-medium">{formatCount(participants)}</span><span className="ml-0.5">명</span>
              </span>
              
              {likes > 0 && (
                <span className="flex items-center">
                  <Heart size={12} className="mr-1 text-red-400" fill="#f87171" />
                  <span className="font-medium">{formatCount(likes)}</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
} 