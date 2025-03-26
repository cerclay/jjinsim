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
    <div className="max-w-[500px] mx-auto">
      <Link href={`/tests/${id}`} className={`block ${className}`}>
        <motion.div 
          className="relative w-full rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
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
              sizes="(max-width: 500px) 100vw, 500px"
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
          <div className="p-3 bg-white">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
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
            
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span>{participants.toLocaleString()}명 참여</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
} 