"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { TestCard } from './test-card';
import { Fire } from 'lucide-react';

const defaultPopularTests = [
  {
    id: 'personal-color',
    title: '퍼스널 컬러 테스트',
    imageUrl: 'https://picsum.photos/seed/personal-color/640/360',
    participants: 15234,
    isPopular: true,
    isNew: false
  },
  {
    id: 'tarot-consultation',
    title: '타로 상담',
    imageUrl: 'https://picsum.photos/seed/tarot/640/360',
    participants: 8765,
    isPopular: true,
    isNew: true
  },
  {
    id: 'color-blindness',
    title: '색맹 테스트',
    imageUrl: 'https://picsum.photos/seed/colorblind/640/360',
    participants: 12543,
    isPopular: true,
    isNew: false
  }
];

export function PopularTests() {
  const { t } = useI18n();
  const [tests, setTests] = React.useState(defaultPopularTests);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPopularTests = async () => {
      try {
        setLoading(true);
        setTests(defaultPopularTests);
      } catch (error) {
        console.error('Error fetching popular tests:', error);
        setTests(defaultPopularTests);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTests();
  }, []);

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Fire className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-black text-gray-900">인기 테스트</h2>
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