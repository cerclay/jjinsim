export interface Question {
  id: number;
  type: 'text' | 'image';
  text?: string;
  imageUrl?: string;
  question: string;
  choices: string[];
  answer_index: number;
}

export interface MemoryIndexRange {
  min_correct: number;
  max_correct: number;
  memory_index: number;
  title: string;
  description: string;
  tags: string[];
}

export interface TestResult {
  correctCount: number;
  totalQuestions: number;
  memoryIndex: number;
  range: MemoryIndexRange;
  timeSpent: number;
} 