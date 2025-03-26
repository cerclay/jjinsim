"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 카테고리 데이터
const categories = [
  { id: 'all', name: '전체' },
  { id: 'personality', name: '성격' },
  { id: 'relationship', name: '관계' },
  { id: 'career', name: '직업' },
  { id: 'psychology', name: '심리' },
  { id: 'fun', name: '재미' },
];

// 테스트 데이터
const tests = [
  {
    id: 'dog-compatibility',
    title: '나랑 잘 맞는 강아지는?',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    category: 'fun',
    participants: 12456,
    isPopular: false,
    isNew: true,
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!'
  },
  {
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: 'https://picsum.photos/id/1059/400/400',
    category: 'fun',
    participants: 5436,
    isPopular: false,
    isNew: true,
    description: '12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!'
  },
  {
    id: 'past-life-character',
    title: '나의 전생 케릭터는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
    category: 'fun',
    participants: 154321,
    isPopular: true,
    isNew: true,
    description: '12문제로 알아보는 당신의 전생 캐릭터! 당신은 이순신이었을까요, 궁녀였을까요?'
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://picsum.photos/id/1054/400/400',
    category: 'psychology',
    participants: 157842,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'mbti-deep',
    title: 'MBTI 심층 분석',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    category: 'personality',
    participants: 125689,
    isPopular: true,
  },
  {
    id: 'attachment-style',
    title: '애착 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    category: 'relationship',
    participants: 98452,
    isPopular: true,
  },
  {
    id: 'color-personality',
    title: '컬러 성격 테스트',
    imageUrl: 'https://picsum.photos/id/1032/400/400',
    category: 'personality',
    participants: 87562,
    isPopular: true,
  },
  {
    id: 'career-path',
    title: '직업 적성 테스트',
    imageUrl: 'https://picsum.photos/id/1070/400/400',
    category: 'career',
    participants: 76234,
    isPopular: true,
  },
  {
    id: 'personality-traits',
    title: '성격 특성 분석',
    imageUrl: 'https://picsum.photos/id/1040/400/400',
    category: 'personality',
    participants: 63421,
    isPopular: true,
  },
  {
    id: 'communication-style',
    title: '소통 방식 테스트',
    imageUrl: 'https://picsum.photos/id/1068/400/400',
    category: 'relationship',
    participants: 58321,
    isPopular: true,
  },
  {
    id: 'stress-level',
    title: '스트레스 지수 체크',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    category: 'psychology',
    participants: 7843,
    isNew: true,
  },
  {
    id: 'love-language',
    title: '사랑의 언어 테스트',
    imageUrl: 'https://picsum.photos/id/1066/400/400',
    category: 'relationship',
    participants: 9245,
    isNew: true,
  },
  {
    id: 'creativity-type',
    title: '창의성 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1050/400/400',
    category: 'personality',
    participants: 6437,
    isNew: true,
  },
  {
    id: 'emotional-iq',
    title: '감성 지능 테스트',
    imageUrl: 'https://picsum.photos/id/22/400/400',
    category: 'psychology',
    participants: 5234,
    isNew: true,
  },
  {
    id: 'leadership-style',
    title: '리더십 유형 분석',
    imageUrl: 'https://picsum.photos/id/1059/400/400',
    category: 'career',
    participants: 4872,
    isNew: true,
  }
];

// 테스트 데이터 추가 부분

const categoryTests = {
  'psychology': [
    {
      id: 'personal-color',
      title: '퍼스널컬러 테스트',
      imageUrl: 'https://picsum.photos/id/1012/400/400',
      participants: 178945,
      description: '나에게 어울리는 컬러는 무엇일까? 퍼스널컬러 테스트로 알아보세요!',
      isPopular: true,
      isNew: true,
    },
    {
      id: 'past-life-character',
      title: '나의 전생 케릭터는?',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
      participants: 154321,
      description: '12문제로 알아보는 당신의 전생 캐릭터! 당신은 이순신이었을까요, 궁녀였을까요?',
      isPopular: true,
      isNew: true,
    },
    {
      id: 't-power',
      title: '나의 T발력 수치는?',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
      participants: 132589,
      description: '당신의 T발력 수치를 알아보는 신개념 심리 테스트입니다.',
      isPopular: true,
    },
    {
      id: 'mbti-deep',
      title: 'MBTI 심층 분석',
      imageUrl: 'https://picsum.photos/id/1005/400/400',
      participants: 125689,
      description: 'MBTI를 더 깊이 분석하고 나의 성격을 더 자세히 알아보세요.',
      isPopular: true,
    },
  ],
  'counseling': [
    {
      id: 'marriage-type',
      title: '나의 결혼 이상형은?',
      imageUrl: 'https://picsum.photos/id/1004/400/400',
      participants: 145632,
      description: '당신에게 맞는 결혼 상대는 어떤 사람일까요? 테스트를 통해 알아보세요.',
      isPopular: true,
    },
    {
      id: 'tarot-consultation',
      title: '타로상담 상담가',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
      participants: 119872,
      description: '타로 카드를 통해 당신의 현재와 미래를 상담해드립니다.',
      isPopular: true,
    },
    {
      id: 'attachment-style',
      title: '애착 유형 테스트',
      imageUrl: 'https://picsum.photos/id/1012/400/400',
      participants: 98452,
      description: '당신의 애착 유형은 무엇인가요? 관계 패턴을 이해하는데 도움이 됩니다.',
      isPopular: true,
    },
  ],
  'others': [
    {
      id: 'fortune-telling',
      title: '사주팔자 점보기',
      imageUrl: 'https://picsum.photos/id/1060/400/400',
      participants: 107456,
      description: '당신의 사주와 운세를 분석해드립니다.',
      isPopular: true,
    },
    {
      id: 'color-blindness',
      title: '색맹테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgeGzcb_BdpyZNglZW24ioN_ptB5ch7PZbw3nQQDDcWbnRcgupVnP2vGS3n6ijlPS4VTkF1PuqhceicDn-63UyyWBBbo6dGyj33az_VDC_4N7m9qersQPY-7H--tzwfE3CWB_wTyeBgys5KR6oz2IB3JFiKx7RQaVFm8q-POW9-Ae-EfrLGpr8WLMdYOho',
      participants: 97842,
      description: '간단한 테스트로 당신의 색각 능력을 측정해보세요.',
      isPopular: true,
    },
    {
      id: 'color-personality',
      title: '컬러 성격 테스트',
      imageUrl: 'https://picsum.photos/id/1032/400/400',
      participants: 87562,
      description: '선호하는 색상을 통해 당신의 성격을 분석합니다.',
      isPopular: true,
    },
  ],
  'fun': [
    {
      id: 'life-genre',
      title: '내 인생 장르는 뭘까?',
      imageUrl: 'https://picsum.photos/id/1059/400/400',
      participants: 5436,
      description: '12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!',
      isNew: true,
    },
    {
      id: 'dog-compatibility',
      title: '나랑 잘 맞는 강아지는?',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
      participants: 12456,
      description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!',
      isNew: true,
    },
  ],
};

