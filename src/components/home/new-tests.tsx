"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { TestCard } from './test-card';
import { Sparkles } from 'lucide-react';

const defaultNewTests = [
  {
    id: 'stress-check',
    title: '스트레스 지수 체크',
    imageUrl: 'https://picsum.photos/seed/stress/640/360',
    participants: 1234,
    isPopular: false,
    isNew: true
  },
  {
    id: 'past-life-character',
    title: '나의 전생 캐릭터',
    imageUrl: 'https://picsum.photos/seed/past-life/640/360',
    participants: 2345,
    isPopular: false,
    isNew: true
  },
  {
    id: 'marriage-type',
    title: '나의 결혼 이상형',
    imageUrl: 'https://picsum.photos/seed/marriage/640/360',
    participants: 3456,
    isPopular: false,
    isNew: true
  }
];

export function NewTests() {
  const { t } = useI18n();
  const [tests, setTests] = React.useState(defaultNewTests);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNewTests = async () => {
      try {
        setLoading(true);
        // ... existing code ...
      } catch (error) {
        console.error('Error fetching new tests:', error);
        setTests(defaultNewTests);
      } finally {
        setLoading(false);
      }
    };

    fetchNewTests();
  }, []);

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-black text-gray-900">최신 테스트</h2>
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