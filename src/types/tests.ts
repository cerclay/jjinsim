export interface TestData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  questions: Question[];
  results: Result[];
}

export interface Question {
  id: number;
  text: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  traits: string[];
}

export interface Result {
  id: string;
  title: string;
  description: string;
  image: string;
  traits: string[];
} 