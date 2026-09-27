import Link from 'next/link';
import { 
  Globe, Terminal, Shield, Lock, Search, Activity, 
  Clock, BookOpen, ArrowRight, Award, CheckCircle2 
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';

export default function LearnPage() {
  const paths = Object.values(CURRICULUM_DATA);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Rasmiy Ta'lim Dasturi
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Kiberxavfsizlik O'quv Yo'nalishlari
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Noldan professional darajagacha: har bir darsda aniq tushunchalar, real kiber-hujum ssenariylari, kod namunalari va amaliy himoyalanish metodikasi mavjud.
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((p) => (
            <Link key={p.slug} href={`/learn/${p.slug}`} className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-xl hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {p.iconName === 'Globe' && <Globe className="w-6 h-6" />}
                      {p.iconName === 'Terminal' && <Terminal className="w-6 h-6" />}
                      {p.iconName === 'Activity' && <Activity className="w-6 h-6" />}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-[10px] bg-gray-900 border border-gray-800 text-gray-400 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-gray-500 font-mono">
                    <span className="flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1" />
                      {p.coursesCount} kurs
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {p.hours} soat
                    </span>
                  </div>

                  <span className="font-bold text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Boshlash <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
