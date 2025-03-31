import { MemoryIndexRange, Question } from "./types";
import { TestCard } from "../test-cards/types";

export const TIME_LIMIT_SECONDS = 25;

export const MEMORY_TEST_METADATA: TestCard = {
  id: "memory-test-1",
  title: "기억력 지수 테스트 – 나 지금 몇 바이트 남았지?",
  description: "12문제로 당신의 뇌 메모리를 테스트합니다. 감성 저장소인지, 금붕어인지 직접 확인해보세요!",
  thumbnail: "https://blogger.googleusercontent.com/img/a/AVvXsEgIHM2zFl3lLs-BmIXmAVVjDhSuC6nEFWe3sLwWcaqJ_cncNc6mcU-C9Cfx1a6i0QynhivQrId5Gp4Q-bMiO_mVZ6ZURPsjYqk0wItse9EjvH5UPCe0ATr9NsQinLSCRqo5FqpqHEEwdoxj_4pRU9IZjm18JjgkVqwIr4z9Xtk5jQLTemvXukF-xgKYAJw",
  path: "/tests/memory-test",
  category: "ABILITY",
  createdAt: "2024-03-20T00:00:00Z",
  updatedAt: "2024-03-20T00:00:00Z",
  participantCount: 8500,
  isPublished: true,
  tags: ["기억력", "두뇌", "심리", "재미"],
};

// 문제 유형 정의
const QUESTION_TYPES = [
  {
    type: "text" as const,
    generate: () => {
      const words = ["노트북", "시계", "가방", "커피", "책상", "연필", "지갑", "안경", "마우스", "키보드"];
      const selectedWords = words.sort(() => Math.random() - 0.5).slice(0, 4);
      const wrongWord = words.find(w => !selectedWords.includes(w))!;
      return {
        type: "text",
        text: `단어 보기: ${selectedWords.join(", ")}`,
        question: "이 중 제시되지 않았던 단어는?",
        choices: [...selectedWords.slice(0, 3), wrongWord],
        answer_index: 3
      };
    }
  },
  {
    type: "text" as const,
    generate: () => {
      const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
      const targetIndex = Math.floor(Math.random() * numbers.length);
      return {
        type: "text",
        text: `숫자 순서: ${numbers.join(", ")}`,
        question: `${targetIndex + 1}번째 숫자는 무엇이었나요?`,
        choices: [
          numbers[targetIndex].toString(),
          ((numbers[targetIndex] + 2) % 9 + 1).toString(),
          ((numbers[targetIndex] + 4) % 9 + 1).toString(),
          ((numbers[targetIndex] + 6) % 9 + 1).toString(),
        ],
        answer_index: 0
      };
    }
  },
  {
    type: "text" as const,
    generate: () => {
      const sequences = [
        ["치약", "칫솔", "수건", "비누", "샴푸"],
        ["책상", "의자", "침대", "소파", "옷장"],
        ["사과", "바나나", "포도", "딸기", "키위"],
        ["강아지", "고양이", "토끼", "햄스터", "앵무새"]
      ];
      const sequence = sequences[Math.floor(Math.random() * sequences.length)];
      const targetIndex = Math.floor(Math.random() * sequence.length);
      return {
        type: "text",
        text: `순서 기억: ${sequence.join(", ")}`,
        question: `${targetIndex + 1}번째 항목은?`,
        choices: [sequence[targetIndex], ...sequence.filter((_, i) => i !== targetIndex).slice(0, 3)],
        answer_index: 0
      };
    }
  },
  {
    type: "image" as const,
    generate: () => {
      const images = [
        {
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEiO90DVkHnCwjbZ5RxXm-acaxOGFQDHhXKv_vRJ_d3oXdE9hdbQjqIvRDc45-v7C_eGmg94E6tveJYsSeU2jS1kqPTeGuliRyZL0g8jm2q30Plqp08SjAxwUqbwH5zhj3tDFEZyO8b2XcvceI-ZfvZn-Teu3J3yYkw47oI_A4pslcIOGQ97h1IVOuVAMLU",
          question: "방금 본 사무실 이미지에서 없었던 물건은?",
          items: ["양복입은남자", "컴퓨터", "서류", "서류철"],
          wrong: "커피잔"
        },
        {
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEgeKYRMsI9L28ivT1LZMG76sraG1f3JrdXqdasQgbX-QqfmKMjWTmZ8Pcjj3i8wOqDSLu7KNGMnME7kELRHZNPA7jRgsBxaQVCna8x1RO_lhRk8_qh_b_BAXEQKBZ9lIZWyuqDLwirfKh8I2eLnLrbocdtv0KyMUW8qnB_85hAKiS3tZC75RaacX0B3-GY",
          question: "방금 본 방 이미지에서 없었던 물건은?",
          items: ["책상", "커피잔", "노트북", "침대"],
          wrong: "책"
        },
        {
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhDswL4VIdCWFPBZG1KJHMDQf6CBeCKrjv4RcQYabgtqIMRThIsPh74wIgE2BmsWkbq_b8xODufA9yVobRbMzML6mTvejlAUPxpWcVuIDzx2pYtPQYGEMNuIPHsT4bAbD92BQgdMneTEGdvF4rUqxTCuB29EoyFEZqXfUuBIm6vEkbwnLYxLfd-YyN8EFo",
          question: "방금 본 주방 이미지에서 없었던 물건은?",
          items: ["냉장고", "전자레인지", "식기류", "창문"],
          wrong: "커피머신"
        },
        {
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhzxL__9zSALUKhrrIWGF7fC4T48mZvqtT2eYnXXB3EtuooS2qVCbEMTQP4Uw-a-6LW0A5bOhNKioLUYhaqqKSJuamzdicErJw7Gtp1K5drzrZEN77vu0081sJxMpTjhLebAH8hWyO2NIc11gf6FvzeV8MD9zP8HuDfgpo9k6mjcnUrHf1WR-PMy8mGjaE",
          question: "방금 본 공원 이미지에서 없었던 것은?",
          items: ["벤치", "분수대", "나무", "산책로"],
          wrong: "다람쥐"
        }
      ];
      const selected = images[Math.floor(Math.random() * images.length)];
      return {
        type: "image",
        imageUrl: selected.url,
        question: selected.question,
        choices: [...selected.items.slice(0, 3), selected.wrong],
        answer_index: 3
      };
    }
  }
];

