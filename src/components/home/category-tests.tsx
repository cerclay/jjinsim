"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TestCard } from './test-card';

// 카테고리별 기본 테스트 데이터
const defaultCategoryTests = {
  relationship: [
    {
      id: 'love-language',
      title: '연애 사용 설명서',
      imageUrl: 'https://picsum.photos/seed/love-lang/400/400',
      participants: 311000,
      isPopular: true,
    },
    {
      id: 'true-love',
      title: '찐사랑 테스트',
      imageUrl: 'https://picsum.photos/seed/true-love/400/400',
      participants: 947000,
      isPopular: true,
    },
    {
      id: 'marriage-type',
      title: '나의 결혼 이상형은?',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
      participants: 145632,
      isPopular: true,
    },
    {
      id: 'flirting-style',
      title: '썸 스타일 테스트',
      imageUrl: 'https://picsum.photos/seed/flirt/400/400',
      participants: 18321,
      isPopular: true,
    },
    {
      id: 'ideal-love',
      title: '연애 이상형 테스트',
      imageUrl: 'https://picsum.photos/seed/ideal-love/400/400',
      participants: 624000,
      isPopular: true,
    },
    {
      id: 'some-balance',
      title: '썸 밸런스 게임',
      imageUrl: 'https://picsum.photos/seed/some-balance/400/400',
      participants: 340000,
      isPopular: true,
    },
  ],
  social: [
    {
      id: 'social-character',
      title: '사회생활 유형 테스트',
      imageUrl: 'https://picsum.photos/seed/social-char/400/400',
      participants: 125689,
      isPopular: true,
    },
    {
      id: 'first-impression',
      title: '첫인상 현인상 테스트',
      imageUrl: 'https://picsum.photos/seed/impression/400/400',
      participants: 186000,
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
      id: 'k-social-mental',
      title: 'K-사회생활 멘탈 테스트',
      imageUrl: 'https://picsum.photos/seed/k-social/400/400',
      participants: 139000,
      isPopular: true,
    },
    {
      id: 'dream-workplace',
      title: '꿈의 직장 속 포지션 테스트',
      imageUrl: 'https://picsum.photos/seed/dream-work/400/400',
      participants: 49000,
      isPopular: true,
    },
    {
      id: 'stress-check',
      title: '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEjugZz1t1M1h_2aXzumcj-afULGj_5KndsXnxRKHRgyIzBNefPl5XAwFstHLvgK2xB0GXoJEswTWjwG1JDEs7ZzR0PSqek1-0SpybstGU8STmYCBQYfTm_l3sKIuxIq-j1mTGCOTa2UzWEwldmgAm7Gw0U3Ey8NRfIQjIg6ElkmYm76Sy01Yxi15qWYSwA',
      participants: 120421,
      isPopular: true,
    },
  ],
  'self-discovery': [
    {
      id: 'personal-color',
      title: '퍼스널컬러 테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      participants: 178945,
      isPopular: true,
    },
    {
      id: 'signature-look',
      title: '나만의 시그니처룩 테스트',
      imageUrl: 'https://picsum.photos/seed/sig-look/400/400',
      participants: 295000,
      isPopular: true,
    },
    {
      id: 'past-life-character',
      title: '나의 전생 케릭터는?',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
      participants: 59300,
      isPopular: true,
    },
    {
      id: 'life-genre',
      title: '내 인생 장르는 뭘까?',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
      participants: 5436,
      isPopular: false,
    },
    {
      id: 'multiple-personality',
      title: '다중인격 테스트',
      imageUrl: 'https://picsum.photos/seed/multi-per/400/400',
      participants: 93245,
      isPopular: true,
    },
  ],
  fandom: [
    {
      id: 'idol-position',
      title: '아이돌 포지션 테스트',
      imageUrl: 'https://picsum.photos/seed/idol-pos/400/400',
      participants: 122000,
      isPopular: true,
    },
    {
      id: 'fandom-type',
      title: '덕질유형테스트',
      imageUrl: 'https://picsum.photos/seed/fandom/400/400',
      participants: 936000,
      isPopular: true,
    },
    {
      id: 'fan-point',
      title: '나의 입덕포인트 테스트',
      imageUrl: 'https://picsum.photos/seed/fanpoint/400/400',
      participants: 625000,
      isPopular: true,
    },
    {
      id: 'find-bias',
      title: '최애 찾기 테스트',
      imageUrl: 'https://picsum.photos/seed/bias/400/400',
      participants: 139000,
      isPopular: true,
    },
    {
      id: 'fan-account',
      title: '덕질 계정 테스트',
      imageUrl: 'https://picsum.photos/seed/fan-acc/400/400',
      participants: 122000,
      isPopular: true,
    },
    {
      id: 'healing-moment',
      title: '힐링 모먼트 테스트',
      imageUrl: 'https://picsum.photos/seed/healing/400/400',
      participants: 85632,
      isPopular: true,
    },
  ],
  pets: [
    {
      id: 'dog-compatibility',
      title: '댕댕이 테스트',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
      participants: 40000,
      isPopular: true,
    },
    {
      id: 'lazy-animal',
      title: '너무 게을러서 동물이 되어버렸다',
      imageUrl: 'https://picsum.photos/seed/lazy-animal/400/400',
      participants: 248000,
      isPopular: true,
    },
    {
      id: 'happy-pig',
      title: '행복한 돼지 테스트',
      imageUrl: 'https://picsum.photos/seed/happy-pig/400/400',
      participants: 155000,
      isPopular: true,
    },
    {
      id: 'cat-alone',
      title: '냥혼자산다',
      imageUrl: 'https://picsum.photos/seed/cat-alone/400/400',
      participants: 130000,
      isPopular: true,
    },
    {
      id: 'cat-gangster',
      title: '냥아치 테스트',
      imageUrl: 'https://picsum.photos/seed/cat-gang/400/400',
      participants: 81000,
      isPopular: true,
    },
    {
      id: 'iq-test',
      title: '나의 진짜 IQ테스트 - 유머버전',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
      participants: 98752,
      isPopular: true,
    },
  ],
};

