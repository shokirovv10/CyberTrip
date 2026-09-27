import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Clock, BookOpen, Trophy, ChevronRight, Lock, 
  ArrowLeft, ArrowRight, CheckCircle2, Shield, Sparkles 
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';

export default async function LearningPathPage({ params }: { params: { pathSlug: string } | Promise<{ pathSlug: string }> }) {
  const resolved = await Promise.resolve(params);
  const pathSlug = resolved?.pathSlug || 'web-pentest';
  const path = CURRICULUM_DATA[pathSlug] || CURRICULUM_DATA['web-pentest'];

  if (!path) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/learn" className="hover:text-cyan-400 transition-colors flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Barcha yo'nalishlar
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200 font-semibold">{path.title}</span>
        </div>

        {/* Path Header Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${path.badgeColor}`}>
                {path.level} DARAJA
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white">{path.title}</h1>
              <p className="text-sm text-cyan-400 font-medium">{path.subtitle}</p>
              <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{path.description}</p>
            </div>

            <Link href={`/learn/${path.slug}/${path.courses[0]?.slug || 'http-web-architecture'}`}>
              <button className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2 whitespace-nowrap">
                <span>O'rganishni Boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800/80 text-xs">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Davomiyligi</span>
              <span className="text-sm font-bold text-white font-mono">{path.hours} akademik soat</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Kurslar soni</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">{path.courses.length} ta chuqur kurs</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Amaliy Poligon</span>
              <span className="text-sm font-bold text-emerald-400">100% amaliyot</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Sertifikat</span>
              <span className="text-sm font-bold text-white">Rasmiy diplom</span>
            </div>
          </div>
        </div>

        {/* Courses in this Path */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Ushbu Yo'nalishdagi Kurslar Ro'yxati</h2>
            <span className="text-xs text-gray-400">{path.courses.length} ta modul</span>
          </div>

          <div className="grid gap-5">
            {path.courses.map((course, idx) => (
              <div
                key={course.slug}
                className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center flex-shrink-0">
                      0{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white">{course.title}</h3>
                        <span className="text-[10px] bg-gray-900 border border-gray-800 text-gray-400 px-2 py-0.2 rounded font-mono">
                          {course.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-2xl">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <Link href={`/learn/${path.slug}/${course.slug}`} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 bg-gray-900 hover:bg-cyan-500 hover:text-black border border-gray-800 text-xs font-bold text-gray-200 rounded-xl transition-all flex items-center justify-center space-x-1.5">
                      <span>Kursni Ochish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>

                {/* Modules breakdown */}
                <div className="pt-3 border-t border-gray-800/80 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                  <div className="flex items-center space-x-4">
                    <span>{course.modules.length} ta modul</span>
                    <span>•</span>
                    <span>{course.hours} soat darslik</span>
                    <span>•</span>
                    <span>Prerequisites: {course.prerequisites.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
