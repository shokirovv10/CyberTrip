'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, PlayCircle, CheckCircle2, Lock, Terminal } from 'lucide-react';
import { use } from 'react';

export default function CourseDetailPage({ params }: { params: Promise<{ pathSlug: string, courseSlug: string }> }) {
  const resolvedParams = use(params);
  const [openModule, setOpenModule] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Link href="/learn" className="hover:text-emerald-500">O'quv yo'llari</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/learn/${resolvedParams.pathSlug}`} className="hover:text-emerald-500 capitalize">{resolvedParams.pathSlug.replace('-', ' ')}</Link>
              <ChevronRight className="w-4 h-4" />
            </div>
            <h1 className="text-3xl font-bold capitalize">{resolvedParams.courseSlug.replace('-', ' ')}</h1>
            <p className="text-gray-400 text-lg">
              Tarmoq protokollari, zaifliklar va ularni himoya qilish usullari haqida chuqur bilimga ega bo'ling.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Kurs dasturi</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((mod) => (
                <div key={mod} className="bg-gray-900 border border-gray-800/50 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenModule(openModule === mod ? null : mod)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 font-mono">MOD {mod}</span>
                      <span className="font-semibold text-left">
                        {mod === 1 ? 'Tarmoq asoslari' : mod === 2 ? 'Keng tarqalgan hujumlar' : 'Himoya mexanizmlari'}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openModule === mod ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {openModule === mod && (
                    <div className="border-t border-gray-800/50">
                      {[1, 2, 3].map((lesson) => (
                        <Link 
                          key={lesson}
                          href={`/learn/${resolvedParams.pathSlug}/${resolvedParams.courseSlug}/module-${mod}/lesson-${lesson}`}
                          className="flex items-center justify-between px-6 py-3 hover:bg-gray-800/50 transition-colors border-l-2 border-transparent hover:border-emerald-500"
                        >
                          <div className="flex items-center space-x-3">
                            {mod === 1 && lesson === 1 ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : mod === 1 && lesson === 2 ? (
                              <PlayCircle className="w-5 h-5 text-blue-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-600" />
                            )}
                            <span className={mod === 1 && lesson === 1 ? "text-gray-400 line-through" : "text-gray-200"}>
                              Dars {lesson}: {mod === 1 ? "OSI modeli" : "TCP/IP arxitekturasi"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">10 daq</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800/50 rounded-xl p-6 space-y-6 sticky top-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Jarayon</span>
                <span className="text-emerald-500 font-medium">33%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
            
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Modullar:</span>
                <span className="text-gray-200">3 ta</span>
              </div>
              <div className="flex justify-between">
                <span>Darslar:</span>
                <span className="text-gray-200">9 ta</span>
              </div>
              <div className="flex justify-between">
                <span>Davomiyligi:</span>
                <span className="text-gray-200">2.5 soat</span>
              </div>
            </div>

            <Link href={`/learn/${resolvedParams.pathSlug}/${resolvedParams.courseSlug}/module-1/lesson-2`} className="block w-full">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors">
                Davom etish
              </button>
            </Link>
          </div>

          <div className="bg-gray-900 border border-gray-800/50 rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Terminal className="w-5 h-5 mr-2 text-blue-500" />
              Tegishli Laboratoriyalar
            </h3>
            <div className="space-y-3">
              <Link href="/labs/nmap-basics" className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="text-sm font-medium text-gray-200">Nmap Asoslari</div>
                <div className="text-xs text-gray-400 mt-1">Tarmoqni skanerlash amaliyoti</div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
