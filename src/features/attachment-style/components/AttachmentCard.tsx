"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { TEST_INFO } from "../constants/testData";

interface AttachmentCardProps {
  title?: string;
  description?: string;
  duration?: string;
  participants?: number | string;
  likes?: number | string;
  onClick?: () => void;
}

export function AttachmentCard({
  title = TEST_INFO.title,
  description = TEST_INFO.description,
  duration = TEST_INFO.duration,
  participants = TEST_INFO.participants,
  likes = TEST_INFO.likes,
  onClick
}: AttachmentCardProps) {
  const participantsText = typeof participants === 'number' 
    ? participants.toLocaleString() 
    : participants;
  
  const likesText = typeof likes === 'number'
    ? likes.toLocaleString()
    : likes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={TEST_INFO.thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-md">
            {title}
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-1 line-clamp-2 drop-shadow-sm">
            {description}
          </p>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
          <Clock size={12} className="mr-1" />
          {duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{participantsText}명 참여</span>
          </div>
          
          <div className="flex items-center">
            <Heart size={16} className="mr-1 text-rose-500" />
            <span>{likesText}</span>
          </div>
        </div>
        
        <Link href="/tests/attachment-style/test" passHref>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            테스트 시작하기
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
} 