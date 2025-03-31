// 질문 데이터
export const questions = [
  {
    id: 1,
    text: "주말이 되면 당신은?",
    choices: [
      { text: "친구랑 만나 수다 떨기", type: "parrot" },
      { text: "혼자 집콕하며 넷플릭스 정주행", type: "cat" },
      { text: "잠도 자고 산책도 하고 여유롭게", type: "turtle" }
    ]
  },
  {
    id: 2,
    text: "대화할 때 당신은?",
    choices: [
      { text: "리액션 풍부! 같이 웃고 떠듦", type: "dog" },
      { text: "듣고는 있지만 말수 적음", type: "lizard" },
      { text: "말하다가 주제를 갑자기 바꿈", type: "hamster" }
    ]
  },
  {
    id: 3,
    text: "아무도 연락 안 하는 하루, 당신은?",
    choices: [
      { text: "내가 먼저 연락해서 안부 묻는다", type: "dog" },
      { text: "그냥 편하다. 조용해서 좋음", type: "cat" },
      { text: "서운했다가 또 혼자 웃음", type: "hamster" }
    ]
  },
  {
    id: 4,
    text: "새로운 모임에 가면 당신은?",
    choices: [
      { text: "주도적으로 분위기 띄움", type: "parrot" },
      { text: "적당히 섞이되 중심엔 안 감", type: "turtle" },
      { text: "벽 쪽에서 조용히 관찰함", type: "lizard" }
    ]
  },
  {
    id: 5,
    text: "감정 표현 스타일은?",
    choices: [
      { text: "다 티 냄! 싫으면 싫다 말함", type: "dog" },
      { text: "왠지 모르겠지만 티가 남", type: "hamster" },
      { text: "웬만해선 얼굴에 감정 없음", type: "lizard" }
    ]
  },
  {
    id: 6,
    text: "여행 스타일은?",
    choices: [
      { text: "계획 없이 즉흥! 재밌게 돌아다님", type: "hamster" },
      { text: "맛집 리스트 + 걷기 + 풍경", type: "turtle" },
      { text: "카페 앉아서 책 읽다 숙소 감", type: "cat" }
    ]
  },
  {
    id: 7,
    text: "갑자기 연락 끊긴 친구, 당신은?",
    choices: [
      { text: "서운하지만 연락은 함", type: "dog" },
      { text: "음... 그냥 내버려둠", type: "cat" },
      { text: "이유 궁금해서 가끔 SNS 염탐함", type: "parrot" }
    ]
  },
  {
    id: 8,
    text: "당신의 평소 텐션은?",
    choices: [
      { text: "평화롭게 잔잔한 편", type: "turtle" },
      { text: "그때그때 들쭉날쭉함", type: "hamster" },
      { text: "시끄럽진 않지만 톡 쏘는 매력 있음", type: "cat" }
    ]
  },
  {
    id: 9,
    text: "집에서 가장 자주 하는 행동은?",
    choices: [
      { text: "창밖 보거나 누움", type: "lizard" },
      { text: "갑자기 혼잣말하며 돌아다님", type: "parrot" },
      { text: "청소하다가 딴짓하다가 다시 청소", type: "hamster" }
    ]
  },
  {
    id: 10,
    text: "갈등 상황에서 당신은?",
    choices: [
      { text: "직접 이야기하고 푸는 편", type: "dog" },
      { text: "그냥 피함. 안 마주치면 됨", type: "lizard" },
      { text: "혼자 끙끙 앓고 잠잠해짐", type: "cat" }
    ]
  },
  {
    id: 11,
    text: "당신이 친구들에게 자주 듣는 말은?",
    choices: [
      { text: "왜 이렇게 귀엽냐고 함", type: "hamster" },
      { text: "있으면 든든하다고 함", type: "dog" },
      { text: "조용한데 존재감 있다고 함", type: "lizard" }
    ]
  },
  {
    id: 12,
    text: "감정이 격해졌을 때 당신은?",
    choices: [
      { text: "눈물보다는 말이 많아짐", type: "parrot" },
      { text: "그냥 조용히 사라짐", type: "lizard" },
      { text: "감정이 얼굴에 그대로 드러남", type: "dog" }
    ]
  }
];

// 결과 데이터
export const results = [
  {
    type: "dog",
    emoji: "🐶",
    title: "충성심 넘치는 감정표현러",
    description: "누가 봐도 '좋은 사람'. 따뜻하고 직진형이며 표현도 솔직한 당신은 강아지와 환상의 케미! 서로 붙어있는 걸 좋아함.",
    tags: ["#관종력최강", "#애정표현러", "#같이있는게편함"],
    gifUrl: "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
  },
  {
    type: "cat",
    emoji: "🐱",
    title: "혼자 있어도 괜찮은 쿨시크형",
    description: "혼자만의 시간이 꼭 필요한 타입. 적당한 거리두기와 센스 있는 교감이 중요한 당신은 고양이와 찰떡!",
    tags: ["#쿨한척하지만따뜻함", "#혼자시간중요", "#존중필수"],
    gifUrl: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif"
  },
  {
    type: "turtle",
    emoji: "🐢",
    title: "느긋하고 안정적인 힐링러",
    description: "조용하지만 묵직한 존재감. 급하지 않고, 믿음직하고 편안한 당신에게는 거북이 같은 반려동물이 잘 어울려요.",
    tags: ["#인내심갑", "#마음의평화", "#여유로운라이프"],
    gifUrl: "https://media.giphy.com/media/i2X55ALKbpmMg/giphy.gif"
  },
  {
    type: "hamster",
    emoji: "🐹",
    title: "에너지 넘치는 귀여운 호들갑러",
    description: "가만히 있질 못하는 호기심 천국! 생각보다 예민하고 손이 많이 가는 당신은 햄스터와 공통점이 많아요.",
    tags: ["#움직임폭발", "#귀여움담당", "#에너지소진주의"],
    gifUrl: "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif"
  },
  {
    type: "parrot",
    emoji: "🦜",
    title: "수다폭발형 리액션 장인",
    description: "말이 많고 정이 많은 당신은 대화가 생명! 반응 없으면 혼자서도 대화하는 당신은 앵무새와 찰떡이에요.",
    tags: ["#말이보약", "#혼잣말달인", "#공감능력만렙"],
    gifUrl: "https://media.giphy.com/media/l1J9Jzcs9OHXa310k/giphy.gif"
  },
  {
    type: "lizard",
    emoji: "🦎",
    title: "시선 회피형 마이웨이러",
    description: "남의 시선에 피곤함을 느끼고 자기 템포가 중요한 당신. 다정하지만 표현에 인색한 당신은 도마뱀과 잘 맞습니다.",
    tags: ["#내버려둬주세요", "#관심없음관심", "#조용한애정"],
    gifUrl: "https://media.giphy.com/media/lXiRm5H49zYmHr3i0/giphy.gif"
  }
];

// 결과 계산 함수
export const calculateResult = (answers: { questionId: number; selectedType: string }[]) => {
  // 각 유형별 카운트
  const typeCounts: Record<string, number> = {};
  
  // 선택한 답변들을 기반으로 유형별 카운트 계산
  answers.forEach(answer => {
    if (typeCounts[answer.selectedType]) {
      typeCounts[answer.selectedType] += 1;
    } else {
      typeCounts[answer.selectedType] = 1;
    }
  });
  
  // 가장 많이 선택된 유형 찾기
  let maxCount = 0;
  let resultType = '';
  
  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      resultType = type;
    }
  });
  
  return resultType;
}; 