"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CategorySection() {
  const categories = [
    {
      id: 'psychology',
      name: '심리',
      icon: '🧠',
      color: 'bg-purple-500',
      href: '/categories/psychology',
    },
    {
      id: 'counseling',
      name: '상담',
      icon: '💬',
      color: 'bg-blue-500',
      href: '/categories/counseling',
    },
    {
      id: 'others',
      name: '기타',
      icon: '✨',
      color: 'bg-orange-500',
      href: '/categories/others',
    }
  ];

  return (
    <div className="overflow-x-auto px-4 pb-2">
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <Link href={category.href} key={category.id}>
            <motion.div
              className={`${category.color} rounded-xl p-4 flex flex-col items-center justify-center h-24 text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-xs mt-1">테스트</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
} 