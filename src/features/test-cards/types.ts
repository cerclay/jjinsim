export interface TestCard {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  path: string;
  category: 'NEW' | 'POPULAR' | 'PSYCHOLOGICAL' | 'PERSONALITY' | 'ABILITY';
  createdAt: string;
  updatedAt: string;
  participantCount: number;
  isPublished: boolean;
  tags: string[];
}

export type TestCardCategory = 'NEW' | 'POPULAR' | 'PSYCHOLOGICAL' | 'PERSONALITY' | 'ABILITY';

export interface TestCardListResponse {
  cards: TestCard[];
  totalCount: number;
} 