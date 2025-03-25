"use client";

import React from 'react';
import { TestSection } from '@/components/home/test-section';
import { CategorySection } from '@/components/home/category-section';
import { FeaturedColorBlindness } from '@/components/home/featured-color-blindness';
import { FeaturedPersonalColor } from '@/components/home/featured-personal-color';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star } from 'lucide-react';

// 인기 테스트 데이터
const popularTests = [
  {
    id: 'personal-color',
    title: '퍼스널컬러 테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
    participants: 178945,
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
    id: 't-power',
    title: '나의 T발력 수치는?',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEh7QIFua8BsWGH6TugirBk5mPH9dFJ8mc8zLwGze9A8rhHhmYziqZU_vcsyZLLbcslbqNX4UlEHHn8x3GqIMFe-T9pO49Kza39vD3agjqMBlz8N8xrG6Mj_jbUjPPWcnGSVv-Fx2XfWvdjFvziNerHndLx0Pcs8OiC-uxj9QMAAG-cxXK7QjMDB2wsxi0k',
    participants: 132589,
    isPopular: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담 상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEj_hF5utgruPeM3jXtQ_g4rT3adEXQLLP89T8NuV7OSZdpONbuMmfrcr_1RKEgKThk3E5R2QoVl8M3crn9k-IER-AKntLOG3Yiz-UdsKzHmOX89HY0h589ifmbTAs36uR4KGSRWAAXbzeSdwdJpOji0bYiBwEU5g0oCb_676HFug_rn3_6v7RlwmE3uIUM',
    participants: 119872,
    isPopular: true,
  },
  {
    id: 'fortune-telling',
    title: '사주팔자 점보기',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhYgICMS6gufZPjde9juTx81iKJbsqbm-AwwlzY4DhUwnwxoXlVzGlbv7Y2OaJ2GBFlPyc5KomVGPhI4r21g_7UjObO4sGdRgFTNVzmxvy-cX5SMuRZVPkOGCjMQMy3-waf7KhVjJyBzyqHQstrPmxAp3MbXXx05krKP9ZGBm8LFe4JqWB-AZW-sP4OJo8',
    participants: 107456,
    isPopular: true,
  },
  {
    id: 'color-blindness',
    title: '색맹테스트',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
    participants: 97842,
    isPopular: true,
  },
  {
    id: 'mbti-deep',
    title: 'MBTI 심층 분석',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    participants: 85689,
    isPopular: true,
  },
  {
    id: 'attachment-style',
    title: '애착 유형 테스트',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    participants: 98452,
    isPopular: true,
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
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEh7QIFua8BsWGH6TugirBk5mPH9dFJ8mc8zLwGze9A8rhHhmYziqZU_vcsyZLLbcslbqNX4UlEHHn8x3GqIMFe-T9pO49Kza39vD3agjqMBlz8N8xrG6Mj_jbUjPPWcnGSVv-Fx2XfWvdjFvziNerHndLx0Pcs8OiC-uxj9QMAAG-cxXK7QjMDB2wsxi0k',
    participants: 22589,
    isNew: true,
  },
  {
    id: 'tarot-consultation',
    title: '타로상담 상담가',
    imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEj_hF5utgruPeM3jXtQ_g4rT3adEXQLLP89T8NuV7OSZdpONbuMmfrcr_1RKEgKThk3E5R2QoVl8M3crn9k-IER-AKntLOG3Yiz-UdsKzHmOX89HY0h589ifmbTAs36uR4KGSRWAAXbzeSdwdJpOji0bYiBwEU5g0oCb_676HFug_rn3_6v7RlwmE3uIUM',
    participants: 19872,
    isNew: true,
  },
  {
    id: 'fortune-telling',
    title: '사주팔자 점보기',
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

// 트렌딩/새로운 테스트 카드 컴포넌트
const TrendingNewTestCard = ({ test }: { test: any }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={`/tests/${test.id}`} className="block">
      <div className="flex items-center p-3">
        <div className="w-20 h-20 flex-shrink-0 mr-4 relative rounded-md overflow-hidden">
          <img 
            src={test.imageUrl} 
            alt={test.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-bold text-base text-gray-800 leading-tight line-clamp-2">{test.title}</h3>
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              {test.isNew && (
                <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full leading-none flex items-center justify-center h-5">
                  NEW
                </span>
              )}
              {test.isPopular && (
                <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full leading-none flex items-center justify-center h-5">
                  <Star className="w-3 h-3 mr-0.5" fill="white" stroke="none" />
                  인기
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2분
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

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
          <div className="absolute top-2 right-2 flex gap-1">
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
        <div className="p-4 group-hover:bg-purple-50 transition-colors duration-300">
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

// 회전 히어로 카드 컴포넌트
const RotatingHeroCards = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const heroCards = [
    {
      id: 'personal-color',
      title: '퍼스널컬러 테스트',
      description: '당신에게 어울리는 컬러를 찾아보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0',
      color: 'from-pink-500/30 via-pink-500/20 to-black/70'
    },
    {
      id: 'color-blindness',
      title: '색맹 테스트',
      description: '당신의 색각 능력을 테스트해보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhbZPeJZcuqhy8KNugCWNoi105MZOwUaWEoo5w2hiYj57QuYHhHaZ3jhquUQIrtj3hwXri3U4TefQdiFu07hT5ksrtwrAjmSKatGhWCpb1t-W5o_6ogCOOGfatfnYnYlZQg8p_s1QMoF0QSjjA0MNQtoDQ7nD0WH2zMQlYpkLu8tP62qpwQjcLx-ujH-Mg',
      color: 'from-blue-500/30 via-blue-500/20 to-black/70'
    },
    {
      id: 'marriage-type',
      title: '결혼 이상형 테스트',
      description: '당신의 결혼 이상형을 찾아보세요',
      imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEhoFMZ4NDds4QlotYXL6hLGY4LnRTtVJMGYvTboKMfBGfV5ztssGPqSoTLjRk-KJUUvu7ZK0I8pE7UhcXxqbJTJ0Tfb31EMatXaWJPV-9aEa13MyZ1l4sUDHucVECx0JHi_2JfKUfMqvUwEMQZish5xBUunUU6sn3wqnCgBGlqaXtfWZ8sfQHiqJ8d2sdY',
      color: 'from-purple-500/30 via-purple-500/20 to-black/70'
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroCards.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroCards.length]);

  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-xl shadow-xl">
      {heroCards.map((card, index) => {
        const isActive = index === currentIndex;
        const isPrev = (index === currentIndex - 1) || (currentIndex === 0 && index === heroCards.length - 1);
        const isNext = (index === currentIndex + 1) || (currentIndex === heroCards.length - 1 && index === 0);
        
        return (
          <motion.div
            key={card.id}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{
              x: isActive ? 0 : isPrev ? '-100%' : isNext ? '100%' : (index < currentIndex ? '-100%' : '100%'),
              opacity: isActive ? 1 : 0.5,
              scale: isActive ? 1 : 0.9,
              zIndex: isActive ? 10 : 0
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
          >
            <Link href={`/tests/${card.id}`}>
              <div className="relative w-full h-full cursor-pointer">
                <div className="absolute inset-0">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h2 className="text-white font-extrabold text-2xl drop-shadow-lg">{card.title}</h2>
                  <p className="text-white/90 text-sm mt-1 drop-shadow-md">{card.description}</p>
                  
                  <div className="mt-3">
                    <motion.span 
                      className="inline-block bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 shadow-lg"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(255, 255, 255, 0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      테스트 시작하기
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
      
      {/* 페이지네이션 인디케이터 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`카드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

// 추천 테스트 카드 컴포넌트
const RecommendedTestCard = () => (
  <motion.div 
    className="w-full overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <Link href="/tests/personal-color" className="block">
      <div className="relative">
        <div className="aspect-[16/9] relative overflow-hidden">
          <motion.img 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEib9elWcJ4_sC5ENKPjDkjscxFX2YrL7m9PMSoUEgEYzNsoZUz6s22_LoxNAHVZvY_5xMtMf4enhMT9y5BC7mwBhzm-ZUykWVjP47kHBrxUFP1j2P1Sw0X50YvL0TyvteDFLzCJ-IH1H3kmJ2sEiR2SDNkZ3TjS9SH_0dg-7X2_c7-uAT6DoXnyQJJDHC0" 
            alt="퍼스널컬러 테스트" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-purple-900/60"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="flex justify-between items-end">
            <div>
              <span className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md mb-2 shadow-lg">
                BEST 인기 테스트
              </span>
              <h3 className="text-xl font-bold drop-shadow-md">나의 퍼스널 컬러는?</h3>
              <p className="text-sm text-white/90 mt-1 drop-shadow-sm">
                내게 어울리는 컬러 팔레트를 찾아보세요
              </p>
            </div>
            <motion.div 
              className="bg-white text-purple-600 font-bold rounded-full px-3 py-1 text-sm shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#f0f0ff" }}
              whileTap={{ scale: 0.95 }}
            >
              테스트 시작
            </motion.div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-50 to-white">
        <div className="flex items-center text-gray-600 justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">2분</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">17.8만명</span>
            </div>
          </div>
          <div className="text-xs bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full font-bold flex items-center">
            <Star className="w-3 h-3 mr-0.5" fill="currentColor" />
            97% 만족도
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// MBTI 유형 카드 컴포넌트
const MBTITypeCard = () => {
  const mbtiTypes = [
    { type: 'INTJ', color: 'bg-indigo-500', name: '용의주도한 전략가' },
    { type: 'INFJ', color: 'bg-teal-500', name: '선의의 옹호자' },
    { type: 'ISTJ', color: 'bg-blue-500', name: '청렴결백한 논리주의자' },
    { type: 'ISTP', color: 'bg-cyan-500', name: '만능 재주꾼' },
    { type: 'ENFP', color: 'bg-orange-500', name: '재기발랄한 활동가' },
    { type: 'ENTP', color: 'bg-amber-500', name: '논쟁을 즐기는 변론가' },
    { type: 'ENFJ', color: 'bg-pink-500', name: '정의로운 사회운동가' },
    { type: 'ENTJ', color: 'bg-purple-500', name: '대담한 통솔자' },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-800">MBTI 심층 테스트</h3>
          <Link href="/tests/mbti-deep" className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center">
            전체보기
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {mbtiTypes.map((mbti) => (
            <Link href={`/tests/mbti-deep?type=${mbti.type}`} key={mbti.type}>
              <motion.div 
                className={`${mbti.color} rounded-lg p-2 text-center text-white shadow-sm cursor-pointer`}
                whileHover={{ y: -3, scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-bold">{mbti.type}</div>
                <div className="text-xs mt-1 font-medium opacity-90 line-clamp-1">{mbti.name}</div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 bg-white p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-gray-800">당신의 MBTI 유형을 정확히 알아보세요</div>
              <div className="text-xs text-gray-500 mt-1">전문적인 심리테스트로 성격 유형 분석</div>
            </div>
            <motion.button
              className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium"
              whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
              whileTap={{ scale: 0.95 }}
            >
              테스트 시작
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('popular');
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[520px] mx-auto px-4">
        {/* 회전 히어로 섹션 */}
        <div className="pt-4">
          <RotatingHeroCards />
        </div>
        
        <motion.div 
          className="space-y-12 my-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 추천 테스트 - 퍼스널 컬러 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">✨</span>
                  추천 테스트
                </h2>
                <p className="text-sm text-gray-600 mt-1">당신에게 어울리는 컬러를 찾아보세요!</p>
              </div>
            </div>
            <RecommendedTestCard />
          </motion.div>

          {/* 인기 & 신규 테스트 통합 섹션 */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">테스트 컬렉션</h2>
              <Link 
                href="/tests" 
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
              >
                전체보기
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 탭 버튼 */}
            <div className="flex space-x-2 mb-6">
              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'popular' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-200'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('popular')}
              >
                인기 테스트
              </motion.button>
              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'new' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-200'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('new')}
              >
                새로운 테스트
              </motion.button>
            </div>

            {/* 유튜브 스타일 테스트 그리드 */}
            <div className="space-y-4">
              {(activeTab === 'popular' ? popularTests : newTests).slice(0, 6).map((test) => (
                <YoutubeStyleCard key={test.id} test={test} />
              ))}
            </div>
          </motion.div>

          {/* MBTI 테스트 섹션 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">🧠</span>
                  MBTI 테스트
                </h2>
                <p className="text-sm text-gray-600 mt-1">당신의 성격 유형을 알아보세요</p>
              </div>
            </div>
            <MBTITypeCard />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
