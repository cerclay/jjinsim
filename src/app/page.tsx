"use client";

import React from 'react';
import { TestSection } from '@/components/home/test-section';
import { CategorySection } from '@/components/home/category-section';
import { FeaturedColorBlindness } from '@/components/home/featured-color-blindness';
import { FeaturedPersonalColor } from '@/components/home/featured-personal-color';
import { HeroSection } from '@/components/home/hero-section';
import Link from 'next/link';
import { Star, ChevronRight, ArrowRight, Youtube } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TestCard } from '@/components/home/test-card';
import { DementiaTestCard } from "@/features/dementia-test/components/DementiaTestCard";
import { Button } from "@/components/ui/button";

// 인기 테스트 데이터
const popularTests = [
  {
    id: 'iq-test',
    title: '나의 진짜 IQ는? 유머버전!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 93521,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
    participants: 97842,
    isPopular: true,
  },
  {
    id: 'pet-match',
    title: '나랑 찰떡인 반려동물은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEg0j8Ns1GMihqct6xNAHgzooZ7aWqWnTPGUL0ZyHCeN8Hl3zRO2eLM3XrD0HZFeRnVG4HF1t7hB6zdqS_3Q_FGJw3zfXgfuIdZnlt1CSwicip9l-OfypNyR-l0_-GvFhCIFpi6vCqm4cBFrpUqhsUaOIbTI9RGCNG756ig-Dg2IqGfN2Tz6bxfUtfWjn9s',
    participants: 78456,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'memory-test',
    title: '기억력 지수 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgIHM2zFl3lLs-BmIXmAVVjDhSuC6nEFWe3sLwWcaqJ_cncNc6mcU-C9Cfx1a6i0QynhivQrId5Gp4Q-bMiO_mVZ6ZURPsjYqk0wItse9EjvH5UPCe0ATr9NsQinLSCRqo5FqpqHEEwdoxj_4pRU9IZjm18JjgkVqwIr4z9Xtk5jQLTemvXukF-xgKYAJw',
    participants: 87500,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
    participants: 65436,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'travel-match',
    title: '나랑 잘 맞는 여행지는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhe1IJZbi1eDWkyySuXPE5BVSa844H6IDBOn8uTdHQA5oaktH1WRxcd5BZE7EoPsvKbLYJHOIqQbjvEhVWjY4BUObiEwozxFgj7ocnDrWRc7NDP8zpebJAJ8bE7vahDnYD9X45kW78WqK5VIfIttMhj1wYliJWm3_ZC-3UO6nwiK7cPx_jycBhBCqoyYd4',
    participants: 25432,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'personal-color',
    title: '퍼스널컬러 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
    participants: 178945,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'polsok-character',
    title: '내가 폭싹 속았수다 케릭터라면?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT73s19GNbOYJlSm_Kj3d06jvPIiNFMgL0qswmuXRH4DAbx-ZTJYa4dMfColxZuajof_pKKUMhfxgL15bknTXbjyi-LAx_Y4gwrO7R0-asgLdpdycOzjcGg-Sc4Pa_k7ozVgZxUNxEgV10rRhf0lcA_oPrwUzk4ypvv4dy3Be5OSpQUMYpGkjlM14iRjw/s320/MBTI%20(1).jpg',
    participants: 71043,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'attachment-style',
    title: '나의 애착 유형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhSeBAqi0jvBtxRfKdRluimJJDwueigV1ENX5edBTxkWYhxLqjQuAzFj9vzsZxWUkuRI8ydD7EW_wwmudAYU3blDm87VmF0_5-QU7bwagpMxyz9uzJv1n4OcUM2Fv74AaxFWEViUpPGm09eyckvZhBYVxeJvSe_nmbiy-6ILyyTWyXvLPhJ_0D0vn8_MfQ',
    participants: 98452,
    isPopular: true,
  },
  {
    id: 't-power',
    title: '나의 T발력 수치는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
    participants: 132589,
    isPopular: true,
  },
  {
    id: 'past-life-character',
    title: '나의 전생 케릭터는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisr4Au3C02KUYl7WSPC1BB2E__wgmGtxPmYA8B24-JmVWww39tGGY9sJ9H34T8FIDPm3f9rdUSXW4P7BynJusxZMx_DwrBqEzUjcJM_q8JWHkEZrYm2iuMY8Dv7vYuiwtEQH9OI_HzKKQNyijQimxdmQLZ234wPPb_eMuh6cep0uFp4sjgNQfNM7EiJRU/s320/Adobe%20Express%20-%20file.png',
    participants: 154321,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'marriage-type',
    title: '나의 결혼 이상형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
    participants: 145632,
    isPopular: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 119872,
    isPopular: true,
  },
  {
    id: 'fortune-telling',
    title: '운세 상담',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8',
    participants: 107456,
    isPopular: true,
  },
  {
    id: 'mbti',
    title: 'MBTI 빠르고 정확하게!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgTe9x3WFzi7SUAvTqEvnThlLpoEqxtEV9l7IxRByB6KacW6PnSNu8YdDmXloWzuME_v7G8cPpe1ftCjfLU9qoXj_4k87eNgna8u8NEPTVvhDU-aHheaQbQgcqTeEilvFLGor-oQ8FWro_3pbb96PIvQJE6Orc7HsrxFr0h3eg824EhoPLibzDsDkyfPOE',
    participants: 23456,
    likes: 1247,
    isNew: false,
    isPopular: true
  },
  {
    id: 'color-personality',
    title: '컬러 성격 테스트',
    imageUrl: 'https://picsum.photos/id/1032/400/400',
    participants: 87562,
    isPopular: true,
  },
  {
    id: 'career-path',
    title: '직업 적성 테스트',
    imageUrl: 'https://picsum.photos/id/1070/400/400',
    participants: 76234,
    isPopular: true,
  },
  {
    id: 'personality-traits',
    title: '성격 특성 분석',
    imageUrl: 'https://picsum.photos/id/1040/400/400',
    participants: 63421,
    isPopular: true,
  },
  {
    id: 'communication-style',
    title: '소통 방식 테스트',
    imageUrl: 'https://picsum.photos/id/1068/400/400',
    participants: 58321,
    isPopular: true,
  }
];

