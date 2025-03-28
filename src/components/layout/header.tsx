"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-[500px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md text-gray-600">
              <Menu size={22} />
            </div>
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-purple-800">찐심</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 rounded-full text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Search size={22} />
            </Link>
            
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full text-sm font-medium text-white bg-purple-600 h-8 px-4 py-2 hover:bg-purple-700 transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 