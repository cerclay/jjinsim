const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  // 캔버스 생성 (OG 이미지 권장 크기: 1200x630)
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 배경 채우기 - 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#3B82F6'); // 파란색 계열
  gradient.addColorStop(1, '#8B5CF6'); // 보라색 계열
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 텍스트 스타일 설정
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  
  // 제목 추가
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText('심리테스트', width / 2, height / 2 - 40);
  
  // 부제목 추가
  ctx.font = '36px sans-serif';
  ctx.fillText('당신의 내면을 비추는 심리테스트', width / 2, height / 2 + 40);

  // 이미지를 파일로 저장
  const outputDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(outputDir, 'og-preview.jpg'), buffer);
  
  console.log('OG 이미지가 성공적으로 생성되었습니다: public/images/og-preview.jpg');
}

generateOGImage().catch(console.error); 