// 신규 테스트 데이터
const newTests = [
  {
    id: 'boomer-test',
    title: '나의 꼰대력은?!',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfl5eqh5bGdKTYkWyK02Pd4nfeBnOaRGmKtdu-gNVVxmUbNa9RHOd1J4nPPBEhj-agPWoeFWNb02RKdUmz9Fb6miGtzq9tEQO4tKawQLyyr7JGMOS5c_SzUZC6JecRRfYosDV18Fll38q0jCtjq6AObiUI5cReNXaLYU4uFia4k-gAZ8C5vpT6FRtuBq4/s320/ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%207%EC%9D%BC%20%EC%98%A4%ED%9B%84%2003_14_18.png',
    participants: 7845,
    isNew: true,
    description: '12문항으로 확인하는 내 속에 잠재된 꼰대 기질! 재미로만 참고하세요.'
  },
  {
    id: 'travel-match',
    title: '나랑 잘 맞는 여행지는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhe1IJZbi1eDWkyySuXPE5BVSa844H6IDBOn8uTdHQA5oaktH1WRxcd5BZE7EoPsvKbLYJHOIqQbjvEhVWjY4BUObiEwozxFgj7ocnDrWRc7NDP8zpebJAJ8bE7vahDnYD9X45kW78WqK5VIfIttMhj1wYliJWm3_ZC-3UO6nwiK7cPx_jycBhBCqoyYd4',
    participants: 5432,
    isNew: true,
    description: '12개의 질문으로 알아보는 당신의 여행 궁합! 지금 바로 확인해보세요!'
  },
  {
    id: 'iq-test',
    title: '나의 진짜 IQ는? 유머버전!',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
    participants: 3521,
    isNew: true,
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!'
  },
  {
    id: 'polsok-character',
    title: '내가 폭싹 속았수다 케릭터라면?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT73s19GNbOYJlSm_Kj3d06jvPIiNFMgL0qswmuXRH4DAbx-ZTJYa4dMfColxZuajof_pKKUMhfxgL15bknTXbjyi-LAx_Y4gwrO7R0-asgLdpdycOzjcGg-Sc4Pa_k7ozVgZxUNxEgV10rRhf0lcA_oPrwUzk4ypvv4dy3Be5OSpQUMYpGkjlM14iRjw/s320/MBTI%20(1).jpg',
    participants: 1043,
    isNew: true,
    description: '당신은 폭싹 속았수다에 등장했다면 어떤 캐릭터일까요? 12개의 질문으로 알아보는 나만의 폭싹 캐릭터 테스트!'
  },
  {
    id: 'life-genre',
    title: '내 인생 장르는 뭘까?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8espUA4MrjiXU6KBHlF4mD6ejAM4T4gPK7_aNIHqe8biWYKAMhreLYSYdPgRhubf0Io486DjiSqZAxZ6j4G7fcX0aXnUjU2Y_sIzV_peGUszaTX-EdZ_eEcT7av9cyqVt_ki8cEa6Y_h6km9NtQKtgzIkIJQYqxX0fACetB9gGnoOk_peOYC7JscbH5A/s320/ChatGPT%20Image%202025%EB%85%84%203%EC%9B%94%2026%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_28_36.png',
    participants: 5436,
    isNew: true,
    isPopular: false,
    description: '12문제로 알아보는 당신의 인생 영화 장르. 당신의 삶은 코미디? 스릴러? 좀비물?!'
  },
  {
    id: 'dog-compatibility',
    title: '나랑 잘 맞는 강아지는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhsht18O01e59gK9-0VT-R8DrBYYeIhmX8WAHsAZT1WlceTLF6nqWo6bzGMx3vtC9QZP0hOQ2jXmeSIM7FIZ44Fm1xxZXZFLV2S1UjWcm_ltxFH7SVqBDqv6w7Zck_5-xCg8jGU0GcyEhgJ9WWryfvypKQnnIj659iOtRIUvcYSRkWTEvWGHlX77FVjmLc',
    participants: 12456,
    isNew: true,
    description: '당신의 성격과 생활 패턴에 맞는 최고의 반려견을 찾아보세요!'
  },
  {
    id: 'personal-color',
    title: '퍼스널컬러 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
    participants: 28945,
    isNew: true,
  },
  {
    id: 'marriage-type',
    title: '나의 결혼 이상형은?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
    participants: 25632,
    isNew: true,
  },
  {
    id: 't-power',
    title: '나의 T발력 수치는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioHGHTA0AoTM6sqxO3tC36NBmwC3t3a8W5vBIQ0w89EZtHigOlVhczMVKcJwXVBz7goXdoiP2nCmxN9F9dA-25EZDXgTpm6iaABCxOjPFXliwPA1z7ygMC_eHNTR3k8De0QkQZNa7dbuAIvvLOMddKSs6QJUfHWswBc0hDsNbWUft-gnICshMwmvLDSvo/s320/MBTI.jpg',
    participants: 22589,
    isNew: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3dtfDOlVVV30R395Ai_CnkjxBG7iRWfZla8NZZao6YfhPeArjHout5LLw8NCaZIwZNfxvaDgOJYtyw-AzYhoumEfS1-ByQTJg8YCPZMX9d1GW8Kl13OZBpj-prZKVsGSvbd96INhVQxK42BPEeJKbKiwMsdVvwqBKlZI5es1CB-TBTIArsMqX9Q53l3I/s320/Colorful%20%20Color%20theory%20Vocabulary%20Worksheet%20(YouTube%20%EC%8D%B8%EB%84%A4%EC%9D%BC).jpg',
    participants: 19872,
    isNew: true,
  },
  {
    id: 'fortune-telling',
    title: '운세 상담',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8',
    participants: 17456,
    isNew: true,
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
    participants: 15842,
    isNew: true,
  },
  {
    id: 'communication-style',
    title: '대화 스타일 테스트',
    imageUrl: 'https://picsum.photos/id/1068/400/400',
    participants: 8756,
    isNew: true,
  },
  {
    id: 'stress-level',
    title: '스트레스 지수 체크',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    participants: 7843,
    isNew: true,
  },
  {
    id: 'love-language',
    title: '사랑의 언어 테스트',
    imageUrl: 'https://picsum.photos/id/1066/400/400',
    participants: 9245,
    isNew: true,
  },
  {
    id: 'creativity-type',
    title: '창의성 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1050/400/400',
    participants: 6437,
    isNew: true,
  },
  {
    id: 'emotional-iq',
    title: '감성 지능 테스트',
    imageUrl: 'https://picsum.photos/id/22/400/400',
    participants: 5234,
    isNew: true,
  },
  {
    id: 'leadership-style',
    title: '리더십 유형 분석',
    imageUrl: 'https://picsum.photos/id/1059/400/400',
    participants: 4872,
    isNew: true,
  }
];

