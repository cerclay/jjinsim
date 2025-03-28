'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span className="font-medium">{currentQuestion + 1}번 문제</span>
        <span>총 {totalQuestions}문제</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>시작</span>
        <span>진행률: {Math.round(progress)}%</span>
        <span>완료</span>
      </div>
    </div>
  );
}; 