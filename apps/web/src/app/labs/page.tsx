'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, Shield, Search, Filter, Clock, Award, 
  ExternalLink, Lock, CheckCircle2, Sparkles, Layers,
  Server, ArrowRight
} from 'lucide-react';
import { LABS_DATA, LabDefinition } from '@/lib/labs-data';

export default function LabsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<'ALL' | 'FREE' | 'PREMIUM'>('ALL');

  const categories = [
    { id: 'ALL', label: 'Barchasi' },
    { id: 'SQL_INJECTION', label: 'SQL Injection' },
    { id: 'XSS', label: 'XSS' },
    { id: 'IDOR', label: 'IDOR & BOLA' },
    { id: 'SSRF', label: 'SSRF' },
    { id: 'XXE', label: 'XXE & SSTI' },
    { id: 'PATH_TRAVERSAL', label: 'Path & File' },
    { id: 'AUTHENTICATION', label: 'Auth & JWT' },
    { id: 'BUSINESS_LOGIC', label: 'Logic & Race' },
    { id: 'API_SECURITY', label: 'API & GraphQL' },
    { id: 'LINUX', label: 'Linux Lab' },
    { id: 'FORENSICS', label: 'Forenzika' },
    { id: 'OSINT', label: 'OSINT & Recon' },
    { id: 'CTF', label: 'CTF & Assessment' }
  ];

  const difficulties = ['ALL', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];

  const filteredLabs = LABS_DATA.filter((lab) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lab.title.toLowerCase().includes(q);
      const matchTarget = lab.targetApp.toLowerCase().includes(q);
      const matchCat = lab.category.toLowerCase().includes(q);
      const matchDesc = lab.description.toLowerCase().includes(q);
      if (!matchTitle && !matchTarget && !matchCat && !matchDesc) return false;
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'XXE' && (lab.category === 'XXE' || lab.category === 'SSTI')) {
        // match
      } else if (selectedCategory === 'PATH_TRAVERSAL' && (lab.category === 'PATH_TRAVERSAL' || lab.category === 'FILE_UPLOAD')) {
        // match
      } else if (selectedCategory === 'AUTHENTICATION' && (lab.category === 'AUTHENTICATION' || lab.category === 'JWT')) {
        // match
      } else if (selectedCategory === 'BUSINESS_LOGIC' && (lab.category === 'BUSINESS_LOGIC' || lab.category === 'RACE_CONDITION')) {
        // match
      } else if (selectedCategory === 'API_SECURITY' && (lab.category === 'API_SECURITY' || lab.category === 'GRAPHQL' || lab.category === 'WEBSOCKET')) {
        // match
      } else if (selectedCategory === 'OSINT' && (lab.category === 'OSINT' || lab.category === 'NETWORK')) {
        // match
      } else if (selectedCategory === 'CTF' && (lab.category === 'CTF' || lab.category === 'ASSESSMENT')) {
        // match
      } else if (lab.category !== selectedCategory) {
        return false;
      }
    }

    // Difficulty filter
    if (selectedDifficulty !== 'ALL' && lab.difficulty !== selectedDifficulty) {
      return false;
    }

    // Tier filter
    if (selectedTier === 'FREE' && lab.isPremium) return false;
    if (selectedTier === 'PREMIUM' && !lab.isPremium) return false;

    return true;
  });

  const getDiffBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Easy':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'Medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Hard':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'Expert':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/15 shadow-sm shadow-purple-500/20';
      default:
        return 'text-gray-400 border-gray-700 bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#0B0F17] via-[#0F172A] to-[#070A0E] border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full flex items-center">
                  <Terminal className="w-3 h-3 mr-1.5" /> Cyber Range & Amaliy Poligon
                </span>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  60 Asosiy Laboratoriya
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Amaliy Kiberxavfsizlik Laboratoriyalari
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Nazariyani darhol amaliyotga aylantiring. CyberBooks, CyberForum, SecureDocs, SitePreview va DataVault kabi real nishon tizimlarda kiber-zaifliklarni qidiring va fosh eting.
              </p>
            </div>

            {/* Quick Stats Widget */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-white font-mono">60</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mt-0.5">Jami Lab</span>
              </div>
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-emerald-400 font-mono">13,600+</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mt-0.5">Jami XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-5 shadow-lg">
          {/* Top Filter Bar: Search + Tier selector */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Laboratoriya, nishon ilova yoki zaiflik qidirish..."
                className="w-full bg-[#070A0E] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              {/* Tier Toggle */}
              <div className="bg-[#070A0E] border border-gray-800 rounded-xl p-1 flex text-xs font-semibold">
                <button
                  onClick={() => setSelectedTier('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${selectedTier === 'ALL' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Hammasi ({LABS_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedTier('FREE')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${selectedTier === 'FREE' ? 'bg-emerald-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Free (22)
                </button>
                <button
                  onClick={() => setSelectedTier('PREMIUM')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${selectedTier === 'PREMIUM' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Pro (38)
                </button>
              </div>

              {/* Difficulty selector */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#070A0E] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">Barcha qiyinchilik</option>
                {difficulties.filter(d => d !== 'ALL').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
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
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-[#070A0E] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <Link key={lab.id} href={`/labs/${lab.slug}`} className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl relative overflow-hidden">
                
                {/* Top Badges */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">
                        #{lab.id.toString().padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDiffBadge(lab.difficulty)}`}>
                        {lab.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {lab.isPremium ? (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded flex items-center">
                          <Lock className="w-2.5 h-2.5 mr-1" /> PRO
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                      {lab.description}
                    </p>
                  </div>

                  {/* Target & Entry Point Info */}
                  <div className="bg-[#070A0E] border border-gray-800/80 rounded-xl p-3 space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center text-gray-500">
                        <Server className="w-3 h-3 mr-1" /> Nishon:
                      </span>
                      <span className="text-cyan-300 font-semibold">{lab.targetApp}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center text-gray-500">
                        <Terminal className="w-3 h-3 mr-1" /> Manzil:
                      </span>
                      <span className="text-emerald-400 truncate max-w-[150px]">{lab.entryPoint}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-gray-400 font-mono">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                      {lab.estimatedMinutes}m
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center">
                      <Award className="w-3.5 h-3.5 mr-1" />
                      +{lab.xp} XP
                    </span>
                  </div>

                  <span className="font-bold text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Ochish <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-16 bg-[#0B0F17] border border-gray-800 rounded-2xl space-y-3">
            <Shield className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Laboratoriyalar topilmadi</h3>
            <p className="text-xs text-gray-400">Qidiruv so'rovi yoki filtr parametrlarini o'zgartirib ko'ring.</p>
          </div>
        )}

      </div>
    </div>
  );
}
