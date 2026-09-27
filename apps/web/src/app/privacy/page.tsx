import Link from 'next/link';
import { Shield, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-page-enter">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Maxfiylik Siyosati</span>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-gray-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-white">Maxfiylik Siyosati (Privacy Policy)</h1>
          </div>
          <p className="text-xs text-gray-400">
            Foydalanuvchilar shaxsiy ma&apos;lumotlari va faollik ma&apos;lumotlarini himoya qilish
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>1. Qanday ma&apos;lumotlar to&apos;planadi?</span>
            </h2>
            <p>
              Biz faqat ta&apos;lim jarayoni, sertifikat berish va turnir natijalarini hisoblash uchun zarur bo&apos;lgan minimal ma&apos;lumotlarni (foydalanuvchi nomi, email, laboratoriya yechimlari, to&apos;plangan XP va reyting natijalari) saqlaymiz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>2. Ma&apos;lumotlar xavfsizligi</span>
            </h2>
            <p>
              Barcha parollar zamonaviy xeshlash algoritmlari (Bcrypt) orqali saqlanadi. Sessiyalar xavfsiz HTTP-Only va SameSite cookie-fayllari orqali himoyalangan. Shaxsiy ma&apos;lumotlar uchinchi shaxslarga berilmaydi va sotilmaydi.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
