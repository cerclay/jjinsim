export interface Question {
  id: number;
  text: string;
  choices: string[];
  answer_index: number;
}

export interface IQRange {
  min_correct: number;
  max_correct: number;
  iq_score: number;
  title: string;
  description: string;
  tags: string[];
  gifUrl: string;
}

export interface IQTestData {
  title: string;
  description: string;
  time_limit_seconds: number;
  questions: Question[];
  iq_ranges: IQRange[];
  scoring_algorithm: {
    type: string;
    conversion: string;
    ranges: string;
  };
}

export interface TestResult {
  correctAnswers: number;
  totalQuestions: number;
  iqScore: number;
  resultTitle: string;
  resultDescription: string;
  resultTags: string[];
  resultGifUrl: string;
  timeSpent: number;
} 