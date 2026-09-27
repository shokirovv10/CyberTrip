import Link from 'next/link';
import { Terminal, Clock, ShieldAlert, CheckSquare, Server, Play, Info } from 'lucide-react';

export default async function LabBriefingPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const { labSlug } = await params;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gray-900 border border-gray-800/50 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Server className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
                Tarmoq Xavfsizligi
              </span>
              <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/20 flex items-center">
                <ShieldAlert className="w-4 h-4 mr-1" />
                O'rta
              </span>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4 capitalize">{labSlug.replace('-', ' ')}</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Real tarmoq muhitida ochiq portlarni aniqlash va zaif xizmatlarni topish uchun Nmap vositasidan foydalanishni o'rganing.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>Davomiyligi: 45 daqiqa</span>
              </div>
              <div className="flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-gray-500" />
                <span>Mukofot: +100 XP</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Link href={`/labs/${labSlug}/session`}>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
                  <Play className="w-6 h-6 fill-current" />
                  <span>Laboratoriyani boshlash</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Info className="w-6 h-6 mr-2 text-emerald-500" />
                Tavsif
              </h2>
              <div className="text-gray-400 space-y-4 leading-relaxed bg-gray-900/50 p-6 rounded-xl border border-gray-800/50">
                <p>
                  Ushbu laboratoriyada sizga bitta nishon server taqdim etiladi. Sizning vazifangiz Nmap yordamida ushbu serverni skanerlash va unda qanday xizmatlar ishlayotganini aniqlashdir.
                </p>
                <p>
                  Siz turli xil skanerlash usullarini qo'llashingiz (masalan, SYN scan, Version detection) va olingan natijalarni tahlil qilishingiz kerak bo'ladi.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <CheckSquare className="w-6 h-6 mr-2 text-blue-500" />
                Maqsadlar
              </h2>
              <div className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden">
                {[
                  "Nishon serverning ochiq portlarini aniqlash",
                  "Ishlayotgan xizmatlarning versiyalarini topish",
                  "Yashirin FTP serverni aniqlash va unga anonim ulanish",
                  "Tizim haqidagi flaglarni yig'ish"
                ].map((obj, i) => (
                  <div key={i} className="flex items-start p-4 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 transition-colors">
                    <div className="w-6 h-6 rounded border border-gray-700 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 bg-gray-800">
                      <span className="text-xs text-gray-500">{i + 1}</span>
                    </div>
                    <span className="text-gray-300">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800/50 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-gray-200">Talablar</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                  Linux terminal asoslari
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                  TCP/IP portlari tushunchasi
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800/50 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-gray-200">Tegishli darslar</h3>
              <Link href="/learn/penetration-testing/network/module-1/lesson-1" className="block group">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors border border-transparent group-hover:border-gray-600">
                  <div className="text-sm font-medium text-gray-200 mb-1">Nmap ga kirish</div>
                  <div className="text-xs text-emerald-500">O'rganish &rarr;</div>
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
