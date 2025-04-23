'use client';

import { SessionProvider } from 'next-auth/react';
import { SessionProvider as CustomSessionProvider } from '@/components/auth/session-provider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Providers from '@/app/providers';
import { AuthProvider } from '@/components/auth/auth-provider';
import { RootLayoutClient } from './root-layout-client';
import { Toaster } from 'sonner';
import Header from './header';
import Footer from './footer';
import Clarity from '@/third-parties/Clarity';
import { ChannelIO } from '@/third-parties/Channelio';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomSessionProvider>
        <ThemeProvider 
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <RootLayoutClient>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster richColors />
                <Clarity />
                <ChannelIO />
              </RootLayoutClient>
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </CustomSessionProvider>
    </SessionProvider>
  );
} 