'use client';

import { useState, useEffect, useCallback } from 'react';
import { IQTestQuestion, TestState, TestResult, IQRange } from '../types';
import { IQ_TEST_DATA } from '../constants';

export const useIQTest = () => {
  const [state, setState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: Array(IQ_TEST_DATA.questions.length).fill(-1),
    timeRemaining: IQ_TEST_DATA.time_limit_seconds,
    isCompleted: false,
    result: null,
  });

  const currentQuestion = IQ_TEST_DATA.questions[state.currentQuestionIndex];
  const totalQuestions = IQ_TEST_DATA.questions.length;
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
      return answer === IQ_TEST_DATA.questions[index].answer_index ? count + 1 : count;
    }, 0);

    const matchingRange = IQ_TEST_DATA.iq_ranges.find(
      (range: IQRange) => 
        correctAnswers >= range.min_correct && 
        correctAnswers <= range.max_correct
    ) || IQ_TEST_DATA.iq_ranges[0];

    return {
      correctAnswers,
      totalQuestions,
      iqScore: matchingRange.iq_score,
      resultTitle: matchingRange.title,
      resultDescription: matchingRange.description,
      tags: matchingRange.tags,
      timeSpent: IQ_TEST_DATA.time_limit_seconds - state.timeRemaining,
    };
  }, [state.answers, state.timeRemaining, totalQuestions]);

  // 테스트 완료 시 결과 계산
  useEffect(() => {
    if (state.isCompleted && !state.result) {
      const result = calculateResult();
      setState(prev => ({ ...prev, result }));
    }
  }, [state.isCompleted, state.result, calculateResult]);

  // 테스트 재시작
  const restartTest = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: Array(IQ_TEST_DATA.questions.length).fill(-1),
      timeRemaining: IQ_TEST_DATA.time_limit_seconds,
      isCompleted: false,
      result: null,
    });
  }, []);

  return {
    state,
    currentQuestion,
    progress,
    totalQuestions,
    selectAnswer,
    restartTest,
    testData: IQ_TEST_DATA,
  };
}; 