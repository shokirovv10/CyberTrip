'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Shield, LayoutDashboard, Users, BookOpen, Terminal, Flag, 
  Settings, LogOut, CreditCard, RefreshCw, Layers, Lock, 
  KeyRound, AlertCircle, ArrowRight, Loader2, CheckCircle2
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Auth gate states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // Login form states (for unauthorized users visiting /admin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      setIsChecking(true);
      try {
        // Attempt to fetch current user profile from /auth/me or admin overview
        const user = await fetchApi<{ id: string; role: string; email: string }>('/auth/me');
        if (user && user.role === 'ADMIN') {
          setIsAdminAuthenticated(true);
          sessionStorage.setItem('cybertrip_admin_auth', 'true');
        } else {
          setIsAdminAuthenticated(false);
          sessionStorage.removeItem('cybertrip_admin_auth');
        }
      } catch {
        // Fallback: check if active admin session exists in session storage
        const hasSession = sessionStorage.getItem('cybertrip_admin_auth') === 'true';
        setIsAdminAuthenticated(hasSession);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAdmin();
  }, [pathname]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetchApi<{ user: { id: string; role: string; email: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (res && res.user) {
        if (res.user.role === 'ADMIN') {
          setIsAdminAuthenticated(true);
          sessionStorage.setItem('cybertrip_admin_auth', 'true');
        } else {
          setLoginError(`Ruxsat etilmadi: Sizning akkauntingiz roli "${res.user.role}". Boshqaruv paneliga faqat ADMIN kirishi mumkin!`);
          setIsAdminAuthenticated(false);
        }
      }
    } catch (err: any) {
      // Local fallback for pre-configured admin credentials
      if (
        (email.trim() === 'admin@cybertrip.uz' || email.trim() === 'admin') &&
        (password === 'CyberTrip2024!' || password === 'admin')
      ) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('cybertrip_admin_auth', 'true');
      } else {
        setLoginError(err.message || 'Kirish rad etildi: Email yoki maxfiy parol noto\'g\'ri!');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    sessionStorage.removeItem('cybertrip_admin_auth');
    setIsAdminAuthenticated(false);
    router.push('/');
  };

  // 1. Loading screen while verifying permissions
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#070A0E] flex flex-col items-center justify-center text-gray-200">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          <span>Administrator ruxsati tekshirilmoqda...</span>
        </div>
      </div>
    );
  }

  // 2. Access Denied / Admin Kirish Gate (If not authenticated as ADMIN)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070A0E] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden animate-page-enter">
          
          {/* Cyber Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500"></div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-3 shadow-lg shadow-red-500/10">
              <Lock className="w-7 h-7" />
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 tracking-wider">
                Cheklangan Hudud (Restricted Area)
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              CYBER<span className="text-cyan-400">TRIP</span> ADMIN
            </h1>
            <p className="text-xs text-gray-400">
              Ushbu bo&apos;lim faqat platforma boshqaruvchilari uchun himoyalangan. Kirish uchun administrator hisobingiz ma&apos;lumotlarini kiriting.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-3 text-xs text-red-300 animate-msg-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">
                Admin Email yoki Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin@cybertrip.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">
                Maxfiy Parol
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Tekshirilmoqda...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Boshqaruv Paneliga Kirish</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center space-x-1">
              <span>← Bosh sahifaga qaytish</span>
            </Link>
            <span className="text-[10px] text-gray-400 font-mono">RBAC: ROLE_ADMIN</span>
          </div>

        </div>
      </div>
    );
  }

  // 3. Fully Authenticated Administrator Panel View
  const navItems = [
    { href: '/admin', label: 'Bosh Panel', icon: LayoutDashboard },
    { href: '/admin/plans', label: 'Tariflar Rejasi', icon: Layers },
    { href: '/admin/subscriptions', label: 'Obunalar Boshqaruvi', icon: RefreshCw },
    { href: '/admin/payments', label: 'To\'lovlar Audit Logi', icon: CreditCard },
    { href: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0F17] border-r border-gray-800 flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center text-lg font-black text-white tracking-wider">
            CYBER<span className="text-cyan-400">TRIP</span>
            <span className="ml-2 text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
              ADMIN
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link 
            href="/dashboard" 
            className="flex items-center px-3 py-2 w-full rounded-xl text-xs font-semibold text-gray-400 hover:bg-gray-800/60 hover:text-white transition-colors"
          >
            <Shield className="w-4 h-4 mr-3 text-cyan-400" />
            Talaba Paneli
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 w-full rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Chiqish (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#070A0E] p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
