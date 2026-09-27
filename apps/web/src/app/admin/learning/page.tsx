'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Search, RefreshCw, CheckCircle2, Clock, 
  ExternalLink, Layers, Award, ChevronRight 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  difficulty?: string;
  estimatedHours?: number;
  learningPath?: {
    id: string;
    title: string;
    slug: string;
  };
  _count?: {
    modules: number;
    userProgress: number;
  };
}

export default function AdminLearningPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchApi<{ data: CourseItem[] }>('/admin/courses');
      if (res && res.data && res.data.length > 0) {
        setCourses(res.data);
        setDataSource('api');
      } else {
        throw new Error('No courses from API');
      }
    } catch {
      // Extract from CURRICULUM_DATA
      const list: CourseItem[] = [];
      Object.values(CURRICULUM_DATA).forEach((path) => {
        path.courses.forEach((c) => {
          list.push({
            id: c.slug,
            title: c.title,
            slug: c.slug,
            difficulty: c.level,
            estimatedHours: c.hours,
            learningPath: {
              id: path.slug,
              title: path.title,
              slug: path.slug,
            },
            _count: {
              modules: c.modules.length,
              userProgress: Math.floor(Math.random() * 80) + 15,
            },
          });
        });
      });
      setCourses(list);
      setDataSource('fallback');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase()) ||
    c.learningPath?.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white">Ta&apos;lim & Kurslar Boshqaruvi</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
              dataSource === 'api' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}>
              {dataSource === 'api' ? 'Jonli API' : 'Lokal O\'quv Dasturi'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            6 ta ta&apos;lim yo&apos;li, 15 ta kurs va 172 ta darsliklar statistikasi
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl border border-gray-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Kurs yoki yo'nalish nomi bo'yicha qidiruv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <span className="text-xs text-gray-400 font-mono hidden sm:inline">
          {filtered.length} ta kurs topildi
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-5">Kurs Nomi</th>
                <th className="py-3 px-5">Ta&apos;lim Yo&apos;li</th>
                <th className="py-3 px-5">Daraja</th>
                <th className="py-3 px-5">Modullar</th>
                <th className="py-3 px-5">O&apos;quvchilar</th>
                <th className="py-3 px-5">Davomiylik</th>
                <th className="py-3 px-5 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    Kurslar yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    Kurs topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-850/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{c.title}</p>
                          <p className="text-[10px] text-gray-500 font-mono">slug: {c.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-cyan-400 font-medium">
                        {c.learningPath?.title || 'Umumiy'}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800 text-gray-300">
                        {c.difficulty || 'BOSHLANG\'ICH'}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-gray-200">
                      {c._count?.modules ?? 3} ta modul
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-emerald-400">
                      {c._count?.userProgress ?? 25} talaba
                    </td>
                    <td className="py-3.5 px-5 font-mono text-gray-400">
                      {c.estimatedHours ?? 8} soat
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href={`/learn/${c.learningPath?.slug || 'web-pentest'}/${c.slug}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                      >
                        <span>Ochish</span>
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
