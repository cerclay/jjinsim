"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 영상 목록 데이터
const videos = [
  {
    id: "video1",
    title: "사전 예약 해택 첫번째 영상",
    subtitle: "수의회의 본질 PART",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "27:32",
    description: "치매 예방을 위한 인지 활동 방법을 알아봅니다."
  },
  {
    id: "video2",
    title: "사전 예약 해택 두번째 영상",
    subtitle: "비개발자 개발 PART", 
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "31:05",
    description: "일상에서 할 수 있는 두뇌 트레이닝 방법을 소개합니다."
  },
  {
    id: "video3",
    title: "치매 예방 두뇌 운동",
    subtitle: "전문가 추천 운동법",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "15:42",
    description: "전문가가 알려주는 가정에서 할 수 있는 두뇌 활성화 운동법"
  },
  {
    id: "video4",
    title: "인지 기능 향상 식단",
    subtitle: "건강한 식습관 만들기",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "22:18",
    description: "뇌 건강에 좋은 식품과 식단 구성 방법을 알아봅니다."
  },
  {
    id: "video5",
    title: "치매 위험 신호 알아보기",
    subtitle: "조기 발견의 중요성",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "18:45",
    description: "치매의 초기 증상과 위험 신호를 알아보는 영상입니다."
  },
  {
    id: "video6",
    title: "노년기 두뇌 건강 관리법",
    subtitle: "활기찬 노후 생활을 위한 팁",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
    thumbnailUrl: null, // 실제 썸네일 URL 필요
    duration: "24:30",
    description: "노년기 건강한 두뇌 유지를 위한 생활 습관을 알아봅니다."
  }
];

export default function DementiaTestVideosPage() {
  return (
    <main className="py-8 px-4 bg-white text-black">
      <div className="max-w-[500px] mx-auto space-y-8">
        <div className="mb-10">
          <Link 
            href="/dementia-test" 
            className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">테스트 페이지로 돌아가기</span>
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mt-6 mb-2 text-black"
          >
            치매 예방 추천 영상
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600"
          >
            치매 예방과 인지 건강에 도움이 되는 영상 콘텐츠를 확인하세요.
          </motion.p>
        </div>
        
        <div className="space-y-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="overflow-hidden bg-white shadow border-none">
                <div className="aspect-video relative bg-gray-100">
                  {/* 실제 영상이 있을 경우 iframe으로 대체 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">영상 썸네일</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{video.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-2">{video.description}</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center">
                    영상 보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 