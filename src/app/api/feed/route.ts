import { Feed } from 'feed';
import { NextResponse } from 'next/server';

export async function GET() {
  const feed = new Feed({
    title: "찐심(JJinSim) - 당신의 내면을 비추는 심리테스트",
    description: "찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!",
    id: "https://mysimli.com/",
    link: "https://mysimli.com/",
    language: "ko-KR",
    favicon: "https://mysimli.com/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, 찐심(JJinSim)`,
    updated: new Date(),
    author: {
      name: "찐심(JJinSim)",
      email: "contact@mysimli.com",
      link: "https://mysimli.com"
    }
  });

  // 기본 페이지 추가
  feed.addItem({
    title: "찐심(JJinSim) - 당신의 내면을 비추는 심리테스트",
    id: "https://mysimli.com/",
    link: "https://mysimli.com/",
    description: "찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!",
    content: "찐심 테스트로 당신의 성격, 심리, 적성, MBTI 등을 무료로 알아보세요. 재미있고 정확한 심리테스트로 자신을 발견하는 시간!",
    date: new Date()
  });

  // 주요 테스트 추가
  const testItems = [
    {
      title: "MBTI 테스트 - 당신의 성격 유형은?",
      link: "https://mysimli.com/tests/mbti",
      description: "MBTI 유형 검사로 당신의 성격 특성을 알아보세요. 16가지 성격 유형 중 당신은 어떤 유형인지 확인해보세요.",
    },
    {
      title: "기억력 테스트 - 당신의 기억력은 어떤가요?",
      link: "https://mysimli.com/tests/memory-test",
      description: "간단한 테스트를 통해 당신의 기억력을 확인해보세요.",
    },
    {
      title: "색맹 테스트 - 당신의 색각은 어떤가요?",
      link: "https://mysimli.com/tests/color-blindness",
      description: "색각이상을 확인할 수 있는 테스트입니다.",
    },
    {
      title: "스트레스 체크 - 당신의 스트레스 지수는?",
      link: "https://mysimli.com/tests/stress-check",
      description: "일상 생활에서 느끼는 스트레스 수준을 확인해보세요.",
    }
  ];

  // 피드에 테스트 추가
  testItems.forEach(test => {
    feed.addItem({
      title: test.title,
      id: test.link,
      link: test.link,
      description: test.description,
      content: test.description,
      date: new Date()
    });
  });

  // RSS XML 응답 반환
  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
} 