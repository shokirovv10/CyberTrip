import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-base pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-accent-green" />
            <span className="font-bold text-xl text-primary">CYBERTRIP<span className="text-accent-green">.UZ</span></span>
          </Link>
          <p className="text-sm text-secondary max-w-sm leading-relaxed">
            O'zbekistondagi birinchi raqamli professional kiberxavfsizlik ta'lim platformasi va kiber-poligon ekotizimi. Amaliyot orqali haqiqiy mutaxassisga aylaning.
          </p>
          <div className="text-xs text-secondary/70">
            Domen: <strong className="text-accent-green">cybertrip.uz</strong> | Toshkent, O'zbekiston
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-3 text-sm">Ta'lim & Laboratoriya</h4>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link href="/learn" className="hover:text-primary transition-colors">O'rganish yo'laklari</Link></li>
            <li><Link href="/labs" className="hover:text-primary transition-colors">Laboratoriyalar (Labs)</Link></li>
            <li><Link href="/ctf" className="hover:text-primary transition-colors">CTF Topshiriqlar</Link></li>
            <li><Link href="/tournaments" className="hover:text-primary transition-colors">Kiber Turnirlar</Link></li>
            <li><Link href="/terminal" className="hover:text-primary transition-colors">Linux Terminal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-3 text-sm">Resurslar & Hamjamiyat</h4>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link href="/knowledge" className="hover:text-primary transition-colors">Bilimlar bazasi</Link></li>
            <li><Link href="/glossary" className="hover:text-primary transition-colors">Kiberxavfsizlik lug'ati</Link></li>
            <li><Link href="/ranking" className="hover:text-primary transition-colors">Milliy Reyting</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Tariflar & Obuna</Link></li>
            <li><Link href="/certificates" className="hover:text-primary transition-colors">Sertifikatlar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-3 text-sm">Huquqiy & Xavfsizlik</h4>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Maxfiylik siyosati</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Foydalanish shartlari</Link></li>
            <li><Link href="/responsible-disclosure" className="hover:text-primary transition-colors">Responsible Disclosure</Link></li>
            <li><Link href="/verify/CT-2026-CERT-001" className="hover:text-primary transition-colors">Sertifikat tekshirish</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-secondary gap-4">
        <div>
          &copy; {new Date().getFullYear()} CyberTrip.uz. Barcha huquqlar himoyalangan.
        </div>
        <div className="text-secondary/60">
          Professional Cyber Range & Learning Management System
        </div>
      </div>
    </footer>
  );
}
