'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, Target, Award, Flame, Play, ArrowRight, 
  CheckCircle2, Clock, Terminal, Shield, Sparkles, 
  BookOpen, Flag, Activity, Cpu, ExternalLink, ChevronRight 
} from 'lucide-react';
import { getLevelForXp } from '@/lib/gamification';
import { LABS_DATA } from '@/lib/labs-data';
import { fetchApi } from '@/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string; displayName: string } | null>(null);

  useEffect(() => {
    fetchApi<{ user: { username: string; displayName: string } }>('/auth/me')
      .then((res) => {
        if (res && res.user) setUser(res.user);
      })
      .catch(() => {});
  }, []);

  const userXp = 4850;
  const levelInfo = getLevelForXp(userXp);
  const activeLabs = LABS_DATA.slice(0, 3);

  const recentChallenges = [
    { id: 1, title: 'Web: Login Bypass (SQLi)', category: 'WEB', difficulty: 'OSON', points: 100, solves: 342, isSolved: true },
    { id: 3, title: 'Crypto: RSA Basic Decrypt', category: 'CRYPTO', difficulty: 'O\'RTA', points: 200, solves: 120, isSolved: false },
    { id: 5, title: 'Web: JWT Signature Bypass', category: 'WEB', difficulty: 'QIYIN', points: 300, solves: 64, isSolved: false },
  ];

  return (
    <div className="space-y-6 font-sans animate-page-enter">
      {/* Command Center Welcome Header */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${levelInfo.currentLevel.badgeColor}`}>
                Daraja {levelInfo.currentLevel.level} — {levelInfo.currentLevel.name}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Laboratoriya Poligoni Aktiv</span>
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Boshqaruv Markazi, {user?.displayName || user?.username || 'Tadqiqotchi'}!
            </h1>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
              Bugungi vazifangiz: SQL Injection darsini yakunlash va CyberBooks amaliy laboratoriyasida administrator tokenini qo&apos;lga kiritish.
            </p>
          </div>

          {/* Quick Level & XP Gauge */}
          <div className="bg-[#070A0E] border border-gray-800 rounded-2xl p-4 min-w-[260px] space-y-2.5 font-mono shadow-inner">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-sans">TAJRIBA (XP)</span>
              <span className="text-emerald-400 font-black text-sm">{userXp.toLocaleString()} XP</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Keyingi darajagacha</span>
                <span className="text-cyan-400 font-bold">{levelInfo.xpRemaining} XP</span>
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

      {/* 4 Compact Stat KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center space-x-3.5 shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">DARAJA (LEVEL)</span>
            <span className="text-xl font-black text-white font-mono">{levelInfo.currentLevel.level}</span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center space-x-3.5 shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">JAMI XP</span>
            <span className="text-xl font-black text-white font-mono">{userXp.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center space-x-3.5 shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">YECHILGAN LAB & CTF</span>
            <span className="text-xl font-black text-white font-mono">37 <span className="text-xs text-gray-400 font-normal">topshiriq</span></span>
          </div>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center space-x-3.5 shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">STREAK (IZCHILLIK)</span>
            <span className="text-xl font-black text-white font-mono">12 KUN 🔥</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (65%) & Right (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Banner */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Darsni Davom Ettirish</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">68% YAKUNLANDI</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">Web Pentest Asoslari</span>
                <h4 className="text-base font-bold text-white">SQL Injection: UNION asosidagi hujumlar va Bypass</h4>
                <p className="text-xs text-gray-400">Modul 2 • 4-dars: Ma&apos;lumotlar bazasi ustunlarini aniqlash</p>
              </div>

              <Link
                href="/learn/web-pentest/sql-injection/sql-injection-hujumlari/union-attacks"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2 whitespace-nowrap"
              >
                <span>Darsga o&apos;tish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          {/* Active & Recommended Labs */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Amaliy Laboratoriyalar</h3>
              </div>
              <Link href="/labs" className="text-xs text-cyan-400 hover:underline flex items-center">
                <span>Katalogga o&apos;tish</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="space-y-3 font-sans">
              {activeLabs.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-white">{lab.title}</h4>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-gray-800 text-gray-300 border border-gray-700">
                          {lab.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{lab.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 font-mono flex-shrink-0 pl-3">
                    <span className="text-xs font-bold text-emerald-400">+{lab.xp} XP</span>
                    <Link
                      href={`/labs/${lab.slug}`}
                      className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold rounded-lg border border-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <Play className="w-3 h-3 text-orange-400 fill-orange-400" />
                      <span>Start</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent CTF Challenges */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Flag className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">CTF Arena Topshiriqlari</h3>
              </div>
              <Link href="/ctf/challenges" className="text-xs text-purple-400 hover:underline flex items-center">
                <span>Barchasini ko&apos;rish</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-800/60 font-sans text-xs">
              {recentChallenges.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full ${c.isSolved ? 'bg-emerald-400' : 'bg-gray-600'}`}></span>
                    <div>
                      <span className="font-bold text-white mr-2">{c.title}</span>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20">
                        {c.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 font-mono">
                    <span className="text-gray-400 text-[11px]">{c.solves} solves</span>
                    <span className="text-purple-400 font-bold">{c.points} pts</span>
                    {c.isSolved ? (
                      <span className="text-emerald-400 font-bold text-[11px] flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Yechildi
                      </span>
                    ) : (
                      <Link
                        href={`/ctf/challenges/${c.id}`}
                        className="text-cyan-400 hover:underline font-semibold text-[11px]"
                      >
                        Yechish →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lab Network Status & Skill Matrix */}
        <div className="space-y-6">
          {/* Lab Virtual Network VPN Connection */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Laboratoriya Tarmog&apos;i</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ULANDI
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl space-y-1">
                <span className="text-[10px] text-gray-500 block uppercase">Virtual VPN IP (tun0)</span>
                <p className="text-sm font-bold text-cyan-400">10.10.14.88</p>
              </div>
              <div className="flex justify-between items-center px-1 text-[11px] text-gray-400">
                <span>Kechikish (Ping): <strong className="text-emerald-400 font-mono">18ms</strong></span>
                <span>DNS: <strong className="text-gray-300 font-mono">10.10.0.1</strong></span>
              </div>
            </div>
          </div>

          {/* Skill Matrix Breakdown */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Ko&apos;nikmalar Matritsasi</h3>
              <Link href="/progress" className="text-xs text-cyan-400 hover:underline">
                Barchasi →
              </Link>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Web Zaifliklari (OWASP Top 10)</span>
                  <span className="font-mono text-emerald-400">85%</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Linux Privilege Escalation</span>
                  <span className="font-mono text-orange-400">60%</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-400 h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Tarmoq Xavfsizligi</span>
                  <span className="font-mono text-cyan-400">50%</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Kriptografiya</span>
                  <span className="font-mono text-purple-400">40%</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-gray-800">
              Tezkor Havolalar
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/terminal"
                className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/40 hover:bg-gray-850 text-gray-200 transition-colors flex items-center space-x-2"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Web Terminal</span>
              </Link>
              <Link
                href="/certificates"
                className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 hover:bg-gray-850 text-gray-200 transition-colors flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Sertifikatlar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
