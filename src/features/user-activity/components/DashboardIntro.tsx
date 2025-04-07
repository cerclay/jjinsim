"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';

interface DashboardIntroProps {
  username: string;
}

export function DashboardIntro({ username }: DashboardIntroProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-violet-50 border-0 shadow-sm overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">
              안녕하세요, {username || '방문자'}님!
            </h2>
            <p className="text-gray-600 mb-4">
              대시보드에서 내 테스트 결과를 확인하고 나의 테스트 성향을 알아보세요.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                저장된 테스트 결과를 다시 확인할 수 있어요
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                당신이 어떤 유형의 테스트를 선호하는지 확인해 보세요
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                테스트를 더 완료할수록 더 많은 분석이 제공됩니다
              </div>
            </div>
            
            <div className="mt-5">
              <Link href="/tests">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  더 많은 테스트 시작하기
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-center">
            <div className="bg-white/80 p-3 rounded-full shadow-md">
              <Sparkles className="h-16 w-16 text-blue-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 