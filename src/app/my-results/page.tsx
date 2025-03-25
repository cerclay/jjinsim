'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, ClipboardList, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MyResultsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  // 테스트용 더미 데이터
  const dummyResults = [
    {
      id: 1,
      testName: "성격 유형 테스트",
      result: "사려깊은 전략가",
      date: "2025-03-22",
      category: "personality",
    },
    {
      id: 2,
      testName: "연애 스타일 테스트",
      result: "로맨틱 유형",
      date: "2025-03-15",
      category: "love",
    },
    {
      id: 3,
      testName: "직업 적성 검사",
      result: "창의적 디자이너",
      date: "2025-03-10",
      category: "career",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold">내 테스트 결과</h1>
        </div>

        {dummyResults.length > 0 ? (
          <div className="space-y-4">
            {dummyResults.map((result) => (
              <div key={result.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{result.testName}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {result.date}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">결과: <span className="font-medium text-gray-700">{result.result}</span></p>
                <Link 
                  href={`/tests/${result.category}/${result.id}/result`}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  <ClipboardList className="h-4 w-4 mr-1" />
                  결과 다시보기
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <ClipboardList className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">아직 저장된 결과가 없습니다</h3>
            <p className="text-gray-500 mb-4">테스트를 완료하면 결과가 여기에 저장됩니다.</p>
            <Link
              href="/"
              className="inline-block py-2 px-4 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              테스트 하러가기
            </Link>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/profile"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            프로필로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 