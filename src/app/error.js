'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // 오류를 에러 보고 서비스에 기록할 수 있습니다.
    console.error('오류 발생:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">오류가 발생했습니다</h2>
      <p className="mb-6 text-gray-600">죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  )
} 