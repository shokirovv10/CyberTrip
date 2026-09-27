'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { 
  Search, 
  Menu, 
  X, 
  Shield, 
  Trophy, 
  Users, 
  MessageSquare, 
  ChevronDown, 
  GraduationCap, 
  Building2, 
  LayoutDashboard,
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from '../ui/search-modal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/learn', label: "O'rganish" },
    { href: '/labs', label: 'Laboratoriyalar' },
    { href: '/ctf', label: 'CTF' },
    { href: '/tournaments', label: 'Turnirlar', badge: 'Jonli' },
    { href: '/terminal', label: 'Terminal' },
    { href: '/ranking', label: 'Reyting' },
    { href: '/certificates', label: 'Sertifikatlar' },
    { href: '/pricing', label: 'Narxlar' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-subtle bg-base/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 xl:gap-7">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-accent-green" />
              <span className="font-bold text-xl tracking-tight text-primary">CYBERTRIP<span className="text-accent-green">.UZ</span></span>
            </Link>
            
            <div className="hidden xl:flex items-center gap-4 2xl:gap-5">
              {navLinks.slice(0, 6).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="relative text-xs 2xl:text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* Community Dropdown (Teams & Chat) */}
              <div className="relative">
                <button
                  onClick={() => setCommunityDropdown(!communityDropdown)}
                  onBlur={() => setTimeout(() => setCommunityDropdown(false), 200)}
                  className="flex items-center gap-1 text-xs 2xl:text-sm font-medium text-secondary hover:text-primary transition-colors"
                >
                  <span>Hamjamiyat</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {communityDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-card border border-subtle p-2 shadow-2xl z-50 space-y-1">
                    <Link
                      href="/teams"
                      className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated hover:text-accent-green transition-colors"
                    >
                      <Users className="w-4 h-4 text-accent-green" />
                      <div>
                        <div className="font-semibold text-primary">Jamoalar (Teams)</div>
                        <div className="text-[10px] text-secondary">Kiber jamoalarga qo'shiling</div>
                      </div>
                    </Link>

                    <Link
                      href="/chat"
                      className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated hover:text-accent-blue transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="font-semibold text-primary">Umumiy Chat</div>
                        <div className="text-[10px] text-secondary">Real-vaqt muloqot</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.slice(6).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-xs 2xl:text-sm font-medium text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 bg-elevated border border-subtle rounded-md text-xs text-secondary hover:text-primary transition-colors" 
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Qidirish...</span>
              <kbd className="ml-1.5 px-1 py-0.2 text-[9px] bg-subtle rounded font-mono">Ctrl+K</kbd>
            </button>

            {/* Quick Switcher for Dashboards / Workspaces */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                onBlur={() => setTimeout(() => setUserDropdown(false), 200)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-elevated/70 border border-subtle rounded-md text-xs font-medium text-primary hover:border-gray-600 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-accent-green" />
                <span>Panellar</span>
                <ChevronDown className="w-3 h-3 text-secondary" />
              </button>

              {userDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-card border border-subtle p-2 shadow-2xl z-50 space-y-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Mening Profilim</span>
                  </Link>
                  <Link
                    href="/instructor"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-yellow-400" />
                    <span>Ustoz Paneli (Instructor)</span>
                  </Link>
                  <Link
                    href="/company"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>Kompaniya Kabineti</span>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-elevated transition-colors"
                  >
                    <Lock className="w-4 h-4 text-purple-400" />
                    <span>Admin Boshqaruv</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-xs">Kirish</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm" className="text-xs">Ro'yxatdan o'tish</Button>
            </Link>
          </div>

          <button className="xl:hidden text-secondary p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-30 top-16 bg-base border-t border-subtle flex flex-col p-5 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="flex items-center justify-between py-3 text-base font-medium text-primary border-b border-subtle" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            
            <div className="py-2 border-b border-subtle">
              <span className="text-xs uppercase font-semibold text-secondary block mb-1">Hamjamiyat</span>
              <Link
                href="/teams"
                className="py-2 text-sm text-primary flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-4 h-4 text-accent-green" />
                <span>Jamoalar (Teams)</span>
              </Link>
              <Link
                href="/chat"
                className="py-2 text-sm text-primary flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Umumiy Chat</span>
              </Link>
            </div>

            <div className="py-2 border-b border-subtle">
              <span className="text-xs uppercase font-semibold text-secondary block mb-1">Maxsus Panellar</span>
              <Link
                href="/instructor"
                className="py-2 text-sm text-yellow-400 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Ustoz Paneli</span>
              </Link>
              <Link
                href="/company"
                className="py-2 text-sm text-blue-400 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="w-4 h-4" />
                <span>Kompaniya Kabineti</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/auth/login"><Button variant="outline" className="w-full">Kirish</Button></Link>
            <Link href="/auth/register"><Button variant="primary" className="w-full">Ro'yxatdan o'tish</Button></Link>
          </div>
        </div>
      )}
      
      <SearchModal />
    </>
  );
}
