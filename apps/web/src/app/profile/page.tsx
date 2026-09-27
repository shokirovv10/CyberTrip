'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Shield, Award, Terminal, Flag, Calendar, 
  MapPin, Globe, ExternalLink, CheckCircle2, Zap, Settings, Flame 
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export default function ProfilePage() {
  const profile = {
    username: 'pentester_01',
    displayName: 'Sardorbek Abdullayev',
    role: 'SECURITY RESEARCHER',
    level: 14,
    totalXp: 4850,
    rank: 4,
    joinDate: 'Yanvar 2026',
    location: 'Toshkent, O\'zbekiston',
    team: 'CyberDragons',
    bio: 'Web application pentesting va Linux xavfsizligi bo\'yicha tadqiqotchi. Bug bounty ovchisi.',
    solvedLabs: 28,
    solvedCtf: 9,
    certificatesCount: 2,
  };

  const activityLog = [
    { action: 'Laboratoriya yakunlandi', target: 'Blind SQL Injection (Time-based)', time: 'Bugun, 14:20', xp: '+300 XP' },
    { action: 'CTF Flag tasdiqlandi', target: 'Web: JWT Cracker (HS256)', time: 'Kecha, 21:05', xp: '+250 XP' },
    { action: 'Sertifikat olindi', target: 'CYBERTRIP Certified Web Pentester', time: '3 kun oldin', xp: '+500 XP' },
    { action: 'Laboratoriya yakunlandi', target: 'Stored XSS - CyberForum', time: '5 kun oldin', xp: '+150 XP' },
  ];

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Profile Header Card */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 border-2 border-emerald-400/40 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-emerald-500/10 flex-shrink-0">
              {profile.displayName.substring(0, 2).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-white">{profile.displayName}</h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase">
                  {profile.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">@{profile.username} • Jamoa: <strong className="text-gray-200">{profile.team}</strong></p>
              <p className="text-xs text-gray-300 max-w-xl pt-1 leading-relaxed">{profile.bio}</p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-gray-400">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  {profile.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  A&apos;zolik: {profile.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link
              href="/settings"
              className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-xs font-semibold border border-gray-800 flex items-center space-x-1.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Tahrirlash</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-gray-800">
          <p className="text-xs text-gray-400">Reyting O&apos;rni</p>
          <p className="text-2xl font-black text-white mt-1">#{profile.rank}</p>
          <p className="text-[10px] text-emerald-400 mt-1 font-mono">O&apos;zbekiston bo&apos;yicha Top 5</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-gray-800">
          <p className="text-xs text-gray-400">Daraja & Ball</p>
          <p className="text-2xl font-black text-white mt-1">Daraja {profile.level}</p>
          <p className="text-[10px] text-cyan-400 mt-1 font-mono">{profile.totalXp.toLocaleString()} XP</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-gray-800">
          <p className="text-xs text-gray-400">Yechilgan Lablar</p>
          <p className="text-2xl font-black text-white mt-1">{profile.solvedLabs}</p>
          <p className="text-[10px] text-orange-400 mt-1 font-mono">Jami 60 ta laboratoriya</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-gray-800">
          <p className="text-xs text-gray-400">CTF Bayroqlari</p>
          <p className="text-2xl font-black text-white mt-1">{profile.solvedCtf}</p>
          <p className="text-[10px] text-purple-400 mt-1 font-mono">9 ta to&apos;g&apos;ri yechim</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">So&apos;nggi Faollik Jurnali</h2>

        <div className="divide-y divide-gray-800/60 font-sans">
          {activityLog.map((log, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <div>
                  <span className="text-gray-400 font-medium mr-2">{log.action}:</span>
                  <span className="font-bold text-white">{log.target}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 font-mono">
                <span className="text-emerald-400 font-bold">{log.xp}</span>
                <span className="text-gray-400 text-[11px]">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
