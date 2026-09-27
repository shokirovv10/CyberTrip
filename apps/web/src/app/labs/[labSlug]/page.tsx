import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Terminal, Clock, ShieldAlert, CheckSquare, Server, Play, 
  Info, ArrowLeft, Award, HelpCircle, Lock, Sparkles, BookOpen 
} from 'lucide-react';
import { getLabBySlug, LABS_DATA } from '@/lib/labs-data';

export default async function LabBriefingPage({ 
  params 
}: { 
  params: { labSlug: string } | Promise<{ labSlug: string }> 
}) {
  const resolved = await Promise.resolve(params);
  const labSlug = resolved?.labSlug || 'sqli-login';
  const lab = getLabBySlug(labSlug) || LABS_DATA[0];

  const getDiffBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Easy':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'Medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Hard':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'Expert':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/15 shadow-sm shadow-purple-500/20';
      default:
        return 'text-gray-400 border-gray-700 bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link href="/labs" className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Laboratoriyalar katalogiga qaytish
          </Link>
          <span className="text-xs font-mono text-gray-500">
            Laboratoriya ID: #{lab.id.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Hero Briefing Card */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Server className="w-64 h-64 text-cyan-400" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {lab.category.replace('_', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getDiffBadge(lab.difficulty)}`}>
                {lab.difficulty}
              </span>
              {lab.isPremium ? (
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Lock className="w-3 h-3 mr-1" /> Premium Lab
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                  Barcha uchun ochiq (Free)
                </span>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{lab.title}</h1>
              <p className="text-sm md:text-base text-gray-400 max-w-3xl mt-3 leading-relaxed">
                {lab.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-xs text-gray-300 font-mono">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Kutilayotgan vaqt: {lab.estimatedMinutes} daqiqa</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Mukofot: +{lab.xp} XP</span>
              </div>
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-2 text-purple-400" />
                <span>Nishon: <strong className="text-white">{lab.targetApp}</strong> ({lab.entryPoint})</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link href={`/labs/${lab.slug}/session`} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black px-8 py-3.5 rounded-xl font-black text-sm flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Laboratoriyani Ishga Tushirish</span>
                </button>
              </Link>

              <Link href="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>Tegishli Darsni Ko'rish</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content (2 Columns) */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Briefing */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Info className="w-4 h-4 mr-2 text-cyan-400" />
                Operatsion Brifing (Vazifa Tafsiloti)
              </h2>
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 text-xs md:text-sm text-gray-300 leading-relaxed space-y-4 shadow-lg">
                <p>{lab.briefing}</p>
                <div className="bg-[#070A0E] border border-gray-800 rounded-xl p-4 font-mono text-xs text-yellow-300/90">
                  ⚠️ <strong>Eslatma:</strong> Barcha harakatlar xavfsiz izolyatsiyalangan simulyator muhitida amalga oshiriladi. Tashqi tizimlarga ta'sir ko'rsatilmaydi.
                </div>
              </div>
            </section>

            {/* Objectives */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center justify-between">
                <span className="flex items-center">
                  <CheckSquare className="w-4 h-4 mr-2 text-emerald-400" />
                  Amaliy Maqsadlar (Objectives)
                </span>
                <span className="text-xs font-mono text-gray-500 font-normal">
                  {lab.objectives.length} ta topshiriq
                </span>
              </h2>
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-lg divide-y divide-gray-800">
                {lab.objectives.map((obj, i) => (
                  <div key={obj.id} className="p-4 flex items-start space-x-3.5 hover:bg-gray-900/40 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{obj.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (1 Column) */}
          <div className="space-y-6">
            
            {/* Target App Card */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-lg">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                <Server className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Nishon Infratuzilma
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Ilova Nomi</span>
                  <span className="text-white font-semibold font-mono text-sm">{lab.targetApp}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Kirish Nuqtasi</span>
                  <span className="text-emerald-400 font-mono">{lab.entryPoint}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Holat</span>
                  <span className="text-emerald-400 font-semibold flex items-center mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    Simulyator tayyor
                  </span>
                </div>
              </div>
            </div>

            {/* Hints Overview */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-yellow-400" /> Maslahatlar (Hints)
              </h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Laboratoriyada jami {lab.hints.length} ta yordamchi maslahat mavjud. Har bir maslahat ochilganda kichik XP jarimasi olinadi.
              </p>
              <div className="space-y-1.5 pt-1">
                {lab.hints.map((h) => (
                  <div key={h.level} className="flex items-center justify-between text-[11px] bg-[#070A0E] border border-gray-800 rounded-lg p-2 font-mono">
                    <span className="text-gray-300">{h.title}</span>
                    <span className="text-rose-400 font-bold">-{h.penalty} XP</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Avtomatlashtirilgan Tekshiruv
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Dalillar server tomonida real vaqt rejimida tekshiriladi. Yakunlangach darhol profilingizga XP qo'shiladi va tegishli yutuqlar (Achievements) ochiladi.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
