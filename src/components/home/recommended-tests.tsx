"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { TestCard } from './test-card';
import { ThumbsUp } from 'lucide-react';

const defaultRecommendedTests = [
  {
    id: 'mbti',
    title: 'MBTI 성격 유형 테스트',
    imageUrl: 'https://picsum.photos/seed/mbti/640/360',
    participants: 8765,
    isPopular: true,
    isNew: false
  },
  {
    id: 'love-language',
    title: '연애 스타일 테스트',
    imageUrl: 'https://picsum.photos/seed/love/640/360',
    participants: 7654,
    isPopular: true,
    isNew: false
  },
  {
    id: 'career-path',
    title: '직업 적성 테스트',
    imageUrl: 'https://picsum.photos/seed/career/640/360',
    participants: 6543,
    isPopular: true,
    isNew: false
  }
];

export function RecommendedTests() {
  const { t } = useI18n();
  const [tests, setTests] = React.useState(defaultRecommendedTests);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRecommendedTests = async () => {
      try {
        setLoading(true);
        // ... existing code ...
      } catch (error) {
        console.error('Error fetching recommended tests:', error);
        setTests(defaultRecommendedTests);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedTests();
  }, []);

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <ThumbsUp className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-black text-gray-900">추천 테스트</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          // 로딩 스켈레톤
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-[16/9] mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        ) : (
          tests.map((test, index) => (
            <TestCard
              key={test.id}
              {...test}
              index={index}
            />
          ))
        )}
      </div>
    </section>
  );
}

const recommendedTests = [
  {
    id: 'dog-compatibility',
    title: '당신과 찰떡궁합인 강아지는?',
    imageUrl: 'https://picsum.photos/seed/dog/640/360',
    participants: 8765,
  },
  {
    id: 'flirting-style',
    title: '당신의 썸 스타일 분석',
    imageUrl: 'https://picsum.photos/seed/flirt/640/360',
    participants: 7654,
  },
  {
    id: 'fortune',
    title: '오늘의 운세',
    imageUrl: 'https://picsum.photos/seed/fortune2/640/360',
    participants: 6543,
  }
]; 