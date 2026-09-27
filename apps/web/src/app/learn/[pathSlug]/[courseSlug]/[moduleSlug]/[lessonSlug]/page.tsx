'use client';
import { use } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Trophy, List, X } from 'lucide-react';
import { useState } from 'react';

export default function LessonPage({ params }: { params: Promise<{ pathSlug: string, courseSlug: string, moduleSlug: string, lessonSlug: string }> }) {
  const resolvedParams = use(params);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0B0F14] text-gray-100 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 bg-gray-900 border-r border-gray-800/50 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
          <h2 className="font-semibold truncate">Mundarija</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {[1, 2].map((mod) => (
            <div key={mod} className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modul {mod}</h3>
              <div className="space-y-1">
                {[1, 2, 3].map((lesson) => {
                  const isActive = mod === 1 && lesson === 2;
                  const isCompleted = mod === 1 && lesson === 1;
                  
                  return (
                    <Link 
                      key={lesson}
                      href={`#`}
                      className={`block p-3 rounded-lg text-sm transition-colors ${isActive ? 'bg-gray-800 border border-gray-700' : 'hover:bg-gray-800/50 border border-transparent'}`}
                    >
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : isActive ? (
                          <PlayCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-600 flex-shrink-0"></div>
                        )}
                        <span className={isActive ? 'text-gray-200' : 'text-gray-400'}>
                          Dars {lesson}: OSI modeli
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top bar */}
        <div className="h-14 border-b border-gray-800/50 flex items-center justify-between px-4 bg-[#0B0F14]">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-gray-200">
                <List className="w-5 h-5" />
              </button>
            )}
            <div className="text-sm text-gray-400 hidden sm:flex items-center space-x-2">
              <Link href={`/learn/${resolvedParams.pathSlug}/${resolvedParams.courseSlug}`} className="hover:text-emerald-500">Ortga qaytish</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-200">{resolvedParams.lessonSlug.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
            <Trophy className="w-4 h-4 mr-1" />
            +50 XP
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          <div className="max-w-3xl w-full">
            <div className="prose prose-invert prose-emerald max-w-none">
              <h1>OSI Modeli haqida tushuncha</h1>
              <p>
                OSI (Open Systems Interconnection) modeli - bu tarmoq tizimlarining bir-biri bilan qanday muloqot qilishini tushuntiruvchi 7 qavatli konsepsiya.
              </p>
              
              <h2>Nima uchun muhim?</h2>
              <p>
                Kiberxavfsizlik mutaxassislari uchun OSI modelini bilish zarur, chunki har bir qavat o'ziga xos zaifliklarga ega va turli xil hujumlar aniq bir qavatga qaratilgan bo'ladi.
              </p>

              <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl my-8">
                <h3 className="text-emerald-500 mt-0">Dars Maqsadlari:</h3>
                <ul>
                  <li>7 qavat nomlari va vazifalarini yodlash</li>
                  <li>Ma'lumotlar inkapsulyatsiyasini tushunish</li>
                  <li>Real tarmoq qurilmalarining qaysi qavatda ishlashini ajrata olish</li>
                </ul>
              </div>

              <h3>7. Amaliy dastur qavati (Application Layer)</h3>
              <p>Foydalanuvchi ilovalari va tarmoq o'rtasidagi interfeys. Misol uchun: HTTP, FTP, SMTP.</p>
              
              <h3>6. Taqdim etish qavati (Presentation Layer)</h3>
              <p>Ma'lumotlarni shifrlash, siqish va formatlash amalga oshiriladi.</p>

              {/* Fake Content for scrolling */}
              <div className="h-64"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="h-20 border-t border-gray-800/50 bg-[#0B0F14] flex items-center justify-between px-8">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Oldingi dars</span>
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
            <span>Darsni yakunlash</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
