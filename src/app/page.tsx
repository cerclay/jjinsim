"use client";

import React, { useEffect } from 'react';
import { TestSection } from '@/components/home/test-section';
import { CategorySection } from '@/components/home/category-section';
import { FeaturedColorBlindness } from '@/components/home/featured-color-blindness';
import { FeaturedPersonalColor } from '@/components/home/featured-personal-color';
import { HeroSection } from '@/components/home/hero-section';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 인기 테스트 데이터
const popularTests = [
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
  },
  {
    id: 'fortune-telling',
    title: '운세 상담',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8',
    participants: 107456,
    isPopular: true,
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
    participants: 97842,
    isPopular: true,
  },
  {
    id: 'mbti-deep',
    title: 'MBTI 심층 분석',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    participants: 85689,
    isPopular: true,
  },
  {
    id: 'attachment-style',
    title: '애착 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    participants: 98452,
    isPopular: true,
  },
  {
    id: 'color-personality',
    title: '컬러 성격 테스트',
    imageUrl: 'https://picsum.photos/id/1032/400/400',
    participants: 87562,
    isPopular: true,
  },
  {
    id: 'career-path',
    title: '직업 적성 테스트',
    imageUrl: 'https://picsum.photos/id/1070/400/400',
    participants: 76234,
    isPopular: true,
  },
  {
    id: 'personality-traits',
    title: '성격 특성 분석',
    imageUrl: 'https://picsum.photos/id/1040/400/400',
    participants: 63421,
    isPopular: true,
  },
  {
    id: 'communication-style',
    title: '소통 방식 테스트',
    imageUrl: 'https://picsum.photos/id/1068/400/400',
    participants: 58321,
    isPopular: true,
  }
];

// 신규 테스트 데이터
const newTests = [
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
    id: 't-power',
    title: '나의 T발력 수치는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
    participants: 22589,
    isNew: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 19872,
    isNew: true,
  },
  {
    id: 'fortune-telling',
    title: '운세 상담',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8',
    participants: 17456,
    isNew: true,
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
    participants: 15842,
    isNew: true,
  },
  {
    id: 'communication-style',
    title: '대화 스타일 테스트',
    imageUrl: 'https://picsum.photos/id/1068/400/400',
    participants: 8756,
    isNew: true,
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
  },
  {
    id: 'creativity-type',
    title: '창의성 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1050/400/400',
    participants: 6437,
    isNew: true,
  },
  {
    id: 'emotional-iq',
    title: '감성 지능 테스트',
    imageUrl: 'https://picsum.photos/id/22/400/400',
    participants: 5234,
    isNew: true,
  },
  {
    id: 'leadership-style',
    title: '리더십 유형 분석',
    imageUrl: 'https://picsum.photos/id/1059/400/400',
    participants: 4872,
    isNew: true,
  }
];

