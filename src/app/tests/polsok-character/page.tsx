"use client";

import React from "react";
import TestContent from "./components/TestContent";
import { motion } from "framer-motion";

export default function PolsokCharacterTest() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-[500px] mx-auto px-4 py-6">
        <TestContent />
      </div>
    </div>
  );
} 