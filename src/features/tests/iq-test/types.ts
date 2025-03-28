export interface IQTestQuestion {
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
}

export interface IQTest {
  title: string;
  description: string;
  time_limit_seconds: number;
  questions: IQTestQuestion[];
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
  tags: string[];
  timeSpent: number;
}

export interface TestState {
  currentQuestionIndex: number;
  answers: number[];
  timeRemaining: number;
  isCompleted: boolean;
  result: TestResult | null;
} 