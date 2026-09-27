import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, BookOpen, Terminal, Flag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10 animate-page-enter">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto shadow-2xl shadow-red-500/10">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
            XATOLIK 404 — SAHIFA TOPILMADI
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Manzil Mavjud Emas
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            Siz qidirayotgan sahifa o&apos;chirilgan, nomi o&apos;zgartirilgan yoki vaqtinchalik mavjud bo&apos;lmasligi mumkin.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href="/learn"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/40 hover:bg-gray-900 transition-all text-left group"
          >
            <BookOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-gray-200">O&apos;rganish</p>
              <p className="text-[10px] text-gray-500">Kurslar katalogi</p>
            </div>
          </Link>

          <Link
            href="/labs"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0F17] border border-gray-800 hover:border-orange-500/40 hover:bg-gray-900 transition-all text-left group"
          >
            <Terminal className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-gray-200">Laboratoriya</p>
              <p className="text-[10px] text-gray-500">Amaliy mashqlar</p>
            </div>
          </Link>

          <Link
            href="/ctf"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0F17] border border-gray-800 hover:border-purple-500/40 hover:bg-gray-900 transition-all text-left group"
          >
            <Flag className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-gray-200">CTF Maydoni</p>
              <p className="text-[10px] text-gray-500">Musobaqalar</p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0F17] border border-gray-800 hover:border-emerald-500/40 hover:bg-gray-900 transition-all text-left group"
          >
            <Home className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-gray-200">Bosh Sahifa</p>
              <p className="text-[10px] text-gray-500">Asosiy sahifaga</p>
            </div>
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-800/80">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bosh sahifaga qaytish</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
