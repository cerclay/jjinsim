import { HeroSection } from '@/components/home/hero-section';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { PopularTestsSection } from '@/components/home/popular-tests-section';
import { NewTestsSection } from '@/components/home/new-tests-section';
import { MbtiTestCard } from '@/components/home/mbti-test-card';
import { StressCheckCard } from '@/components/home/stress-check-card';
import { IQTestCard } from '@/components/home/IQTestCard';

// MBTI 유형 데이터
const mbtiTypes = [
  // 분석가 그룹
  { type: 'INTJ', color: 'bg-blue-600', lightColor: 'from-blue-50 to-indigo-100', name: '전략가', category: '분석가' },
  { type: 'INTP', color: 'bg-blue-500', lightColor: 'from-blue-50 to-indigo-100', name: '논리술사', category: '분석가' },
  { type: 'ENTJ', color: 'bg-blue-700', lightColor: 'from-blue-50 to-indigo-100', name: '통솔자', category: '분석가' },
  { type: 'ENTP', color: 'bg-blue-400', lightColor: 'from-blue-50 to-indigo-100', name: '변론가', category: '분석가' },
  
  // 외교관 그룹
  { type: 'INFJ', color: 'bg-green-600', lightColor: 'from-green-50 to-teal-100', name: '옹호자', category: '외교관' },
  { type: 'INFP', color: 'bg-green-500', lightColor: 'from-green-50 to-teal-100', name: '중재자', category: '외교관' },
  { type: 'ENFJ', color: 'bg-green-700', lightColor: 'from-green-50 to-teal-100', name: '선도자', category: '외교관' },
  { type: 'ENFP', color: 'bg-green-400', lightColor: 'from-green-50 to-teal-100', name: '활동가', category: '외교관' },
  
  // 관리자 그룹
  { type: 'ISTJ', color: 'bg-purple-600', lightColor: 'from-purple-50 to-indigo-100', name: '현실주의자', category: '관리자' },
  { type: 'ISFJ', color: 'bg-purple-500', lightColor: 'from-purple-50 to-indigo-100', name: '수호자', category: '관리자' },
  { type: 'ESTJ', color: 'bg-purple-700', lightColor: 'from-purple-50 to-indigo-100', name: '경영자', category: '관리자' },
  { type: 'ESFJ', color: 'bg-purple-400', lightColor: 'from-purple-50 to-indigo-100', name: '집정관', category: '관리자' },
  
  // 탐험가 그룹
  { type: 'ISTP', color: 'bg-amber-600', lightColor: 'from-amber-50 to-yellow-100', name: '장인', category: '탐험가' },
  { type: 'ISFP', color: 'bg-amber-500', lightColor: 'from-amber-50 to-yellow-100', name: '예술가', category: '탐험가' },
  { type: 'ESTP', color: 'bg-amber-700', lightColor: 'from-amber-50 to-yellow-100', name: '사업가', category: '탐험가' },
  { type: 'ESFP', color: 'bg-amber-400', lightColor: 'from-amber-50 to-yellow-100', name: '연예인', category: '탐험가' },
];

const tests = [
  // ... existing tests ...
  {
    name: '나의 진짜 IQ 테스트',
    description: '웃기고 재미있는 IQ 테스트로 당신의 숨겨진 지능을 측정해보세요!',
    href: '/tests/iq-test',
    emoji: '🧠',
    textColor: 'text-blue-800',
    bgColor: 'bg-blue-100',
  },
];

export default function Home() {
  return (
    <Container>
      <HeroSection />
      
      {/* 신규 추천 테스트 */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">👀 추천 테스트</h2>
        </div>
        
        {/* 두 카드를 그리드로 배치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 스트레스 체크 테스트 카드 */}
          <StressCheckCard />
          
          {/* IQ 테스트 카드 */}
          <IQTestCard />
        </div>
      </div>
      
      {/* 인기 테스트 섹션 - 실제 참여 횟수 기반 */}
      <PopularTestsSection />

      {/* 새로운 테스트 섹션 - 실제 생성일 기반 */}
      <NewTestsSection />

      {/* MBTI 유형별 테스트 섹션 */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">🎭 MBTI 유형별 테스트</h2>
          <Link href="/tests/mbti-deep" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
            더보기
            <ChevronRight size={16} className="ml-0.5" />
          </Link>
        </div>

        {/* MBTI 테스트 카드 추가 */}
        <div className="mb-4">
          <MbtiTestCard />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mbtiTypes.slice(0, 4).map((type) => (
            <Link
              key={type.type}
              href={`/tests/mbti/${type.type.toLowerCase()}`}
              className="block"
            >
              <div className={`p-4 rounded-lg bg-gradient-to-br ${type.lightColor} hover:shadow-md transition-shadow hover:scale-102`}>
                <div className={`inline-block px-2 py-1 rounded text-white text-xs font-bold mb-2 ${type.color}`}>
                  {type.type}
                </div>
                <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{type.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
} 