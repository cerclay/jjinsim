'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">접근 거부</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">이 페이지에 접근할 권한이 없습니다</h2>
        <p className="text-gray-600 mb-6">로그인이 필요하거나 권한이 필요한 페이지입니다.</p>
        <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
} 