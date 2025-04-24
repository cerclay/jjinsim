const fs = require('fs');
const path = require('path');
const { createCanvas, registerFont, loadImage } = require('canvas');

// 캔버스 생성
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// 그라데이션 배경 생성
const gradient = context.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#4F46E5');
gradient.addColorStop(1, '#8B5CF6');
context.fillStyle = gradient;
context.fillRect(0, 0, width, height);

// 텍스트 설정
context.fillStyle = '#FFFFFF';
context.textAlign = 'center';

// 큰 제목 추가
context.font = 'bold 92px sans-serif';
context.fillText('찐심테스트', width / 2, height / 2 - 40);

// 설명 추가
context.font = 'bold 56px sans-serif';
context.fillText('당신의 내면을 비추는 심리테스트', width / 2, height / 2 + 60);

// 이미지 저장
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../public/images/og-image-new.png'), buffer);

console.log('OG 이미지가 성공적으로 생성되었습니다!'); 