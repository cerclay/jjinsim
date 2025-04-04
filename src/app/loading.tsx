import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Spinner size="lg" className="mb-4" />
      <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">로딩 중...</p>
    </div>
  );
} 