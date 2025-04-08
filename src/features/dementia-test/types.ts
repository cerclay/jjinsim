'use client';

export type DementiaQuestion = {
  id: number;
  type: 'orientation' | 'memory' | 'attention' | 'visuospatial' | 'recall' | 'language' | 'executive';
  questionText: string;
  options?: string[];
  answerIndex?: number;
  imageUrl?: string;
  hint?: string;
  timeLimitSeconds?: number;
  memoryItems?: string[];
  score: number;
};

export type DementiaTestSection = {
  id: string;
  title: string;
  description: string;
  questions: DementiaQuestion[];
};

export type UserAnswer = {
  questionId: number;
  selectedAnswer: string | number | null;
  isCorrect: boolean;
  score: number;
  maxScore: number;
};

export type DementiaTestResult = {
  totalScore: number;
  maxScore: number;
  scorePercentage: number;
  answers: UserAnswer[];
  cognitiveAreas: {
    [key: string]: {
      score: number;
      maxScore: number;
      percentage: number;
    }
  };
  resultCategory: ResultCategory;
  date: string;
};

export type ResultCategory = {
  label: string;
  description: string;
  recommendation: string;
  color: string;
  minPercentage: number;
  maxPercentage: number;
};

export const RESULT_CATEGORIES: ResultCategory[] = [
  {
    label: "정상",
    description: "인지 기능이 정상 범위 내에 있습니다.",
    recommendation: "인지 건강을 유지하기 위해 규칙적인 두뇌 활동과 운동을 계속하세요.",
    color: "green",
    minPercentage: 85,
    maxPercentage: 100
  },
  {
    label: "경도 인지 저하",
    description: "정상과 치매 사이의 경계 상태로, 일부 인지 영역에서 약간의 저하가 관찰됩니다.",
    recommendation: "정기적인 인지 기능 체크와 함께 두뇌 활동을 활발히 유지하세요.",
    color: "yellow",
    minPercentage: 70,
    maxPercentage: 84
  },
  {
    label: "중등도 인지 저하",
    description: "인지 기능의 상당한 저하가 관찰되며, 일상생활에 어려움이 있을 수 있습니다.",
    recommendation: "전문의와 상담하여 정확한 평가를 받으세요.",
    color: "orange",
    minPercentage: 50,
    maxPercentage: 69
  },
  {
    label: "심각한 인지 저하",
    description: "여러 인지 영역에서 심각한 저하가 관찰됩니다.",
    recommendation: "즉시 전문의와 상담하고 정확한 진단을 받으세요.",
    color: "red",
    minPercentage: 0,
    maxPercentage: 49
  }
]; 