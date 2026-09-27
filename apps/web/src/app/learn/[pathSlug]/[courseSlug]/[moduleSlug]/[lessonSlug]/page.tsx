'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Trophy, 
  List, X, Shield, Terminal, BookOpen, AlertTriangle, Code, 
  Check, ArrowRight, ArrowLeft, Sparkles, ExternalLink, HelpCircle,
  Award, Send, RefreshCw, FileText, CheckSquare, Lock
} from 'lucide-react';
import { CURRICULUM_DATA, LessonData } from '@/lib/curriculum-data';
import { getLabBySlug, LABS_DATA } from '@/lib/labs-data';

export default function LessonViewerPage({ 
  params 
}: { 
  params: any 
}) {
  const resolvedParams: { pathSlug: string; courseSlug: string; moduleSlug: string; lessonSlug: string } =
    params && typeof (params as any)?.then === 'function' ? use(params as any) : (params || {});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'practice' | 'lab'>('theory');
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Practice state
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceVerified, setPracticeVerified] = useState(false);
  const [practiceError, setPracticeError] = useState<string | null>(null);

  const path = CURRICULUM_DATA[resolvedParams.pathSlug] || CURRICULUM_DATA['web-pentest'];
  const course = path.courses.find((c) => c.slug === resolvedParams.courseSlug) || path.courses[0];
  const currentModule = course.modules.find((m) => m.slug === resolvedParams.moduleSlug) || course.modules[0];
  const currentLesson: LessonData = currentModule.lessons.find((l) => l.slug === resolvedParams.lessonSlug) || currentModule.lessons[0];

  // Resolve linked lab
  const linkedLab = getLabBySlug(currentLesson.linkedLabSlug || 'sqli-login') || LABS_DATA[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleQuizSubmit = () => {
    if (!currentLesson.quiz) return;
    const questions = currentLesson.quiz.questions;
    let correctCount = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= currentLesson.quiz.passingScore;
    setQuizSubmitted(true);
    setQuizPassed(passed);
  };

  const handleVerifyPractice = () => {
    if (!practiceInput.trim()) {
      setPracticeError("Iltimos, avval javob yoki buyruqni kiriting.");
      return;
    }

    setPracticeError(null);
    setPracticeVerified(true);
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
          <Link href={`/learn/${path.slug}`} className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Yo'nalish darslariga qaytish</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Educational Environment ── */}
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
              <span className="text-gray-500 hidden sm:inline">{course.title}</span>
              <ChevronRight className="w-3 h-3 text-gray-600 hidden sm:inline" />
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

        {/* ── Educational Pipeline Tabs (O‘rganish → Quiz → Practice → Lab) ── */}
        <div className="bg-[#090D13] border-b border-gray-800/80 px-6 flex space-x-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'theory'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Nazariya & Tahlil</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>2. Interaktiv Quiz (+{currentLesson.quizXp || 25} XP)</span>
            {quizPassed && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'practice'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>3. Amaliy Mashq (+40 XP)</span>
            {practiceVerified && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'lab'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>4. Bog'langan Laboratoriya</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded ml-1 font-mono">
              +{linkedLab.xp} XP
            </span>
          </button>
        </div>

        {/* ── Scrollable Tab Body ── */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Title & Summary Header */}
            <div className="space-y-3 pb-6 border-b border-gray-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                <span className="text-cyan-400 font-bold">{currentLesson.duration}</span>
                <span>•</span>
                <span>O'quv Moduli: {currentModule.title}</span>
                {currentLesson.code && (
                  <>
                    <span>•</span>
                    <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-mono font-bold">
                      {currentLesson.code}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{currentLesson.title}</h1>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{currentLesson.summary}</p>
            </div>

            {/* TAB 1: THEORY CONTENT */}
            {activeTab === 'theory' && (
              <div className="space-y-8 animate-in fade-in-50">
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

                {/* Next Step CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
                  >
                    <span>2-Bosqich: Quizga O'tish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE QUIZ */}
            {activeTab === 'quiz' && currentLesson.quiz && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center">
                      <HelpCircle className="w-5 h-5 text-cyan-400 mr-2" /> Bilimlarni Sinash Testi
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      +{currentLesson.quizXp || 25} XP
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    O'tish balli: kamida {currentLesson.quiz.passingScore}%. Har bir savolga bitta to'g'ri javobni tanlang.
                  </p>
                </div>

                <div className="space-y-6">
                  {currentLesson.quiz.questions.map((q, idx) => (
                    <div key={q.id} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
                      <h4 className="text-sm font-bold text-gray-200">
                        {idx + 1}. {q.question}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[q.id] === optIdx;
                          const isCorrect = q.correctAnswer === optIdx;

                          let btnStyle = 'border-gray-800 bg-[#070A0E] text-gray-300 hover:border-gray-700';
                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-300';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-cyan-500 bg-cyan-500/15 text-cyan-300 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 bg-gray-900/80 border border-gray-800 rounded-xl text-xs text-gray-400">
                          💡 <strong>Tushuntirish:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Result Banner */}
                {quizSubmitted ? (
                  <div className={`p-6 rounded-2xl border text-center space-y-3 ${quizPassed ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'}`}>
                    <h3 className="text-lg font-bold text-white">
                      {quizPassed ? "🎉 Tabriklaymiz! Testdan muvaffaqiyatli o'tdingiz!" : "Qayta urinib ko'ring"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {quizPassed 
                        ? `Sizga +${currentLesson.quizXp || 25} XP qo'shildi. Endi amaliy mashqqa o'tishingiz mumkin!`
                        : "Xatolaringizni tahlil qiling va qayta topshiring."}
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      {!quizPassed && (
                        <button
                          onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                          className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl"
                        >
                          Qayta urinish
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTab('practice')}
                        className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl flex items-center space-x-1.5"
                      >
                        <span>3-Bosqich: Amaliy Mashqqa O'tish</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={handleQuizSubmit}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all"
                    >
                      Javoblarni Tekshirish (+XP)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PRACTICE TASK */}
            {activeTab === 'practice' && currentLesson.practice && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                      {currentLesson.practice.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      +40 XP
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{currentLesson.practice.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {currentLesson.practice.instructions}
                  </p>
                </div>

                {/* Interactive Sandbox Input */}
                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Amaliy topshiriq maydoni (Kiritish / Tahrirlash):
                  </span>
                  
                  <textarea
                    rows={4}
                    value={practiceInput || currentLesson.practice.initialInput || ''}
                    onChange={(e) => setPracticeInput(e.target.value)}
                    placeholder="Kerakli payload, parametr yoki buyruqni kiriting..."
                    className="w-full bg-[#070A0E] border border-gray-800 rounded-xl p-4 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
                  />

                  {practiceError && (
                    <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                      {practiceError}
                    </div>
                  )}

                  {practiceVerified && (
                    <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Topshiriq to'g'ri bajarildi! (+40 XP)</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {currentLesson.practice.solutionExplanation}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[11px] text-gray-500">
                      💡 Maslahat: {currentLesson.practice.hints[0]}
                    </div>

                    <button
                      onClick={handleVerifyPractice}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Tekshirish & Tasdiqlash</span>
                    </button>
                  </div>
                </div>

                {/* Advance to Lab CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveTab('lab')}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
                  >
                    <span>4-Bosqich: Laboratoriyaga O'tish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: LINKED LAB DETAILS & LAUNCH */}
            {activeTab === 'lab' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
                        {linkedLab.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                        {linkedLab.difficulty}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        +{linkedLab.xp} XP
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-black text-white">{linkedLab.title}</h2>
                      <p className="text-xs md:text-sm text-gray-400 mt-2 leading-relaxed">
                        {linkedLab.briefing}
                      </p>
                    </div>

                    {/* Target app box */}
                    <div className="bg-[#070A0E] border border-gray-800 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div>
                        <span className="text-gray-500 text-[10px] block uppercase font-bold">Nishon Ilova</span>
                        <span className="text-white font-bold">{linkedLab.targetApp}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] block uppercase font-bold">Kirish Manzili</span>
                        <span className="text-emerald-400">{linkedLab.entryPoint}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] block uppercase font-bold">Vaqt</span>
                        <span className="text-cyan-400">{linkedLab.estimatedMinutes} daqiqa</span>
                      </div>
                    </div>

                    {/* Objectives list */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        Laboratoriya Maqsadlari:
                      </span>
                      <div className="space-y-1.5">
                        {linkedLab.objectives.map((obj, i) => (
                          <div key={obj.id} className="p-3 bg-gray-900/60 border border-gray-800/80 rounded-xl flex items-start space-x-3 text-xs text-gray-300">
                            <span className="w-5 h-5 rounded-lg bg-gray-800 text-cyan-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                              {i + 1}
                            </span>
                            <div>
                              <strong className="text-white block">{obj.title}</strong>
                              <span className="text-gray-400 text-[11px]">{obj.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Big Launch CTA */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Link href={`/labs/${linkedLab.slug}/session`} className="flex-1">
                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/20">
                          <Terminal className="w-5 h-5" />
                          <span>Laboratoriyani Simulyatorda Ochish (+{linkedLab.xp} XP)</span>
                        </button>
                      </Link>

                      <Link href={`/labs/${linkedLab.slug}`}>
                        <button className="px-5 py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 rounded-2xl font-bold text-xs">
                          Brifing Sahifasi
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
