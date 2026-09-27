'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, Search, RefreshCw, CheckCircle2, ShieldCheck, 
  ExternalLink, Calendar, User, Download, FileText 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface CertificateItem {
  id: string;
  title: string;
  recipientName: string;
  verificationId: string;
  issueDate: string;
  status: string;
  user?: {
    username: string;
    email: string;
  };
}

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchApi<{ data: CertificateItem[] }>('/admin/certificates');
      if (res && res.data && res.data.length > 0) {
        setCerts(res.data);
        setDataSource('api');
      } else {
        throw new Error('No certificates from API');
      }
    } catch {
      // Fallback baseline
      setCerts([
        {
          id: '1',
          title: 'CYBERTRIP Certified Web Pentester (CWP)',
          recipientName: 'Sardor Abdullayev',
          verificationId: 'CERT-WPT-94821',
          issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          status: 'ACTIVE',
          user: { username: 'sardor_sec', email: 'sardor@sec.uz' },
        },
        {
          id: '2',
          title: 'Tarmoq Xavfsizligi Mutaxassisi',
          recipientName: 'Alisher Qodirov',
          verificationId: 'CERT-NET-12348',
          issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
          status: 'ACTIVE',
          user: { username: 'alisher_net', email: 'alisher@cybertrip.uz' },
        },
        {
          id: '3',
          title: 'Kiberxavfsizlik Asoslari Sertifikati',
          recipientName: 'Dilshod Rahmatov',
          verificationId: 'CERT-SEC-55412',
          issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
          status: 'ACTIVE',
          user: { username: 'dilshod99', email: 'dilshod@cyber.uz' },
        },
      ]);
      setDataSource('fallback');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = certs.filter((c) =>
    c.recipientName.toLowerCase().includes(search.toLowerCase()) ||
    c.verificationId.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white">Sertifikatlar Reyestri</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
              dataSource === 'api' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}>
              {dataSource === 'api' ? 'Jonli API' : 'Lokal Rejim'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Berilgan rasmiy kiberxavfsizlik sertifikatlari va kriptografik tasdiqlash
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl border border-gray-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Talaba ismi yoki Sertifikat ID (CERT-...)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-5">Sertifikat ID</th>
                <th className="py-3 px-5">Talaba</th>
                <th className="py-3 px-5">Kurs / Yo&apos;nalish</th>
                <th className="py-3 px-5">Berilgan Sana</th>
                <th className="py-3 px-5">Holati</th>
                <th className="py-3 px-5 text-right">Tekshirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                    Sertifikatlar yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Sertifikat topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-850/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {cert.verificationId}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div>
                        <p className="font-bold text-white text-xs">{cert.recipientName}</p>
                        <p className="text-[10px] text-gray-500 font-mono">{cert.user?.email || 'student@cybertrip.uz'}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-gray-200">
                      {cert.title}
                    </td>
                    <td className="py-3.5 px-5 text-gray-400">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        FAOL (ACTIVE)
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href={`/verify/${cert.verificationId}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>Rasmiy Havola</span>
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