// MBTI 유형 데이터
const mbtiTypes = [
  // 분석가 그룹
  { type: 'INTJ', color: 'bg-blue-600', lightColor: 'from-blue-50 to-indigo-100', name: '전략가', category: '분석가' },
  { type: 'INTP', color: 'bg-blue-500', lightColor: 'from-blue-50 to-indigo-100', name: '논리술사', category: '분석가' },
  { type: 'ENTJ', color: 'bg-blue-700', lightColor: 'from-blue-50 to-indigo-100', name: '통솔자', category: '분석가' },
  { type: 'ENTP', color: 'bg-blue-400', lightColor: 'from-blue-50 to-indigo-100', name: '변론가', category: '분석가' },
  
  // 외교관 그룹
  { type: 'INFJ', color: 'bg-green-600', lightColor: 'from-green-50 to-teal-100', name: '옹호자', category: '외교관' },
  { type: 'INFP', color: 'bg-green-500', lightColor: 'from-green-50 to-teal-100', name: '중재자', category: '외교관' },
  { type: 'ENFJ', color: 'bg-green-700', lightColor: 'from-green-50 to-teal-100', name: '선도자', category: '외교관' },
  { type: 'ENFP', color: 'bg-green-400', lightColor: 'from-green-50 to-teal-100', name: '활동가', category: '외교관' },
  
  // 관리자 그룹
  { type: 'ISTJ', color: 'bg-purple-600', lightColor: 'from-purple-50 to-indigo-100', name: '현실주의자', category: '관리자' },
  { type: 'ISFJ', color: 'bg-purple-500', lightColor: 'from-purple-50 to-indigo-100', name: '수호자', category: '관리자' },
  { type: 'ESTJ', color: 'bg-purple-700', lightColor: 'from-purple-50 to-indigo-100', name: '경영자', category: '관리자' },
  { type: 'ESFJ', color: 'bg-purple-400', lightColor: 'from-purple-50 to-indigo-100', name: '집정관', category: '관리자' },
  
  // 탐험가 그룹
  { type: 'ISTP', color: 'bg-amber-600', lightColor: 'from-amber-50 to-yellow-100', name: '장인', category: '탐험가' },
  { type: 'ISFP', color: 'bg-amber-500', lightColor: 'from-amber-50 to-yellow-100', name: '예술가', category: '탐험가' },
  { type: 'ESTP', color: 'bg-amber-700', lightColor: 'from-amber-50 to-yellow-100', name: '사업가', category: '탐험가' },
  { type: 'ESFP', color: 'bg-amber-400', lightColor: 'from-amber-50 to-yellow-100', name: '연예인', category: '탐험가' },
];

// MBTI 카테고리별로 그룹화
const mbtiGroups = {
  '분석가': mbtiTypes.filter(mbti => mbti.category === '분석가'),
  '외교관': mbtiTypes.filter(mbti => mbti.category === '외교관'),
  '관리자': mbtiTypes.filter(mbti => mbti.category === '관리자'),
  '탐험가': mbtiTypes.filter(mbti => mbti.category === '탐험가'),
};

