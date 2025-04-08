"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

// 영상 목록 데이터 (videos/page.tsx와 동일한 데이터 사용)
const videos = [
  {
    id: "video1",
    title: "사전 예약 해택 첫번째 영상",
    subtitle: "수의회의 본질 PART",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    thumbnailUrl: null,
    duration: "27:32",
    description: "치매 예방을 위한 인지 활동 방법을 알아봅니다.",
    fullDescription: "본 영상에서는 치매 예방을 위한 다양한 인지 활동 방법들을 소개합니다. 전문가의 조언과 함께 일상생활에서 쉽게 적용할 수 있는 두뇌 활성화 방법을 배울 수 있습니다. 규칙적인 인지 활동은 치매 예방에 큰 도움이 될 수 있습니다."
  },
  {
    id: "video2",
    title: "사전 예약 해택 두번째 영상",
    subtitle: "비개발자 개발 PART", 
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    thumbnailUrl: null,
    duration: "31:05",
    description: "일상에서 할 수 있는 두뇌 트레이닝 방법을 소개합니다.",
    fullDescription: "일상생활에서 쉽게 실천할 수 있는 두뇌 트레이닝 방법들을 상세하게 소개합니다. 두뇌 활동을 촉진하는 간단한 게임, 퍼즐, 그리고 일상 습관들을 통해 인지 기능을 향상시키는 방법을 알아보세요. 꾸준한 두뇌 활동은 장기적인 인지 건강에 도움이 됩니다."
  },
  {
    id: "video3",
    title: "치매 예방 두뇌 운동",
    subtitle: "전문가 추천 운동법",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    thumbnailUrl: null,
    duration: "15:42",
    description: "전문가가 알려주는 가정에서 할 수 있는 두뇌 활성화 운동법",
    fullDescription: "신경과 전문의가 추천하는 가정에서 손쉽게 할 수 있는 두뇌 활성화 운동법을 배워봅니다. 신체 활동과 두뇌 활동을 결합한 효과적인 운동 방법으로, 정기적인 실천은 노화에 따른 인지 기능 저하를 늦추는 데 도움이 될 수 있습니다."
  },
  {
    id: "video4",
    title: "인지 기능 향상 식단",
    subtitle: "건강한 식습관 만들기",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    thumbnailUrl: null,
    duration: "22:18",
    description: "뇌 건강에 좋은 식품과 식단 구성 방법을 알아봅니다.",
    fullDescription: "뇌 건강에 도움이 되는 식품들과 균형 잡힌 식단 구성 방법을 소개합니다. 오메가-3 지방산, 항산화 물질이 풍부한 식품, 그리고 지중해식 식단과 같은 뇌 건강에 좋은 식습관에 대해 알아보세요. 영양사의 조언을 바탕으로 한 실질적인 식단 계획도 함께 제공됩니다."
  },
  {
    id: "video5",
    title: "치매 위험 신호 알아보기",
    subtitle: "조기 발견의 중요성",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
    thumbnailUrl: null,
    duration: "18:45",
    description: "치매의 초기 증상과 위험 신호를 알아보는 영상입니다.",
    fullDescription: "치매의 초기 증상과 경고 신호에 대해 상세히 알아봅니다. 단순한 노화와 치매 증상의 차이점, 주의해야 할 행동 변화, 그리고 이러한 신호를 발견했을 때 취해야 할 조치에 대해 설명합니다. 조기 발견은 적절한 관리와 치료에 중요한 역할을 합니다."
  },
  {
    id: "video6",
    title: "노년기 두뇌 건강 관리법",
    subtitle: "활기찬 노후 생활을 위한 팁",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
    thumbnailUrl: null,
    duration: "24:30",
    description: "노년기 건강한 두뇌 유지를 위한 생활 습관을 알아봅니다.",
    fullDescription: "노년기에 건강한 두뇌를 유지하기 위한 종합적인 생활 습관과 활동들을 소개합니다. 사회적 교류의 중요성, 새로운 취미 활동, 규칙적인 운동, 적절한 수면과 스트레스 관리 등 활기찬 노후 생활을 위한 실질적인 조언을 제공합니다."
  }
];

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;
  
  // 현재 비디오 찾기
  const currentVideo = videos.find(video => video.id === videoId);
  
  // 다른 추천 비디오 (현재 비디오 제외)
  const recommendedVideos = videos.filter(video => video.id !== videoId).slice(0, 3);
  
  if (!currentVideo) {
    return (
      <div className="py-8 px-4 text-center">
        <p>비디오를 찾을 수 없습니다.</p>
        <Link 
          href="/dementia-test/videos" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>모든 비디오 보기</span>
        </Link>
      </div>
    );
  }

  return (
    <main className="py-8 px-4 bg-white text-black">
      <div className="max-w-[500px] mx-auto space-y-8">
        <div>
          <Link 
            href="/dementia-test/videos" 
            className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">모든 영상 보기</span>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video bg-black relative">
            {/* 실제 영상이 있을 경우 iframe으로 대체 */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <span className="text-gray-400">영상이 로드되지 않았습니다</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">{currentVideo.title}</h1>
          <p className="text-lg text-gray-600 mt-1">{currentVideo.subtitle}</p>
          <div className="mt-4 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {currentVideo.duration}
            </span>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">설명</h2>
            <p className="text-gray-600">{currentVideo.fullDescription}</p>
          </div>
        </motion.div>
        
        {recommendedVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">추천 영상</h2>
            <div className="space-y-4">
              {recommendedVideos.map((video, index) => (
                <Link href={`/dementia-test/videos/${video.id}`} key={video.id}>
                  <Card className="p-3 hover:shadow-md transition-shadow duration-300">
                    <div className="flex gap-3">
                      <div className="w-24 h-16 bg-gray-100 relative flex-shrink-0">
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[10px] px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{video.subtitle}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 