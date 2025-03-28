export const STRESS_CHECK_DATA = {
  title: "스트레스 지수 체크",
  subtitle: "나 지금 멘탈 몇 % 남았지?",
  description: "12문제로 알아보는 당신의 스트레스 지수. 지금 당신 멘탈, 몇 % 남았을까?",
  questions: [
    {
      id: 1,
      text: "지하철 타려는데 문이 눈앞에서 닫혔다!",
      choices: [
        { text: "어쩔 수 없지~ 다음 타자", score: 0 },
        { text: "하 진짜 타이밍 왜 이래", score: 1 },
        { text: "아 나 진짜 오늘 왜 이러냐고!!!!", score: 2 }
      ]
    },
    {
      id: 2,
      text: "배달 음식이 30분 늦게 왔는데 국물이 샜다",
      choices: [
        { text: "그럴 수도 있지, 뭐…", score: 0 },
        { text: "다음엔 다른 집 시켜야지", score: 1 },
        { text: "환불 각이다. 리뷰 각이다", score: 2 }
      ]
    },
    {
      id: 3,
      text: "친구가 카톡 읽고 씹음 (3일째)",
      choices: [
        { text: "바쁘겠지~", score: 0 },
        { text: "살짝 서운…", score: 1 },
        { text: "손절 리스트에 추가함", score: 2 }
      ]
    },
    {
      id: 4,
      text: "갑자기 상사가 회의 10분 전에 자료 요청",
      choices: [
        { text: "오케이~ 빠르게 처리해볼게요", score: 0 },
        { text: "속으로 욕하고 웃으면서 준비함", score: 1 },
        { text: "노트북 닫고 퇴사 검색함", score: 2 }
      ]
    },
    {
      id: 5,
      text: "계획한 여행이 날씨 때문에 취소됨",
      choices: [
        { text: "대신 집에서 푹 쉬자~", score: 0 },
        { text: "에이... 아쉽다 진짜", score: 1 },
        { text: "하늘이 날 싫어하나봐", score: 2 }
      ]
    },
    {
      id: 6,
      text: "택배가 분실됐다는 문자를 받았다",
      choices: [
        { text: "고객센터에 전화해본다", score: 0 },
        { text: "배송기사에게 톡 먼저 보냄", score: 1 },
        { text: "현관에 CCTV 설치 생각함", score: 2 }
      ]
    },
    {
      id: 7,
      text: "컴퓨터가 저장 안 하고 꺼졌다",
      choices: [
        { text: "그래, 이럴 수도 있지", score: 0 },
        { text: "손이 덜덜 떨린다…", score: 1 },
        { text: "모니터에게 사과 요구함", score: 2 }
      ]
    },
    {
      id: 8,
      text: "길 가다 발에 껌이 붙었다",
      choices: [
        { text: "으잉? 그냥 떼고 말지", score: 0 },
        { text: "운세 안 좋다 오늘", score: 1 },
        { text: "신발 벗어 던지고 싶음", score: 2 }
      ]
    },
    {
      id: 9,
      text: "일하고 있는데 휴대폰 배터리 1%",
      choices: [
        { text: "충전기 찾으면 되지~", score: 0 },
        { text: "으악! 어디 있어 충전기!!", score: 1 },
        { text: "이젠 나까지 방전된 기분", score: 2 }
      ]
    },
    {
      id: 10,
      text: "지갑을 두고 나온 걸 알았을 때",
      choices: [
        { text: "뭐 어때~ 점심 굶자", score: 0 },
        { text: "하 진짜 허무함", score: 1 },
        { text: "하루가 망했다고 느껴짐", score: 2 }
      ]
    },
    {
      id: 11,
      text: "단톡방에서 내 말만 안 읽힘",
      choices: [
        { text: "다들 바쁜가보지 뭐~", score: 0 },
        { text: "살짝 민망... 기분 좀 구려", score: 1 },
        { text: "나 투명인간이었냐", score: 2 }
      ]
    },
    {
      id: 12,
      text: "퇴근 직전에 새로운 업무가 떨어짐",
      choices: [
        { text: "알겠습니다~ 내일 할게요!", score: 0 },
        { text: "마음속으로 3초 정지", score: 1 },
        { text: "컴퓨터에 주먹 날림", score: 2 }
      ]
    }
  ],
  results: [
    {
      id: "tank",
      range: [0, 4],
      title: "🧊 멘탈 강철탱크형",
      description: "누가 뭐래도 끄떡 없음. 마음의 평온을 다진 당신은 스트레스가 스쳐도 튕겨나감.",
      tags: ["#평온", "#무심함", "#멘탈왕"],
      emoji: "🧊",
      mentalPercentage: 95
    },
    {
      id: "sensitive",
      range: [5, 8],
      title: "🌧 살짝 민감한 감성러",
      description: "공감력은 높지만, 티 안 나게 쌓인다. 조용히 스트레스 쌓는 타입. 대체로 괜찮지만 가끔은 푹 쉬어야 함.",
      tags: ["#예민보스", "#적당스트레스", "#공감형"],
      emoji: "🌧",
      mentalPercentage: 75
    },
    {
      id: "warning",
      range: [9, 12],
      title: "🚨 뚜껑 직전 경고등",
      description: "말은 안 해도 스트레스가 얼굴에 써있음. 오늘 누가 건들면 바로 터질 수도 있음. 당분간 단톡 금지.",
      tags: ["#스트레스경고", "#말걸지마", "#주의필요"],
      emoji: "🚨",
      mentalPercentage: 55
    },
    {
      id: "ghost",
      range: [13, 16],
      title: "👻 반쯤 탈주한 영혼",
      description: "정신은 이미 떠나고 몸만 남은 상태. 회의 중에도 눈은 뜨고 있지만 마음은 자연으로 떠났음.",
      tags: ["#퇴사각", "#방전됨", "#마음은제주도"],
      emoji: "👻",
      mentalPercentage: 35
    },
    {
      id: "volcano",
      range: [17, 20],
      title: "🌋 화산폭발 D-1형",
      description: "입꼬리는 웃지만 눈빛은 차가움. 지금은 모든 것이 짜증. 작은 일에도 '왜 나만?' 생각 중.",
      tags: ["#폭발직전", "#극대노", "#위험물질"],
      emoji: "🌋",
      mentalPercentage: 15
    },
    {
      id: "monster",
      range: [21, 24],
      title: "👹 스트레스 괴물",
      description: "이미 인간의 한계를 넘어섰음. 당신은 현재 사회에 분노한 스트레스 화신. 당장 달콤한 디저트 필요.",
      tags: ["#멘붕", "#화신", "#지옥같은일상"],
      emoji: "👹",
      mentalPercentage: 5
    }
  ]
}; 