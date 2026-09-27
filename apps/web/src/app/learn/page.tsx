import Link from 'next/link';
import { 
  Globe, Terminal, Shield, Lock, Search, Activity, 
  Clock, BookOpen, ArrowRight, Award, CheckCircle2, 
  Map, Wrench, Zap, GraduationCap, Flame, Sparkles
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';

export default function LearnPage() {
  const paths = Object.values(CURRICULUM_DATA);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Rasmiy Ta'lim Dasturi
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Kiberxavfsizlik O'quv Ekosistemasi
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Noldan professional darajagacha: har bir darsda aniq tushunchalar, real kiber-hujum ssenariylari, kod namunalari va amaliy himoyalanish metodikasi mavjud.
          </p>
        </div>

        {/* Feature Navigation Bar */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-2.5 flex flex-wrap gap-2 justify-center shadow-xl">
          <Link
            href="/learn"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Yo'nalishlar (Curriculum)</span>
          </Link>

          <Link
            href="/roadmap"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center space-x-1.5"
          >
            <Map className="w-3.5 h-3.5 text-cyan-400" />
            <span>O'quv Xaritasi (Roadmap)</span>
          </Link>

          <Link
            href="/labs"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center space-x-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>60+ Amaliy Laboratoriyalar</span>
          </Link>

          <Link
            href="/playground"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center space-x-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-purple-400" />
            <span>Xavfsizlik Playground</span>
          </Link>

          <Link
            href="/challenges"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center space-x-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Kunlik & Haftalik Challenge</span>
          </Link>

          <Link
            href="/assessment/web-pentest"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center space-x-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Yakuniy Imtihon (CWP)</span>
          </Link>
        </div>

        {/* Quick Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/challenges" className="group">
            <div className="bg-gradient-to-br from-[#0B0F17] to-[#121824] border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-5 space-y-3 transition-all shadow-xl group-hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Flame className="w-5 h-5 fill-current" />
                </span>
                <span className="text-[10px] font-bold font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                  +75 XP / KUN
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                Kunlik Kiber-Topshiriq (Daily Challenge)
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Har kuni 1 ta mini-topshiriqni yeching, faollik seriyasini oshiring va bonus XP ga ega bo'ling.
              </p>
            </div>
          </Link>

          <Link href="/playground" className="group">
            <div className="bg-gradient-to-br from-[#0B0F17] to-[#121824] border border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-5 space-y-3 transition-all shadow-xl group-hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Wrench className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  5 TA INSTRUMENT
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                Web Security Playground & Toolkit
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                HTTP Builder, Security Headers tekshiruvi, Base64/Hex/URL dekoderi va JWT tahlil vositasi.
              </p>
            </div>
          </Link>

          <Link href="/assessment/web-pentest" className="group">
            <div className="bg-gradient-to-br from-[#0B0F17] to-[#121824] border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 transition-all shadow-xl group-hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  RASMIY SERTIFIKAT
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Yakuniy Sertifikatlash Imtihoni
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                5 fazali amaliy pentest imtihonini topshiring va QR-kod bilan tasdiqlanadigan CWP diplomini oling.
              </p>
            </div>
          </Link>
        </div>

        {/* Learning Paths Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Barcha O'quv Yo'nalishlari (6 Ta Asosiy Track)</h2>
            <span className="text-xs text-gray-500 font-mono">15 Kurs • 172 Dars • 60 Lab</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((p) => (
              <Link key={p.slug} href={`/learn/${p.slug}`} className="group">
                <div className="h-full bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-xl hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {p.iconName === 'Globe' && <Globe className="w-6 h-6" />}
                        {p.iconName === 'Terminal' && <Terminal className="w-6 h-6" />}
                        {p.iconName === 'Activity' && <Activity className="w-6 h-6" />}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                        {p.level}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-[10px] bg-gray-900 border border-gray-800 text-gray-400 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 text-gray-500 font-mono">
                      <span className="flex items-center">
                        <BookOpen className="w-3.5 h-3.5 mr-1" />
                        {p.coursesCount} kurs
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {p.hours} soat
                      </span>
                    </div>

                    <span className="font-bold text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform">
                      Boshlash <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
