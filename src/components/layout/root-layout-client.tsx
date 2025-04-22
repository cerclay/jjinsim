'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { SessionProvider } from '@/components/auth/session-provider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Toaster } from 'sonner';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from '@/app/providers';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/app/gtag';
import Clarity from '@/third-parties/Clarity';

interface RootLayoutClientProps {
  children: React.ReactNode;
  className: string;
}

export function RootLayoutClient({ children, className }: RootLayoutClientProps) {
  return (
    <body className={className}>
      <Toaster position="top-center" />
      <Clarity />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <NextAuthSessionProvider>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Providers>
              <Header />
              {/* 언어 전환 버튼 */}
              <div className="fixed top-4 right-4 z-[9999]">
                <LanguageSwitcher />
              </div>
              <main className="flex-grow flex flex-col bg-white">
                {children}
              </main>
              <Footer />
            </Providers>
          </ThemeProvider>
        </SessionProvider>
      </NextAuthSessionProvider>
    </body>
  );
} 