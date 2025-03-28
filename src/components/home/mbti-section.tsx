"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MbtiType {
  type: string;
  color: string;
  lightColor: string;
  name: string;
  category: string;
}

interface MbtiSectionProps {
  mbtiTypes: MbtiType[];
}

export const MbtiSection = ({ mbtiTypes }: MbtiSectionProps) => {
  // MBTI 유형을 카테고리별로 그룹화
  const groupedTypes = React.useMemo(() => {
    const grouped: Record<string, MbtiType[]> = {};
    
    mbtiTypes.forEach(type => {
      if (!grouped[type.category]) {
        grouped[type.category] = [];
      }
      grouped[type.category].push(type);
    });
    
    return grouped;
  }, [mbtiTypes]);
  
  // 카테고리 순서 정의
  const categoryOrder = ['분석가', '외교관', '관리자', '탐험가'];
  
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-900">🧠 MBTI 유형별 테스트</h2>
        <Link href="/tests/mbti" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          더보기
          <ChevronRight size={16} className="ml-0.5" />
        </Link>
      </div>
      
      <div className="px-4 space-y-6">
        {categoryOrder.map(category => (
          <div key={category} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className={`p-3 font-bold text-white ${getCategoryColor(category)}`}>
              {category} 그룹
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3">
              {groupedTypes[category]?.map(mbti => (
                <Link 
                  key={mbti.type} 
                  href={`/tests/mbti/${mbti.type.toLowerCase()}`}
                  className={`p-3 rounded-lg bg-gradient-to-r ${mbti.lightColor} hover:scale-105 transition-transform`}
                >
                  <div className={`flex items-center justify-between mb-1`}>
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${mbti.color} text-white font-bold text-xs`}>
                      {mbti.type}
                    </span>
                    <span className="text-xs text-gray-600">
                      알아보기 →
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-gray-800 mt-2">{mbti.name}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 카테고리에 따른 배경색 반환
function getCategoryColor(category: string): string {
  switch(category) {
    case '분석가': return 'bg-blue-600';
    case '외교관': return 'bg-green-600';
    case '관리자': return 'bg-purple-600';
    case '탐험가': return 'bg-amber-600';
    default: return 'bg-gray-600';
  }
} 