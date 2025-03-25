import { NextResponse } from 'next/server';
import { generateFortune, generateFortuneScores } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { type, birthdate } = await req.json();

    if (!type || !birthdate) {
      return NextResponse.json(
        { error: '생년월일과 운세 유형이 필요합니다.' },
        { status: 400 }
      );
    }

    const fortune = await generateFortune(type, birthdate);
    const scores = generateFortuneScores();

    return NextResponse.json({
      success: true,
      fortune,
      scores
    });
  } catch (error) {
    console.error('운세 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '운세를 생성하는 중에 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
} 