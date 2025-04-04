"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { incrementParticipantCount } from "@/features/test-cards/api";

export default function TravelMatchPage() {
  const handleStartTest = async () => {
    try {
      // 테스트 ID를 적절히 설정해야 합니다
      await incrementParticipantCount('travel-match');
    } catch (error) {
      console.error('참여 카운트 증가 실패:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* 헤더 이미지 */}
          <div className="relative h-64 sm:h-80 w-full">
            <Image 
              src="https://blogger.googleusercontent.com/img/a/AVvXsEhe1IJZbi1eDWkyySuXPE5BVSa844H6IDBOn8uTdHQA5oaktH1WRxcd5BZE7EoPsvKbLYJHOIqQbjvEhVWjY4BUObiEwozxFgj7ocnDrWRc7NDP8zpebJAJ8bE7vahDnYD9X45kW78WqK5VIfIttMhj1wYliJWm3_ZC-3UO6nwiK7cPx_jycBhBCqoyYd4" 
              alt="나랑 잘 맞는 여행지는?" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">나랑 잘 맞는 여행지는?</h1>
              <p className="text-white/90 text-lg">12개의 질문으로 알아보는 당신의 여행 궁합!</p>
            </div>
          </div>
          
          {/* 컨텐츠 */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-rose-50 text-rose-600 rounded-full px-4 py-1 text-sm font-medium">
                참여자 2.3만명+
              </div>
              <div className="bg-blue-50 text-blue-600 rounded-full px-4 py-1 text-sm font-medium">
                테스트 시간 3분
              </div>
              <div className="bg-amber-50 text-amber-600 rounded-full px-4 py-1 text-sm font-medium">
                #여행 #성향테스트
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-4">나와 잘 맞는 여행지는 어디일까?</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                여행 스타일은 사람마다 천차만별! 누군가는 계획적인 여행을, 누군가는 즉흥적인 여행을 선호하죠.
                당신의 성향에 딱 맞는 여행지를 찾아드립니다.
              </p>
              
              <p>
                일상에서의 습관과 취향을 바탕으로 당신에게 가장 잘 맞는 여행지를 매칭해 드려요.
                교토부터 방콕까지, 당신의 여행 스타일에 꼭 맞는 여행지를 지금 확인해보세요!
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">테스트 결과 예시:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>꼼꼼한 계획러, 인터라켄 정령사</li>
                  <li>감성 충만, 교토 연금술사</li>
                  <li>유쾌한 식도락, 다낭 쉐프</li>
                  <li>그 외 3가지 타입!</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link href="/tests/travel-match/start" onClick={handleStartTest}>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg rounded-xl">
                  테스트 시작하기
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16V12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H12.01" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">심리학적 근거와 빅데이터 분석을 통해 만들어진 테스트입니다.</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
} 