"use client";

import { useState, useEffect } from "react";
import { TPowerResult } from "../data/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Share2, RotateCcw } from "lucide-react";

interface TPowerResultCardProps {
  result: TPowerResult;
  onRestart: () => void;
}

export default function TPowerResultCard({ result, onRestart }: TPowerResultCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // 0.5초 후에 영수증 잘라내는 효과를 위한 confetti 활성화
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm:ss");
  const receiptId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const testId = `T-PWR-${Math.floor(Math.random() * 1000000)}`;

  // 애니메이션 변수
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const textLines = result.description.split('. ');

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9, rotateZ: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }}
        transition={{ 
          duration: 0.8, 
          type: "spring", 
          stiffness: 200, 
          damping: 25 
        }}
        className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 relative"
      >
        {/* 영수증 상단 장식 */}
        <motion.div 
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-28 h-12 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-t-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="absolute bottom-0 left-0 w-full h-8 bg-white rounded-t-lg"></div>
        </motion.div>
        
        {/* 영수증 제목 및 헤더 */}
        <div className="pt-8 px-7 pb-7 bg-gradient-to-r from-indigo-50 to-sky-50 border-b-2 border-dashed border-indigo-200">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold text-indigo-700">T발력 테스트 결과</h2>
              <span className="text-sm text-gray-600 font-medium">{currentDate}</span>
            </motion.div>
            <motion.div variants={item} className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-medium">결과 출력 시간: {currentTime}</p>
              <p className="text-sm text-gray-600 font-medium">No. {receiptId}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* 영수증 내용 */}
        <div className="p-7">
          <motion.div 
            className="text-center mb-6 py-3 border-b-2 border-dashed border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-indigo-800 mb-2">{result.title}</h3>
            <p className="text-lg text-indigo-600 font-medium">{result.description}</p>
          </motion.div>

          <div className="border-b-2 border-dashed border-indigo-100 py-5 mb-5">
            <motion.div
              className="mb-5 bg-gray-50 py-4 px-3 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            >
              <motion.p 
                className="text-center text-indigo-700 bg-indigo-50 py-2 px-4 rounded-full inline-block mx-auto font-medium text-base mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {result.fun_tag}
              </motion.p>
              
              <div className="flex justify-between items-center border-t border-b border-dashed border-gray-300 py-2 my-3">
                <span className="text-base text-gray-600 font-medium">T발놈 지수:</span>
                <span className="text-lg">
                  {result.title === "치유계 감성파" && "★☆☆☆☆ (1/5)"}
                  {result.title === "학원물 서브주연" && "★★☆☆☆ (2/5)"}
                  {result.title === "성장형 소년만화 주인공" && "★★★☆☆ (3/5)"}
                  {result.title === "이과 천재 캐릭터" && "★★★★☆ (4/5)"}
                  {result.title === "츤데레 상위보스" && "★★★★★ (5/5)"}
                </span>
              </div>
            </motion.div>
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3 bg-white border border-indigo-100 rounded-lg p-4 shadow-sm"
            >
              <motion.p
                variants={item}
                className="text-gray-700 leading-relaxed text-lg text-center font-medium"
              >
                {result.title === "치유계 감성파" && "넌 따뜻한 햇살처럼 사람들의 상처를 어루만지는 치유계 캐릭터! 논리? 직설? 그런 건 몰라도 네 한마디면 모두가 너한테 기대고 싶어져. 애니에서 네가 없으면 모두 멘탈 붕괴 온다 😌"}
                {result.title === "학원물 서브주연" && "학원 로맨스에서 주인공들 갈등 날 때마다 딱 나타나서 \"야야 일단 진정해봐\" 해주는 조율자! 근데 그런 네가 가끔 진심을 내비칠 땐... 주연보다 더 빛난다고? ✨"}
                {result.title === "성장형 소년만화 주인공" && "처음엔 감정적이었지만, 고난과 전투 속에서 이제 '감성과 이성'을 동시에 쓸 줄 아는 진짜 주인공! 사람 냄새 나지만, 의외로 싸울 땐 치밀한 계산도 한다고? 🔥"}
                {result.title === "이과 천재 캐릭터" && "감정보다는 팩트를 중시하고, 말보단 수치를 믿는 이과 천재! 대화 중 \"그건 논리적 오류인데?\" 같은 멘트를 툭 던져서 주변을 얼어붙게 만드는 찐 천재. 🧠"}
                {result.title === "츤데레 상위보스" && "완전 직진형 캐릭터. 말에 여과 장치 없음. 틀렸으면 틀렸다고 말하는 츤데레. 근데 은근 매력있는 이유는 뭘까? 속으론 챙기고 있다는 거 다 알고 있다! ⚡"}
              </motion.p>
            </motion.div>
          </div>

          <motion.div 
            className="pt-2 bg-gray-50 p-4 rounded-lg"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="border-b border-dashed border-gray-300 pb-2 mb-3">
              <p className="text-center text-sm text-gray-500 font-mono">--- 테스트 정보 ---</p>
            </div>
            <motion.div variants={item} className="flex justify-between mb-3">
              <span className="text-base text-gray-600 font-medium">테스트 ID:</span>
              <span className="text-indigo-600 font-mono font-bold">{testId}</span>
            </motion.div>
            <motion.div variants={item} className="flex justify-between mb-3">
              <span className="text-base text-gray-600 font-medium">점수 범위:</span>
              <span className="text-indigo-600 font-medium text-lg">{result.range}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* 영수증 푸터 */}
        <div className="bg-gradient-to-r from-indigo-50 to-sky-50 p-7 border-t-2 border-dashed border-indigo-200">
          <div className="flex items-center justify-center mb-4">
            <div className="h-10 w-10 bg-white border-2 border-indigo-200 rounded-full flex items-center justify-center">
              <span className="text-lg">👋</span>
            </div>
          </div>
          <p className="text-center text-base text-gray-600 font-medium mb-6">
            본 결과는 엄격한 과학적 검증을 거치지 않았으며, 재미로만 봐주세요!
          </p>
          
          <div className="flex space-x-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button 
                onClick={onRestart} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6 font-medium rounded-xl"
                variant="default"
              >
                <RotateCcw size={18} className="mr-2" /> 다시 테스트하기
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 p-6 rounded-xl"
                variant="outline"
                onClick={() => {
                  // 공유 기능은 실제로 구현하지 않음
                  alert('결과를 공유합니다!');
                }}
              >
                <Share2 size={20} />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* 영수증 하단 장식 */}
        <div className="h-8 bg-white border-t-2 border-dashed border-indigo-200 relative overflow-hidden">
          <div className="absolute -left-4 top-0 h-8 w-8 bg-indigo-50 rounded-b-full"></div>
          <div className="absolute -right-4 top-0 h-8 w-8 bg-indigo-50 rounded-b-full"></div>
          
          {/* 잘라내는 가위 애니메이션 */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div 
                className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-gray-400 h-[2px] w-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-[-8px] left-0"
                  initial={{ left: "0%" }}
                  animate={{ left: "105%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <span className="text-xl">✂️</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 