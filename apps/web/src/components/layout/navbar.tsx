'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, ChevronDown, Search, Menu, X, Users, MessageSquare, 
  Terminal, Trophy, Flag, GraduationCap, Building2, LayoutDashboard, 
  Sparkles, Lock, ArrowRight, BookOpen, Layers 
} from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const practiceRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (practiceRef.current && !practiceRef.current.contains(event.target as Node)) {
        setPracticeOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(event.target as Node)) {
        setCommunityOpen(false);
      }
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setWorkspaceOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPracticeOpen(false);
    setCommunityOpen(false);
    setWorkspaceOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070A0E]/90 backdrop-blur-md border-b border-gray-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-lg tracking-tight text-white">
                CYBER<span className="text-cyan-400">TRIP</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-black bg-cyan-400 px-1 rounded">
                .UZ
              </span>
            </div>
          </Link>

          {/* Primary Nav Links (Compact, Organized) */}
          <nav className="hidden lg:flex items-center space-x-1">
            
            {/* O'rganish */}
            <Link
              href="/learn"
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname.startsWith('/learn')
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              O'rganish
            </Link>

            {/* Amaliyot Dropdown */}
            <div className="relative" ref={practiceRef}>
              <button
                onClick={() => setPracticeOpen(!practiceOpen)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  practiceOpen || pathname.startsWith('/labs') || pathname.startsWith('/terminal') || pathname.startsWith('/ctf')
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                <span>Amaliyot</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${practiceOpen ? 'rotate-180 text-cyan-400' : 'text-gray-500'}`} />
              </button>

              {practiceOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#0B0F17] border border-gray-800 p-2 shadow-2xl space-y-1 animate-in fade-in-50 zoom-in-95">
                  <Link
                    href="/labs"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Laboratoriyalar (50+)</div>
                      <div className="text-[10px] text-gray-400">Brauzerda real zaifliklar</div>
                    </div>
                  </Link>

                  <Link
                    href="/terminal"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Linux Terminal</div>
                      <div className="text-[10px] text-gray-400">Shaxsiy Kali Linux muhiti</div>
                    </div>
                  </Link>

                  <Link
                    href="/ctf"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform">
                      <Flag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">CTF Poligoni</div>
                      <div className="text-[10px] text-gray-400">Flag qidirish va chempionatlar</div>
                    </div>
                  </Link>

                  <Link
                    href="/tournaments"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-105 transition-transform">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors flex items-center space-x-1.5">
                        <span>Turnirlar</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-gray-400">Sovrinli kiber musobaqalar</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Hamjamiyat Dropdown */}
            <div className="relative" ref={communityRef}>
              <button
                onClick={() => setCommunityOpen(!communityOpen)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  communityOpen || pathname.startsWith('/teams') || pathname.startsWith('/chat') || pathname.startsWith('/ranking')
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                <span>Hamjamiyat</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${communityOpen ? 'rotate-180 text-cyan-400' : 'text-gray-500'}`} />
              </button>

              {communityOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl bg-[#0B0F17] border border-gray-800 p-2 shadow-2xl space-y-1 animate-in fade-in-50 zoom-in-95">
                  <Link
                    href="/teams"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Jamoalar (Teams)</div>
                      <div className="text-[10px] text-gray-400">Jamoaga qo'shilish yoki tuzish</div>
                    </div>
                  </Link>

                  <Link
                    href="/chat"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Umumiy Chat</div>
                      <div className="text-[10px] text-gray-400">Kiber mutaxassislar forumi</div>
                    </div>
                  </Link>

                  <Link
                    href="/ranking"
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-gray-900/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Reyting Jadvali</div>
                      <div className="text-[10px] text-gray-400">Top xakerlar va jamoalar</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Tariflar */}
            <Link
              href="/pricing"
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname === '/pricing'
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              Tariflar
            </Link>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          
          {/* Search Trigger */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-900/90 border border-gray-800 rounded-xl text-xs text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-gray-500" />
            <span>Qidiruv</span>
            <kbd className="text-[9px] bg-black border border-gray-800 px-1.5 py-0.5 rounded text-gray-500 font-mono">⌘K</kbd>
          </button>

          {/* Workspace Switcher Dropdown */}
          <div className="relative" ref={workspaceRef}>
            <button
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-gray-200 hover:border-gray-700 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Kabinet</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {workspaceOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl bg-[#0B0F17] border border-gray-800 p-2 shadow-2xl space-y-1 animate-in fade-in-50 zoom-in-95">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Talaba Kabineti</span>
                </Link>
                <Link
                  href="/instructor"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Ustoz Paneli</span>
                </Link>
                <Link
                  href="/company"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Kompaniya Paneli</span>
                </Link>
                <div className="border-t border-gray-800/80 my-1" />
                <Link
                  href="/admin"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-gray-900 transition-colors"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Admin Boshqaruvi</span>
                </Link>
              </div>
            )}
          </div>

          {/* Auth Button */}
          <Link href="/auth/login" className="hidden sm:inline-block">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-1.5">
              <span>Kirish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F17] border-b border-gray-800 px-4 py-4 space-y-3">
          <Link href="/learn" className="block text-sm font-semibold text-gray-300 py-1.5">
            O'rganish (Kurslar)
          </Link>
          <div className="pt-2 border-t border-gray-800 space-y-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Amaliyot</span>
            <Link href="/labs" className="block text-xs font-medium text-gray-400 pl-2">Laboratoriyalar (50+)</Link>
            <Link href="/terminal" className="block text-xs font-medium text-gray-400 pl-2">Linux Terminal</Link>
            <Link href="/ctf" className="block text-xs font-medium text-gray-400 pl-2">CTF Musobaqalar</Link>
            <Link href="/tournaments" className="block text-xs font-medium text-gray-400 pl-2">Jonli Turnirlar</Link>
          </div>
          <div className="pt-2 border-t border-gray-800 space-y-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Hamjamiyat</span>
            <Link href="/teams" className="block text-xs font-medium text-gray-400 pl-2">Jamoalar (Teams)</Link>
            <Link href="/chat" className="block text-xs font-medium text-gray-400 pl-2">Umumiy Chat</Link>
            <Link href="/ranking" className="block text-xs font-medium text-gray-400 pl-2">Reyting</Link>
          </div>
          <div className="pt-3 border-t border-gray-800 flex space-x-2">
            <Link href="/auth/login" className="flex-1">
              <button className="w-full py-2 bg-cyan-500 text-black font-bold text-xs rounded-xl">
                Kirish / Ro'yxatdan o'tish
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
