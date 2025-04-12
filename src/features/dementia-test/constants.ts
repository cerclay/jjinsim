'use client';

import { DementiaQuestion, DementiaTestSection } from './types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const TEST_TIME_LIMIT_SECONDS = 180; // 3분 제한 시간

// 현재 날짜 정보 가져오기 (실제 사용)
const today = new Date();
const formattedDate = format(today, 'yyyy년 MM월 dd일', { locale: ko });
const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getDay()];
const currentMonth = format(today, 'M월', { locale: ko });
const season = (() => {
  const month = today.getMonth() + 1;
  if (month >= 3 && month <= 5) return '봄';
  if (month >= 6 && month <= 8) return '여름';
  if (month >= 9 && month <= 11) return '가을';
  return '겨울';
})();

// 날짜 옵션 생성 함수
const generateDateOptions = () => {
  const options = [];
  // 오늘 날짜
  options.push(formattedDate);
  
  // 어제 날짜
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  options.push(format(yesterday, 'yyyy년 MM월 dd일', { locale: ko }));
  
  // 내일 날짜
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  options.push(format(tomorrow, 'yyyy년 MM월 dd일', { locale: ko }));
  
  // 모레 날짜
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  options.push(format(dayAfterTomorrow, 'yyyy년 MM월 dd일', { locale: ko }));
  
  return options;
};

// 요일 옵션 배열 생성 (정확한 요일 순서로)
const generateDayOptions = () => {
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  // 현재 요일이 중앙에 오도록 배열을 재구성
  const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // 0(일)~6(토) -> 0(월)~6(일)
  
  // 월~일 순서로 정렬된 배열에서 현재 요일이 있는 위치를 기준으로 재배열
  return days;
};

// 월 옵션 배열 생성
const generateMonthOptions = () => {
  const currentMonthIndex = today.getMonth(); // 0-11
  const months = [];
  
  // 현재 월 포함 4개의 월 선택지 생성 (3개월 전, 현재 월, 3개월 후, 6개월 후)
  for (let i = -3; i <= 6; i += 3) {
    const monthDate = new Date(today);
    monthDate.setMonth(currentMonthIndex + i);
    months.push(format(monthDate, 'M월', { locale: ko }));
  }
  
  return months;
};

// 날짜 관련 옵션 생성
const dateOptions = generateDateOptions();
const dayOptions = generateDayOptions();
const monthOptions = generateMonthOptions();

