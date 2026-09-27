'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, Menu, X, User, Zap, ChevronDown, LayoutDashboard, 
  GraduationCap, Building2, Lock, LogOut, Award, Settings, 
  Terminal, Trophy, Users, BookOpen, CreditCard, Sparkles, Flag
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  // Primary Ecosystem Navigation Links
  const mainNavLinks = [
    { href: '/', label: 'Bosh Sahifa' },
    { href: '/learn', label: "O'rganish" },
    { href: '/labs', label: 'Laboratoriyalar' },
    { href: '/ctf', label: 'CTF' },
    { href: '/tournaments', label: 'Turnirlar' },
    { href: '/terminal', label: 'Terminal' },
    { href: '/chat', label: 'Hamjamiyat' },
    { href: '/ranking', label: 'Reyting' },
    { href: '/certificates', label: 'Sertifikatlar' },
    { href: '/pricing', label: 'Narxlar', isPro: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070A0E]/95 backdrop-blur-md border-b border-gray-800/80 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-black text-lg tracking-tight text-white">
              CYBER<span className="text-cyan-400">TRIP</span>
            </span>
            <span className="text-[9px] font-mono font-bold text-black bg-cyan-400 px-1 py-0.2 rounded">
              .UZ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {mainNavLinks.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                <span>{item.label}</span>
                {item.isPro && (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-black px-1.5 py-0.2 rounded font-mono shadow-sm">
                    PRO
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Medium Screen Responsive Nav (Compact 6 primary items) */}
        <nav className="hidden lg:flex xl:hidden items-center space-x-1">
          {mainNavLinks.slice(0, 7).map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Profil & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          
          {/* Profil Button & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                pathname.startsWith('/dashboard') || profileDropdownOpen
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-gray-900/90 border-gray-800 text-gray-200 hover:border-gray-700'
              }`}
            >
              <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-extrabold text-[10px]">
                <User className="w-3 h-3 text-black" />
              </div>
              <span>Profil</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-[#0B0F17] border border-gray-800 p-2 shadow-2xl space-y-1 animate-in fade-in-50 zoom-in-95 z-50">
                <div className="px-3 py-2 border-b border-gray-800/80 mb-1">
                  <span className="text-xs font-bold text-white block">Talaba Kabineti</span>
                  <span className="text-[10px] text-gray-500 block font-mono">student@cybertrip.uz</span>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                  <span>Dashboard (Boshqaruv)</span>
                </Link>

                <Link
                  href="/dashboard/learning"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Mening Dasturlarim</span>
                </Link>

                <Link
                  href="/dashboard/labs"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Mening Laboratoriyalarim</span>
                </Link>

                <Link
                  href="/ctf/scoreboard"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-purple-400 transition-colors"
                >
                  <Flag className="w-4 h-4 text-purple-400" />
                  <span>Mening CTF Progressim</span>
                </Link>

                <Link
                  href="/my-tournaments"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-yellow-400 transition-colors"
                >
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Mening Turnirlarim</span>
                </Link>

                <Link
                  href="/teams"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Jamoa (Team)</span>
                </Link>

                <Link
                  href="/dashboard/achievements"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-amber-400 transition-colors"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Yutuqlar (Achievements)</span>
                </Link>

                <Link
                  href="/account/subscription"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-emerald-400 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Obuna (Subscription)</span>
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-cyan-400 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>Sozlamalar</span>
                </Link>

                <div className="border-t border-gray-800/80 my-1" />

                <Link
                  href="/instructor"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-purple-400 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Ustoz Paneli</span>
                </Link>

                <Link
                  href="/company"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-emerald-400 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Kompaniya Paneli</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-gray-900 transition-colors"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Admin Paneli</span>
                </Link>

                <div className="border-t border-gray-800/80 my-1" />

                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2.5 p-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Chiqish</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F17] border-b border-gray-800 px-4 py-4 space-y-1 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
          {mainNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                pathname === item.href
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-300 hover:bg-gray-900'
              }`}
            >
              <span>{item.label}</span>
              {item.isPro && (
                <span className="text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-black px-1.5 py-0.2 rounded font-mono">
                  PRO
                </span>
              )}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-500 px-3 block">Kabinet Havolalari</span>
            <Link
              href="/dashboard"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-cyan-400 bg-gray-900/60"
            >
              <span>Boshqaruv Paneli</span>
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/teams"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-gray-900"
            >
              <span>Jamoa (Team)</span>
              <Users className="w-4 h-4" />
            </Link>
            <Link
              href="/my-tournaments"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-gray-900"
            >
              <span>Mening Turnirlarim</span>
              <Trophy className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
