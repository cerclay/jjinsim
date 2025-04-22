'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OgTestPage() {
  const [title, setTitle] = useState('찐심(JJinSim)');
  const [description, setDescription] = useState('당신의 내면을 비추는 심리테스트');
  const [type, setType] = useState('default');
  const [ogImageUrl, setOgImageUrl] = useState(`/api/og?title=${encodeURIComponent('찐심(JJinSim)')}&description=${encodeURIComponent('당신의 내면을 비추는 심리테스트')}&type=default`);

  const handleGenerateOgImage = () => {
    const url = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=${type}`;
    setOgImageUrl(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">오픈그래프 메타태그 테스트</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">OG 이미지 생성</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="OG 이미지 제목" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">설명</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="OG 이미지 설명" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="type">유형</Label>
              <Select 
                value={type} 
                onValueChange={setType}
              >
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">기본</SelectItem>
                  <SelectItem value="mbti">MBTI</SelectItem>
                  <SelectItem value="personality">성격</SelectItem>
                  <SelectItem value="love">연애</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerateOgImage} 
              className="w-full"
            >
              OG 이미지 생성
            </Button>
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">미리보기</h2>
            <div className="relative w-full h-60 overflow-hidden rounded-md">
              <Image 
                src={ogImageUrl} 
                alt="OpenGraph Preview" 
                fill
                className="object-cover"
              />
            </div>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">OG 이미지 URL</h2>
            <div className="p-3 bg-gray-100 rounded-md">
              <code className="break-all text-sm">{`${window.location.origin}${ogImageUrl}`}</code>
            </div>
            <Button 
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}${ogImageUrl}`)}
              variant="outline"
              className="mt-2"
              size="sm"
            >
              URL 복사
            </Button>
          </Card>
        </div>
      </div>
      
      <Card className="p-6 shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">사용 방법</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">1. 정적 페이지에서 사용</h3>
            <p className="text-gray-700 mt-1">layout.tsx 또는 page.tsx 파일에서 다음과 같이 메타데이터를 정의하세요:</p>
            <div className="p-3 bg-gray-100 rounded-md mt-2">
              <pre><code>{`import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: '페이지 제목',
  description: '페이지 설명',
  image: '${window.location.origin}${ogImageUrl}',
  url: '페이지 URL',
});`}</code></pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium">2. 동적 페이지에서 사용</h3>
            <p className="text-gray-700 mt-1">generateMetadata 함수를 사용하여 동적으로 메타데이터를 생성하세요:</p>
            <div className="p-3 bg-gray-100 rounded-md mt-2">
              <pre><code>{`import { createMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  // 데이터 가져오기
  const data = await fetchData(params.id);
  
  return createMetadata({
    title: data.title,
    description: data.description,
    image: '${window.location.origin}/api/og?title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&type=default',
    url: \`${window.location.origin}/경로/\${params.id}\`,
  });
}`}</code></pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 