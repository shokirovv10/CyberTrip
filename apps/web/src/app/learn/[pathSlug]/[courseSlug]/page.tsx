'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ChevronRight, PlayCircle, CheckCircle2, Lock, Terminal, 
  ArrowLeft, Clock, BookOpen, Award, ArrowRight, Shield 
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';

export default function CourseDetailPage({ params }: { params?: { pathSlug?: string; courseSlug?: string } }) {
  const routeParams = useParams();
  const pathSlug = (routeParams?.pathSlug as string) || params?.pathSlug || 'web-pentest';
  const courseSlug = (routeParams?.courseSlug as string) || params?.courseSlug || '';
  const path = CURRICULUM_DATA[pathSlug] || CURRICULUM_DATA['web-pentest'];
  const course = path?.courses?.find((c) => c.slug === courseSlug) || path?.courses?.[0] || {
    id: 'unknown',
    slug: 'http-web-architecture',
    title: 'HTTP va Web Arxitekturasi',
    level: 'BOSHLANG\'ICH',
    hours: 8,
    description: 'Web ilovalar xavfsizligi asoslari',
    modules: []
  };

  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/learn" className="hover:text-cyan-400 transition-colors">O'rganish</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href={`/learn/${path.slug}`} className="hover:text-cyan-400 transition-colors">{path.title}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200 font-semibold">{course.title}</span>
        </div>

        {/* Course Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                {course.level}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">{course.title}</h1>
              <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" /> {course.hours} soat
                </span>
                <span className="flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1 text-cyan-400" /> {course.modules.length} ta modul
                </span>
                <span className="flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Sertifikat kiritilgan
                </span>
              </div>
            </div>

            {course.modules[0]?.lessons[0] && (
              <Link href={`/learn/${path.slug}/${course.slug}/${course.modules[0].slug}/${course.modules[0].lessons[0].slug}`}>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2 whitespace-nowrap">
                  <span>Birinchi Darsni Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Modules & Lessons Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Kurs Mundarijasi & Darslar</h2>

          <div className="space-y-4">
            {course.modules.map((mod, modIdx) => {
              const isOpen = openModuleIndex === modIdx;
              return (
                <div key={mod.slug} className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
                  <button
                    onClick={() => setOpenModuleIndex(isOpen ? -1 : modIdx)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-900/60 transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{mod.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-800/80 divide-y divide-gray-800/60 bg-gray-950/40">
                      {mod.lessons.map((lesson, lIdx) => (
                        <Link
                          key={lesson.slug}
                          href={`/learn/${path.slug}/${course.slug}/${mod.slug}/${lesson.slug}`}
                          className="flex items-center justify-between p-4 hover:bg-gray-900/50 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                              <PlayCircle className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1">{lesson.summary}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 text-xs font-mono">
                            <span className="text-gray-500">{lesson.duration}</span>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              +{lesson.xp} XP
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
