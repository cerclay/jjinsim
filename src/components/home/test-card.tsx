"use client";

import React, { useState } from 'react';
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
  index?: number;
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
  index = 0,
}: TestCardProps) {
  const { t } = useI18n();
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = `https://picsum.photos/seed/${id}/640/360`;
  
  return (
    <div className="max-w-[500px] mx-auto w-full">
      <Link href={`/tests/${id}`} className={`block ${className}`}>
        <motion.div 
          className="bg-white rounded-lg overflow-hidden"
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
              {participants >= 10000 
                ? `${(participants / 10000).toFixed(1)}만명`
                : `${participants.toLocaleString()}명`} 참여
            </div>
          </div>

          {/* 컨텐츠 정보 */}
          <div className="p-3">
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

              {/* 제목과 참여자 수 */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-[15px] leading-snug line-clamp-2">
                  {title}
                </h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>지금 테스트하기</span>
                  <span className="mx-1">•</span>
                  <span>{participants.toLocaleString()}명 참여</span>
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
export { TestCard }; 