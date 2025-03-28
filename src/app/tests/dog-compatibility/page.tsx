"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bone, Heart, PawPrint, Check, AlertCircle, Award, Star, Share2, Trophy, Zap, Tag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import testData from './data.json';
import confetti from 'canvas-confetti';
import Image from 'next/image';

// 범위 문자열을 숫자 범위로 변환하는 함수
const parseRange = (rangeStr: string): [number, number] => {
  const [min, max] = rangeStr.split('~').map(str => parseInt(str.trim(), 10));
  return [min, max];
};

// 점수에 해당하는 강아지 찾기
const findDogByScore = (score: number) => {
  return testData.dogs.find(dog => {
    const [min, max] = parseRange(dog.range);
    return score >= min && score <= max;
  });
};

export default function DogCompatibilityTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dogFaces, setDogFaces] = useState<string[]>(['🐶', '🐕', '🦮', '🐩']);
  const [selectedDogFace, setSelectedDogFace] = useState('🐶');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>("https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc");

  // 강아지 궁합 매핑 - 결과 종이 아닌 다른 강아지를 표시하기 위함
  const dogCompanions: Record<string, string> = {
    "치와와": "푸들",
    "불독": "코기",
    "닥스훈트": "골든 리트리버",
    "코기": "시바 이누",
    "포메라니안": "래브라도 리트리버",
    "푸들": "코기",
    "시바 이누": "포메라니안",
    "시베리안 허스키": "래브라도 리트리버",
    "래브라도 리트리버": "골든 리트리버",
    "골든 리트리버": "닥스훈트"
  };

  // 현재 질문
  const currentQuestion = currentStep < testData.questions.length ? testData.questions[currentStep] : null;

  // 답변 선택 처리
  const handleSelectOption = (optionId: number, optionScore: number) => {
    setAnswers({
      ...answers,
      [currentStep]: optionId
    });
    
    // 애니메이션 표시
    setShowAnimation(true);
    
    // 점수 업데이트
    const newScore = score + optionScore;
    setScore(newScore);
    
    // 랜덤 강아지 이모지 선택
    setSelectedDogFace(dogFaces[Math.floor(Math.random() * dogFaces.length)]);
    
    setTimeout(() => {
      setShowAnimation(false);
      
      // 마지막 질문이면 결과 계산, 아니면 다음 질문으로
      if (currentStep === testData.questions.length - 1) {
        calculateResult(newScore);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }, 700);
  };

  // 파일 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  // 공유 기능
  const shareResult = (platform: string) => {
    const title = `나와 찰떡궁합인 강아지는 ${result?.breed}입니다!`;
    const url = window.location.href;

    switch (platform) {
      case 'clipboard':
        navigator.clipboard.writeText(`${title} - ${url}`)
          .then(() => alert('클립보드에 복사되었습니다!'))
          .catch(() => alert('복사에 실패했습니다. 다시 시도해주세요.'));
        break;
      case 'kakao':
        // 카카오 공유 API 예시 (실제 구현 시 카카오 SDK 필요)
        alert('카카오톡 공유 기능은 카카오 SDK 연동이 필요합니다.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
    // 공유 옵션 닫기
    setShowShareOptions(false);
  };

  // 결과 계산
  const calculateResult = (finalScore: number) => {
    setLoading(true);
    
    setTimeout(() => {
      // 최종 점수에 맞는 강아지 찾기
      const resultDog = findDogByScore(finalScore);
      setResult(resultDog);
      setLoading(false);
      
      // 결과 화면에서 색종이 효과
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FDA4AF', '#F9A8D4', '#FDBA74', '#A7F3D0']
        });
      }, 500);
    }, 2000);
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setScore(0);
    setResult(null);
  };

  // 최초 로드 시 힌트 보여주기
  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // 프로그레스 바 계산
  const progressPercentage = ((currentStep + 1) / testData.questions.length) * 100;

  // 태그 색상 랜덤화
  const getRandomColor = () => {
    const colors = ['bg-pink-500', 'bg-orange-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-500', 'bg-sky-500', 'bg-violet-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-amber-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto pb-20">
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/tests" className="flex items-center text-pink-600 font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>테스트 목록</span>
          </Link>
          <motion.h1 
            className="text-xl font-bold text-pink-700 flex items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {selectedDogFace} {testData.title} {selectedDogFace}
          </motion.h1>
        </motion.div>

        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center text-gray-600 bg-white p-4 rounded-xl shadow-md border-2 border-pink-200"
          >
            {testData.description}
          </motion.div>
        )}

        {/* 힌트 효과 */}
        <AnimatePresence>
          {showHint && (
            <motion.div 
              className="fixed bottom-4 left-0 right-0 mx-auto w-max bg-pink-600 text-white px-4 py-2 rounded-full text-sm shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center">
                <PawPrint className="w-4 h-4 mr-2" />
                <span>답변을 통해 나와 궁합이 좋은 강아지를 찾아보세요!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메인 콘텐츠 */}
        <div className="relative">
          {loading ? (
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[60vh] border-4 border-pink-200">
              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <div className="text-6xl">{selectedDogFace}</div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-200"
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-pink-700 mb-4">강아지 친구를 찾는 중...</h3>
              <p className="text-gray-600 text-center mb-6">각종 강아지들이 당신의 결과에 귀를 쫑긋 세우고 있어요!</p>
              
              <motion.div 
                className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <div className="mt-2 flex space-x-2 justify-center">
                {['🐶', '🐕', '🦮', '🐩'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="text-2xl"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      repeatType: "reverse"
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : result ? (
            // 결과 화면
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border-4 border-pink-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-pink-600 to-orange-500 py-5 px-6 text-white">
                <h2 className="text-xl font-bold text-center mb-1">🎉 축하합니다! 🎉</h2>
                <p className="text-center text-white/80 text-sm">당신과 찰떡궁합인 강아지를 찾았어요!</p>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-block bg-gradient-to-r from-amber-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full mb-4 shadow-md"
                  >
                    <span className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" /> 당신의 반려견 궁합
                    </span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-orange-500 text-transparent bg-clip-text mb-2">
                    {result.breed}
                  </h3>
                </div>
                
                {/* 폴라로이드 스타일 이미지 */}
                <motion.div 
                  className="relative mx-auto mb-8 w-64 h-72 bg-white p-3 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300 border-2 border-gray-100"
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <div className="w-full h-52 overflow-hidden mb-3 border-b-4 border-pink-300">
                    {customImage ? (
                      <Image 
                        src={customImage} 
                        alt={`${result.breed} 견종과의 궁합 결과`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image 
                        src={thumbnailImage || result.imageUrl} 
                        alt={`${result.breed} 견종 이미지`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="text-center text-sm">
                    <span className="text-pink-600">♥</span> {result.breed} <span className="text-pink-600">♥</span>
                  </div>
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-yellow-300 px-3 py-1 transform rotate-12 text-sm font-bold text-pink-800 rounded-lg shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <span className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" fill="currentColor" />
                      찰떡궁합!
                    </span>
                  </motion.div>

                  {!customImage && (
                    <motion.div 
                      className="absolute -bottom-3 -left-3 bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      <label className="flex items-center cursor-pointer text-xs">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        내 강아지 사진 업로드
                      </label>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* 태그 섹션 */}
                <motion.div
                  className="flex flex-wrap gap-2 justify-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {['귀여움', '충성심', '사랑꾼', '활발함', '장난기'].map((tag, i) => (
                    <motion.span 
                      key={i} 
                      className={`flex items-center ${getRandomColor()} text-white text-xs px-3 py-1 rounded-full shadow-sm`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="mb-6 p-5 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border-2 border-pink-100 shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-pink-700 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" fill="pink" /> 
                    <span>성격 궁합</span>
                  </h4>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    {result.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Award className="text-amber-500 w-5 h-5 mr-2" fill="#FCD34D" />
                      </motion.div>
                      <span className="font-medium text-gray-800">최고 궁합:</span>
                    </div>
                    <span className="text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-200">
                      {dogCompanions[result.breed] || "푸들"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <AlertCircle className="text-red-500 w-5 h-5 mr-2" />
                      <span className="font-medium text-gray-800">주의 궁합:</span>
                    </div>
                    <span className="text-sm bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-3 py-1 rounded-full font-medium border border-red-200">
                      {result.worst_compatibility}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-amber-500" fill="#F59E0B" />
                    <span>이런 분과 잘 맞아요</span>
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>따뜻한 에너지와 함께하는 시간을 소중히 여기는 분</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>안정적인 루틴과 편안한 분위기를 좋아하는 분</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>진심 어린 대화와 애정 표현을 자주 하는 분</span>
                    </li>
                  </ul>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={restartTest}
                    className="w-full bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 transition-colors duration-200"
                  >
                    테스트 다시 하기
                  </Button>
                  <Link href="/tests" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-pink-600 text-pink-600 hover:bg-pink-50"
                    >
                      다른 테스트 해보기
                    </Button>
                  </Link>
                  
                  {/* 공유 버튼 섹션 */}
                  <motion.div 
                    className="mt-5 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.div className="flex justify-center space-x-4">
                      <motion.button
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowShareOptions(!showShareOptions)}
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PawPrint className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </motion.div>

                    {/* 공유 옵션 팝업 */}
                    <AnimatePresence>
                      {showShareOptions && (
                        <motion.div 
                          className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-white rounded-xl shadow-lg p-4 border border-gray-200 w-64"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <h5 className="text-center font-medium mb-3 text-gray-700">결과 공유하기</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => shareResult('clipboard')}
                              className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-1">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </div>
                              <span className="text-xs">링크 복사</span>
                            </button>
                            <button 
                              onClick={() => shareResult('kakao')}
                              className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1">
                                <span className="text-xs font-bold">K</span>
                              </div>
                              <span className="text-xs">카카오톡</span>
                            </button>
                            <button 
                              onClick={() => shareResult('facebook')}
                              className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1 text-white">
                                <span className="text-xs font-bold">f</span>
                              </div>
                              <span className="text-xs">페이스북</span>
                            </button>
                            <button 
                              onClick={() => shareResult('twitter')}
                              className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-1 text-white">
                                <span className="text-xs font-bold">X</span>
                              </div>
                              <span className="text-xs">트위터</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            // 질문 화면
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-4 border-pink-200">
              <div className="p-6">
                {/* 진행 상태 표시 */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                    <motion.span 
                      className="flex items-center bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      질문 {currentStep + 1}/{testData.questions.length}
                    </motion.span>
                    <motion.span 
                      className="flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      {Math.round(progressPercentage)}% 완료
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden p-1 shadow-inner mt-4">
                    <motion.div 
                      className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full"
                      initial={{ width: `${((currentStep) / testData.questions.length) * 100}%` }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* 발자국 아이콘 */}
                    <motion.div 
                      className="absolute top-0 -translate-y-1"
                      style={{ left: `${progressPercentage}%` }}
                      initial={{ x: "-50%", scale: 0.8 }}
                      animate={{ 
                        x: "-50%", 
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="text-2xl">{selectedDogFace}</div>
                    </motion.div>
                  </div>
                  
                  {/* 남은 질문 표시 */}
                  <div className="mt-3 flex justify-center gap-2">
                    {Array.from({ length: testData.questions.length }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        className={`w-6 h-2 rounded-full ${
                          i < currentStep ? 'bg-pink-600' : 
                          i === currentStep ? 'bg-orange-400' : 'bg-gray-300'
                        }`}
                        animate={i === currentStep ? { 
                          scale: [1, 1.2, 1],
                          backgroundColor: ['rgb(251, 146, 60)', 'rgb(219, 39, 119)', 'rgb(251, 146, 60)']
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.h2 
                      className="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 text-transparent bg-clip-text mb-6 flex items-center p-4 border-2 border-pink-100 rounded-lg shadow-sm"
                      animate={{ scale: [1, 1.01, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Bone className="w-6 h-6 mr-3 text-pink-500" /> 
                      <span className="flex-1">{currentQuestion?.text}</span>
                      <div className="text-2xl ml-3">{selectedDogFace}</div>
                    </motion.h2>

                    <div className="flex flex-col gap-4">
                      {currentQuestion?.options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleSelectOption(option.id, option.score)}
                          className={`relative p-5 border-2 rounded-xl text-left transition-all ${
                            answers[currentStep] === option.id 
                              ? 'border-pink-500 bg-pink-50' 
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          whileHover={{ scale: 1.03, y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="font-medium flex items-center text-gray-700">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 mr-3 font-bold">
                              {index + 1}
                            </span>
                            {option.text}
                          </div>
                          
                          {answers[currentStep] === option.id && showAnimation && (
                            <motion.div
                              className="absolute right-4 top-1/2 transform -translate-y-1/2"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full p-1">
                                <Check className="w-5 h-5" />
                              </div>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* 도움말 문구 */}
                <motion.div 
                  className="mt-8 text-center p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center">
                    <PawPrint className="w-4 h-4 mr-2 text-amber-600" />
                    <span>솔직하게 답변할수록 정확한 결과가 나와요!</span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}