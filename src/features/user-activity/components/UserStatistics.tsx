"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart, 
  Activity, 
  Trophy, 
  Calendar, 
  BarChart3 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface UserStatisticData {
  totalTests: number;
  favoriteTest: {
    title: string;
    category: string;
  } | null;
  testCount: number;
}

// 카테고리별 아이콘과 색상 매핑
const CATEGORY_STYLES: Record<string, { icon: React.ReactNode; color: string }> = {
  personality: { 
    icon: <Activity className="w-4 h-4" />, 
    color: 'bg-blue-100 text-blue-800' 
  },
  relationship: { 
    icon: <BarChart className="w-4 h-4" />, 
    color: 'bg-green-100 text-green-800' 
  },
  career: { 
    icon: <BarChart3 className="w-4 h-4" />, 
    color: 'bg-amber-100 text-amber-800' 
  },
  iq: { 
    icon: <BarChart className="w-4 h-4" />, 
    color: 'bg-purple-100 text-purple-800' 
  },
  psychology: { 
    icon: <Activity className="w-4 h-4" />, 
    color: 'bg-pink-100 text-pink-800' 
  },
  fun: { 
    icon: <Trophy className="w-4 h-4" />, 
    color: 'bg-indigo-100 text-indigo-800' 
  }
};

// 유형별 재미있는 메시지
const PERSONALITY_MESSAGES: Record<string, string[]> = {
  personality: [
    "당신은 자신을 탐험하는 것을 좋아하는 탐험가군요!",
    "자기 이해의 여정을 즐기는 진정한 자아 탐구자네요!"
  ],
  relationship: [
    "관계를 중요시하는 따뜻한 마음의 소유자군요!",
    "사람과 관계에 진심인 당신, 멋집니다!"
  ],
  career: [
    "미래를 계획하는 철저한 준비형이시네요!",
    "자신의 진로에 진지하게 고민하는 분석가시군요!"
  ],
  iq: [
    "두뇌 깨우기를 즐기는 지식 탐구가!",
    "지적 호기심이 넘치는 IQ 도전자시네요!"
  ],
  psychology: [
    "마음의 비밀을 탐구하는 심리 탐험가!",
    "자기 심리를 이해하고자 하는 통찰력의 소유자!"
  ],
  fun: [
    "재미있는 것을 좋아하는 즐거움 수집가!",
    "유머와 즐거움을 찾아다니는 긍정 에너지의 원천!"
  ]
};

export function UserStatistics() {
  const [statistics, setStatistics] = useState<UserStatisticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setLoading(true);
        const response = await fetch('/api/user-activity');
        
        if (!response.ok) {
          throw new Error('통계 데이터를 불러오는데 실패했습니다');
        }
        
        const data = await response.json();
        setStatistics(data.statistics || null);
      } catch (err) {
        console.error('통계 데이터 로딩 에러:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // 선호 카테고리가 없는 경우
  if (!statistics || !statistics.favoriteTest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>테스트 통계</CardTitle>
          <CardDescription>아직 데이터가 충분하지 않습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <BarChart className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">
              더 많은 테스트를 완료하면 당신의 테스트 성향을 분석해 드릴게요!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 카테고리 스타일 가져오기
  const category = statistics.favoriteTest.category.toLowerCase();
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.fun;
  
  // 랜덤 메시지 선택
  const messages = PERSONALITY_MESSAGES[category] || PERSONALITY_MESSAGES.fun;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <Card>
      <CardHeader>
        <CardTitle>테스트 통계</CardTitle>
        <CardDescription>당신의 테스트 성향을 분석했어요</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-purple-800">수행 테스트</p>
            <p className="text-xl font-bold text-purple-600">
              {statistics.totalTests || 0}회
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-blue-800">테스트 다양성</p>
            <p className="text-xl font-bold text-blue-600">
              {statistics.testCount || 0}종류
            </p>
          </div>
        </div>

        {/* 선호 테스트 정보 */}
        {statistics.favoriteTest && (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${categoryStyle.color} mr-2`}>
                {categoryStyle.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">가장 많이 한 테스트 유형</h4>
                <p className="text-xs text-gray-500">{statistics.favoriteTest.category}</p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">{randomMessage}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 