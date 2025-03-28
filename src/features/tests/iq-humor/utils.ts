import { IQRange, IQTestData, TestResult } from './types';

// 랜덤으로 문제 순서를 섞는 함수
export const shuffleQuestions = (data: IQTestData) => {
  const shuffled = [...data.questions];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    ...data,
    questions: shuffled
  };
};

// 정답 개수를 기반으로 IQ 범위를 결정하는 함수
export const getIQRangeByCorrectAnswers = (
  correctAnswers: number,
  iqRanges: IQRange[]
): IQRange | undefined => {
  return iqRanges.find(
    (range) => 
      correctAnswers >= range.min_correct && 
      correctAnswers <= range.max_correct
  );
};

// 테스트 결과를 계산하는 함수
export const calculateTestResult = (
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  testData: IQTestData
): TestResult => {
  const iqRange = getIQRangeByCorrectAnswers(correctAnswers, testData.iq_ranges);
  
  if (!iqRange) {
    throw new Error('적합한 IQ 범위를 찾을 수 없습니다.');
  }
  
  return {
    correctAnswers,
    totalQuestions,
    iqScore: iqRange.iq_score,
    resultTitle: iqRange.title,
    resultDescription: iqRange.description,
    resultTags: iqRange.tags,
    resultGifUrl: iqRange.gifUrl,
    timeSpent
  };
}; 