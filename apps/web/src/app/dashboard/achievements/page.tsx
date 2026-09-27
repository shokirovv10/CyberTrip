import { Trophy, Award, Lock, CheckCircle2, Zap } from 'lucide-react';
import { ACHIEVEMENTS } from '@/lib/gamification';

export default function DashboardAchievementsPage() {
  // Mock unlocked achievement codes
  const unlockedCodes = new Set(['first_lesson', 'first_quiz', 'first_lab', 'streak_7']);

  const unlockedCount = ACHIEVEMENTS.filter((a) => unlockedCodes.has(a.code)).length;
  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Platforma Yutuqlari (Achievements)</h1>
        <p className="text-sm text-gray-400">
          O'quv dasturi, laboratoriyalar va musobaqalardagi muvaffaqiyatlaringiz uchun beriladigan rasmiy nishonlar.
        </p>
      </div>

      {/* Progress Header */}
      <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 text-white flex-shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Ochilgan Yutuqlar</span>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {unlockedCount} / {ACHIEVEMENTS.length}{' '}
              <span className="text-xs text-emerald-400 font-bold ml-2 font-sans bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {progressPercent}% Bajarildi
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Umumiy taraqqiyot</span>
            <span className="text-cyan-400 font-bold font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 18 Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlockedCodes.has(a.code);

          return (
            <div
              key={a.id}
              className={`bg-[#0B0F17] border rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between ${
                isUnlocked
                  ? 'border-amber-500/40 hover:border-amber-500 shadow-amber-500/5'
                  : 'border-gray-800/80 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      isUnlocked
                        ? 'bg-amber-500/15 border border-amber-500/30 shadow-md shadow-amber-500/10'
                        : 'bg-gray-900 border border-gray-800 grayscale'
                    }`}
                  >
                    {a.icon}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                      +{a.xpReward} XP
                    </span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Ochiq
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded flex items-center">
                        <Lock className="w-2.5 h-2.5 mr-1" /> Qulflangan
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className={`text-base font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                    {a.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{a.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-500">Shart:</span>
                <span className="text-cyan-400 font-semibold">{a.requiredCondition}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
