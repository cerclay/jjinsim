export type TarotCard = {
  id: string;
  name: string;
  imageUrl: string;
  meanings: {
    upright: string[];
    reversed: string[];
  };
  description: string;
};

export const TAROT_CARDS: TarotCard[] = [
  {
    id: "fool",
    name: "광대",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoYrr09HtbmLu-1bE-MR_cpvyWFtQhFHGQQQDctthPqDCqp4W3ZWluusV9QluX99btd8P5j_nrzwzOpBT-nHqPMaSAwwb2g80SKIIofrEV1Ok9GJ9OuVhVtwU1axHULhp3oGAZ-1ebHksF3GxRvDxM4evNZ_uGygLH9d9lTWK8zruWEzFBaHT6uvDEjmM/s320/%EA%B4%91%EB%8C%80.png",
    meanings: {
      upright: ["새로운 시작", "모험", "자유", "순수함"],
      reversed: ["무모함", "위험", "부주의", "방황"]
    },
    description: "무한한 가능성의 시작점을 상징합니다. 새로운 모험에 대한 용기와 열정을 나타냅니다."
  },
  {
    id: "magician",
    name: "마법사",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1mwAJzeym6e__JOBR2CAlVmHAggoi9v-Pc_XZv_iw3CmTz_XvBEKK6adKSLUkfg_1KQ8QNTCNQvwrRnmgagYvAfACG9BxAzVmXmChGA4CX9OXFCUQkF_qGxdhzj2LBr8cC69LKsrtj7PielXOnfMG4OAMPZWP1pcZPWJrbOBNoKCbBMPLU3KDG9AYI2A/s320/%EB%A7%88%EB%B2%95%EC%82%AC.jpg",
    meanings: {
      upright: ["창의력", "기술", "의지력", "재능"],
      reversed: ["조작", "기만", "재능 낭비", "자신감 부족"]
    },
    description: "자신의 잠재력을 깨닫고 활용하는 힘을 상징합니다. 의지와 집중력으로 목표를 달성할 수 있음을 나타냅니다."
  },
  {
    id: "high-priestess",
    name: "여사제",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5VUaByT96oy4g8Uc154rn6lMbU4V6tCDIT887G7xpx0VLph_IwRCiAtuqLUqXNzqM8pDZTXswxpeOmKS_xZfr0VWgLnV1n9NjXx7EVgV8AZcdvvDQn9JvBxl0ogo5TXdLBy5P058BTJSWE-erurLgy8YOieMf-BHQQB-yk8vPyethRAukJAQa-Y4_XkE/s320/%EC%97%AC%EC%82%AC%EC%A0%9C.jpg",
    meanings: {
      upright: ["직관", "무의식", "내면의 지혜", "신비"],
      reversed: ["비밀", "정보 부족", "표면적 지식", "억압된 감정"]
    },
    description: "내면의 지혜와 직관을 상징합니다. 표면적인 것을 넘어 더 깊은 진실을 찾으라는 메시지를 담고 있습니다."
  },
  {
    id: "empress",
    name: "여황제",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0WPq4EW6Psdz9sRvOOica5n0uXin8P0WrgVtXjYkdwuJ2FhIpwRde4ROo8PCuqN4ZCNT31C5mxoR9iyXrUIUpw06cgoZ6Rg8mx8l2NxpcE-tNOYYv3k8XagBF4Au76Afgg8h8ZFG7IPlImJ_NgLNUEVkRnBdf9gDCwv3ZA5Cv0ieAzginkI32qqQe4y8/s320/%EC%97%AC%ED%99%A9%EC%A0%9C.jpg",
    meanings: {
      upright: ["풍요", "창조", "모성애", "아름다움"],
      reversed: ["의존", "과잉보호", "창의성 부족", "자기 방임"]
    },
    description: "풍요롭고 창조적인 여성성을 상징합니다. 풍요와 성장의 에너지를 나타냅니다."
  },
  {
    id: "emperor",
    name: "황제",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQG7Eaoefxw95grrr4zvBmD-sKF-lVu_29DxAXHtwq35qw6GdoO2GItUEd5jxbKKlr1Te5cPL-lzhiqpSHiML6Au4zrV_doToHi7P43QHCF7kk3bdFDfbMso6z2FFB8l2M2DBSrl-UoPEOKDS32KTLrbxsxffziePl2212Cy81z10R6lqgbBdgwO1zKPk/s320/%ED%99%A9%EC%A0%9C.jpg",
    meanings: {
      upright: ["권위", "구조", "안정", "보호"],
      reversed: ["독재", "과도한 통제", "융통성 없음", "권력 남용"]
    },
    description: "안정과 리더십을 상징합니다. 명확한 목표와 체계적인 접근 방식을 나타냅니다."
  },
  {
    id: "hierophant",
    name: "교황",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCrPYLDIR4wE4SYNtrOkMl8JM8fWsLDGfe7CMqFkG3VT_DEfO2v4S0H2j473whWoOxw2KodxiDPFPXSaYORHhKzKnGEYULsjs0ElbcqFqPuCNZmZUxllQKXhEBureKjYELg8hHKF_QLbCwfC4fHDdKmt1P_78-UERLWtxiPApsjoTq2eSsWpWwF1xBDr8/s320/%EA%B5%90%ED%99%A9.jpg",
    meanings: {
      upright: ["전통", "종교", "순응", "교육"],
      reversed: ["반항", "비전통적", "자유로운 사고", "창의적 해결책"]
    },
    description: "전통적인 가치와 신념을 상징합니다. 지혜와 영적 가르침을 추구하는 것을 나타냅니다."
  },
  {
    id: "lovers",
    name: "연인",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDviJjv2oX7HvJpnMOqudHuzZEoxZ8U63ObkJPx_z-Czg9eqQoTnWn8FUewcB6OGNooBonhrLXGGTvFUHY8qvZrNSUoURxOxQHa8ofSfAVmv4Roa1qasop0DPHxRQaS5Cp0Bj5rh4Q7tIxanTEmKMbWeSbZhNnMZHzPVrdMN4Qh2-8EClHdH_VM8Qnmt8/s320/%EC%97%B0%EC%9D%B8.jpg",
    meanings: {
      upright: ["사랑", "조화", "선택", "신뢰"],
      reversed: ["불화", "불균형", "오판", "유혹"]
    },
    description: "사랑과 관계의 선택을 상징합니다. 진정한 가치와 욕망 사이의 중요한 결정을 나타냅니다."
  },
  {
    id: "chariot",
    name: "전차",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZywYUbfG4zWprsvy_R5uiFkz7VCJ8jCY_7IJ2dSLsXi1vBTzS_1naPwLHvJWYPfX6knDvRWIr9nCqthKDiUhVfjkMR4K5Pyx2Dm4N0dtY2r6XWQs1LUB9rSr9jOWM7NoKJyuh29B0YR01hrkfqGLwReaF12JpEDesSx5_lMMTP4HSYH-sjqXh3GpcrwU/s320/%EC%A0%84%EC%B0%A8.jpg",
    meanings: {
      upright: ["의지력", "결단력", "성공", "자기 통제"],
      reversed: ["자기 의심", "방향 상실", "공격성", "통제력 상실"]
    },
    description: "의지력과 결단력으로 얻는 승리를 상징합니다. 목표에 대한 집중과 결단력을 나타냅니다."
  },
  {
    id: "strength",
    name: "힘",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcqI9bgwidT-HOII9cdHqJhtscNwj9h_BoV30JFwqkSL81_p6USoXUUohaPoYF45xxdYT0MIdN8qndJk368DhVaai5XhLaEzrt5uipWYexe-xUWpRbj5jENMUfcMt8JiuLyHOVJfaInjfHjSAuCUc7bEQhWchGwK66UbYseYgIE99giR9OQ7Z8-SbMnMs/s320/%ED%9E%98.jpg",
    meanings: {
      upright: ["용기", "인내", "자신감", "열정"],
      reversed: ["자기 의심", "약점", "낮은 에너지", "불안"]
    },
    description: "내면의 용기와 강인함을 상징합니다. 어려움에 맞서는 강인한 정신력을 나타냅니다."
  },
  {
    id: "hermit",
    name: "은둔자",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimnBGXpVrSqSwG6c8OS9qJrn78KHnj7dwTkWLNr9RqWRPe-GaQaYpQAY6AYOsP2J7KxRvBmpWvPiJAAP7Cea8Mn1GBehDz0kC1ZNn3Oej2B8yEuNDgkn6-fv2z2Kxh8zt7Oa_7nhhQT-pVAw1CmegGyXzN-FOXfmferROjjbziPnRiIAA5NTGF1A4-fXw/s320/The%20Hermit.jpg",
    meanings: {
      upright: ["성찰", "내면 탐색", "고독", "지혜"],
      reversed: ["고립", "외로움", "회피", "미성숙"]
    },
    description: "고독한 자기 성찰을 통한 깨달음을 상징합니다. 내면의 목소리에 귀 기울이는 시간을 나타냅니다."
  },
  {
    id: "wheel-of-fortune",
    name: "운명의 수레바퀴",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtNRALMyVNMPihEYC7eAnw59DqsDCAj6dJJ0avY2muB9BEqLJTMmPsTTBVj6XZoYql9-KfGl-tmoRZYY70IsWVaTYIPr2Sq5wLh4rL95U9VIC_xyGQ2toojxcrmOLbJekHXZTmMYEm4kvw1IEJSVipVT0AhHA8MfsPii-LIQVUCoiZvL74i7QxtqoGpvU/s320/Wheel%20of%20Fortune.jpg",
    meanings: {
      upright: ["운명", "변화", "기회", "행운"],
      reversed: ["불운", "변화에 대한 저항", "혼란", "운명에 거스름"]
    },
    description: "끊임없이 변하는 인생의 순환을 상징합니다. 운명의 흐름을 받아들이고 변화에 적응하는 것을 나타냅니다."
  },
  {
    id: "justice",
    name: "정의",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1lb9TQ1uNVUhanuYsyZlf07ZcICnc9EBa-XkdhyRlDLqNmN2XgnSjyUKk1qGW3eFCvxiVfsxJio6P6Zia3TOZ-gNyGDPLEE9355mwHEGZ2U5encsLmLX6mymvGwh2JI8NEEJSIILRQs9gweFG-sQBn3SehihNrvRACnojqLCOKi9RNHcfL7gGfcHCPm8/s320/Justice.jpg",
    meanings: {
      upright: ["정의", "공정함", "진실", "명확함"],
      reversed: ["불공정", "불균형", "편파성", "부정"]
    },
    description: "진실과 균형을 상징합니다. 행동의 결과와 책임을 인식하는 것을 나타냅니다."
  },
  {
    id: "hanged-man",
    name: "매달린 남자",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1GW5fHJh1x0yqKLtK_tlUSc0GQ1vCgMFq3GyXsMVLcvs9sptQXCG2AANK4JfvPfluaydXZe6mBs1AYsCLjoCe_i1hl1AnHMusRxiCuGnhRTXhv7pDak6fQcbV1Fz0KP1d0m6_Dpa0IKQC3YdqR_XrodWo17YBcHrZsQKuY_vXf2PRGZFFHLwZMp-UF-o/s320/%EB%A7%A4%EB%8B%AC%EB%A6%B0%20%EB%82%A8%EC%9E%90.jpg",
    meanings: {
      upright: ["희생", "관점 변화", "대기", "항복"],
      reversed: ["저항", "지연", "무의미한 희생", "집착"]
    },
    description: "위기의 전환점과 새로운 시각을 상징합니다. 기존 관점에서 벗어나 새로운 가능성을 발견하는 것을 나타냅니다."
  },
  {
    id: "death",
    name: "죽음",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxKtEyachjSk6vIlm_WGQcdEucb-msyUu4FewCYfJy3FqUEIx01OieMRJM3hCvaebzGZiZT9erv_Fhg2fuK6B2mOIDW5NpX5RAW2yrE1KwYeZY59HSH_IzjcQgcWA2FT1eodinYvg0VT5M9oRmCudpWYClEMmEq9UDNG76K6baLdnMPLqz2-fUb3pmVuc/s320/Death.jpg",
    meanings: {
      upright: ["변화", "끝", "변형", "전환"],
      reversed: ["저항", "정체", "침체", "부정"]
    },
    description: "새로운 시작을 위한 끝을 상징합니다. 이 카드는 실제 죽음보다는 큰 변화와 전환의 시기를 나타냅니다."
  },
  {
    id: "temperance",
    name: "절제",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirH6TiYCaGED32yD0nY4C3Wc2_pYnphH4fXFDByBW33F3pXq7B0cAE-rgO-QAREemmigUCda3dPMgkvmQxMJc40yrdIOLtHJlgUdo-q-1tRzvjf7Xkby7rDeeG6zzKpo0u522ol8lOegg_Kkz_H4FSj55JOg-sops24n7FImbn9IjQoaeQLVRU5G3lcyQ/s320/Temperance.jpg",
    meanings: {
      upright: ["균형", "조화", "인내", "절제"],
      reversed: ["불균형", "극단", "과도함", "조급함"]
    },
    description: "조화와 균형을 상징합니다. 상반된 요소들 사이의 온건한 통합을 나타냅니다."
  },
  {
    id: "devil",
    name: "악마",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDWf5MKZFeI0du4q1YwCZzudbaqmskwPDzHms0TgA_VPWD68Ne4d2gv9g6-zbYKn6nleK0Wg6MKxl8Zj0GyFl16Tn6sWPe4GyKm4F7jUGAekIMszK2jkIJFME4KxmHqwfP3L4XZpyJqCsj5QamfAWnzJZJUMkXDK6XFGjkhWDrVY7TgiMU6mU0Pi560pM/s320/The%20Devil.jpg",
    meanings: {
      upright: ["속박", "유혹", "중독", "우울"],
      reversed: ["자유", "해방", "회복", "제한 극복"]
    },
    description: "내면의 그림자와 욕망을 상징합니다. 자기 제한적인 사고나 행동 패턴을 나타냅니다."
  },
  {
    id: "tower",
    name: "탑",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgApm-M1_IUlqWUey3J5vuS5IYOTFgrl0g_0NqnB9mIFZvF10W_VYm0lGfO-uG2XQTnI-nvr-3X3vNNQa9GLW7bnGO1IHNPKtrZsZ47UOlrevzTTKwFI0oW4LlMBIuvoTgzAKKzjC7_qPzRowI83-SErxnH1sdSLkcUaVF11I66_KjxNajkRL3lKyHn1ZU/s320/%ED%83%91.jpg",
    meanings: {
      upright: ["급변", "혼란", "계시", "각성"],
      reversed: ["변화에 저항", "고통 회피", "고통스러운 변화", "지연된 재난"]
    },
    description: "갑작스러운 변화와 혼란을 상징합니다. 낡은 구조의 붕괴와 새로운 시작을 위한 정리를 나타냅니다."
  },
  {
    id: "star",
    name: "별",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjf6TV8BMhgl6tmFbe5F8tfc4U8WNulGIptWD9fBYtQG7Ck9w4RZa2PDXfN0YnZt94F2x_bSoTmqunzUZcgaIvMayC2FjMdsRR0wFmj2ueCU1042goQfhoTDpT5QHkeO5eMgUJ4gVn17Kgo5v44i-5pZizUrDn6EAvkzi7R5snL-aG5YRUBvpR6fuhnku0/s320/%EB%B3%84.jpg",
    meanings: {
      upright: ["희망", "영감", "회복", "평화"],
      reversed: ["절망", "희망 상실", "비관주의", "무기력"]
    },
    description: "희망과 영적 인도를 상징합니다. 어둠 속에서 빛을 발견하고 새로운 가능성을 찾는 것을 나타냅니다."
  },
  {
    id: "moon",
    name: "달",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUK8ZRSKjlik8S29fCg96MgaCXdEqRB3ErhCev8ebiktFeosWIFx0xBAEHnD-h2pW6JTXsyj82kB98JiPd7q3mcue3xESqerrIBPGPmhFOG7qF8cnvlSKTtfJZxsU__a17DIph9lxWGme_fjRJdaUIKbiY1YJxOOOzQUcLV9cZ0Tn6LpkGuT-07fS0WAU/s320/%EB%8B%AC.jpg",
    meanings: {
      upright: ["환상", "무의식", "불확실성", "직관"],
      reversed: ["혼란", "두려움", "오해", "환각"]
    },
    description: "미지의 세계와 무의식을 상징합니다. 겉으로 보이지 않는 두려움과 불확실성을 나타냅니다."
  },
  {
    id: "sun",
    name: "태양",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCRbgkvprd0dszPPY0TwD9Jp7kuo3L3pjeuBhZQ-n9CZvuLp_sqxJMtXw8uH7mXD1P2B2L6dn0xu790BkFOixjTyUNZAhyphenhyphenOxB2vC36bDzRzhwMld5nbsJDP-7pMJJmTkF0m635kCsOCH_P8rvSrk9-9-WxG3FgJhRucm9Ke9k19yaV_10pCPx4zcRVYVs/s320/%ED%83%9C%EC%96%91.jpg",
    meanings: {
      upright: ["성공", "기쁨", "활력", "명료함"],
      reversed: ["우울함", "자만심", "불만족", "자신감 부족"]
    },
    description: "행복과 성취의 완성을 상징합니다. 긍정적인 에너지와 밝은 미래를 나타냅니다."
  },
  {
    id: "judgement",
    name: "심판",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgRCu-FiZy35vcGSLSlIjrvrr871D6wy3PX75CYx5lfHBv5LxByTb-koKLbA20gZdUg5o468-70pGtkLPbN7qPOebvl7ocv90rcZjV2anphddRMxbZXsx_-APiJnfKAOpRuy4-VlbU7K-ibWE-vy28OZopL5A_A1JTDlDYWiNP8m9YPE1C3maKYVNihwo/s320/%EC%8B%AC%ED%8C%90.jpg",
    meanings: {
      upright: ["부활", "갱신", "평가", "직면"],
      reversed: ["자기 의심", "후회", "결정 미루기", "두려움"]
    },
    description: "자아 성찰과 각성을 상징합니다. 과거에서 배우고 새롭게 시작하는 것을 나타냅니다."
  },
  {
    id: "world",
    name: "세계",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqlKRaKUcDQI6FZLSfVfmLmcz2kYtnf8WXs7OSMYUhce-NGMaUi-ba4X-LW4JrYeOKGh4FEFNiH4SgTGw9hfRPyPd4SZG3mII4uMPuRCVSEtQH0VfK8i92ZMaDl8BHk83ZDDuARs-JWnX5vkA0VeqQWR6tNHjAwm-_ctwjMWNCuYQSJlmWVcblDyk2r8A/s320/%EC%84%B8%EA%B3%84.jpg",
    meanings: {
      upright: ["완성", "통합", "성취", "여행"],
      reversed: ["미완성", "지연", "정체", "불완전함"]
    },
    description: "완성과 충만함을 상징합니다. 한 주기의 성공적인 완료와 새로운 시작을 나타냅니다."
  }
];

// 주요 아르카나 카드만 사용
export const MAJOR_ARCANA = TAROT_CARDS; 