// MBTI 유형 데이터
const mbtiTypes = [
  { type: 'INTJ', color: 'bg-blue-600', lightColor: 'from-blue-50 to-indigo-100', name: '전략가', category: '분석가' },
  { type: 'INTP', color: 'bg-blue-500', lightColor: 'from-blue-50 to-indigo-100', name: '논리술사', category: '분석가' },
  { type: 'ENTJ', color: 'bg-blue-700', lightColor: 'from-blue-50 to-indigo-100', name: '통솔자', category: '분석가' },
  { type: 'ENTP', color: 'bg-blue-400', lightColor: 'from-blue-50 to-indigo-100', name: '변론가', category: '분석가' },
  { type: 'INFJ', color: 'bg-green-600', lightColor: 'from-green-50 to-emerald-100', name: '옹호자', category: '외교관' },
  { type: 'INFP', color: 'bg-green-500', lightColor: 'from-green-50 to-emerald-100', name: '중재자', category: '외교관' },
  { type: 'ENFJ', color: 'bg-green-700', lightColor: 'from-green-50 to-emerald-100', name: '선도자', category: '외교관' },
  { type: 'ENFP', color: 'bg-green-400', lightColor: 'from-green-50 to-emerald-100', name: '활동가', category: '외교관' },
  { type: 'ISTJ', color: 'bg-purple-600', lightColor: 'from-purple-50 to-violet-100', name: '현실주의자', category: '관리자' },
  { type: 'ISFJ', color: 'bg-purple-500', lightColor: 'from-purple-50 to-violet-100', name: '수호자', category: '관리자' },
  { type: 'ESTJ', color: 'bg-purple-700', lightColor: 'from-purple-50 to-violet-100', name: '경영자', category: '관리자' },
  { type: 'ESFJ', color: 'bg-purple-400', lightColor: 'from-purple-50 to-violet-100', name: '집정관', category: '관리자' },
  { type: 'ISTP', color: 'bg-amber-600', lightColor: 'from-amber-50 to-yellow-100', name: '장인', category: '탐험가' },
  { type: 'ISFP', color: 'bg-amber-500', lightColor: 'from-amber-50 to-yellow-100', name: '예술가', category: '탐험가' },
  { type: 'ESTP', color: 'bg-amber-700', lightColor: 'from-amber-50 to-yellow-100', name: '사업가', category: '탐험가' },
  { type: 'ESFP', color: 'bg-amber-400', lightColor: 'from-amber-50 to-yellow-100', name: '연예인', category: '탐험가' },
];

