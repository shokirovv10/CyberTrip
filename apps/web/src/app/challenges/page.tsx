'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, Flame, Calendar, Clock, Trophy, CheckCircle2, 
  XCircle, AlertCircle, ArrowRight, Shield, Award, 
  Terminal, Sparkles, HelpCircle, Lock, RefreshCw, Layers, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface DailyChallengeData {
  id: string;
  date: string;
  title: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  xpReward: number;
  streakBonus: number;
  description: string;
  hint: string;
  expectedFlag: string;
  codeSnippet?: string;
}

interface WeeklyChallengeData {
  id: string;
  weekNumber: number;
  title: string;
  category: string;
  difficulty: 'ADVANCED' | 'EXPERT';
  xpReward: number;
  badgeName: string;
  deadlineDays: number;
  description: string;
  stages: {
    number: number;
    title: string;
    description: string;
    flagPrefix: string;
    isCompleted: boolean;
  }[];
}

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'archive'>('daily');

  // Daily Challenge State
  const [userStreak, setUserStreak] = useState(6);
  const [dailySolved, setDailySolved] = useState(false);
  const [dailyFlagInput, setDailyFlagInput] = useState('');
  const [dailyStatus, setDailyStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>('idle');
  const [showDailyHint, setShowDailyHint] = useState(false);

  // Time remaining until midnight UTC+5
  const [timeUntilReset, setTimeUntilReset] = useState('07:24:19');

  // Today's challenge
  const todayChallenge: DailyChallengeData = {
    id: 'daily-2026-10-12',
    date: '12-Oktyabr, 2026',
    title: 'Obfuscated JavaScript Token Deobfuscation',
    category: 'Web Reverse & Crypto',
    difficulty: 'BEGINNER',
    xpReward: 50,
    streakBonus: 25,
    description: "Kiberhujumchi veb-saytning autentifikatsiya skriptiga quyidagi shifrlangan payloadni kiritgan. Kodni tahlil qiling va unda yashirilgan maxfiy sessiya flagini (FLAG{...}) tiklang.",
    hint: "Base64 va XOR shifrlash usuli qo'llanilgan. 'atob' yoki CyberChef yordamida '0x5A' kaliti bilan XOR amalini bajaring.",
    codeSnippet: `const enc = "GhsMBRkFFQoGBA4eFQUHBA=="; // XOR with 0x5A
// Decode steps:
// 1. Buffer.from(enc, 'base64')
// 2. Map bytes: byte ^ 0x5A
// 3. String.fromCharCode(...)`,
    expectedFlag: 'FLAG{js_xor_unmasked_882}',
  };

  // Weekly Challenge State
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallengeData>({
    id: 'weekly-week-41',
    weekNumber: 41,
    title: 'Fintech API: Multi-Stage Token Impersonation & BOLA',
    category: 'API Security & Cryptography',
    difficulty: 'ADVANCED',
    xpReward: 350,
    badgeName: 'API Ghost Hunter #41',
    deadlineDays: 4,
    description: "Bank to'lov integratsiyasi API tizimida 3 bosqichli real xavfsizlik auditini o'tkazing: Public Endpoint Discovery → JWT Algorithm Swap → BOLA (Broken Object Level Authorization) orqali yashirin audit logini qo'lga kiriting.",
    stages: [
      {
        number: 1,
        title: 'Faza 1: Swagger / OpenAPI hujjatlaridan yashirin API marshrutini topish',
        description: "API serverining '/v2/api-docs' manzilidan foydalanib yashirin admin endpointini aniqlang.",
        flagPrefix: 'FLAG{stage1_doc_leak_',
        isCompleted: true,
      },
      {
        number: 2,
        title: 'Faza 2: JWT "alg: none" zaifligi orqali soxta token yaratish',
        description: "Autentifikatsiya tokenidagi imzoni olib tashlang va payload'dagi role='auditor' ga o'zgartiring.",
        flagPrefix: 'FLAG{stage2_jwt_alg_none_',
        isCompleted: false,
      },
      {
        number: 3,
        title: 'Faza 3: BOLA / IDOR orqali transaksiya kvitansiyasini eksfiltratsiya qilish',
        description: "IDOR zaifligi yordamida tashkilot hisob raqamidagi transfer kvitansiyasidan bosh flagni toping.",
        flagPrefix: 'FLAG{stage3_bola_payout_master_',
        isCompleted: false,
      },
    ],
  });

  const [weeklyInput, setWeeklyInput] = useState('');
  const [weeklyStatus, setWeeklyStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>('idle');

  // Archive data
  const pastChallenges = [
    { id: '1', title: 'SQL Injection Error-Based Payload', date: '11-Oktyabr', cat: 'SQLi', xp: 50, solved: true },
    { id: '2', title: 'Linux Setuid Privilege Trap', date: '10-Oktyabr', cat: 'Linux', xp: 50, solved: true },
    { id: '3', title: 'JWT None Algorithm Header Forgery', date: '9-Oktyabr', cat: 'Auth', xp: 50, solved: true },
    { id: '4', title: 'SSRF Cloud AWS Metadata Bypass', date: '8-Oktyabr', cat: 'Cloud', xp: 50, solved: true },
    { id: '5', title: 'Hidden Exif Metadata in Threat Actor Photo', date: '7-Oktyabr', cat: 'OSINT', xp: 50, solved: true },
    { id: '6', title: 'CORS Wildcard with Credentials Attack', date: '6-Oktyabr', cat: 'Web', xp: 50, solved: true },
  ];

  const handleDailySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyFlagInput.trim()) return;

    setDailyStatus('checking');

    setTimeout(() => {
      if (
        dailyFlagInput.trim() === todayChallenge.expectedFlag ||
        dailyFlagInput.trim().toLowerCase() === 'flag{js_xor_unmasked_882}' ||
        dailyFlagInput.trim().includes('unmasked')
      ) {
        setDailyStatus('correct');
        setDailySolved(true);
        setUserStreak((prev) => prev + 1);
      } else {
        setDailyStatus('incorrect');
      }
    }, 600);
  };

  const handleWeeklySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weeklyInput.trim()) return;

    setWeeklyStatus('checking');

    setTimeout(() => {
      if (weeklyInput.trim().toUpperCase().includes('FLAG{STAGE2') || weeklyInput.trim().includes('jwt_alg_none')) {
        setWeeklyStatus('correct');
        setWeeklyChallenge((prev) => ({
          ...prev,
          stages: prev.stages.map((s) => (s.number === 2 ? { ...s, isCompleted: true } : s)),
        }));
        setWeeklyInput('');
      } else {
        setWeeklyStatus('incorrect');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold text-cyan-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Interaktiv Sinov Markazi</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Kunlik & Haftalik Kiber-Topshiriqlar
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                Har kuni 1 ta amaliy mini-topshiriq bilan bilimlarni yangilang va faollik seriyasini (Streak) saqlang. Haftalik murakkab vazifalar esa chuqur eksploitatsiya ko'nikmalarini rivojlantiradi.
              </p>
            </div>

            {/* Streak & XP Card */}
            <div className="flex items-center space-x-4 bg-gray-900/90 border border-gray-800 p-4 rounded-2xl shadow-xl flex-shrink-0">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-black shadow-lg shadow-orange-500/20">
                <Flame className="w-8 h-8 text-black fill-current animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block font-semibold">
                  Faollik Seriyasi (Streak)
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-white">{userStreak}</span>
                  <span className="text-xs text-orange-400 font-bold">kun davomida 🔥</span>
                </div>
                <span className="text-[10px] text-gray-500">Keyingi bonus: +100 XP (7-kunda)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-800/80">
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Bugungi Status</span>
              <span className={`text-base font-bold flex items-center mt-0.5 ${dailySolved ? 'text-emerald-400' : 'text-amber-400'}`}>
                {dailySolved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Yechildi (+{todayChallenge.xpReward + todayChallenge.streakBonus} XP)
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-1.5" /> Yechish kutilmoqda
                  </>
                )}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Yangilanish Vaqti</span>
              <span className="text-base font-mono font-bold text-white mt-0.5 block">
                {timeUntilReset}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Haftalik Progress</span>
              <span className="text-base font-bold text-cyan-400 mt-0.5 block">
                {weeklyChallenge.stages.filter(s => s.isCompleted).length} / {weeklyChallenge.stages.length} faza yechildi
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Topilgan Umumiy Flaglar</span>
              <span className="text-base font-bold text-white mt-0.5 block">
                24 ta challenge
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-800 space-x-2">
          <button
            onClick={() => setActiveTab('daily')}
            className={`pb-3 px-5 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'daily'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Bugungi Topshiriq (Daily Challenge)</span>
            {!dailySolved && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`pb-3 px-5 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'weekly'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Haftalik Ssenariy (Weekly Deep Lab)</span>
            <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.2 rounded-full font-mono">
              350 XP
            </span>
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`pb-3 px-5 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'archive'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>O'tgan Topshiriqlar Arxivi ({pastChallenges.length})</span>
          </button>
        </div>

        {/* TAB 1: DAILY CHALLENGE */}
        {activeTab === 'daily' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Daily Puzzle Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-800">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-mono font-bold text-gray-400">{todayChallenge.date}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      {todayChallenge.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      +{todayChallenge.xpReward} XP Asosiy
                    </span>
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                      +{todayChallenge.streakBonus} XP Streak
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {todayChallenge.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {todayChallenge.description}
                  </p>
                </div>

                {/* Code Snippet Box */}
                {todayChallenge.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span>payload_obfuscated.js</span>
                      <span className="text-gray-500">JavaScript / Node.js</span>
                    </div>
                    <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                      {todayChallenge.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Hint Drawer */}
                <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl space-y-2">
                  <button
                    onClick={() => setShowDailyHint(!showDailyHint)}
                    className="flex items-center justify-between w-full text-xs font-bold text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <span className="flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2 text-cyan-400" />
                      Yordam va Maslahat (Hint)
                    </span>
                    <span className="text-[11px] text-gray-500">{showDailyHint ? 'Yopish' : "Ko'rish"}</span>
                  </button>
                  {showDailyHint && (
                    <p className="text-xs text-gray-400 pt-2 border-t border-gray-800 leading-relaxed">
                      {todayChallenge.hint}
                    </p>
                  )}
                </div>

                {/* Flag Submission Form */}
                <form onSubmit={handleDailySubmit} className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Javobni Yuborish (Flag formati: FLAG&#123;...&#125;)
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      placeholder="FLAG{js_xor_...}"
                      value={dailyFlagInput}
                      onChange={(e) => setDailyFlagInput(e.target.value)}
                      disabled={dailySolved || dailyStatus === 'checking'}
                      className="bg-gray-950 border-gray-800 font-mono text-sm focus:border-cyan-500 text-white"
                    />

                    <Button
                      type="submit"
                      disabled={dailySolved || !dailyFlagInput.trim() || dailyStatus === 'checking'}
                      className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold px-6 shrink-0 shadow-lg shadow-cyan-500/20"
                    >
                      {dailyStatus === 'checking' ? (
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      ) : dailySolved ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : null}
                      <span>{dailySolved ? 'Qabul Qilindi' : 'Tekshirish'}</span>
                    </Button>
                  </div>

                  {dailyStatus === 'correct' && (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-bold flex items-center space-x-2 animate-in fade-in-50">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>
                        Ajoyib natija! Flag to'g'ri: +{todayChallenge.xpReward + todayChallenge.streakBonus} XP hisobingizga qo'shildi va faollik seriyangiz {userStreak} kunga yetdi!
                      </span>
                    </div>
                  )}

                  {dailyStatus === 'incorrect' && (
                    <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-red-400 text-xs font-bold flex items-center space-x-2 animate-in fade-in-50">
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                      <span>
                        Noto'g'ri flag. Iltimos, XOR amalini va baytlar ketma-ketligini qayta tekshiring yoki maslahatdan foydalaning.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Sidebar: Streak Benefits & Tools */}
            <div className="space-y-6">
              {/* Streak Calendar / Progress */}
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Flame className="w-4 h-4 text-orange-400 mr-2" /> So'nggi 7 Kunlik Faollik
                </h3>

                <div className="grid grid-cols-7 gap-2 text-center pt-2">
                  {['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'].map((day, idx) => {
                    const isDone = idx < 6 || dailySolved;
                    const isToday = idx === 6;

                    return (
                      <div key={day} className="space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase">{day}</span>
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold mx-auto transition-all ${
                            isDone
                              ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                              : isToday
                              ? 'bg-gray-800 border-2 border-dashed border-orange-400 text-orange-400'
                              : 'bg-gray-900 border border-gray-800 text-gray-600'
                          }`}
                        >
                          {isDone ? '✓' : idx + 6}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed pt-2 border-t border-gray-800">
                  Har kuni kamida bitta challenge yechib, ketma-ketlikni saqlab qoling. 30 kunlik uzluksiz seriya uchun eksklyuziv "Cyber Sentinel" nishoni beriladi.
                </p>
              </div>

              {/* Practice Toolkit Quick Access */}
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-3 shadow-xl">
                <h4 className="text-sm font-bold text-white flex items-center">
                  <Terminal className="w-4 h-4 text-cyan-400 mr-2" /> Topshiriq Vositalari
                </h4>
                <p className="text-xs text-gray-400">
                  Ushbu topshiriqni yechish uchun ichki Web Security laboratoriya vositalaridan foydalaning:
                </p>

                <div className="space-y-2 pt-1">
                  <Link href="/playground" className="block">
                    <button className="w-full text-left p-3 rounded-xl bg-gray-900/60 hover:bg-gray-850 border border-gray-800 text-xs text-gray-300 font-semibold flex items-center justify-between transition-colors">
                      <span>Base64 / Hex / URL Decoder</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </Link>
                  <Link href="/playground" className="block">
                    <button className="w-full text-left p-3 rounded-xl bg-gray-900/60 hover:bg-gray-850 border border-gray-800 text-xs text-gray-300 font-semibold flex items-center justify-between transition-colors">
                      <span>HTTP Request Builder & Header Tester</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEEKLY CHALLENGE */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                      Hafta #{weeklyChallenge.weekNumber}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {weeklyChallenge.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{weeklyChallenge.title}</h2>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Sovrin</span>
                    <span className="text-lg font-extrabold text-cyan-400">+{weeklyChallenge.xpReward} XP</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center">
                    <Award className="w-4 h-4 mr-1.5 text-purple-400" />
                    {weeklyChallenge.badgeName}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                {weeklyChallenge.description}
              </p>

              {/* Multi-Stage Stepper */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Topshiriq Bosqichlari (Fazalar)
                </h4>

                <div className="space-y-3">
                  {weeklyChallenge.stages.map((stg) => (
                    <div
                      key={stg.number}
                      className={`p-5 rounded-2xl border transition-all ${
                        stg.isCompleted
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : stg.number === 2
                          ? 'bg-gray-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                          : 'bg-[#0B0F17] border-gray-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-3.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              stg.isCompleted
                                ? 'bg-emerald-500 text-black'
                                : stg.number === 2
                                ? 'bg-cyan-500 text-black animate-pulse'
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {stg.isCompleted ? <Check className="w-4 h-4" /> : stg.number}
                          </div>

                          <div className="space-y-1">
                            <h5 className="text-sm font-bold text-white flex items-center">
                              {stg.title}
                            </h5>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              {stg.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                            stg.isCompleted
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : stg.number === 2
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'bg-gray-800 text-gray-500'
                          }`}
                        >
                          {stg.isCompleted ? 'Yechildi' : stg.number === 2 ? 'Faol Bosqich' : 'Qulflangan'}
                        </span>
                      </div>

                      {/* Active Stage Flag Input */}
                      {stg.number === 2 && !stg.isCompleted && (
                        <form onSubmit={handleWeeklySubmit} className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                          <label className="block text-xs font-bold text-gray-300">
                            Faza 2 Flagini Kiriting:
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              type="text"
                              placeholder="FLAG{stage2_jwt_alg_none_...}"
                              value={weeklyInput}
                              onChange={(e) => setWeeklyInput(e.target.value)}
                              className="bg-gray-950 border-gray-800 font-mono text-sm focus:border-cyan-500 text-white"
                            />
                            <Button
                              type="submit"
                              disabled={weeklyStatus === 'checking' || !weeklyInput.trim()}
                              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shrink-0 px-5"
                            >
                              {weeklyStatus === 'checking' ? 'Tekshirilmoqda...' : 'Bosqichni Yopish'}
                            </Button>
                          </div>

                          {weeklyStatus === 'correct' && (
                            <p className="text-xs text-emerald-400 font-bold flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Faza 2 muvaffaqiyatli topshirildi! Faza 3 ochildi.
                            </p>
                          )}
                          {weeklyStatus === 'incorrect' && (
                            <p className="text-xs text-red-400 font-bold flex items-center">
                              <XCircle className="w-4 h-4 mr-1.5" /> Noto'g'ri flag. Token imzosini 'none' ga o'zgartirib qayta jo'nating.
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARCHIVE */}
        {activeTab === 'archive' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Avvalgi Kunlik Topshiriqlar</h3>
                <p className="text-[11px] text-gray-400">O'tgan kunlarda berilgan va muvaffaqiyatli yechilgan amaliy topshiriqlar jurnali</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold">100% Yechilgan</span>
            </div>

            <div className="divide-y divide-gray-800/80">
              {pastChallenges.map((ch) => (
                <div key={ch.id} className="p-4 flex items-center justify-between hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{ch.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.2 rounded">
                          {ch.cat}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500">Sana: {ch.date}, 2026</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono font-bold text-emerald-400">+{ch.xp} XP</span>
                    <button className="px-3 py-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs text-gray-300 rounded-lg transition-colors">
                      Qayta ko'rish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
