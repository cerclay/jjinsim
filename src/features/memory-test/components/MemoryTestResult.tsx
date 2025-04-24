"use client"

import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import html2canvas from "html2canvas"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { Check, Download, Link, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestResult, MemoryIndexRange } from "../types"
import { MEMORY_INDEX_RANGES } from "../constants"

const RESULT_IMAGES = [
  // 기억력 지수에 따른 GIF 이미지 (텍스트 없는 순수 이미지)
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YwYmhpZ3FlcXlra3p0dTUxZHJkZGFhNGpsNjZ1NGEyeTVobjh0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tJDz8mPYyUJZ1Pg9fY/giphy.gif", // 매우 낮음 (0-20)
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm03bTUxNWY3NDJqZ2JkMTRqOXpicXMyMWw0dWVoZGh4Njk0NXY3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HUbtILos6CdAtxu/giphy.gif", // 낮음 (21-40)
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXJzMG9mdHBqM3J5bGxhNjBzdnMycHRvaXB3M2V5ZXJzcTFnczBhZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKNrUbDJuFuaJUBGpR/giphy.gif", // 보통 (41-60)
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGlvbGljOGl1Y2FoaDdvZzA2YXU1MjhvNnhqZDI5aGtoazYzanJudCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdIuqJoo8QdKlnW/giphy.gif", // 높음 (61-80)
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQyeWo0ZzkxOXdtYTRjczI4bDE2aHE1dWMxa3ZleHdkZ2x4N2V5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W3a0zO282fuBJm6Cy0/giphy.gif", // 매우 높음 (81-100)
]

// 결과 이미지 인덱스 계산 함수
const getResultImageIndex = (memoryIndex: number): number => {
  if (memoryIndex <= 20) return 0
  if (memoryIndex <= 40) return 1
  if (memoryIndex <= 60) return 2
  if (memoryIndex <= 80) return 3
  return 4
}

