import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PlatformShell } from '@/components/layout/platform-shell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CYBERTRIP.UZ - Professional kiberxavfsizlik ta\'limi',
  description: 'Nazariya, amaliyot va real laboratoriyalar orqali kiberxavfsizlikni o\'rganing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <body className={`${inter.variable} font-sans bg-[#070A0E] text-gray-100 min-h-screen`}>
        <PlatformShell>
          {children}
        </PlatformShell>
      </body>
    </html>
  );
}
