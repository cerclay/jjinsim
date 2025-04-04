import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="mb-6">
        <h1 className="text-9xl font-bold text-rose-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          요청하신 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용이 불가능합니다.
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          asChild
          className="bg-rose-600 hover:bg-rose-700"
        >
          <Link href="/">
            홈으로 돌아가기
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
        >
          <Link href="/tests">
            테스트 목록 보기
          </Link>
        </Button>
      </div>
    </div>
  );
} 