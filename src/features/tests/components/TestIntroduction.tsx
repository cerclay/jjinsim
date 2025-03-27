"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, Bookmark, Share2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/hooks/use-toast";

interface TestIntroductionProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  participationCount: number;
  likeCount: number;
  accurateCount: number;
  saveCount?: number;
  onStart: () => void;
}

export default function TestIntroduction({
  id,
  title,
  description,
  thumbnailUrl,
  tags,
  participationCount,
  likeCount,
  accurateCount,
  saveCount = 0,
  onStart,
}: TestIntroductionProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [accurate, setAccurate] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [localAccurateCount, setLocalAccurateCount] = useState(accurateCount);
  const [localSaveCount, setLocalSaveCount] = useState(saveCount);

  const supabase = createClientComponentClient();

  const handleInteraction = async (type: 'save' | 'like' | 'accurate' | 'share') => {
    if (!session) {
      toast({
        description: "로그인 후 이용해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      // 상호작용 저장
      await supabase.from('test_interactions').insert({
        test_card_id: id,
        user_id: session.user.id,
        interaction_type: type
      });

      // 상태 업데이트
      if (type === 'save') {
        setSaved(true);
        setLocalSaveCount(prev => prev + 1);
        toast({ description: "테스트가 저장되었습니다." });
      } else if (type === 'like') {
        setLiked(true);
        setLocalLikeCount(prev => prev + 1);
        toast({ description: "재미있는 테스트에 공감했습니다!" });
      } else if (type === 'accurate') {
        setAccurate(true);
        setLocalAccurateCount(prev => prev + 1);
        toast({ description: "정확한 테스트에 공감했습니다!" });
      } else if (type === 'share') {
        // 공유 URL 생성
        const shareUrl = `${window.location.origin}/test/${id}`;
        
        // 공유 기능 구현
        if (navigator.share) {
          await navigator.share({
            title: title,
            text: description,
            url: shareUrl,
          });
        } else {
          // 클립보드에 복사
          await navigator.clipboard.writeText(shareUrl);
          toast({ description: "링크가 클립보드에 복사되었습니다." });
        }
      }
    } catch (error) {
      console.error("상호작용 오류:", error);
      toast({
        description: "문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={thumbnailUrl || "https://picsum.photos/seed/test/800/400"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
        
        <div className="flex flex-wrap gap-2 my-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-gray-500 gap-4">
          <span>{participationCount.toLocaleString()}명 참여</span>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={cn(liked && "text-red-500")}
              onClick={() => !liked && handleInteraction("like")}
            >
              <Heart className="w-4 h-4 mr-1" />
              <span>{localLikeCount}</span>
            </Button>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={cn(accurate && "text-green-500")}
              onClick={() => !accurate && handleInteraction("accurate")}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>{localAccurateCount}</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => handleInteraction("save")}
            disabled={saved}
            className="flex-1"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            {saved ? "저장됨" : "저장하기"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleInteraction("share")}
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            공유하기
          </Button>
        </div>
        
        <Button 
          size="lg" 
          className="w-full bg-primary text-primary-foreground font-bold"
          onClick={onStart}
        >
          테스트 시작하기
        </Button>
      </CardFooter>
    </Card>
  );
} 