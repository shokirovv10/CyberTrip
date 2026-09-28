'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, Menu, X, User, ChevronDown, 
  Terminal, Trophy, Users, BookOpen, Award, 
  Settings, LogOut, CheckCircle2, Globe, Sparkles
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  // Clean, focused primary navigation links (per Section 11)
  const primaryLinks = [
    { href: '/learn', label: "O'rganish" },
    { href: '/labs', label: 'Labs' },
    { href: '/ctf', label: 'CTF' },
    { href: '/tournaments', label: 'Turnirlar' },
    { href: '/chat', label: 'Community' },
    { href: '/pricing', label: 'Pricing' },
  ];

  // Secondary links inside "Ko'proq" dropdown
  const secondaryLinks = [
    { href: '/terminal', label: 'Linux Terminal', icon: Terminal },
    { href: '/ranking', label: 'Reyting va Scoreboard', icon: Trophy },
    { href: '/certificates', label: 'Sertifikatlar', icon: Award },
    { href: '/glossary', label: 'Kiber-Lug\'at', icon: BookOpen },
    { href: '/verify/CT-2026-8841', label: 'Sertifikat Tekshiruvi', icon: CheckCircle2 },
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

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Secondary "Ko'proq" Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-900/60 transition-all flex items-center space-x-1"
            >
              <span>Ko'proq</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#0B0F17] border border-gray-800 rounded-2xl p-2 shadow-2xl space-y-1 animate-dropdown-fade z-50">
                {secondaryLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Auth / Profile Controls */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/profile"
            className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-xs font-bold text-gray-200 hover:text-white transition-colors"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profil</span>
          </Link>

          <Link href="/auth/login">
            <button className="px-4 py-2 text-xs font-bold text-gray-300 hover:text-white transition-colors">
              Kirish
            </button>
          </Link>

          <Link href="/auth/register">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black text-xs font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all">
              Ro'yxatdan o'tish
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <Link
            href="/profile"
            className="p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-xl"
          >
            <User className="w-4 h-4 text-cyan-400" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070A0E] border-b border-gray-800 px-4 py-6 space-y-4">
          <div className="space-y-1">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:bg-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-800/80 space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 block">
              Boshqa Bo'limlar
            </span>
            {secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-900 rounded-xl"
              >
                <item.icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-800/80 flex items-center space-x-3">
            <Link href="/auth/login" className="flex-1">
              <button className="w-full py-2.5 bg-gray-900 border border-gray-800 text-xs font-bold text-gray-200 rounded-xl">
                Kirish
              </button>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <button className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-xs font-black rounded-xl">
                Ro'yxatdan o'tish
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
