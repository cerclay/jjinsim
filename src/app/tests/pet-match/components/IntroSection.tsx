"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type IntroSectionProps = {
  onStart: () => void;
};

export const IntroSection = ({ onStart }: IntroSectionProps) => {
  return (
    <div className="flex flex-col items-center max-w-lg mx-auto">
      {/* 헤더 애니메이션 */}
      <motion.div 
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
          나랑 찰떡인 반려동물은?
        </h1>
        <div className="h-1 w-24 bg-purple-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600 text-lg">
          당신의 성격과 일상 습관을 바탕으로 운명처럼 맞는 동물 친구를 찾아드립니다!
        </p>
      </motion.div>

      {/* 이미지 그리드 */}
      <motion.div
        className="grid grid-cols-3 gap-2 mb-8 p-2 bg-white rounded-xl shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee" 
            alt="강아지" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13" 
            alt="고양이" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c" 
            alt="앵무새" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1535241749838-299277b6305f" 
            alt="거북이" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca" 
            alt="햄스터" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1615909245899-5c14bd583260" 
            alt="도마뱀" 
            width={150} 
            height={150} 
            className="object-cover w-full h-full"
          />
        </div>
      </motion.div>

      {/* 설명 및 시작 버튼 */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-gray-700">
            12개의 질문에 답하고 당신과 찰떡궁합인 반려동물을 찾아보세요!
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>약 2분 소요</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>12문항</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>재미로만 봐주세요</span>
          </div>
        </div>

        <Button 
          onClick={onStart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          테스트 시작하기
        </Button>
      </motion.div>
    </div>
  );
}; 