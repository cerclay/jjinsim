"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ColorBlindnessCard } from '@/components/home/color-blindness-card';

export function FeaturedColorBlindness() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }}
      className="mb-1"
    >
      <ColorBlindnessCard />
    </motion.div>
  );
} 