"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TestCard } from '@/components/home/test-card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client'; // supabase 클라이언트 가져오기

// 기본 테스트 데이터 (API에서 데이터를 가져오지 못할 경우 사용)
const defaultTests = [
  {
    id: 'iq-test',
    title: '나의 진짜 IQ테스트 - 유머버전',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 8752,
    isNew: true,
    isPopular: true,
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!'
  },
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
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
    participants: 5436,
    isNew: true,
    isPopular: false,
    description: '12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!'
  },
  {
    id: 'dog-compatibility',
    title: '나랑 잘 맞는 강아지는?',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    participants: 12456,
    isNew: true,
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!'
  },
  // 더 많은 기본 테스트 데이터 추가
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgeGzcb_BdpyZNglZW24ioN_ptB5ch7PZbw3nQQDDcWbnRcgupVnP2vGS3n6ijlPS4VTkF1PuqhceicDn-63UyyWBBbo6dGyj33az_VDC_4N7m9qersQPY-7H--tzwfE3CWB_wTyeBgys5KR6oz2IB3JFiKx7RQaVFm8q-POW9-Ae-EfrLGpr8WLMdYOho',
    participants: 97842,
    isPopular: true,
  },
  {
    id: 'mbti-deep',
    title: 'MBTI 심층 분석',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    participants: 125689,
    isPopular: true,
  },
  {
    id: 'fortune-telling',
    title: '사주팔자 점보기',
    imageUrl: 'https://picsum.photos/id/1060/400/400',
    participants: 107456,
    isPopular: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담 상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 119872,
    isPopular: true,
  },
  {
    id: 'stress-level',
    title: '스트레스 지수 체크',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    participants: 7843,
    isNew: true,
  },
  {
    id: 'love-language',
    title: '사랑의 언어 테스트',
    imageUrl: 'https://picsum.photos/id/1066/400/400',
    participants: 9245,
    isNew: true,
  }
];

// 상수
const TESTS_PER_PAGE = 50;

