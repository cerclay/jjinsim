"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // 히어로 카드 데이터
  const heroCards = [
    {
      id: 'iq-test',
      titleKey: 'hero_iq_humor_title',
      title: '나의 진짜 IQ는? 유머버전!',
      descriptionKey: 'hero_iq_humor_description',
      description: '15개의 재미있는 문제로 당신의 IQ를 측정해 보세요. 결과는 진지 반, 유쾌 반!',
      categoryKey: 'hero_iq_humor_category',
      category: '인기 테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
      color: 'from-purple-500/40 via-purple-500/30 to-black/80',
      badge: '신규'
    },
    {
      id: 'tarot-consultation',
      titleKey: 'hero_tarot_title',
      title: '타로 상담가',
      descriptionKey: 'hero_tarot_description',
      description: 'AI 타로 상담사가 당신의 운명을 풀어드립니다.',
      categoryKey: 'hero_tarot_category',
      category: '인기 테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
      color: 'from-purple-500/40 via-purple-500/30 to-black/80'
    },
    {
      id: 'personal-color',
      titleKey: 'hero_personal_color_title',
      title: '퍼스널 컬러 테스트',
      descriptionKey: 'hero_personal_color_description',
      description: '당신에게 어울리는 색상을 찾아보세요.',
      categoryKey: 'hero_personal_color_category',
      category: '인기 테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      color: 'from-pink-500/40 via-pink-500/30 to-black/80'
    },
    {
      id: 'color-blindness',
      titleKey: 'hero_color_blindness_title',
      title: '색맹 테스트',
      descriptionKey: 'hero_color_blindness_description',
      description: '당신의 색상 인식 능력을 테스트해보세요.',
      categoryKey: 'hero_color_blindness_category',
      category: '인기 테스트',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgeGzcb_BdpyZNglZW24ioN_ptB5ch7PZbw3nQQDDcWbnRcgupVnP2vGS3n6ijlPS4VTkF1PuqhceicDn-63UyyWBBbo6dGyj33az_VDC_4N7m9qersQPY-7H--tzwfE3CWB_wTyeBgys5KR6oz2IB3JFiKx7RQaVFm8q-POW9-Ae-EfrLGpr8WLMdYOho',
      color: 'from-blue-500/40 via-blue-500/30 to-black/80'
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
      className="py-3 max-w-[500px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 카드 슬라이더 */}
      <div className="relative h-[350px] w-full overflow-hidden rounded-xl shadow-xl mb-6">
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
                      alt={card.title || t[card.titleKey]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority={index === currentIndex}
                    />
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex justify-between items-center mb-2">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium inline-block w-fit"
                      >
                        {card.category || t[card.categoryKey]}
                      </motion.div>
                      
                      {card.badge && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-purple-600 px-3 py-1.5 rounded-full text-white text-xs font-medium inline-flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          {card.badge}
                        </motion.div>
                      )}
                    </div>
                    
                    <h2 className="text-white font-extrabold text-3xl drop-shadow-lg">{card.title || t[card.titleKey]}</h2>
                    <p className="text-white/90 text-sm mt-2 drop-shadow-md">{card.description || t[card.descriptionKey]}</p>
                    
                    <div className="mt-5">
                      <motion.span 
                        className="inline-flex items-center gap-2 bg-white/30 text-white px-5 py-2.5 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg"
                        whileHover={{ 
                          scale: 1.10, 
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          color: "#6029C1",
                          textShadow: "0 0 10px rgba(255,255,255,0.8)",
                          boxShadow: "0 0 20px rgba(255,255,255,0.4), 0 8px 20px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t.start_test || '테스트 시작하기'}
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        
        {/* 페이지네이션 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`${t.move_to_card || '카드로 이동'} ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* 상단 제목 섹션 */}
      <div className="text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-extrabold text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          재미있는 테스트를
        </motion.h1>
      </div>
    </motion.div>
  );
} 