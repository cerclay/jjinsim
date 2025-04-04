'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, User, LogOut, Upload, BarChart, ListTodo, Settings } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // 이미지 업로드 핸들러 (실제 구현은 서버 연동 필요)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageURL(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">대시보드</h1>
            <button
              onClick={handleSignOut}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-1" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 프로필 카드 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-purple-500">
                    {imageURL || session?.user?.image ? (
                      <img 
                        src={imageURL || session?.user?.image || ''} 
                        alt="프로필 이미지" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label 
                    htmlFor="profile-image" 
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Upload className="h-4 w-4" />
                  </label>
                  <input 
                    id="profile-image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </div>
                
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {session?.user?.name || '사용자'}
                </h2>
                <p className="text-sm text-gray-500">
                  {session?.user?.email || '이메일 정보 없음'}
                </p>
                
                <div className="mt-6 w-full border-t border-gray-100" />
                
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-purple-800">계정 유형</p>
                    <p className="text-xl font-bold text-purple-600">
                      {session?.user?.role === 'admin' ? '관리자' : '일반 사용자'}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-blue-800">사용자 ID</p>
                    <p className="text-xl font-bold text-blue-600 truncate">
                      {session?.user?.id ? session.user.id.substring(0, 8) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 테스트 활동 카드 */}
          <div className="bg-white rounded-lg shadow md:col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">최근 테스트 활동</h2>
              
              <div className="space-y-4">
                {/* 최근 활동이 없을 경우 */}
                <div className="text-center py-8">
                  <ListTodo className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">아직 완료한 테스트가 없습니다.</p>
                  <Link
                    href="/"
                    className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
                  >
                    테스트 시작하기
                  </Link>
                </div>
                
                {/* 아래에 실제 테스트 결과 리스트가 들어갈 수 있음 */}
              </div>
            </div>
          </div>
          
          {/* 설정 및 통계 카드들 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">설정</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center p-3 rounded-md hover:bg-gray-50 transition"
                  >
                    <User className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">프로필 관리</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center p-3 rounded-md hover:bg-gray-50 transition"
                  >
                    <Settings className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">계정 설정</span>
                  </Link>
                </li>
                {session?.user?.role === 'admin' && (
                  <li>
                    <Link
                      href="/admin"
                      className="flex items-center p-3 rounded-md hover:bg-gray-50 transition"
                    >
                      <Settings className="h-5 w-5 text-gray-500 mr-3" />
                      <span className="text-gray-700">관리자 설정</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">통계</h2>
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <BarChart className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">아직 통계 데이터가 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 테스트 계정 정보 */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">테스트 계정 정보</h3>
          <p className="text-sm text-yellow-700">
            <strong>로컬 테스트 계정:</strong> admin / admin1234 또는 user / user1234
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            <strong>배포 테스트 계정:</strong> 관리자 및 일반 사용자 계정 로그인 테스트를 위해 배포 환경별 계정을 구성해야 합니다.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            * 참고: 로컬 서버와 배포 서버의 환경 변수 구성이 다를 수 있습니다. 배포 서버에서 로그인 문제는 환경 변수와 NEXTAUTH_URL 설정을 확인하세요.
          </p>
        </div>
      </main>
    </div>
  );
} 