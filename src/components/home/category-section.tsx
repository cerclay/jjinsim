"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Heart, Sparkle, SquareCode } from 'lucide-react';

export function CategorySection() {
  const categories = [
    {
      id: 'psychology',
      name: '심리',
      description: '성격, 행동 유형',
      icon: Brain,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      href: '/categories/psychology',
    },
    {
      id: 'fortune',
      name: '운세',
      description: '타로, 사주, 점성술',
      icon: Sparkle,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-100',
      textColor: 'text-indigo-700',
      href: '/categories/fortune',
    },
    {
      id: 'relationship',
      name: '연애',
      description: '연애, 결혼, 이상형',
      icon: Heart,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-100',
      textColor: 'text-pink-700',
      href: '/categories/relationship',
    },
    {
      id: 'color',
      name: '색감',
      description: '색맹, 퍼스널컬러',
      icon: SquareCode,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      href: '/categories/color',
    }
  ];

  return (
    <div className="pb-6 pt-4">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">카테고리</h2>
        <Link href="/categories" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
          더보기
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link href={category.href} key={category.id}>
              <motion.div
                className={`rounded-xl p-4 ${category.lightColor} border border-gray-100 shadow-sm flex items-center`}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`${category.color} rounded-full p-2 mr-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className={`font-bold ${category.textColor} block`}>
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 block">
                    {category.description}
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 