import Link from 'next/link';
import { 
  Zap, Target, Award, Flame, Play, ArrowRight, 
  CheckCircle2, Clock, Terminal, Shield, Sparkles, BookOpen 
} from 'lucide-react';
import { getLevelForXp } from '@/lib/gamification';
import { LABS_DATA } from '@/lib/labs-data';

export default function DashboardPage() {
  const userXp = 2450;
  const levelInfo = getLevelForXp(userXp);
  const recommendedLabs = LABS_DATA.slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl font-sans">
      
      {/* Welcome & Level Overview Banner */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${levelInfo.currentLevel.badgeColor}`}>
                Level {levelInfo.currentLevel.level} — {levelInfo.currentLevel.name}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Faol Foydalanuvchi
              </span>
            </div>
            <h1 className="text-3xl font-black text-white">Xush kelibsiz, domme!</h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl">
              Kiberxavfsizlik bo'yicha sayohatingiz davom etmoqda. Bugun 1 ta dars va 1 ta laboratoriyani yakunlab kunlik streakni saqlang!
            </p>
          </div>

          <div className="bg-[#070A0E] border border-gray-800 rounded-2xl p-5 min-w-[260px] space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-sans">JAMI XP</span>
              <span className="text-emerald-400 font-black text-base">{userXp.toLocaleString()} XP</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Keyingi daraja</span>
                <span className="text-cyan-400 font-bold">{levelInfo.xpRemaining} XP qoldi</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Jami XP</span>
            <span className="text-xl font-black text-white font-mono">{userXp.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Faollik (Streak)</span>
            <span className="text-xl font-black text-white font-mono">7 kun 🔥</span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Tugallangan Lab</span>
            <span className="text-xl font-black text-white font-mono">14 / 60</span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Yutuqlar</span>
            <span className="text-xl font-black text-white font-mono">4 / 18</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Continue Learning + Recommended Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Continue Learning Card (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center">
              <BookOpen className="w-4 h-4 text-cyan-400 mr-2" />
              O'rganishni Davom Ettirish
            </h2>
            <Link href="/learn" className="text-xs text-cyan-400 hover:underline">
              Barcha yo'nalishlar
            </Link>
          </div>

          <div className="bg-[#070A0E] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                Web Pentest & OWASP Top 10
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">42% Tugallangan</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">OWASP Web Security: OW-01 SQL Injection concepts</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                SQL query mexanikasi, autentifikatsiyani aylanib o'tish va UNION SELECT orqali ma'lumotlarni tortib olish.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>Modul 1: Asosiy Konsepsiyalar</span>
                <span>8 / 18 dars</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '44%' }} />
              </div>
            </div>

            <div className="pt-2">
              <Link href="/learn/web-pentest/owasp-web-security/owasp-web-security-mod-1/sqli-concepts">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black py-3 rounded-xl font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/10">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Darsni Davom Ettirish (+40 XP)</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Labs (1 Col) */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center">
              <Terminal className="w-4 h-4 text-emerald-400 mr-2" />
              Tavsiya Qilingan Lablar
            </h2>
            <Link href="/labs" className="text-xs text-emerald-400 hover:underline">
              Barchasi
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedLabs.map((lab) => (
              <Link key={lab.id} href={`/labs/${lab.slug}`} className="block group">
                <div className="p-4 bg-[#070A0E] border border-gray-800 group-hover:border-emerald-500/40 rounded-xl space-y-2 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono">
                      {lab.targetApp}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      +{lab.xp} XP
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {lab.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>{lab.difficulty}</span>
                    <span>{lab.estimatedMinutes} daqiqa</span>
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
