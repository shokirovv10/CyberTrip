'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Award, Flame, Zap, Terminal, Flag, 
  BookOpen, CheckCircle2, ChevronRight, Target, Shield, Clock 
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export default function ProgressPage() {
  const stats = {
    totalXp: 4850,
    level: 14,
    nextLevelXp: 6000,
    streak: 12,
    longestStreak: 19,
    learningProgress: 72,
    completedLessons: 46,
    totalLessons: 172,
    solvedLabs: 28,
    totalLabs: 60,
    solvedCtf: 9,
    totalCtf: 15,
  };

  const categories = [
    { name: 'Web Zaifliklari (SQLi, XSS, SSRF)', progress: 85, solved: 22, total: 26, color: 'bg-emerald-500' },
    { name: 'Linux va Privilege Escalation', progress: 60, solved: 6, total: 10, color: 'bg-orange-500' },
    { name: 'Tarmoq Tahlili va Sniffing', progress: 50, solved: 4, total: 8, color: 'bg-cyan-500' },
    { name: 'Kriptografiya va RSA', progress: 40, solved: 3, total: 8, color: 'bg-purple-500' },
    { name: 'Forenzika va Xotira Analizi', progress: 30, solved: 2, total: 8, color: 'bg-blue-500' },
  ];

  const recentAchievements = [
    { title: 'Birinchi Qon (First Blood)', desc: 'CTF topshirig\'ini birinchi bo\'lib yechish', date: 'Kuni kecha', icon: Flame, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { title: 'SQL Injektor Ustasi', desc: 'Barcha asosiy SQL Injection laboratoriyalarini topshirish', date: '3 kun oldin', icon: Terminal, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
    { title: 'Haftalik Izchillik', desc: '7 kun uzluksiz kiberxavfsizlik mashg\'ulotlari', date: '1 hafta oldin', icon: Zap, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  ];

  return (
    <div className="space-y-6 animate-page-enter">
      <PageHeader
        title="O'sish Ko'rsatkichi (Skill & Progress Matrix)"
        subtitle="Sizning kiberxavfsizlik sohasidagi umumiy XP, daraja, yechilgan laboratoriyalar va yo'nalishlar rivoji"
        badge={`DARAJA ${stats.level}`}
      />

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Umumiy Tajriba</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">{stats.totalXp.toLocaleString()} XP</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${(stats.totalXp / stats.nextLevelXp) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono">Keyingi darajaga: {stats.nextLevelXp - stats.totalXp} XP</p>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Amaliy Lablar</span>
            <Terminal className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">
            {stats.solvedLabs} <span className="text-sm font-normal text-gray-400">/ {stats.totalLabs}</span>
          </p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-orange-400 h-full rounded-full transition-all"
              style={{ width: `${(stats.solvedLabs / stats.totalLabs) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono">{Math.round((stats.solvedLabs / stats.totalLabs) * 100)}% yakunlandi</p>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>CTF Bayroqlar</span>
            <Flag className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">
            {stats.solvedCtf} <span className="text-sm font-normal text-gray-400">/ {stats.totalCtf}</span>
          </p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-purple-400 h-full rounded-full transition-all"
              style={{ width: `${(stats.solvedCtf / stats.totalCtf) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono">{Math.round((stats.solvedCtf / stats.totalCtf) * 100)}% topshirildi</p>
        </div>

        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Faollik Davomiyligi</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">{stats.streak} kun</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-rose-400 h-full rounded-full transition-all"
              style={{ width: `${(stats.streak / stats.longestStreak) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono">Eng uzoq rekord: {stats.longestStreak} kun</p>
        </div>
      </div>

      {/* Category Breakdown Matrix */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Yo&apos;nalishlar Bo&apos;yicha Yechimlar</h2>
          </div>
          <span className="text-xs text-gray-400">5 ta modul</span>
        </div>

        <div className="space-y-4 font-sans">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">{cat.name}</span>
                <span className="font-mono text-gray-400">{cat.solved} / {cat.total} ({cat.progress}%)</span>
              </div>
              <div className="w-full bg-gray-900 border border-gray-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${cat.color}`}
                  style={{ width: `${cat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Yaqinda Qo&apos;lga Kiritilgan Medallar</h2>
          </div>
          <Link href="/dashboard/achievements" className="text-xs text-cyan-400 hover:underline">
            Barcha medallar (15) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recentAchievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.title} className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${ach.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{ach.date}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{ach.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
