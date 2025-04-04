export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-rose-600 border-r-rose-300 border-b-rose-100 border-l-rose-300 mb-4"></div>
      <p className="mt-2 text-gray-600 text-lg font-medium animate-pulse">로딩 중...</p>
    </div>
  )
} 