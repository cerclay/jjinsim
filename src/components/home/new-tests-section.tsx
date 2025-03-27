"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TestCard } from './test-card';
import NewIQTestCard from './NewIQTestCard';

// 신규 테스트 데이터 (기본값)
const newTests = [
  {
    id: 'stress-check',
    title: '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEjugZz1t1M1h_2aXzumcj-afULGj_5KndsXnxRKHRgyIzBNefPl5XAwFstHLvgK2xB0GXoJEswTWjwG1JDEs7ZzR0PSqek1-0SpybstGU8STmYCBQYfTm_l3sKIuxIq-j1mTGCOTa2UzWEwldmgAm7Gw0U3Ey8NRfIQjIg6ElkmYm76Sy01Yxi15qWYSwA',
    participants: 0,
    isNew: true,
    isPopular: false,
    description: '12문제로 알아보는 당신의 스트레스 지수. 지금 당신 멘탈, 몇 % 남았을까?'
  },
  {
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
    participants: 5436,
    isNew: true,
    isPopular: false,
    description: '12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!'
  },
  {
    id: 'past-life-character',
    title: '나의 전생 케릭터는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
    participants: 154321,
    isNew: true,
    description: '12문제로 알아보는 당신의 전생 캐릭터! 당신은 이순신이었을까요, 궁녀였을까요?'
  },
  {
    id: 'dog-compatibility',
    title: '나랑 잘 맞는 강아지는?',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    participants: 12456,
    isNew: true,
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!'
  },
  {
    id: 'personal-color',
    title: '퍼스널컬러 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
    participants: 28945,
    isNew: true,
  },
  {
    id: 'marriage-type',
    title: '나의 결혼 이상형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
    participants: 25632,
    isNew: true,
  },
  {
    id: 'iq-test',
    title: '나의 진짜 IQ테스트 - 유머버전',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 8752,
    isNew: true,
    isPopular: false,
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!'
  },
];

// 신규 테스트 섹션 컴포넌트
export const NewTestsSection = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchNewTests() {
      setLoading(true);
      
      // 새로운 테스트 불러오기 (30일 이내 생성 기준, 생성일 내림차순)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: testsData, error } = await supabase
        .from('test_card_stats')
        .select('*')
        .gt('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("신규 테스트 조회 오류:", error);
        // 오류 발생 시 기본 데이터 사용
        setTests(newTests.slice(0, 4)); // IQ 테스트 카드를 따로 표시하기 위해 4개로 제한
      } else if (testsData && testsData.length > 0) {
        // Supabase 데이터를 UI에 맞게 변환
        const formattedTests = testsData
          .filter(test => test.id !== 'iq-test') // IQ 테스트 제외
          .map(test => ({
            id: test.id,
            title: test.title,
            imageUrl: test.thumbnail_url || `https://picsum.photos/seed/${test.id}/400/200`,
            participants: test.participation_count,
            likes: test.like_count + (test.accurate_count || 0),
            isPopular: test.participation_count > 10000,
            isNew: true // 30일 이내 생성된 것만 가져왔으므로 모두 신규
          }))
          .slice(0, 4); // 최대 4개로 제한
        setTests(formattedTests);
      } else {
        // 데이터가 없는 경우 기본 데이터 사용
        setTests(newTests.filter(test => test.id !== 'iq-test').slice(0, 4));
      }
      
      setLoading(false);
    }
    
    fetchNewTests();
  }, [supabase]);

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">✨ 새로운 테스트</h2>
        <Link href="/tests" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          더보기
          <ChevronRight size={16} className="ml-0.5" />
        </Link>
      </div>
      
      {/* IQ 테스트 카드 별도 표시 */}
      <div className="mb-4">
        <NewIQTestCard />
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
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