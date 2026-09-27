import Link from 'next/link';
import { Clock, BookOpen, Trophy, ChevronRight, Lock } from 'lucide-react';

export default async function LearningPathPage({ params }: { params: Promise<{ pathSlug: string }> }) {
  const { pathSlug } = await params;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <Link href="/learn" className="hover:text-emerald-500">O'quv yo'llari</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-200 capitalize">{pathSlug.replace('-', ' ')}</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-100 capitalize">{pathSlug.replace('-', ' ')} Mutaxassisi</h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Kiberxavfsizlik sohasida professional bo'lish uchun kerakli barcha bilimlarni shu yo'nalishda o'rganing. Noldan boshlab ilg'or darajagacha.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                  O'rta daraja
                </span>
                <span className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  120 soat
                </span>
                <span className="flex items-center text-gray-400">
                  <BookOpen className="w-4 h-4 mr-2" />
                  8 Kurs
                </span>
              </div>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              O'rganishni boshlash
            </button>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold">Kurslar</h2>
          
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900 border border-gray-800/50 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-emerald-500">{i}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {i === 1 ? 'Tarmoq xavfsizligi asoslari' : i === 2 ? 'Veb ilovalar xavfsizligi' : 'Kriptografiyaga kirish'}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Ushbu kursda siz eng muhim xavfsizlik tushunchalari va ularning qanday ishlashi haqida ma'lumot olasiz.
                      </p>
                      
                      {i === 1 ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Jarayon</span>
                            <span>45%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-gray-500">
                          <Lock className="w-4 h-4 mr-2" />
                          Oldingi kursni yakunlang
                        </div>
                      )}
                    </div>
                  </div>
                  <Link href={`/learn/${pathSlug}/course-${i}`}>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                      {i === 1 ? 'Davom etish' : "Ko'rish"}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
