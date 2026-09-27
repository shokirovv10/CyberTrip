import { Trophy, Medal, Search } from 'lucide-react';

export default function ScoreboardPage() {
  const users = [
    { rank: 1, username: 'h4ck3r_uz', points: 4500, solves: 42, lastSolve: '2 daq oldin' },
    { rank: 2, username: 'cyber_ninja', points: 4250, solves: 39, lastSolve: '15 daq oldin' },
    { rank: 3, username: 'root_user', points: 3800, solves: 35, lastSolve: '1 soat oldin' },
    { rank: 4, username: 'null_byte', points: 3550, solves: 34, lastSolve: '3 soat oldin' },
    { rank: 5, username: 'system_admin', points: 3100, solves: 28, lastSolve: '5 soat oldin' },
    { rank: 6, username: 'packet_sniffer', points: 2900, solves: 25, lastSolve: 'Kecha' },
    { rank: 7, username: 'crypto_king', points: 2850, solves: 24, lastSolve: 'Kecha' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
          <h1 className="text-4xl font-bold">Peshqadamlar Doskasi</h1>
          <p className="text-gray-400">CTF musobaqalaridagi eng kuchli xakerlar reytingi</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end h-64 gap-4 mt-12 mb-16">
          {/* Rank 2 */}
          <div className="w-32 flex flex-col items-center">
            <div className="text-gray-300 font-bold mb-2 truncate w-full text-center">{users[1]?.username}</div>
            <div className="text-purple-400 font-mono mb-2">{users[1]?.points} pts</div>
            <div className="w-full h-32 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-lg border-t-4 border-gray-400 flex justify-center pt-4 shadow-lg">
              <span className="text-2xl font-bold text-gray-300">2</span>
            </div>
          </div>
          
          {/* Rank 1 */}
          <div className="w-32 flex flex-col items-center">
            <Medal className="w-8 h-8 text-yellow-500 mb-2" />
            <div className="text-yellow-500 font-bold mb-2 truncate w-full text-center">{users[0]?.username}</div>
            <div className="text-purple-400 font-mono mb-2">{users[0]?.points} pts</div>
            <div className="w-full h-40 bg-gradient-to-t from-yellow-900/40 to-yellow-700/40 rounded-t-lg border-t-4 border-yellow-500 flex justify-center pt-4 shadow-lg shadow-yellow-500/20">
              <span className="text-2xl font-bold text-yellow-500">1</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="w-32 flex flex-col items-center">
            <div className="text-orange-400 font-bold mb-2 truncate w-full text-center">{users[2]?.username}</div>
            <div className="text-purple-400 font-mono mb-2">{users[2]?.points} pts</div>
            <div className="w-full h-24 bg-gradient-to-t from-orange-900/20 to-orange-800/40 rounded-t-lg border-t-4 border-orange-500 flex justify-center pt-4 shadow-lg">
              <span className="text-2xl font-bold text-orange-400">3</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800/50 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Foydalanuvchini qidirish..." 
                className="bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 text-gray-200"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/80 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium w-20 text-center">#</th>
                  <th className="p-4 font-medium">Foydalanuvchi</th>
                  <th className="p-4 font-medium text-right">Ball</th>
                  <th className="p-4 font-medium text-center">Yechimlar</th>
                  <th className="p-4 font-medium text-right">So'nggi yechim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {users.map((user) => (
                  <tr key={user.rank} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-center">
                      <span className={`font-bold ${
                        user.rank === 1 ? 'text-yellow-500' :
                        user.rank === 2 ? 'text-gray-300' :
                        user.rank === 3 ? 'text-orange-400' : 'text-gray-500'
                      }`}>
                        {user.rank}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-200">
                      {user.username}
                    </td>
                    <td className="p-4 text-right font-mono text-purple-400 font-bold">
                      {user.points}
                    </td>
                    <td className="p-4 text-center text-gray-400">
                      {user.solves}
                    </td>
                    <td className="p-4 text-right text-sm text-gray-500">
                      {user.lastSolve}
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
