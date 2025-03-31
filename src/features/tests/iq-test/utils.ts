import { IQTest, IQTestQuestion } from './types';

// 랜덤으로 문제 순서를 섞는 함수
export const shuffleQuestions = (data: IQTest): IQTest => {
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