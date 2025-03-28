"use client";

// Supabase API 호출을 통해 가져올 테스트 데이터를 미리 초기화하는 함수
// 이 파일은 모든 테스트 카드 데이터를 미리 설정하여 API 연결 여부와 관계없이 화면에 데이터가 표시되도록 합니다.

// 테스트 카드 기본 정보 인터페이스
export interface TestCardData {
  id: string;
  title: string;
  imageUrl: string;
  participants: number;
  likes: number;
  isNew: boolean;
  isPopular: boolean;
  description?: string;
  createdAt?: string;
}

// 현재 날짜에서 30일을 뺀 날짜 생성 (하이드레이션 오류 방지를 위해 상수 사용)
const THIRTY_DAYS_AGO = '2023-12-01T00:00:00.000Z';

// 기본 이미지 URL 설정
const getDefaultImage = (id: string) => {
  return `https://picsum.photos/seed/${id}/400/200`;
};

// 인기 테스트 데이터
export const popularTests: TestCardData[] = [
  {
    id: 'mbti',
    title: 'MBTI 성격유형 테스트: 당신의 진짜 MBTI는?',
    imageUrl: getDefaultImage('mbti'),
    participants: 32150,
    likes: 2540,
    isNew: false,
    isPopular: true,
    description: '정확한 성격유형 분석을 통해 자신의 진짜 MBTI를 찾아보세요.',
    createdAt: '2023-03-20T00:00:00.000Z',
  },
  {
    id: 'stress-check',
    title: '스트레스 체크: 당신의 스트레스 지수는?',
    imageUrl: getDefaultImage('stress-check'),
    participants: 8621,
    likes: 745,
    isNew: false,
    isPopular: true,
    description: '현재 당신의 스트레스 수준을 확인하고 관리 방법을 알아보세요.',
    createdAt: '2023-05-10T00:00:00.000Z',
  },
  {
    id: 'personal-color',
    title: '퍼스널 컬러 테스트: 나에게 어울리는 색은?',
    imageUrl: getDefaultImage('personal-color'),
    participants: 19876,
    likes: 1832,
    isNew: false,
    isPopular: true,
    description: '당신의 피부톤과 이미지에 맞는 퍼스널 컬러를 찾아보세요.',
    createdAt: '2023-02-05T00:00:00.000Z',
  },
  {
    id: 'past-life-character',
    title: '전생 캐릭터 테스트: 당신의 전생은?',
    imageUrl: getDefaultImage('past-life'),
    participants: 12543,
    likes: 1109,
    isNew: false,
    isPopular: true,
    description: '당신의 전생에 대한 흥미로운 분석을 통해 과거의 자신을 만나보세요.',
    createdAt: '2023-04-18T00:00:00.000Z',
  }
];

// 새로운 테스트 데이터
export const newTests: TestCardData[] = [
  {
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: getDefaultImage('life-genre'),
    participants: 3254,
    likes: 621,
    isNew: true,
    isPopular: false,
    description: '당신의 인생이 영화라면 어떤 장르일까요? 재미있는 인생 장르 테스트!',
    createdAt: THIRTY_DAYS_AGO,
  },
  {
    id: 'dog-compatibility',
    title: '나와 가장 잘 맞는 강아지는?',
    imageUrl: getDefaultImage('dog-compatibility'),
    participants: 2876,
    likes: 542,
    isNew: true,
    isPopular: false,
    description: '당신의 성격과 생활 습관에 가장 잘 맞는 강아지 품종을 찾아보세요.',
    createdAt: THIRTY_DAYS_AGO,
  },
  {
    id: 'marriage-type',
    title: '결혼 성향 테스트: 당신은 어떤 유형?',
    imageUrl: getDefaultImage('marriage-type'),
    participants: 1876,
    likes: 324,
    isNew: true,
    isPopular: false,
    description: '결혼에 대한 당신의 가치관과 기대를 분석해 결혼 성향을 알아보세요.',
    createdAt: THIRTY_DAYS_AGO,
  },
  {
    id: 't-power',
    title: '티 파워: 당신의 잠재력은?',
    imageUrl: getDefaultImage('t-power'), 
    participants: 2134,
    likes: 398,
    isNew: true,
    isPopular: false,
    description: '숨겨진 당신의 잠재력과 능력을 발견하는 특별한 테스트입니다.',
    createdAt: THIRTY_DAYS_AGO,
  },
  {
    id: 'color-blindness',
    title: '색맹 테스트: 당신의 색각은 정상인가요?',
    imageUrl: getDefaultImage('color-blindness'),
    participants: 1532,
    likes: 287,
    isNew: true,
    isPopular: false,
    description: '간단한 색각 테스트로 당신의 색상 인식 능력을 확인해보세요.',
    createdAt: THIRTY_DAYS_AGO,
  }
]; 