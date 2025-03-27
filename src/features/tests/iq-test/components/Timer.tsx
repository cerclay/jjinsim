'use client';

import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime }) => {
  // 시간 형식 변환 (초 -> mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 타이머 진행률 계산
  const progress = (timeRemaining / totalTime) * 100;
  
  // 시간이 10초 이하면 경고 색상으로 변경
  const isWarning = timeRemaining <= 10;
  // 시간이 5초 이하면 심각한 경고
  const isDanger = timeRemaining <= 5;

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg shadow-sm transition-colors
      ${isDanger ? 'bg-red-50 border border-red-200' : 
        isWarning ? 'bg-amber-50 border border-amber-200' : 
        'bg-white border border-gray-100'}`}>
      {isDanger ? (
        <AlertTriangle className="text-red-500 animate-pulse" size={22} />
      ) : (
        <Clock className={`${isWarning ? 'text-amber-500 animate-pulse' : 'text-gray-700'}`} size={20} />
      )}
      <div className="flex flex-col w-full">
        <div className="flex justify-between text-sm mb-1">
          <span className={`font-semibold 
            ${isDanger ? 'text-red-600' : 
              isWarning ? 'text-amber-600' : 
              'text-gray-700'}`}>
            남은 시간
          </span>
          <span className={`font-bold 
            ${isDanger ? 'text-red-600' : 
              isWarning ? 'text-amber-600' : 
              'text-gray-700'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all
              ${isDanger ? 'bg-red-500 animate-pulse' : 
                isWarning ? 'bg-amber-500' : 
                'bg-gradient-to-r from-blue-500 to-purple-500'}`}
            style={{ width: `${progress}%`, transition: 'width 1s linear' }}
          />
        </div>
      </div>
    </div>
  );
}; 