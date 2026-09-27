import Link from 'next/link';
import { 
  Flag, Trophy, Users, Shield, Zap, ChevronRight, 
  Terminal, Sparkles, Award, ArrowRight, Flame 
} from 'lucide-react';

export default function CTFPage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-10 animate-page-enter">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            Rasmiy CTF Arena
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Kiber-Janglar Maydoni (CTF)
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Haqiqiy zaifliklarni toping, exploit qiling va yashirin bayroqlarni (flags) qo&apos;lga kiritib reytingda yetakchilik qiling.
          </p>
        </div>

        {/* Featured Tournament Card & Top Players */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0B0F17] border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>Faol Musobaqa</span>
                </span>
                <span className="text-xs font-mono text-gray-400">48 soatlik marafon</span>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  CyberTrip Quest 2026: Milliy CTF
                </h2>
                <p className="text-xs md:text-sm text-gray-400 mt-2 leading-relaxed">
                  Web, Kriptografiya, Reverse Engineering, Forenzika va Linux Privilege Escalation bo&apos;yicha O&apos;zbekistonning eng iqtidorli yoshlari o&apos;rtasidagi ochiq kiber-chempionat.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/tournaments/1"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center space-x-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Musobaqaga Kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/ctf/scoreboard"
                  className="px-5 py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 font-semibold text-xs rounded-xl border border-gray-800 transition-colors"
                >
                  Peshqadamlar Doskasi
                </Link>
              </div>
            </div>
          </div>

          {/* Top Leaderboard preview */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Ishtirokchilar</h3>
                </div>
                <Link href="/ranking" className="text-xs text-purple-400 hover:underline">
                  Barchasi →
                </Link>
              </div>

              <div className="divide-y divide-gray-800/60 mt-2">
                {[
                  { rank: 1, name: 'CyberShadow', points: 3450, color: 'text-yellow-400' },
                  { rank: 2, name: 'RootHunter', points: 3100, color: 'text-gray-300' },
                  { rank: 3, name: 'NullByte', points: 2850, color: 'text-amber-600' },
                  { rank: 4, name: 'ByteMaster', points: 2400, color: 'text-gray-500' },
                ].map((p) => (
                  <div key={p.rank} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <span className={`font-mono font-bold ${p.color}`}>#{p.rank}</span>
                      <span className="font-semibold text-gray-200">{p.name}</span>
                    </div>
                    <span className="font-mono font-bold text-purple-400">{p.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/ctf/challenges"
              className="mt-4 w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl border border-gray-800 text-center transition-colors block"
            >
              Doimiy Mashqlar Kutubxonasi
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Doimiy CTF Mashqlari</h3>
            <Link href="/ctf/challenges" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-semibold">
              Barcha topshiriqlarni ko&apos;rish ({15}+) →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { cat: 'Web', count: 5, color: 'text-purple-400', border: 'hover:border-purple-500/50' },
              { cat: 'Crypto', count: 3, color: 'text-blue-400', border: 'hover:border-blue-500/50' },
              { cat: 'Forensics', count: 2, color: 'text-emerald-400', border: 'hover:border-emerald-500/50' },
              { cat: 'Linux', count: 2, color: 'text-orange-400', border: 'hover:border-orange-500/50' },
              { cat: 'Network', count: 2, color: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
              { cat: 'OSINT', count: 1, color: 'text-pink-400', border: 'hover:border-pink-500/50' },
            ].map((c) => (
              <Link
                key={c.cat}
                href="/ctf/challenges"
                className={`p-4 bg-[#0B0F17] border border-gray-800 rounded-2xl text-center space-y-2 transition-all hover:-translate-y-1 ${c.border}`}
              >
                <div className={`text-base font-bold ${c.color}`}>{c.cat}</div>
                <div className="text-[11px] text-gray-500">{c.count} ta topshiriq</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
