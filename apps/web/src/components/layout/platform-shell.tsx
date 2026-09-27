'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Marketing & Public Legal routes use the Public Navbar + Footer
  const isPublicLanding = 
    pathname === '/' ||
    pathname?.startsWith('/auth') ||
    pathname === '/pricing' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname === '/responsible-disclosure' ||
    pathname?.startsWith('/verify') ||
    pathname === '/company' ||
    pathname === '/checkout';

  // Admin routes handle their own layout & security gate
  const isAdminRoute = pathname?.startsWith('/admin');

  // Full-screen immersive workbenches (Lab session, 3-column Lesson viewer)
  const isImmersiveRoute = 
    pathname?.includes('/session') ||
    (pathname?.startsWith('/learn/') && (pathname.match(/\//g) || []).length >= 4);

  if (isPublicLanding) {
    return (
      <div className="min-h-screen flex flex-col bg-[#070A0E] text-gray-100">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  if (isAdminRoute || isImmersiveRoute) {
    return <>{children}</>;
  }

  // All Core Platform Pages: Command Center Shell (LEFT SIDEBAR + TOPBAR + MAIN)
  return (
    <div className="flex h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto bg-[#070A0E] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
