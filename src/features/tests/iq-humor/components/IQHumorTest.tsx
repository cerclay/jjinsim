'use client';

import { useState, useEffect, useCallback } from 'react';
import { IQTestData, TestResult } from '../types';
import { QuestionItem } from './QuestionItem';
import { QuestionProgressBar } from './QuestionProgressBar';
import { TestResult as TestResultComponent } from './TestResult';
import { calculateTestResult, shuffleQuestions } from '../utils';

interface IQHumorTestProps {
  testData: IQTestData;
}

export function IQHumorTest({ testData }: IQHumorTestProps) {
  // 테스트 상태
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  
  // 문제 관련 상태
  const [shuffledTestData, setShuffledTestData] = useState<IQTestData>(testData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  
  // 타이머 관련 상태
  const [remainingTime, setRemainingTime] = useState(testData.time_limit_seconds);
  const [testStartTime, setTestStartTime] = useState(0);
  const [testEndTime, setTestEndTime] = useState(0);
  
  // 결과 상태
  const [result, setResult] = useState<TestResult | null>(null);

  // 테스트 시작
  const startTest = useCallback(() => {
    const shuffled = shuffleQuestions(testData);
    setShuffledTestData(shuffled);
    setIsTestStarted(true);
    setTestStartTime(Date.now());
    setRemainingTime(testData.time_limit_seconds);
  }, [testData]);

  // 답변 처리
  const handleAnswer = useCallback((questionId: number, answerIndex: number) => {
    setAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(questionId, answerIndex);
      return newAnswers;
    });
    
    // 다음 문제로 자동 이동
    setTimeout(() => {
      if (currentQuestionIndex < shuffledTestData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finishTest();
      }
    }, 500);
  }, [currentQuestionIndex, shuffledTestData.questions.length]);

  // 테스트 종료
  const finishTest = useCallback(() => {
    setIsTestFinished(true);
    setTestEndTime(Date.now());
    
    // 맞은 문제 수 계산
    let correctCount = 0;
    shuffledTestData.questions.forEach(question => {
      const userAnswer = answers.get(question.id);
      if (userAnswer !== undefined && userAnswer === question.answer_index) {
        correctCount++;
      }
    });
    
    // 소요 시간 계산 (초 단위)
    const timeSpent = Math.round((Date.now() - testStartTime) / 1000);
    
    // 결과 계산
    const testResult = calculateTestResult(
      correctCount,
      shuffledTestData.questions.length,
      timeSpent,
      shuffledTestData
    );
    
    setResult(testResult);
  }, [shuffledTestData, answers, testStartTime]);

  // 타이머 로직
  useEffect(() => {
    if (!isTestStarted || isTestFinished) return;
    
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTestStarted, isTestFinished, finishTest]);

  // 재시작 로직
  const restartTest = useCallback(() => {
    setIsTestStarted(false);
    setIsTestFinished(false);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setRemainingTime(testData.time_limit_seconds);
    setResult(null);
    setTestStartTime(0);
    setTestEndTime(0);
  }, [testData.time_limit_seconds]);

  // 테스트 시작 화면
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center p-4 h-screen">
        <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-purple-600 h-2"></div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-3 text-center text-gray-900">{testData.title}</h1>
            <p className="text-gray-600 mb-6 text-center">{testData.description}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <h2 className="font-semibold mb-3 text-center text-gray-800">테스트 안내</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  총 {testData.questions.length}문제이며, 제한 시간은 {Math.floor(testData.time_limit_seconds / 60)}분 {testData.time_limit_seconds % 60}초입니다.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  모든 문제는 객관식이며, 가장 적절한 답을 선택해주세요.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  한번 선택하면 자동으로 다음 문제로 넘어갑니다.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  테스트 중간에 새로고침하면 처음부터 다시 시작해야 합니다.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  문제 순서는 매번 랜덤으로 제공됩니다.
                </li>
              </ul>
            </div>
            
            <button
              onClick={startTest}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              테스트 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 결과 화면
  if (isTestFinished && result) {
    return <TestResultComponent result={result} onRestart={restartTest} />;
  }

  // 테스트 진행 화면
  return (
    <div className="w-full max-w-lg mx-auto p-4 min-h-[90vh] flex flex-col">
      <QuestionProgressBar
        currentQuestionIndex={currentQuestionIndex + 1}
        totalQuestions={shuffledTestData.questions.length}
        remainingTime={remainingTime}
        totalTime={testData.time_limit_seconds}
      />
      
      {shuffledTestData.questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          isActive={index === currentQuestionIndex}
        />
      ))}
    </div>
  );
} 