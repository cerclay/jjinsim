"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Share2, RefreshCcw, ChevronLeft, Film, Video, Award, Camera, HeartPulse, Clapperboard, Popcorn, Tv2, Sparkles, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// 테스트 데이터
const testData = {
  "title": "내 인생 장르는 뭘까?",
  "description": "12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!",
  "questions": [
    {
      "id": 1,
      "text": "아침에 알람이 안 울렸을 때 당신은?",
      "choices": [
        { "id": 1, "text": "패닉! 전속력으로 준비 후 택시 탐", "traits": ["thriller"] },
        { "id": 2, "text": "'지각도 인생의 일부지' 하고 여유 부림", "traits": ["sitcom"] },
        { "id": 3, "text": "이건 무언가의 운명적 신호다…", "traits": ["fantasy"] }
      ]
    },
    {
      "id": 2,
      "text": "좋아하는 사람에게 고백하기 직전, 당신의 심장은?",
      "choices": [
        { "id": 1, "text": "쿵쾅쿵쾅! 대본도 다 외움", "traits": ["romantic"] },
        { "id": 2, "text": "뇌내 시뮬레이션만 57번 돌림", "traits": ["thriller"] },
        { "id": 3, "text": "지금이 아니면 안 돼. 지금이야!", "traits": ["survivor"] }
      ]
    },
    {
      "id": 3,
      "text": "동아리 MT 첫날 밤, 당신은?",
      "choices": [
        { "id": 1, "text": "분위기 메이커로 즉석 콩트함", "traits": ["sitcom"] },
        { "id": 2, "text": "사람들 관찰하며 성격 분석 중", "traits": ["noir"] },
        { "id": 3, "text": "별 보며 인생을 느끼는 중", "traits": ["healing"] }
      ]
    },
    {
      "id": 4,
      "text": "계획에 없던 여행이 갑자기 생겼다면?",
      "choices": [
        { "id": 1, "text": "지도 펴고 숙소/코스 완벽 준비", "traits": ["realist"] },
        { "id": 2, "text": "'가는 게 어디든 어차피 여정이 중요함'", "traits": ["fantasy"] },
        { "id": 3, "text": "위험할 수도 있어. 생존물각!", "traits": ["survivor"] }
      ]
    },
    {
      "id": 5,
      "text": "친구가 갑자기 울면서 전화했을 때",
      "choices": [
        { "id": 1, "text": "감정 공감하며 같이 울어줌", "traits": ["romantic"] },
        { "id": 2, "text": "냉정하게 상황 분석부터 시작", "traits": ["realist"] },
        { "id": 3, "text": "일단 웃긴 짤 보내고 침착하게 대응", "traits": ["sitcom"] }
      ]
    },
    {
      "id": 6,
      "text": "갑자기 정전됐다면?",
      "choices": [
        { "id": 1, "text": "아 이제 귀신 나올 타이밍인데", "traits": ["thriller"] },
        { "id": 2, "text": "양초 켜고 동화 같은 분위기로 감상", "traits": ["healing"] },
        { "id": 3, "text": "이건 이제 생존게임이다", "traits": ["survivor"] }
      ]
    },
    {
      "id": 7,
      "text": "면접장에서 예상 질문을 벗어난 질문이 들어온다면?",
      "choices": [
        { "id": 1, "text": "오히려 좋아, 각 잡고 말함", "traits": ["noir"] },
        { "id": 2, "text": "상상력 폭발시키며 답변 날림", "traits": ["fantasy"] },
        { "id": 3, "text": "'죄송합니다' 하고 진심을 전달", "traits": ["realist"] }
      ]
    },
    {
      "id": 8,
      "text": "집에서 혼자 보내는 토요일",
      "choices": [
        { "id": 1, "text": "드라마 몰아보며 감정이입", "traits": ["romantic"] },
        { "id": 2, "text": "이불 밖은 위험하니까... 조용히 쉼", "traits": ["healing"] },
        { "id": 3, "text": "내 삶은 시트콤이야, 혼자서도 떠들썩", "traits": ["sitcom"] }
      ]
    },
    {
      "id": 9,
      "text": "갑자기 길거리에서 연예인이 말을 걸면?",
      "choices": [
        { "id": 1, "text": "미션인가...? 주변을 먼저 살핌", "traits": ["thriller"] },
        { "id": 2, "text": "이건 인생의 전환점! 운명적 만남", "traits": ["romantic"] },
        { "id": 3, "text": "심지어 내가 더 연예인같은데?", "traits": ["noir"] }
      ]
    },
    {
      "id": 10,
      "text": "팀 프로젝트가 산으로 갈 때 당신은?",
      "choices": [
        { "id": 1, "text": "일단 다 버리고 다시 짬", "traits": ["survivor"] },
        { "id": 2, "text": "갈 데까지 가보자~ 코미디로 전환", "traits": ["sitcom"] },
        { "id": 3, "text": "정신승리 중… 이건 다 의미가 있어", "traits": ["fantasy"] }
      ]
    },
    {
      "id": 11,
      "text": "지하철에서 이상한 사람을 봤다",
      "choices": [
        { "id": 1, "text": "조용히 멀리 감", "traits": ["realist"] },
        { "id": 2, "text": "관찰 일지 작성함 (속으로)", "traits": ["noir"] },
        { "id": 3, "text": "이거 다큐 찍으면 대박각인데?", "traits": ["healing"] }
      ]
    },
    {
      "id": 12,
      "text": "누군가 당신을 영화 주인공으로 캐스팅한다면?",
      "choices": [
        { "id": 1, "text": "좀비물 속 냉철한 생존자", "traits": ["survivor"] },
        { "id": 2, "text": "로맨스 속 엇갈린 주인공", "traits": ["romantic"] },
        { "id": 3, "text": "인생무상 다큐멘터리형 인물", "traits": ["realist"] }
      ]
    }
  ],
  "results": [
    {
      "id": "survivor",
      "title": "🧟‍♂️ 좀비 아포칼립스물",
      "description": "당신은 극한 상황에서 살아남는 냉철한 리더형. 좀비가 오면 제일 먼저 살아남을 타입!",
      "tags": ["#생존력최강", "#좀비와함께", "#배신은없다"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5q_DiLILaHXtg1tjjaE2loC3uXMEykXSxhNWAceBskHdBRnaZHofYo8IgaQoZv66GeEMmAacqJIGRveGwD79nr3yTw8W_vBcWra9UsdCEUNVzNvGZ4S0SPDcf3Gh1-acLHSnPw4HWAK-VJu_hAjgFs6rGXXsm6QfOfxoMypjBIMAdMOsaimXiPHvi_mg/s320/image_fx_%20(6).jpg"
    },
    {
      "id": "romantic",
      "title": "💘 인생은 로맨스 영화",
      "description": "감성 충만한 당신은 사랑과 감정선에 충실한 인물! 당신의 인생엔 늘 BGM이 깔려 있음.",
      "tags": ["#심쿵주의", "#엿같지만사랑", "#감성100퍼"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8kfjFXxL6qGBwB_kPz6fYnXyTYkV8vZZg7TgrtBN50hKSWaAMW32cq3DthCFaLcus-tq50qDWjxDhCDgEWqTuQSC_Jpr7oXMsRtCThQCBkZhyphenhyphenddgwFWDEz1yxEVmNMnTucLTnYBCgyjnhadj1zNI9OBbBwxwjJrcCN765He2KA5MaUOSXJEMT15b52lQ/s320/image_fx_%20(7).jpg"
    },
    {
      "id": "sitcom",
      "title": "😂 시트콤 인생",
      "description": "당신의 인생은 하루하루가 예능. 본의 아니게 웃긴 사람. 던지는 말마다 주위가 터짐.",
      "tags": ["#웃음지뢰", "#반응속도2초", "#드립장인"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjni-fLC3nYuJFPyONQij1DVE8q39rFQ9RzADIi6kuZtdY_reDSekkW1rX8HWYh6rPkPy14x_JynYwY1R4CeMcNiFLL8Gson2keM_AwnMuwgKNfaY6ZPtUqotdnJFHwUSH1R9Qa6N_VP850mx2lSY5AbIxEFoWuhPHxF9coYqHZKS9BVdptvaiUZqJcLBI/s320/image_fx_%20(8).jpg"
    },
    {
      "id": "noir",
      "title": "🕶 누아르 영화 속 주인공",
      "description": "냉철, 이성적, 그림자 속에 사는 사람. 멋있는데 외로움 있음. 조용한 카리스마가 있음.",
      "tags": ["#카리스마", "#말없이판단", "#외로움있음"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQHKiBbZsQ766ly6BlK2A2GJBY5wwk7apU-rzYdbmfRpfXg7bx2jjI9tK-95iaMuJ-C65D3D-LzVYiF7U2ZAIJfUevQAWoHWkv7kB1JyMqXtbYdwa2bGK8byc9sD_zajNsyzHdwtgu3O8FbjR0QVoM8PV-Ytk0R54cskxwJ9vhgVyOop6fDrFSYDVpw98/s320/image_fx_%20(9).jpg"
    },
    {
      "id": "fantasy",
      "title": "🧝 판타지 속 인물",
      "description": "현실보다 상상을 먼저 믿는 사람. 인생을 모험으로 보는 성향. 엘프 친구 있을 듯.",
      "tags": ["#상상력대장", "#운명론자", "#중간계갈래"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLIn0e3mDH9Om1-FHghhuHX8snizZzCR7-TroEU9RIo5wZ7YqEGwfCKn__1hS-9Fed4TWqh7jN-VHKr6-quJhS_2C7FU0tIsvpqep7lr8kW5GziTjs9kvciak1_Hinry98g1Rk4cDjHY2U3XP2t_nDC8eucpaZS-dV_WguEQeJZo1oD8mxF8vkgUsWPRU/s320/image_fx_%20(10).jpg"
    },
    {
      "id": "thriller",
      "title": "🔪 스릴러 속 생존자",
      "description": "언제나 최악의 시나리오에 대비 중. 민감하고 빠르게 반응하며, 믿을 건 나 자신뿐.",
      "tags": ["#촉좋음", "#눈치왕", "#긴장감ON"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhis57wrk_VE-mRTdZM4aftVA4m_oytZZgdPAT_9GGqWsiF3Sx_1VbK-VdsChtCl4aUKMYusyD-IzTf7bG0hyE3gnyzLqlpOSn_AhX06XJoFzl9Voe5zTSB9UDdh_CrPR7xSqrqehdgmtm2THl8B9H8Y8Bq-a69x83LG7bHsEgYDTnGxkuhqldJt0KHe-g/s320/image_fx_%20(11).jpg"
    },
    {
      "id": "realist",
      "title": "📽 다큐멘터리형 인간",
      "description": "객관적이고 현실적. 감정보다는 팩트를 따지는 스타일. 항상 '그럴 수도 있지' 마인드.",
      "tags": ["#팩트체크중", "#냉정과열정사이", "#이해는하지만공감은안됨"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8ljsf5mCsmDcqyKg00duzIx5nAyfQ4TFygkh_X0WudUy8oeh59zMMhLTfH44VMIcEzCoUCr5KX0meu_LGjZ4FUFmAHLMODlSX8L19Abp_74CnYU6RE1Tcp5Teisdos2K_BLWTTbsdvjD_pEKzXM0yELPzKQbYVemZVdASuDyFfEsVGUklc567H0QyxIc/s320/image_fx_%20(12).jpg"
    },
    {
      "id": "healing",
      "title": "🍵 힐링 애니메이션 주인공",
      "description": "당신의 인생은 조용하고 따뜻한 감성 영화처럼 흘러갑니다. 남이 보면 울음 버튼.",
      "tags": ["#잔잔하지만쎈", "#눈물버튼", "#고양이카페좋아함"],
      "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3uufgRPEPrFay08RI39cETOZ70mk6rm66zy_iVU5Kz2kqsyCr9LfqGEu5M321CsKWneUYiZdGMiDANRClFpfEwmQzySwUFcYWnf4ZxseHFtSiMvdsupDymy5A0ekmtxZnEqSX52sGpAGjEoe4L9479scOmk5mX-0PTFyhMxrVfiSKaJHD_zXEyhIuEXg/s320/image_fx_%20(13).jpg"
    }
  ]
};

// 결과 아이콘 매핑
const resultIcons = [
  { id: "survivor", icon: <Clapperboard className="h-16 w-16 text-red-500" />, color: "from-red-400 to-orange-500" },
  { id: "romantic", icon: <HeartPulse className="h-16 w-16 text-pink-500" />, color: "from-pink-400 to-red-400" },
  { id: "sitcom", icon: <Tv2 className="h-16 w-16 text-yellow-500" />, color: "from-yellow-400 to-amber-500" },
  { id: "noir", icon: <Film className="h-16 w-16 text-slate-600" />, color: "from-slate-500 to-gray-700" },
  { id: "fantasy", icon: <Sparkles className="h-16 w-16 text-purple-500" />, color: "from-purple-400 to-indigo-600" },
  { id: "thriller", icon: <Video className="h-16 w-16 text-violet-500" />, color: "from-violet-500 to-purple-700" },
  { id: "realist", icon: <Camera className="h-16 w-16 text-blue-500" />, color: "from-blue-400 to-cyan-600" },
  { id: "healing", icon: <Popcorn className="h-16 w-16 text-teal-500" />, color: "from-teal-400 to-emerald-500" }
];

// 애니메이션 변수
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const popInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200
    }
  }
};

// 영화 장르별 추천 영화 목록
const genreMovies = {
  "survivor": ["월드워Z", "좀비랜드", "트레인 투 부산", "28일 후", "버드 박스"],
  "romantic": ["노트북", "이터널 선샤인", "비포 선라이즈", "러브 액츄얼리", "어바웃 타임"],
  "sitcom": ["프렌즈", "브루클린 나인-나인", "빅뱅 이론", "모던 패밀리", "더 오피스"],
  "noir": ["세븐", "메멘토", "블레이드 러너", "올드보이", "다크 나이트"],
  "fantasy": ["해리포터", "반지의 제왕", "나니아 연대기", "판의 미로", "스타더스트"],
  "thriller": ["식스 센스", "셔터 아일랜드", "플라이트 플랜", "소셜 네트워크", "더 게임"],
  "realist": ["스포트라이트", "소셜 네트워크", "다크 워터스", "마션", "인터스텔라"],
  "healing": ["토토로", "하울의 움직이는 성", "월-E", "인사이드 아웃", "패딩턴"]
};

// 영화 장르별 재미있는 사실
const genreFunFacts = {
  "survivor": {
    emoji: "🧟‍♂️🔪",
    strengths: ["위기 상황에서의 빠른 판단력", "문제 해결 능력", "생존 본능"],
    weaknesses: ["과도한 경계심", "낮은 신뢰도", "긴장과 스트레스 많음"],
    compatibility: "healing - 균형을 찾을 수 있음",
    funnyQuote: "친구들이 공포영화에서 '거기 들어가지 마!'라고 외칠 때, 당신은 이미 탈출 계획 3개를 세운 사람"
  },
  "romantic": {
    emoji: "💘💕",
    strengths: ["공감 능력", "감정 표현력", "관계 형성 능력"],
    weaknesses: ["현실과 이상 구분 약함", "감정에 휘둘림", "거절에 약함"],
    compatibility: "realist - 현실과 낭만의 균형",
    funnyQuote: "비 오는 날 우산 없이 걷는 것도 '영화 같은 장면'이라고 생각하는 낭만파"
  },
  "sitcom": {
    emoji: "😂🎭",
    strengths: ["유머 감각", "스트레스 대처 능력", "사회성"],
    weaknesses: ["진지함 부족", "책임감 부족할 수 있음", "감정 회피"],
    compatibility: "noir - 균형 있는 시각 형성 가능",
    funnyQuote: "친구들이 내 인생을 시트콤으로 만들면 시즌 10까지 가능할 듯"
  },
  "noir": {
    emoji: "🕶️🌃",
    strengths: ["분석력", "관찰력", "독립성"],
    weaknesses: ["과도한 의심", "외로움", "냉소적 태도"],
    compatibility: "sitcom - 삶의 밝은 면 발견 가능",
    funnyQuote: "비 오는 창가에서 재즈 들으며 인생을 되돌아보는 것이 취미인 사람"
  },
  "fantasy": {
    emoji: "🧙‍♂️✨",
    strengths: ["창의력", "상상력", "낙관주의"],
    weaknesses: ["현실 도피", "비현실적 기대", "계획성 부족"],
    compatibility: "realist - 꿈과 현실의 조화",
    funnyQuote: "일상에서 마법이 일어나길 기다리며 지하철 9와 3/4 승강장을 찾아본 경험 있음"
  },
  "thriller": {
    emoji: "🔍😱",
    strengths: ["직관력", "위험 감지 능력", "집중력"],
    weaknesses: ["불안감", "과도한 의심", "피로감"],
    compatibility: "healing - 마음의 안정 찾기",
    funnyQuote: "작은 소리에도 '누가 나를 감시하나'라는 생각으로 뒤돌아보는 사람"
  },
  "realist": {
    emoji: "📽️🔍",
    strengths: ["논리력", "객관성", "실용성"],
    weaknesses: ["감정 표현 부족", "낭만 결여", "융통성 부족"],
    compatibility: "fantasy - 상상력과 현실의 조화",
    funnyQuote: "로맨스 영화 보다가 '집값이 얼마길래 저런 집에 살지?'라고 생각하는 사람"
  },
  "healing": {
    emoji: "🌿☕",
    strengths: ["공감 능력", "평화 추구", "내적 안정"],
    weaknesses: ["현실 도피", "소극적 태도", "지나친 이상주의"],
    compatibility: "survivor - 균형 잡힌 관점 형성",
    funnyQuote: "비 오는 날 창가에서 책 읽는 것이 인생의 최대 행복인 사람"
  }
};

export default function LifeGenreTest() {
  // 상태 관리
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const router = useRouter();

  // 장르 점수를 계산하기 위한 객체
  const [traitScores, setTraitScores] = useState({
    survivor: 0,
    romantic: 0,
    sitcom: 0,
    noir: 0,
    fantasy: 0,
    thriller: 0,
    realist: 0,
    healing: 0
  });

  // 컨페티 효과 함수
  const triggerConfetti = () => {
    if (typeof window !== 'undefined') {
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                       '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  };

  // 결과 화면에서 애니메이션 효과 트리거
  useEffect(() => {
    if (step === 'result' && showConfetti) {
      triggerConfetti();
    }
  }, [step, showConfetti]);

  // 결과 계산 함수
  const calculateResult = () => {
    // 가장 높은 점수의 trait을 찾음
    const maxTrait = Object.entries(traitScores).reduce((max, [trait, score]) => {
      return score > max.score ? { trait, score } : max;
    }, { trait: "", score: -1 });

    // 결과 설정
    const resultData = testData.results.find(r => r.id === maxTrait.trait);
    
    // 결과 화면으로 전환 시 컨페티 효과 트리거
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 500);
    
    return resultData;
  };

  // 선택 효과를 위한 함수
  const handleOptionSelect = (optionId: number, traits: string[]) => {
    setSelectedOption(optionId);
    setIsTransitioning(true);
    
    // trait 점수 업데이트
    const newTraitScores = { ...traitScores };
    traits.forEach(trait => {
      newTraitScores[trait as keyof typeof traitScores] += 1;
    });
    setTraitScores(newTraitScores);
    
    // 잠시 후 다음 질문으로 이동
    setTimeout(() => {
      const newAnswers = [...answers, traits[0]];
      setAnswers(newAnswers);
      
      if (currentQuestion + 1 >= testData.questions.length) {
        // 테스트 완료 - 결과 계산
        const resultData = calculateResult();
        setResult(resultData);
        setStep('result');
      } else {
        // 다음 질문으로
        setCurrentQuestion(currentQuestion + 1);
      }
      
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 600);
  };

  // 공유 기능
  const shareResult = () => {
    if (result) {
      // 공유 메시지 생성
      const shareMessage = `나의 인생 장르는 '${result.title}' 입니다! 당신의 인생 장르는 뭘까요? 테스트 해보세요!`;
      
      // 클립보드에 복사
      navigator.clipboard.writeText(shareMessage)
        .then(() => {
          setShowShare(true);
          setTimeout(() => setShowShare(false), 2000);
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
    }
  };

  // 테스트 재시작
  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setTraitScores({
      survivor: 0,
      romantic: 0,
      sitcom: 0,
      noir: 0,
      fantasy: 0,
      thriller: 0,
      realist: 0,
      healing: 0
    });
    setStep('intro');
  };

  // 결과에 해당하는 아이콘과 색상 가져오기
  const getResultInfo = (resultId: string) => {
    return resultIcons.find(item => item.id === resultId) || resultIcons[0];
  };

  // 언어 변경 함수
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <div className="max-w-[500px] mx-auto bg-white min-h-screen relative">
        {/* 헤더 */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => step === 'intro' ? router.push('/tests') : setStep('intro')}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {step === 'intro' ? <ArrowLeft className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </button>
            <h1 className="text-lg font-bold text-center text-gray-900">내 인생 장르는 뭘까?</h1>
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
            </button>
          </div>
          
          {/* 진행 상태바 (인트로/결과 화면에서는 숨김) - 보라색과 흰색으로 변경 */}
          {step === 'test' && (
            <div className="px-4 pb-2">
              <div className="h-2 bg-gray-100 rounded overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-300 rounded"
                  style={{ width: `${(currentQuestion / testData.questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-500">
                {currentQuestion + 1} / {testData.questions.length}
              </p>
            </div>
          )}
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            {/* 인트로 화면 */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center"
              >
                <motion.div 
                  variants={popInVariants} 
                  className="w-full max-w-xs mx-auto my-8"
                >
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Film className="h-24 w-24 text-white" />
                  </div>
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-2xl font-bold text-center text-gray-900 mb-3"
                >
                  {testData.title}
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-center text-gray-600 mb-6"
                >
                  {testData.description}
                </motion.p>
                
                <motion.div variants={itemVariants} className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">🎬 이런 것을 알 수 있어요</h3>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      당신의 성격과 가장 잘 맞는 영화 장르
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      인생을 영화로 표현한다면 어떤 스타일일지
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      당신에게 딱 맞는 영화 추천까지!
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants} className="w-full mb-4">
                  <Button 
                    onClick={() => setStep('test')} 
                    className="w-full py-6 font-bold text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
                  >
                    테스트 시작하기
                  </Button>
                </motion.div>
                
                <motion.p variants={itemVariants} className="text-xs text-center text-gray-500 mt-4">
                  약 3분 소요 • {Math.floor(5000 + Math.random() * 5000)}명 참여
                </motion.p>
              </motion.div>
            )}

            {/* 테스트 화면 - 배경 이미지 제거하고 심플하게 수정 */}
            {step === 'test' && (
              <motion.div
                key="test"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Q{currentQuestion + 1}. {testData.questions[currentQuestion].text}
                  </h2>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="space-y-3"
                >
                  {testData.questions[currentQuestion].choices.map((choice) => (
                    <motion.button
                      key={choice.id}
                      onClick={() => handleOptionSelect(choice.id, choice.traits)}
                      className={cn(
                        "w-full text-left p-4 border rounded-lg transition-all duration-300 bg-white text-gray-800",
                        selectedOption === choice.id
                          ? "bg-purple-100 border-purple-500 text-purple-700"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      )}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={isTransitioning}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-6 h-6 rounded-full mr-3 flex items-center justify-center border transition-all",
                          selectedOption === choice.id
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-gray-300 bg-white"
                        )}>
                          {selectedOption === choice.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <span className="text-base font-medium">{choice.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* 결과 화면 */}
            {step === 'result' && result && (
              <motion.div
                key="result"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                {/* 결과 헤더 - 높이와 가독성 향상 */}
                <motion.div 
                  variants={popInVariants}
                  className="w-full bg-gradient-to-br relative rounded-xl overflow-hidden p-8 mb-8 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, var(--${result.id}-light) 0%, var(--${result.id}-dark) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br" style={{
                    background: `linear-gradient(135deg, ${getResultInfo(result.id).color.split(' ')[0].replace('from-', '')} 0%, ${getResultInfo(result.id).color.split(' ')[1].replace('to-', '')} 100%)`,
                    opacity: 0.9
                  }}></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-white p-2 flex items-center justify-center mb-6 shadow-lg"
                    >
                      {getResultInfo(result.id).icon}
                    </motion.div>
                    
                    <h2 className="text-white text-3xl font-bold text-center mb-3">
                      {result.title}
                    </h2>
                    
                    <p className="text-white text-center text-lg mb-5 max-w-xs">
                      {result.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {result.tags.map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* 결과 이미지 추가 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white rounded-lg p-5 mb-6 shadow-md"
                >
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">🎬 당신의 인생 장르</h3>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <motion.img 
                      src={result.imageUrl} 
                      alt={result.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-white font-bold text-lg drop-shadow-md">{result.title}</div>
                      <div className="text-white/90 text-sm drop-shadow-md mt-1">{result.description}</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 추천 영화 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-5 mb-6"
                >
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">🎞️ 당신에게 추천하는 영화/드라마</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {genreMovies[result.id as keyof typeof genreMovies].map((movie, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors hover:shadow-sm"
                      >
                        <p className="font-medium text-gray-800">{movie}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* 장르 특성 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-50 rounded-lg p-5 mb-6"
                >
                  <h3 className="font-medium text-gray-800 mb-4 text-lg flex items-center">
                    <span className="mr-2">{genreFunFacts[result.id as keyof typeof genreFunFacts].emoji}</span> 
                    장르 특성
                  </h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">강점</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      {genreFunFacts[result.id as keyof typeof genreFunFacts].strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">약점</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      {genreFunFacts[result.id as keyof typeof genreFunFacts].weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg text-sm text-gray-700">
                    <span className="font-medium">짝궁 장르: </span>
                    {genreFunFacts[result.id as keyof typeof genreFunFacts].compatibility}
                  </div>
                </motion.div>
                
                {/* 재미있는 사실 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white border border-gray-200 rounded-lg p-5 mb-6"
                >
                  <div className="bg-indigo-50 rounded-lg p-4 text-gray-700">
                    <p className="italic text-sm">
                      "{genreFunFacts[result.id as keyof typeof genreFunFacts].funnyQuote}"
                    </p>
                  </div>
                </motion.div>
                
                {/* 공유 및 재시작 버튼 */}
                <motion.div variants={itemVariants} className="flex flex-col space-y-4">
                  <Button
                    onClick={shareResult}
                    className="w-full py-5 font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Share2 className="h-5 w-5" />
                    결과 공유하기
                  </Button>
                  
                  <Button
                    onClick={restartTest}
                    variant="outline"
                    className="w-full py-5 font-medium bg-white text-purple-700 border-purple-300 flex items-center justify-center gap-2 hover:bg-purple-50"
                  >
                    <RefreshCcw className="h-5 w-5" />
                    테스트 다시하기
                  </Button>
                </motion.div>
                
                {/* 공유 성공 토스트 메시지 */}
                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-10 left-0 right-0 mx-auto w-[80%] bg-gray-800 text-white p-3 rounded-lg text-center z-50"
                  >
                    결과가 클립보드에 복사되었습니다! 🎉
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* 페이지 스타일 */}
      <style jsx global>{`
        :root {
          --survivor-light: #ff7e5f;
          --survivor-dark: #feb47b;
          --romantic-light: #ff9a9e;
          --romantic-dark: #fad0c4;
          --sitcom-light: #fad961;
          --sitcom-dark: #f76b1c;
          --noir-light: #4b6cb7;
          --noir-dark: #182848;
          --fantasy-light: #c471ed;
          --fantasy-dark: #7c3aed;
          --thriller-light: #8a2387;
          --thriller-dark: #5d26c1;
          --realist-light: #36d1dc;
          --realist-dark: #5b86e5;
          --healing-light: #43c6ac;
          --healing-dark: #00c996;
        }
      `}</style>
    </div>
  );
} 