'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, LayoutDashboard, BookOpen, Terminal, Flag, 
  Trophy, TrendingUp, Award, Settings, User, LogOut, 
  ShieldAlert, ChevronRight, Sparkles, X, Activity, Flame
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if current user is admin
    if (typeof window !== 'undefined') {
      const adminSession = sessionStorage.getItem('cybertrip_admin_auth') === 'true';
      if (adminSession) {
        setIsAdmin(true);
      } else {
        fetchApi<{ role: string }>('/auth/me')
          .then((user) => {
            if (user?.role === 'ADMIN') setIsAdmin(true);
          })
          .catch(() => {});
      }
    }
  }, []);

  const coreNav = [
    { href: '/dashboard', label: 'Boshqaruv Markazi', icon: LayoutDashboard },
    { href: '/learn', label: 'Ta\'lim & Kurslar', icon: BookOpen },
    { href: '/labs', label: 'Laboratoriyalar', icon: Terminal },
    { href: '/ctf', label: 'CTF Maydoni', icon: Flag },
    { href: '/leaderboard', label: 'Peshqadamlar', icon: Trophy },
    { href: '/progress', label: 'O\'sish Ko\'rsatkichi', icon: TrendingUp },
    { href: '/certificates', label: 'Sertifikatlar', icon: Award },
  ];

  const secondaryNav = [
    { href: '/profile', label: 'Mening Profilim', icon: User },
    { href: '/settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B0F17] border-r border-gray-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand */}
        <div className="h-16 px-5 border-b border-gray-800/80 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-black text-lg tracking-tight text-white">
                CYBER<span className="text-emerald-400">TRIP</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-800 px-1 py-0.2 rounded">
                SEC
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Lab Status Banner */}
        <div className="px-3 pt-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-gray-300 font-medium">Poligon Holati:</span>
            </div>
            <span className="font-mono text-emerald-400 font-bold uppercase text-[10px]">
              ONLINE / AKTIV
            </span>
          </div>
        </div>

        {/* Core Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
              ASOSIY TIZIM
            </div>
            {coreNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/5'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-850/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Secondary User Navigation */}
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
              SHAXSIY
            </div>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-850/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}

            {/* Admin panel link only for authorized admin */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors border border-rose-500/20 mt-2"
              >
                <div className="flex items-center space-x-3">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Admin Panel</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                  ADMIN
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Footer Area: User Streak and Status */}
        <div className="p-3 border-t border-gray-800/80 bg-[#090D13]">
          <Link
            href="/progress"
            className="flex items-center justify-between p-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-200">12 kunlik Streak</p>
                <p className="text-[10px] text-gray-400">Har kunlik amaliyot</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </Link>
        </div>
      </aside>
    </>
  );
}
