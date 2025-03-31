"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, Trophy, RefreshCcw, ChevronLeft, Share2, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// 썸 타는 유형 테스트 문항 정의
const questions = [
  {
    id: 1,
    question: "호감 가는 사람을 발견했을 때 나는...",
    options: [
      { text: "바로 대시해서 적극적으로 내 마음을 표현한다", type: "적극형" },
      { text: "상대방의 반응을 살피며 조금씩 접근한다", type: "탐색형" },
      { text: "주변에 소문내며 상대의 관심을 끌어본다", type: "우회형" },
      { text: "아무런 행동도 취하지 않고 상대가 다가오길 기다린다", type: "관망형" }
    ]
  },
  {
    id: 2,
    question: "데이트 약속을 잡을 때 나는...",
    options: [
      { text: "구체적인 계획을 세워 완벽한 데이트를 준비한다", type: "계획형" },
      { text: "상대방의 취향을 고려해 맞춰본다", type: "배려형" },
      { text: "즉흥적으로 당일에 결정해도 괜찮다", type: "자유형" },
      { text: "상대방이 정해주길 기다린다", type: "수동형" }
    ]
  },
  {
    id: 3,
    question: "문자/카톡을 주고받을 때 나는...",
    options: [
      { text: "답장이 오자마자 바로 확인하고 답장한다", type: "적극형" },
      { text: "적당한 시간 간격을 두고 답장한다", type: "전략형" },
      { text: "이모티콘과 장문의 메시지를 보낸다", type: "표현형" },
      { text: "짧고 간결하게 필요한 내용만 주고받는다", type: "실용형" }
    ]
  },
  {
    id: 4,
    question: "상대방에게 선물을 고를 때 나는...",
    options: [
      { text: "실용적이고 필요한 것을 선물한다", type: "실용형" },
      { text: "감성적이고 의미 있는 것을 선물한다", type: "감성형" },
      { text: "비싸고 브랜드 있는 것을 선물한다", type: "과시형" },
      { text: "직접 만들거나 특별한 경험을 선물한다", type: "창의형" }
    ]
  },
  {
    id: 5,
    question: "썸 단계에서 갈등이 생겼을 때 나는...",
    options: [
      { text: "바로 대화로 풀어나가려고 노력한다", type: "소통형" },
      { text: "상황을 지켜보다가 적절한 타이밍에 해결한다", type: "전략형" },
      { text: "나의 감정을 솔직하게 표현한다", type: "감성형" },
      { text: "갈등을 피하고 넘어가려 한다", type: "회피형" }
    ]
  },
  {
    id: 6,
    question: "상대방의 친구들을 만날 기회가 생기면 나는...",
    options: [
      { text: "적극적으로 친해지려 노력한다", type: "사교형" },
      { text: "예의 바르게 행동하지만 깊은 관계는 피한다", type: "경계형" },
      { text: "상대의 친구에게 내 매력을 어필한다", type: "과시형" },
      { text: "가능하면 만남을 미루거나 피한다", type: "회피형" }
    ]
  },
  {
    id: 7,
    question: "썸이 오래 지속될 때 나는...",
    options: [
      { text: "확실한 관계 정리를 위해 고백한다", type: "진취형" },
      { text: "현재 상황을 즐기며 자연스러운 발전을 기다린다", type: "여유형" },
      { text: "상대의 마음을 떠보는 시그널을 보낸다", type: "탐색형" },
      { text: "다른 사람에게 관심을 돌리기 시작한다", type: "이탈형" }
    ]
  },
  {
    id: 8,
    question: "SNS에서 상대방의 활동을 볼 때 나는...",
    options: [
      { text: "모든 게시물에 좋아요와 댓글을 남긴다", type: "적극형" },
      { text: "은근히 확인하지만 흔적을 남기지 않는다", type: "관찰형" },
      { text: "상대의 관심을 끌기 위한 게시물을 올린다", type: "어필형" },
      { text: "SNS 활동에 큰 의미를 두지 않는다", type: "독립형" }
    ]
  },
  {
    id: 9,
    question: "첫 데이트에서 식당 메뉴를 고를 때 나는...",
    options: [
      { text: "상대방에게 추천해주며 리드한다", type: "주도형" },
      { text: "상대방의 취향을 물어보고 맞춘다", type: "배려형" },
      { text: "비싼 메뉴를 고르며 여유를 보여준다", type: "과시형" },
      { text: "상대방이 먼저 고르길 기다린다", type: "관망형" }
    ]
  },
  {
    id: 10,
    question: "썸남/썸녀가 아픈 상황이 되면 나는...",
    options: [
      { text: "직접 찾아가서 간호해준다", type: "적극형" },
      { text: "필요한 것이 있는지 물어보고 도와준다", type: "배려형" },
      { text: "위로 메시지와 함께 선물을 보낸다", type: "감성형" },
      { text: "빨리 나아지라는 메시지만 보낸다", type: "실용형" }
    ]
  },
  {
    id: 11,
    question: "썸 중인 상대가 나에게 장난을 쳤을 때 나는...",
    options: [
      { text: "더 센 장난으로 맞대응한다", type: "유머형" },
      { text: "함께 웃으며 즐겁게 받아준다", type: "여유형" },
      { text: "살짝 삐친 척하며 애교를 부린다", type: "애교형" },
      { text: "진지하게 그런 장난은 싫다고 말한다", type: "진지형" }
    ]
  },
  {
    id: 12,
    question: "썸 상대와 연락이 뜸해졌을 때 나는...",
    options: [
      { text: "먼저 연락해서 대화를 이어간다", type: "적극형" },
      { text: "상대가 바쁜지 상황을 파악해본다", type: "탐색형" },
      { text: "나도 일부러 연락을 줄여본다", type: "전략형" },
      { text: "새로운 만남을 찾아 나선다", type: "이탈형" }
    ]
  }
];

