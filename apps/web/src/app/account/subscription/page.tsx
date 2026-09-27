'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Zap, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountSubscriptionPage() {
  const [currentPlan] = useState({
    code: 'PRO',
    name: 'Pentester (Pro)',
    status: 'ACTIVE',
    renewsAt: '2026-10-27',
    price: 149000,
    interval: 'Oylik',
    paymentMethod: 'Payme (•••• 4920)',
  });

  const [invoices] = useState([
    { id: 'INV-2026-0901', date: '2026-09-27', amount: 149000, status: 'To\'langan', plan: 'Pentester (Pro)' },
    { id: 'INV-2026-0801', date: '2026-08-27', amount: 149000, status: 'To\'langan', plan: 'Pentester (Pro)' },
  ]);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Boshqaruv paneli</Link>
          <span>/</span>
          <span className="text-gray-200 font-semibold">Mening Obunam</span>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Obuna va To'lovlar Boshqaruvi</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Joriy tarifingiz, qolgan resurslar va to'lovlar tarixini shu yerdan nazorat qiling.
          </p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-[#0B0F17] border border-cyan-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl shadow-cyan-500/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
                  <Zap className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-white">{currentPlan.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      FAOL OBUNA
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Avtomatik uzaytirish sanasi: <strong>{currentPlan.renewsAt}</strong></p>
                </div>
              </div>

              <div className="text-xs text-gray-300 flex items-center space-x-4 pt-2">
                <div>Narx: <strong>{currentPlan.price.toLocaleString('uz-UZ')} so'm</strong> / oy</div>
                <div className="h-3 w-px bg-gray-800"></div>
                <div>To'lov usuli: <strong>{currentPlan.paymentMethod}</strong></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing">
                <Button size="sm" variant="primary" className="bg-cyan-500 text-black hover:bg-cyan-400">
                  <ArrowUpRight className="w-4 h-4 mr-1.5" /> Tarifni Oshirish (Elite)
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="border-gray-800 text-gray-400 hover:text-rose-400">
                Obunani Bekor Qilish
              </Button>
            </div>
          </div>
        </div>

        {/* Entitlements & Resource Limits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B0F17] border border-gray-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Terminal Vaqti</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white">14.5</span>
              <span className="text-xs text-gray-500">/ 25 soat qoldi</span>
            </div>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[58%]"></div>
            </div>
            <span className="text-[11px] text-gray-500 block">Har oyning 1-sanasida yangilanadi</span>
          </div>

          <div className="bg-[#0B0F17] border border-gray-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Laboratoriyalar Imkoniyati</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white">30+</span>
              <span className="text-xs text-gray-500">Ilg'or laboratoriyalar</span>
            </div>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[100%]"></div>
            </div>
            <span className="text-[11px] text-emerald-400 block font-medium">Barcha Web Pentest lablari ochiq</span>
          </div>

          <div className="bg-[#0B0F17] border border-gray-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Turnirlar va Musobaqalar</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white">CHEKSIZ</span>
            </div>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[100%]"></div>
            </div>
            <span className="text-[11px] text-gray-500 block">Barcha oylik turnirlarda bepul qatnashish</span>
          </div>
        </div>

        {/* Invoices / Payment History */}
        <div className="bg-[#0B0F17] border border-gray-800/80 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">To'lovlar va Kvitansiyalar Tarixi</h3>
            <span className="text-xs text-gray-500">So'nggi 12 oy</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-4 font-semibold">Invoys ID</th>
                  <th className="p-4 font-semibold">Sana</th>
                  <th className="p-4 font-semibold">Tarif</th>
                  <th className="p-4 font-semibold">Summa</th>
                  <th className="p-4 font-semibold">Holat</th>
                  <th className="p-4 font-semibold text-right">Chek</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="p-4 font-mono font-medium text-white">{inv.id}</td>
                    <td className="p-4 text-gray-400">{inv.date}</td>
                    <td className="p-4">{inv.plan}</td>
                    <td className="p-4 font-semibold">{inv.amount.toLocaleString('uz-UZ')} so'm</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-cyan-400 hover:text-white p-1 transition-colors" title="PDF Yuklab olish">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
