"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface MbtiCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  onClick?: () => void;
}

export function MbtiCard({
  title,
  description,
  duration,
  participants,
  onClick,
}: MbtiCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card
        className="relative overflow-hidden cursor-pointer bg-gradient-to-br from-violet-500 to-purple-600 border-none"
        onClick={onClick}
      >
        <div className="relative z-10 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-white/90 mb-4">{description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span>{participants}</span>
            </div>
          </div>
        </div>
        {/* 배경 장식 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
      </Card>
    </motion.div>
  );
} 