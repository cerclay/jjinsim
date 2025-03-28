import React from 'react';
import { Container } from '@/components/ui/container';
import { TestsContent } from '@/components/tests/tests-content';
import { TestThumbnail as IQHumorTestThumbnail } from '@/features/tests/iq-humor/components/TestThumbnail';

export const metadata = {
  title: '테스트 모음 | 찐심테스트',
  description: '다양한 심리 테스트와 MBTI 테스트를 즐겨보세요. 인기 테스트와 새로운 테스트를 한눈에!',
};

export default function TestsPage() {
  return (
    <Container>
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">테스트 모음</h1>
        <TestsContent />
      </div>
    </Container>
  );
} 