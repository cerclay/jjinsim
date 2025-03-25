"use client";

import React from 'react';
import Link from 'next/link';
import { TestCard } from '@/components/home/test-card';
import { motion } from 'framer-motion';

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
  tests: Test[];
  viewAllLink?: string;
  className?: string;
}

export function TestSection({ title, tests, viewAllLink, className = '' }: TestSectionProps) {
  // 처음 5개 테스트만 표시
  const displayedTests = tests.slice(0, 5);
  
  return (
    <div className={`py-2 ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              더보기
            </Link>
          )}
        </div>
      )}
      
      <div className="space-y-4 px-4">
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
      
      {viewAllLink && (
        <div className="px-4 mt-4">
          <Link 
            href={viewAllLink}
            className="block w-full text-center py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            모든 테스트 보기
          </Link>
        </div>
      )}
    </div>
  );
} 