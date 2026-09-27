'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Trophy, 
  List, X, Shield, Terminal, BookOpen, AlertTriangle, Code, 
  Check, ArrowRight, ArrowLeft, Sparkles, ExternalLink 
} from 'lucide-react';
import { CURRICULUM_DATA, LessonData } from '@/lib/curriculum-data';

export default function LessonViewerPage({ 
  params 
}: { 
  params: Promise<{ pathSlug: string; courseSlug: string; moduleSlug: string; lessonSlug: string }> 
}) {
  const resolvedParams = use(params);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const path = CURRICULUM_DATA[resolvedParams.pathSlug] || CURRICULUM_DATA['web-pentest'];
  const course = path.courses.find((c) => c.slug === resolvedParams.courseSlug) || path.courses[0];
  const currentModule = course.modules.find((m) => m.slug === resolvedParams.moduleSlug) || course.modules[0];
  const currentLesson: LessonData = currentModule.lessons.find((l) => l.slug === resolvedParams.lessonSlug) || currentModule.lessons[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* ── Left Sidebar: Course Navigation ── */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 bg-[#090D13] border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Kurs Mundarijasi</span>
            <h2 className="text-xs font-bold text-white truncate">{course.title}</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {course.modules.map((mod) => (
            <div key={mod.slug} className="space-y-1.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block px-2">
                {mod.title}
              </span>
              <div className="space-y-1">
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.slug === currentLesson.slug;
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/learn/${path.slug}/${course.slug}/${mod.slug}/${lesson.slug}`}
                      className={`block p-2.5 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold'
                          : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isCompleted && isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <PlayCircle className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-950/60">
          <Link href={`/learn/${path.slug}/${course.slug}`} className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kurs ma'lumotlariga qaytish</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Lesson Content ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070A0E]">
        
        {/* Top Header Bar */}
        <header className="h-14 bg-[#0B0F17] border-b border-gray-800 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white">
                <List className="w-4 h-4" />
              </button>
            )}
            <div className="text-xs text-gray-400 flex items-center space-x-2">
              <span className="text-gray-500">{course.title}</span>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-cyan-400 font-semibold">{currentLesson.title}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              +{currentLesson.xp} XP
            </span>

            <button
              onClick={() => setIsCompleted(!isCompleted)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                isCompleted
                  ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Bajarildi' : 'Tugatish (+XP)'}</span>
            </button>
          </div>
        </header>

        {/* Scrollable Educational Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Title & Summary */}
            <div className="space-y-3 pb-6 border-b border-gray-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                <span className="text-cyan-400 font-bold">{currentLesson.duration}</span>
                <span>•</span>
                <span>O'quv Moduli: {currentModule.title}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{currentLesson.title}</h1>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{currentLesson.summary}</p>
            </div>

            {/* 1. Overview */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center">
                <BookOpen className="w-4 h-4 text-cyan-400 mr-2" /> Umumiy Tushuncha va Nazariya
              </h2>
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 text-xs md:text-sm text-gray-300 leading-relaxed shadow-lg">
                {currentLesson.content.overview}
              </div>
            </div>

            {/* 2. Key Concepts */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Shield className="w-4 h-4 text-emerald-400 mr-2" /> Asosiy Kiberxavfsizlik Terminlari
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentLesson.content.keyConcepts.map((item, idx) => (
                  <div key={idx} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-2 shadow-lg">
                    <span className="text-xs font-bold text-cyan-400 block">{item.term}</span>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Code Example */}
            {currentLesson.content.codeExample && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Code className="w-4 h-4 text-purple-400 mr-2" /> Kod Tahlili (Zaif vs Xavfsiz)
                </h2>
                <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-3 bg-gray-900 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
                    <span className="font-semibold text-white">{currentLesson.content.codeExample.title}</span>
                    <button
                      onClick={() => handleCopy(currentLesson.content.codeExample?.code || '')}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      {copiedCode ? 'Nusxa olindi!' : 'Kodni nusxalash'}
                    </button>
                  </div>
                  <pre className="p-5 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed">
                    {currentLesson.content.codeExample.code}
                  </pre>
                  <div className="p-3.5 bg-gray-900/60 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
                    💡 <strong>Izoh:</strong> {currentLesson.content.codeExample.explanation}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Attack Scenario */}
            {currentLesson.content.attackScenario && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mr-2" /> Real Hujum Ssenariysi (Exploit)
                </h2>
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-lg">
                  <h3 className="text-sm font-bold text-amber-400">{currentLesson.content.attackScenario.title}</h3>
                  <div className="space-y-2">
                    {currentLesson.content.attackScenario.steps.map((step, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                        <span className="font-mono text-amber-400 font-bold">{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {currentLesson.content.attackScenario.samplePayload && (
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                        Eksploit Payload Namunasi:
                      </span>
                      <div className="bg-black border border-gray-800 rounded-xl p-3 font-mono text-xs text-yellow-300">
                        {currentLesson.content.attackScenario.samplePayload}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. Defense & Mitigation */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Shield className="w-4 h-4 text-emerald-400 mr-2" /> Ishlab Chiqishdagi Himoya Tavsiyalari
              </h2>
              <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-2xl p-6 space-y-3">
                {currentLesson.content.defenseRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Interactive Link to Practice in Lab */}
            <div className="bg-gradient-to-r from-cyan-950/30 to-emerald-950/30 border border-cyan-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white">Ushbu mavzuni amaliy laboratoriyada sinab ko'ring!</h3>
                <p className="text-xs text-gray-400 mt-0.5">Brauzeringizda xavfsiz izolyatsiya qilingan poligonni ishga tushiring.</p>
              </div>
              <Link href="/labs">
                <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5 whitespace-nowrap">
                  <Terminal className="w-4 h-4" />
                  <span>Laboratoriyani Ochish</span>
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
