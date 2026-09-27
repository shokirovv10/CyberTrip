import Link from 'next/link';
import { ShieldAlert, Bug, ChevronRight, Mail } from 'lucide-react';

export default function ResponsibleDisclosurePage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-page-enter">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Mas&apos;uliyatli Oshkor Qilish</span>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-gray-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Bug className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-white">Mas&apos;uliyatli Oshkor Qilish (Responsible Disclosure)</h1>
          </div>
          <p className="text-xs text-gray-400">
            CYBERTRIP.UZ tizimida zaiflik aniqlaganda xabar berish tartibi
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Xavfsizlik Tadqiqotchilariga Murojaat</span>
            </h2>
            <p>
              Agar siz CYBERTRIP.UZ asosiy infratuzilmasida (ta&apos;limiy simulyatorlar bundan mustasno) xavfsizlik zaifligini topsangiz, biz bilan zudlik bilan bog&apos;lanishingizni so&apos;raymiz. Biz axloqiy kiber-tadqiqotchilarni qadrlaymiz va qonuniy doirada hamkorlik qilamiz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">Qoidalar:</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-2">
              <li>Zaiflik haqida ommaga ma&apos;lum qilishdan oldin bizga xatolikni tuzatish uchun 30 kun vaqt bering;</li>
              <li>Foydalanuvchilarning shaxsiy ma&apos;lumotlariga ruxsatsiz tegmang yoki o&apos;chirmang;</li>
              <li>Xizmat ko&apos;rsatishni to&apos;xtatishga (DoS/DDoS) yo&apos;l qo&apos;ymang.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center space-x-3">
            <Mail className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-xs text-gray-400 block">Zaifliklar bo&apos;yicha murojaat:</span>
              <strong className="text-white text-sm font-mono">security@cybertrip.uz</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
