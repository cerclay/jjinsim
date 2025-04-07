import { BoomerQuestion, BoomerScoreRange, BoomerTestInfo } from "./types";
import { TestCard } from "../test-cards/types";

export const BOOMER_TEST_METADATA: TestCard = {
  id: "boomer-test-1",
  title: "나의 꼰대력은?!",
  description: "12문항으로 확인하는 내 속에 잠재된 꼰대 기질! 재미로만 참고하세요.",
  thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfl5eqh5bGdKTYkWyK02Pd4nfeBnOaRGmKtdu-gNVVxmUbNa9RHOd1J4nPPBEhj-agPWoeFWNb02RKdUmz9Fb6miGtzq9tEQO4tKawQLyyr7JGMOS5c_SzUZC6JecRRfYosDV18Fll38q0jCtjq6AObiUI5cReNXaLYU4uFia4k-gAZ8C5vpT6FRtuBq4/s320/ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%207%EC%9D%BC%20%EC%98%A4%ED%9B%84%2003_14_18.png",
  path: "/tests/boomer-test",
  category: "PSYCHOLOGICAL",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  participantCount: 0,
  isPublished: true,
  tags: ["꼰대", "심리", "세대차이", "성향", "유형", "테스트"],
};

export const TEST_INFO: BoomerTestInfo = {
  testTitle: "꼰대력 테스트",
  testDescription: "12문항으로 확인하는 내 속에 잠재된 꼰대 기질! 재미로만 참고하세요."
};

export const QUESTIONS: BoomerQuestion[] = [
  {
    questionId: 1,
    questionText: "후배나 어린 친구들이 쓰는 신조어나 밈을 잘 이해하지 못할 때, 그게 별로 중요하지 않다고 생각한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (모르면 배우려는 태도를 보인다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (그냥 별 흥미가 없어 패스)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (요즘 것들은 유행만 쫓는다며 무시한다)",
        score: 2
      }
    ]
  },
  {
    questionId: 2,
    questionText: "\"내가 이 나이 먹도록 살아보니...\" 같은 말로 시작하는 조언을 자주 한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (조언보단 경청하는 편)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (진짜 중요한 경험담일 때만)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (후배 훈계할 때 반드시 이 문구가 등장)",
        score: 2
      }
    ]
  },
  {
    questionId: 3,
    questionText: "후배나 젊은 사람들의 패션·헤어스타일을 보면, '도대체 왜 저런 걸?'이라는 생각이 먼저 든다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (본인 스타일 존중)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (너무 튀는 건 좀 이상해 보일 때도...)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (이해도 안 되고 이해하고 싶지도 않다)",
        score: 2
      }
    ]
  },
  {
    questionId: 4,
    questionText: "모임 자리에서, '우리 때는 이랬는데…'라며 과거 무용담을 길게 말한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (옛날 얘기는 요점만 짧게)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (분위기가 원할 때만 살짝)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (나의 활약상은 필수 코스!)",
        score: 2
      }
    ]
  },
  {
    questionId: 5,
    questionText: "점점 최신 트렌드나 신기술이 나오면, '아휴 복잡해, 예전 게 낫지'라고 느끼게 된다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (신기술을 배우려는 편)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (기술은 편해도 정서적 거부감이 좀 있음)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (뭘 새로 배우느니, 하던 대로가 편하다)",
        score: 2
      }
    ]
  },
  {
    questionId: 6,
    questionText: "젊은 세대가 더 나은 방식이나 의견을 제시해도, '그래봤자 별 수 없어'라며 묵살하는 편이다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (새로운 의견, 적극 환영)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (귀찮거나 타당성 부족해 보일 땐 반대)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (내가 해봤는데 안 된다! 경험이 우선!)",
        score: 2
      }
    ]
  },
  {
    questionId: 7,
    questionText: "'어른 공경'은 절대적인 덕목이라 생각하며, 나이가 어리면 당연히 존중해줘야 한다고 주장한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (나이와 상관없이 서로 존중)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (나이가 많으면 당연히 좀 대우받아야지)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (나보다 어린 사람들은 예의를 갖춰야 한다)",
        score: 2
      }
    ]
  },
  {
    questionId: 8,
    questionText: "신입이나 후배가 뭔가를 잘하면, 칭찬 대신 '그래봤자 내가 더 잘한다' 식으로 대응한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (잘한 건 솔직히 인정하고 칭찬)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (조금 질투 날 때 티가 난다)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (자랑 모드로 역전시키는 게 국룰)",
        score: 2
      }
    ]
  },
  {
    questionId: 9,
    questionText: "문제 해결이나 소통 방식에서, '예전엔 그냥 이렇게 해결했는데…'라고 하며 바꿀 생각을 잘 안 한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (새 아이디어/방식 시도에도 거부감이 없다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (새 방법이 귀찮게 느껴질 때)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (익숙한 게 최고! 변화를 왜 해?)",
        score: 2
      }
    ]
  },
  {
    questionId: 10,
    questionText: "미팅이나 회식에서, 내 말을 오래 하는 편이고, 상대 말은 오래 안 들으려 한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (대화는 상호 소통의 장!)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (흥미 없는 이야기는 패스)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (내가 한참 얘기 중인데 끼어들지 마!)",
        score: 2
      }
    ]
  },
  {
    questionId: 11,
    questionText: "새로운 용어나 문화가 등장하면, '솔직히 말해 퇴행'이라는 생각이 든다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (새로운 건 늘 흥미롭다)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (좀 쓸데없다고 느낄 때도)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (이건 문화가 아니라 개판이야!)",
        score: 2
      }
    ]
  },
  {
    questionId: 12,
    questionText: "후배가 간단한 실수를 하면, '내가 저 나이 때도 안 그랬다'고 생각하며 타박한다.",
    choices: [
      {
        choiceId: "A",
        choiceText: "거의 없다 (누구나 실수는 할 수 있지)",
        score: 0
      },
      {
        choiceId: "B",
        choiceText: "가끔 그렇다 (미성숙해 보이는 후배에게만 가볍게 지적)",
        score: 1
      },
      {
        choiceId: "C",
        choiceText: "자주 그렇다 (내 기준에 못 미치면 바로 혼쭐)",
        score: 2
      }
    ]
  }
];

