'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, Search, Bell, User, Zap, LogOut, Settings, 
  Shield, ExternalLink, ChevronDown, CheckCircle2, Award 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>({
    username: 'pentester_01',
    role: 'STUDENT',
  });
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchApi<{ user: { username: string; role: string } }>('/auth/me')
      .then((res) => {
        if (res && res.user) setUser(res.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } catch {}
    sessionStorage.removeItem('cybertrip_admin_auth');
    router.push('/');
  };

  // Human-readable path context
  const getBreadcrumb = () => {
    if (!pathname || pathname === '/dashboard') return 'BOSHQARUV MARKAZI';
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((p) => p.toUpperCase().replace(/-/g, ' ')).join(' / ');
  };

  return (
    <header className="h-16 bg-[#0B0F17] border-b border-gray-800/80 px-4 sm:px-6 flex items-center justify-between z-30 font-sans">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
          aria-label="Menyuni ochish"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-gray-400">
          <span className="text-emerald-400 font-bold">CYBERTRIP</span>
          <span>/</span>
          <span className="text-gray-200 font-medium">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Right: Quick stats, search, notifications, profile */}
      <div className="flex items-center space-x-3">
        {/* User Level and XP Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold font-mono">
            <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>DAR. 14</span>
          </div>
          <span className="text-gray-600">|</span>
          <span className="font-mono text-gray-300 font-semibold">4,850 XP</span>
        </div>

        {/* Global Quick Search Link */}
        <Link
          href="/labs"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors text-xs"
        >
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <span className="hidden sm:inline">Qidiruv...</span>
          <kbd className="hidden sm:inline bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono">Ctrl+K</kbd>
        </Link>

        {/* Notifications */}
        <button
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-colors relative"
          aria-label="Xabarnomalar"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2"></span>
        </button>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-600 border border-emerald-500/40 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-emerald-500/10">
              {user?.username ? user.username.substring(0, 2).toUpperCase() : 'CT'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-gray-200 leading-tight">
                {user?.username || 'Talaba'}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">
                {user?.role === 'ADMIN' ? 'ADMIN' : 'SECURITY TALABA'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B0F17] border border-gray-800 shadow-2xl py-2 z-50 animate-msg-in text-xs">
              <div className="px-4 py-2 border-b border-gray-800">
                <p className="font-bold text-white">{user?.username}</p>
                <p className="text-[11px] text-gray-400 font-mono truncate">talaba@cybertrip.uz</p>
              </div>

              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Mening Profilim</span>
                </Link>

                <Link
                  href="/progress"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Yutuqlar & Statistika</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>Sozlamalar</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-gray-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2.5 px-4 py-2 text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Tizimdan chiqish</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
