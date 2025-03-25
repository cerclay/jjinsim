"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // 히어로 카드 데이터 - 타로상담가가 첫 번째로 나오도록 순서 변경
  const heroCards = [
    {
      id: 'tarot-consultation',
      title: '타로 상담가',
      description: '과거, 현재, 미래를 알려주는 타로 상담',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEj_hF5utgruPeM3jXtQ_g4rT3adEXQLLP89T8NuV7OSZdpONbuMmfrcr_1RKEgKThk3E5R2QoVl8M3crn9k-IER-AKntLOG3Yiz-UdsKzHmOX89HY0h589ifmbTAs36uR4KGSRWAAXbzeSdwdJpOji0bYiBwEU5g0oCb_676HFug_rn3_6v7RlwmE3uIUM',
      color: 'from-purple-500/30 via-purple-500/20 to-black/70'
    },
    {
      id: 'personal-color',
      title: '퍼스널컬러 테스트',
      description: '당신에게 어울리는 컬러를 찾아보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      color: 'from-pink-500/30 via-pink-500/20 to-black/70'
    },
    {
      id: 'color-blindness',
      title: '색맹 테스트',
      description: '당신의 색각 능력을 테스트해보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
      color: 'from-blue-500/30 via-blue-500/20 to-black/70'
    }
  ];

  // 자동 회전 효과
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroCards.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroCards.length]);

  return (
    <motion.div 
      className="py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 카드 슬라이더 */}
      <div className="relative h-[250px] w-full overflow-hidden rounded-xl shadow-xl">
        {heroCards.map((card, index) => {
          const isActive = index === currentIndex;
          const isPrev = (index === currentIndex - 1) || (currentIndex === 0 && index === heroCards.length - 1);
          const isNext = (index === currentIndex + 1) || (currentIndex === heroCards.length - 1 && index === 0);
          
          return (
            <motion.div
              key={card.id}
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{
                x: isActive ? 0 : isPrev ? '-100%' : isNext ? '100%' : (index < currentIndex ? '-100%' : '100%'),
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.9,
                zIndex: isActive ? 10 : 0
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
            >
              <Link href={`/tests/${card.id}`}>
                <div className="relative w-full h-full cursor-pointer">
                  <div className="absolute inset-0">
                    <Image 
                      src={card.imageUrl} 
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={index === currentIndex}
                    />
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h2 className="text-white font-extrabold text-2xl drop-shadow-lg">{card.title}</h2>
                    <p className="text-white/90 text-sm mt-1 drop-shadow-md">{card.description}</p>
                    
                    <div className="mt-3">
                      <motion.span 
                        className="inline-block bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                          textShadow: "0 0 8px rgba(0,0,0,0.3)",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        테스트 시작하기
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        
        {/* 페이지네이션 인디케이터 */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`카드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
      
      {/* 검색창 */}
      <motion.div 
        className="relative mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="relative bg-white shadow-lg rounded-full p-1 border border-gray-100">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="원하는 테스트를 검색해보세요" 
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 py-2 px-4 rounded-full focus:outline-none text-sm"
              aria-label="검색"
            />
            <motion.button 
              type="button"
              className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-2 ml-1 transition-colors duration-200"
              aria-label="검색하기"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 