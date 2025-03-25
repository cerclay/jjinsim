"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TPowerRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/tests/t-power");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-500">페이지를 이동 중입니다...</p>
    </div>
  );
} 