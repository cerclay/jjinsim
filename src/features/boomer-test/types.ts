export interface BoomerQuestion {
  questionId: number;
  questionText: string;
  choices: BoomerChoice[];
}

export interface BoomerChoice {
  choiceId: string;
  choiceText: string;
  score: number;
}

export interface BoomerScoreRange {
  minScore: number;
  maxScore: number;
  resultTitle: string;
  resultTags: string[];
  resultDescription: string;
  resultGifUrl: string;
  detailedDescription: string;
}

export interface BoomerTestInfo {
  testTitle: string;
  testDescription: string;
}

export interface BoomerTestResult {
  totalScore: number;
  scoreRange: BoomerScoreRange;
  testInfo: BoomerTestInfo;
}

export interface BoomerTestState {
  isStarted: boolean;
  currentQuestionIndex: number;
  userAnswers: Record<number, number>;
  showResult: boolean;
  result: BoomerTestResult | null;
} 