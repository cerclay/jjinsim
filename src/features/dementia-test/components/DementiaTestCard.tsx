"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain } from "lucide-react";
import Image from "next/image";

export const DementiaTestCard: React.FC = () => {
  return (
    <Link href="/dementia-test">
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative aspect-video w-full">
          <Image 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgx7gG9KZiFpyBn66ujf8mAjnN9qIxIU8wO8le3WavHIofz-9LuYLeMUnd10ZWQc68ZYE32LOKdPIhak4dr83bWwQesN4lW4IF2CC8y3AVvWipNEFm-EYF4f7IfrpmiV3mvPeUaE7-yALTQz4CJ2bmCeN3iZLzPhFLDg6ofqYPm8LGaYyadNvJ1r6Oa4V4/s1280/MBTI.jpg" 
            alt="치매 간이 테스트" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            NEW
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">치매 간이 테스트</h3>
              </div>
              <p className="text-gray-600 mb-4">
                기억력, 지남력, 계산력 등 다양한 인지 기능을 평가하는 온라인 테스트입니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">기억력</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">지남력</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">계산능력</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">언어능력</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">소요시간: 약 3분</span>
                <div className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                  테스트 시작하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const DementiaVideosPreview: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <h3 className="text-lg font-bold text-gray-900">추천 영상</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/dementia-test/videos">
          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video relative bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">영상 썸네일</span>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                27:32
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-medium text-gray-800 line-clamp-2">치매 예방 수의회의 본질 PART</h4>
            </div>
          </motion.div>
        </Link>
        <Link href="/dementia-test/videos">
          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video relative bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">영상 썸네일</span>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                31:05
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-medium text-gray-800 line-clamp-2">치매 예방 비개발자 개발 PART</h4>
            </div>
          </motion.div>
        </Link>
      </div>
      <Link href="/dementia-test/videos">
        <div className="mt-3 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
          모든 영상 보기 →
        </div>
      </Link>
    </div>
  );
}; 