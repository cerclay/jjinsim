"use client";

/**
 * 선택한 답변을 기반으로 특성 점수를 계산합니다.
 * @param answers 선택한 답변의 배열
 * @returns 사용자의 특성(traits) 빈도수를 계산한 객체
 */
export function calculateTraitScores(answers: string[][]) {
  const traitScores: Record<string, number> = {
    I: 0, E: 0, N: 0, S: 0, F: 0, T: 0, J: 0, P: 0,
  };

  // 각 답변에서 특성들을 찾아 점수를 누적합니다
  answers.forEach(traits => {
    traits.forEach(trait => {
      if (traitScores[trait] !== undefined) {
        traitScores[trait] += 1;
      }
    });
  });

  return traitScores;
}

/**
 * 사용자 특성과 여행지 특성 간의 일치도를 계산합니다.
 * @param traitScores 사용자의 특성 점수
 * @param destinationTraits 여행지의 특성 배열
 * @returns 일치 점수 (높을수록 더 잘 맞음)
 */
export function calculateMatchScore(
  traitScores: Record<string, number>,
  destinationTraits: string[]
) {
  let matchScore = 0;

  // 여행지 특성 각각에 대해 사용자 점수를 더합니다
  destinationTraits.forEach(trait => {
    if (traitScores[trait]) {
      matchScore += traitScores[trait];
    }
  });

  return matchScore;
}

/**
 * 사용자 답변을 기반으로 가장 잘 맞는 여행지를 찾습니다.
 * @param answers 사용자가 선택한 답변의 특성 배열의 배열
 * @param destinations 가능한 여행지 목록과 각각의 특성
 * @returns 가장 잘 맞는 여행지 ID
 */
export function findBestTravelMatch(
  answers: string[][],
  destinations: { id: string; match_traits: string[] }[]
) {
  const traitScores = calculateTraitScores(answers);
  
  // 각 여행지별 일치 점수를 계산합니다
  const destinationScores = destinations.map(destination => ({
    id: destination.id,
    score: calculateMatchScore(traitScores, destination.match_traits)
  }));

  // 점수가 가장 높은 여행지를 찾습니다 (동점인 경우 랜덤 선택)
  destinationScores.sort((a, b) => b.score - a.score);
  
  // 최고 점수를 가진 여행지들을 모아둡니다
  const highestScore = destinationScores[0].score;
  const topDestinations = destinationScores.filter(d => d.score === highestScore);
  
  // 동점인 경우 랜덤 선택
  const randomIndex = Math.floor(Math.random() * topDestinations.length);
  return topDestinations[randomIndex].id;
}

/**
 * 여행지 데이터에서 ID로 여행지 정보를 찾습니다.
 * @param destinationId 여행지 ID
 * @param destinations 여행지 데이터 배열
 * @returns 찾은 여행지 데이터
 */
export function getTravelData(
  destinationId: string,
  destinations: any[]
) {
  return destinations.find(destination => destination.id === destinationId) || null;
} 