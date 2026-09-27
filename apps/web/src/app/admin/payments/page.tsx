'use client';

import { useState } from 'react';
import { 
  CreditCard, Search, Download, CheckCircle2, XCircle, 
  RefreshCw, ArrowUpRight, Shield, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentAudit {
  id: string;
  txHash: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'SUCCEEDED' | 'FAILED' | 'REFUNDED';
  cardBrand: string;
  cardLast4: string;
  planName: string;
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<PaymentAudit | null>(null);

  const [payments, setPayments] = useState<PaymentAudit[]>([
    { id: 'pay_1', txHash: 'TX-UZCARD-99214482', customerName: 'Alisher Rahmonov', customerEmail: 'alisher@orientfin.uz', amount: 2490000, currency: 'UZS', status: 'SUCCEEDED', cardBrand: 'Uzcard', cardLast4: '8642', planName: 'Kompaniya (Business)', createdAt: '2024-05-15 14:22:10' },
    { id: 'pay_2', txHash: 'TX-HUMO-44810239', customerName: 'Javohir Usmonov', customerEmail: 'j_usmonov@gmail.com', amount: 1428000, currency: 'UZS', status: 'SUCCEEDED', cardBrand: 'Humo', cardLast4: '9811', planName: 'Pentester (Pro) Yillik', createdAt: '2024-05-14 09:15:42' },
    { id: 'pay_3', txHash: 'TX-VISA-88401923', customerName: 'CyberSentinels Jamoasi', customerEmail: 'captain@sentinels.uz', amount: 890000, currency: 'UZS', status: 'SUCCEEDED', cardBrand: 'Visa', cardLast4: '4120', planName: 'Jamoa (Team)', createdAt: '2024-05-12 18:45:00' },
    { id: 'pay_4', txHash: 'TX-MC-11094822', customerName: 'Nodira Alimova', customerEmail: 'nodira@inbox.uz', amount: 299000, currency: 'UZS', status: 'SUCCEEDED', cardBrand: 'Mastercard', cardLast4: '5540', planName: 'Kiber-Ekspert (Elite)', createdAt: '2024-05-10 11:02:18' },
    { id: 'pay_5', txHash: 'TX-UZCARD-00294811', customerName: 'Farrux Toirov', customerEmail: 'farrux@bk.ru', amount: 149000, currency: 'UZS', status: 'FAILED', cardBrand: 'Uzcard', cardLast4: '8601', planName: 'Pentester (Pro)', createdAt: '2024-05-09 20:30:55' },
  ]);

  const filtered = payments.filter((p) => {
    return p.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">To'lovlar Audit Logi</h1>
          <p className="text-xs text-gray-400 mt-1">
            Bank kartalari tranzaksiyalari, xavfsiz tokenlashtirilgan to'lovlar va cheklar reyestri
          </p>
        </div>

        <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 rounded-xl transition-colors flex items-center space-x-1.5">
          <Download className="w-4 h-4" />
          <span>Buxgalteriya Eksporti (Excel)</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#0B0F17] border border-gray-800 p-4 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tranzaksiya ID yoki mijoz bo'yicha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-gray-500 hidden sm:block">
          Oxirgi 30 kun: <strong className="text-emerald-400 font-mono">98.2%</strong> muvaffaqiyatli to'lovlar
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Tranzaksiya ID</th>
                <th className="py-3 px-4">Mijoz</th>
                <th className="py-3 px-4">Tarif</th>
                <th className="py-3 px-4">Summa</th>
                <th className="py-3 px-4">To'lov Usuli</th>
                <th className="py-3 px-4">Sana & Vaqt</th>
                <th className="py-3 px-4">Holat</th>
                <th className="py-3 px-4 text-right">Chek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-gray-300">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-300">
                    {p.txHash}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{p.customerName}</span>
                    <span className="text-[10px] text-gray-500 block">{p.customerEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 text-cyan-400 font-medium">
                    {p.planName}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {p.amount.toLocaleString()} {p.currency}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono text-gray-300">{p.cardBrand} •••• {p.cardLast4}</span>
                  </td>

                  <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                    {p.createdAt}
                  </td>

                  <td className="py-3.5 px-4">
                    {p.status === 'SUCCEEDED' ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Muvaffaqiyatli
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                        <XCircle className="w-3 h-3 mr-1" /> Xatolik
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTx(p)}
                      className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-cyan-400 transition-colors"
                      title="Chekni ko'rish"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E141D] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
            <div className="text-center pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white font-sans">CYBERTRIP.UZ ELEKTRON TO'LOV CHEKI</h3>
              <span className="text-[10px] text-gray-500">Tranzaksiya: {selectedTx.txHash}</span>
            </div>

            <div className="space-y-2 py-2 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Mijoz:</span>
                <span>{selectedTx.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{selectedTx.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Xizmat turi:</span>
                <span className="text-cyan-400">{selectedTx.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">To'lov vositasi:</span>
                <span>{selectedTx.cardBrand} •••• {selectedTx.cardLast4}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sana:</span>
                <span>{selectedTx.createdAt}</span>
              </div>
              <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-sm text-white font-sans">
                <span>Jami summa:</span>
                <span className="text-emerald-400">{selectedTx.amount.toLocaleString()} UZS</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-sans text-gray-300 rounded-xl"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
