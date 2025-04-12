"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

import { 
  DEMENTIA_TEST_SECTIONS, 
  TEST_TIME_LIMIT_SECONDS, 
  TOTAL_MAX_SCORE, 
  COGNITIVE_AREAS_MAX_SCORES 
} from '../constants';
import { 
  DementiaQuestion, 
  DementiaTestSection, 
  UserAnswer, 
  DementiaTestResult,
  RESULT_CATEGORIES
} from '../types';

// 컴포넌트 프롭 타입
type DementiaTestProps = {
  onComplete: (results: DementiaTestResult) => void;
  onBack: () => void;
};

// 테스트 단계 타입
type TestStep = 'intro' | 'running' | 'processing';

export const DementiaTest: React.FC<DementiaTestProps> = ({ onComplete, onBack }) => {
  // 테스트 상태 관리
  const [step, setStep] = useState<TestStep>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TEST_TIME_LIMIT_SECONDS);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<(number | string[])[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [memoryItems, setMemoryItems] = useState<string[]>(['나무', '자동차', '모자', '연필', '시계']);
  const [processingResult, setProcessingResult] = useState(false);
  
  // 타이머용 ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 현재 섹션과 질문
  const currentSection = DEMENTIA_TEST_SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  
  // 전체 진행도 계산
  const calculateProgress = () => {
    let completedQuestions = 0;
    
    // 이전 섹션의 모든 질문 개수
    for (let i = 0; i < currentSectionIndex; i++) {
      completedQuestions += DEMENTIA_TEST_SECTIONS[i].questions.length;
    }
    
    // 현재 섹션에서 완료한 질문 개수
    completedQuestions += currentQuestionIndex;
    
    // 전체 질문 개수
    const totalQuestions = DEMENTIA_TEST_SECTIONS.reduce(
      (total, section) => total + section.questions.length, 0
    );
    
    return (completedQuestions / totalQuestions) * 100;
  };
  
  // 전체 테스트 타이머
  useEffect(() => {
    if (step === 'running' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // 시간 초과시 결과 계산
            clearInterval(timerRef.current!);
            handleTestComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [step, timeRemaining]);
  
  // 개별 질문 타이머 (기억력 테스트 등에서 사용)
  useEffect(() => {
    if (currentQuestion?.timeLimitSeconds && step === 'running') {
      setQuestionTimer(currentQuestion.timeLimitSeconds);
      
      questionTimerRef.current = setInterval(() => {
        setQuestionTimer(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(questionTimerRef.current!);
            handleNextQuestion();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setQuestionTimer(null);
    }
    
    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [currentQuestion, step]);
  
  // 테스트 시작
  const handleStartTest = () => {
    setStep('running');
    setCountdownActive(true);
    
    // 3초 카운트다운 후 테스트 시작
    setTimeout(() => {
      setCountdownActive(false);
    }, 3000);
  };
  
  // 다음 질문으로 이동
  const handleNextQuestion = () => {
    // 이전 타이머 정리
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      setQuestionTimer(null);
    }
    
    // 현재 질문에 대한 응답이 있을 경우만 답변 저장
    if (currentQuestion && selectedOptions.length > 0) {
      let isCorrect = false;
      let earnedScore = 0;
      
      // 복수 정답(기억력 테스트)인 경우
      if (currentQuestion.answerIndex === -1 && Array.isArray(selectedOptions[0])) {
        // 정확한 정답 목록 설정
        const correctAnswers = ['나무', '자동차', '모자', '연필', '시계'];
        
        console.log("문제 ID:", currentQuestion.id);
        console.log("문제 유형:", currentQuestion.type);
        console.log("사용자 선택한 항목:", selectedOptions[0]);
        console.log("정확한 정답 항목:", correctAnswers);
        
        // 선택한 항목 중 맞는 항목 확인
        const correctSelections = (selectedOptions[0] as string[]).filter(
          option => correctAnswers.includes(option)
        );
        
        console.log("맞은 항목 수:", correctSelections.length);
        
        // 단순하게 맞은 개수만큼 점수 부여 (최대 5점)
        earnedScore = Math.min(correctSelections.length, 5);
        console.log("획득 점수:", earnedScore);
        
        isCorrect = earnedScore > 0;
      } 
      // 단일 정답인 경우
      else if (typeof selectedOptions[0] === 'number') {
        isCorrect = selectedOptions[0] === currentQuestion.answerIndex;
        earnedScore = isCorrect ? currentQuestion.score : 0;
      }
      
      // 답변 저장
      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer: selectedOptions[0],
        isCorrect,
        score: earnedScore,
        maxScore: currentQuestion.score
      };
      
      console.log("저장된 답변:", newAnswer);
      
      setAnswers(prev => [...prev, newAnswer]);
    }
    
    // 다음 문제 또는 섹션으로 이동
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentSection.questions.length) {
      // 다음 문제로
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // 다음 섹션으로
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < DEMENTIA_TEST_SECTIONS.length) {
        setCurrentSectionIndex(nextSectionIndex);
        setCurrentQuestionIndex(0);
      } else {
        // 테스트 완료
        handleTestComplete();
      }
    }
    
    // 선택 초기화
    setSelectedOptions([]);
  };
  
  // 테스트 완료 처리
  const handleTestComplete = () => {
    // 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }
    
    setStep('processing');
    setProcessingResult(true);
    
    // 지연회상 문제에 대한 답변 확인
    const recallAnswer = answers.find(answer => answer.questionId === 20);
    console.log("지연회상 문제(ID: 20) 답변:", recallAnswer);
    
    // 디버깅: 모든 답변 확인
    console.log("제출된 모든 답변:", answers);
    
    // 결과 계산
    setTimeout(() => {
      // 총점 계산
      const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
      const scorePercentage = Math.round((totalScore / TOTAL_MAX_SCORE) * 100);
      
      console.log("총점:", totalScore, "총 만점:", TOTAL_MAX_SCORE, "백분율:", scorePercentage);
      
      // 인지 영역별 점수 계산
      const cognitiveAreas: DementiaTestResult['cognitiveAreas'] = {};
      
      DEMENTIA_TEST_SECTIONS.forEach(section => {
        const sectionQuestionIds = section.questions.map(q => q.id);
        const sectionAnswers = answers.filter(a => sectionQuestionIds.includes(a.questionId));
        
        console.log(`섹션 ${section.id} 문제 ID:`, sectionQuestionIds);
        console.log(`섹션 ${section.id} 관련 답변:`, sectionAnswers);
        
        const areaScore = sectionAnswers.reduce((sum, answer) => sum + answer.score, 0);
        const areaMaxScore = COGNITIVE_AREAS_MAX_SCORES[section.id as keyof typeof COGNITIVE_AREAS_MAX_SCORES];
        const areaPercentage = Math.round((areaScore / (areaMaxScore || 1)) * 100);
        
        console.log(`섹션 ${section.id} 점수:`, areaScore, "만점:", areaMaxScore, "백분율:", areaPercentage);
        
        cognitiveAreas[section.id] = {
          score: areaScore,
          maxScore: areaMaxScore,
          percentage: areaPercentage
        };
      });
      
      // 결과 카테고리 결정
      const resultCategory = RESULT_CATEGORIES.find(
        category => scorePercentage >= category.minPercentage && scorePercentage <= category.maxPercentage
      ) || RESULT_CATEGORIES[0];
      
      // 결과 객체 생성
      const result: DementiaTestResult = {
        totalScore,
        maxScore: TOTAL_MAX_SCORE,
        scorePercentage,
        answers,
        cognitiveAreas,
        resultCategory,
        date: new Date().toISOString()
      };
      
      // 결과 전달
      onComplete(result);
    }, 2000);
  };
  
  // 선택지 처리
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOptions([optionIndex]);
  };
  
  // 복수 선택 처리 (기억력 테스트)
  const handleMultipleSelect = (option: string, isChecked: boolean) => {
    console.log(`체크박스 변경: ${option} -> ${isChecked ? '선택됨' : '선택해제됨'}`);
    console.log("변경 전 상태:", selectedOptions);
    
    setSelectedOptions(prev => {
      // 첫번째 요소가 배열인지 확인하고, 아니라면 빈 배열로 초기화
      const currentSelections = Array.isArray(prev[0]) ? [...prev[0]] : [];
      
      // 선택 상태 업데이트
      let newSelections: string[];
      
      if (isChecked) {
        // 이미 선택된 항목이 아닌 경우에만 추가
        newSelections = [...currentSelections, option];
      } else {
        // 선택 해제된 항목 제거
        newSelections = currentSelections.filter(item => item !== option);
      }
      
      console.log("변경 후 상태:", [newSelections]);
      return [newSelections];
    });
  };
  
  // 복수 선택에서 선택 여부 확인
  const isMultipleOptionSelected = (option: string) => {
    const isSelected = Array.isArray(selectedOptions[0]) && (selectedOptions[0] as string[]).includes(option);
    return isSelected;
  };
  
  // 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // 선택된 옵션 확인
  const isOptionSelected = (optionIndex: number) => {
    return selectedOptions[0] === optionIndex;
  };
  
  // 애니메이션 설정
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  // 인트로 화면
  if (step === 'intro') {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={variants}
        className="space-y-4"
      >
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-3 text-center">치매 조기 진단 테스트</h2>
          <p className="mb-4 text-sm text-gray-700">
            이 테스트는 인지 기능의 다양한 영역을 평가하는 20개의 문항으로 구성되어 있습니다. 
            총 테스트 시간은 <strong>3분</strong>입니다.
          </p>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800 mb-1.5 text-sm">테스트 안내사항</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-blue-700">
              <li>조용한 환경에서 집중하여 테스트에 참여해주세요.</li>
              <li>각 질문을 주의 깊게 읽고 가장 적절한 답변을 선택하세요.</li>
              <li>일부 문제는 시간 제한이 있습니다.</li>
              <li>가능한 한 모든 문제에 답변해주세요.</li>
              <li>이 테스트는 참고용이며, 정확한 진단은 전문의와 상담하세요.</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              돌아가기
            </Button>
            <Button 
              onClick={handleStartTest}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              시작하기
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }
  
  // 카운트다운 화면
  if (countdownActive) {
    return (
      <div className="flex justify-center items-center h-[50vh] flex-col">
        <motion.h2 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-bold mb-2 text-gray-700"
        >
          테스트를 시작합니다
        </motion.h2>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2, opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ scale: 3, opacity: 0 }}
          className="text-5xl font-bold text-blue-600"
        >
          3
        </motion.div>
      </div>
    );
  }
  
  // 결과 처리 화면
  if (step === 'processing') {
    return (
      <div className="flex justify-center items-center h-[50vh] flex-col space-y-4">
        <h2 className="text-lg font-bold text-gray-800">결과를 분석 중입니다</h2>
        <div className="relative">
          {processingResult ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-green-500"
            >
              <CheckCircle2 size={48} />
            </motion.div>
          ) : (
            <div className="animate-spin h-12 w-12 border-4 border-blue-200 rounded-full border-t-blue-600"></div>
          )}
        </div>
        <p className="text-sm text-gray-600">잠시만 기다려주세요...</p>
      </div>
    );
  }
  
  // 테스트 진행 화면
  return (
    <AnimatePresence mode="wait">
      {step === 'running' && (
        <motion.div
          key="question"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="space-y-4"
        >
          {/* 진행 상태 바 */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs sm:text-sm text-gray-600">
              섹션 {currentSectionIndex + 1}/{DEMENTIA_TEST_SECTIONS.length}
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              남은 시간: {formatTime(timeRemaining)}
            </div>
          </div>
          
          <Progress value={calculateProgress()} className="h-1.5 sm:h-2" />
          
          {/* 섹션 제목 */}
          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
            <h3 className="font-bold text-sm sm:text-base text-gray-800">{currentSection.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{currentSection.description}</p>
          </div>
          
          {/* 질문 타이머 */}
          {questionTimer && (
            <div className="my-2 sm:my-3 flex items-center justify-center">
              <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium flex items-center">
                <Clock size={12} className="mr-1" />
                {questionTimer}초 남음
              </div>
            </div>
          )}
          
          {/* 문제 번호와 텍스트 */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center mb-2">
              <span className="bg-blue-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 flex-shrink-0">
                {currentQuestion.id}
              </span>
              <h3 className="font-semibold text-sm sm:text-base">{currentQuestion.questionText}</h3>
            </div>
          </div>
          
          {/* 기억 항목 표시 (기억력 테스트) */}
          {currentQuestion.memoryItems && currentQuestion.type === 'memory' && (
            <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 justify-center">
              {currentQuestion.memoryItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium text-center text-sm sm:text-base"
                >
                  {item}
                </div>
              ))}
              <p className="col-span-2 sm:col-span-3 text-xs text-center mt-2 text-blue-700">
                위 단어들을 기억하세요. {currentQuestion.timeLimitSeconds}초 후 다음 화면으로 넘어갑니다.
              </p>
            </div>
          )}
          
          {/* 이미지 표시 (시각 공간 테스트) */}
          {currentQuestion.imageUrl && (
            <div className="my-3 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50" style={{ minHeight: "150px", maxHeight: "220px" }}>
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <img 
                  src={currentQuestion.imageUrl} 
                  alt={`${currentQuestion.questionText}에 대한 이미지`} 
                  className="max-w-full object-contain mx-auto max-h-[220px]"
                  onError={(e) => {
                    // 이미지 로드 실패 시 대체 텍스트 표시
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center p-3 text-gray-600">
                  <p className="font-medium text-sm">이미지를 표시할 수 없습니다</p>
                  {currentQuestion.type === 'visuospatial' && currentQuestion.id === 11 && (
                    <p className="mt-1 text-xs sm:text-sm">시계 이미지: 11시 10분을 가리키는 시계입니다</p>
                  )}
                  {currentQuestion.type === 'visuospatial' && currentQuestion.id === 12 && (
                    <p className="mt-1 text-xs sm:text-sm">도형 이미지: 여러 도형 중 기준 도형과 같은 모양을 찾는 문제입니다 (정답: A)</p>
                  )}
                  {currentQuestion.type === 'visuospatial' && currentQuestion.id === 13 && (
                    <p className="mt-2">도형 이미지: 네 개의 도형 중 다른 하나를 찾는 문제입니다 (정답: C)</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* 질문 카드 */}
          <Card className="p-4">
            {/* 문제 타이머 (필요시) */}
            {questionTimer && (
              <div className="mb-4 flex items-center justify-center">
                <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center">
                  <Clock size={14} className="mr-1" />
                  {questionTimer}초 남음
                </div>
              </div>
            )}
            
            {/* 단일 선택 문제 */}
            {currentQuestion.options && currentQuestion.answerIndex !== -1 && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      isOptionSelected(idx)
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        isOptionSelected(idx) ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'
                      }`}>
                        {isOptionSelected(idx) && <CheckCircle2 size={14} />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 복수 선택 문제 (기억력/회상 테스트) */}
            {currentQuestion.options && currentQuestion.answerIndex === -1 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-2">기억나는 항목을 모두 선택하세요.</p>
                
                {/* 디버깅 정보 표시 (개발 모드에서만) */}
                <div className="text-xs text-gray-500 mb-2 p-2 bg-gray-50 rounded">
                  <div>문제 ID: {currentQuestion.id}</div>
                  <div>문제 유형: {currentQuestion.type}</div>
                  <div>
                    현재 선택: {Array.isArray(selectedOptions[0]) ? 
                      (selectedOptions[0] as string[]).join(', ') || '(없음)' : 
                      '(없음)'}
                  </div>
                  <div>정답: 나무, 자동차, 모자, 연필, 시계</div>
                </div>
                
                {currentQuestion.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${idx}`}
                      checked={isMultipleOptionSelected(option)}
                      onCheckedChange={(checked) => 
                        handleMultipleSelect(option, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`option-${idx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </Card>
          
          {/* 다음 버튼 */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleNextQuestion}
              disabled={
                // 단일 선택에서 선택이 없는 경우
                (currentQuestion.answerIndex !== -1 && selectedOptions.length === 0) ||
                // 복수 선택에서 선택이 없는 경우 (단, 기억력 문제는 스킵 가능)
                (currentQuestion.answerIndex === -1 && 
                  Array.isArray(selectedOptions[0]) && 
                  (selectedOptions[0] as string[]).length === 0 &&
                  currentQuestion.type !== 'memory')
              }
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              다음 문제
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 