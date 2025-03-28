import { IQHumorTest } from '@/features/tests/iq-humor/components/IQHumorTest';
import { iqHumorTestData } from '@/features/tests/iq-humor/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '나의 진짜 IQ는? 유머버전! | IQ 테스트',
  description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은? 결과는 진지 반, 유쾌 반!',
  openGraph: {
    title: '나의 진짜 IQ는? 유머버전! | IQ 테스트',
    description: '15문제로 당신의 두뇌를 가볍게 흔들어봅니다. 과연 당신의 숨겨진 지능은?',
    images: [
      {
        url: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
        width: 1200,
        height: 630,
        alt: 'IQ 테스트 유머버전',
      },
    ],
  },
};

export default function IQHumorTestPage() {
  return (
    <main>
      <IQHumorTest testData={iqHumorTestData} />
    </main>
  );
} 