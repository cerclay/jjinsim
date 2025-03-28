'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { iqHumorTestData } from '../data';

export function TestThumbnail() {
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src="https://blogger.googleusercontent.com/img/a/AVvXsEiN0SY7FdaplgijMIumf2Xhh-jZLlpV8fJ38sjYwTjppuSiua0ejcE9tKuvZY4m1LCbCuzDVJEv8n0dsNMyHmObOD-IroqR2I6_EoHEOJCGaHhWEAQW5VaGjfIMpmQvpcVBqxqAvdUSWj1BAfeAqNBvLJbu95ji1Nx1jMnoh1ogpQp_GluGh0n3c5nv7wQ"
          alt="IQ 테스트 썸네일"
          fill
          className="object-cover transition-transform hover:scale-105"
          priority
        />
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="text-xl font-bold text-center">{iqHumorTestData.title}</CardTitle>
        <CardDescription className="text-sm text-center text-gray-600">
          {iqHumorTestData.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>소요 시간:</span>
            <span>{Math.floor(iqHumorTestData.time_limit_seconds / 60)}분 {iqHumorTestData.time_limit_seconds % 60}초</span>
          </div>
          <div className="flex justify-between">
            <span>문제 수:</span>
            <span>{iqHumorTestData.questions.length}문제</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-4">
        <Link href="/tests/iq-humor" className="w-full">
          <Button className="w-full">지금 테스트 시작하기</Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 