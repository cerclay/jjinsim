"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Heart } from "lucide-react";
import { TEST_INFO } from "@/features/attachment-style/constants/testData";

export default function AttachmentStylePage() {
  const [key, setKey] = useState(Date.now());
  
  // 컴포넌트가 마운트될 때마다 키를 업데이트하여 이미지 캐싱 방지
  useEffect(() => {
    setKey(Date.now());
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">애착유형 테스트</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          12문제로 알아보는 나의 애착 유형! 연애할 때 당신은 어떤 스타일인가요?
        </p>
        
        {/* 직접 카드 구현 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto"
        >
          {/* 이미지 컨테이너 */}
          <div className="relative aspect-video overflow-hidden">
            {/* 정적 이미지 태그 - 직접 프로토콜 포함 하드코딩 */}
            <img 
              src={"https://blogger.googleusercontent.com/img/a/AVvXsEhSeBAqi0jvBtxRfKdRluimJJDwueigV1ENX5edBTxkWYhxLqjQuAzFj9vzsZxWUkuRI8ydD7EW_wwmudAYU3blDm87VmF0_5-QU7bwagpMxyz9uzJv1n4OcUM2Fv74AaxFWEViUpPGm09eyckvZhBYVxeJvSe_nmbiy-6ILyyTWyXvLPhJ_0D0vn8_MfQ?" + key}
              alt={TEST_INFO.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: 'center'
              }}
            />
            
            {/* 배경 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-md">
                {TEST_INFO.title}
              </h3>
              <p className="text-white/90 text-sm md:text-base mt-1 line-clamp-2 drop-shadow-sm">
                {TEST_INFO.description}
              </p>
            </div>
            
            <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
              <Clock size={12} className="mr-1" />
              {TEST_INFO.duration}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>{typeof TEST_INFO.participants === 'number' ? TEST_INFO.participants.toLocaleString() : TEST_INFO.participants}명 참여</span>
              </div>
              
              <div className="flex items-center">
                <Heart size={16} className="mr-1 text-rose-500" />
                <span>{typeof TEST_INFO.likes === 'number' ? TEST_INFO.likes.toLocaleString() : TEST_INFO.likes}</span>
              </div>
            </div>
            
            <Link href="/tests/attachment-style/test" passHref>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                테스트 시작하기
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 