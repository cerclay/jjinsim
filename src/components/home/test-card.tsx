"use client";

import React, { useState } from 'react';
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
  index?: number;
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
  index = 0,
}: TestCardProps) {
  const { t } = useI18n();
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = `https://picsum.photos/seed/${id}/640/360`;
  
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
      'boomer-test': '/tests/boomer-test',
      'stress-check': '/tests/stress-check',
      'mbti': '/tests/mbti',
      'flirting-style': '/tests/flirting-style',
      'pet-match': '/tests/pet-match',
      // 다른 테스트 경로들 추가...
    };

    return testPathMap[id] || `/tests/${id}`;
  };

  return (
    <div className="max-w-[500px] mx-auto w-full">
      <Link href={getTestPath(id)} className={`block ${className}`}>
        <motion.div 
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 썸네일 이미지 (16:9 비율) */}
          <div className="relative aspect-video w-full">
            <Image 
              src={imageError ? fallbackImageUrl : imageUrl} 
              alt={`${title} 테스트 이미지`}
              fill 
              className="object-cover"
              sizes="500px"
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
              onError={() => setImageError(true)}
            />
            
            {/* 배지 표시 */}
            <div className="absolute bottom-2 right-2 z-10 flex gap-2">
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

            {/* 재생 시간 스타일의 참여자 수 */}
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {formatCount(participants)}명 참여
            </div>
          </div>

          {/* 컨텐츠 정보 */}
          <div className="p-3 bg-white">
            <div className="flex items-start gap-3">
              {/* 북마크 아이콘 */}
              <motion.button 
                className="flex-shrink-0 mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  // 북마크 토글 기능
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark 
                  size={18} 
                  className={isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"} 
                />
              </motion.button>

              {/* 제목과 메타 정보 */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-[15px] leading-snug line-clamp-2">
                  {title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{formatCount(participants)}명</span>
                  </span>
                  
                  {likes > 0 && (
                    <span className="flex items-center">
                      <Heart size={12} className="mr-1 text-red-400" fill="#f87171" />
                      <span>{formatCount(likes)}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

export type { TestCardProps }; 