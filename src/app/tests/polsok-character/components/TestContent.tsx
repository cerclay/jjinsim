"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, results, calculateResult } from "../data/test-data";
import { ArrowLeft, Share, Heart, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface UserAnswer {
  questionId: number;
  optionId: string;
}

export default function TestContent() {
  const [currentStep, setCurrentStep] = useState<"intro" | "question" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [resultType, setResultType] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({
    young_aesoon: 0,
    old_aesoon: 0,
    yang_gwansik: 0,
    jeong_gwangrye: 0,
    bu_sangkil: 0
  });
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const handleStartTest = () => {
    setCurrentStep("question");
  };

  const handleSelectOption = (optionId: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.id === optionId);
    
    if (!selectedOption) return;
    
    // 현재 답변 저장
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = { questionId: currentQuestion.id, optionId };
    setAnswers(newAnswers);
    
    // 점수 계산
    const newScores = { ...scores };
    Object.entries(selectedOption.score).forEach(([type, score]) => {
      newScores[type] = (newScores[type] || 0) + score;
    });
    setScores(newScores);
    
    // 다음 질문 또는 결과로 이동
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }, 400);
    } else {
      // 마지막 질문이면 결과 계산
      setTimeout(() => {
        const result = calculateResult(newScores);
        setResultType(result);
        setCurrentStep("result");
      }, 600);
    }
  };

  const handleRestart = () => {
    setCurrentStep("intro");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultType(null);
    setScores({
      young_aesoon: 0,
      old_aesoon: 0,
      yang_gwansik: 0,
      jeong_gwangrye: 0,
      bu_sangkil: 0
    });
  };

  const handleShare = () => {
    if (resultType && typeof navigator.share !== "undefined") {
      const resultData = results[resultType];
      navigator.share({
        title: "내가 폭싹 속았수다 캐릭터라면?",
        text: `나는 '${resultData.name}'! ${resultData.description} ${resultData.hashtags.join(" ")}`,
        url: window.location.href
      }).catch(error => {
        console.log("공유 실패:", error);
      });
    } else {
      setIsSharing(true);
      setTimeout(() => {
        setIsSharing(false);
      }, 2000);
    }
  };

  // 결과에서 폭죽 효과
  useEffect(() => {
    if (currentStep === "result") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStep]);

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {currentStep === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-800 mb-3 sm:mb-4">
                내가 폭싹 속았수다 케릭터라면?
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto mb-2">
                당신은 JTBC 드라마 '폭싹 속았수다'에서 어떤 캐릭터일까요?
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                12개의 질문을 통해 알아보는 나만의 캐릭터 테스트
              </p>
              
              <motion.div 
                className="relative w-full max-w-sm h-56 sm:h-64 mx-auto my-4 sm:my-6 rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT73s19GNbOYJlSm_Kj3d06jvPIiNFMgL0qswmuXRH4DAbx-ZTJYa4dMfColxZuajof_pKKUMhfxgL15bknTXbjyi-LAx_Y4gwrO7R0-asgLdpdycOzjcGg-Sc4Pa_k7ozVgZxUNxEgV10rRhf0lcA_oPrwUzk4ypvv4dy3Be5OSpQUMYpGkjlM14iRjw/s320/MBTI%20(1).jpg" 
                  alt="폭싹 속았수다 테스트" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="text-xs font-semibold bg-purple-600 inline-block px-2 py-1 rounded-full mb-2">
                      참여자 1,043명
                    </div>
                    <div className="text-lg font-bold">당신의 폭싹 캐릭터는?</div>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex flex-wrap gap-2 justify-center mt-3 sm:mt-4 mb-4 sm:mb-6">
                {["#드라마캐릭터", "#폭싹속았수다", "#성격테스트", "#재미로보는심리테스트"].map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-purple-100 text-purple-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <motion.button
              onClick={handleStartTest}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span>테스트 시작하기</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
              <p>약 2분 소요 · 재미로 보는 테스트입니다</p>
            </div>
          </motion.div>
        )}

        {currentStep === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-1">
                <button 
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
                    } else {
                      setCurrentStep("intro");
                    }
                  }}
                  className="text-purple-600 hover:text-purple-800 transition-colors flex items-center"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span className="text-sm font-medium">이전</span>
                </button>
                <span className="text-sm font-medium text-gray-600">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 h-1.5 sm:h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-600" 
                  initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            
            <div className="flex-1">
              <motion.h2 
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-5 sm:mb-6 text-center px-2"
              >
                {questions[currentQuestionIndex].text}
              </motion.h2>
              
              <div className="space-y-2 sm:space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`options-${currentQuestionIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    {questions[currentQuestionIndex].options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02, backgroundColor: "rgb(243 232 255)" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleSelectOption(option.id)}
                        className="w-full text-left p-3 sm:p-4 rounded-xl bg-white border-2 border-purple-100 hover:border-purple-300 transition-colors shadow-sm"
                      >
                        <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mr-2 sm:mr-3 text-center leading-6">
                          {option.id}
                        </span>
                        <span className="text-sm sm:text-base">{option.text}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === "result" && resultType && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <div className="text-center mb-5 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-purple-700 mb-1">당신의 폭싹 속았수다 캐릭터는</h2>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-900 mb-2 sm:mb-3">
                {results[resultType].name}
              </h1>
              
              <motion.div 
                className="relative w-full max-w-xs sm:max-w-sm h-64 sm:h-72 mx-auto my-4 sm:my-6 rounded-xl overflow-hidden shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <img 
                  src={results[resultType].image} 
                  alt={results[resultType].name} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end">
                  <div className="p-3 sm:p-4 text-white w-full">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {results[resultType].hashtags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs bg-purple-500/70 text-white px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-700 text-base sm:text-lg mb-3 mt-4 font-medium px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {resultType === 'young_aesoon' && "당신은 지금 이 순간이 전부인 청춘의 오애순입니다! 평범한 삶을 거부하고 자유를 갈망하는 반항아이자 예술가! 주변 사람들이 당신의 요망진 매력에 자꾸 끌리는 이유가 있답니다."}
                {resultType === 'old_aesoon' && "현실적인 감각과 따뜻한 포용력을 지닌 중년의 오애순입니다. 가족을 위해 희생할 줄 알지만, 자신의 꿈도 놓지 않는 균형 잡힌 사람이에요. 당신과 같은 사람이 세상의 중심을 잡아주고 있어요."}
                {resultType === 'yang_gwansik' && "겉으로는 무뚝뚝하지만 속은 불같은 사랑꾼 양관식입니다! 말보다 행동으로 보여주는 묵직한 사랑의 결정체. 가끔은 말로도 표현해주면 주변 사람들이 더 좋아할 거예요."}
                {resultType === 'jeong_gwangrye' && "거침없는 화법의 소유자 전광례입니다! 제주의 억척 해녀처럼 굳센 당신은 엄청난 추진력의 소유자. 말은 독설같아도 행동은 따뜻한 당신, 주변 사람들이 진심을 알아준다면 좋겠네요."}
                {resultType === 'bu_sangkil' && "냉철한 현실주의자 부상길입니다. 효율과 결과를 중시하며 불필요한 감정에 시간을 낭비하지 않아요. 날카로운 통찰력으로 세상을 읽어내는 당신, 가끔은 감정표현도 해보는 건 어떨까요?"}
              </motion.p>
              
              <motion.div 
                className="bg-purple-50 p-3 sm:p-4 rounded-xl mb-5 sm:mb-6 mt-4 sm:mt-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <h3 className="font-bold text-purple-800 mb-2">캐릭터 특징</h3>
                <ul className="text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  {resultType === 'young_aesoon' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>요망함과 반항기로 무장한 자유로운 영혼</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>평범함을 거부하고 자신만의 색을 찾아가는 중</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>감정이 풍부하고 즉흥적인 결정을 자주 내림</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>누구나 한 번쯤 사랑에 빠지는 매력적인 존재</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>"난 시인이 될 거야!"라며 열정을 불태우는 꿈나무</span>
                      </li>
                    </>
                  )}
                  {resultType === 'old_aesoon' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>책임감과 가족을 최우선으로 하는 단단한 마음</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>모두의 의견을 존중하는 조화로운 리더십</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>꿈과 현실 사이에서 묵직한 균형을 찾은 사람</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>자신의 희생을 당연하게 여기는 넓은 품의 소유자</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>시간이 지날수록 더 빛나는 연륜의 아름다움</span>
                      </li>
                    </>
                  )}
                  {resultType === 'yang_gwansik' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>말보다 행동으로 사랑을 표현하는 진국 사랑꾼</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>겉은 무던하지만 속은 세심하고 따뜻한 사람</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>타인과의 신뢰를 가장 중요하게 생각함</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>묵묵히 자신의 자리를 지키는 든든한 존재감</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>사랑하는 사람을 위해 평생을 헌신할 수 있는 진정성</span>
                      </li>
                    </>
                  )}
                  {resultType === 'jeong_gwangrye' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>직설적이고 거침없는 화법의 소유자</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>겉바속촉, 무뚝뚝한 표현 속에 깊은 사랑이 담김</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>억척스러운 추진력과 뚝심이 강점</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>힘든 상황에서도 결코 포기하지 않는 제주 해녀 근성</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>"잔소리=사랑"이라는 공식을 몸소 실천하는 사람</span>
                      </li>
                    </>
                  )}
                  {resultType === 'bu_sangkil' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>차갑고 냉철한 현실주의자의 표본</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>감정보다 효율과 결과를 중시하는 성향</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>명확한 선긋기 마스터, 불필요한 관계는 과감히 정리</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>계산적이지만 그만큼 정확한 판단력을 가진 전략가</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✦</span>
                        <span>과감한 결단력으로 주변을 놀라게 하는 파격의 아이콘</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>

              <motion.div 
                className="bg-purple-50 p-3 sm:p-4 rounded-xl mb-5 sm:mb-6 mt-4 sm:mt-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <h3 className="font-bold text-purple-800 mb-2">이런 사람과 잘 맞아요</h3>
                <ul className="text-gray-700 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  {resultType === 'young_aesoon' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>양관식</b>: 당신의 자유로운 영혼을 이해해주는 든든한 지원군</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>전광례</b>: 가끔 충돌해도 서로의 솔직함을 존중하는 관계</span>
                      </li>
                    </>
                  )}
                  {resultType === 'old_aesoon' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>양관식</b>: 서로의 성장을 지지하는 파트너십</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>젊은 오애순</b>: 과거의 자신을 이해하며 조언해줄 수 있어요</span>
                      </li>
                    </>
                  )}
                  {resultType === 'yang_gwansik' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>오애순</b>: 청년이든 중년이든, 애순이는 당신의 운명</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>전광례</b>: 직설적인 조언으로 당신을 성장시켜 줄 멘토</span>
                      </li>
                    </>
                  )}
                  {resultType === 'jeong_gwangrye' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>젊은 오애순</b>: 서로의 강한 개성이 부딪히며 성장하는 관계</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>양관식</b>: 말과 행동의 균형을 이루는 보완적 관계</span>
                      </li>
                    </>
                  )}
                  {resultType === 'bu_sangkil' && (
                    <>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>오애순(중년)</b>: 현실적 감각과 따뜻함으로 균형을 맞춰줄 사람</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
                        <span><b>전광례</b>: 직설적인 소통으로 효율적인 관계를 형성</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="flex justify-center gap-2 sm:gap-3 mb-2">
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center"
                >
                  <Share size={16} className="mr-1.5 sm:mr-2" />
                  {isSharing ? "복사 완료!" : "결과 공유하기"}
                </motion.button>
                
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center"
                >
                  <RefreshCw size={16} className="mr-1.5 sm:mr-2" />
                  다시 테스트하기
                </motion.button>
              </div>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm"
                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
              >
                다른 테스트 하러가기
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 