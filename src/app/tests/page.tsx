'use client';

import React from 'react';
import AdInContent from '@/components/ads/AdInContent';

export default function TestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">모든 테스트</h1>
      
      {/* 상단 광고 */}
      <AdInContent />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-center col-span-full text-gray-500">테스트 목록을 불러오는 중입니다...</p>
      </div>
      
      {/* 하단 광고 */}
      <AdInContent />
    </div>
  );
} 