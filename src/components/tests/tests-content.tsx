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
    id: 'boomer-test',
    title: '나의 꼰대력은?!',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfl5eqh5bGdKTYkWyK02Pd4nfeBnOaRGmKtdu-gNVVxmUbNa9RHOd1J4nPPBEhj-agPWoeFWNb02RKdUmz9Fb6miGtzq9tEQO4tKawQLyyr7JGMOS5c_SzUZC6JecRRfYosDV18Fll38q0jCtjq6AObiUI5cReNXaLYU4uFia4k-gAZ8C5vpT6FRtuBq4/s320/ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%207%EC%9D%BC%20%EC%98%A4%ED%9B%84%2003_14_18.png',
    participants: 8210,
    isNew: true,
    isPopular: true,
    description: '12문항으로 확인하는 내 속에 잠재된 꼰대 기질! 재미로만 참고하세요.',
    category: 'psychology'
  },
  {
    id: 'memory-test',
    title: '기억력 지수 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgIHM2zFl3lLs-BmIXmAVVjDhSuC6nEFWe3sLwWcaqJ_cncNc6mcU-C9Cfx1a6i0QynhivQrId5Gp4Q-bMiO_mVZ6ZURPsjYqk0wItse9EjvH5UPCe0ATr9NsQinLSCRqo5FqpqHEEwdoxj_4pRU9IZjm18JjgkVqwIr4z9Xtk5jQLTemvXukF-xgKYAJw',
    participants: 8500,
    isNew: true,
    isPopular: true,
    description: '12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!',
    category: 'ability'
  },
  {
    id: 'pet-match',
    title: '나랑 찰떡인 반려동물은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s',
    participants: 9500,
    isNew: true,
    isPopular: true,
    description: '당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다!',
    category: 'relationship'
  },
  {
    id: 'iq-test',
    title: '나의 진짜 IQ테스트 - 유머버전',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 8752,
    isNew: true,
    isPopular: true,
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
    category: 'iq'
  },
  {
    id: 'flirting-style',
    title: '나의 썸탈때 유형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEi3RsaJfXF348yQXIqPu854ExsUJHbCOWRIaJl8WAN5CB2Hd2LonZlL2JeivUUfqmaeB_uHstCYJkZK5RMMFTO9qK1Xj3JatGqyP-0JcbeCapr4-ithvuIYG4I2ESQBKVudfMbK_buO4WB3SwhFt21UY0QaosOv8Zso0a_t7nqU1wyzALTriopSDnkL_LY',
    participants: 12543,
    isNew: true,
    isPopular: true,
    description: '12개의 질문으로 당신이 관심 있는 사람에게 어떻게 다가가는지 알아보세요! 당신만의 썸 스타일은?',
    category: 'relationship'
  },
  {
    id: 'stress-check',
    title: '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEjugZz1t1M1h_2aXzumcj-afULGj_5KndsXnxRKHRgyIzBNefPl5XAwFstHLvgK2xB0GXoJEswTWjwG1JDEs7ZzR0PSqek1-0SpybstGU8STmYCBQYfTm_l3sKIuxIq-j1mTGCOTa2UzWEwldmgAm7Gw0U3Ey8NRfIQjIg6ElkmYm76Sy01Yxi15qWYSwA',
    participants: 8723,
    isNew: true,
    isPopular: false,
    description: '12문제로 알아보는 당신의 스트레스 지수. 지금 당신 멘탈, 몇 % 남았을까?',
    category: 'psychology'
  },
  {
    id: 'past-life-character',
    title: '나의 전생 케릭터는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
    participants: 154321,
    isPopular: true,
    isNew: true,
    category: 'fun'
  },
  {
    id: 'dog-compatibility',
    title: '나랑 잘 맞는 강아지는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc',
    participants: 12456,
    isNew: true,
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!',
    category: 'relationship'
  },
  {
    id: 'tarot-consultation',
    title: '타로상담 상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 119872,
    isPopular: true,
    category: 'psychology'
  },
  {
    id: 'social-character',
    title: '나의 사회 생활 케릭터는?!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgClS6uwKav_V1RFcqw_RrMysUA_FPrTiEnqNjTcQtlGLVTTYQEToJAmga7KravDN-2LzuBS3I8kmiDCewHN5lmRN92bGDo1x43X0gFLol0zYXLK_bW-xXhPEJ33ZhHRTofJf80hDC8FVHppVWl3QAyhY6Rv6-RVhoFZHzMICCmjC0xio-V-FmEOgs_us8',
    participants: 5321,
    isNew: true,
    category: 'social'
  },
  {
    id: 'multiple-personality',
    title: '다중인격 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhU3wrcHO-e6KiGc0GRRHy84f4s5KgSnpwdMdRhVJsUeJ58MkmUezL-BDhT0reEmNcAOAGPEyXtRIwl9dA6Lf53ZIHarjdxj3vT2WXbcKAe5uOw9e0IvmIGRdRUr7B-fHxJHDtWhYKcUYRnqu5Q7QymnFFziMCUphi59i-a7J17gVXCqb5n997QcjDnz30',
    participants: 4895,
    isNew: true,
    category: 'personality'
  },
  {
    id: 'healing-moment',
    title: '내가 가장 힐링 되는 순간은?!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgyhxrwEezD7F9ZCCY18n0dYhXZT2zu2bz0y_eAq9WjH0HfOXK0fqL3JDfz1tJQ7AmgtSJvekEJhkPEcNLeDstBHKmkNtf7vmx7XIQLWUAJRo1D9SV3xvYapc2MWyyaTRq-9tYDMGc8Hlf5fPVfSsrVT3mKEAFE8uXpkjkV52APJOii-IEPdZARJoPmR3k',
    participants: 3764,
    isNew: true,
    category: 'psychology'
  },
  {
    id: 'mbti',
    title: 'MBTI 빠르고 정확하게!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgTe9x3WFzi7SUAvTqEvnThlLpoEqxtEV9l7IxRByB6KacW6PnSNu8YdDmXloWzuME_v7G8cPpe1ftCjfLU9qoXj_4k87eNgna8u8NEPTVvhDU-aHheaQbQgcqTeEilvFLGor-oQ8FWro_3pbb96PIvQJE6Orc7HsrxFr0h3eg824EhoPLibzDsDkyfPOE',
    participants: 23456,
    likes: 1247,
    isNew: false,
    isPopular: true
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
          .select('id, title, thumbnail_url, participation_count, like_count, created_at, category')
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
        
        // 모든 테스트 디렉토리 기반 데이터 생성
        // src/app/tests 디렉토리에 있는 모든 테스트 폴더를 기반으로 테스트 데이터 생성
        const testDirectories = [
          'iq-test',
          'color-blindness',
          'pet-match',
          'memory-test',
          'life-genre',
          'travel-match',
          'personal-color',
          'polsok-character',
          'attachment-style',
          't-power',
          'boomer-test',
          'past-life-character',
          'marriage-type',
          'mbti',
          'stress-check',
          'tarot-consultation',
          'social-character',
          'multiple-personality',
          'healing-moment',
          'flirting-style',
          'dog-compatibility',
          'adhd-test'
        ];

        // 테스트 제목 보정
        const mapTitleOverrides = (id) => {
          const titleMap = {
            'boomer-test': '나의 꼰대력은?!',
            'memory-test': '기억력 지수 테스트',
            'past-life-character': '나의 전생 케릭터는?',
            'marriage-type': '나의 결혼 이상형은?',
            'iq-test': '나의 진짜 IQ테스트 - 유머버전',
            'mbti': 'MBTI 빠르고 정확하게!',
            'stress-check': '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
            'social-character': '나의 사회 생활 케릭터는?!',
            'multiple-personality': '다중인격 테스트',
            'healing-moment': '내가 가장 힐링 되는 순간은?!',
            'flirting-style': '나의 썸탈때 유형은?',
            'pet-match': '나랑 찰떡인 반려동물은?',
            'dog-compatibility': '나랑 잘 맞는 강아지는?',
            'tarot-consultation': '타로 상담가',
            'polsok-character': '내가 폭싹 속았수다 속 케릭터라면?',
            'attachment-style': '나의 애착 유형은?',
            'life-genre': '내 인생 장르는 뭘까?',
            't-power': '나의 T발력 수치는?',
            'personal-color': '퍼스널컬러 테스트',
            'color-blindness': '색맹 테스트',
            'travel-match': '나랑 잘 맞는 여행지는?',
            'adhd-test': '당신의 ADHD 성향 테스트'
          };
          return titleMap[id] || generateTitle(id);
        };

        // 폴더 이름에서 테스트 제목 생성
        const generateTitle = (id) => {
          const words = id.split('-');
          return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' 테스트';
        };

        // 카테고리 매핑 함수
        const getCategoryForTest = (id) => {
          const categoryMap = {
            'boomer-test': 'psychology',
            'memory-test': 'ability',
            'iq-test': 'iq',
            'mbti': 'personality',
            'multiple-personality': 'personality',
            'social-character': 'personality',
            'marriage-type': 'relationship',
            'dog-compatibility': 'relationship',
            'pet-match': 'relationship',
            'flirting-style': 'relationship',
            'attachment-style': 'relationship',
            'healing-moment': 'psychology',
            'stress-check': 'psychology',
            'tarot-consultation': 'psychology',
            'past-life-character': 'fun',
            'polsok-character': 'fun',
            'life-genre': 'fun',
            't-power': 'personality',
            'personal-color': 'personality',
            'color-blindness': 'ability',
            'travel-match': 'personality',
            'adhd-test': 'psychology'
          };
          return categoryMap[id] || 'fun';
        };

        // 디렉토리 기반 테스트 데이터 생성
        const directoryTests = testDirectories.map((dir, index) => {
          // 기본 테스트 데이터에서 해당 ID의 테스트를 찾음
          const existingTest = defaultTests.find(test => test.id === dir);
          
          // 이미지 URL 맵핑
          const customImageUrls = {
            'boomer-test': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfl5eqh5bGdKTYkWyK02Pd4nfeBnOaRGmKtdu-gNVVxmUbNa9RHOd1J4nPPBEhj-agPWoeFWNb02RKdUmz9Fb6miGtzq9tEQO4tKawQLyyr7JGMOS5c_SzUZC6JecRRfYosDV18Fll38q0jCtjq6AObiUI5cReNXaLYU4uFia4k-gAZ8C5vpT6FRtuBq4/s320/ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%207%EC%9D%BC%20%EC%98%A4%ED%9B%84%2003_14_18.png',
            'marriage-type': 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
            'dog-compatibility': 'https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc',
            'tarot-consultation': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
            'pet-match': 'https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s',
            'polsok-character': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT73s19GNbOYJlSm_Kj3d06jvPIiNFMgL0qswmuXRH4DAbx-ZTJYa4dMfColxZuajof_pKKUMhfxgL15bknTXbjyi-LAx_Y4gwrO7R0-asgLdpdycOzjcGg-Sc4Pa_k7ozVgZxUNxEgV10rRhf0lcA_oPrwUzk4ypvv4dy3Be5OSpQUMYpGkjlM14iRjw/s320/MBTI%20(1).jpg',
            'attachment-style': 'https://blogger.googleusercontent.com/img/a/AVvXsEhSeBAqi0jvBtxRfKdRluimJJDwueigV1ENX5edBTxkWYhxLqjQuAzFj9vzsZxWUkuRI8ydD7EW_wwmudAYU3blDm87VmF0_5-QU7bwagpMxyz9uzJv1n4OcUM2Fv74AaxFWEViUpPGm09eyckvZhBYVxeJvSe_nmbiy-6ILyyTWyXvLPhJ_0D0vn8_MfQ',
            't-power': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
            'personal-color': 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
            'color-blindness': 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
            'life-genre': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
            'social-character': 'https://blogger.googleusercontent.com/img/a/AVvXsEgClS6uwKav_V1RFcqw_RrMysUA_FPrTiEnqNjTcQtlGLVTTYQEToJAmga7KravDN-2LzuBS3I8kmiDCewHN5lmRN92bGDo1x43X0gFLol0zYXLK_bW-xXhPEJ33ZhHRTofJf80hDC8FVHppVWl3QAyhY6Rv6-RVhoFZHzMICCmjC0xio-V-FmEOgs_us8',
            'multiple-personality': 'https://blogger.googleusercontent.com/img/a/AVvXsEhU3wrcHO-e6KiGc0GRRHy84f4s5KgSnpwdMdRhVJsUeJ58MkmUezL-BDhT0reEmNcAOAGPEyXtRIwl9dA6Lf53ZIHarjdxj3vT2WXbcKAe5uOw9e0IvmIGRdRUr7B-fHxJHDtWhYKcUYRnqu5Q7QymnFFziMCUphi59i-a7J17gVXCqb5n997QcjDnz30',
            'healing-moment': 'https://blogger.googleusercontent.com/img/a/AVvXsEgyhxrwEezD7F9ZCCY18n0dYhXZT2zu2bz0y_eAq9WjH0HfOXK0fqL3JDfz1tJQ7AmgtSJvekEJhkPEcNLeDstBHKmkNtf7vmx7XIQLWUAJRo1D9SV3xvYapc2MWyyaTRq-9tYDMGc8Hlf5fPVfSsrVT3mKEAFE8uXpkjkV52APJOii-IEPdZARJoPmR3k',
            'travel-match': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwcZecDbw2Psrma7voRO7iGbZjQNKvtDmiPraoGk2yGTDCpbOhz-XrvsVyhoCJEgECUJJgUCnOEiwK_IPzQZcFCu6ALZnc_Mm_hk8iO_Ut7OBvl2q85B4rM9m6W9zYQDfDOMEw9vZnUixe5kTFMq1vdmNF0CYRhlCh69D2fPB2OimP7wPwbZVN1z8jZfo/s320/travel-match.jpg',
            'adhd-test': 'https://blogger.googleusercontent.com/img/a/AVvXsEjtiEJUudqPTaxJfPOpVctjo16rNKVmqbKfBtgmvFUxvOhndLKS0x66cX6AXp4UFigEFH2cJ_J953Pbrch9fTeSfM1-nc0_7b_eLw600zHXyOt58P9sEVEpfrKWLHMiNtb9_YJrzrdk5wCywGcWU8BwQ77AVWGAbKM1q4gQkcpe-wq__a1q9vpiZcPgu-g'
          };
          
          // 기존 데이터가 있으면 사용하고, 없으면 새로 생성
          return existingTest || {
            id: dir,
            title: mapTitleOverrides(dir),
            imageUrl: customImageUrls[dir] || `https://picsum.photos/seed/${dir}/400/200`,
            participants: 8000 - (index * 200), // 임의의 참여자 수 (0명이 되지 않도록 수정)
            likes: 750 - (index * 30), // 임의의 좋아요 수
            isPopular: index < 8 || dir === 'adhd-test', // 상위 8개와 ADHD 테스트는 인기 테스트로 표시
            isNew: index < 5 || dir === 'adhd-test', // 상위 5개와 ADHD 테스트는 새로운 테스트로 표시
            category: getCategoryForTest(dir)
          };
        });
        
        if (testsData && testsData.length > 0) {
          // API 데이터와 디렉토리 기반 데이터를 합침
          const formattedTests = testsData.map(test => ({
            id: test.id,
            title: test.title,
            imageUrl: test.thumbnail_url || `https://picsum.photos/seed/${test.id}/400/200`,
            participants: test.participation_count || 0,
            likes: test.like_count || 0,
            isPopular: test.participation_count > 10000 || false,
            isNew: new Date(test.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            category: test.category || 'fun' // 카테고리가 없는 경우 기본값으로 'fun' 설정
          }));
          
          // API 데이터 ID 목록
          const apiTestIds = new Set(formattedTests.map(test => test.id));
          
          // 중복되지 않는 디렉토리 테스트만 필터링
          const uniqueDirectoryTests = directoryTests.filter(test => !apiTestIds.has(test.id));
          
          // 두 데이터를 합친 후 정렬
          const allTests = [...formattedTests, ...uniqueDirectoryTests];
          const sortedTests = allTests.sort((a, b) => b.participants - a.participants);
          
          setPopularTests(sortedTests);
          
          // 신규 테스트는 isNew가 true인 테스트만 필터링하여 사용
          const newTestsData = sortedTests.filter(test => test.isNew);
            
          if (newTestsData.length > 0) {
            setNewTests(newTestsData);
          } else {
            // 신규 테스트가 없으면 최근에 추가된 테스트를 신규로 표시
            setNewTests(sortedTests.slice(0, 10));
          }
        } else {
          // API 데이터 없을 경우 디렉토리 기반 데이터만 사용
          const sortedTests = directoryTests.sort((a, b) => b.participants - a.participants);
          setPopularTests(sortedTests);
          
          // 신규 테스트
          const newTestsData = sortedTests.filter(test => test.isNew);
          if (newTestsData.length > 0) {
            setNewTests(newTestsData);
          } else {
            setNewTests(sortedTests.slice(0, 10));
          }
        }
      } catch (error) {
        console.error("테스트 데이터 로딩 오류:", error instanceof Error ? error.message : JSON.stringify(error));
        
        // 오류 발생 시 디렉토리 기반 테스트 데이터 생성
        const testDirectories = [
          'iq-test',
          'color-blindness',
          'pet-match',
          'memory-test',
          'life-genre',
          'travel-match',
          'personal-color',
          'polsok-character',
          'attachment-style',
          't-power',
          'boomer-test',
          'past-life-character',
          'marriage-type',
          'mbti',
          'stress-check',
          'tarot-consultation',
          'social-character',
          'multiple-personality',
          'healing-moment',
          'flirting-style',
          'dog-compatibility',
          'adhd-test'
        ];

        // 테스트 제목 보정
        const mapTitleOverrides = (id) => {
          const titleMap = {
            'boomer-test': '나의 꼰대력은?!',
            'memory-test': '기억력 지수 테스트',
            'past-life-character': '나의 전생 케릭터는?',
            'marriage-type': '나의 결혼 이상형은?',
            'iq-test': '나의 진짜 IQ테스트 - 유머버전',
            'mbti': 'MBTI 빠르고 정확하게!',
            'stress-check': '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
            'social-character': '나의 사회 생활 케릭터는?!',
            'multiple-personality': '다중인격 테스트',
            'healing-moment': '내가 가장 힐링 되는 순간은?!',
            'flirting-style': '나의 썸탈때 유형은?',
            'pet-match': '나랑 찰떡인 반려동물은?',
            'dog-compatibility': '나랑 잘 맞는 강아지는?',
            'tarot-consultation': '타로 상담가',
            'polsok-character': '내가 폭싹 속았수다 속 케릭터라면?',
            'attachment-style': '나의 애착 유형은?',
            'life-genre': '내 인생 장르는 뭘까?',
            't-power': '나의 T발력 수치는?',
            'personal-color': '퍼스널컬러 테스트',
            'color-blindness': '색맹 테스트',
            'travel-match': '나랑 잘 맞는 여행지는?',
            'adhd-test': '당신의 ADHD 성향 테스트'
          };
          return titleMap[id] || generateTitle(id);
        };

        // 폴더 이름에서 테스트 제목 생성
        const generateTitle = (id) => {
          const words = id.split('-');
          return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' 테스트';
        };

        // 디렉토리 기반 테스트 데이터 생성
        const directoryTests = testDirectories.map((dir, index) => {
          // 기본 테스트 데이터에서 해당 ID의 테스트를 찾음
          const existingTest = defaultTests.find(test => test.id === dir);
          
          // 기존 데이터가 있으면 사용하고, 없으면 새로 생성
          return existingTest || {
            id: dir,
            title: mapTitleOverrides(dir),
            imageUrl: `https://picsum.photos/seed/${dir}/400/200`,
            participants: 8000 - (index * 200), // 임의의 참여자 수 (0명이 되지 않도록 수정)
            likes: 750 - (index * 30), // 임의의 좋아요 수
            isPopular: index < 8 || dir === 'adhd-test', // 상위 8개와 ADHD 테스트는 인기 테스트로 표시
            isNew: index < 5 || dir === 'adhd-test', // 상위 5개와 ADHD 테스트는 새로운 테스트로 표시
            category: getCategoryForTest(dir)
          };
        });

        // 인기 순서로 정렬된 테스트
        const sortedTests = directoryTests.sort((a, b) => b.participants - a.participants);
        setPopularTests(sortedTests);
        
        // 신규 테스트
        const newTestsData = sortedTests.filter(test => test.isNew);
        if (newTestsData.length > 0) {
          setNewTests(newTestsData);
        } else {
          setNewTests(sortedTests.slice(0, 10));
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchTests();
  }, []);

  // 검색 및 카테고리 필터링
  const filteredPopularTests = popularTests
    .filter(test => 
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (category === 'all' || test.category === category) &&
      test.participants > 0 // 참여자가 0명인 테스트는 제외
    );
  
  const filteredNewTests = newTests
    .filter(test => 
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (category === 'all' || test.category === category) &&
      test.participants > 0 // 참여자가 0명인 테스트는 제외
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
    { id: 'ability', name: '능력' },
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