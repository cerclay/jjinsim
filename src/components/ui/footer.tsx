"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="border-t py-8 mt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 max-w-md mx-auto">
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item} whileHover={{ scale: 1.05 }}>
            <Link href="/" className="text-lg font-bold gradient-text">
              찐심
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-xs text-muted-foreground mt-2 max-w-md leading-relaxed"
            variants={item}
          >
            당신의 내면을 비추는 심리테스트 플랫폼입니다.
            <br />
            자기 발견의 즐거움을 찐심과 함께 경험해보세요.
            <br />
            나만의 특별한 심리 여정을 통해 더 나은 자신을 만나보세요.
          </motion.p>
          
          <motion.div 
            className="flex space-x-5 mt-5"
            variants={item}
          >
            <motion.div whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-pink-500" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-blue-400" aria-label="Twitter">
                <Twitter size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-blue-600" aria-label="Facebook">
                <Facebook size={18} />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-x-5 mt-6 text-xs text-muted-foreground"
            variants={item}
          >
            <motion.div whileHover={{ y: -2, color: "#000" }}>
              <Link href="/about" className="hover:text-primary">서비스 소개</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, color: "#000" }}>
              <Link href="https://picturesque-ox-876.notion.site/1c0ae7b4e9538066a2daeceaae197c57?pvs=4" target="_blank" rel="noopener noreferrer" className="hover:text-primary">개인정보 처리방침</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, color: "#000" }}>
              <Link href="https://picturesque-ox-876.notion.site/1c0ae7b4e9538059bd03fc093d1f3305?pvs=4" target="_blank" rel="noopener noreferrer" className="hover:text-primary">이용약관</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, color: "#000" }}>
              <Link href="https://picturesque-ox-876.notion.site/1c0ae7b4e9538087af36e09f550597cd?pvs=4" target="_blank" rel="noopener noreferrer" className="hover:text-primary">오픈소스 라이센스</Link>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-xs text-muted-foreground mt-7"
            variants={item}
          >
            © 2024 찐심(JJinSim). All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 