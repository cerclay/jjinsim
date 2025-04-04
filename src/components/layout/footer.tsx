"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GithubIcon, 
  MailIcon, 
  InstagramIcon, 
  YoutubeIcon 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const socialLinks = [
    { icon: <InstagramIcon size={20} />, href: "https://instagram.com/jjinsim", label: "인스타그램" },
    { icon: <YoutubeIcon size={20} />, href: "https://youtube.com/c/jjinsim", label: "유튜브" },
    { icon: <MailIcon size={20} />, href: "mailto:support@jjinsim.com", label: "이메일" },
    { icon: <GithubIcon size={20} />, href: "https://github.com/jjinsim", label: "GitHub" }
  ];
  
  const navLinks = [
    { href: "/about", label: "찐심이 뭐예요?" },
    { href: "https://picturesque-ox-876.notion.site/1c0ae7b4e9538066a2daeceaae197c57?pvs=4", label: "개인정보처리방침" },
    { href: "https://picturesque-ox-876.notion.site/1c0ae7b4e9538059bd03fc093d1f3305?pvs=4", label: "이용약관" },
    { href: "https://picturesque-ox-876.notion.site/1c0ae7b4e9538087af36e09f550597cd?pvs=4", label: "오픈소스 라이센스" }
  ];
  
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-[500px] mx-auto px-4">
        {/* 서비스 이름 및 다운로드 링크 */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="group">
            <h2 className="font-bold text-3xl relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-purple-600 to-purple-800 
              filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] 
              transition-all duration-300 group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
                찐심
              </span>
              <span className="absolute -z-10 top-[2px] left-[2px] text-purple-200 blur-[1px] opacity-60">
                찐심
              </span>
              <span className="absolute -z-20 top-[3px] left-[3px] text-purple-100 blur-[2px] opacity-50">
                찐심
              </span>
            </h2>
          </Link>
          
          <button 
            onClick={() => setIsDialogOpen(true)} 
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            앱 다운로드 ↗
          </button>
        </div>
        
        {/* 네비게이션 링크 */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
              target={link.href.startsWith('http') ? "_blank" : "_self"}
              rel={link.href.startsWith('http') ? "noopener noreferrer" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* 회사 정보 */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <p className="text-xs text-gray-500 mb-2">
            (주)찐심 | 대표 허성윤
          </p>
          <p className="text-xs text-gray-500 mb-2">
            주소: 서울시 강서구 방화동로
          </p>
          <p className="text-xs text-gray-500 mb-2">
            사업자번호 | 123-45-67890 | 사업자정보확인
          </p>
          <p className="text-xs text-gray-500">
            통신판매업: 2024-서울강남-01234
          </p>
        </div>
        
        {/* 저작권 및 소셜 링크 */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Copyright © {currentYear} JJinSim
          </p>
          
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 앱 출시 예정 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">안내</DialogTitle>
            <DialogDescription className="text-center text-lg font-medium mt-4">
              곧 출시 예정입니다😊
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </footer>
  );
} 