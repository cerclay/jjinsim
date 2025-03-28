'use client';

import { useState } from 'react';
import { Question } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionItemProps {
  question: Question;
  onAnswer: (questionId: number, answerIndex: number) => void;
  isActive: boolean;
}

export function QuestionItem({ question, onAnswer, isActive }: QuestionItemProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onAnswer(question.id, index);
  };

  if (!isActive) return null;

  return (
    <Card className="w-full max-w-[500px] mx-auto mb-4 animate-fadeIn bg-white shadow-lg border border-gray-100">
      <CardHeader className="pb-4 border-b border-gray-100 bg-white">
        <CardTitle className="text-xl font-bold text-center text-gray-900">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 pb-4 bg-white">
        <div className="grid grid-cols-1 gap-3">
          {question.choices.map((choice, index) => (
            <Button
              key={index}
              variant={selectedIndex === index ? "default" : "outline"}
              className={`justify-start h-auto py-4 px-5 text-left transition-all ${
                selectedIndex === index 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md" 
                  : "text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-purple-300 bg-white"
              }`}
              onClick={() => handleSelect(index)}
            >
              <span className={`mr-3 font-bold text-lg ${selectedIndex === index ? 'text-white' : 'text-purple-600'}`}>
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-base">
                {choice}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}