export const TestsContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularTests, setPopularTests] = useState([]);
  const [newTests, setNewTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all'); // 카테고리 필터

  useEffect(() => {
    async function fetchTests() {
      setLoading(true);
      
      try {
        console.log("Supabase 클라이언트 연결 상태:", !!supabase);
        
        // 테이블 구조 확인을 위한 컬럼 목록 가져오기 시도
        try {
          const { data: testColumns, error: columnError } = await supabase
            .from('test_card_stats')
            .select('id')
            .limit(1);
            
          console.log("테이블 구조 확인 결과:", {
            성공: !columnError,
            데이터존재: !!testColumns,
            샘플: testColumns && testColumns.length > 0 ? Object.keys(testColumns[0]) : []
          });
        } catch (e) {
          console.error("테이블 구조 확인 중 오류:", e);
        }
        
        console.log("인기 테스트 데이터 요청...");
        // 인기 테스트: test_card_stats 테이블에서 직접 가져오기, 컬럼 명시적으로 지정
        const { data: testsData, error: testsError } = await supabase
          .from('test_card_stats')
          .select('id, title, thumbnail_url, participation_count, like_count, created_at')
          .limit(TESTS_PER_PAGE);
        
        if (testsError) {
          console.error("테스트 데이터 로딩 오류:", testsError.message);
          throw new Error(`테스트 데이터를 가져오는 중 오류가 발생했습니다: ${testsError.message}`);
        }
        
        console.log("테스트 데이터 응답:", {
          성공: !testsError,
          개수: testsData?.length || 0,
          첫번째항목: testsData && testsData.length > 0 ? testsData[0] : null
        });
        
        if (testsData && testsData.length > 0) {
          // 테스트 데이터 변환
          const formattedTests = testsData.map(test => ({
            id: test.id,
            title: test.title,
            imageUrl: test.thumbnail_url || `https://picsum.photos/seed/${test.id}/400/200`,
            participants: test.participation_count || 0,
            likes: test.like_count || 0,
            isPopular: test.participation_count > 10000 || false,
            isNew: new Date(test.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }));
          
          // 인기 순으로 정렬
          const sortedTests = formattedTests.sort((a, b) => b.participants - a.participants);
          setPopularTests(sortedTests);
          
          // 최신 생성일 순으로 정렬하여 신규 테스트로 사용
          const newTestsData = [...formattedTests]
            .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
            .filter(test => test.isNew);
            
          if (newTestsData.length > 0) {
            setNewTests(newTestsData);
          } else {
            console.log("충분한 신규 테스트가 없어 기본 데이터 사용");
            setNewTests(defaultTests.filter(test => test.isNew || Math.random() > 0.5));
          }
        } else {
          // 데이터가 없는 경우 기본 데이터 사용
          console.log("테스트 데이터 없음, 기본 데이터 사용");
          setPopularTests(defaultTests.sort((a, b) => b.participants - a.participants));
          setNewTests(defaultTests.filter(test => test.isNew || Math.random() > 0.5));
        }
      } catch (error) {
        console.error("테스트 데이터 로딩 오류:", error instanceof Error ? error.message : JSON.stringify(error));
        // 오류가 발생해도 기본 데이터로 UI 표시
        setPopularTests(defaultTests.sort((a, b) => b.participants - a.participants));
        setNewTests(defaultTests.filter(test => test.isNew || Math.random() > 0.5));
      } finally {
        setLoading(false);
      }
    }
    
    fetchTests();
  }, []);

  // 검색 및 카테고리 필터링
  const filteredPopularTests = popularTests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredNewTests = newTests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 로딩 스켈레톤 컴포넌트
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-36 w-full"></div>
      ))}
    </div>
  );
  
  // 카테고리 목록
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'personality', name: '성격' },
    { id: 'relationship', name: '관계' },
    { id: 'career', name: '직업' },
    { id: 'psychology', name: '심리' },
    { id: 'fun', name: '재미' },
    { id: 'iq', name: 'IQ테스트' },
  ];

  return (
    <div>
      {/* 검색 및 필터 영역 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="테스트 검색하기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2 text-gray-900 bg-white border-purple-300 hover:border-purple-500">
          <Filter size={16} />
          필터
        </Button>
      </div>
      
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={category === cat.id ? "default" : "outline"}
            className={`px-3 py-1 text-sm ${
              category === cat.id 
                ? "bg-purple-600 text-white hover:bg-purple-700" 
                : "bg-white text-gray-700 border-purple-300 hover:border-purple-500"
            }`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      
      <Separator className="mb-6" />
      
      {/* 탭 */}
      <Tabs defaultValue="popular" className="mb-10">
        <TabsList className="mb-6 border-b border-gray-200 w-full flex bg-transparent">
          <TabsTrigger 
            value="popular" 
            className="flex-1 py-2 rounded-none data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:bg-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:border data-[state=inactive]:border-purple-300"
          >
            🔥 인기 테스트
          </TabsTrigger>
          <TabsTrigger 
            value="new" 
            className="flex-1 py-2 rounded-none data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:bg-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:border data-[state=inactive]:border-purple-300"
          >
            ✨ 새로운 테스트
          </TabsTrigger>
        </TabsList>
        
        {/* 인기 테스트 탭 콘텐츠 */}
        <TabsContent value="popular">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {filteredPopularTests.length > 0 ? (
                <div className="space-y-4">
                  {filteredPopularTests.map((test) => (
                    <TestCard
                      key={test.id}
                      id={test.id}
                      title={test.title}
                      imageUrl={test.imageUrl}
                      participants={test.participants}
                      likes={test.likes}
                      isPopular={test.isPopular}
                      isNew={test.isNew}
                      className="max-w-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        {/* 새로운 테스트 탭 콘텐츠 */}
        <TabsContent value="new">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {filteredNewTests.length > 0 ? (
                <div className="space-y-4">
                  {filteredNewTests.map((test) => (
                    <TestCard
                      key={test.id}
                      id={test.id}
                      title={test.title}
                      imageUrl={test.imageUrl}
                      participants={test.participants}
                      likes={test.likes}
                      isPopular={test.isPopular}
                      isNew={test.isNew}
                      className="max-w-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}; 