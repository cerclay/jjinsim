"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TestCard } from './test-card';

// 인기 테스트 데이터 (기본값)
const popularTests = [
  {
    id: 'stress-check',
    title: '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEjugZz1t1M1h_2aXzumcj-afULGj_5KndsXnxRKHRgyIzBNefPl5XAwFstHLvgK2xB0GXoJEswTWjwG1JDEs7ZzR0PSqek1-0SpybstGU8STmYCBQYfTm_l3sKIuxIq-j1mTGCOTa2UzWEwldmgAm7Gw0U3Ey8NRfIQjIg6ElkmYm76Sy01Yxi15qWYSwA',
    participants: 120421,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'past-life-character',
    title: '나의 전생 케릭터는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
    participants: 154321,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'personal-color',
    title: '퍼스널컬러 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
    participants: 178945,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'marriage-type',
    title: '나의 결혼 이상형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
    participants: 145632,
    isPopular: true,
  },
  {
    id: 't-power',
    title: '나의 T발력 수치는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
    participants: 132589,
    isPopular: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 119872,
    isPopular: true,
  }
];

// 실제 참여 횟수 기반 인기 테스트 컴포넌트
export const PopularTestsSection = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchPopularTests() {
      setLoading(true);
      
      // 모든 테스트 카드 불러오기 (참여수 기준 내림차순)
      const { data: testsData, error } = await supabase
        .from('test_card_stats')
        .select('*')
        .order('participation_count', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("인기 테스트 조회 오류:", error);
        // 오류 발생 시 기본 데이터 사용
        setTests(popularTests.sort((a, b) => b.participants - a.participants).slice(0, 5));
      } else if (testsData && testsData.length > 0) {
        // Supabase 데이터를 UI에 맞게 변환
        const formattedTests = testsData.map(test => ({
          id: test.id,
          title: test.title,
          imageUrl: test.thumbnail_url || `https://picsum.photos/seed/${test.id}/400/200`,
          participants: test.participation_count,
          likes: test.like_count + (test.accurate_count || 0),
          isPopular: test.participation_count > 10000,
          isNew: new Date(test.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30일 이내 생성
        }));
        setTests(formattedTests);
      } else {
        // 데이터가 없는 경우 기본 데이터 사용
        setTests(popularTests.sort((a, b) => b.participants - a.participants).slice(0, 5));
      }
      
      setLoading(false);
    }
    
    fetchPopularTests();
  }, [supabase]);

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">🔥 인기 테스트</h2>
        <Link href="/tests" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          더보기
          <ChevronRight size={16} className="ml-0.5" />
        </Link>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-36 w-full"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              id={test.id}
              title={test.title}
              imageUrl={test.imageUrl}
              participants={test.participants}
              likes={test.likes}
              isPopular={test.isPopular}
              isNew={test.isNew}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 