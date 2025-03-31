"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { QUESTIONS, TIME_LIMIT_SECONDS, MEMORY_INDEX_RANGES, MEMORY_TEST_METADATA } from "../constants"
import { Question, TestResult } from "../types"
import { incrementParticipantCount } from "@/features/test-cards/api"

export function MemoryTest() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true)
  const [timeLeft, setTimeLeft] = useState(4) // 4초 타이머
  const [showQuestionText, setShowQuestionText] = useState(false) // 문제 텍스트 표시 여부
  const [result, setResult] = useState<TestResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showQuestion && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && showQuestion) {
      setShowQuestion(false)
      setShowQuestionText(true)
      setTimeLeft(4) // 타이머 리셋
    }
    return () => clearInterval(timer)
  }, [showQuestion, timeLeft])

  const startTest = () => {
    setIsStarted(true)
    setCurrentQuestionIndex(0)
    setCorrectAnswers(0)
    setTimeLeft(4)
    setShowQuestion(true)
    setShowQuestionText(false)
    setResult(null)
  }

  const handleAnswer = async (answerIndex: number) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    if (answerIndex === currentQuestion.answer_index) {
      setCorrectAnswers((prev) => prev + 1)
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowQuestion(true)
      setShowQuestionText(false)
      setTimeLeft(4) // 타이머 리셋
    } else {
      const range = MEMORY_INDEX_RANGES.find(
        (r) => correctAnswers >= r.min_correct && correctAnswers <= r.max_correct
      )!

      setResult({
        correctCount: correctAnswers,
        totalQuestions: QUESTIONS.length,
        memoryIndex: range.memory_index,
        range,
        timeSpent: TIME_LIMIT_SECONDS - timeLeft,
      })
      setShowResult(true)

      try {
        await incrementParticipantCount(MEMORY_TEST_METADATA.id)
      } catch (error) {
        console.error('Failed to increment participant count:', error)
      }
    }
  }

  const shareResult = async () => {
    if (!result) return

    const text = `
🧠 내 기억력 지수 테스트 결과:
${result.range.title}
기억력 지수: ${result.memoryIndex}점
정답률: ${(result.correctCount / result.totalQuestions * 100).toFixed(1)}%

${result.range.tags.join(" ")}
    `.trim()

    try {
      await navigator.clipboard.writeText(text)
      alert("결과가 클립보드에 복사되었습니다!")
    } catch (err) {
      console.error("클립보드 복사 실패:", err)
    }
  }

  const renderQuestion = (question: Question) => {
    if (question.type === 'image') {
      return (
        <div className="mb-6">
          <img 
            src={question.imageUrl} 
            alt="기억할 이미지" 
            className="w-full h-48 object-cover rounded-lg mb-4"
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
                renderQuestion(currentQuestion)
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
                        onClick={() => handleAnswer(index)}
                        variant="outline"
                        className="w-full py-4 text-base font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        {choice}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogTitle className="text-2xl font-bold mb-4">
            {result?.range.title}
          </DialogTitle>
          <div className="text-center">
            <div className="mb-4">
              <img
                src={`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGVmMjM5YTQtZDM4Ny00YjFkLWE5MDUtNmRiZjM5ZWY1YzRkMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TKTDn976rzVgky4/giphy.gif`}
                alt="결과 이미지"
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-2xl font-bold mb-2">기억력 지수: {result?.memoryIndex}점</p>
            <p className="text-gray-600 mb-6 text-lg">{result?.range.description}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {result?.range.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={shareResult} variant="outline" className="w-full py-4 text-lg rounded-xl">
                <Share2 className="w-5 h-5 mr-2" />
                결과 공유하기
              </Button>
              <Button onClick={() => setShowResult(false)} className="w-full py-4 text-lg rounded-xl">
                닫기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 