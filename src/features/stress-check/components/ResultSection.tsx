'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Result } from '../lib/types';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import { Share2, Repeat, Share, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface ResultSectionProps {
  result: Result;
  onReset: () => void;
}

export function ResultSection({ result, onReset }: ResultSectionProps) {
  const { toast } = useToast();
  const router = useRouter();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  useEffect(() => {
    // 결과 화면에서 confetti 효과 추가
    const launchConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#9333ea', '#6366f1', '#c084fc', '#f43f5e', '#38bdf8']
      });
    };
    
    launchConfetti();
    
    const timer = setTimeout(() => {
      launchConfetti();
    }, 700);
    
    return () => {
      clearTimeout(timer);
      confetti.reset();
    };
  }, []);
  
  // 이미지로 저장하기 함수
  const saveAsImage = async () => {
    if (!resultCardRef.current) return;
    setIsSavingImage(true);
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(resultCardRef.current);
      const link = document.createElement('a');
      link.download = `스트레스-테스트-결과.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "이미지 저장 완료",
        description: "결과 이미지가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('이미지 저장 오류:', error);
      toast({
        title: "이미지 저장 실패",
        description: "이미지를 저장할 수 없습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSavingImage(false);
    }
  };
  
  // 테스트 URL 공유 함수
  const shareTestUrl = async () => {
    setIsSharing(true);
    
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      
      toast({
        title: "공유 링크가 복사되었습니다",
        description: "SNS나 메신저에 붙여넣기 하세요",
      });
    } catch (error) {
      console.error('공유 오류:', error);
      toast({
        title: "공유하기 실패",
        description: "링크를 복사할 수 없습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };
  
  // 다른 테스트 페이지로 이동
  const goToOtherTests = () => {
    router.push('/tests');
  };
  
  // 재미있는 팁 메시지
  const funnyTips = {
    high: [
      "멘탈이 철벽이네요! 혹시 슈퍼맨의 친척이신가요?",
      "당신의 멘탈이 제 멘탈을 위협하고 있어요. 비결이 뭔가요?",
      "화가 났을 때 인형 꼭 껴안고 자는 거 아니죠? 솔직히 말해도 돼요!"
    ],
    medium: [
      "이 정도면 평범한 '관종'입니다. 나쁘지 않아요!",
      "조금만 더 힘내요! 귀여운 강아지 영상 세 개 보면 극복 가능해요!",
      "스트레스를 받으면 초콜릿을 드세요! 살찌는 건 다른 문제지만요..."
    ],
    low: [
      "요즘 많이 힘드시죠? 달달한 아이스크림 하나 사드세요!",
      "인생은 롤러코스터! 지금은 내려가는 중이니 곧 올라갈 거예요!",
      "멘탈이 바닥이라고요? 네, 맞아요. 그냥 인정하세요. (농담입니다ㅠㅠ)"
    ]
  };
  
  // 결과에 따른 랜덤 팁 메시지 선택
  const getTipMessage = () => {
    const category = result.mentalPercentage > 70 ? 'high' : (result.mentalPercentage > 40 ? 'medium' : 'low');
    const tips = funnyTips[category];
    return tips[Math.floor(Math.random() * tips.length)];
  };
  
  // 재미있는 행운의 문구
  const getLuckyPhrase = () => {
    const phrases = [
      "오늘의 행운 아이템: 뽀로로 양말",
      "당신의 행운의 숫자: 멘탈이 깨지기 직전",
      "오늘의 운세: 생각보다 괜찮을지도?",
      "당신에게 필요한 것: 따뜻한 담요와 넷플릭스",
      "지금 당장 필요한 것: 치즈케이크 한 조각"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };
  
  return (
    <Card className="w-full max-w-[500px] mx-auto overflow-hidden border-2 border-purple-500/20 bg-white">
      <div ref={resultCardRef}>
        <CardHeader className="text-center p-6 bg-white border-b border-purple-100">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center text-5xl shadow-lg">
              {result.emoji}
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold text-purple-900">{result.title}</CardTitle>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 inline-block bg-purple-100 px-3 py-1 rounded-full text-sm text-purple-700"
          >
            {getLuckyPhrase()}
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-black">멘탈 건강도</span>
              <span className="font-bold text-purple-700">{result.mentalPercentage}%</span>
            </div>
            <div className="h-3 bg-purple-100 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.mentalPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
              />
            </div>
            <p className="text-xs text-right text-gray-600">
              {result.mentalPercentage < 50 ? '멘탈 충전이 필요해요! 🔋' : '멘탈이 건강한 상태입니다! ✨'}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <p className="text-base text-black">{result.description}</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-lg bg-white border-2 border-purple-200 border-dotted"
          >
            <p className="text-sm font-medium text-purple-700 mb-2">✨ 재미있는 팁</p>
            <p className="text-black">{getTipMessage()}</p>
          </motion.div>
          
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, index) => (
              <motion.span 
                key={index} 
                className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <h3 className="font-bold mb-2 text-purple-900 flex items-center">
              <span className="mr-2 text-xl">🍀</span> 이런 스트레스 해소법이 좋아요
            </h3>
            <ul className="text-sm space-y-2 list-disc pl-5 text-black">
              {result.mentalPercentage > 70 ? (
                <>
                  <li>현재 상태를 유지하면서 가끔씩 즐거운 취미 활동을 해보세요</li>
                  <li>긍정적인 마음가짐을 유지하는 당신, 정말 멋져요!</li>
                  <li>그래도 가끔은 수면 마스크 쓰고 12시간 숙면 어떨까요?</li>
                </>
              ) : result.mentalPercentage > 40 ? (
                <>
                  <li>가벼운 운동으로 스트레스를 날려보세요</li>
                  <li>친구들과 대화하며 마음을 나누는 시간을 가져보세요</li>
                  <li>좋아하는 음악 듣기나 영화 보기로 기분 전환을 해보세요</li>
                  <li>"나 오늘 너무 힘들어"라고 큰소리로 외치고 웃어보세요. 진짜로요!</li>
                </>
              ) : (
                <>
                  <li>지금은 휴식이 가장 필요한 시기입니다</li>
                  <li>정신 건강 관리를 위해 전문가와 상담을 고려해보세요</li>
                  <li>당장 달콤한 간식과 따뜻한 차 한잔의 여유를 가져보세요</li>
                  <li>무리한 약속은 잠시 미루고 나만의 시간을 가져보세요</li>
                  <li>가끔은 아무것도 안 하는 것도 좋은 선택이에요. 그냥 누워계세요!</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-6 bg-white border-t border-purple-100 flex-col space-y-3">
        <Button 
          onClick={saveAsImage} 
          disabled={isSavingImage}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isSavingImage ? '저장 중...' : (
            <>
              <Image className="mr-2 h-4 w-4" /> 이미지로 저장하기
            </>
          )}
        </Button>
        <Button 
          onClick={goToOtherTests} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" />
          </svg>
          다른 테스트 보기
        </Button>
        <Button 
          className="w-full bg-pink-600 hover:bg-pink-700 text-white" 
          onClick={shareTestUrl}
          disabled={isSharing}
        >
          {isSharing ? '공유 중...' : (
            <>
              <Share2 className="mr-2 h-4 w-4" /> 결과 공유하기
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 