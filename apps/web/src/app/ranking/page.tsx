'use client';
import { useState } from 'react';
import { Trophy, Medal, Star, Shield, Search } from 'lucide-react';

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState('global');

  const tabs = [
    { id: 'global', label: 'Global Reyting' },
    { id: 'weekly', label: 'Haftalik' },
    { id: 'ctf', label: 'CTF' },
    { id: 'labs', label: 'Laboratoriyalar' },
  ];

  const users = [
    { rank: 1, username: 'h4ck3r_uz', level: 42, points: 15400, badges: 12 },
    { rank: 2, username: 'cyber_ninja', level: 39, points: 14250, badges: 10 },
    { rank: 3, username: 'root_user', level: 35, points: 12800, badges: 8 },
    { rank: 4, username: 'null_byte', level: 31, points: 11550, badges: 7 },
    { rank: 5, username: 'system_admin', level: 28, points: 9100, badges: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center text-gray-100 mb-2">
              <Trophy className="w-8 h-8 mr-3 text-emerald-500" />
              O'yinchilar Reytingi
            </h1>
            <p className="text-gray-400">Platformadagi eng faol va kuchli o'quvchilar</p>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="O'yinchini qidirish..." 
              className="bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-gray-200"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-2 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-5 font-medium w-20 text-center">O'rin</th>
                  <th className="p-5 font-medium">Foydalanuvchi</th>
                  <th className="p-5 font-medium text-center">Daraja</th>
                  <th className="p-5 font-medium text-center">Nishonlar</th>
                  <th className="p-5 font-medium text-right">Umumiy XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {users.map((user) => (
                  <tr key={user.rank} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-5 text-center">
                      {user.rank === 1 ? <Medal className="w-6 h-6 text-yellow-500 mx-auto" /> :
                       user.rank === 2 ? <Medal className="w-6 h-6 text-gray-300 mx-auto" /> :
                       user.rank === 3 ? <Medal className="w-6 h-6 text-orange-400 mx-auto" /> :
                       <span className="font-bold text-gray-500">{user.rank}</span>}
                    </td>
                    <td className="p-5 font-medium text-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-emerald-500">
                          {user.username.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{user.username}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex items-center justify-center bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-300">
                        Lv. {user.level}
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center text-gray-400">
                        <Shield className="w-4 h-4 mr-1 text-purple-500" />
                        {user.badges}
                      </div>
                    </td>
                    <td className="p-5 text-right font-mono font-bold text-emerald-400">
                      {user.points.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
