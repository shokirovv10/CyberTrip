'use client';

import { useState } from 'react';
import { 
  RefreshCw, Search, Filter, CheckCircle2, Clock, 
  AlertCircle, CreditCard, MoreVertical, ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubscriptionRow {
  id: string;
  customerName: string;
  customerEmail: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  planCode: string;
  billingCycle: 'MONTHLY' | 'YEARLY';
  amount: number;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED';
  cardBrand: string;
  cardLast4: string;
  nextBillingAt: string;
}

export default function AdminSubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('ALL');

  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([
    { id: 'sub_1', customerName: 'Alisher Rahmonov', customerEmail: 'alisher@orientfin.uz', type: 'BUSINESS', planCode: 'BUSINESS', billingCycle: 'MONTHLY', amount: 2490000, status: 'ACTIVE', cardBrand: 'Uzcard', cardLast4: '8642', nextBillingAt: '2024-06-15' },
    { id: 'sub_2', customerName: 'Javohir Usmonov', customerEmail: 'j_usmonov@gmail.com', type: 'INDIVIDUAL', planCode: 'PRO', billingCycle: 'YEARLY', amount: 1428000, status: 'ACTIVE', cardBrand: 'Humo', cardLast4: '9811', nextBillingAt: '2025-03-20' },
    { id: 'sub_3', customerName: 'CyberSentinels Jamoasi', customerEmail: 'captain@sentinels.uz', type: 'BUSINESS', planCode: 'TEAM', billingCycle: 'MONTHLY', amount: 890000, status: 'ACTIVE', cardBrand: 'Visa', cardLast4: '4120', nextBillingAt: '2024-06-18' },
    { id: 'sub_4', customerName: 'Nodira Alimova', customerEmail: 'nodira@inbox.uz', type: 'INDIVIDUAL', planCode: 'PREMIUM', billingCycle: 'MONTHLY', amount: 299000, status: 'ACTIVE', cardBrand: 'Mastercard', cardLast4: '5540', nextBillingAt: '2024-06-25' },
    { id: 'sub_5', customerName: 'Farrux Toirov', customerEmail: 'farrux@bk.ru', type: 'INDIVIDUAL', planCode: 'PRO', billingCycle: 'MONTHLY', amount: 149000, status: 'PAST_DUE', cardBrand: 'Uzcard', cardLast4: '8601', nextBillingAt: '2024-05-28' },
  ]);

  const filtered = subscriptions.filter((s) => {
    const matchesSearch = s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'ALL' || s.planCode === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Obunalar Boshqaruvi</h1>
          <p className="text-xs text-gray-400 mt-1">
            Foydalanuvchilar va korxonalar faol obunalari, to'lov sikli va avtomatik uzaytirish holati
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B0F17] border border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Mijoz nomi yoki email bo'yicha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400">Tarif filtri:</span>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Barcha tariflar</option>
            <option value="PRO">PRO</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="TEAM">TEAM</option>
            <option value="BUSINESS">BUSINESS</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Mijoz / Akkaunt</th>
                <th className="py-3 px-4">Tarif</th>
                <th className="py-3 px-4">To'lov Davri</th>
                <th className="py-3 px-4">Summa</th>
                <th className="py-3 px-4">Bog'langan Karta</th>
                <th className="py-3 px-4">Keyingi To'lov</th>
                <th className="py-3 px-4">Holat</th>
                <th className="py-3 px-4 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-gray-300">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">{s.customerName}</span>
                    <span className="text-[10px] text-gray-500 block">{s.customerEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                    {s.planCode}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-gray-300">{s.billingCycle === 'YEARLY' ? 'Yillik (-20%)' : 'Oylik'}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-white">
                    {s.amount.toLocaleString()} so'm
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5 font-mono text-gray-300">
                      <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                      <span>{s.cardBrand} •••• {s.cardLast4}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-400 font-mono">
                    {s.nextBillingAt}
                  </td>

                  <td className="py-3.5 px-4">
                    {s.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Faol
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3 mr-1" /> Qarzdor
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button className="text-gray-500 hover:text-white p-1 rounded hover:bg-gray-800">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
