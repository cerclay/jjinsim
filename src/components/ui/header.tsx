"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Brain, Heart, Sparkles, Users, Briefcase, LogOut, UserCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const menuItems = [
  { href: "/", label: "홈" },
  { href: "/tests", label: "전체 테스트" },
  { href: "/auth/dashboard", label: "결과 보관함", authRequired: true },
  { href: "/my-results", label: "결과 보관함", authRequired: false },
  { href: "/about", label: "서비스 소개" },
];

const categories = [
  { href: "/category/personality", label: "성격", icon: Brain, color: "text-primary-500 bg-primary-500/10" },
  { href: "/category/love", label: "연애", icon: Heart, color: "text-pink-500 bg-pink-500/10" },
  { href: "/category/mental", label: "심리상태", icon: Sparkles, color: "text-blue-500 bg-blue-500/10" },
  { href: "/category/relationship", label: "관계", icon: Users, color: "text-green-500 bg-green-500/10" },
  { href: "/category/career", label: "진로", icon: Briefcase, color: "text-secondary-500 bg-secondary-500/10" },
  { href: "/tests/iq-test", label: "IQ테스트", icon: Brain, color: "text-purple-500 bg-purple-500/10" },
];

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 로그인 상태 확인 - authenticated 상태이고 session이 존재할 때만 로그인으로 간주
  const isAuthenticated = status === 'authenticated' && !!session;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-white backdrop-blur relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      <div className="container h-14 flex items-center justify-between px-4 max-w-md mx-auto">
        <div className="flex items-center">
          <MobileNav />
          <Link href="/" className="ml-2">
            <motion.span 
              className="text-lg font-extrabold jjinsim-logo-vertical"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              찐심
            </motion.span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link href="/search">
            <motion.button 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted" 
              aria-label="검색"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
          </Link>
          
          {/* 로그인 관련 버튼 */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/auth/dashboard">
                  <Button variant="outline" size="sm" className="text-sm">
                    대시보드
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-purple-600 hover:bg-purple-700 text-sm"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-sm"
                >
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session, status } = useSession();
  
  // 로그인 상태 확인
  const isAuthenticated = status === 'authenticated' && !!session;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsOpen(false);
  };

  // 로그인 상태에 따른 메뉴 필터링
  const filteredMenuItems = menuItems.filter(item => {
    if (item.authRequired === undefined) return true;
    return item.authRequired ? isAuthenticated : !isAuthenticated;
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.button 
          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </motion.button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] sm:w-[280px] border-r-2 bg-white">
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="text-lg font-extrabold jjinsim-logo-vertical text-black" onClick={() => setIsOpen(false)}>
            찐심
          </Link>
          <SheetClose className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5 text-black" />
            <span className="sr-only">닫기</span>
          </SheetClose>
        </div>
        
        <motion.div 
          className="flex flex-col py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {filteredMenuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center p-4 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div 
          className="mt-2 pt-4 border-t px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold mb-3 px-1 text-black">카테고리</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={category.href}
                    className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-center text-black">{category.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 border-t p-4 bg-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {isAuthenticated ? (
            <div className="flex justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/profile" 
                  className="text-sm font-medium text-black hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  내 정보
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  onClick={handleSignOut}
                  className="text-sm font-medium text-black hover:text-purple-600 transition-colors"
                >
                  로그아웃
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="flex justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/auth/signin" 
                  className="text-sm font-medium text-black hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  로그인
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/auth/register" 
                  className="text-sm font-medium text-black hover:text-purple-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  회원가입
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}