interface CategoryTestsProps {
  title: string;
  categoryId: string;
}

export const CategoryTests = ({ title, categoryId }: CategoryTestsProps) => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCategoryTests() {
      setLoading(true);
      
      try {
        // 카테고리 ID로 테스트 카드 필터링
        const { data: testsData, error } = await supabase
          .from('test_card_categories')
          .select(`
            test_card_id,
            test_cards:test_card_id(
              id,
              title,
              thumbnail_url
            )
          `)
          .eq('category_id', categoryId)
          .limit(6);
        
        if (error) {
          console.error(`${title} 테스트 조회 오류:`, error);
          // 오류 발생 시 기본 데이터 사용
          setTests(defaultCategoryTests[categoryId] || []);
        } else if (testsData && testsData.length > 0) {
          // 테스트 정보를 가져오기 위한 ID 목록 추출
          const testIds = testsData.map(tc => tc.test_card_id);
          
          // 테스트 카드 통계 가져오기
          const { data: statsData, error: statsError } = await supabase
            .from('test_card_stats')
            .select('id, participation_count, like_count, created_at')
            .in('id', testIds);
            
          if (statsError) {
            console.error(`${title} 테스트 통계 조회 오류:`, statsError);
            setTests(defaultCategoryTests[categoryId] || []);
          } else {
            // 테스트 데이터와 통계 데이터 합치기
            const formattedTests = testsData.map(tc => {
              const testCard = tc.test_cards;
              const stats = statsData.find(s => s.id === tc.test_card_id) || {};
              
              return {
                id: testCard.id,
                title: testCard.title,
                imageUrl: testCard.thumbnail_url || `https://picsum.photos/seed/${testCard.id}/400/400`,
                participants: stats.participation_count || 0,
                likes: stats.like_count || 0,
                isPopular: (stats.participation_count || 0) > 10000,
                isNew: stats.created_at ? new Date(stats.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false
              };
            });
            
            setTests(formattedTests);
          }
        } else {
          // 데이터가 없는 경우 기본 데이터 사용
          setTests(defaultCategoryTests[categoryId] || []);
        }
      } catch (error) {
        console.error(`${title} 테스트 조회 중 오류 발생:`, error);
        // 오류 발생 시 기본 데이터 사용
        setTests(defaultCategoryTests[categoryId] || []);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategoryTests();
  }, [categoryId, supabase, title]);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link href={`/tests/category/${categoryId}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          더보기
          <ChevronRight size={16} className="ml-0.5" />
        </Link>
      </div>
      
      {loading ? (
        // 로딩 상태 UI - 스켈레톤 로더
        <div className="relative flex overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
          <div className="flex space-x-4">
            {Array(6).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="w-[500px] aspect-video bg-gray-100 animate-pulse rounded-lg flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        // 테스트 카드 가로 스크롤
        <div className="relative flex overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
          <div className="flex space-x-4">
            {tests.map((test) => (
              <div key={test.id} className="flex-shrink-0">
                <TestCard
                  id={test.id}
                  title={test.title}
                  imageUrl={test.imageUrl}
                  participants={test.participants}
                  likes={test.likes}
                  isPopular={test.isPopular}
                  isNew={test.isNew}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}; 