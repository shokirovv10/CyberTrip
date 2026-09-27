'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, Medal, Shield, Search, Flame, Terminal, 
  Flag, Award, Clock, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

interface LeaderboardUser {
  rank: number;
  username: string;
  displayName: string;
  team: string;
  points: number;
  solvedLabs: number;
  solvedCtf: number;
  lastActivity: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'ctf' | 'labs'>('global');
  const [search, setSearch] = useState('');

  const users: LeaderboardUser[] = [
    { rank: 1, username: 'cybershadow', displayName: 'Alisher Qodirov', team: 'CyberDragons', points: 18450, solvedLabs: 58, solvedCtf: 15, lastActivity: '5 daqiqa oldin' },
    { rank: 2, username: 'root_ninja', displayName: 'Sardor Abdullayev', team: 'NullSec Uz', points: 16900, solvedLabs: 54, solvedCtf: 14, lastActivity: '22 daqiqa oldin' },
    { rank: 3, username: 'byte_breaker', displayName: 'Dilshod Rahmatov', team: 'Tashkent RedTeam', points: 15200, solvedLabs: 49, solvedCtf: 12, lastActivity: '1 soat oldin' },
    { rank: 4, username: 'pentester_01', displayName: 'Siz (Joriy Hisob)', team: 'CyberDragons', points: 14200, solvedLabs: 42, solvedCtf: 11, lastActivity: 'Hozir faol', isCurrentUser: true },
    { rank: 5, username: 'zeroday_hunter', displayName: 'Jamshid Karimov', team: 'NullSec Uz', points: 13850, solvedLabs: 40, solvedCtf: 10, lastActivity: '3 soat oldin' },
    { rank: 6, username: 'crypto_knight', displayName: 'Bobur Mirzayev', team: 'CryptoLab', points: 12400, solvedLabs: 38, solvedCtf: 9, lastActivity: '5 soat oldin' },
    { rank: 7, username: 'packet_sniffer', displayName: 'Umar Vohidov', team: 'NetGuardians', points: 11100, solvedLabs: 35, solvedCtf: 8, lastActivity: '1 kun oldin' },
    { rank: 8, username: 'kernel_panic', displayName: 'Temur Shokirov', team: 'Tashkent RedTeam', points: 9800, solvedLabs: 31, solvedCtf: 7, lastActivity: '1 kun oldin' },
    { rank: 9, username: 'buffer_flow', displayName: 'Azizbek Saidov', team: 'CyberDragons', points: 8750, solvedLabs: 28, solvedCtf: 6, lastActivity: '2 kun oldin' },
    { rank: 10, username: 'blind_sqli', displayName: 'Farrux Toirov', team: 'NetGuardians', points: 7900, solvedLabs: 25, solvedCtf: 5, lastActivity: '3 kun oldin' },
  ];

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Page Header */}
      <PageHeader
        title="Peshqadamlar Doskasi (Leaderboard)"
        subtitle="O'zbekiston kiberxavfsizlik hamjamiyatining eng kuchli tadqiqotchilari va jamoalari reytingi"
        badge="RASMIY REYTING"
      />

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* 2nd Place */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 relative overflow-hidden order-2 md:order-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700">#2 2-O&apos;RIN</span>
            <Medal className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-base font-bold text-white">{users[1].displayName}</h3>
            <p className="text-xs text-gray-400 font-mono">@{users[1].username} • {users[1].team}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs font-mono">
            <span className="text-gray-400">{users[1].solvedLabs + users[1].solvedCtf} ta yechim</span>
            <span className="text-cyan-400 font-bold">{users[1].points.toLocaleString()} pts</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="bg-[#0B0F17] border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden order-1 md:order-2 shadow-xl shadow-yellow-500/5 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-black text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5 rounded border border-yellow-500/30">
              👑 CHEMPION #1
            </span>
            <Trophy className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-lg font-black text-white">{users[0].displayName}</h3>
            <p className="text-xs text-yellow-400/80 font-mono">@{users[0].username} • {users[0].team}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs font-mono">
            <span className="text-gray-400">{users[0].solvedLabs + users[0].solvedCtf} ta yechim</span>
            <span className="text-yellow-400 font-black text-sm">{users[0].points.toLocaleString()} pts</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 relative overflow-hidden order-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">#3 3-O&apos;RIN</span>
            <Medal className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-base font-bold text-white">{users[2].displayName}</h3>
            <p className="text-xs text-gray-400 font-mono">@{users[2].username} • {users[2].team}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs font-mono">
            <span className="text-gray-400">{users[2].solvedLabs + users[2].solvedCtf} ta yechim</span>
            <span className="text-amber-400 font-bold">{users[2].points.toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      {/* Tabs and Search Controls */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'global', label: 'Umumiy Reyting' },
            { id: 'weekly', label: 'Haftalik Top' },
            { id: 'ctf', label: 'Faqat CTF' },
            { id: 'labs', label: 'Faqat Laboratoriyalar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-850/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Foydalanuvchi yoki jamoa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Serious Leaderboard Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300 font-sans">
            <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-5 w-16">O&apos;rin</th>
                <th className="py-3 px-5">Tadqiqotchi</th>
                <th className="py-3 px-5">Jamoa</th>
                <th className="py-3 px-5">Yechilgan Lab</th>
                <th className="py-3 px-5">CTF Flaglar</th>
                <th className="py-3 px-5">Umumiy Ball</th>
                <th className="py-3 px-5 text-right">Oxirgi Faollik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {filteredUsers.map((u) => (
                <tr
                  key={u.username}
                  className={`transition-colors ${
                    u.isCurrentUser
                      ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-l-2 border-emerald-400'
                      : 'hover:bg-gray-850/40'
                  }`}
                >
                  <td className="py-3.5 px-5 font-mono font-bold">
                    <span className={u.rank === 1 ? 'text-yellow-400 font-black' : u.rank === 2 ? 'text-gray-300' : u.rank === 3 ? 'text-amber-500' : 'text-gray-400'}>
                      #{u.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-[11px] text-gray-300">
                        {u.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-white text-xs">{u.displayName}</span>
                          {u.isCurrentUser && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              SIZ
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">@{u.username}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono text-[11px]">
                      {u.team}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-gray-300">
                    <span className="text-orange-400 font-bold">{u.solvedLabs}</span> / 60
                  </td>
                  <td className="py-3.5 px-5 font-mono text-gray-300">
                    <span className="text-purple-400 font-bold">{u.solvedCtf}</span> / 15
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-emerald-400">
                    {u.points.toLocaleString()} pts
                  </td>
                  <td className="py-3.5 px-5 text-right font-mono text-gray-400 text-[11px]">
                    {u.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
