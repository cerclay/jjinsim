"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, User, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Brain, Heart, Sparkles, Users, Briefcase } from 'lucide-react';
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from 'lucide-react'
import Image from 'next/image'
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
import { UserCircle } from 'lucide-react'

const menuItems = [
  { href: "/", label: "홈" },
  { href: "/tests/popular", label: "인기 테스트" },
  { href: "/tests/new", label: "신규 테스트" },
  { href: "/my-results", label: "결과 보관함" },
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
  const { data: session } = useSession();
  
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
          <MobileNav session={session} />
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
          <motion.button 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted" 
            aria-label="검색"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-5 w-5" />
          </motion.button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UserNav session={session} />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileNav({ session }: { session: any }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsOpen(false);
  };

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
          <Link href="/" className="text-lg font-extrabold jjinsim-logo-vertical text-black">
            찐심
          </Link>
          <SheetClose className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5 text-black" />
            <span className="sr-only">닫기</span>
          </SheetClose>
        </div>
        
        <SheetTitle className="sr-only">메인 메뉴</SheetTitle>
        
        <motion.div 
          className="py-2 px-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <nav className="flex flex-col">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-md transition-colors text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </Link>
              </motion.div>
            ))}
          </nav>
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
                    className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 text-purple-500 bg-purple-100`}>
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
          {session ? (
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

function UserNav({ session }: { session: any }) {
  const router = useRouter()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  const userImage = session?.user?.image || null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 rounded-full">
          {userImage ? (
            <Image
              src={userImage}
              alt="프로필 이미지"
              width={20}
              height={20}
              className="rounded-full h-5 w-5 object-cover"
            />
          ) : (
            <UserCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-results" className="cursor-pointer">내 결과</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}