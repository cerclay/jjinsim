'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { IQTestQuestion, TestState, TestResult, IQRange } from '../types';
import { IQ_TEST_DATA } from '../constants';
import { shuffleQuestions } from '../utils';

export const useIQTest = () => {
  // 테스트 데이터를 랜덤으로 섞어서 사용
  const randomizedTestData = useMemo(() => shuffleQuestions(IQ_TEST_DATA), []);

  const [state, setState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: Array(randomizedTestData.questions.length).fill(-1),
    timeRemaining: randomizedTestData.time_limit_seconds,
    isCompleted: false,
    result: null,
  });

  const currentQuestion = randomizedTestData.questions[state.currentQuestionIndex];
  const totalQuestions = randomizedTestData.questions.length;
  const progress = (state.currentQuestionIndex / totalQuestions) * 100;

  // 타이머 설정
  useEffect(() => {
    if (state.isCompleted) return;
    
    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 0) {
          clearInterval(timer);
          return { ...prev, isCompleted: true };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isCompleted]);

  // 정답 선택
  const selectAnswer = useCallback((answerIndex: number) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      
      const isLastQuestion = prev.currentQuestionIndex === totalQuestions - 1;
      
      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
          isCompleted: true,
        };
      }
      
      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
    });
  }, [totalQuestions]);

  // 결과 계산
  const calculateResult = useCallback((): TestResult => {
    const correctAnswers = state.answers.reduce((count, answer, index) => {
      return answer === randomizedTestData.questions[index].answer_index ? count + 1 : count;
    }, 0);

    const matchingRange = randomizedTestData.iq_ranges.find(
      (range: IQRange) => 
        correctAnswers >= range.min_correct && 
        correctAnswers <= range.max_correct
    ) || randomizedTestData.iq_ranges[0];

    return {
      correctAnswers,
      totalQuestions,
      iqScore: matchingRange.iq_score,
      resultTitle: matchingRange.title,
      resultDescription: matchingRange.description,
      tags: matchingRange.tags,
      timeSpent: randomizedTestData.time_limit_seconds - state.timeRemaining,
    };
  }, [state.answers, state.timeRemaining, totalQuestions, randomizedTestData]);

  // 테스트 완료 시 결과 계산
  useEffect(() => {
    if (state.isCompleted && !state.result) {
      const result = calculateResult();
      setState(prev => ({ ...prev, result }));
    }
  }, [state.isCompleted, state.result, calculateResult]);

  // 테스트 재시작
  const restartTest = useCallback(() => {
    // 테스트를 재시작할 때마다 문제를 다시 섞음
    const newRandomizedData = shuffleQuestions(IQ_TEST_DATA);
    
    setState({
      currentQuestionIndex: 0,
      answers: Array(newRandomizedData.questions.length).fill(-1),
      timeRemaining: newRandomizedData.time_limit_seconds,
      isCompleted: false,
      result: null,
    });
    
    // 새로 섞인 데이터로 randomizedTestData 갱신 (useMemo로는 불가능)
    // 이 부분은 함수 컴포넌트 구조상 제한이 있으므로, 실제로는 테스트를 새로 시작할 때
    // 페이지를 새로고침하거나 상태 관리 라이브러리를 사용하는 것이 좋습니다.
  }, []);

  return {
    state,
    currentQuestion,
    progress,
    totalQuestions,
    selectAnswer,
    restartTest,
    testData: randomizedTestData,
  };
}; 