// 애니메이션 효과를 위한 변수 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// 트렌딩/새로운 테스트 카드 컴포넌트
const TrendingNewTestCard = ({ test }: { test: any }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={`/tests/${test.id}`} className="block">
      <div className="flex items-center p-3">
        <div className="w-20 h-20 flex-shrink-0 mr-4 relative rounded-md overflow-hidden">
          <img 
            src={test.imageUrl} 
            alt={test.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-bold text-base text-gray-800 leading-tight line-clamp-2">{test.title}</h3>
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              {test.isNew && (
                <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full leading-none flex items-center justify-center h-5">
                  NEW
                </span>
              )}
              {test.isPopular && (
                <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full leading-none flex items-center justify-center h-5">
                  <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                  인기
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2분
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {test.participants >= 10000 
                ? `${(test.participants / 10000).toFixed(1)}만명`
                : test.participants >= 1000
                ? `${(test.participants / 1000).toFixed(1)}천명`
                : `${test.participants}명`}
            </span>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// 유튜브 스타일 썸네일 카드 컴포넌트
const YoutubeStyleCard = ({ test }: { test: any }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full"
    whileHover={{ 
      y: -6, 
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      scale: 1.02
    }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={`/tests/${test.id}`} className="block">
      <div className="flex flex-col">
        <div className="relative w-full group">
          <div className="aspect-video w-full overflow-hidden">
            <motion.img 
              src={test.imageUrl} 
              alt={test.title}
              className="w-full h-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 transition-colors duration-300 rounded-t-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 flex gap-1">
            {test.isNew && (
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-md leading-none flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                NEW
              </span>
            )}
            {test.isPopular && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-md leading-none flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                인기
              </span>
            )}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-white font-medium bg-purple-600 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            지금 테스트 하기
          </div>
        </div>
        <div className="p-4 group-hover:bg-purple-50 transition-colors duration-300">
          <h3 className="font-medium text-base text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">{test.title}</h3>
          <div className="flex items-center mt-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2분
              </span>
              <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {test.participants >= 10000 
                  ? `${(test.participants / 10000).toFixed(1)}만명`
                  : test.participants >= 1000
                  ? `${(test.participants / 1000).toFixed(1)}천명`
                  : `${test.participants}명`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// 회전 히어로 카드 컴포넌트
const RotatingHeroCards = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const heroCards = [
    {
      id: 'personal-color',
      title: '퍼스널컬러 테스트',
      description: '당신에게 어울리는 컬러를 찾아보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      color: 'from-pink-500/30 via-pink-500/20 to-black/70'
    },
    {
      id: 'color-blindness',
      title: '색맹 테스트',
      description: '당신의 색각 능력을 테스트해보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
      color: 'from-blue-500/30 via-blue-500/20 to-black/70'
    },
    {
      id: 'marriage-type',
      title: '결혼 이상형 테스트',
      description: '당신의 결혼 이상형을 찾아보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
      color: 'from-purple-500/30 via-purple-500/20 to-black/70'
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroCards.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroCards.length]);

  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-xl shadow-xl">
      {heroCards.map((card, index) => {
        const isActive = index === currentIndex;
        const isPrev = (index === currentIndex - 1) || (currentIndex === 0 && index === heroCards.length - 1);
        const isNext = (index === currentIndex + 1) || (currentIndex === heroCards.length - 1 && index === 0);
        
        return (
          <motion.div
            key={card.id}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{
              x: isActive ? 0 : isPrev ? '-100%' : isNext ? '100%' : (index < currentIndex ? '-100%' : '100%'),
              opacity: isActive ? 1 : 0.5,
              scale: isActive ? 1 : 0.9,
              zIndex: isActive ? 10 : 0
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
          >
            <Link href={`/tests/${card.id}`}>
              <div className="relative w-full h-full cursor-pointer">
                <div className="absolute inset-0">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h2 className="text-white font-extrabold text-2xl drop-shadow-lg">{card.title}</h2>
                  <p className="text-white/90 text-sm mt-1 drop-shadow-md">{card.description}</p>
                  
                  <div className="mt-3">
                    <motion.span 
                      className="inline-block bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(255, 255, 255, 0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      테스트 시작하기
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
      
      {/* 페이지네이션 인디케이터 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`카드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

// 추천 테스트 카드 컴포넌트
const RecommendedTestCard = () => (
  <motion.div 
    className="w-full overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <Link href="/tests/personal-color" className="block">
      <div className="relative">
        <div className="aspect-[16/9] relative overflow-hidden">
          <motion.img 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0" 
            alt="퍼스널컬러 테스트" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-purple-900/60"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="flex justify-between items-end">
            <div>
              <span className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md mb-2 shadow-lg">
                BEST 인기 테스트
              </span>
              <h3 className="text-xl font-bold drop-shadow-md">나의 퍼스널 컬러는?</h3>
              <p className="text-sm text-white/90 mt-1 drop-shadow-sm">
                내게 어울리는 컬러 팔레트를 찾아보세요
              </p>
            </div>
            <motion.div 
              className="bg-white text-purple-600 font-bold rounded-full px-3 py-1 text-sm shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#f0f0ff" }}
              whileTap={{ scale: 0.95 }}
            >
              테스트 시작
            </motion.div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-50 to-white">
        <div className="flex items-center text-gray-600 justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">2분</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">17.8만명</span>
            </div>
          </div>
          <div className="text-xs bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full font-bold flex items-center">
            <Star className="w-3 h-3 mr-0.5" fill="currentColor" />
            97% 만족도
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// MBTI 유형 카드 컴포넌트
const MBTITypeCard = () => {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 메인 링크 */}
      <Link href="/tests/mbti-deep">
        <div className="relative overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full bg-white opacity-5 absolute -top-48 -right-16"></div>
              <div className="w-64 h-64 rounded-full bg-white opacity-5 absolute -bottom-32 -left-16"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h3 className="text-2xl font-bold mb-2 text-center">나의 MBTI는?</h3>
              <p className="text-sm text-center text-white/90 max-w-xs">
                16가지 성격 유형 중 당신은 어디에 속하는지 알아보세요
              </p>
              
              <motion.button
                className="mt-4 bg-white text-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium shadow-lg flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                테스트 시작하기
                <ChevronRight size={16} className="ml-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
      
      {/* MBTI 그룹 */}
      <div className="bg-white p-4">
        {Object.entries(mbtiGroups).map(([groupName, groupMbtis]) => (
          <div key={groupName} className="mb-4 last:mb-0">
            <div className="mb-2 flex items-center">
              <div className={`w-2 h-2 rounded-full ${groupMbtis[0].color} mr-2`}></div>
              <h4 className="text-sm font-semibold text-gray-700">{groupName} 유형</h4>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {groupMbtis.map((mbti) => (
                <Link href={`/tests/mbti-deep?type=${mbti.type}`} key={mbti.type}>
                  <motion.div 
                    className={`${mbti.color} rounded-lg p-2 text-center text-white shadow-sm cursor-pointer`}
                    whileHover={{ y: -3, scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold">{mbti.type}</div>
                    <div className="text-xs mt-1 font-medium opacity-90 line-clamp-1">{mbti.name}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('popular');
  
  return (
    <main className="w-full bg-gray-50">
      <div className="container max-w-md mx-auto pb-6">
        <HeroSection />
        <TestSection 
          title="인기 테스트" 
          tests={popularTests.filter(test => test.isPopular)} 
          viewAllLink="/tests/popular"
        />
        <CategorySection />
        <TestSection 
          title="새로운 테스트" 
          tests={newTests.filter(test => test.isNew)} 
          viewAllLink="/tests/new"
        />
        
        {/* MBTI 유형별 테스트 섹션 추가 */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">MBTI 유형별 테스트</h2>
            <Link href="/tests/mbti-deep" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              더보기
              <ChevronRight size={14} className="ml-0.5" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {/* MBTI 분석하기 카드 */}
            <Link href="/tests/mbti-deep">
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -3, scale: 1.01, boxShadow: "0 12px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-96 h-96 rounded-full bg-white opacity-5 absolute -top-48 -right-16"></div>
                      <div className="w-64 h-64 rounded-full bg-white opacity-5 absolute -bottom-32 -left-16"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h3 className="text-2xl font-bold mb-2 text-center">나의 MBTI는?</h3>
                      <p className="text-sm text-center text-white/90 max-w-xs">
                        16가지 성격 유형 중 당신은 어디에 속하는지 알아보세요
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      5분
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      8.5만명
                    </span>
                  </div>
                  <motion.button
                    className="bg-indigo-600 text-white rounded-full px-4 py-1.5 text-sm font-medium shadow flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    테스트 시작
                    <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            </Link>
            
            {/* MBTI 유형 그룹 */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(mbtiGroups).map(([groupName, groupMbtis]) => (
                <Link href={`/tests/mbti-deep?category=${groupName}`} key={groupName}>
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md p-3"
                    style={{ 
                      backgroundImage: `linear-gradient(120deg, ${groupName === '분석가' ? '#eef2ff' : groupName === '외교관' ? '#ecfdf5' : groupName === '관리자' ? '#f5f3ff' : '#fffbeb'} 0%, white 100%)` 
                    }}
                    whileHover={{ y: -3, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${groupMbtis[0].color} mr-2 text-white text-xs font-bold`}>
                        {groupName.charAt(0)}
                      </div>
                      <h4 className="font-bold text-gray-800">{groupName} 유형</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      {groupMbtis.slice(0, 4).map((mbti) => (
                        <div key={mbti.type} className="text-xs flex items-center">
                          <div className={`w-2 h-2 rounded-full ${mbti.color} mr-1`}></div>
                          <span className="font-medium">{mbti.type}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 px-4">
          <Link href="/tests">
            <motion.div 
              className="w-full rounded-lg py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-medium shadow-md flex items-center justify-center"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              모든 테스트 보러가기
              <ChevronRight size={18} className="ml-1" />
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  );
}
