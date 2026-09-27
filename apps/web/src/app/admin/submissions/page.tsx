'use client';

import { useState, useEffect } from 'react';
import { 
  FileCheck, RefreshCw, Search, CheckCircle2, XCircle, 
  Terminal, Flag, Clock, User 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface SubmissionItem {
  id: string;
  type: 'LAB' | 'CTF';
  title: string;
  category: string;
  username: string;
  isCorrect: boolean;
  time: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'ALL' | 'LAB' | 'CTF'>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  const loadSubmissions = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchApi<{ labSubmissions: any[]; ctfSubmissions: any[] }>('/admin/submissions');
      if (res && (res.labSubmissions?.length || res.ctfSubmissions?.length)) {
        const list: SubmissionItem[] = [];
        (res.labSubmissions || []).forEach((ls) => {
          list.push({
            id: ls.id,
            type: 'LAB',
            title: ls.lab?.title || 'Laboratoriya topshirig\'i',
            category: ls.lab?.category || 'WEB',
            username: ls.user?.username || 'Talaba',
            isCorrect: ls.isCorrect,
            time: ls.submittedAt,
          });
        });
        (res.ctfSubmissions || []).forEach((cs) => {
          list.push({
            id: cs.id,
            type: 'CTF',
            title: cs.challenge?.title || 'CTF Challenge',
            category: cs.challenge?.category || 'MISC',
            username: cs.user?.username || 'Talaba',
            isCorrect: cs.isCorrect,
            time: cs.createdAt,
          });
        });
        list.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setSubmissions(list);
        setDataSource('api');
      } else {
        throw new Error('No submissions returned');
      }
    } catch {
      setSubmissions([
        { id: '1', type: 'LAB', title: 'SQL Injection - CyberBooks', category: 'SQL_INJECTION', username: 'ali_cyber', isCorrect: true, time: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
        { id: '2', type: 'CTF', title: 'Web: JWT Cracker', category: 'WEB', username: 'pentest_pro', isCorrect: true, time: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: '3', type: 'LAB', title: 'Stored XSS - CyberForum', category: 'XSS', username: 'sardor_sec', isCorrect: false, time: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
        { id: '4', type: 'CTF', title: 'Crypto: RSA Basics', category: 'CRYPTO', username: 'umar_crypt', isCorrect: true, time: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
        { id: '5', type: 'LAB', title: 'Command Injection - DiagnosticPanel', category: 'COMMAND_INJECTION', username: 'dilshod_net', isCorrect: true, time: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
      ]);
      setDataSource('fallback');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const filtered = submissions.filter((s) => {
    if (filterType === 'ALL') return true;
    return s.type === filterType;
  });

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white">Yechimlar Jurnali (Submissions)</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
              dataSource === 'api' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}>
              {dataSource === 'api' ? 'Jonli API' : 'Lokal Rejim'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Talabalarning laboratoriya va CTF flag yuborish jurnali, tekshirish natijalari
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {(['ALL', 'LAB', 'CTF'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === t
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {t === 'ALL' ? 'Barchasi' : t === 'LAB' ? 'Laboratoriya' : 'CTF Bayroqlari'}
            </button>
          ))}
          <button
            onClick={loadSubmissions}
            disabled={isRefreshing}
            className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl border border-gray-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-5">Turi</th>
                <th className="py-3 px-5">Topshiriq</th>
                <th className="py-3 px-5">Kategoriya</th>
                <th className="py-3 px-5">Foydalanuvchi</th>
                <th className="py-3 px-5">Natija</th>
                <th className="py-3 px-5 text-right">Vaqt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                    Yechimlar yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Hech qanday yechim topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-850/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        s.type === 'LAB'
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-white">
                      {s.title}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-gray-400">
                      {s.category}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-semibold text-gray-200">{s.username}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      {s.isCorrect ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> To&apos;g&apos;ri
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-400 font-bold text-[11px]">
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Noto&apos;g&apos;ri
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right text-gray-500 font-mono">
                      {new Date(s.time).toLocaleTimeString()}
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
