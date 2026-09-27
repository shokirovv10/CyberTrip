'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, LayoutDashboard, Users, BookOpen, Terminal, Flag, 
  Settings, LogOut, CreditCard, RefreshCw, Layers 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Bosh Panel', icon: LayoutDashboard },
    { href: '/admin/plans', label: 'Tariflar Rejasi', icon: Layers },
    { href: '/admin/subscriptions', label: 'Obunalar Boshqaruvi', icon: RefreshCw },
    { href: '/admin/payments', label: 'To\'lovlar Audit Logi', icon: CreditCard },
    { href: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
    { href: '/admin/courses', label: 'Kurslar', icon: BookOpen },
    { href: '/admin/labs', label: 'Laboratoriyalar', icon: Terminal },
    { href: '/admin/ctf', label: 'CTF Boshqaruvi', icon: Flag },
    { href: '/admin/settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0F17] border-r border-gray-800 flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
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

        <div className="p-4 border-t border-gray-800">
          <Link href="/dashboard" className="flex items-center px-3 py-2 w-full rounded-xl text-xs font-semibold text-gray-400 hover:bg-gray-850 hover:text-white transition-colors">
            <LogOut className="w-4 h-4 mr-3 text-gray-500" />
            Platformaga Qaytish
          </Link>
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
