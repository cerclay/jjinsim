import { IQTestData } from './types';

export const iqHumorTestData: IQTestData = {
  title: "나의 진짜 IQ는? 유머버전!",
  description: "15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!",
  time_limit_seconds: 45, // 요구사항대로 45초로 변경
  questions: [
    {
      id: 1,
      text: "1, 1, 2, 3, 5, 8, ?",
      choices: ["11", "12", "13", "14"],
      answer_index: 2
    },
    {
      id: 2,
      text: "어떤 단어가 나머지와 다를까요?",
      choices: ["Car", "Bus", "Train", "Road"],
      answer_index: 3
    },
    {
      id: 3,
      text: "다음 중 가장 잘 어울리지 않는 짝은?",
      choices: ["물고기 - 물", "새 - 하늘", "자동차 - 도로", "곰 - 빵"],
      answer_index: 3
    },
    {
      id: 4,
      text: "15, 13, 11, 9, ?",
      choices: ["8", "7", "6", "5"],
      answer_index: 1
    },
    {
      id: 5,
      text: "다음 중 서로 반대되는 개념은?",
      choices: ["Hot - Cold", "Up - Side", "Fast - Speed", "Love - Hug"],
      answer_index: 0
    },
    {
      id: 6,
      text: "1, 4, 9, 16, 25, ?",
      choices: ["30", "32", "36", "40"],
      answer_index: 2
    },
    {
      id: 7,
      text: "다음 중 논리적으로 가장 다른 선택지는?",
      choices: ["눈 - 보다", "귀 - 듣다", "입 - 냄새", "손 - 잡다"],
      answer_index: 2
    },
    {
      id: 8,
      text: "2, 4, 8, 16, ?",
      choices: ["20", "24", "32", "64"],
      answer_index: 2
    },
    {
      id: 9,
      text: "짝이 맞지 않는 것은?",
      choices: ["종이 - 책", "유리 - 창문", "벽 - 시계", "나무 - 고양이"],
      answer_index: 3
    },
    {
      id: 10,
      text: "무게 순으로 나열된 것은?",
      choices: ["깃털 < 돌 < 코끼리", "코끼리 < 돌 < 깃털", "돌 < 깃털 < 코끼리", "깃털 < 코끼리 < 돌"],
      answer_index: 0
    },
    {
      id: 11,
      text: "ABC가 123이라면, DEF는?",
      choices: ["456", "789", "234", "321"],
      answer_index: 0
    },
    {
      id: 12,
      text: "도형 규칙: ■ ▲ ■ ▲ ?",
      choices: ["■", "▲", "●", "◆"],
      answer_index: 0
    },
    {
      id: 13,
      text: "단어 순서: 가방, 학교, 공부, 시험, ?",
      choices: ["졸업", "출석", "합격", "퇴사"],
      answer_index: 2
    },
    {
      id: 14,
      text: "다음 수열에서 규칙은? 2, 6, 12, 20, ?",
      choices: ["30", "28", "24", "22"],
      answer_index: 1
    },
    {
      id: 15,
      text: "속담의 빈칸: 고래 싸움에 ___ 터진다",
      choices: ["물고기", "사람", "새우", "망둥이"],
      answer_index: 2
    }
  ],
  iq_ranges: [
    {
      min_correct: 0,
      max_correct: 3,
      iq_score: 75,
      title: "🥔 감자형 뇌",
      description: "당신의 뇌는 지금 '절전 모드'. 하지만 귀여움으로 승부한다!",
      tags: ["#순수함으로간다", "#머리는장식", "#뇌절전모드", "#빛과함께사라진두뇌"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnF4dGRkMjZqZjA2c3lrNW5pN3hjNzZ1dWZlcXN2cnFmMnlwM2ZpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owzVXoDN8iP0W8IYo/giphy.gif"
    },
    {
      min_correct: 4,
      max_correct: 6,
      iq_score: 90,
      title: "🦥 느림의 미학형",
      description: "천천히, 그러나 확실히. 오늘도 생각 중입니다…",
      tags: ["#곰느림", "#잠깐만생각중", "#로딩중", "#뇌는있지만조금느림"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjg3cXBpemg1bXpiZ2tpajhwNm56bHJxbzJ6YjN2bjRzdTFmMzlpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKTDn976rzVgky4/giphy.gif"
    },
    {
      min_correct: 7,
      max_correct: 9,
      iq_score: 105,
      title: "⚖️ 밸런스 브레인형",
      description: "너무 똑똑하면 피곤하잖아요. 적당히 눈치도 있고 센스도 있는 당신!",
      tags: ["#센스중간", "#IQ국룰", "#적당히산다", "#똑똑한척하다들킴"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGk3cnh0MHlzbTAzeWd3N3BrajF5MjUzZjVrZWp0bmVmN3h1dW1pZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3mlE7uhX8KFgEmY/giphy.gif"
    },
    {
      min_correct: 10,
      max_correct: 12,
      iq_score: 120,
      title: "🧠 숨은 천재형",
      description: "당신의 뇌는 묻어두긴 아깝다. 툭 치면 똑똑함이 팡팡!",
      tags: ["#생각좀하는편", "#묻힌보석", "#천재의시작", "#너무일찍깨어난천재"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTZlaDhubHY4cTA3eDQ1aTJ5eTQ3OXB4eGFtYm0zazJoaTYzNWs0YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufdipQqU2lhNA4g/giphy.gif"
    },
    {
      min_correct: 13,
      max_correct: 14,
      iq_score: 135,
      title: "🚀 지적 우주인형",
      description: "당신의 사고 회로는 남다릅니다. 이과 감성 폭발!",
      tags: ["#천재인정", "#뇌섹남녀", "#사고회로남다름", "#똑똑함주의"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3p1OG5tbmt1bXlqYW5peWJsdWtlcXRlMWpmOGxqM3BvMXRxYzNociZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BemKqR9RDK4V2/giphy.gif"
    },
    {
      min_correct: 15,
      max_correct: 15,
      iq_score: 145,
      title: "🤖 AI 빙의형",
      description: "사람이 맞긴 한가요? GPT 친구? 뭐든 잘 풀어내는 뇌의 소유자!",
      tags: ["#로봇아님주의", "#멘사출신", "#대단하다", "#인류지적마지막진화형"],
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmpvazN0cGZpZG85aHl0NXQ3aTF0YnBpcmYzZnNveTlqY3FuMzIwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l44QzsOLXxcrigdgI/giphy.gif"
    }
  ],
  scoring_algorithm: {
    type: "correct_answer_count",
    conversion: "정답 개수 기반 IQ 점수 환산",
    ranges: "iq_ranges 배열 참조"
  }
}; 