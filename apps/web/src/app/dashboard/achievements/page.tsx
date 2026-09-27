import { Trophy, Star, Target, Zap, Shield, Flame } from 'lucide-react';

export default function DashboardAchievementsPage() {
  const achievements = [
    { id: 1, title: 'Ilk Qadam', desc: 'Birinchi darsni yakunladingiz', icon: Star, unlocked: true, date: '10 Okt, 2023' },
    { id: 2, title: 'Skaner', desc: '5 ta Nmap laboratoriyasini yakunlang', icon: Target, unlocked: true, date: '15 Okt, 2023' },
    { id: 3, title: 'Bug Hunter', desc: 'Web zaifliklarga doir 10 ta lab', icon: Zap, unlocked: false, progress: 4, total: 10 },
    { id: 4, title: 'Himoyachi', desc: 'Kriptografiya kursini tugating', icon: Shield, unlocked: false, progress: 0, total: 1 },
    { id: 5, title: 'Tinimsiz', desc: '7 kun ketma-ket tizimga kiring', icon: Flame, unlocked: true, date: '20 Okt, 2023' },
    { id: 6, title: 'CTF Master', desc: 'CTF da 1000 ball yig\'ing', icon: Trophy, unlocked: false, progress: 450, total: 1000 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Yutuqlar</h1>
        <p className="text-gray-400">Sizning erishgan nishonlaringiz va maqsadlaringiz.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Umumiy yutuqlar</div>
            <div className="text-2xl font-bold text-gray-100">3 / 24 <span className="text-lg text-gray-500 font-normal">ochilgan</span></div>
          </div>
        </div>
        <div className="hidden md:block w-1/3 bg-gray-800 rounded-full h-3">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '12.5%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.id} className={`relative bg-gray-900 border rounded-xl p-6 transition-all ${
              a.unlocked ? 'border-gray-700 hover:border-gray-500' : 'border-gray-800 opacity-60'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  a.unlocked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-800 text-gray-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                {a.unlocked && <span className="text-xs text-gray-500">{a.date}</span>}
              </div>
              
              <h3 className={`text-lg font-bold mb-1 ${a.unlocked ? 'text-gray-100' : 'text-gray-400'}`}>
                {a.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{a.desc}</p>
              
              {!a.unlocked && (
                <div className="mt-auto">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Jarayon</span>
                    <span>{a.progress} / {a.total}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gray-500 h-1.5 rounded-full" style={{ width: `${(a.progress! / a.total!) * 100}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
