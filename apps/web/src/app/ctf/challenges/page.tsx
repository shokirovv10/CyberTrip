'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Flag, Shield, Code, Cpu, Globe, Hash, 
  Terminal, Eye, Layers, Award, CheckCircle2, ArrowRight,
  Filter, Sparkles, Trophy
} from 'lucide-react';
import { CTF_CHALLENGES, CTFChallenge } from '@/lib/ctf-data';

export default function CTFCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cybertrip_solved_ctfs');
      if (stored) {
        setSolvedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const categories = [
    { id: 'ALL', label: 'Barchasi' },
    { id: 'Web', label: 'Web Exploitation' },
    { id: 'Crypto', label: 'Kriptografiya' },
    { id: 'Forensics', label: 'Forenzika' },
    { id: 'Linux', label: 'Linux & PrivEsc' },
    { id: 'Network', label: 'Tarmoq Tahlili' },
    { id: 'OSINT', label: 'OSINT' },
    { id: 'Misc', label: 'Misc' },
  ];

  const difficulties = ['ALL', 'Beginner', 'Medium', 'Hard'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web':
        return Globe;
      case 'Crypto':
        return Hash;
      case 'Forensics':
        return Shield;
      case 'Linux':
        return Terminal;
      case 'Network':
        return Cpu;
      case 'OSINT':
        return Eye;
      default:
        return Flag;
    }
  };

  const getDiffBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard':
      case 'Expert':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const filteredChallenges = CTF_CHALLENGES.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchCat = c.category.toLowerCase().includes(q);
      const matchTags = c.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }

    if (selectedCategory !== 'ALL' && c.category !== selectedCategory) {
      return false;
    }

    if (selectedDifficulty !== 'ALL' && c.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  });

  const totalPoints = CTF_CHALLENGES.reduce((acc, c) => acc + c.points, 0);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-page-enter">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-[#0B0F17] via-[#120D1D] to-[#070A0E] border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-64 h-64 text-purple-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center">
                  <Flag className="w-3 h-3 mr-1.5" /> CTF Challenge Library
                </span>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  15 Rasmiy Topshiriq
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                CTF Mashg'ulotlar Maydoni
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Haqiqiy xavfsizlik zaifliklarini fosh eting, flaglarni qo'lga kiriting va kiber-sport reytingida o'z o'rningizni mustahkamlang.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-white font-mono">{CTF_CHALLENGES.length}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mt-0.5">Topshiriq</span>
              </div>
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-purple-400 font-mono">+{totalPoints}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mt-0.5">Jami Ball</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Topshiriq nomi, teg yoki toifa qidirish..." 
                className="w-full bg-[#070A0E] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#070A0E] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">Barcha qiyinchilik</option>
                {difficulties.filter(d => d !== 'ALL').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <Link href="/ctf/scoreboard">
                <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Peshqadamlar Doskasi</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/80">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all border font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 font-bold'
                    : 'bg-[#070A0E] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((c) => {
            const Icon = getCategoryIcon(c.category);
            const isSolved = solvedIds.includes(c.id);

            return (
              <Link href={`/ctf/challenges/${c.slug}`} key={c.id} className="group">
                <div className={`h-full bg-[#0B0F17] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl relative overflow-hidden ${
                  isSolved 
                    ? 'border-emerald-500/40 bg-emerald-950/10' 
                    : 'border-gray-800 hover:border-purple-500/50'
                }`}>
                  
                  <div>
                    {/* Top Row: Icon + Points + Solved badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl border transition-transform group-hover:scale-105 ${
                          isSolved 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 block">
                            #{c.id.toString().padStart(2, '0')}
                          </span>
                          <span className="text-xs font-semibold text-gray-400">{c.category}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-bold text-white font-mono">{c.points}</span>
                        <span className="text-[10px] text-purple-400 block font-mono uppercase">pts</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      {c.title}
                      {isSolved && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 inline flex-shrink-0" />
                      )}
                    </h3>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getDiffBadge(c.difficulty)}`}>
                        {c.difficulty}
                      </span>
                      {c.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-[#070A0E] text-[10px] text-gray-400 border border-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-800/80 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-mono text-[11px]">
                      Yechilgan: <strong className="text-gray-300">{c.solves}</strong>
                    </span>
                    <span className="text-purple-400 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                      {isSolved ? 'Qayta ko\'rish' : 'Boshlash'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-16 bg-[#0B0F17] border border-gray-800 rounded-2xl space-y-3">
            <Flag className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Topshiriqlar topilmadi</h3>
            <p className="text-xs text-gray-400">Qidiruv yoki filtr parametrlarini o'zgartirib ko'ring.</p>
          </div>
        )}

      </div>
    </div>
  );
}
