import { ADHDQuestion, ADHDScoreRange, ADHDTestInfo } from "./types";
import { TestCard } from "../test-cards/types";

export const ADHD_TEST_METADATA: TestCard = {
  id: "adhd-test-1",
  title: "ADHD 테스트",
  description: "12문항으로 가볍게 체크해보는 자기진단형 심리테스트. 본 테스트는 의료적 진단이 아닌 재미용이며, 필요 시 전문가 상담이 권장됩니다.",
  thumbnail: "https://blogger.googleusercontent.com/img/a/AVvXsEjtiEJUudqPTaxJfPOpVctjo16rNKVmqbKfBtgmvFUxvOhndLKS0x66cX6AXp4UFigEFH2cJ_J953Pbrch9fTeSfM1-nc0_7b_eLw600zHXyOt58P9sEVEpfrKWLHMiNtb9_YJrzrdk5wCywGcWU8BwQ77AVWGAbKM1q4gQkcpe-wq__a1q9vpiZcPgu-g",
  path: "/tests/adhd-test",
  category: "PSYCHOLOGICAL",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  participantCount: 0,
  isPublished: true,
  tags: ["ADHD", "심리", "집중력", "성향", "유형", "테스트"],
};

export const TEST_INFO: ADHDTestInfo = {
  testTitle: "ADHD 테스트",
  testDescription: "12문항으로 가볍게 체크해보는 자기진단형 심리테스트. 본 테스트는 의료적 진단이 아닌 재미용이며, 필요 시 전문가 상담이 권장됩니다."
};

export const QUESTIONS: ADHDQuestion[] = [
  {
    questionId: 1,
    questionText: "일이나 공부를 시작하려 하면, 쉽게 딴생각에 빠져 시간만 흘러버린다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (바로 시작, 지연 없는 타입)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (컨디션 따라 가변적)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (시작 버튼 누르기가 세상에서 제일 어려움)",
        score: 2
      }
    ]
  },
  {
    questionId: 2,
    questionText: "중요한 물건(예: 열쇠, 휴대폰)을 어딘가에 두고 자주 잃어버린다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (자리 바꿔도 잊지 않는다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (심각하진 않지만 종종 헤맨다)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (매일매일 보물찾기)",
        score: 2
      }
    ]
  },
  {
    questionId: 3,
    questionText: '누군가 "이건 꼭 지켜!"라며 신신당부해도, 까먹거나 다른 걸 먼저 해버린다.',
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (지시는 절대 잊지 않는다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (한두 번 실수 경험 있음)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (들었는데… 기억은 어디로?)",
        score: 2
      }
    ]
  },
  {
    questionId: 4,
    questionText: "지루하거나 반복적인 일을 하다 보면, 정신이 어느새 `딴 세상`에 가 있다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (루틴 반복에도 꽤 단단한 집중력)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (특히 월요병 or 점심 직후)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (현실은 잠시 오프라인, 상상 여행 중)",
        score: 2
      }
    ]
  },
  {
    questionId: 5,
    questionText: "대화 중에 상대방 말이 들리긴 하는데, 집중이 안 되어 무슨 말인지 놓칠 때가 있다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (상대 말에 매우 충실)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (잊을만 하면 한 번씩)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (내 머리는 이미 다른 스토리 전개 중)",
        score: 2
      }
    ]
  },
  {
    questionId: 6,
    questionText: "작업이나 과제에서 세부 디테일(숫자, 일정 등)을 자주 놓치거나 틀린다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (중요 포인트는 절대 실수 안 함)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (바쁠 때 종종 헷갈림)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (사소한 오류가 내 트레이드마크?)",
        score: 2
      }
    ]
  },
  {
    questionId: 7,
    questionText: "가만히 앉아 있기 힘들어, 손이나 발을 끊임없이 움직이거나 주변을 두리번거린다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (가만히 있어도 편안)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (지루하면 무의식적으로 다리를 흔듦)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (멈추면 손발이 근질근질)",
        score: 2
      }
    ]
  },
  {
    questionId: 8,
    questionText: "흥분하거나 신이 나면 말이 빨라지고, 중간중간 주변이 `잠깐 숨 좀`이라 반응한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (말하는 속도 여유 있는 편)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (흥분하면 살짝 빨라짐)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (2배속 토크 머신으로 변신)",
        score: 2
      }
    ]
  },
  {
    questionId: 9,
    questionText: "떠오르는 말이 있으면, 필터 없이 먼저 뱉고 나중에 후회할 때가 많다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (생각 후 말하는 스타일)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (신중한 편이지만 가끔 실수)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (입이 손보다 먼저 달린다)",
        score: 2
      }
    ]
  },
  {
    questionId: 10,
    questionText: "줄을 서거나 대기해야 하는 상황이 되면, 초조해서 몸이 근질근질하다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (기다림은 여유롭게 견딘다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (긴 대기 땐 좀 지루함)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (즉시 원하는데, 현실은 기다려야? 스트레스 MAX)",
        score: 2
      }
    ]
  },
  {
    questionId: 11,
    questionText: "충동적으로 무언가를 결정(예: 충동구매, 갑작스런 여행)하는 편이다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (모든 걸 치밀하게 계획하는 스타일)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (스트레스 받으면 가끔 저지름)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (내 지갑은 늘 위험에 노출)",
        score: 2
      }
    ]
  },
  {
    questionId: 12,
    questionText: "상대방이 이야기 중인데도 끼어들거나, 결론을 재촉하는 편이다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (차분히 경청 후 의견 제시)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (답답하면 중간에 끼어드는 편)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (말하다 끊기 필수, 결론부터 말함)",
        score: 2
      }
    ]
  }
];

