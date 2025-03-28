'use client';

import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { ResultCard } from './ResultCard';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { useIQTest } from '../hooks/useIQTest';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

export const TestContainer: React.FC = () => {
  // 테스트가 시작되었는지 여부를 추적하는 상태 추가
  const [isTestStarted, setIsTestStarted] = useState(false);
  
  const {
    state,
    currentQuestion,
    progress,
    totalQuestions,
    selectAnswer,
    restartTest,
    testData,
  } = useIQTest();

  // 테스트 시작하기 버튼 클릭 핸들러
  const handleStartTest = () => {
    setIsTestStarted(true);
    // 테스트 시작 시 첫 번째 문제의 상태를 초기화하는 역할
    // restartTest 함수를 호출하여 테스트를 초기 상태로 재설정
    restartTest();
  };

  // 테스트 시작 전 인트로 화면
  if (!isTestStarted && !state.isCompleted) {
    return (
      <div className="w-full max-w-[500px] mx-auto px-4">
        <Card className="bg-white shadow-lg border-t-4 border-blue-500">
          <CardHeader className="text-center bg-blue-50 pb-6">
            <div className="flex justify-center mb-3">
              <Brain size={48} className="text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-800">
              {testData.title}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {testData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6 px-6 space-y-5">
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center">
                <span className="font-bold mr-2">🧩 문제 수:</span> 총 {totalQuestions}문제
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-2">⏱️ 제한 시간:</span> 문제당 {testData.time_limit_seconds}초
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-2">🎯 목표:</span> 최대한 많은 문제를 정확하게 풀어보세요!
              </p>
            </div>
            
            <Button 
              className="w-full py-6 text-lg"
              onClick={handleStartTest}
            >
              테스트 시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 테스트 결과 화면
  if (state.isCompleted && state.result) {
    return (
      <div className="w-full max-w-[500px] mx-auto">
        <ResultCard result={state.result} onRestart={restartTest} />
      </div>
    );
  }

  // 테스트 진행 화면
  return (
    <div className="w-full max-w-[500px] mx-auto px-4 space-y-5">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg">
        <div className="mb-3">
          <Timer timeRemaining={state.timeRemaining} totalTime={testData.time_limit_seconds} />
        </div>
        <ProgressBar currentQuestion={state.currentQuestionIndex} totalQuestions={totalQuestions} />
      </div>
      
      <QuestionCard
        question={currentQuestion}
        onSelectAnswer={selectAnswer}
        selectedAnswer={state.answers[state.currentQuestionIndex]}
      />
    </div>
  );
}; 