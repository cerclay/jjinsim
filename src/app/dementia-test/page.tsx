"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Clock, PlayCircle } from 'lucide-react';

import { TestResult } from '@/features/dementia-test/components/TestResult';
import { DementiaTest } from '@/features/dementia-test/components/DementiaTest';
import { DementiaTestResult } from '@/features/dementia-test/types';

// 테스트 단계 타입
type TestStep = 'intro' | 'test' | 'results';

export default function DementiaTestPage() {
  // 현재 테스트 단계 상태
  const [currentStep, setCurrentStep] = useState<TestStep>('intro');
  // 테스트 결과 상태
  const [testResults, setTestResults] = useState<DementiaTestResult | null>(null);

  // 테스트 시작 핸들러
  const handleStartTest = () => {
    setCurrentStep('test');
  };

  // 테스트 완료 핸들러
  const handleTestComplete = (results: DementiaTestResult) => {
    setTestResults(results);
    setCurrentStep('results');
  };

  // 테스트 다시 시작 핸들러
  const handleRetakeTest = () => {
    setCurrentStep('intro');
    setTestResults(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-[500px]">
        {currentStep === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* 헤더 */}
            <div className="flex items-center mb-2">
              <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </div>

            {/* 썸네일 이미지 - 1280x702 비율 */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '1280/702' }}>
              <Image 
                src="/images/dementia-test/thumbnail.jpg" 
                alt="치매 간이 테스트" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-xs rounded-md mb-2">소요시간 3분</span>
                  <h1 className="text-2xl font-bold text-white">치매 간이 테스트</h1>
                </div>
              </div>
            </div>

            {/* 소개 및 테스트 시작 버튼 */}
            <div className="space-y-5">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-gray-700 mb-4">
                  이 테스트는 7가지 인지 영역을 평가하여 여러분의 인지 기능 상태를 확인해드립니다. 
                  <span className="font-semibold"> 단 3분</span>이 소요됩니다.
                </p>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-md transition-shadow">
                  <Button
                    onClick={handleStartTest}
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    3분 테스트 시작하기
                  </Button>
                </Card>
              </motion.div>

              {/* 테스트 설명 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 space-y-3"
              >
                <h2 className="text-base font-bold flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0" />
                  테스트는 다음 영역을 평가합니다:
                </h2>

                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">1. 지남력</h3>
                    <p className="text-xs text-gray-600">시간, 장소, 사람에 대한 인식 능력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">2. 기억력</h3>
                    <p className="text-xs text-gray-600">즉각적인 정보 기억 및 회상 능력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">3. 주의력</h3>
                    <p className="text-xs text-gray-600">집중력과 작업 기억력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">4. 시공간 능력</h3>
                    <p className="text-xs text-gray-600">시각적 정보 처리 및 공간 인식 능력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">5. 언어 능력</h3>
                    <p className="text-xs text-gray-600">언어 이해와 표현 능력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">6. 실행 기능</h3>
                    <p className="text-xs text-gray-600">판단, 추상적 사고, 문제 해결 능력</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-blue-700 text-sm">7. 지연 회상</h3>
                    <p className="text-xs text-gray-600">시간이 지난 후 정보를 회상하는 능력</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-medium flex items-center text-amber-800 text-sm">
                    <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                    정기적인 테스트가 중요합니다
                  </h3>
                  <p className="text-xs text-amber-700 mt-1">
                    인지 기능은 시간에 따라 변화할 수 있으므로, 정기적인 테스트로 상태를 모니터링하는 것이 중요합니다. 
                    치매 예방에 관한 더 많은 정보를 원하시면
                    <Link 
                      href="https://www.youtube.com/playlist?list=PLhOyPBxPiTkiT-1xFzQOL9t0cKJQr7ZUC" 
                      target="_blank" 
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center mx-1"
                    >
                      관련 영상
                      <PlayCircle className="ml-1 h-3 w-3" />
                    </Link>
                    을 참고하세요.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === 'test' && (
          <DementiaTest 
            onComplete={handleTestComplete} 
            onBack={handleRetakeTest} 
          />
        )}

        {currentStep === 'results' && testResults && (
          <TestResult 
            resultData={testResults} 
            onRetake={handleRetakeTest} 
          />
        )}
      </div>
    </main>
  );
} 