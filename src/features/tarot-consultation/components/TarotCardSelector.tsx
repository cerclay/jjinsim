"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TarotCard, MAJOR_ARCANA } from "../constants/tarot-cards";
import { Sparkles, Info, ShuffleIcon } from "lucide-react";
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import styles from './TarotCardSelector.module.css';
import confetti from 'canvas-confetti';

type TarotCardSelectorProps = {
  onCardsSelected: (cards: { card: TarotCard; isReversed: boolean }[]) => void;
  maxCards?: number;
  isLoading?: boolean;
};

export function TarotCardSelector({
  onCardsSelected,
  maxCards = 3,
  isLoading = false,
}: TarotCardSelectorProps) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; isReversed: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);

  // 덱 섞기
  useEffect(() => {
    shuffleDeck();
  }, []);

  // 카드 선택 완료 시 부모 컴포넌트에 전달
  useEffect(() => {
    if (selectedCards.length === maxCards) {
      setIsSelectionComplete(true);
      setTimeout(() => {
        onCardsSelected(selectedCards);
      }, 2000); // 모든 카드가 플립된 후에 결과 전달
    }
  }, [selectedCards, maxCards, onCardsSelected]);

  const shuffleDeck = () => {
    setIsShuffling(true);
    setSelectedCards([]);
    setFlippedCards([]);
    
    // 랜덤으로 카드 섞기
    setTimeout(() => {
      const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
      setShuffledDeck(shuffled);
      setIsShuffling(false);
    }, 800);
  };

  const handleCardSelect = (selection: { card: TarotCard; isReversed: boolean }) => {
    if (selectedCards.length < maxCards && !isLoading && !isShuffling) {
      // 이미 선택된 카드인지 확인
      if (selectedCards.some(item => item.card.id === selection.card.id)) {
        return;
      }
      
      // 카드 선택 추가
      const newSelectedCards = [...selectedCards, selection];
      setSelectedCards(newSelectedCards);
      
      // 마지막 카드 선택 완료시 축하 효과
      if (newSelectedCards.length === maxCards) {
        triggerConfetti();
      }
    }
  };

  const flipCard = (index: number) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  // 파티클 효과
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // 카드 위치 정보
  const cardPositions = [
    { name: "과거", description: "당신의 과거가 현재에 미치는 영향을 보여줍니다" },
    { name: "현재", description: "현재 당신이 직면한 상황을 나타냅니다" },
    { name: "미래", description: "앞으로의 가능성과 방향성을 제시합니다" }
  ];

  // 카드 뒷면 이미지 
  const cardBackImage = '/images/tarot-back.jpg';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 안내 메시지 */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white/90 rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-purple-800 flex items-center">
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  타로 카드 선택 방법
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  닫기
                </button>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 font-bold w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>카드를 섞은 후, 직관에 따라 세 장의 카드를 선택하세요.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 font-bold w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>각 카드는 과거, 현재, 미래를 나타냅니다.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 font-bold w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>선택한 카드는 자동으로 배치되며, 세 장 모두 선택 후 타로 해석이 시작됩니다.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 선택된 카드 표시 영역 */}
      {selectedCards.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {selectedCards.map((selection, index) => {
            const { card, isReversed } = selection;
            const position = cardPositions[index];
            const isFlipped = flippedCards.includes(index);
            
            return (
              <div key={`position-${index}`} className="text-center">
                <div className="h-8 mb-1">
                  <h4 className="font-bold text-purple-700">{position.name}</h4>
                </div>
                
                <motion.div 
                  className="relative w-32 h-48 md:w-44 md:h-72 rounded-lg shadow-lg overflow-hidden"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ perspective: 1000 }}
                  onClick={() => flipCard(index)}
                >
                  {/* 카드 뒷면 */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
                    }}
                  >
                    <div className="w-full h-full bg-blue-800 rounded-lg border-4 border-gold flex items-center justify-center">
                      <Image 
                        src={cardBackImage} 
                        alt="타로 카드 뒷면" 
                        width={160} 
                        height={250}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* 카드 앞면 */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: isFlipped ? 'rotateY(0)' : 'rotateY(-180deg)'
                    }}
                  >
                    <div className={`w-full h-full ${isReversed ? 'rotate-180' : ''}`}>
                      <Image 
                        src={card.imageUrl} 
                        alt={card.name}
                        width={160} 
                        height={250}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <div className="mt-2">
                  {isFlipped ? (
                    <h4 className="font-medium text-purple-800">{card.name}</h4>
                  ) : (
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      탭하여 확인
                    </span>
                  )}
                </div>
                
                <p className="text-xs mt-1 text-gray-700 max-w-[160px] mx-auto">
                  {position.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* 카드 덱 영역 */}
      <div className={`grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4 justify-center px-2 md:px-0 mb-8 ${isSelectionComplete ? 'opacity-50 pointer-events-none' : ''}`}>
        {shuffledDeck.slice(0, 21).map((card, index) => {
          const isSelected = selectedCards.some(s => s.card.id === card.id);
          
          return (
            <motion.div
              key={card.id}
              className={`relative cursor-pointer transition-all ${isSelected ? 'opacity-40' : 'hover:scale-105'}`}
              onClick={() => handleCardSelect({ card, isReversed: Math.random() > 0.7 })}
              whileHover={!isSelected ? { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" } : {}}
              whileTap={!isSelected ? { scale: 0.95 } : {}}
              animate={isShuffling ? { rotateY: [0, 180, 0], scale: [1, 1.1, 1] } : {}}
              transition={isShuffling ? { duration: 0.8 } : { duration: 0.2 }}
            >
              <div 
                className={`w-full aspect-[2/3] rounded-lg overflow-hidden border-4 ${isSelected ? 'border-purple-300' : 'border-gray-300 hover:border-purple-500'}`}
              >
                <div className="w-full h-full rounded-md flex items-center justify-center">
                  <Image 
                    src={cardBackImage}
                    alt="타로 카드" 
                    width={100} 
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {selectedCards.findIndex(s => s.card.id === card.id) + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* 선택 상태 및 안내 메시지 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          {selectedCards.length === 0 ? (
            <p>첫 번째 카드를 선택해주세요. (과거)</p>
          ) : selectedCards.length === 1 ? (
            <p>두 번째 카드를 선택해주세요. (현재)</p>
          ) : selectedCards.length === 2 ? (
            <p>세 번째 카드를 선택해주세요. (미래)</p>
          ) : (
            <p className="text-purple-600 font-medium">
              카드 선택 완료! 타로 해석 중...
              {isLoading && <Spinner className="inline w-4 h-4 ml-2" />}
            </p>
          )}
        </div>
        
        {selectedCards.length === 0 && !isLoading && (
          <motion.button
            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={shuffleDeck}
            disabled={isShuffling || isLoading}
          >
            {isShuffling ? (
              <>
                <Spinner className="inline w-4 h-4 mr-2" />
                카드 섞는 중...
              </>
            ) : (
              <>
                <ShuffleIcon className="w-4 h-4 mr-2" />
                카드 다시 섞기
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
} 