// 테스트 타입 정의
interface Test {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  participants: number;
  isPopular?: boolean;
  isNew?: boolean;
  description?: string;
}

// 테스트 카드 컴포넌트
interface TestCardProps {
  test: Test;
  className?: string;
  itemVariants: any;
  formatParticipants: (count: number) => string;
}

const TestCard = ({ test, className = '', itemVariants, formatParticipants }: TestCardProps) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white border border-transparent hover:border-purple-300 hover:shadow-md transition-all duration-300 ${className}`}
    whileHover={{ 
      scale: 1.03,
      transition: { duration: 0.2 } 
    }}
  >
    <Link href={`/tests/${test.id}`} className="block relative">
      <div className="flex items-center p-3 relative">
        <div className="w-24 h-24 flex-shrink-0 mr-4 relative rounded-md overflow-hidden">
          <img 
            src={test.imageUrl} 
            alt={test.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* 호버 효과를 위한 오버레이 */}
          <div className="absolute inset-0 bg-purple-500/0 hover:bg-purple-500/10 transition-colors duration-300"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg text-gray-800 leading-tight line-clamp-2 hover:text-purple-600 transition-colors duration-200">
              {test.title}
            </h3>
            <div className="flex gap-1 ml-2 flex-shrink-0">
              {test.isNew && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded shadow-sm flex items-center justify-center h-5">
                  NEW
                </span>
              )}
              {test.isPopular && (
                <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded shadow-sm flex items-center justify-center h-5">
                  <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                  인기
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <span className="flex items-center bg-gray-50 px-2 py-1 rounded">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2분
            </span>
            <span className="flex items-center bg-gray-50 px-2 py-1 rounded">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {formatParticipants(test.participants)}
            </span>
          </div>
        </div>
        
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 호버 효과를 위한 오버레이 */}
      <div className="absolute inset-0 bg-purple-600/0 pointer-events-none transition-colors duration-300 hover:bg-purple-600/5"></div>
    </Link>
  </motion.div>
);

export default function Tests() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [showFilter, setShowFilter] = React.useState(false);

  // 참여자 수 포맷팅 함수
  const formatParticipants = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만명`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}천명`;
    }
    return `${count}명`;
  };

  // 필터링된 테스트 목록
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // 트렌딩 테스트 목록 (participants 기준으로 상위 5개)
  const trendingTests = [...tests]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 5);

  // 새로운 테스트 목록
  const newTests = tests.filter(test => test.isNew)
    .sort((a, b) => {
      // 참여자 수로 정렬
      return b.participants - a.participants;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[500px] mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">테스트 목록</h1>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-6 w-6" />
          </button>
        </div>

        {/* 검색바 */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="테스트 검색하기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* 필터 */}
        {showFilter && (
          <motion.div 
            className="mb-4 bg-white p-3 rounded-lg shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-xs px-3 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 트렌딩 테스트 섹션 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🔥 트렌딩 테스트</h2>
          <motion.div 
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {trendingTests.map(test => (
              <TestCard 
                key={test.id} 
                test={test} 
                itemVariants={itemVariants}
                formatParticipants={formatParticipants}
              />
            ))}
          </motion.div>
        </section>

        {/* 새로운 테스트 섹션 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">✨ 새로운 테스트</h2>
          <motion.div 
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {newTests.map(test => (
              <TestCard 
                key={test.id} 
                test={test}
                itemVariants={itemVariants}
                formatParticipants={formatParticipants}
              />
            ))}
          </motion.div>
        </section>

        {/* 전체 테스트 섹션 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">📚 전체 테스트</h2>
          <motion.div 
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTests.map(test => (
              <TestCard 
                key={test.id} 
                test={test}
                itemVariants={itemVariants}
                formatParticipants={formatParticipants}
              />
            ))}
          </motion.div>

          {filteredTests.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
} 