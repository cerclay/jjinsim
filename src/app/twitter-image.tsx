import { ImageResponse } from 'next/og';

// 이미지 크기 및 설정
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

// Twitter 이미지 컴포넌트
export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          borderTop: '8px solid #1DA1F2', // Twitter 색상
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
          찐심(JJinSim)
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
          당신의 내면을 비추는 심리테스트
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 