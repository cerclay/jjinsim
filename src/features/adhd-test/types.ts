export interface ADHDQuestion {
  questionId: number;
  questionText: string;
  choices: ADHDChoice[];
}

export interface ADHDChoice {
  choiceId: string;
  choiceText: string;
  score: number;
}

export interface ADHDScoreRange {
  minScore: number;
  maxScore: number;
  resultTitle: string;
  resultTags: string[];
  resultDescription: string;
}

export interface ADHDTestInfo {
  testTitle: string;
  testDescription: string;
}

export interface ADHDTestResult {
  totalScore: number;
  scoreRange: ADHDScoreRange;
  testInfo: ADHDTestInfo;
}

export interface ADHDTestState {
  isStarted: boolean;
  currentQuestionIndex: number;
  userAnswers: Record<number, number>;
  showResult: boolean;
  result: ADHDTestResult | null;
} 