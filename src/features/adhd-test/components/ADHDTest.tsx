"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  QUESTIONS, 
  SCORE_RANGES, 
  TEST_INFO, 
  TEST_DISCLAIMER,
  ADHD_TEST_METADATA 
} from "../constants"
import { ADHDQuestion, ADHDScoreRange, ADHDTestResult } from "../types"
import { incrementParticipantCount } from "@/features/test-cards/api"

export function ADHDTest() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<ADHDTestResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const startTest = () => {
    setIsStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setResult(null)
  }

  const handleAnswer = async (questionId: number, score: number) => {
    const newAnswers = { ...userAnswers, [questionId]: score }
    setUserAnswers(newAnswers)

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // 모든 문제 완료 후 결과 계산
      const totalScore = Object.values(newAnswers).reduce((sum, score) => sum + score, 0)
      
      const scoreRange = SCORE_RANGES.find(
        (range) => totalScore >= range.minScore && totalScore <= range.maxScore
      ) as ADHDScoreRange

      setResult({
        totalScore,
        scoreRange,
        testInfo: TEST_INFO
      })
      setShowResult(true)

      try {
        await incrementParticipantCount(ADHD_TEST_METADATA.id)
      } catch (error) {
        console.error('참여자 수 증가 실패:', error)
      }
    }
  }

  const shareResult = async () => {
    if (!result) return
    setIsSharing(true)

    const text = `
🧠 ADHD 테스트 결과:
${result.scoreRange.resultTitle}
총점: ${result.totalScore}점 / 24점

${result.scoreRange.resultDescription}
${result.scoreRange.resultTags.join(" ")}

${window.location.href}
    `.trim()

    try {
      // 모바일 환경에서는 Share API 사용, 지원하지 않으면 클립보드 복사로 폴백
      if (navigator.share) {
        await navigator.share({
          title: 'ADHD 테스트 결과',
          text: text,
          url: window.location.href
        });
        // Share API는 사용자가 공유한 후 자동으로 완료됨
      } else {
        await navigator.clipboard.writeText(text)
        alert("결과가 클립보드에 복사되었습니다!")
      }
    } catch (err) {
      console.error("공유 실패:", err)
      // 공유 실패 시 클립보드 복사로 폴백
      try {
        await navigator.clipboard.writeText(text)
        alert("결과가 클립보드에 복사되었습니다!")
      } catch (clipErr) {
        console.error("클립보드 복사도 실패:", clipErr)
        alert("공유에 실패했습니다. 다시 시도해주세요.")
      }
    } finally {
      setIsSharing(false)
    }
  }

  // GIF 경로 결정 함수
  const getResultGifUrl = (range: ADHDScoreRange) => {
    const gifMap = {
      "집중수호신": "https://media.giphy.com/media/8vZY0QZZjJzpxGwEzc/giphy.gif", // 집중하는 스마트한 고양이
      "약간의 ADHD 기질": "https://media.giphy.com/media/Pk3IBHzyvwB4QJjpyf/giphy.gif", // 귀여운 리스 산만함
      "아이디어 폭주형": "https://media.giphy.com/media/jSVxBKdnYNhXQTiY6p/giphy.gif", // 빠르게 움직이는 아이디어 번뜩임
      "정통 ADHD 전사": "https://media.giphy.com/media/3o7buhiXgPU8GmQp4Q/giphy.gif" // 정신없이 돌아다니는 움직임
    };
    
    return gifMap[range.resultTitle as keyof typeof gifMap] || "https://media.giphy.com/media/Pk3IBHzyvwB4QJjpyf/giphy.gif";
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <div className="max-w-[500px] mx-auto px-4 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">{TEST_INFO.testTitle}</h1>
        <p className="text-base text-gray-600 mb-8">
          {TEST_INFO.testDescription}
        </p>
      </motion.div>

      {!isStarted ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Button onClick={startTest} size="lg" className="w-full py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            테스트 시작하기
          </Button>
        </motion.div>
      ) : showResult ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* 폴라로이드 프레임 - 회전 효과와 테이프 추가 */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] mb-6 transform rotate-2">
              {/* 테이프 효과 */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-yellow-100 opacity-80 z-10 rotate-2"></div>
              
              {/* 폴라로이드 프레임 */}
              <div className="bg-white p-3 sm:p-4 rounded-md shadow-xl border-[10px] sm:border-[12px] border-white">
                <div className="bg-gray-100 rounded overflow-hidden mb-3 sm:mb-4">
                  <motion.img 
                    src={getResultGifUrl(result!.scoreRange)} 
                    alt="결과 이미지" 
                    className="w-full h-full object-cover"
                    initial={{ filter: "blur(10px)" }}
                    animate={{ filter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <motion.div 
                  className="p-2 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{result!.scoreRange.resultTitle}</h3>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {result!.scoreRange.resultTags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="text-xs sm:text-sm bg-indigo-100 text-indigo-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-1 sm:mt-2 inline-block bg-yellow-100 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium text-yellow-800 transform -rotate-1 text-sm sm:text-base"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    점수: {result!.totalScore}/24
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <Card className="w-full p-4 sm:p-6 mb-5 sm:mb-6 border-2 border-indigo-100 rounded-xl shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ADHD 테스트 결과</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed">
                  {result!.scoreRange.resultDescription}
                </p>
                <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-xs text-gray-600">
                    {TEST_DISCLAIMER}
                  </p>
                </div>
              </Card>
            </motion.div>

            <div className="flex flex-col w-full gap-3">
              <Button 
                onClick={shareResult} 
                variant="outline" 
                className="flex items-center justify-center gap-2 py-4 sm:py-5 text-sm sm:text-base font-medium border-2 border-indigo-200 hover:bg-indigo-50"
                disabled={isSharing}
              >
                <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                {isSharing ? "공유 중..." : "결과 공유하기"}
              </Button>
              <Button 
                onClick={() => {
                  setIsStarted(false)
                  setShowResult(false)
                }} 
                className="py-4 sm:py-5 text-sm sm:text-base font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                처음으로 돌아가기
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <Progress value={(currentQuestionIndex / QUESTIONS.length) * 100} className="h-2" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {currentQuestionIndex + 1} / {QUESTIONS.length}
                </p>
              </div>
            </div>

            <Card className="p-4 sm:p-6 shadow-lg rounded-xl mb-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 leading-relaxed">
                {currentQuestion.questionText}
              </h3>
              
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {currentQuestion.choices.map((choice) => (
                  <Button
                    key={choice.choiceId}
                    onClick={() => handleAnswer(currentQuestion.questionId, choice.score)}
                    variant="outline"
                    className="w-full py-3 sm:py-5 px-3 sm:px-4 text-left justify-start text-sm sm:text-base font-normal rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-2 sm:mr-3 text-xs sm:text-sm flex-shrink-0">
                      {choice.choiceId}
                    </span>
                    <span>{choice.choiceText}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
} 