export function MemoryTestResult() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const resultCardRef = useRef<HTMLDivElement>(null)
  const [showRestartButton, setShowRestartButton] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    try {
      // URL 파라미터에서 결과 데이터 가져오기
      const correctCount = Number(searchParams?.get("correct") || "0")
      const totalQuestions = Number(searchParams?.get("total") || "10")
      const timeSpent = Number(searchParams?.get("time") || "0")
      
      console.log('결과 페이지 로드됨, 파라미터:', { correctCount, totalQuestions, timeSpent });
      
      // 기억력 지수 계산 (0-100)
      const memoryIndex = Math.round((correctCount / totalQuestions) * 100)
      
      // 기억력 범위 찾기
      let range = MEMORY_INDEX_RANGES.find(
        (r) => correctCount >= r.min_correct && correctCount <= r.max_correct
      )
      
      // 범위를 찾지 못한 경우 기본값 설정
      if (!range) {
        console.warn('해당 정답 개수에 맞는 범위를 찾지 못했습니다:', correctCount);
        // 가장 가까운 범위 찾기
        if (correctCount < MEMORY_INDEX_RANGES[0].min_correct) {
          range = MEMORY_INDEX_RANGES[0];
        } else {
          range = MEMORY_INDEX_RANGES[MEMORY_INDEX_RANGES.length - 1];
        }
      }
      
      setResult({
        correctCount,
        totalQuestions,
        memoryIndex,
        range,
        timeSpent,
      })
      
      setLoading(false);
      
      // 색종이 효과 실행
      if (showConfetti) {
        try {
          launchConfetti();
        } catch (confettiError) {
          console.error('색종이 효과 실행 중 오류:', confettiError);
        }
      }
    } catch (e) {
      console.error('결과 데이터 로딩 중 오류:', e);
      setError('결과 데이터를 로딩하는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  }, [searchParams, showConfetti])
  
  // 색종이 효과 분리
  const launchConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        setShowConfetti(false)
        return
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // 양쪽에서 색종이 발사
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }
  
  // 이미지 저장 함수
  const saveAsImage = async () => {
    if (resultCardRef.current) {
      try {
        toast({
          title: "이미지 생성 중...",
          description: "잠시만 기다려주세요.",
        })
        
        // 일시적으로 버튼 숨기기
        const buttons = resultCardRef.current.querySelectorAll("button")
        buttons.forEach((button) => {
          button.style.visibility = "hidden"
        })
        
        const canvas = await html2canvas(resultCardRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
        })
        
        // 워터마크 추가
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.font = "14px Arial"
          ctx.fillStyle = "rgba(150, 150, 150, 0.7)"
          ctx.fillText("iNSIM.ME 기억력 테스트", 20, canvas.height - 20)
        }
        
        // 버튼 다시 표시
        buttons.forEach((button) => {
          button.style.visibility = "visible"
        })
        
        // 이미지 다운로드
        const link = document.createElement("a")
        link.download = "기억력-테스트-결과.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
        
        toast({
          title: "이미지 저장 완료!",
          description: "결과 이미지가 다운로드되었습니다.",
        })
      } catch (error) {
        console.error("이미지 저장 중 오류 발생:", error)
        toast({
          title: "이미지 저장 실패",
          description: "이미지를 저장하는 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      }
    }
  }
  
  // 테스트 공유 함수
  const shareTest = () => {
    try {
      const url = window.location.href.split("?")[0].replace("/result", "")
      navigator.clipboard.writeText(url)
      toast({
        title: "링크 복사 완료!",
        description: "테스트 링크가 클립보드에 복사되었습니다.",
      })
    } catch (error) {
      console.error("링크 복사 중 오류 발생:", error)
      toast({
        title: "링크 복사 실패",
        description: "링크를 복사하는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }
  
  // 로딩 중인 경우
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">결과 로딩 중...</h2>
          <p>기억력 테스트 결과를 불러오고 있습니다.</p>
        </div>
      </div>
    )
  }
  
  // 오류가 발생한 경우
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">오류 발생</h2>
          <p>{error}</p>
          <Button 
            onClick={() => window.location.href = "/tests/memory-test"} 
            className="mt-6"
          >
            다시 테스트하기
          </Button>
        </div>
      </div>
    )
  }
  
  // 결과가 없는 경우
  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">결과를 찾을 수 없습니다</h2>
          <p>다시 테스트를 진행해 주세요.</p>
          <Button 
            onClick={() => window.location.href = "/tests/memory-test"} 
            className="mt-6"
          >
            다시 테스트하기
          </Button>
        </div>
      </div>
    )
  }
  
  const imageIndex = getResultImageIndex(result.memoryIndex)
  
  // 결과 표시
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          기억력 테스트 결과
        </h1>
      </motion.div>
      
      <motion.div
        ref={resultCardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-0 pt-6 px-6 flex flex-col items-center">
            <CardTitle className="text-center text-2xl font-bold">
              당신의 기억력 지수는{" "}
              <span className="text-3xl text-primary">{result.memoryIndex}</span>점
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              ({result.correctCount}/{result.totalQuestions} 문제 정답)
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-6 relative aspect-square max-w-xs mx-auto">
              <Image
                src={RESULT_IMAGES[imageIndex]}
                alt={`기억력 지수 ${result.memoryIndex}점`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-center">
                {result.range.title}
              </h3>
              
              <p className="text-center text-muted-foreground whitespace-pre-line">
                {result.range.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {result.range.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-primary-foreground/50 rounded-lg p-4 mt-4">
                <h4 className="font-medium mb-2">테스트 통계</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>소요 시간</span>
                    <span className="font-medium">{Math.floor(result.timeSpent / 60)}분 {result.timeSpent % 60}초</span>
                  </div>
                  <div className="flex justify-between">
                    <span>정확도</span>
                    <span className="font-medium">{Math.round((result.correctCount / result.totalQuestions) * 100)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 px-6 py-6 border-t bg-muted/20">
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button onClick={saveAsImage} className="h-11 gap-2" aria-label="결과 이미지 저장">
                <Download size={18} />
                이미지 저장
              </Button>
              <Button variant="outline" className="h-11 gap-2" onClick={() => window.location.href = "/tests"} aria-label="다른 테스트 보기">
                <Link size={18} />
                다른 테스트 보기
              </Button>
            </div>
            
            <Button variant="secondary" className="w-full h-11 gap-2" onClick={shareTest} aria-label="테스트 공유하기">
              <Share2 size={18} />
              테스트 공유하기
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <div
        className="relative w-full mt-4 text-right"
        onMouseEnter={() => setShowRestartButton(true)}
        onMouseLeave={() => setShowRestartButton(false)}
      >
        {showRestartButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = "/tests/memory-test"}
              aria-label="테스트 다시하기"
              className="text-xs"
            >
              테스트 다시하기
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
} 