export const SCORE_RANGES: ADHDScoreRange[] = [
  {
    minScore: 0,
    maxScore: 6,
    resultTitle: "집중수호신",
    resultTags: [
      "#집중력MAX",
      "#차분의정석"
    ],
    resultDescription: "ADHD와는 거리가 먼 당신! 누군가 '집중해!'라고 소리칠 필요가 전혀 없어요. 당신의 차분함은 마치 명상 중인 고양이 같아요. 가끔은 '너무 진지한 거 아니야?'라는 말도 들을지도? 가끔은 계획에서 벗어나 즉흥적인 도전도 좋답니다."
  },
  {
    minScore: 7,
    maxScore: 12,
    resultTitle: "약간의 ADHD 기질",
    resultTags: [
      "#주의뿔락",
      "#균형형인간"
    ],
    resultDescription: "평소엔 차분하지만, 가끔 '앗! 나 지금 뭐하고 있지?' 순간이 찾아오는 타입! 중요한 약속은 잘 지키면서도 가끔 휴대폰을 어디뒀는지 찾아 헤매는 모습이 귀여운 당신. 계획과 즉흥 사이에서 완벽한 밸런스를 유지하는 인생의 달인이네요."
  },
  {
    minScore: 13,
    maxScore: 18,
    resultTitle: "아이디어 폭주형",
    resultTags: [
      "#에너지폭탄",
      "#창의력천재"
    ],
    resultDescription: "당신의 머릿속은 24시간 축제 중! 아이디어가 폭죽처럼 터지는 두뇌를 가졌어요. '앗, 새로운 생각이 떠올랐어!'가 인생 모토인 당신은 회의 중에도 갑자기 소리를 지를 수 있어요. 친구들이 '또 무슨 생각해?'라고 물어볼 때 당신은 이미 세 개의 다른 생각을 하고 있죠. 이 창의력, 제대로 활용하면 당신은 미래의 천재!"
  },
  {
    minScore: 19,
    maxScore: 24,
    resultTitle: "정통 ADHD 전사",
    resultTags: [
      "#주의산만",
      "#에너지무한"
    ],
    resultDescription: "당신의 에너지는 태양 ☀️보다 뜨겁고, 당신의 생각은 광속보다 빠르군요! '가만히 있기' 같은 건 당신의 사전에 없어요. 멀티태스킹의 신! (물론 모든 일이 완벽하게 끝나진 않을 수 있지만요🤭) 주변 사람들이 '진정해...'라고 말하지만, 당신의 에너지는 세상을 변화시킬 수 있는 엄청난 잠재력이랍니다. 잘 관리하면 어마어마한 성취를 이룰 거예요!"
  }
];

export const TEST_DISCLAIMER = "본 테스트 결과는 참고용입니다. 정확한 ADHD 진단은 전문가와의 상담을 권장합니다."; 