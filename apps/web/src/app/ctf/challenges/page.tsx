import Link from 'next/link';
import { Search, Filter, Flag, Shield, Code, Cpu, Globe, Hash } from 'lucide-react';

export default function CTFCatalogPage() {
  const challenges = [
    { id: 1, title: 'SQL Injection 101', category: 'Web', points: 100, difficulty: 'Oson', solves: 342, icon: Globe },
    { id: 2, title: 'Buffer Overflow', category: 'Pwn', points: 300, difficulty: 'Qiyin', solves: 45, icon: Cpu },
    { id: 3, title: 'RSA Basics', category: 'Crypto', points: 150, difficulty: 'O' + "rta", solves: 210, icon: Hash },
    { id: 4, title: 'Hidden in Plain Sight', category: 'Stego', points: 50, difficulty: 'Oson', solves: 512, icon: Shield },
    { id: 5, title: 'Reverse Me', category: 'Rev', points: 250, difficulty: 'O' + "rta", solves: 89, icon: Code },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center text-purple-400">
              <Flag className="w-8 h-8 mr-3" />
              CTF Musobaqalari
            </h1>
            <p className="text-gray-400 mt-2">Amaliy kiberxavfsizlik ko'nikmalaringizni sinab ko'ring va reytingda ko'tariling.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/ctf/scoreboard">
              <button className="bg-gray-900 border border-gray-800 hover:border-purple-500 text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium">
                Peshqadamlar doskasi
              </button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Qidirish..." 
              className="w-full bg-[#0B0F14] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-[#0B0F14] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
              <option>Barcha toifalar</option>
              <option>Web</option>
              <option>Crypto</option>
              <option>Pwn</option>
              <option>Reverse Engineering</option>
            </select>
            <select className="bg-[#0B0F14] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
              <option>Qiyinchilik</option>
              <option>Oson</option>
              <option>O'rta</option>
              <option>Qiyin</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => {
            const Icon = c.icon;
            return (
              <Link href={`/ctf/challenges/${c.id}`} key={c.id}>
                <div className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-100">{c.points}</span>
                      <span className="text-xs text-purple-400 block font-mono">pts</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{c.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded bg-gray-800 text-xs font-medium text-gray-300 border border-gray-700">
                      {c.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border ${
                      c.difficulty === 'Oson' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      c.difficulty === 'O\'rta' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between items-center text-xs text-gray-500">
                    <span>Yechilgan: <strong className="text-gray-300">{c.solves}</strong> marta</span>
                    <span>Muallif: admin</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  );
}
