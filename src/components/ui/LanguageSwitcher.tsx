"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export function LanguageSwitcher() {
  const { locale, changeLocale, isLoaded } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  // 언어 변경 처리
  const handleLanguageChange = (newLocale: "ko" | "en") => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  // 화면 밖 클릭 시 드롭다운 닫기 - 개선된 방식
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current && 
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isLoaded) return null;

  return (
    <div className="language-switcher-container" ref={switcherRef}>
      <motion.button
        className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Globe
          size={14}
          className="text-gray-600 dark:text-gray-300"
          strokeWidth={2}
        />
        <span>
          {locale === "ko" ? "한국어" : "English"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10 min-w-[140px]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col p-1">
              <LanguageOption
                locale="ko"
                name="한국어"
                flag="🇰🇷"
                isSelected={locale === "ko"}
                onClick={() => handleLanguageChange("ko")}
              />
              <LanguageOption
                locale="en"
                name="English"
                flag="🇺🇸"
                isSelected={locale === "en"}
                onClick={() => handleLanguageChange("en")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 언어 옵션 컴포넌트
interface LanguageOptionProps {
  locale: string;
  name: string;
  flag: string;
  isSelected: boolean;
  onClick: () => void;
}

function LanguageOption({
  locale,
  name,
  flag,
  isSelected,
  onClick,
}: LanguageOptionProps) {
  return (
    <motion.button
      className={`flex items-center gap-2 text-left px-4 py-2.5 text-sm rounded-lg w-full ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      }`}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-base">{flag}</span>
      <span>{name}</span>
      {isSelected && (
        <motion.div
          className="ml-auto w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      )}
    </motion.button>
  );
} 