import Link from 'next/link';
import { Terminal, CheckCircle2, Play, Clock, Search } from 'lucide-react';

export default function DashboardLabsPage() {
  const labs = [
    { id: 1, title: 'Nmap Asoslari', category: 'Tarmoq', date: 'Bugun', duration: '45 daq', status: 'completed', score: 100 },
    { id: 2, title: 'SQLi orqali Bypassing Auth', category: 'Web', date: 'Kecha', duration: '1 soat', status: 'completed', score: 100 },
    { id: 3, title: 'Linux Privilege Escalation', category: 'Tizim', date: 'Hozir', duration: 'Davom etmoqda', status: 'active', score: null },
  ];

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Laboratoriyalar Tarixi</h1>
          <p className="text-gray-400">Bajargan va faol laboratoriyalaringiz ro'yxati.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className="bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-gray-200 w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-5 font-medium">Laboratoriya nomi</th>
                <th className="p-5 font-medium">Toifa</th>
                <th className="p-5 font-medium">Vaqt/Sana</th>
                <th className="p-5 font-medium text-center">Holat</th>
                <th className="p-5 font-medium text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {labs.map((lab) => (
                <tr key={lab.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center">
                      <Terminal className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="font-medium text-gray-200">{lab.title}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-2.5 py-1 bg-gray-800 rounded text-xs text-gray-400 border border-gray-700">
                      {lab.category}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {lab.date} ({lab.duration})
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    {lab.status === 'completed' ? (
                      <span className="inline-flex items-center bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Yakunlangan
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                        <Play className="w-3.5 h-3.5 mr-1" /> Faol
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/labs/lab-${lab.id}`}>
                      <button className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                        lab.status === 'active' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}>
                        {lab.status === 'active' ? 'Davom etish' : 'Qayta ishlash'}
                      </button>
                    </Link>
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
