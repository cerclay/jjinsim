"use client";

import { StaticImageData } from "next/image";

export interface AttachmentQuestion {
  id: number;
  text: string;
  choices: {
    text: string;
    type: string;
  }[];
}

export interface AttachmentResult {
  type: string;
  title: string;
  description: string;
  tags: string[];
  gifUrl: string;
}

export const ATTACHMENT_QUESTIONS: AttachmentQuestion[] = [
  {
    id: 1,
    text: "연인이 1시간째 답장을 안 한다면?",
    choices: [
      {text: "바쁘겠지~ 기다려본다", type: "secure"},
      {text: "왜 아무 말도 없어..? 불안하다", type: "anxious"},
      {text: "연락 강박은 없다. 나도 할 일 한다", type: "avoidant"}
    ]
  },
  {
    id: 2,
    text: "싸운 후 상대방이 먼저 사과 안 하면?",
    choices: [
      {text: "서로 진정되면 이야기하자고 말함", type: "secure"},
      {text: "내가 먼저 풀려고 연락함", type: "anxious"},
      {text: "그냥 거리 둔다. 침묵은 편하다", type: "avoidant"}
    ]
  },
  {
    id: 3,
    text: "상대가 갑자기 너무 다정해졌을 때 나는?",
    choices: [
      {text: "고마워! 같이 더 잘 지내고 싶음", type: "secure"},
      {text: "불안하다… 갑자기 왜 이래?", type: "anxious"},
      {text: "부담된다. 살짝 선 긋고 싶다", type: "avoidant"}
    ]
  },
  {
    id: 4,
    text: "연애 초반, 상대방이 자주 연락 못한다고 한다면?",
    choices: [
      {text: "서로 스타일 다를 수 있지", type: "secure"},
      {text: "벌써 마음 식은 건가..?", type: "anxious"},
      {text: "좋다. 나도 편해서", type: "avoidant"}
    ]
  },
  {
    id: 5,
    text: "데이트 후 집에 가는 길, 연락 안 오는 연인에게 나는?",
    choices: [
      {text: "별일 없겠지~ 기다려본다", type: "secure"},
      {text: "왜 갑자기 잠수야..? 무서워", type: "anxious"},
      {text: "조용해서 더 좋다. 여운 즐김", type: "avoidant"}
    ]
  },
  {
    id: 6,
    text: "상대방이 '조금 혼자 있고 싶다'고 하면?",
    choices: [
      {text: "알겠어. 네 공간도 존중해", type: "secure"},
      {text: "내가 뭘 잘못했나..? 걱정됨", type: "anxious"},
      {text: "역시... 감정 없는 사람이었군", type: "avoidant"}
    ]
  },
  {
    id: 7,
    text: "자기 전에 연락 안 되는 연인, 나는?",
    choices: [
      {text: "잘 자고 있겠지~ 내일 보자", type: "secure"},
      {text: "수십 번 카톡 확인하고 걱정 중", type: "anxious"},
      {text: "굿나잇도 매일 해야 하나? 안 해도 됨", type: "avoidant"}
    ]
  },
  {
    id: 8,
    text: "연인이 나에게 혼자 생각할 시간이 필요하대요. 나는?",
    choices: [
      {text: "그래, 네 리듬 이해해", type: "secure"},
      {text: "어..? 혹시 나랑 멀어지려고?", type: "anxious"},
      {text: "좋아. 너무 가까워졌던 듯", type: "avoidant"}
    ]
  },
  {
    id: 9,
    text: "SNS에서 애인이 누군가에게 좋아요 누른 걸 봤다!",
    choices: [
      {text: "그냥 스크롤하다 눌렀겠지~ 넘김", type: "secure"},
      {text: "누구야 저 사람? 왜 눌렀는지 묻고 싶음", type: "anxious"},
      {text: "관심 없음. SNS는 SNS일 뿐", type: "avoidant"}
    ]
  },
  {
    id: 10,
    text: "상대가 자기 감정을 솔직히 표현하지 않는다면 나는?",
    choices: [
      {text: "더 편하게 말할 수 있도록 돕는다", type: "secure"},
      {text: "날 안 좋아하나? 혼자 상상 폭주", type: "anxious"},
      {text: "말 안 해도 된다고 생각함", type: "avoidant"}
    ]
  },
  {
    id: 11,
    text: "상대가 연락을 자주 하고 싶어해요. 나는?",
    choices: [
      {text: "나도 자주 연락하면 좋지!", type: "secure"},
      {text: "혹시 내가 더 많이 연락하면 부담스러워할까 걱정됨", type: "anxious"},
      {text: "너무 자주 연락하면 피곤해", type: "avoidant"}
    ]
  },
  {
    id: 12,
    text: "연인이 나를 칭찬해줄 때, 나는?",
    choices: [
      {text: "기분 좋고 고맙다!", type: "secure"},
      {text: "그 말이 진심일까? 의심됨", type: "anxious"},
      {text: "너무 감정적인 표현은 부담됨", type: "avoidant"}
    ]
  }
];

export const ATTACHMENT_RESULTS: Record<string, AttachmentResult> = {
  "secure": {
    type: "secure",
    title: "🐶 믿음직한 골든리트리버형",
    description: "마음이 넓고 안정적인 당신! 상대방이 연락이 없거나 실수를 해도 먼저 이해하고 감싸는 멘탈 보유자. 연애든 인간관계든 '믿음'이 중심.",
    tags: ["#연애장인", "#마음넓음", "#기다릴줄암"],
    gifUrl: "https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif?v=1"
  },
  "anxious": {
    type: "anxious",
    title: "🐥 알림폭격 병아리형",
    description: "확인을 못 받으면 불안해지는 스타일! '왜 답장 안 해…?'가 입에 붙은 과몰입형. 다정함도 넘치지만 감정 기복이 큰 편.",
    tags: ["#답장강박", "#과몰입러", "#사랑확인필수"],
    gifUrl: "https://media.giphy.com/media/l4FGJ8MRj0uvZje3S/giphy.gif?v=1"
  },
  "avoidant": {
    type: "avoidant",
    title: "🐱 혼자 잘 노는 고양이형",
    description: "너무 가까우면 불편한 타입! 감정 표현보단 혼자 있는 시간이 소중한 독립형 연애인. 다정하지만 표현은 드물다.",
    tags: ["#거리두기장인", "#쿨해보이지만따뜻함", "#연애도내속도로"],
    gifUrl: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?v=1"
  }
};

export const TEST_INFO = {
  id: "attachment-style",
  title: "애착유형 테스트 – 연애할 때 나는 어떤 스타일?",
  description: "12문제로 알아보는 나의 애착 유형! 과몰입과 유쾌함이 공존하는 연애 성격 분석 테스트",
  thumbnailUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhSeBAqi0jvBtxRfKdRluimJJDwueigV1ENX5edBTxkWYhxLqjQuAzFj9vzsZxWUkuRI8ydD7EW_wwmudAYU3blDm87VmF0_5-QU7bwagpMxyz9uzJv1n4OcUM2Fv74AaxFWEViUpPGm09eyckvZhBYVxeJvSe_nmbiy-6ILyyTWyXvLPhJ_0D0vn8_MfQ",
  duration: "3분",
  participants: 12584,
  likes: 843
}; 