'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TestResult as TestResultType } from '../types';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import { Confetti } from './Confetti';
import { Share2, BrainCircuit, MedalIcon, Star, Award, Clock, Sparkles, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TestResultProps {
  result: TestResultType;
  onRestart: () => void;
}

export function TestResult({ result, onRestart }: TestResultProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showGif, setShowGif] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  // GIF 애니메이션 로딩 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // IQ 점수를 0-100 범위로 변환
  const normalizedIQScore = Math.min(Math.max((result.iqScore - 70) / 100, 0), 100) * 100;
  
  // 정답률 계산
  const correctRate = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  // 결과 이모지 애니메이션 효과
  const emojiClass = "text-5xl md:text-7xl animate-bounce inline-block";
  
  // 격려 메시지 선택
  const encouragementMessages = [
    "오늘의 당신, 내일의 아인슈타인! 🧠✨",
    "뇌세포가 열일한 날이네요! 당신의 두뇌는 불타오르는 중! 🔥",
    "두뇌 풀가동! 이정도면 천재 소리 들어도 이상하지 않아요! 😎",
    "이 정도 IQ라면 로켓 과학도 식은 죽 먹기겠네요! 🚀",
    "아이큐 테스트의 신이 강림하셨군요! 👑",
    "당신의 두뇌는 한계를 모르는 괴물이에요! 💪"
  ];
  
  const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  
  // 재미있는 결과 설명 문구
  const funnyDescriptions = {
    '75': "두뇌가 오늘은 휴가 중이네요. 내일 다시 오세요!",
    '90': "생각하는 건 귀찮아~ 느릿느릿 가도 결국 도착하는 거 알죠?",
    '105': "평범함의 미학! 적당히 똑똑한게 인생 살기 편하답니다.",
    '120': "숨겨왔던 천재성이 드디어 발견됐네요! 자랑해도 좋아요!",
    '135': "우주적 사고의 소유자! 당신이 생각하는 건 남들과 달라요!",
    '145': "컴퓨터도 당신만큼 빠르게 계산할 수 없을걸요?"
  };
  
  const funnyDescription = funnyDescriptions[result.iqScore.toString()] || result.resultDescription;

  // 공유 함수들
  const shareText = `나의 IQ 테스트 결과는 ${result.iqScore}! ${result.resultTitle} - ${funnyDescription}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Web Share API 사용
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '찐심 IQ 테스트 결과',
          text: shareText,
          url: shareUrl
        });
        toast.success("공유되었습니다!");
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          // 사용자가 공유를 취소한 경우가 아닌 다른 오류 발생 시
          toast.error("공유하는 중 오류가 발생했습니다");
          console.error('Error sharing:', error);
          // 공유 대화상자를 표시합니다 (Web Share API를 지원하지 않는 경우)
          setShowShareDialog(true);
        }
      }
    } else {
      // Web Share API를 지원하지 않는 경우 대화상자를 표시합니다
      setShowShareDialog(true);
    }
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareDialog(false);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareDialog(false);
  };

  const handleShareKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        // Kakao SDK가 초기화되지 않은 경우
        toast.error("카카오톡 공유 기능을 사용할 수 없습니다");
        return;
      }
      
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '찐심 IQ 테스트 결과',
          description: shareText,
          imageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '결과 확인하기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      toast.error("카카오톡 공유 기능을 사용할 수 없습니다");
    }
    setShowShareDialog(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast.success("링크가 복사되었습니다!");
    } catch (err) {
      // fallback - textarea 사용
      const textarea = document.createElement('textarea');
      textarea.value = `${shareText}\n${shareUrl}`;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success("링크가 복사되었습니다!");
      } catch (err) {
        toast.error("링크 복사에 실패했습니다");
      }
      document.body.removeChild(textarea);
    }
    setShowShareDialog(false);
  };
  
  return (
    <div className="relative w-full max-w-[500px] mx-auto py-6">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      
      <Card className="w-full bg-white shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
        <div className="absolute top-0 right-0 p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-purple-600 rounded-full"
            onClick={() => setShowShareDialog(true)}
            aria-label="결과 공유하기"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="bg-purple-600 h-3"></div>
        
        <CardHeader className="text-center pb-0 pt-6">
          <div className="mx-auto mb-3">
            <div className="rounded-full bg-purple-100 p-3 inline-block">
              <BrainCircuit className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <CardTitle className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
            <span className={emojiClass}>{result.resultTitle.split(' ')[0]}</span>&nbsp;
            <span className="text-purple-600">{result.resultTitle.split(' ').slice(1).join(' ')}</span>
          </CardTitle>
          
          {/* IQ 점수를 더 크게 표시 */}
          <div className="bg-purple-50 rounded-xl py-3 px-4 mb-4 inline-block">
            <div className="flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                IQ {result.iqScore}
              </span>
              <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6">
          {/* GIF 애니메이션 표시 */}
          {showGif && (
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden mb-4 border border-gray-200">
              <Image 
                src={result.resultGifUrl}
                alt={result.resultTitle}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* 결과 설명 - 더 유쾌하게 */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-800">
            <p className="text-center leading-relaxed text-lg font-medium">{funnyDescription}</p>
          </div>
          
          {/* 태그 */}
          <div className="flex flex-wrap justify-center gap-2">
            {result.resultTags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 정답률 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-4">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1.5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">정답률</span>
              </div>
              <span className="text-sm font-bold text-purple-600">{correctRate}%</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>총 {result.totalQuestions}문제 중 {result.correctAnswers}문제 정답</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                <span>{Math.floor(result.timeSpent / 60)}분 {result.timeSpent % 60}초</span>
              </div>
            </div>
            
            <Progress 
              value={correctRate} 
              className="h-2 bg-gray-200" 
              indicatorClassName="bg-purple-600"
            />
          </div>
          
          {/* IQ 점수 바 */}
          <div className="space-y-1 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">IQ 점수 범위</span>
              <span className="text-xs font-medium text-purple-600">당신: {result.iqScore}</span>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">70</span>
                <span className="text-xs text-gray-500">100</span>
                <span className="text-xs text-gray-500">130</span>
                <span className="text-xs text-gray-500">160+</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${normalizedIQScore}%` }}
                ></div>
                <div 
                  className="absolute h-4 w-4 bg-white border-2 border-purple-600 rounded-full -mt-1"
                  style={{ left: `${normalizedIQScore}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              평균 IQ: 100
            </div>
          </div>
          
          {/* 격려 메시지 - 더 유쾌하게 */}
          <div className="text-center text-base text-purple-600 font-bold py-3 bg-purple-50 rounded-lg">
            "{randomEncouragement}"
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3 px-6 pb-6">
          <Button 
            onClick={handleShare}
            className="w-full bg-white hover:bg-gray-50 text-purple-600 border border-purple-200 hover:border-purple-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            결과 공유하기
          </Button>
          
          <Button 
            onClick={onRestart} 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            테스트 다시 하기
          </Button>
          
          <Link href="/" className="w-full">
            <Button 
              variant="default" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              홈으로 돌아가기
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      {/* 공유 다이얼로그 */}
      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent className="max-w-[350px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">결과 공유하기</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              당신의 IQ 테스트 결과를 친구들에게 공유해보세요!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center space-x-4 py-4">
            <Button 
              onClick={handleShareFacebook} 
              className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700"
              aria-label="페이스북에 공유"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button 
              onClick={handleShareTwitter} 
              className="rounded-full w-12 h-12 p-0 bg-sky-500 hover:bg-sky-600"
              aria-label="트위터에 공유"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button 
              onClick={handleCopyLink} 
              className="rounded-full w-12 h-12 p-0 bg-gray-600 hover:bg-gray-700"
              aria-label="링크 복사하기"
            >
              <LinkIcon className="w-5 h-5" />
            </Button>
            <Button 
              onClick={handleShareKakao} 
              className="rounded-full w-12 h-12 p-0 bg-yellow-400 hover:bg-yellow-500"
              aria-label="카카오톡으로 공유"
            >
              <span className="text-black font-bold">K</span>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full">취소</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 