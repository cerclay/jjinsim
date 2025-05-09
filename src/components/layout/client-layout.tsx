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
import AdContainer from '@/components/ads/AdContainer';
import AdSense from '@/third-parties/AdSense';
import { Container } from '@/components/ui/container';

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
                <div className="bg-white">
                  <Container>
                    <div className="flex min-h-screen flex-col">
                      <Header />
                      <div suppressHydrationWarning className="w-full max-w-[500px] mx-auto mt-4">
                        <AdContainer 
                          slot="7259169409"
                          style={{
                            maxWidth: '500px',
                            width: '100%',
                          }}
                        />
                      </div>
                      <main className="flex-1">{children}</main>
                      <div suppressHydrationWarning className="w-full max-w-[500px] mx-auto mb-4">
                        <AdContainer 
                          slot="7259169409"
                          style={{
                            maxWidth: '500px',
                            width: '100%',
                          }}
                        />
                      </div>
                      <Footer />
                    </div>
                  </Container>
                </div>
                <Toaster richColors />
                <Clarity />
                <ChannelIO />
                <AdSense />
              </RootLayoutClient>
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </CustomSessionProvider>
    </SessionProvider>
  );
} 