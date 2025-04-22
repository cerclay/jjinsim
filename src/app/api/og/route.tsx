import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 요청 파라미터에서 정보를 가져옵니다
    const title = searchParams.get('title') || '찐심(JJinSim)';
    const description = searchParams.get('description') || '당신의 내면을 비추는 심리테스트';
    const type = searchParams.get('type') || 'default';
    
    // 배경 색상 설정
    let backgroundColor = 'linear-gradient(to bottom, #ffffff, #f0f0f0)';
    if (type === 'mbti') {
      backgroundColor = 'linear-gradient(to bottom, #feebc8, #fed7aa)';
    } else if (type === 'personality') {
      backgroundColor = 'linear-gradient(to bottom, #e9d5ff, #d8b4fe)';
    } else if (type === 'love') {
      backgroundColor = 'linear-gradient(to bottom, #fee2e2, #fecaca)';
    }
    
    // 이미지 반환
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: backgroundColor,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div 
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#555',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG 이미지 생성 에러:', error);
    return new Response('OG 이미지 생성 중 오류가 발생했습니다', { status: 500 });
  }
} 