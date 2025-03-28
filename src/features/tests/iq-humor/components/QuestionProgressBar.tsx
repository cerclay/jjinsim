'use client';

import { Progress } from '@/components/ui/progress';
import { Clock, BrainCircuit } from 'lucide-react';

interface QuestionProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  remainingTime: number;
  totalTime: number;
}

export function QuestionProgressBar({
  currentQuestionIndex,
  totalQuestions,
  remainingTime,
  totalTime,
}: QuestionProgressBarProps) {
  // 문제 진행 상황에 대한 프로그레스 값 (0-100%)
  const questionProgress = Math.min(
    Math.round((currentQuestionIndex / totalQuestions) * 100),
    100
  );
  
  // 남은 시간에 대한 프로그레스 값 (0-100%)
  const timeProgress = Math.min(
    Math.round((remainingTime / totalTime) * 100),
    100
  );

  // 타이머 색상 결정 (시간이 적게 남을수록 빨간색으로)
  const getTimerColor = () => {
    if (timeProgress < 30) return 'text-red-600';
    if (timeProgress < 50) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="w-full max-w-[500px] mx-auto mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
        <div className="flex items-center">
          <BrainCircuit className="w-4 h-4 mr-1.5 text-purple-600" />
          <span>문제 {currentQuestionIndex} / {totalQuestions}</span>
        </div>
        <div className={`flex items-center ${getTimerColor()}`}>
          <Clock className="w-4 h-4 mr-1.5" />
          <span>
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="space-y-2.5">
        {/* 문제 진행 상황 프로그레스 바 */}
        <div className="relative pt-1">
          <div className="flex mb-1 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-purple-600">
                진행도
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-purple-600">
                {questionProgress}%
              </span>
            </div>
          </div>
          <Progress value={questionProgress} className="h-2 bg-gray-200" indicatorClassName="bg-purple-600" />
        </div>
        
        {/* 시간 진행 상황 프로그레스 바 */}
        <div className="relative pt-1">
          <div className="flex mb-1 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-purple-600">
                남은 시간
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-purple-600">
                {timeProgress}%
              </span>
            </div>
          </div>
          <Progress 
            value={timeProgress} 
            className="h-1.5 bg-gray-200"
            indicatorClassName={timeProgress < 30 ? 'bg-red-500' : timeProgress < 50 ? 'bg-orange-500' : 'bg-green-500'}
          />
        </div>
      </div>
    </div>
  );
} 