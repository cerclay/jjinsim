import { StressCheck } from '@/features/stress-check/components/StressCheck';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스트레스 지수 체크 - 나 지금 멘탈 몇 % 남았지?',
  description: '12문제로 알아보는 당신의 스트레스 지수. 지금 당신 멘탈, 몇 % 남았을까?',
};

export default async function StressCheckPage() {
  return (
    <main>
      <StressCheck />
    </main>
  );
} 