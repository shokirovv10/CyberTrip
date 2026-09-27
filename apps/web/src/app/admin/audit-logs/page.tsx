'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, RefreshCw, Search, Shield, Clock, 
  User, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface AuditLogItem {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  createdAt: string;
  user?: {
    username: string;
    email: string;
    role: string;
  };
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  const loadLogs = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchApi<{ data: AuditLogItem[] }>('/admin/audit-logs');
      if (res && res.data && res.data.length > 0) {
        setLogs(res.data);
        setDataSource('api');
      } else {
        throw new Error('No audit logs returned');
      }
    } catch {
      setLogs([
        { id: '1', action: 'ADMIN_LOGIN', resource: 'AUTH', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), user: { username: 'admin', email: 'admin@cybertrip.uz', role: 'ADMIN' } },
        { id: '2', action: 'UPDATE_USER_ROLE', resource: 'USER', resourceId: 'usr-892', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), user: { username: 'admin', email: 'admin@cybertrip.uz', role: 'ADMIN' } },
        { id: '3', action: 'LAB_EVIDENCE_VALIDATED', resource: 'LAB', resourceId: 'sqli-login', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), user: { username: 'ali_cyber', email: 'ali@cybertrip.uz', role: 'STUDENT' } },
        { id: '4', action: 'CTF_FLAG_SUBMITTED', resource: 'CTF', resourceId: 'jwt-cracker', createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), user: { username: 'pentest_pro', email: 'pro@cyber.uz', role: 'STUDENT' } },
        { id: '5', action: 'SUBSCRIPTION_UPGRADE', resource: 'PLAN', resourceId: 'PRO', createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), user: { username: 'dilshod_net', email: 'dilshod@net.uz', role: 'STUDENT' } },
      ]);
      setDataSource('fallback');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter((log) =>
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.resource.toLowerCase().includes(search.toLowerCase()) ||
    log.user?.username.toLowerCase().includes(search.toLowerCase()) ||
    log.user?.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white">Xavfsizlik Audit Jurnali</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
              dataSource === 'api' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}>
              {dataSource === 'api' ? 'Jonli API' : 'Lokal Rejim'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Platformadagi barcha muhim xavfsizlik hodisalari, kirish va o&apos;zgartirish loglari
          </p>
        </div>

        <button
          onClick={loadLogs}
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
            placeholder="Action, resurs yoki foydalanuvchi qidiruvi..."
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
                <th className="py-3 px-5">Hodisa (Action)</th>
                <th className="py-3 px-5">Resurs</th>
                <th className="py-3 px-5">Foydalanuvchi</th>
                <th className="py-3 px-5">Rol</th>
                <th className="py-3 px-5 text-right">Vaqt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                    Loglar yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    Audit loglari topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-850/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span className="font-mono font-bold text-white text-xs">{log.action}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <code className="bg-gray-800 text-cyan-300 px-2 py-0.5 rounded text-[11px] font-mono border border-gray-700">
                        {log.resource}
                      </code>
                    </td>
                    <td className="py-3.5 px-5">
                      <div>
                        <p className="font-bold text-gray-200">{log.user?.username || 'Tizim'}</p>
                        <p className="text-[10px] text-gray-500 font-mono">{log.user?.email || 'system'}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        log.user?.role === 'ADMIN'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {log.user?.role || 'SYSTEM'}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right text-gray-500 font-mono">
                      {new Date(log.createdAt).toLocaleString()}
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
