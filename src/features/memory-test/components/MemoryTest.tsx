"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QUESTIONS, TIME_LIMIT_SECONDS, MEMORY_TEST_METADATA } from "../constants"
import { Question } from "../types"
import { incrementParticipantCount } from "@/features/test-cards/api"

export function MemoryTest() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true)
  const [timeLeft, setTimeLeft] = useState(4) // 4초 타이머
  const [showQuestionText, setShowQuestionText] = useState(false) // 문제 텍스트 표시 여부
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // 제출 중복 방지를 위한 상태
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
  const [showResultButton, setShowResultButton] = useState(false) // 결과 보기 버튼 표시

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showQuestion && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && showQuestion) {
      setShowQuestion(false)
      setShowQuestionText(true)
      
      // 마지막 질문인 경우 충분한 시간 제공
      if (currentQuestionIndex === QUESTIONS.length - 1) {
        setTimeLeft(10) // 마지막 질문에는 더 긴 시간 제공
      } else {
        setTimeLeft(4) // 타이머 리셋
      }
    }
    return () => clearInterval(timer)
  }, [showQuestion, timeLeft, currentQuestionIndex])

  const startTest = () => {
    setIsStarted(true)
    setCurrentQuestionIndex(0)
    setCorrectAnswers(0)
    setTimeLeft(4)
    setShowQuestion(true)
    setShowQuestionText(false)
    setStartTime(Date.now())
    setIsSubmitting(false)
    setSelectedAnswerIndex(null) // 선택한 답변 초기화
    setShowResultButton(false)
  }

  // 결과 페이지로 이동하는 간단한 함수
  const navigateToResultPage = (numCorrect: number) => {
    const totalTimeSpent = Math.floor((Date.now() - (startTime || Date.now())) / 1000);
    // 절대 URL 생성
    const baseUrl = window.location.origin;
    const resultUrl = `${baseUrl}/tests/memory-test/result?correct=${numCorrect}&total=${QUESTIONS.length}&time=${totalTimeSpent}`;
    
    console.log('결과 페이지로 이동 시도', resultUrl);
    
    // 직접 페이지 변경 (가장 기본적인 방법)
    window.location.href = resultUrl;
  };

  const handleAnswer = async (answerIndex: number) => {
    // 중복 제출 방지
    if (isSubmitting) {
      console.log('이미 제출 중입니다.');
      return;
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.answer_index
    
    // 정답 여부에 따라 정답 개수 업데이트
    let updatedCorrectAnswers = correctAnswers;
    if (isCorrect) {
      updatedCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(updatedCorrectAnswers);
    }

    // 마지막 질문인지 확인 (인덱스는 0부터 시작하므로 length-1과 비교)
    const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1
    
    if (!isLastQuestion) {
      // 다음 문제로 이동
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowQuestion(true)
      setShowQuestionText(false)
      setTimeLeft(4) // 타이머 리셋
      setSelectedAnswerIndex(null) // 선택한 답변 초기화
    } else {
      // 마지막 문제일 경우
      try {
        setIsSubmitting(true); // 제출 중 상태로 변경
        console.log('마지막 질문 답변 제출, 정답 개수:', updatedCorrectAnswers);
        
        // 참여자 수 증가 시도
        try {
          await incrementParticipantCount(MEMORY_TEST_METADATA.id);
          console.log('참여자 수 증가 성공');
        } catch (error) {
          console.error('참여자 수 증가 실패, 결과로 이동 계속:', error);
        }
        
        // 결과 버튼 표시
        setShowResultButton(true);
        
      } catch (error) {
        console.error('결과 제출 중 오류 발생:', error);
        setShowResultButton(true);
        setIsSubmitting(false);
      }
    }
  }

  const handleChoiceClick = (index: number) => {
    if (isSubmitting) return;
    
    setSelectedAnswerIndex(index);
    
    // 마지막 문제에서 시각적 피드백을 위해 0.3초 후 답변 처리
    const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
    if (isLastQuestion) {
      setTimeout(() => {
        handleAnswer(index);
      }, 300);
    } else {
      handleAnswer(index);
    }
  };

  const renderQuestion = (question: Question) => {
    if (question.type === 'image') {
      return (
        <div className="mb-6">
          <img 
            src={question.imageUrl} 
            alt="기억할 이미지" 
            className="w-full max-h-[400px] h-auto object-contain rounded-lg mb-4"
          />
        </div>
      )
    }

    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 leading-relaxed whitespace-pre-line">
          {question.text}
        </h3>
      </div>
    )
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <div className="max-w-[500px] mx-auto px-4 pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">기억력 지수 테스트</h1>
        <p className="text-base text-gray-600 mb-8">
          12문제로 당신의 뇌 메모리를 테스트합니다.
          <br />
          감성 저장소인지, 금붕어인지 직접 확인해보세요!
        </p>
      </motion.div>

      {!isStarted ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Button onClick={startTest} size="lg" className="w-full py-6 text-lg rounded-xl">
            테스트 시작하기
          </Button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-6 shadow-lg rounded-xl">
              <div className="mb-4">
                <Progress value={(currentQuestionIndex / QUESTIONS.length) * 100} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {currentQuestionIndex + 1} / {QUESTIONS.length}
                  </p>
                  {showQuestion && (
                    <p className="text-lg font-semibold text-primary">
                      {timeLeft}초
                    </p>
                  )}
                </div>
              </div>

              {showQuestion ? (
                <div className={`${currentQuestion.type === 'image' ? 'min-h-[350px] flex items-center justify-center' : ''}`}>
                  {renderQuestion(currentQuestion)}
                </div>
              ) : (
                <>
                  {showQuestionText && (
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-4 leading-relaxed">
                        {currentQuestion.question}
                      </h3>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoiceClick(index)}
                        variant={selectedAnswerIndex === index ? "default" : "outline"}
                        disabled={isSubmitting && !showResultButton}
                        className={`w-full py-4 text-base font-medium rounded-lg hover:bg-primary hover:text-white transition-colors focus:ring-2 focus:ring-primary ${
                          currentQuestionIndex === QUESTIONS.length - 1 
                            ? "last-question-button border-2" 
                            : ""
                        }`}
                      >
                        {choice}
                      </Button>
                    ))}
                  </div>
                  
                  {showResultButton && (
                    <div className="mt-6">
                      <Button 
                        onClick={() => navigateToResultPage(correctAnswers)}
                        className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 rounded-xl font-bold text-white"
                      >
                        결과 보기
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}