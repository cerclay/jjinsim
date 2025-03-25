"use client";

import TPowerTest from "@/features/t-power/components/TPowerTest";
import { Suspense } from "react";

export default function TPowerPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-full p-4 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">나의 T발력 수치는?</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        12개의 질문을 통해 당신의 T성향(논리/직설/분석 등) 지표를 측정해봅니다.
      </p>
      <Suspense fallback={<div>로딩 중...</div>}>
        <TPowerTest />
      </Suspense>
    </main>
  );
} 