// 각 썸 타입별 결과 설명
const flirtingTypes = {
  "적극형": {
    title: "불도저식 러브헌터",
    description: "당신은 마음에 드는 사람을 보면 망설임 없이 직진하는 타입입니다! 좋아하는 마음을 숨기지 않고 당당하게 표현하며, 원하는 것이 있으면 바로 행동으로 옮기는 추진력이 대단해요. 데이트 신청부터 고백까지, 언제나 당신이 먼저예요. 때로는 상대방이 부담을 느낄 수 있지만, 그 열정적인 모습에 반하는 사람도 많답니다. 썸이 오래 가는 것을 참지 못하는 당신, 빠르게 결과를 내고 싶어하는 성격이네요!",
    strengths: ["자신감 만렙", "솔직함", "행동력", "결단력"],
    weaknesses: ["상대방 부담감", "조급함", "거절에 약함"],
    tip: "가끔은 브레이크도 필요해요. 상대방의 반응을 살피며 템포 조절을 해보세요!",
    compatibleWith: ["관망형", "탐색형"],
    imageUrl: "https://picsum.photos/id/1083/400/400",
    emoji: "🔥"
  },
  "탐색형": {
    title: "데이터 수집형 연애 탐정",
    description: "당신은 상대방에 대해 철저히 조사하고 분석한 후에 접근하는 신중한 타입입니다. 좋아하는 사람의 SNS는 이미 정복했고, 취향부터 일정까지 모든 정보를 수집하는 데 능숙해요. 상대방의 말과 행동에서 숨겨진 의미를 찾아내려는 분석력이 뛰어나죠. 하지만 너무 많은 탐색 시간으로 인해 실제 행동은 뒤로 미루는 경향이 있어요. 혹시 지금도 좋아하는 사람의 프로필을 몰래 살펴보고 있나요?",
    strengths: ["관찰력", "분석력", "신중함", "정보수집능력"],
    weaknesses: ["과잉분석", "행동 지연", "오버씽킹"],
    tip: "때로는 분석을 잠시 멈추고 직접 다가가보세요. 생각보다 좋은 결과가 기다리고 있을지도 몰라요!",
    compatibleWith: ["적극형", "주도형"],
    imageUrl: "https://picsum.photos/id/1059/400/400",
    emoji: "🔍"
  },
  "전략형": {
    title: "계산적인 연애 체스플레이어",
    description: "당신은 썸에서도 한 수 앞을 내다보는 전략가입니다! 언제, 어디서, 어떻게 행동할지 완벽하게 계산하고 움직이는 타입이에요. 썸을 마치 체스 게임처럼 여기며, 상대방의 마음을 얻기 위한 최적의 경로를 찾아내죠. 카톡 답장 시간부터 데이트 코스까지, 모든 것이 당신의 전략 안에 있어요. 하지만 때로는 너무 계산적으로 보여 진정성이 의심받을 수 있으니 주의하세요!",
    strengths: ["전략적 사고", "계획성", "상황 파악력", "타이밍 감각"],
    weaknesses: ["과도한 계산", "자연스러움 부족", "융통성 부족"],
    tip: "가끔은 계획을 버리고 즉흥적으로 행동해보세요. 예상치 못한 로맨스가 기다리고 있을지도 몰라요!",
    compatibleWith: ["자유형", "감성형"],
    imageUrl: "https://picsum.photos/id/1040/400/400",
    emoji: "♟️"
  },
  "감성형": {
    title: "영화 속 주인공 로맨티스트",
    description: "당신은 일상을 로맨틱 코미디 영화처럼 만드는 감성 충만 로맨티스트입니다! 작은 것에서도 의미를 찾고, 특별한 순간을 만들어내는 데 탁월해요. 감성적인 편지, 깜짝 이벤트, 의미 있는 선물로 상대방의 마음을 녹이는 재주가 있죠. 때로는 현실과 이상의 괴리에 실망할 수 있지만, 당신의 로맨틱한 에너지는 주변 사람들에게 긍정적인 영향을 줍니다!",
    strengths: ["감수성", "창의력", "표현력", "공감능력"],
    weaknesses: ["현실과 이상의 괴리", "감정 기복", "과도한 기대"],
    tip: "로맨스도 좋지만 가끔은 현실적인 부분도 함께 고려해보세요. 균형 잡힌 관계가 오래갑니다!",
    compatibleWith: ["실용형", "전략형"],
    imageUrl: "https://picsum.photos/id/1068/400/400",
    emoji: "💖"
  },
  "소통형": {
    title: "토크쇼 진행자형 연애가",
    description: "당신은 솔직한 대화로 모든 것을 해결하려는 커뮤니케이션 전문가입니다! 감정과 생각을 명확하게 표현하며, 상대방의 이야기에도 귀 기울이는 능력이 뛰어나요. 오해가 생기면 바로 대화로 풀어나가며, 관계의 문제점을 정확히 짚어내죠. 투명한 소통으로 건강한 관계를 만들어가지만, 때로는 너무 모든 것을 말해버려 로맨스의 신비감이 사라질 수 있어요. 비밀을 간직할 줄도 알아야 해요!",
    strengths: ["소통능력", "솔직함", "갈등 해결력", "경청 능력"],
    weaknesses: ["과도한 솔직함", "로맨스 부족", "비밀 유지 어려움"],
    tip: "모든 것을 말하기보다 때로는 침묵과 여운도 필요해요. 신비감이 로맨스를 더 깊게 만들 수 있답니다!",
    compatibleWith: ["경계형", "진지형"],
    imageUrl: "https://picsum.photos/id/1080/400/400",
    emoji: "🎙️"
  },
  "배려형": {
    title: "연애계의 수호천사",
    description: "당신은 상대방의 필요와 감정을 항상 먼저 생각하는 배려의 달인입니다! 작은 것까지 기억하고 챙겨주며, 상대방이 편안함을 느끼게 해주는 타입이에요. 좋아하는 사람의 취향, 스케줄, 고민거리까지 모두 기억하고 맞춰주려 노력하죠. 하지만 때로는 자신의 욕구는 뒤로한 채 상대만 배려하다 지칠 수 있어요. 당신도 소중한 사람임을 잊지 마세요!",
    strengths: ["배려심", "기억력", "공감능력", "헌신"],
    weaknesses: ["자기희생", "자기주장 부족", "과도한 맞춤"],
    tip: "상대방도 당신을 배려할 기회를 주세요. 완벽한 관계는 주고받는 균형에서 이루어진답니다!",
    compatibleWith: ["유머형", "실용형"],
    imageUrl: "https://picsum.photos/id/1066/400/400",
    emoji: "😇"
  },
  "관망형": {
    title: "미스터리한 매력의 소유자",
    description: "당신은 조용히 자신의 매력을 발산하며 상대방이 다가오길 기다리는 신비로운 타입입니다! 적극적으로 나서기보다는 은은한 카리스마와 분위기로 상대의 관심을 끌어요. 쉽게 감정을 드러내지 않아 상대방의 호기심을 자극하는 재주가 있죠. 하지만 너무 수동적인 태도로 좋은 기회를 놓치기도 해요. 때로는 당신이 첫 걸음을 내딛어야 할 때도 있답니다!",
    strengths: ["미스터리한 매력", "인내심", "자연스러움", "여유"],
    weaknesses: ["소극적 태도", "기회 상실", "의사표현 부족"],
    tip: "가끔은 당신이 먼저 손을 내밀어보세요. 그 한 걸음이 인생을 바꿀 수도 있답니다!",
    compatibleWith: ["적극형", "주도형"],
    imageUrl: "https://picsum.photos/id/1025/400/400",
    emoji: "🔮"
  },
  "주도형": {
    title: "연애 디렉터",
    description: "당신은 연애에서도 리더십을 발휘하는 주도적인 타입입니다! 데이트 코스부터 관계의 방향까지, 모든 것을 리드하며 결정적인 순간에 이니셔티브를 쥐는 재주가 있어요. 자신감 넘치는 모습과 결단력 있는 행동으로 상대방에게 신뢰감을 주죠. 하지만 때로는 너무 주도적이라 상대방의 의견을 무시할 수 있으니 균형을 찾는 것이 중요해요!",
    strengths: ["리더십", "결단력", "자신감", "추진력"],
    weaknesses: ["독단적 성향", "경청 부족", "통제욕"],
    tip: "가끔은 상대방에게 리드할 기회를 줘보세요. 예상치 못한 즐거움을 발견할 수 있을 거예요!",
    compatibleWith: ["관망형", "수동형"],
    imageUrl: "https://picsum.photos/id/1012/400/400",
    emoji: "👑"
  },
  "자유형": {
    title: "즉흥적인 연애 모험가",
    description: "당신은 계획보다 즉흥을 즐기는 자유로운 영혼의 소유자입니다! 틀에 박힌 연애를 거부하고, 순간의 감정과 끌림을 중요시하는 타입이에요. 예상치 못한 데이트와 깜짝 이벤트로 관계에 신선함을 불어넣는 재주가 있죠. 하지만 때로는 너무 즉흥적이라 상대방이 불안함을 느낄 수 있어요. 약속과 계획의 중요성도 간과하지 마세요!",
    strengths: ["창의성", "적응력", "재미", "개성"],
    weaknesses: ["불안정함", "계획성 부족", "책임감 부족"],
    tip: "자유로움도 좋지만, 약속은 지키는 모습을 보여주세요. 신뢰는 관계의 기본이랍니다!",
    compatibleWith: ["계획형", "전략형"],
    imageUrl: "https://picsum.photos/id/1036/400/400",
    emoji: "🦋"
  },
  "유머형": {
    title: "개그맨같은 웃음 처방사",
    description: "당신은 유머와 재치로 상대방의 마음을 사로잡는 타입입니다! 어색한 상황도 재미있는 농담 하나로 부드럽게 만드는 능력이 있어요. 함께 있으면 지루할 틈이 없고, 늘 웃음이 끊이지 않는 분위기를 만들어내죠. 하지만 때로는 모든 것을 유머로 넘기려다 진지한 대화가 필요한 순간을 놓칠 수 있어요. 적절한 타이밍에 진지해질 줄도 알아야 해요!",
    strengths: ["유머감각", "분위기 메이커", "긍정적 에너지", "스트레스 해소"],
    weaknesses: ["진지함 부족", "회피성 농담", "과도한 장난"],
    tip: "웃음도 중요하지만, 때로는 진지한 대화도 필요해요. 균형 잡힌 소통이 관계를 더 깊게 만듭니다!",
    compatibleWith: ["배려형", "감성형"],
    imageUrl: "https://picsum.photos/id/1072/400/400",
    emoji: "😂"
  },
  "애교형": {
    title: "치명적인 귀여움 폭격기",
    description: "당신은 자연스러운 애교와 사랑스러운 매력으로 상대방의 마음을 녹이는 타입입니다! 무의식적으로도 사랑스러운 행동과 표정으로 주변 사람들을 설레게 만드는 재주가 있어요. 상대방이 거절하기 어려운 요청 스킬과 귀여운 칭얼거림으로 원하는 것을 얻어내죠. 하지만 때로는 너무 의존적으로 보일 수 있으니, 자립적인 모습도 함께 보여주는 것이 좋아요!",
    strengths: ["천생 애교", "사랑스러움", "표현력", "설득력"],
    weaknesses: ["의존적 이미지", "진정성 의심", "과도한 애교"],
    tip: "애교도 좋지만 당신의 지적인 면모와 독립적인 모습도 보여주세요. 다양한 매력이 더 오래 사랑받습니다!",
    compatibleWith: ["진지형", "유머형"],
    imageUrl: "https://picsum.photos/id/1027/400/400",
    emoji: "🥰"
  },
  "진지형": {
    title: "한번 시작하면 끝까지 가는 진심러",
    description: "당신은 연애에 있어서도 진지하고 책임감 있는 태도를 보이는 타입입니다! 가벼운 썸보다는 의미 있는 관계를 추구하며, 한번 마음을 주면 끝까지 책임지려는 성향이 있어요. 신뢰와 약속을 중요시하며, 모든 관계에 진심을 다하죠. 하지만 때로는 너무 무거운 분위기를 만들어 상대방이 부담을 느낄 수 있어요. 가끔은 가볍게 웃고 즐길 줄도 알아야 해요. 로맨스에는 재미도 중요하답니다!",
    strengths: ["진정성", "책임감", "신뢰성", "헌신"],
    weaknesses: ["경직됨", "무거운 분위기", "과도한 기대"],
    tip: "진지함도 좋지만 때로는 가볍게 웃고 즐길 줄도 알아야 해요. 로맨스에는 재미도 중요하답니다!",
    compatibleWith: ["소통형", "애교형"],
    imageUrl: "https://picsum.photos/id/1074/400/400",
    emoji: "🧠"
  }
};

