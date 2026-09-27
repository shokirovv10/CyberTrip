import Link from 'next/link';
import { Shield, FileText, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-page-enter">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Foydalanish Shartlari</span>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-gray-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-white">Foydalanish Shartlari (Terms of Service)</h1>
          </div>
          <p className="text-xs text-gray-400">
            Oxirgi yangilanish: 2026-yil 1-sentyabr | CYBERTRIP.UZ platformasi
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>1. Umumiy Qoidalar va Qonuniylik</span>
            </h2>
            <p>
              CYBERTRIP.UZ platformasi axborot xavfsizligi va kiberxavfsizlik sohasida qonuniy, ta&apos;limiy va amaliy ko&apos;nikmalarni oshirish uchun mo&apos;ljallangan. Platformada taqdim etilgan barcha vositalar va zaiflik laboratoriyalari faqat ajratilgan maxsus poligon hududida sinovdan o&apos;tkazilishi shart.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>2. Qat&apos;iyan Taqiqlangan Harakatlar</span>
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-2">
              <li>Platformada o&apos;rganilgan usullarni ruxsatsiz uchinchi tomon tizimlariga qarshi qo&apos;llash;</li>
              <li>CYBERTRIP.UZ infratuzilmasiga DDoS yoki xizmatni to&apos;xtatishga qaratilgan hujumlar uyushtirish;</li>
              <li>CTF topshiriqlari bayroqlarini (Flag) boshqa ishtirokchilar bilan almashish yoki sotish;</li>
              <li>Avtomatlashtirilgan tajovuzkor botlar orqali platforma serverlariga asossiz ortiqcha yuklama berish.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>3. Hisoblar va Xavfsizlik</span>
            </h2>
            <p>
              Foydalanuvchi o&apos;z login va parolini maxfiy saqlashga javobgardir. Shubhali faollik aniqlangan taqdirda ma&apos;muriyat hisobni bloklash huquqini saqlab qoladi.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
