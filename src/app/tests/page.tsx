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
      id: 't-power',
      title: '나의 T발력 수치는?',
      imageUrl: 'https://picsum.photos/id/1009/400/400',
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
      imageUrl: 'https://picsum.photos/id/1070/400/400',
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
    className={`bg-white rounded-xl overflow-hidden shadow-sharp hover:shadow-lg transition-shadow duration-300 ${className}`}
  >
    <div className="flex">
      <div className="w-32 h-32 flex-shrink-0 relative">
        <img 
          src={test.imageUrl} 
          alt={test.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {test.isNew && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800 text-lg">{test.title}</h3>
            {test.isPopular && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center ml-2">
                <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                인기
              </span>
            )}
          </div>
          {test.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{test.description}</p>
          )}
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              평균 2분
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {formatParticipants(test.participants)} 참여
            </span>
          </div>
        </div>
        <Link 
          href={`/tests/${test.id}`}
          className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
        >
          테스트 하기
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
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
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // 트렌딩 테스트 목록 (participants 기준으로 상위 5개)
  const trendingTests = [...tests]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 5);

  // 새로운 테스트 목록
  const newTests = tests.filter(test => test.isNew);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="flex items-center text-purple-800 font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>홈으로</span>
          </Link>
          <h1 className="text-xl font-bold text-purple-900">전체 테스트</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowFilter(!showFilter)}
            className="text-purple-800"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="테스트 검색"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {showFilter && (
          <motion.div 
            className="mb-4 bg-white p-3 rounded-xl shadow-sm"
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