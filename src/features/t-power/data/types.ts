export interface TPowerQuestion {
  id: number;
  text: string;
  options: TPowerOption[];
}

export interface TPowerOption {
  id: number;
  text: string;
  score: number;
}

export interface TPowerResult {
  range: string;
  title: string;
  description: string;
  fun_tag: string;
  tbal_score: string;
}

export interface TPowerData {
  title: string;
  description: string;
  questions: TPowerQuestion[];
  results: TPowerResult[];
} 