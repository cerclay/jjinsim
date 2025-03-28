export interface Choice {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  choices: Choice[];
}

export interface Result {
  id: string;
  range: [number, number];
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  mentalPercentage: number;
}

export interface StressCheckData {
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
  results: Result[];
}

export type StepType = 'intro' | 'question' | 'result'; 