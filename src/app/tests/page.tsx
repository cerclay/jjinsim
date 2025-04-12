import React from 'react';
import { Container } from '@/components/ui/container';
import { TestsContent } from '@/components/tests/tests-content';
import { metadata, viewport } from './metadata';

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