export const SCORE_RANGES: BoomerScoreRange[] = [
  {
    minScore: 0,
    maxScore: 6,
    resultTitle: "뉴트로 프렌들리",
    resultTags: [
      "#꼰대0%",
      "#열린소통왕",
      "#MZ지지자"
    ],
    resultDescription: "당신은 신구(新舊)를 넘나드는 소통 마스터! 타인을 존중하며 새로운 문화를 수용하는 편입니다. 주변에서 부담 없는 사람으로 인식 중!",
    resultGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5haWc0cmVkeTM2MnY4YXMzb3Q2OG41MzhvMmk3cmJ2dmVrcWZkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SbtWGvMSmJIaV8faS8/giphy.gif",
    detailedDescription: "어떤 세대와도 소통하는 당신! 당신의 진정한 강점은 세대를 초월한 유연한 소통 능력입니다. 새로운 트렌드를 이해하려 노력하고, 경험과 지식을 겸손하게 공유하는 자세가 돋보입니다. 당신과 함께라면 어떤 팀에서도 세대갈등 없이 즐겁게 지낼 수 있을 거예요. 당신의 열린 마음가짐이 주변 사람들에게 긍정적인 영향을 미치고 있답니다. 앞으로도 이런 멋진 태도를 유지하세요!"
  },
  {
    minScore: 7,
    maxScore: 12,
    resultTitle: "약간의 라떼 스멜",
    resultTags: [
      "#미세라떼",
      "#조금공감부족",
      "#변화중"
    ],
    resultDescription: "크게 꼰대스럽진 않지만, 가끔씩 '우리 때는...'을 꺼내곤 하네요. 그래도 아직 회복 가능! 젊은 감성과 소통하려는 태도를 유지하세요.",
    resultGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjc5OHdlM2VmeG44b3YwMnFwMDBuNHdlNTQ0dnl2M3hjbDVrN2JnMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11JTxkrmq4bGE0/giphy.gif",
    detailedDescription: "당신은 아직 완전한 꼰대는 아니에요! 하지만 가끔씩 슬며시 올라오는 '라떼는 말이야...' 모드를 조심하세요. 당신은 새로운 것을 받아들일 준비가 되어 있지만, 때때로 과거의 경험이 현재를 판단하는 기준이 되곤 합니다. 더 다양한 의견을 경청하고, 젊은 세대의 생각을 진지하게 받아들인다면 완전한 소통 고수가 될 수 있어요! 작은 변화를 시작해보세요. 새로운 문화나 트렌드에 대해 '왜 그럴까?'라고 호기심을 갖는 순간, 당신은 이미 성장하고 있는 겁니다."
  },
  {
    minScore: 13,
    maxScore: 18,
    resultTitle: "슬슬 꼰대 기질 발현",
    resultTags: [
      "#중증라떼병",
      "#지나온길자랑",
      "#경험덕후"
    ],
    resultDescription: "과거 경험에 의존하고, 변화에 대한 거부감이 다소 높습니다. 함께 일하는 후배들이 살짝 부담스러워할 수 있으니, 조금만 더 열린 마음을 가져보세요!",
    resultGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzljcDZsZWkwemdhcmo1bnViYnNyN3ZvcGp1MDJpNGRqN2RzZ3V5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9wXoC8W4JFmREY/giphy.gif",
    detailedDescription: "조심하세요! 당신의 꼰대 게이지가 위험 수준에 도달했습니다. '내 경험이 최고야'라는 생각이 자주 드는 편이고, 새로운 방식보다는 익숙한 방식을 선호하는 경향이 있어요. 하지만 아직 희망은 있습니다! 자신의 경험과 지식을 공유하되, 타인의 새로운 시도와 아이디어도 존중해보세요. 당신이 변화에 대해 조금 더 열린 자세를 가진다면, 후배들은 당신의 지혜를 더 기꺼이 받아들일 거예요. 신세대 문화에 대해 '왜 그런지' 판단하기보다 '어떤 의미인지' 알아보려는 호기심을 가져보세요!"
  },
  {
    minScore: 19,
    maxScore: 24,
    resultTitle: "킹오브꼰대",
    resultTags: [
      "#라떼끝판왕",
      "#세대초월전설",
      "#꼰대인증서"
    ],
    resultDescription: "축하(?)합니다! 당신은 꼰대력 최상위 레벨! 이제 주변은 당신을 피해 다닐지도...? 그래도 변화와 소통을 시도해본다면, 의외의 케미가 생길 수 있어요!",
    resultGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2g3YzA0bXVmYTBnNzh6eDR3aHZnbGU5aXNscDZnMWNoZ3FodWJwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fsnzYr1BAbcwg/giphy.gif",
    detailedDescription: "음... 뭐라고 말씀드려야 할지... 당신은 공식 인증 꼰대입니다! 주변 사람들, 특히 후배들이 당신과 대화할 때 '어떻게 말해야 화를 안 낼까' 고민하고 있을지도 모릅니다. 하지만 너무 좌절하지 마세요! 자신의 경험에서 나오는 지혜는 귀중합니다. 다만 그것을 공유하는 방식에 변화가 필요할 뿐이죠. '내 방식이 최고'라는 생각보다 '다른 방식도 괜찮을 수 있다'는 열린 마음을 가져보세요. 시대는 변하고 있고, 당신도 함께 변화할 수 있습니다. 오늘부터 상대방의 말에 진심으로 귀 기울이는 작은 실천을 시작해보는 건 어떨까요?"
  }
];

export const TEST_DISCLAIMER = "본 테스트는 재미와 참고용입니다. 특정 세대를 비하하거나 재단하지 않으며, 결과에 대해 과도하게 진지하게 받아들이지 마세요!"; 