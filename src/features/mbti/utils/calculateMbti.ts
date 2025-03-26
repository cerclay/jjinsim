/**
 * MBTI 검사 결과를 계산하는 함수
 * 
 * @param answers - MBTI 질문에 대한 사용자의 답변 배열
 * @returns 계산된 MBTI 유형 문자열 (예: "ENFP")
 */
export function calculateMbtiResult(answers: string[]): string {
  // MBTI 차원에 대한 점수 초기화
  const scores: Record<string, number> = {
    E: 0, I: 0, 
    S: 0, N: 0, 
    T: 0, F: 0, 
    J: 0, P: 0
  };

  // 각 답변에 대해 해당하는 유형 점수 증가
  answers.forEach((value) => {
    if (value && scores[value] !== undefined) {
      scores[value] += 1;
    }
  });

  // 각 차원에서 더 높은 점수를 가진 유형을 선택하여 MBTI 결과 생성
  const result =
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  return result;
} 