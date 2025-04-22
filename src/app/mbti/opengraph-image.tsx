import { ImageResponse } from 'next/og';

// 이미지 크기 및 설정
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

// MBTI 페이지용 OG 이미지 컴포넌트
export default async function MbtiOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #feebc8, #fed7aa)',
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
          }}
        >
          MBTI 심리테스트
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
          당신의 진짜 MBTI 유형을 알아보세요
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 