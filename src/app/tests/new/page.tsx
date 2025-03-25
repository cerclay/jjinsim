"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

// 신규 테스트 데이터
const newTests = [
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://picsum.photos/id/1054/400/400',
    participants: 157842,
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
  },
  {
    id: 'social-character',
    title: '사회생활 캐릭터는?',
    imageUrl: 'https://picsum.photos/id/1072/400/400',
    participants: 3845,
    isNew: true,
  },
  {
    id: 'flirting-style',
    title: '나의 썸탈때 유형은?',
    imageUrl: 'https://picsum.photos/id/1083/400/400',
    participants: 4127,
    isNew: true,
  },
  {
    id: 'healing-moment',
    title: '힐링모먼트 테스트',
    imageUrl: 'https://picsum.photos/id/1019/400/400',
    participants: 2934,
    isNew: true,
  },
  {
    id: 'multiple-personality',
    title: '다중인격 테스트',
    imageUrl: 'https://picsum.photos/id/177/400/400',
    participants: 5631,
    isNew: true,
  }
];

export default function NewTests() {
  const [searchTerm, setSearchTerm] = React.useState('');

  // 필터링된 테스트 목록
  const filteredTests = newTests.filter(test => 
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
          <h1 className="text-xl font-bold text-purple-900">새로운 테스트</h1>
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
                    <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                      NEW
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