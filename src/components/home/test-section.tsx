"use client";

import React from 'react';
import Link from 'next/link';
import { TestCard } from '@/components/home/test-card';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Test {
  id: string;
  title: string;
  imageUrl: string;
  participants: number;
  isPopular?: boolean;
  isNew?: boolean;
  isBookmarked?: boolean;
}

interface TestSectionProps {
  title: string;
  description?: string;
  tests: Test[];
  viewAllLink?: string;
  seeMoreHref?: string;
  className?: string;
}

export function TestSection({ 
  title, 
  description, 
  tests, 
  viewAllLink, 
  seeMoreHref, 
  className = '' 
}: TestSectionProps) {
  // 처음 5개 테스트만 표시
  const displayedTests = tests.slice(0, 5);
  
  // viewAllLink 또는 seeMoreHref 중 하나를 사용 (seeMoreHref 우선)
  const moreLink = seeMoreHref || viewAllLink;
  
  return (
    <div className={`py-4 ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800 relative">
              {title}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
            </h2>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {moreLink && (
            <Link href={moreLink} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              더보기
              <ChevronRight size={14} className="ml-0.5" />
            </Link>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {displayedTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TestCard 
              id={test.id}
              title={test.title}
              imageUrl={test.imageUrl}
              participants={test.participants}
              isPopular={test.isPopular}
              isNew={test.isNew}
              isBookmarked={test.isBookmarked}
            />
          </motion.div>
        ))}
      </div>
      
      {moreLink && (
        <motion.div 
          className="mt-4"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            href={moreLink}
            className="block w-full text-center py-2.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm font-medium text-indigo-700 transition-colors flex items-center justify-center"
          >
            {title} 전체보기
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </motion.div>
      )}
    </div>
  );
} 