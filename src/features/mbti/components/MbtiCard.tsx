"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MbtiCardProps {
  title?: string;
  description?: string;
  duration?: string;
  participants?: string;
  onClick?: () => void;
}

export function MbtiCard({ title, description, duration, participants, onClick }: MbtiCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="shadow-xl rounded-xl overflow-hidden border-none relative cursor-pointer" onClick={onClick}>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200 opacity-95"></div>
        <div className="relative p-6 text-black z-10">
          <div className="absolute top-2 right-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="text-opacity-90 text-xl"
            >
              ✨
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold drop-shadow-md mb-2 text-black"
              >
                {title || "나의 MBTI 성격 유형은?"}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg font-medium text-gray-800 leading-relaxed"
              >
                {description || "12가지 질문으로 알아보는 나만의 성격 유형 테스트, 지금 바로 시작해보세요!"}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="pt-2"
              >
                <div className="flex flex-wrap gap-3">
                  <span className="bg-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    소요시간: {duration || "3분"}
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {participants || "10만명"} 참여
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button 
                  className="mt-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-6 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  테스트 시작하기
                </Button>
              </motion.div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute top-0 left-0 w-full h-full bg-white/50 rounded-2xl backdrop-blur-sm"></div>
              <div className="grid grid-cols-2 gap-4 p-4 relative">
                {['ENFP', 'INFJ', 'ESTP', 'ISTJ'].map((type, idx) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    className="bg-white/60 p-3 rounded-xl backdrop-blur-md shadow-lg border border-white/30"
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold mb-1 text-gray-800">{type}</div>
                      <div className="text-sm text-gray-700">
                        {idx === 0 ? '자유로운 영혼' : 
                         idx === 1 ? '신비한 통찰자' : 
                         idx === 2 ? '모험가' : '신중한 관리자'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-orange-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-pink-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-0 left-1/4 w-4 h-4 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-yellow-300/50 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-purple-400/40 rounded-full blur-sm"></div>
      </Card>
    </motion.div>
  );
} 