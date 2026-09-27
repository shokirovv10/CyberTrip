import Link from 'next/link';
import { Home, BookOpen, MonitorPlay, Trophy, Award, Settings } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Asosiy panel', href: '/dashboard' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Mening darslarim', href: '/dashboard/learning' },
    { icon: <MonitorPlay className="w-5 h-5" />, label: 'Laboratoriyalarim', href: '/dashboard/labs' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Yutuqlar', href: '/dashboard/achievements' },
    { icon: <Award className="w-5 h-5" />, label: 'Sertifikatlar', href: '/certificates' },
    { icon: <Settings className="w-5 h-5" />, label: 'Sozlamalar', href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 border-r border-subtle bg-card h-[calc(100vh-4rem)] sticky top-16 hidden lg:block overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-secondary hover:text-primary hover:bg-elevated transition-colors">
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
