'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function MigrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [tableStructure, setTableStructure] = useState<string[]>([]);
  
  // 페이지 로드 시 테이블 구조 확인
  useEffect(() => {
    checkTableStructure();
  }, []);

  const checkTableStructure = async () => {
    setIsLoading(true);
    setError(null);
    setResults('');

    try {
      // 계정 테이블 데이터 조회
      const { data: accounts, error: accountError } = await supabase
        .from('account')
        .select('*')
        .limit(5);
      
      if (accountError) {
        setError(`계정 테이블 조회 오류: ${accountError.message}`);
        return;
      }

      // 샘플 계정이 있을 경우 구조 확인
      if (accounts && accounts.length > 0) {
        const columns = Object.keys(accounts[0]);
        setTableStructure(columns);
        
        // OAuth 관련 컬럼 확인
        const hasOAuthColumns = columns.includes('provider') && columns.includes('provider_id');
        
        setResults(JSON.stringify({
          message: '계정 테이블 구조 확인 완료',
          hasOAuthColumns,
          columns,
          sampleData: accounts.map(acc => ({
            id: acc.id,
            username: acc.username,
            email: acc.email,
            provider: acc.provider,
            provider_id: acc.provider_id,
            hasProfileImage: !!acc.profile_image_url
          }))
        }, null, 2));
      } else {
        setResults(JSON.stringify({
          message: '계정 테이블에 데이터가 없습니다.',
          hasOAuthColumns: false,
          columns: []
        }, null, 2));
      }
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Supabase 테이블 구조 확인</h1>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={checkTableStructure}
            disabled={isLoading}
            className="w-full p-2 font-bold text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? '확인 중...' : '테이블 구조 확인'}
          </button>
        </div>

        {tableStructure.length > 0 && (
          <div className="mb-4">
            <h2 className="mb-2 text-sm font-semibold">테이블 컬럼:</h2>
            <div className="p-3 bg-gray-100 rounded">
              <ul className="grid grid-cols-2 gap-1 text-sm">
                {tableStructure.map((column, index) => (
                  <li key={index} className={`${column === 'provider' || column === 'provider_id' ? 'font-bold text-green-600' : ''}`}>
                    {column}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {results && (
          <div className="p-4 mt-4 overflow-auto text-sm bg-gray-100 rounded-lg">
            <pre className="whitespace-pre-wrap">{results}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 