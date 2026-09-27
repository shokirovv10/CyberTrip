'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flag, Search, Filter, Plus, RefreshCw, CheckCircle2, 
  ExternalLink, Trophy, Flame, Layers 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface ChallengeItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  initialPoints: number;
  minPoints?: number;
  _count?: {
    submissions: number;
  };
}

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  const loadChallenges = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchApi<{ data: ChallengeItem[] }>('/admin/challenges');
      if (res && res.data && res.data.length > 0) {
        setChallenges(res.data);
        setDataSource('api');
      } else {
        throw new Error('No challenges from API');
      }
    } catch {
      // Fallback baseline
      setChallenges([
        { id: '1', title: 'Web: Login Bypass', slug: 'web-login-bypass', category: 'WEB', difficulty: 'BEGINNER', initialPoints: 100, _count: { submissions: 48 } },
        { id: '2', title: 'Web: Cookie Monster', slug: 'web-cookie-monster', category: 'WEB', difficulty: 'BEGINNER', initialPoints: 150, _count: { submissions: 32 } },
        { id: '3', title: 'Web: SQL Master', slug: 'web-sql-master', category: 'WEB', difficulty: 'INTERMEDIATE', initialPoints: 200, _count: { submissions: 19 } },
        { id: '4', title: 'Web: XSS Hunter', slug: 'web-xss-hunter', category: 'WEB', difficulty: 'INTERMEDIATE', initialPoints: 250, _count: { submissions: 15 } },
        { id: '5', title: 'Web: JWT Cracker', slug: 'web-jwt-cracker', category: 'WEB', difficulty: 'ADVANCED', initialPoints: 300, _count: { submissions: 8 } },
        { id: '6', title: 'Crypto: Caesar Cipher', slug: 'crypto-caesar', category: 'CRYPTO', difficulty: 'BEGINNER', initialPoints: 100, _count: { submissions: 56 } },
        { id: '7', title: 'Crypto: Base64 Chain', slug: 'crypto-base64', category: 'CRYPTO', difficulty: 'BEGINNER', initialPoints: 100, _count: { submissions: 51 } },
        { id: '8', title: 'Crypto: RSA Basics', slug: 'crypto-rsa-basics', category: 'CRYPTO', difficulty: 'INTERMEDIATE', initialPoints: 250, _count: { submissions: 12 } },
        { id: '9', title: 'Forensics: Hidden Message', slug: 'forensics-hidden', category: 'FORENSICS', difficulty: 'BEGINNER', initialPoints: 100, _count: { submissions: 38 } },
        { id: '10', title: 'Forensics: Memory Dump', slug: 'forensics-memory-dump', category: 'FORENSICS', difficulty: 'INTERMEDIATE', initialPoints: 200, _count: { submissions: 14 } },
        { id: '11', title: 'Linux: Find The Flag', slug: 'linux-find-flag', category: 'LINUX', difficulty: 'BEGINNER', initialPoints: 100, _count: { submissions: 42 } },
        { id: '12', title: 'Linux: Privilege Escalation', slug: 'linux-priv-esc', category: 'LINUX', difficulty: 'ADVANCED', initialPoints: 350, _count: { submissions: 6 } },
      ]);
      setDataSource('fallback');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white">CTF Topshiriqlar Boshqaruvi</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
              dataSource === 'api' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}>
              {dataSource === 'api' ? 'Jonli API' : 'Lokal Rejim'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Bayroqlar (flag hashes), dinamik ball tizimi va submission tahlili
          </p>
        </div>

        <button
          onClick={loadChallenges}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl border border-gray-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-purple-400' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Topshiriq nomi yoki ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          {['ALL', 'WEB', 'CRYPTO', 'FORENSICS', 'LINUX'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'Barchasi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-5">Topshiriq</th>
                <th className="py-3 px-5">Kategoriya</th>
                <th className="py-3 px-5">Daraja</th>
                <th className="py-3 px-5">Ballar</th>
                <th className="py-3 px-5">Yechilgan</th>
                <th className="py-3 px-5 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-400" />
                    Topshiriqlar yuklanmoqda...
                  </td>
                </tr>
              ) : filteredChallenges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Hech qanday topshiriq topilmadi.
                  </td>
                </tr>
              ) : (
                filteredChallenges.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-850/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          <Flag className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{item.title}</p>
                          <p className="text-[10px] text-gray-500 font-mono">/ctf/challenges/{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-purple-300 text-[11px] font-mono border border-gray-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.difficulty === 'BEGINNER'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : item.difficulty === 'INTERMEDIATE'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold font-mono text-purple-400">
                      {item.initialPoints} pts
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-gray-200">
                      {item._count?.submissions ?? 0} marta
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href={`/ctf/challenges/${item.id}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                      >
                        <span>Ko&apos;rish</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