// MBTI 카테고리별로 그룹화
const mbtiGroups = {
  '분석가': mbtiTypes.filter(mbti => mbti.category === '분석가'),
  '외교관': mbtiTypes.filter(mbti => mbti.category === '외교관'),
  '관리자': mbtiTypes.filter(mbti => mbti.category === '관리자'),
  '탐험가': mbtiTypes.filter(mbti => mbti.category === '탐험가'),
};

// 애니메이션 효과를 위한 변수 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// 유튜브 스타일 썸네일 카드 컴포넌트
const YoutubeStyleCard = ({ test }: { test: any }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full"
    whileHover={{ 
      y: -6, 
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      scale: 1.02
    }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={`/tests/${test.id}`} className="block">
      <div className="flex flex-col">
        <div className="relative w-full group">
          <div className="aspect-video w-full overflow-hidden">
            <motion.img 
              src={test.imageUrl} 
              alt={test.title}
              className="w-full h-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 transition-colors duration-300 rounded-t-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          <div className="absolute top-2 left-2 flex gap-2">
            {test.isNew && (
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-md leading-none flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                NEW
              </span>
            )}
            {test.isPopular && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-md leading-none flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                인기
              </span>
            )}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-white font-medium bg-purple-600 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            지금 테스트 하기
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-base text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">{test.title}</h3>
          <div className="flex items-center mt-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2분
              </span>
              <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {test.participants >= 10000 
                  ? `${(test.participants / 10000).toFixed(1)}만명`
                  : test.participants >= 1000
                  ? `${(test.participants / 1000).toFixed(1)}천명`
                  : `${test.participants}명`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function Home() {
  // 인기 테스트 데이터에 참여자 수 적용 (1500명부터 100명씩 감소)
  const [displayPopularTests] = React.useState(() => 
    popularTests.map((test, index) => ({
      ...test,
      participants: Math.max(1500 - (index * 100), 100) // 최소 100명
    }))
  );

  // 신규 테스트는 원본 데이터 그대로 사용 (이미 정렬되어 있음)
  const [displayNewTests] = React.useState(() => newTests);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[500px] mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        
        {/* 인기 테스트 섹션 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">인기 테스트</h2>
            <Link href="/tests" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {displayPopularTests.slice(0, 10).map((test) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                imageUrl={test.imageUrl}
                participants={test.participants}
                isPopular={test.isPopular}
                isNew={test.isNew}
              />
            ))}
          </div>
        </section>
        
        {/* 신규 테스트 섹션 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">새로운 테스트</h2>
            <Link href="/tests" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {displayNewTests.slice(0, 6).map((test) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                imageUrl={test.imageUrl}
                participants={test.participants}
                isNew={test.isNew}
                isPopular={test.isPopular}
              />
            ))}
          </div>
        </section>
        
        {/* 치매 테스트 섹션 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">치매 테스트</h2>
            <Link href="/dementia-test" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-6">
            <DementiaTestCard />
          </div>
        </section>

        {/* 두뇌 훈련 영상 섹션 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">두뇌 훈련 영상</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {/* 첫 번째 영상 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-[280px] mx-auto">
                <div className="aspect-[9/16] rounded-t-xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/0HhL46yuqdA"
                    title="단기 기억력 테스트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 text-center bg-gradient-to-b from-purple-50 to-white">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">단기 기억력 테스트</h3>
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                  <Youtube className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-medium">YouTube</span>
                </div>
              </div>
            </div>

            {/* 두 번째 영상 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-[280px] mx-auto">
                <div className="aspect-[9/16] rounded-t-xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/myWRuZFZGVk"
                    title="직관력 테스트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 text-center bg-gradient-to-b from-purple-50 to-white">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">직관력 테스트</h3>
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                  <Youtube className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-medium">YouTube</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link 
              href="https://www.youtube.com/@todayohquiz/shorts" 
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-md hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              모든 영상 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

        {/* 푸터 영역 */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <Link href="/admin/login" className="hover:text-gray-700">
            관리자 로그인
          </Link>
          <p>© 2024 진심테스트. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 