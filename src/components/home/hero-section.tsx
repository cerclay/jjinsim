"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

export function HeroSection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // 히어로 카드 데이터
  const heroCards = [
    {
      id: 'tarot-consultation',
      titleKey: 'hero_tarot_title',
      descriptionKey: 'hero_tarot_description',
      categoryKey: 'hero_tarot_category',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
      color: 'from-purple-500/30 via-purple-500/20 to-black/70'
    },
    {
      id: 'personal-color',
      titleKey: 'hero_personal_color_title',
      descriptionKey: 'hero_personal_color_description',
      categoryKey: 'hero_personal_color_category',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      color: 'from-pink-500/30 via-pink-500/20 to-black/70'
    },
    {
      id: 'color-blindness',
      titleKey: 'hero_color_blindness_title',
      descriptionKey: 'hero_color_blindness_description',
      categoryKey: 'hero_color_blindness_category',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgeGzcb_BdpyZNglZW24ioN_ptB5ch7PZbw3nQQDDcWbnRcgupVnP2vGS3n6ijlPS4VTkF1PuqhceicDn-63UyyWBBbo6dGyj33az_VDC_4N7m9qersQPY-7H--tzwfE3CWB_wTyeBgys5KR6oz2IB3JFiKx7RQaVFm8q-POW9-Ae-EfrLGpr8WLMdYOho',
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
      className="py-3 max-w-[500px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 카드 슬라이더 */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-xl">
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
                      alt={t[card.titleKey]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority={index === currentIndex}
                    />
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs inline-block w-fit mb-2"
                    >
                      {t[card.categoryKey]}
                    </motion.div>
                    
                    <h2 className="text-white font-extrabold text-2xl drop-shadow-lg">{t[card.titleKey]}</h2>
                    <p className="text-white/90 text-sm mt-1 drop-shadow-md">{t[card.descriptionKey]}</p>
                    
                    <div className="mt-4">
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
                        {t.start_test}
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
              aria-label={`${t.move_to_card} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 