export const DEMENTIA_TEST_SECTIONS: DementiaTestSection[] = [
  // 1. 지남력 영역 (현재 날짜 기준으로 동적 생성)
  {
    id: 'orientation',
    title: '지남력 평가',
    description: '시간, 장소, 사람에 대한 인식 능력을 측정합니다.',
    questions: [
      {
        id: 1,
        type: 'orientation',
        questionText: '오늘은 무슨 요일인가요?',
        options: dayOptions,
        answerIndex: dayOptions.indexOf(dayOfWeek),
        score: 1
      },
      {
        id: 2,
        type: 'orientation',
        questionText: '지금은 무슨 계절인가요?',
        options: ['봄', '여름', '가을', '겨울'],
        answerIndex: ['봄', '여름', '가을', '겨울'].indexOf(season),
        score: 1
      },
      {
        id: 3,
        type: 'orientation',
        questionText: '오늘 날짜는 언제인가요?',
        options: dateOptions,
        answerIndex: 0, // 항상 첫 번째 항목이 오늘 날짜
        score: 1
      }
    ]
  },
  
  // 2. 기억력 영역 (즉각 회상)
  {
    id: 'memory',
    title: '기억력 평가 (즉각 회상)',
    description: '단어를 기억하고 즉시 회상하는 능력을 측정합니다.',
    questions: [
      {
        id: 4,
        type: 'memory',
        questionText: '다음 단어들을 기억했다가 다음 화면에서 회상해 주세요.',
        memoryItems: ['나무', '자동차', '모자', '연필', '시계'],
        timeLimitSeconds: 10, // 10초간 보여줌
        score: 0 // 이 문제는 단어를 보여주기만 하므로 점수 없음
      },
      {
        id: 5,
        type: 'memory',
        questionText: '방금 본 단어들을 모두 선택하세요.',
        options: ['나무', '돈', '자동차', '모자', '책', '연필', '의자', '시계', '전화기'],
        answerIndex: -1, // 여러 답이 있으므로 특별 처리
        score: 5 // 각 단어당 1점, 최대 5점
      }
    ]
  },
  
  // 3. 주의력 영역
  {
    id: 'attention',
    title: '주의력 평가',
    description: '집중력과 작업 기억력을 측정합니다.',
    questions: [
      {
        id: 6,
        type: 'attention',
        questionText: '100에서 7을 빼면 얼마인가요?',
        options: ['93', '94', '95', '97'],
        answerIndex: 0,
        score: 1
      },
      {
        id: 7,
        type: 'attention',
        questionText: '93에서 7을 빼면 얼마인가요?',
        options: ['85', '86', '87', '88'],
        answerIndex: 1,
        score: 1
      },
      {
        id: 8,
        type: 'attention',
        questionText: '86에서 7을 빼면 얼마인가요?',
        options: ['77', '78', '79', '80'],
        answerIndex: 2,
        score: 1
      },
      {
        id: 9,
        type: 'attention',
        questionText: '79에서 7을 빼면 얼마인가요?',
        options: ['71', '72', '73', '74'],
        answerIndex: 1,
        score: 1
      },
      {
        id: 10,
        type: 'attention',
        questionText: '72에서 7을 빼면 얼마인가요?',
        options: ['63', '64', '65', '66'],
        answerIndex: 2,
        score: 1
      }
    ]
  },
  
  // 4. 시공간 능력 영역 (이미지 경로 수정)
  {
    id: 'visuospatial',
    title: '시공간 능력 평가',
    description: '공간 지각 및 시각적 구성 능력을 측정합니다.',
    questions: [
      {
        id: 11,
        type: 'visuospatial',
        questionText: '다음 그림에서 시계는 몇 시를 가리키고 있나요?',
        imageUrl: '/images/dementia-test/clock.png', // 로컬 이미지 경로로 변경
        options: ['3시 30분', '10시 10분', '11시 10분', '11시 5분'],
        answerIndex: 2,
        score: 1,
        hint: '시계의 시침과 분침의 위치를 잘 확인하세요.'
      },
      {
        id: 12,
        type: 'visuospatial',
        questionText: '다음 도형을 보고 같은 모양을 찾으세요.',
        imageUrl: '/images/dementia-test/shape-matching.png', // 로컬 이미지 경로로 변경
        options: ['A', 'B', 'C', 'D'],
        answerIndex: 2,
        score: 1,
        hint: '도형의 모양과 방향을 주의 깊게 비교해보세요.'
      },
      {
        id: 13,
        type: 'visuospatial',
        questionText: '이 도형들 중 다른 하나를 찾으세요.',
        imageUrl: '/images/dementia-test/odd-one-out.png', // 로컬 이미지 경로로 변경
        options: ['A', 'B', 'C', 'D'],
        answerIndex: 2,
        score: 1,
        hint: '각 도형의 특징을 비교해보세요.'
      }
    ]
  },
  
  // 5. 언어 능력 영역
  {
    id: 'language',
    title: '언어 능력 평가',
    description: '언어 이해와 표현 능력을 측정합니다.',
    questions: [
      {
        id: 14,
        type: 'language',
        questionText: "다음 중 '바람'과 관련이 가장 적은 단어는 무엇인가요?",
        options: ['태풍', '돛단배', '부채', '자동차'],
        answerIndex: 3,
        score: 1
      },
      {
        id: 15,
        type: 'language',
        questionText: "다음 속담을 완성하세요: \"세월이 ____ 같다\"",
        options: ['바람', '흐르는 물', '화살', '구름'],
        answerIndex: 2,
        score: 1
      },
      {
        id: 16,
        type: 'language',
        questionText: '다음 단어들의 공통점은 무엇인가요? (사과, 배, 딸기, 포도)',
        options: ['모두 붉은색이다', '모두 과일이다', '모두 단맛이 난다', '모두 씨가 있다'],
        answerIndex: 1,
        score: 1
      }
    ]
  },
  
  // 6. 실행 기능 영역
  {
    id: 'executive',
    title: '실행 기능 평가',
    description: '계획, 판단, 추상적 사고 능력을 측정합니다.',
    questions: [
      {
        id: 17,
        type: 'executive',
        questionText: '다음 숫자 패턴에서 빠진 숫자는 무엇인가요? 2, 4, 8, 16, ?',
        options: ['24', '32', '42', '64'],
        answerIndex: 1,
        score: 1
      },
      {
        id: 18,
        type: 'executive',
        questionText: '사람들이 많이 모인 장소에서 갑자기 화재 경보가 울렸다면 어떻게 해야 할까요?',
        options: [
          '화재 원인을 찾아본다',
          '물건을 모두 챙긴 후 대피한다',
          '침착하게 안내에 따라 가까운 출구로 대피한다',
          '경보가 거짓일 수 있으니 자리에 남아 상황을 지켜본다'
        ],
        answerIndex: 2,
        score: 1
      },
      {
        id: 19,
        type: 'executive',
        questionText: '다음 중 다른 세 개와 범주가 다른 하나는?',
        options: ['오렌지', '바나나', '당근', '딸기'],
        answerIndex: 2,
        score: 1
      }
    ]
  },
  
  // 7. 지연 회상 영역 (이전에 기억한 단어 회상)
  {
    id: 'recall',
    title: '지연 회상 평가',
    description: '이전에 제시된 단어를 얼마나 잘 기억하는지 측정합니다.',
    questions: [
      {
        id: 20,
        type: 'recall',
        questionText: '테스트 초반에 제시된 5개의 단어를 모두 선택하세요.',
        options: ['의자', '나무', '전화기', '자동차', '모자', '컴퓨터', '연필', '시계', '책'],
        answerIndex: -1, // 여러 답이 있으므로 특별 처리
        score: 5 // 각 단어당 1점, 최대 5점
      }
    ]
  }
];

// 총 점수 계산
export const TOTAL_MAX_SCORE = DEMENTIA_TEST_SECTIONS.reduce(
  (total, section) => 
    total + section.questions.reduce((sectionTotal, question) => sectionTotal + question.score, 0), 
  0
);

// 인지 영역별 최대 점수
export const COGNITIVE_AREAS_MAX_SCORES = {
  orientation: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'orientation')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  memory: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'memory')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  attention: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'attention')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  visuospatial: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'visuospatial')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  language: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'language')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  executive: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'executive')?.questions.reduce((sum, q) => sum + q.score, 0) || 0,
  recall: DEMENTIA_TEST_SECTIONS.find(s => s.id === 'recall')?.questions.reduce((sum, q) => sum + q.score, 0) || 0
}; 