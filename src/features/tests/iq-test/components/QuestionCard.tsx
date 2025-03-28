'use client';

import React from 'react';
import { IQTestQuestion } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  question: IQTestQuestion;
  onSelectAnswer: (index: number) => void;
  selectedAnswer?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectAnswer,
  selectedAnswer,
}) => {
  return (
    <Card className="w-full max-w-[500px] mx-auto bg-white shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <CardTitle className="text-center text-lg md:text-xl text-blue-800">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 gap-3 mt-2">
          {question.choices.map((choice, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full p-4 text-left justify-start h-auto hover:bg-blue-50 hover:text-blue-700 transition-colors
                ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => onSelectAnswer(index)}
            >
              <span className="font-semibold mr-3 text-center w-6 h-6 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                {String.fromCharCode(65 + index)}
              </span> 
              {choice}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 