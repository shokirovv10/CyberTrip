'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  Shield, Users, MessageSquare, Copy, Check, Crown, Award, 
  Settings, LogOut, UserPlus, ArrowLeft, Trophy, Flag, Terminal, 
  Sparkles, ExternalLink, RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Member {
  id: string;
  name: string;
  username: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  xp: number;
  solves: number;
  avatarColor: string;
  joinedAt: string;
}

export default function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [activeTab, setActiveTab] = useState<'roster' | 'stats' | 'settings'>('roster');
  const [copied, setCopied] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const [userRole, setUserRole] = useState<'OWNER' | 'ADMIN' | 'MEMBER'>('OWNER');

  // Realistic mock data for the team
  const team = {
    name: slug === 'cyber-sentinels' ? 'CyberSentinels' : 'Tashkent Red Team',
    slug: slug,
    description: 'O\'zbekistonning yetakchi kiber-sport va CTF jamoasi. Web xavfsizlik, xavfsizlik auditi va amaliy exploit tahlili bo\'yicha ixtisoslashgan.',
    inviteCode: 'CT-SENTINEL-9942',
    rank: 1,
    totalPoints: 12450,
    solvesCount: 84,
    joinPolicy: 'INVITE_ONLY',
    tags: ['Web Pentest', 'Bug Bounty', 'Reverse Engineering', 'CTF Masters'],
    createdAt: '2024-03-15',
  };

  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Alisher Qodirov', username: 'alisher_sec', role: 'OWNER', xp: 4800, solves: 32, avatarColor: 'from-cyan-500 to-blue-600', joinedAt: '2024-03-15' },
    { id: '2', name: 'Bobur Mirzayev', username: 'bobur_red', role: 'ADMIN', xp: 3950, solves: 27, avatarColor: 'from-emerald-500 to-teal-600', joinedAt: '2024-03-18' },
    { id: '3', name: 'Dilnoza Karimova', username: 'dilnoza_pwn', role: 'MEMBER', xp: 2300, solves: 16, avatarColor: 'from-purple-500 to-pink-600', joinedAt: '2024-04-02' },
    { id: '4', name: 'Sardorbek Rahimov', username: 'sardor_bin', role: 'MEMBER', xp: 1400, solves: 9, avatarColor: 'from-amber-500 to-orange-600', joinedAt: '2024-05-10' },
  ]);

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'OWNER':
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <Crown className="w-3 h-3 mr-1" /> Sardor (Owner)
          </span>
        );
      case 'ADMIN':
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded-full">
            A'zo (Member)
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/teams"
          className="inline-flex items-center text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Barcha Jamoalar
        </Link>

        {/* Team Header Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start md:items-center space-x-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-xl flex-shrink-0">
                <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center text-cyan-400">
                  <Shield className="w-10 h-10" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-black text-white">{team.name}</h1>
                  <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
                    <Trophy className="w-3 h-3 mr-1 text-amber-400" /> Rank #{team.rank}
                  </span>
                </div>
                <p className="text-xs text-gray-400 max-w-2xl leading-relaxed mb-3">
                  {team.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {team.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-gray-900 border border-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto">
              <Link href={`/teams/${slug}/chat`} className="w-full">
                <button className="w-full px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Jamoa Chatiga Kirish</span>
                </button>
              </Link>

              <button
                onClick={copyInviteCode}
                className="flex-1 md:w-full px-4 py-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 text-xs text-gray-300 font-semibold rounded-xl flex items-center justify-center space-x-2 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nusxa olindi!' : `Kod: ${team.inviteCode}`}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-800/80">
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Umumiy Ball</span>
              <span className="text-xl font-bold text-cyan-400">{team.totalPoints.toLocaleString()} XP</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Yechilgan Flaglar</span>
              <span className="text-xl font-bold text-white">{team.solvesCount} ta</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">A'zolar Soni</span>
              <span className="text-xl font-bold text-white">{members.length} / 5 kishi</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Tashkil topgan</span>
              <span className="text-xl font-bold text-gray-400">{team.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('roster')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'roster'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Jamoa Tarkibi ({members.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Musobaqalar va Yutuqlar</span>
          </button>
          {userRole === 'OWNER' && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Jamoa Sozlamalari</span>
            </button>
          )}
        </div>

        {/* Tab 1: Roster */}
        {activeTab === 'roster' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Faol Ishtirokchilar</h3>
                <p className="text-[11px] text-gray-400">Jamoaning rasmiy ro'yxatdan o'tgan a'zolari va ularning roli</p>
              </div>
              <div className="text-xs text-gray-400">
                Maksimal: <span className="text-white font-bold">5 a'zo</span>
              </div>
            </div>

            <div className="divide-y divide-gray-800/80">
              {members.map((m, idx) => (
                <div key={m.id} className="p-4 flex items-center justify-between hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-gray-500 w-4">{idx + 1}</span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{m.name}</span>
                        <span className="text-xs text-gray-400 font-mono">@{m.username}</span>
                        {getRoleBadge(m.role)}
                      </div>
                      <span className="text-[11px] text-gray-500">Qo'shilgan sana: {m.joinedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-xs font-bold text-cyan-400">{m.xp.toLocaleString()} XP</span>
                      <span className="text-[10px] text-gray-500 block">{m.solves} ta flag</span>
                    </div>

                    {userRole === 'OWNER' && m.role !== 'OWNER' && (
                      <button
                        title="A'zodan chiqarish"
                        className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Stats & Achievements */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center">
                <Flag className="w-4 h-4 text-cyan-400 mr-2" /> So'nggi CTF Natijalari
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'CyberTrip Spring CTF 2024', rank: '1-o\'rin (Chempion)', points: 4500, date: 'May 2024' },
                  { name: 'Tashkent University Cyber Cup', rank: '2-o\'rin', points: 3800, date: 'Aprel 2024' },
                  { name: 'Web Security Blitz #12', rank: '1-o\'rin', points: 2100, date: 'Mart 2024' },
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{c.name}</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold">{c.rank}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-cyan-400 font-bold">+{c.points} XP</span>
                      <span className="text-[10px] text-gray-500 block">{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center">
                <Award className="w-4 h-4 text-amber-400 mr-2" /> Jamoa Nishonlari
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Top 1 Leaderboard', desc: 'Respublika bo\'yicha 1-o\'rin', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
                  { title: 'First Blood Masters', desc: '10+ ta birinchi flaglar', color: 'border-red-500/30 text-red-400 bg-red-500/10' },
                  { title: 'Web Exploiter Clan', desc: 'Barcha Web lablar to\'liq', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' },
                  { title: 'Unstoppable Team', desc: '30 kunlik faoliyat uzluksizligi', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
                ].map((b, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${b.color} space-y-1`}>
                    <span className="text-xs font-bold block">{b.title}</span>
                    <span className="text-[10px] text-gray-400 block">{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && userRole === 'OWNER' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white">Jamoa Sozlamalari</h3>
              <p className="text-xs text-gray-400">Jamoa ma'lumotlarini boshqarish va taklif kodini yangilash</p>
            </div>

            <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-200 block">Yangi Taklif Kodi Yaratish</span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Eski kod bekor qilinadi va yangi kiber-talabalar faqat yangi kod bilan kira olishadi.
                </span>
              </div>
              <button
                onClick={copyInviteCode}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Kodni Qayta Generatsiya Qilish</span>
              </button>
            </div>

            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-red-400 block">Jamoani Tarqatib Yuborish (Disband)</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">
                  Barcha a'zolar jamoa tarkibidan chiqariladi va chat yozishmalari arxivlanadi. Bu amalni ortga qaytarib bo'lmaydi.
                </span>
              </div>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors">
                Jamoani Tarqatish
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
