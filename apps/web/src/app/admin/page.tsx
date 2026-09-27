import { Users, BookOpen, Terminal, Flag, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Jami Foydalanuvchilar', value: '1,245', icon: Users, color: 'text-blue-500' },
    { title: 'Faol Kurslar', value: '12', icon: BookOpen, color: 'text-emerald-500' },
    { title: 'Laboratoriyalar', value: '45', icon: Terminal, color: 'text-orange-500' },
    { title: 'CTF Topshiriqlar', value: '28', icon: Flag, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Boshqaruv Paneli</h1>
        <p className="text-gray-400 mt-1">Platforma statistikasining umumiy ko'rinishi.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-100">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-gray-800/50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-emerald-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+12% o'tgan oydan</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100">So'nggi faolliklar</h2>
        </div>
        <div className="divide-y divide-gray-800/50">
          {[
            { user: 'ali_dev', action: 'yangi foydalanuvchi sifatida ro\'yxatdan o\'tdi', time: '10 daqiqa oldin' },
            { user: 'sardor88', action: 'SQL Injection laboratoriyasini yakunladi', time: '45 daqiqa oldin' },
            { user: 'hacker_uz', action: 'CTF flagini muvaffaqiyatli topshirdi (+100 ball)', time: '2 soat oldin' },
          ].map((log, i) => (
            <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-4"></div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-200">{log.user}</span> {log.action}
                </p>
              </div>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
