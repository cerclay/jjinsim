"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface TravelResultProps {
  result: string;
  resultData: {
    id: string;
    title: string;
    description: string;
    activities: string[];
    summary: string;
    gifUrl: string;
  } | null;
  onRestart: () => void;
  onShare: () => void;
}

export function TravelResult({ result, resultData, onRestart, onShare }: TravelResultProps) {
  if (!resultData) {
    return <div className="flex justify-center items-center h-96">결과를 불러오는 중...</div>;
  }

  // 비행기 티켓 스타일로 UI 구성
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      {/* GIF 부분 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex justify-center"
      >
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={resultData.gifUrl}
            alt={resultData.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </motion.div>

      {/* 티켓 디자인 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-rose-200"
      >
        {/* 티켓 상단부 */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute transform rotate-45 bg-white text-rose-500 font-bold text-xs py-1 px-4 -right-8 top-6">
              승인됨
            </div>
          </div>
          
          <h3 className="text-lg font-semibold uppercase tracking-wider opacity-80">여행매칭결과</h3>
          <h2 className="text-2xl font-bold mt-2 mb-4 tracking-tight">{resultData.title}</h2>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-70">승객</p>
              <p className="font-medium">당신</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">매치율</p>
              <p className="font-semibold text-xl">98%</p>
            </div>
          </div>
        </div>
        
        {/* 티켓 중앙부 */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">출발지</p>
              <p className="font-bold text-lg">HERE</p>
            </div>
            
            <div className="flex-1 px-4">
              <div className="relative flex items-center justify-center">
                <Separator className="absolute w-full h-[2px] bg-gray-200" />
                <div className="bg-white z-10 px-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5L17 1M17 1V5M17 1H21M3 19L7 23M7 23V19M7 23H3M14.5 7.5L19.5 19.5M12 8L9 4.5L3 9L8 12L12 8ZM8 12L9.5 15.5L12 17.5L16 19.5L19.5 19.5" stroke="#FF385C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500">도착지</p>
              <p className="font-bold text-lg">{result}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 my-4">{resultData.description}</p>
            
            <div className="mt-4 bg-rose-50 p-4 rounded-lg">
              <h4 className="font-bold text-rose-700 mb-2">추천 활동</h4>
              <ul className="space-y-1">
                {resultData.activities.map((activity, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="mr-2 text-rose-500">✓</span> {activity}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="mt-4 text-center font-medium text-lg text-gray-900">{resultData.summary}</p>
          </div>
          
          {/* 바코드 */}
          <div className="flex justify-center mt-6">
            <div className="h-16 w-48 relative">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_3px)] bg-[length:4px_100%]"></div>
            </div>
          </div>
        </div>
        
        {/* 티켓 하단부 (점선) */}
        <div className="border-t border-dashed border-gray-300 p-4 flex justify-center space-x-4">
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            다시 테스트하기
          </Button>
          
          <Button
            onClick={onShare}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            결과 공유하기
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
} 