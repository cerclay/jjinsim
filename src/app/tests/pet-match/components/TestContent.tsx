'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, results, calculateResult } from '../data/test-data';

// 타입 정의
type Answer = {
  questionId: number;
  selectedType: string;
};

// 애니메이션 variants
const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
};

// 테스트 콘텐츠 컴포넌트
const TestContent: React.FC = () => {
  // 상태 관리
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [resultType, setResultType] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);

  // 창 크기 확인용 상태
  const [isMobile, setIsMobile] = useState(false);

  // 창 크기 확인 이펙트
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 테스트 시작
  const startTest = () => {
    setStep('test');
  };

  // 답변 선택
  const selectAnswer = (choiceType: string) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      selectedType: choiceType
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // 다음 질문 또는 결과로 이동
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 모든 질문에 답변했을 때 결과 계산
      const type = calculateResult(newAnswers);
      setResultType(type);
      setStep('result');
      setShowConfetti(true);
      
      // 3초 후 컨페티 효과 제거
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResultType('');
  };

  // 공유하기 기능
  const shareResult = () => {
    if (navigator.share && currentResult) {
      navigator.share({
        title: '나랑 찰떡인 반려동물은?',
        text: `내 성격과 찰떡인 반려동물은 ${currentResult.emoji} ${currentResult.title}이래요! 당신의 반려동물 궁합도 확인해보세요.`,
        url: window.location.href
      })
      .catch(error => console.log('공유하기 실패:', error));
    } else {
      // 클립보드에 복사
      const textToCopy = `내 성격과 찰떡인 반려동물은 ${currentResult?.emoji} ${currentResult?.title}이래요! 당신의 반려동물 궁합도 확인해보세요.\n${window.location.href}`;
      navigator.clipboard.writeText(textToCopy);
      alert('링크가 복사되었습니다! 친구들에게 공유해보세요.');
    }
  };

  // 현재 결과 찾기
  const currentResult = results.find(result => result.type === resultType);

  // 배경색 클래스 선택
  const getBgColorClass = () => {
    if (step === 'result' && currentResult) {
      switch (currentResult.type) {
        case 'dog': return 'from-amber-50 to-yellow-100';
        case 'cat': return 'from-slate-50 to-blue-100';
        case 'turtle': return 'from-emerald-50 to-green-100';
        case 'hamster': return 'from-orange-50 to-rose-100';
        case 'parrot': return 'from-sky-50 to-indigo-100';
        case 'lizard': return 'from-lime-50 to-teal-100';
        default: return 'from-blue-50 to-purple-50';
      }
    }
    return 'from-blue-50 to-purple-50';
  };

  return (
    <div className={`max-w-[500px] w-full mx-auto px-4 min-h-[80vh] flex flex-col justify-center`}>
      {/* 컨페티 효과 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            const rotateSpeed = Math.random() * 360;
            const color = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 6)];
            
            return (
              <div 
                key={i}
                className={`absolute top-0 rounded-full ${color}`}
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `fall ${animDuration}s ease-in forwards ${delay}s, rotate ${rotateSpeed / 100}s linear infinite`
                }}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* 인트로 화면 */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white rounded-lg shadow-lg p-6 md:p-8 text-center bg-gradient-to-b ${getBgColorClass()}`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">나랑 찰떡인 반려동물은?</h2>
            <div className="mb-4 md:mb-6">
              <img 
                src="https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s" 
                alt="반려동물 테스트" 
                className="w-full max-w-xs mx-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-700">
              당신의 성격과 가장 잘 맞는 반려동물을 찾아드려요!<br/>
              12개의 간단한 질문에 답하면 결과를 알 수 있어요.
            </p>
            <div className="text-4xl md:text-5xl mb-6 md:mb-8 flex justify-center space-x-3 md:space-x-4 flex-wrap">
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🐶</span>
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🐱</span>
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🐹</span>
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🐢</span>
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🦜</span>
              <span className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">🦎</span>
            </div>
            <button
              onClick={startTest}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              테스트 시작하기
            </button>
          </motion.div>
        )}

        {/* 테스트 화면 */}
        {step === 'test' && (
          <motion.div
            key={`question-${currentQuestion}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-lg p-6 md:p-8"
          >
            <div className="mb-5 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 font-medium">
                  {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-800">
              {questions[currentQuestion].text}
            </h3>

            <div className="space-y-3 md:space-y-4">
              {questions[currentQuestion].choices.map((choice, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectAnswer(choice.type)}
                  className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors text-base md:text-lg flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold text-sm">{index + 1}</span>
                  {choice.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 결과 화면 */}
        {step === 'result' && currentResult && (
          <motion.div
            key="result"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`rounded-lg shadow-lg p-6 md:p-8 text-center bg-gradient-to-b ${getBgColorClass()}`}
          >
            <div className="mb-4">
              <div className="inline-block bg-white p-4 rounded-full shadow-md mb-2">
                <motion.span 
                  className="text-6xl md:text-7xl inline-block"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {currentResult.emoji}
                </motion.span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">당신과 찰떡인 반려동물은</h2>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-blue-600 bg-white inline-block px-3 py-1 rounded-lg shadow-sm">
                {currentResult.title}
              </h3>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
              <p className="text-base md:text-lg mb-4 text-gray-700">{currentResult.description}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {currentResult.tags.map((tag, index) => (
                  <motion.span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <img
                src={currentResult.gifUrl}
                alt={currentResult.title}
                className="max-w-xs mx-auto rounded-lg shadow-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <motion.button
                onClick={restartTest}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full text-base md:text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 테스트하기
              </motion.button>
              
              <motion.button
                onClick={shareResult}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full text-base md:text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                결과 공유하기
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-full text-base md:text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                홈으로 돌아가기
              </motion.button>
            </div>
            
            <div className="mt-6 text-gray-600 text-sm border-t border-gray-200 pt-4">
              <p>친구들에게도 이 테스트를 공유해보세요!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 컨페티 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes fall {
          from { transform: translateY(-100px); }
          to { transform: translateY(100vh); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TestContent; 