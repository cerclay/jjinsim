"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Star } from 'lucide-react';

// 인기 테스트 데이터
const popularTests = [
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://picsum.photos/id/1054/400/400',
    participants: 157842,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'mbti-deep',
    title: 'MBTI 심층 분석',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    participants: 125689,
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

export default function PopularTests() {
  const [searchTerm, setSearchTerm] = React.useState('');

  // 필터링된 테스트 목록
  const filteredTests = popularTests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
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
          <h1 className="text-xl font-bold text-purple-900">인기 테스트</h1>
          <div className="w-8"></div> {/* 빈 공간으로 가운데 정렬 맞추기 */}
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

        <motion.div 
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTests.map(test => (
            <motion.div
              key={test.id}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-sharp"
            >
              <Link href={`/tests/${test.id}`}>
                <div className="relative">
                  <div className="aspect-[1/1] bg-gray-200 relative overflow-hidden">
                    <img 
                      src={test.imageUrl} 
                      alt={test.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    {test.isNew && (
                      <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                      인기
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 line-clamp-1">{test.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {test.participants.toLocaleString()}명 참여
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
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
      </div>
    </div>
  );
} 