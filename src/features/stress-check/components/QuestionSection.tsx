'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question } from '../lib/types';
import { motion } from 'framer-motion';

interface QuestionSectionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  onSubmit: (score: number) => void;
}

export function QuestionSection({
  question,
  currentIndex,
  totalQuestions,
  progress,
  onSubmit
}: QuestionSectionProps) {
  return (
    <Card className="w-full max-w-[500px] mx-auto overflow-hidden border-2 border-purple-500/20 bg-white">
      <CardHeader className="p-6 pb-2 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            진행률: {progress}%
          </span>
          <span className="text-sm font-medium text-black">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-purple-100" indicatorClassName="bg-purple-600" />
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-center py-4 text-black">{question.text}</h2>
          <div className="space-y-3">
            {question.choices.map((choice, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left p-4 h-auto bg-white text-black border-2 border-purple-200 hover:bg-purple-50"
                onClick={() => onSubmit(choice.score)}
              >
                <span className="flex items-center gap-3">
                  <span className="bg-purple-100 text-purple-600 border-2 border-purple-300 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-base">{choice.text}</span>
                </span>
              </Button>
            ))}
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="p-6 bg-white border-t border-purple-100 flex-col items-center gap-2">
        <p className="text-xs text-center text-gray-600">
          나에게 가장 가까운 반응을 선택해주세요
        </p>
      </CardFooter>
    </Card>
  );
} 