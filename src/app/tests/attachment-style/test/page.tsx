"use client";

import React, { Suspense } from "react";
import { AttachmentTest } from "@/features/attachment-style/components/AttachmentTest";

function TestLoading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
  );
}

export default function AttachmentStyleTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<TestLoading />}>
        <AttachmentTest />
      </Suspense>
    </div>
  );
} 