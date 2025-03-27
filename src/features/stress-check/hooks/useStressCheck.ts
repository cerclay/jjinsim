'use client';

import { useState, useCallback, useMemo } from 'react';
import { STRESS_CHECK_DATA } from '../constants';
import { Result, StepType } from '../lib/types';

export function useStressCheck() {
  const [currentStep, setCurrentStep] = useState<StepType>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const totalQuestions = STRESS_CHECK_DATA.questions.length;
  const progress = useMemo(() => {
    if (currentStep === 'intro') return 0;
    if (currentStep === 'result') return 100;
    return Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  }, [currentStep, currentQuestionIndex, totalQuestions]);

  const calculateResult = useCallback(() => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const matchedResult = STRESS_CHECK_DATA.results.find(
      (r) => totalScore >= r.range[0] && totalScore <= r.range[1]
    );
    return matchedResult || STRESS_CHECK_DATA.results[0];
  }, [scores]);

  const startTest = useCallback(() => {
    setCurrentStep('question');
    setCurrentQuestionIndex(0);
    setScores([]);
  }, []);

  const submitAnswer = useCallback((score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const finalResult = calculateResult();
      setResult(finalResult);
      setCurrentStep('result');
    }
  }, [currentQuestionIndex, scores, totalQuestions, calculateResult]);

  const resetTest = useCallback(() => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setScores([]);
    setResult(null);
  }, []);

  const currentQuestion = useMemo(() => {
    return currentStep === 'question' 
      ? STRESS_CHECK_DATA.questions[currentQuestionIndex] 
      : null;
  }, [currentStep, currentQuestionIndex]);

  return {
    currentStep,
    currentQuestion,
    currentQuestionIndex,
    progress,
    result,
    totalQuestions,
    startTest,
    submitAnswer,
    resetTest
  };
} 