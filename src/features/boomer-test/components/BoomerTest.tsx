"use client"

import { useState, useEffect, useRef } from "react"
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
  BOOMER_TEST_METADATA 
} from "../constants"
import { BoomerQuestion, BoomerScoreRange, BoomerTestResult } from "../types"
import { incrementParticipantCount } from "@/features/test-cards/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useCopyToClipboard } from "usehooks-ts"
import { useSession } from "next-auth/react"

export function BoomerTest() {
  const router = useRouter()
  const { toast } = useToast()
  const [_, copy] = useCopyToClipboard()
  const { data: session } = useSession()
  const resultCardRef = useRef<HTMLDivElement>(null)

  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<BoomerTestResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isSavingImage, setIsSavingImage] = useState(false)

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
      ) as BoomerScoreRange

      setResult({
        totalScore,
        scoreRange,
        testInfo: TEST_INFO
      })
      setShowResult(true)

      try {
        await incrementParticipantCount(BOOMER_TEST_METADATA.id)
      } catch (error) {
        console.error('참여자 수 증가 실패:', error)
      }
    }
  }

  const saveTestResult = async () => {
    if (!session?.user || !result) return
    
    try {
      const response = await fetch('/api/user-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: 'boomer-test',
          testTitle: '나의 꼰대력 테스트',
          resultSummary: `꼰대력 ${result.totalScore}/24 - ${result.scoreRange.resultTitle}`,
          imageUrl: result.scoreRange.resultGifUrl || '',
        }),
      })
      
      if (!response.ok) {
        console.error('테스트 결과 저장 실패')
      }
    } catch (error) {
      console.error('테스트 결과 저장 중 오류:', error)
    }
  }

  useEffect(() => {
    if (result && session?.user) {
      saveTestResult()
    }
  }, [result, session])

  const shareResult = async () => {
    if (!result) return
    setIsSharing(true)

    try {
      const testUrl = window.location.href
      await copy(testUrl)
      
      toast({
        title: "공유 링크가 복사되었습니다",
        description: "SNS나 메신저에 붙여넣기 하세요",
      })
    } catch (err) {
      console.error('공유 오류:', err)
      toast({
        title: "공유하기 실패",
        description: "링크를 복사할 수 없습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  // GIF 경로 결정 함수
  const getResultGifUrl = (range: BoomerScoreRange) => {
    return range.resultGifUrl;
  }

  // 이미지로 저장하기 함수
  const saveAsImage = async () => {
    if (!result || !resultCardRef.current) return
    setIsSavingImage(true)
    
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(resultCardRef.current)
      const link = document.createElement('a')
      link.download = `꼰대력테스트-결과-${result.totalScore}점.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      
      toast({
        title: "이미지 저장 완료",
        description: "결과 이미지가 다운로드되었습니다.",
      })
    } catch (error) {
      console.error('이미지 저장 오류:', error)
      toast({
        title: "이미지 저장 실패",
        description: "이미지를 저장할 수 없습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSavingImage(false)
    }
  }

  // 다른 테스트 페이지로 이동
  const goToOtherTests = () => {
    router.push('/tests')
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const progress = isStarted ? ((currentQuestionIndex + 1) / QUESTIONS.length) * 100 : 0

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
          <Card className="p-8 mb-6 text-center">
            <h2 className="text-2xl font-bold mb-6 text-amber-600">나의 꼰대력은?!</h2>
            <div className="mb-6">
              <img 
                src="https://media.giphy.com/media/X7Y0QsivnxhHa/giphy.gif" 
                alt="꼰대 움직이는 이미지" 
                className="rounded-lg mx-auto mb-4 w-full max-w-[300px]"
              />
              <p className="text-gray-700 text-sm mb-6 italic">
                ※ "요즘 것들은 왜 이런지 모르겠어..."라고 생각해본 적 있으신가요?
              </p>
            </div>
            <Button 
              onClick={startTest} 
              size="lg" 
              className="w-full py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              테스트 시작하기
            </Button>
          </Card>
        </motion.div>
      ) : showResult ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* 프레임 - 회전 효과와 테이프 추가 */}
            <div 
              ref={resultCardRef}
              className="relative w-full max-w-[350px] sm:max-w-[400px] mb-6 transform rotate-1 result-card"
            >
              {/* 테이프 효과 */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-amber-100 opacity-80 z-10 rotate-1"></div>
              
              {/* 결과 프레임 */}
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
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-amber-600">{result!.scoreRange.resultTitle}</h3>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {result!.scoreRange.resultTags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="text-xs sm:text-sm bg-amber-100 text-amber-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-1 sm:mt-2 inline-block bg-amber-100 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium text-amber-800 transform -rotate-1 text-sm sm:text-base"
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
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 mb-6 w-full"
            >
              <h4 className="text-lg font-semibold mb-2">결과 해석</h4>
              <p className="text-gray-700 mb-4">{result!.scoreRange.resultDescription}</p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-100"
              >
                <h4 className="text-md font-semibold mb-2 text-amber-700">상세 분석</h4>
                <p className="text-gray-700 text-sm mb-2">{result!.scoreRange.detailedDescription}</p>
              </motion.div>
              
              <div className="text-xs text-gray-500 italic mt-4">
                {TEST_DISCLAIMER}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full space-y-3"
            >
              <Button
                className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                onClick={saveAsImage}
                disabled={isSavingImage}
              >
                {isSavingImage ? '저장 중...' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    이미지로 저장하기
                  </>
                )}
              </Button>
              
              <Button
                className="w-full py-5 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                onClick={goToOtherTests}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" />
                </svg>
                다른 테스트 보기
              </Button>
              
              <Button
                className="w-full py-5 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                onClick={shareResult}
                disabled={isSharing}
              >
                {isSharing ? '공유 중...' : (
                  <>
                    <Share2 size={18} />
                    결과 공유하기
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="w-full"
        >
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>진행도</span>
              <span>{currentQuestionIndex + 1} / {QUESTIONS.length}</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-600" />
          </div>
          
          <Card className="mb-8 p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Q{currentQuestion.questionId}. {currentQuestion.questionText}
            </h3>
            <div className="space-y-3">
              {currentQuestion.choices.map((choice) => (
                <Button
                  key={choice.choiceId}
                  variant="outline"
                  className="w-full py-4 px-4 justify-start text-left border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors rounded-lg text-gray-700"
                  onClick={() => handleAnswer(currentQuestion.questionId, choice.score)}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-800 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                      {choice.choiceId}
                    </div>
                    <span>{choice.choiceText}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
} 