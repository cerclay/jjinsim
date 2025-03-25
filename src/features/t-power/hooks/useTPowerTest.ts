"use client";

import { useState } from "react";
import { tPowerData } from "../data";
import { TPowerResult } from "../data/types";

interface UseTPowerTestReturn {
  currentQuestion: number;
  totalQuestions: number;
  question: typeof tPowerData.questions[0] | null;
  answers: (number | null)[];
  selectAnswer: (optionId: number) => void;
  nextQuestion: () => boolean;
  prevQuestion: () => void;
  calculateResult: () => TPowerResult | null;
  isCompleted: boolean;
  progress: number;
  restart: () => void;
}

export const useTPowerTest = (): UseTPowerTestReturn => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(tPowerData.questions.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalQuestions = tPowerData.questions.length;
  const question = currentQuestion < totalQuestions ? tPowerData.questions[currentQuestion] : null;
  const progress = (currentQuestion / totalQuestions) * 100;

  const selectAnswer = (optionId: number) => {
    const newAnswers = [...answers];
    const option = question?.options.find((o) => o.id === optionId);
    if (option) {
      newAnswers[currentQuestion] = option.score;
      setAnswers(newAnswers);
    }
  };

  const nextQuestion = (): boolean => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      return true;
    } else {
      setIsCompleted(true);
      return true;
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = (): TPowerResult | null => {
    if (!isCompleted) return null;

    const totalScore = answers.reduce((sum, score) => (score !== null ? sum + score : sum), 0);
    
    for (const result of tPowerData.results) {
      const [min, max] = result.range.split(" ~ ").map(Number);
      if (totalScore >= min && totalScore <= max) {
        return result;
      }
    }

    return null;
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(tPowerData.questions.length).fill(null));
    setIsCompleted(false);
  };

  return {
    currentQuestion,
    totalQuestions,
    question,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    calculateResult,
    isCompleted,
    progress,
    restart,
  };
}; 