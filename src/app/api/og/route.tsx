import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    // 간소화된 OG 이미지 생성
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
            padding: '40px',
            fontFamily: 'sans-serif',
            color: 'white',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            찐심테스트
          </div>
          <div
            style={{
              fontSize: '42px',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90%',
            }}
          >
            당신의 내면을 비추는 심리테스트
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`OG 이미지 생성 에러: ${e.message}`);
    return new Response(`OG 이미지 생성 실패: ${e.message}`, {
      status: 500,
    });
  }
} 