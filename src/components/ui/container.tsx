"use client";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className="w-full min-h-screen bg-white">
      <div 
        className={cn(
          "w-full max-w-[500px] mx-auto bg-white min-h-screen relative",
          className
        )} 
        {...props}
      >
        {children}
      </div>
    </div>
  );
} 