// 12개의 랜덤 문제 생성
export const generateQuestions = (): Question[] => {
  const questions: Question[] = [];
  for (let i = 0; i < 12; i++) {
    const questionType = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];
    const question = questionType.generate();
    questions.push({
      id: i + 1,
      ...question
    });
  }
  return questions;
};

export const QUESTIONS = generateQuestions();

export const MEMORY_INDEX_RANGES: MemoryIndexRange[] = [
  {
    min_correct: 0,
    max_correct: 3,
    memory_index: 60,
    title: "🐠 금붕어형 기억력",
    description: "'어… 방금 뭐였지?'가 입에 붙은 타입. 단기기억은 예술처럼 사라짐.",
    tags: ["#단기기억소멸", "#지금이순간", "#금붕이"]
  },
  {
    min_correct: 4,
    max_correct: 6,
    memory_index: 75,
    title: "🦥 백업은 느리게형",
    description: "한 템포 늦지만 결국 백업됨. 다만 시간이 좀 필요할 뿐!",
    tags: ["#기억로딩중", "#엑세스타임김"]
  },
  {
    min_correct: 7,
    max_correct: 9,
    memory_index: 90,
    title: "🐧 감성 저장소형",
    description: "감정과 함께 기억도 함께 저장! 감정 자극엔 자동복구 가능",
    tags: ["#감성기억러", "#노래가사만완벽", "#눈물버튼"]
  },
  {
    min_correct: 10,
    max_correct: 11,
    memory_index: 110,
    title: "🧠 실용적 SSD형",
    description: "빠르고 효율적인 기억력! 일처리도 빠르고 깔끔한 뇌 구조",
    tags: ["#핵심만저장", "#깔끔처리기억", "#뇌정리왕"]
  },
  {
    min_correct: 12,
    max_correct: 12,
    memory_index: 130,
    title: "🧬 뇌풀가동 캐시메모리형",
    description: "사람이 아니라 기억 머신 아닐까? 지난 주 밥 메뉴까지 기억하는 타입!",
    tags: ["#기억천재", "#과거탐지기", "#GPT보다정확"]
  }
]; 