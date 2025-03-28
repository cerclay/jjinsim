import React from 'react';
import { Metadata } from 'next';
import { TestContainer } from '@/features/tests/iq-test/components/TestContainer';

export const metadata: Metadata = {
  title: '나의 진짜 IQ테스트 - 유머버전',
  description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
  openGraph: {
    title: '나의 진짜 IQ테스트 - 유머버전',
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은?',
    images: ['https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ'],
  },
};

export default async function IQTestPage() {
  return (
    <main className="py-10 px-4 md:py-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
              나의 진짜 IQ테스트 - 유머버전
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              재미있는 15개의 문제로 당신의 IQ를 테스트해보세요! 
              시간제한이 있으니 서둘러주세요!
            </p>
          </div>
          
          <TestContainer />
        </div>
      </div>
    </main>
  );
} 