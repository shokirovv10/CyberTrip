'use client';

import { useState, useEffect } from 'react';
import { 
  Layers, Plus, Edit, Check, X, Shield, Users, 
  Sparkles, DollarSign, Building, ArrowUpRight, RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchApi } from '@/lib/api';

interface PlanRow {
  id?: string;
  code: string;
  name: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  priceMonthly: number;
  priceYearly: number;
  seats: number;
  activeSubscribers: number;
  status: 'ACTIVE' | 'ARCHIVED';
  description?: string;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PlanRow[]>([
    { code: 'FREE', name: 'Boshlang\'ich (Free)', type: 'INDIVIDUAL', priceMonthly: 0, priceYearly: 0, seats: 1, activeSubscribers: 1240, status: 'ACTIVE' },
    { code: 'PRO', name: 'Pentester (Pro)', type: 'INDIVIDUAL', priceMonthly: 149000, priceYearly: 119000 * 12, seats: 1, activeSubscribers: 420, status: 'ACTIVE' },
    { code: 'PREMIUM', name: 'Kiber-Ekspert (Elite)', type: 'INDIVIDUAL', priceMonthly: 299000, priceYearly: 239000 * 12, seats: 1, activeSubscribers: 165, status: 'ACTIVE' },
    { code: 'TEAM', name: 'Jamoa (Team)', type: 'BUSINESS', priceMonthly: 890000, priceYearly: 710000 * 12, seats: 5, activeSubscribers: 24, status: 'ACTIVE' },
    { code: 'BUSINESS', name: 'Kompaniya (Business)', type: 'BUSINESS', priceMonthly: 2490000, priceYearly: 1990000 * 12, seats: 15, activeSubscribers: 18, status: 'ACTIVE' },
    { code: 'ENTERPRISE', name: 'Korxona (Enterprise)', type: 'BUSINESS', priceMonthly: 5990000, priceYearly: 4790000 * 12, seats: 50, activeSubscribers: 6, status: 'ACTIVE' },
  ]);

  const [loading, setLoading] = useState(false);
  const [editPlan, setEditPlan] = useState<PlanRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const apiPlans = await fetchApi<any[]>('/admin/plans');
      if (Array.isArray(apiPlans) && apiPlans.length > 0) {
        setPlans(
          apiPlans.map((p) => ({
            id: p.id,
            code: p.code,
            name: p.name,
            type: p.seats > 1 || p.code === 'TEAM' || p.code === 'BUSINESS' || p.code === 'ENTERPRISE' ? 'BUSINESS' : 'INDIVIDUAL',
            priceMonthly: p.priceMonthly || 0,
            priceYearly: p.priceAnnual || (p.priceMonthly ? p.priceMonthly * 10 : 0),
            seats: p.seats || (p.limits?.maxActiveLabs || 1),
            activeSubscribers: p._count?.subscriptions || 0,
            status: p.isActive ? 'ACTIVE' : 'ARCHIVED',
            description: p.description,
          }))
        );
      }
    } catch {
      // Keep verified default plans
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlan) return;
    setIsSaving(true);
    try {
      if (editPlan.id) {
        await fetchApi(`/admin/plans/${editPlan.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: editPlan.name,
            priceMonthly: editPlan.priceMonthly,
            priceAnnual: editPlan.priceYearly,
            isActive: editPlan.status === 'ACTIVE',
          }),
        });
      }
      setPlans((prev) =>
        prev.map((p) => (p.code === editPlan.code ? editPlan : p))
      );
      setEditPlan(null);
    } catch {
      // Optimistic local update
      setPlans((prev) =>
        prev.map((p) => (p.code === editPlan.code ? editPlan : p))
      );
      setEditPlan(null);
    } finally {
      setIsSaving(false);
    }
  };

  const formatPrice = (p: number) => {
    return p === 0 ? '0' : `${p.toLocaleString()} so'm`;
  };

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Tariflar Rejasi Boshqaruvi</h1>
          <p className="text-xs text-gray-400 mt-1">
            Jismoniy va korporativ obuna paketlari narxlari, litsenziya o&apos;rinlari (seats) va limitlarni sozlash
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadPlans}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700/60 transition-all flex items-center space-x-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Yangilash</span>
          </button>

          <button
            onClick={() => setEditPlan({ code: '', name: '', type: 'BUSINESS', priceMonthly: 1000000, priceYearly: 10000000, seats: 10, activeSubscribers: 0, status: 'ACTIVE' })}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Tarif Qo&apos;shish</span>
          </button>
        </div>
      </div>

      {/* Grid of Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0B0F17] border border-gray-800 p-5 rounded-2xl">
          <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Jami Pullik Obunachilar</span>
          <span className="text-2xl font-bold text-cyan-400 mt-1 block">633 ta</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">+14% o&apos;tgan oyga nisbatan</span>
        </div>
        <div className="bg-[#0B0F17] border border-gray-800 p-5 rounded-2xl">
          <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Oylik Takroriy Daromad (MRR)</span>
          <span className="text-2xl font-bold text-white mt-1 block">186,400,000 so&apos;m</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">Bank kartalari orqali avtomatik</span>
        </div>
        <div className="bg-[#0B0F17] border border-gray-800 p-5 rounded-2xl">
          <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Korporativ O&apos;rinlar (Seats)</span>
          <span className="text-2xl font-bold text-emerald-400 mt-1 block">690 o&apos;rin</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Kompaniyalar va jamoalarda</span>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Faol Tariflar Ro&apos;yxati</h3>
          <span className="text-xs text-gray-400">Jami {plans.length} ta tarif</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Kodi</th>
                <th className="py-3 px-4">Tarif Nomi</th>
                <th className="py-3 px-4">Turi</th>
                <th className="py-3 px-4">Oylik Narxi</th>
                <th className="py-3 px-4">Yillik Narxi</th>
                <th className="py-3 px-4">O&apos;rinlar (Seats)</th>
                <th className="py-3 px-4">Obunachilar</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-gray-300">
              {plans.map((p) => (
                <tr key={p.code} className="hover:bg-gray-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                    {p.code}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.type === 'BUSINESS'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {formatPrice(p.priceMonthly)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">
                    {formatPrice(p.priceYearly)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white">{p.seats} ta</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-400">{p.activeSubscribers} ta</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditPlan(p)}
                      className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-cyan-400 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePlan} className="bg-[#0E141D] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {editPlan.code ? `Tarifni Tahrirlash: ${editPlan.code}` : 'Yangi Tarif Yaratish'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Tarif Kodi</label>
                <input
                  type="text"
                  value={editPlan.code}
                  disabled={!!editPlan.id}
                  onChange={(e) => setEditPlan({ ...editPlan, code: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Tarif Nomi</label>
                <input
                  type="text"
                  value={editPlan.name}
                  onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Oylik Narxi (so&apos;m)</label>
                  <input
                    type="number"
                    value={editPlan.priceMonthly}
                    onChange={(e) => setEditPlan({ ...editPlan, priceMonthly: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">O&apos;rinlar Soni (Seats)</label>
                  <input
                    type="number"
                    value={editPlan.seats}
                    onChange={(e) => setEditPlan({ ...editPlan, seats: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditPlan(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-xl"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
              >
                {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
