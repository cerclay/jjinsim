"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "홈" },
    { href: "/tests/popular", label: "인기 테스트" },
    { href: "/tests/new", label: "신규 테스트" },
    { href: "/my-results", label: "결과 보관함" },
    { href: "/about", label: "서비스 소개" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-[500px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
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

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 w-full bg-white shadow-md z-50 overflow-hidden"
            >
              <div className="max-w-[500px] mx-auto px-4 py-3">
                <nav className="flex flex-col">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3 px-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 