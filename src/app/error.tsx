"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 Sentry에 보고
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <div className="max-w-lg mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <h2 className="text-lg font-semibold mb-2">오류가 발생했습니다</h2>
        <p className="text-sm opacity-90 mb-4">
          페이지를 표시하는 중에 문제가 발생했습니다.
          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 p-2 bg-white border border-red-200 rounded text-xs font-mono overflow-auto">
              {error.message}
            </div>
          )}
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="default" 
          onClick={reset}
          className="bg-rose-600 hover:bg-rose-700"
        >
          다시 시도하기
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
} 