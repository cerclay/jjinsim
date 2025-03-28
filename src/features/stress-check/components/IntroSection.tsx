'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { STRESS_CHECK_DATA } from '../constants';
import Image from 'next/image';
import { BrainCog } from 'lucide-react';

interface IntroSectionProps {
  onStart: () => void;
}

export function IntroSection({ onStart }: IntroSectionProps) {
  return (
    <Card className="w-full max-w-[500px] mx-auto overflow-hidden border-2 border-purple-500/20 bg-white">
      <CardHeader className="text-center bg-white border-b border-purple-100 p-6">
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-purple-300 bg-purple-100">
              <div className="text-6xl">🧠</div>
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-purple-900">{STRESS_CHECK_DATA.title}</CardTitle>
        <CardDescription className="text-lg font-medium mt-2 text-black">
          {STRESS_CHECK_DATA.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <p className="text-center mb-6 text-black">
          {STRESS_CHECK_DATA.description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-purple-100 text-purple-700 rounded-full p-2 w-8 h-8 flex items-center justify-center shrink-0">
              ✓
            </div>
            <span className="text-black">단 12개의 짧은 질문으로 스트레스 지수를 측정해드려요!</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-purple-100 text-purple-700 rounded-full p-2 w-8 h-8 flex items-center justify-center shrink-0">
              ✓
            </div>
            <span className="text-black">지금 나의 멘탈 상태를 한눈에 확인해보세요</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-purple-100 text-purple-700 rounded-full p-2 w-8 h-8 flex items-center justify-center shrink-0">
              ✓
            </div>
            <span className="text-black">재미있는 결과와 함께 나의 스트레스 지수를 알아봐요</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-white border-t border-purple-100 flex flex-col">
        <Button onClick={onStart} className="w-full text-lg font-medium py-6 bg-purple-600 hover:bg-purple-700 text-white">
          테스트 시작하기
        </Button>
        <p className="text-xs text-center mt-4 text-gray-600">
          약 1분 정도 소요됩니다
        </p>
      </CardFooter>
    </Card>
  );
} 