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
  const imageMap: Record<string, string> = {
    'iq-test': 'https://picsum.photos/id/24/400/400',
    'mbti': 'https://blogger.googleusercontent.com/img/a/AVvXsEgTe9x3WFzi7SUAvTqEvnThlLpoEqxtEV9l7IxRByB6KacW6PnSNu8YdDmXloWzuME_v7G8cPpe1ftCjfLU9qoXj_4k87eNgna8u8NEPTVvhDU-aHheaQbQgcqTeEilvFLGor-oQ8FWro_3pbb96PIvQJE6Orc7HsrxFr0h3eg824EhoPLibzDsDkyfPOE',
    'stress-check': 'https://picsum.photos/id/22/400/400',
    'personal-color': 'https://picsum.photos/seed/personal-color/400/200',
    'past-life': 'https://picsum.photos/seed/past-life/400/200',
    'life-genre': 'https://picsum.photos/seed/life-genre/400/200',
    'dog-compatibility': 'https://picsum.photos/seed/dog-compatibility/400/200',
    'marriage-type': 'https://picsum.photos/seed/marriage-type/400/200',
    't-power': 'https://picsum.photos/seed/t-power/400/200',
    'color-blindness': 'https://picsum.photos/seed/color-blindness/400/200',
    'polsok-character': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT73s19GNbOYJlSm_Kj3d06jvPIiNFMgL0qswmuXRH4DAbx-ZTJYa4dMfColxZuajof_pKKUMhfxgL15bknTXbjyi-LAx_Y4gwrO7R0-asgLdpdycOzjcGg-Sc4Pa_k7ozVgZxUNxEgV10rRhf0lcA_oPrwUzk4ypvv4dy3Be5OSpQUMYpGkjlM14iRjw/s320/MBTI%20(1).jpg',
    'tarot-consultation': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_7N_eT25_Yi5_tZb_FvGd2JAO7rI2yGjykBbAh8o1QB5fZaTeQAM4xGkYujRq0c_pXz1UonPdzt46gZ32G2dyKAvmPQVohYBZ3UiQxvJaoIAN-evV6eLiguC1LOqbUMhgvzyKRSsRfOuF9rn7oNFb-SLfVhadZYxHjUEmZVkC9UlF862CsP9THrhCD5o/s320/MBTI.jpg',
  };
  return imageMap[id] || `https://picsum.photos/seed/${id}/400/200`;
};

// 인기 테스트 데이터
export const popularTests: TestCardData[] = [
  {
    id: 'iq-test',
    title: '나의 진짜 IQ테스트 - 유머버전',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 8752,
    likes: 1245,
    isNew: true,
    isPopular: true,
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'memory-test',
    title: '기억력 지수 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgIHM2zFl3lLs-BmIXmAVVjDhSuC6nEFWe3sLwWcaqJ_cncNc6mcU-C9Cfx1a6i0QynhivQrId5Gp4Q-bMiO_mVZ6ZURPsjYqk0wItse9EjvH5UPCe0ATr9NsQinLSCRqo5FqpqHEEwdoxj_4pRU9IZjm18JjgkVqwIr4z9Xtk5jQLTemvXukF-xgKYAJw',
    participants: 8500,
    likes: 1100,
    isNew: true,
    isPopular: true,
    description: '12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mbti',
    title: 'MBTI 빠르고 정확하게!',
    imageUrl: getDefaultImage('mbti'),
    participants: 23456,
    likes: 1247,
    isNew: false,
    isPopular: true,
    description: '20개의 질문으로 당신의 성격 유형을 정확하게 분석해 드립니다.',
    createdAt: '2024-06-01T00:00:00.000Z',
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
  },
  {
    id: 'polsok-character',
    title: '내가 폭싹 속았수다 케릭터라면?',
    imageUrl: getDefaultImage('polsok-character'),
    participants: 1043,
    likes: 521,
    isNew: true,
    isPopular: true,
    description: '당신은 폭싹 속았수다에 등장했다면 어떤 캐릭터일까요? 12개의 질문으로 알아보는 나만의 폭싹 캐릭터 테스트!',
    createdAt: new Date().toISOString(),
  },
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
  },
  {
    id: 'polsok-character',
    title: '내가 폭싹 속았수다 케릭터라면?',
    imageUrl: getDefaultImage('polsok-character'),
    participants: 1043,
    likes: 521,
    isNew: true,
    isPopular: true,
    description: '당신은 폭싹 속았수다에 등장했다면 어떤 캐릭터일까요? 12개의 질문으로 알아보는 나만의 폭싹 캐릭터 테스트!',
    createdAt: new Date().toISOString(),
  },
]; 