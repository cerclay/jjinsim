"use client";

import { ATTACHMENT_RESULTS } from "../constants/testData";

export function calculateAttachmentResult(selections: string[]): string {
  const typeCounts: Record<string, number> = {
    secure: 0,
    anxious: 0,
    avoidant: 0
  };

  // 각 타입별 선택 횟수 계산
  selections.forEach(type => {
    if (type in typeCounts) {
      typeCounts[type]++;
    }
  });

  // 가장 많이 선택된 타입 찾기
  let maxCount = 0;
  let dominantType = "secure"; // 기본값

  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type;
    }
  });

  return dominantType;
}

export function getAttachmentData(type: string) {
  return ATTACHMENT_RESULTS[type] || ATTACHMENT_RESULTS.secure;
}

// 문제 순서를 섞는 함수
export function shuffleQuestions<T>(questions: T[]): T[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 