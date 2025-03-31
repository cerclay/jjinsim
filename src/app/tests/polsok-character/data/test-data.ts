export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: Record<string, number>;
  }[];
}

export interface Result {
  name: string;
  description: string;
  hashtags: string[];
  image: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "사랑은 어떤 방식이 좋아?",
    options: [
      {
        id: "A",
        text: "말보다 행동으로 보여줘야지",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "B",
        text: "표현도 중요해! 문자라도 매일 보내야 함",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "C",
        text: "그냥 믿으면 되는 거 아냐?",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "D",
        text: "상황 봐서 다르게 대처해야지",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 2,
    text: "꿈을 위해 포기할 수 있는 건?",
    options: [
      {
        id: "A",
        text: "안정된 직장도 버릴 수 있음",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "그래도 가족은 못 버려",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "C",
        text: "본인 꿈은 잠시 접을 수도",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "D",
        text: "꿈은 현실 가능한 것만 추구함",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 3,
    text: "누군가 나에게 상처를 줬을 때?",
    options: [
      {
        id: "A",
        text: "대놓고 싸운다",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "B",
        text: "참고 내 방식으로 복수한다",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "C",
        text: "그냥 넘긴다, 인생 길어",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "D",
        text: "거리 둔다, 손절이 답",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 4,
    text: "새로운 도전을 앞두고 당신의 마음은?",
    options: [
      {
        id: "A",
        text: "두려움보다 기대가 크다",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "가족이 먼저 떠오른다",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "C",
        text: "준비는 철저히, 실수는 용납 안 됨",
        score: {
          bu_sangkil: 2
        }
      },
      {
        id: "D",
        text: "실패해도 괜찮다며 스스로 다독인다",
        score: {
          yang_gwansik: 2
        }
      }
    ]
  },
  {
    id: 5,
    text: "주말에 뭐 하고 싶어?",
    options: [
      {
        id: "A",
        text: "혼자 글 쓰거나 산책",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "가족과 따뜻한 집밥",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "C",
        text: "밀린 일 처리, 미래 설계",
        score: {
          bu_sangkil: 2
        }
      },
      {
        id: "D",
        text: "조용히 누워 아무 생각 없이",
        score: {
          yang_gwansik: 2
        }
      }
    ]
  },
  {
    id: 6,
    text: "사람들과 갈등이 생겼을 때 당신은?",
    options: [
      {
        id: "A",
        text: "직설적으로 말해버림",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "B",
        text: "내 감정만 삭이고 참는다",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "C",
        text: "꼭 필요한 말만 하고 자리를 뜬다",
        score: {
          bu_sangkil: 2
        }
      },
      {
        id: "D",
        text: "먼저 손 내밀고 대화하려 함",
        score: {
          old_aesoon: 2
        }
      }
    ]
  },
  {
    id: 7,
    text: "당신의 리더십 스타일은?",
    options: [
      {
        id: "A",
        text: "말보다 실천",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "B",
        text: "내 의견보다 모두의 합의",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "C",
        text: "소신대로 밀고 나간다",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "D",
        text: "결과 중심, 감정은 제쳐둔다",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 8,
    text: "누군가 당신을 한 단어로 표현한다면?",
    options: [
      {
        id: "A",
        text: "요망진",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "묵쇠",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "C",
        text: "억척이",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "D",
        text: "계산왕",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 9,
    text: "여행 스타일은?",
    options: [
      {
        id: "A",
        text: "계획 없이 즉흥적으로",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "조용한 곳에서 사색",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "C",
        text: "가족과 추억 쌓기",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "D",
        text: "가성비와 동선 최우선",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 10,
    text: "아끼는 사람에게 가장 잘 하는 말은?",
    options: [
      {
        id: "A",
        text: "밥 먹었어?",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "B",
        text: "네가 행복하면 됐어",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "C",
        text: "이건 꼭 너한테 어울릴 것 같아서",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "D",
        text: "이 타이밍에 이 말이 필요할 거야",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 11,
    text: "감정 표현 스타일은?",
    options: [
      {
        id: "A",
        text: "티는 안 내지만 속은 시끄러움",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "B",
        text: "내 감정은 즉시 표현해야 속이 편함",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "C",
        text: "솔직하지만 때론 폭발적",
        score: {
          jeong_gwangrye: 2
        }
      },
      {
        id: "D",
        text: "내 감정보다 전략과 효율이 우선",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  },
  {
    id: 12,
    text: "가장 중요하게 생각하는 가치는?",
    options: [
      {
        id: "A",
        text: "자유",
        score: {
          young_aesoon: 2
        }
      },
      {
        id: "B",
        text: "책임",
        score: {
          old_aesoon: 2
        }
      },
      {
        id: "C",
        text: "믿음",
        score: {
          yang_gwansik: 2
        }
      },
      {
        id: "D",
        text: "효율",
        score: {
          bu_sangkil: 2
        }
      }
    ]
  }
];

export const results: Record<string, Result> = {
  young_aesoon: {
    name: "오애순 (청년)",
    description: "한시도 가만있지 못하는 요망진 시인 지망생. 색다른 평화를 꿈꾸는 당신의 매력에 세상도 속수무책!",
    hashtags: ["#요망진", "#반항기", "#시인꿈나무"],
    image: "https://i.namu.wiki/i/8sumaY9m2Lay_KWEewmDgUyq8xRIXVFCYn39LpNCYBQlxJIJVsYT16G6creshIOpUL0w06TRyh3WAqXumy_o3PomPceTdTWsHPOmGL7aLe1qO4OwxrutxYm3_-6SQMDd4cE9mQ0VMvyIs68DYWPkkQ.webp"
  },
  old_aesoon: {
    name: "오애순 (중년)",
    description: "단단한 현실주의자지만 따뜻한 마음씨를 가진 리더. 사는 게 녹록지 않아도 당신과 함께라면 믿음이 생겨요.",
    hashtags: ["#현실파", "#엄마리더", "#단단함"],
    image: "https://i.namu.wiki/i/_7DnHZzq9Xsjn1wVLEDHJVPu5XHfTHV8wOE_MSZ561KQ9NS_eS4Yc0SPmZ-659X3tLrevMkML_TRBx7RcAz1j53O_VNnRiIc5dkLuDJt99qn-404jSF04xVyvYGdzBn5WaxeGNNMlJcInZjgRbkehw.webp"
  },
  yang_gwansik: {
    name: "양관식",
    description: "겉은 묵직하지만 속은 불타는 진정한 사랑꾼. 이불킥 오지게 하는 관심 표현이지만, 그 진심만큼은 의심할 수 없죠!",
    hashtags: ["#묵쇠", "#사랑꾼", "#우직함"],
    image: "https://i.namu.wiki/i/RdkULqEc44sGGEHmed0YxaSVR-0Tztt8AYHkZl8N4aXpBoqNMgDBJPS-mAREZvn2V-Y4vqgFzqBN4o8wMlYq5OS6DTrpn7QwkNN17LxfnJknfJ1J6SGlOA-B-ORJ3NJYOmr61rW7qjcSm4AXHBuxBQ.webp"
  },
  jeong_gwangrye: {
    name: "전광례",
    description: "거친 제주 해녀의 파워를 담은 직설화법의 소유자. 뒤끝은 없고 앞날만 보는 당신, 솔직함이 매력 포인트죠!",
    hashtags: ["#해녀파워", "#무뚝뚝엄마", "#진심은묵직"],
    image: "https://i.namu.wiki/i/d1OzMzx_QaZVO24tKi9EzCi69hzEruq_fi5YLFNWgNJDTmzM_8bqFBUSF7uwXsoSPMIh6FTPqhInUZZXK3Kr4BJ3DTIao3aMTjmVIbmqLGppN84m2e1rTTB8eR4emKU4dOXHbmtb-mOz0hVujam9Tw.webp"
  },
  bu_sangkil: {
    name: "부상길",
    description: "철저한 현실주의자에 감정은 부수적인 요소. 때론 냉정하게 보일지라도 그 명쾌한 결단력은 당신만의 매력이에요!",
    hashtags: ["#현실주의자", "#냉정파", "#선긋기마스터"],
    image: "https://i.namu.wiki/i/n6KTb3NN70FKArzWz9i1rzxKlhQVopoO87jeiq8FwacsKTFyX7CcJIYn8GQPmEzuGuJEAbvTZbcCpf0BpzliX5stU5L054lPD08ipkwY_5vIl4B-UYyhTdBKGMAAQIoHTdTWOlqvj4paS4J2GukAmw.webp"
  }
};

export const calculateResult = (userScores: Record<string, number>): string => {
  // 모든 점수의 총합 계산
  const totalScore = Object.values(userScores).reduce((sum, score) => sum + score, 0);
  
  // 상위 2개 캐릭터 추출
  const sortedTypes = Object.entries(userScores)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  const firstType = sortedTypes[0];
  const secondType = sortedTypes[1];
  
  // 첫 번째와 두 번째 점수 차이가 적으면 랜덤성 부여
  const firstScore = userScores[firstType];
  const secondScore = userScores[secondType];
  
  // 점수 차이가 3점 이하일 경우 20% 확률로 두 번째 캐릭터 반환
  if (firstScore - secondScore <= 3 && Math.random() < 0.2) {
    return secondType;
  }
  
  // 모든 캐릭터 점수가 비슷하게 낮을 경우 (평균 이하) 랜덤하게 결과 제공
  const avgScore = totalScore / Object.keys(userScores).length;
  if (firstScore < avgScore && Math.random() < 0.3) {
    // 무작위로 아무 캐릭터나 선택
    const allTypes = Object.keys(userScores);
    return allTypes[Math.floor(Math.random() * allTypes.length)];
  }
  
  return firstType;
}; 