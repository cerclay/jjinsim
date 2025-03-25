"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TarotCard } from "../constants/tarot-cards";
import { Sparkles, Star, Clock, RefreshCw, ZapIcon, Share2, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

// motion 컴포넌트 타입 정의
const MotionDiv = motion.div;

type TarotReadingProps = {
  cards: { card: TarotCard; isReversed: boolean }[];
  reading: string;
  concern: string;
  onReset: () => void;
};

export function TarotReading({
  cards,
  reading,
  concern,
  onReset,
}: TarotReadingProps) {
  const [showCard, setShowCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [fortunePhrases] = useState([
    "오늘의 운세가 매우 좋습니다!",
    "행운이 당신을 기다리고 있어요!",
    "기분 좋은 변화가 찾아올 거예요!",
    "오늘 하루 행운이 함께 하길 바랍니다!",
    "새로운 기회가 찾아올 거예요!"
  ]);
  const [randomPhrase, setRandomPhrase] = useState("");
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [showMagicEffect, setShowMagicEffect] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [colorScheme, setColorScheme] = useState({
    primary: "rgb(147, 51, 234)",
    secondary: "rgb(192, 132, 252)",
    accent: "rgb(250, 204, 21)",
  });

  // 랜덤 색상 테마 설정
  useEffect(() => {
    const themes = [
      {
        primary: "rgb(147, 51, 234)", // 보라색
        secondary: "rgb(192, 132, 252)",
        accent: "rgb(250, 204, 21)", // 노란색
      },
      {
        primary: "rgb(37, 99, 235)", // 파란색
        secondary: "rgb(96, 165, 250)",
        accent: "rgb(251, 146, 60)", // 주황색
      },
      {
        primary: "rgb(6, 148, 162)", // 청록색
        secondary: "rgb(45, 212, 191)",
        accent: "rgb(249, 115, 22)", // 주황색
      },
      {
        primary: "rgb(220, 38, 38)", // 빨간색
        secondary: "rgb(248, 113, 113)",
        accent: "rgb(251, 191, 36)", // 노란색
      },
    ];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setColorScheme(randomTheme);
  }, []);

  useEffect(() => {
    // 순차적으로 카드 표시
    const timer = setTimeout(() => {
      setShowCard(0);
    }, 500);

    // 랜덤 행운 문구 선택
    setRandomPhrase(fortunePhrases[Math.floor(Math.random() * fortunePhrases.length)]);

    // 축하 효과
    triggerCelebration();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showCard !== null && showCard < cards.length - 1) {
      const timer = setTimeout(() => {
        setShowCard(showCard + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showCard, cards.length]);

  const triggerCelebration = () => {
    // 화면 상단에서 색종이 효과
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.1, x: 0.5 }
    });
    
    // 잠시 후 양쪽에서도 색종이 효과
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 }
      });
      
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 }
      });
    }, 1000);
  };

  // 위치에 따른 타이틀 가져오기
  const getPositionTitle = (index: number) => {
    return ['과거', '현재', '미래'][index];
  };

  // 결과 텍스트 파싱 및 포맷팅
  const formatReading = (text: string) => {
    // 구분자로 문단 나누기 (줄바꿈 두 번 또는 특정 문자열)
    const paragraphs = text.split(/\n\n|\r\n\r\n|<br\/><br\/>/).filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => {
      // 첫 문단은 일반적으로 소개/요약
      if (index === 0) {
        return (
          <p key={`intro-${index}`} className="text-lg font-semibold mb-4 text-purple-800">
            {paragraph}
          </p>
        );
      }
      
      // 나머지 문단
      return (
        <p key={`p-${index}`} className="mb-3 text-gray-800 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  // 결과 카피
  const copyToClipboard = () => {
    const textToCopy = `🔮 타로 상담 결과 🔮\n\n고민: ${concern}\n\n${reading}\n\n✨ 더 자세한 타로 상담은 앱에서 확인하세요! ✨`;
    
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('클립보드 복사 실패:', err);
      }
    );
  };

  // 재미있는 행운의 문구
  const luckyPhrases = [
    "오늘의 행운 숫자: " + Math.floor(Math.random() * 100),
    "행운의 색상: " + ["빨간색", "파란색", "노란색", "보라색", "초록색"][Math.floor(Math.random() * 5)],
    "행운의 방향: " + ["동쪽", "서쪽", "남쪽", "북쪽"][Math.floor(Math.random() * 4)],
    "오늘의 운세: " + ["매우 좋음", "좋음", "보통", "조심할 것"][Math.floor(Math.random() * 4)],
    "행운의 음식: " + ["피자", "초밥", "떡볶이", "치킨", "샐러드"][Math.floor(Math.random() * 5)]
  ];

  // 랜덤 행운 문구 선택
  const randomLuckyPhrases = [...luckyPhrases].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* 상단 영역 */}
      <div 
        className="rounded-t-2xl p-4 sm:p-6 relative overflow-hidden"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
          backgroundSize: 'cover',
          opacity: 0.1
        }} />
        
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-white flex items-center mb-2">
              <Sparkles className="inline-block mr-2" size={20} />
              타로 상담 결과
            </h2>
            
            <div className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm flex items-center">
              <Clock size={14} className="mr-1" />
              {new Date().toLocaleDateString('ko-KR')}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
            <p className="text-white/90 text-sm">
              <span className="font-medium">당신의 고민:</span> {concern}
            </p>
          </div>
          
          {/* 선택된 카드 표시 */}
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 -mx-2 px-2">
            {cards.map((cardData, index) => {
              const { card, isReversed } = cardData;
              const position = { name: getPositionTitle(index), description: "" };
              const isActive = activeCardIndex === index;
              
              return (
                <MotionDiv
                  key={`card-${index}`}
                  className="flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  onClick={() => setActiveCardIndex(isActive ? null : index)}
                >
                  <MotionDiv 
                    className={`bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-yellow-300 shadow-lg' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    animate={isActive ? { y: -5 } : { y: 0 }}
                  >
                    <div className="text-white/80 text-xs mb-1">{position.name}</div>
                    <div
                      className={`w-16 h-28 md:w-20 md:h-32 rounded-lg shadow-lg overflow-hidden relative ${isReversed ? 'rotate-180' : ''}`}
                      style={{ 
                        backgroundImage: `url(${card.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      
                      {isActive && (
                        <MotionDiv 
                          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="p-1 text-white text-xs font-medium">
                            {card.name}
                          </div>
                        </MotionDiv>
                      )}
                    </div>

                    {isActive ? (
                      <MotionDiv 
                        className="mt-1.5 text-yellow-300 text-xs font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {isReversed ? '역방향' : '정방향'}
                      </MotionDiv>
                    ) : (
                      <div className="mt-1.5 text-white text-xs font-medium">
                        {card.name}
                      </div>
                    )}
                  </MotionDiv>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>

        {/* 매직 효과 */}
        <AnimatePresence>
          {showCard === cards.length - 1 && (
            <MotionDiv 
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <MotionDiv
                  animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.5, 1, 0]
                  }}
                  transition={{ duration: 2 }}
                >
                  <ZapIcon size={80} className="text-yellow-300" />
                </MotionDiv>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
      
      {/* 해석 내용 */}
      <div className="bg-white rounded-b-2xl shadow-xl p-4 sm:p-6 border-t-4" style={{ borderColor: colorScheme.primary }}>
        {/* 재미있는 행운 문구 */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          {randomLuckyPhrases.map((phrase, index) => (
            <MotionDiv 
              key={index}
              className="bg-purple-50 p-2 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="text-xs font-medium text-purple-800">{phrase}</div>
            </MotionDiv>
          ))}
        </div>

        <AnimatePresence>
          <div className="space-y-4 mb-8">
            {formatReading(reading)}
          </div>
        </AnimatePresence>
        
        {/* 행동 버튼 영역 */}
        <MotionDiv 
          className="flex flex-wrap gap-3 justify-center mt-8 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <MotionDiv
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
          >
            <RefreshCw size={16} />
            다시 상담하기
          </MotionDiv>

          <MotionDiv
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${copied ? 'bg-gray-100 text-gray-700' : 'bg-purple-100 text-purple-800'} font-medium hover:bg-purple-200 transition-colors shadow-md`}
            whileHover={{ scale: copied ? 1 : 1.03 }}
            whileTap={{ scale: copied ? 1 : 0.97 }}
            onClick={!copied ? copyToClipboard : undefined}
          >
            {copied ? (
              <>
                <Copy size={16} />
                복사됨!
              </>
            ) : (
              <>
                <Share2 size={16} />
                공유하기
              </>
            )}
          </MotionDiv>
        </MotionDiv>
        
        {/* 추천 및 면책 */}
        <MotionDiv 
          className="mt-6 pt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-start gap-2 mb-4">
            <Star className="text-yellow-500 flex-shrink-0 mt-0.5" size={18} fill="currentColor" />
            <p className="text-sm text-gray-700">
              <span className="font-medium">타로 팁:</span> 이 해석 결과를 참고하되, 하루에 너무 많은 타로 상담은 삼가세요. 하루 뒤에 다시 타로를 보면 더 명확한 답을 얻을 수 있어요!
            </p>
          </div>
          
          {/* 면책 사항 */}
          <div className="text-xs text-gray-500 italic text-center p-3 bg-gray-50 rounded-lg">
            * 이 타로 상담은 재미로 보는 콘텐츠입니다. 중요한 결정은 스스로 판단하시기 바랍니다. <br/>
            * "왜 타로 카드가 그렇게 자꾸 틀려?" — 수많은 답변에 지친 타로 카드의 한숨
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
} 