export default function FlirtingStyleTest() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState("intro"); // intro, test, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flirtingType, setFlirtingType] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [resultTypes, setResultTypes] = useState<string[]>([]);

  // 테스트 시작
  const startTest = () => {
    if (!userName.trim()) {
      alert("이름을 입력해주세요!");
      return;
    }
    setStep("test");
    setStartTime(new Date());
    setProgress(0);
  };

  // 답변 선택 처리
  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [currentQuestion]: type };
    setAnswers(newAnswers);
    
    // 진행 상황 업데이트
    const newProgress = ((currentQuestion + 1) / questions.length) * 100;
    setProgress(newProgress);
    
    // 다음 질문으로 이동 또는 테스트 완료
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  // 테스트 결과 분석 - 재미있고 유쾌한 결과 알고리즘
  const finishTest = (finalAnswers: Record<number, string>) => {
    // 각 유형별 카운트
    const typeCounts: Record<string, number> = {};
    
    Object.values(finalAnswers).forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // 상위 2개 유형 찾기 (더 다양한 결과를 위해)
    const sortedTypes = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    // 메인 유형과 서브 유형 저장
    const mainType = sortedTypes[0] || "적극형";
    const subType = sortedTypes[1] || sortedTypes[0] || "감성형";
    
    setResultTypes([mainType, subType]);
    setFlirtingType(mainType);
    setEndTime(new Date());
    setStep("result");
  };

  // 테스트 다시 시작
  const restartTest = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setFlirtingType("");
    setResultTypes([]);
    setProgress(0);
    setStartTime(null);
    setEndTime(null);
  };

  // 결과 공유
  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: '나의 썸탈때 유형 테스트 결과',
        text: `${userName}님은 "${flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}" 유형입니다!`,
        url: window.location.href,
      })
      .catch((error) => console.log('공유하기 실패:', error));
    } else {
      const shareText = `${userName}님은 "${flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}" 유형입니다!`;
      alert(`공유하기가 지원되지 않습니다. 결과를 복사해서 공유해보세요:\n\n${shareText}`);
    }
  };

  // 애니메이션 변수
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  // 서브 유형 정보 가져오기
  const getSubTypeInfo = () => {
    if (resultTypes.length > 1) {
      return flirtingTypes[resultTypes[1] as keyof typeof flirtingTypes];
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div 
              key="intro"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="h-16 w-16 text-purple-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">나의 썸탈때 유형은?</h1>
                <p className="text-gray-600 mb-6">당신이 관심 있는 사람에게 어떻게 다가가는지 알아보세요!</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    테스트를 시작하기 전에 이름을 입력해주세요
                  </label>
                  <Input
                    type="text"
                    placeholder="이름 입력"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white text-black border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <Button 
                  onClick={startTest}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>소요 시간: 약 3분</span>
                  </div>
                  <p>12개의 질문을 통해 당신의 썸 스타일을 분석합니다</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === "test" && (
            <motion.div 
              key="test"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">진행 상황</span>
                    <span className="text-sm text-gray-600">{currentQuestion + 1}/{questions.length}</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-between text-left cursor-pointer"
                    >
                      <span>{option.text}</span>
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "result" && flirtingType && (
            <motion.div 
              key="result"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="text-4xl">
                    {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.emoji || "🎉"}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {userName}님의 썸 스타일은
                </h2>
                <h1 className="text-2xl font-extrabold text-purple-500 mb-4">
                  "{flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}"
                </h1>
                
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.imageUrl} 
                      alt="Flirting Type" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-left">
                    {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.description}
                  </p>
                  
                  <div className="mb-4 bg-purple-50 p-3 rounded-lg text-left">
                    <h3 className="font-semibold text-purple-700 mb-1">💡 연애 조언</h3>
                    <p className="text-gray-700 text-sm">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.tip}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-left">당신의 썸 매력 포인트</h3>
                    <div className="flex flex-wrap gap-2">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.strengths.map((strength, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-left">조심해야 할 점</h3>
                    <div className="flex flex-wrap gap-2">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.weaknesses.map((weakness, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {weakness}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {getSubTypeInfo() && (
                    <div className="mb-4 bg-gray-50 p-3 rounded-lg text-left">
                      <h3 className="font-semibold text-gray-700 mb-1">🔍 숨겨진 당신의 이중성</h3>
                      <p className="text-sm text-gray-600">
                        {userName}님은 주로 <span className="font-bold text-purple-500">{flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.title}</span>
                        의 특성을 보이지만, <span className="font-bold text-blue-500">{getSubTypeInfo()?.title}</span>의 
                        모습도 가지고 있어요. 상황에 따라 당신의 숨겨진 매력이 드러날 수 있답니다!
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-left">궁합이 잘 맞는 유형</h3>
                    <div className="flex flex-wrap gap-2">
                      {flirtingTypes[flirtingType as keyof typeof flirtingTypes]?.compatibleWith?.map((type, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-6">
                    테스트 완료 시간: {endTime && format(endTime, 'yyyy년 MM월 dd일 HH:mm')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={restartTest}
                    className="bg-white border border-purple-500 text-purple-500 hover:bg-purple-50 py-2 rounded-lg flex items-center justify-center"
                    variant="outline"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    다시 테스트
                  </Button>
                  
                  <Button
                    onClick={shareResult}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    결과 공유
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Link href="/tests/new" className="flex items-center justify-center text-sm text-gray-600 hover:text-purple-500">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    다른 테스트 보기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 