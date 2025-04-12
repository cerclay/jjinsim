'use client';

// 메타데이터는 클라이언트 컴포넌트에서 직접 사용할 수 없으므로, 
// metadata.ts 파일에서 별도로 익스포트합니다.

import React from 'react';
import TestContent from './components/TestContent';

export default function PetMatchTest() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-6 md:py-12 flex items-center justify-center">
      <TestContent />
    </main>
  );
} 