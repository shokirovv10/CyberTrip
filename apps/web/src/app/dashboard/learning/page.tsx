import Link from 'next/link';
import { BookOpen, PlayCircle, Trophy, Clock } from 'lucide-react';

export default function DashboardLearningPage() {
  const courses = [
    { id: 1, title: 'Kiberxavfsizlik Asoslari', path: 'cyber-basics', progress: 100, status: 'completed' },
    { id: 2, title: 'Tarmoq Xavfsizligi', path: 'network-security', progress: 45, status: 'in-progress', lastLesson: 'OSI Modeli' },
    { id: 3, title: 'Web Penetration Testing', path: 'web-pentesting', progress: 0, status: 'enrolled' },
  ];

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Mening O'quv Rejam</h1>
        <p className="text-gray-400">Joriy kurslaringiz va o'zlashtirish ko'rsatkichlaringiz.</p>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-700 transition-colors">
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  course.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                  course.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {course.status === 'completed' ? <Trophy className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200">{course.title}</h3>
                  {course.status === 'in-progress' && (
                    <p className="text-sm text-gray-400">Oxirgi dars: {course.lastLesson}</p>
                  )}
                </div>
              </div>
              
              <div className="max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">O'zlashtirish</span>
                  <span className={course.progress === 100 ? 'text-emerald-500' : 'text-gray-200'}>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link href={`/learn/${course.path}`}>
                <button className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors w-full md:w-auto flex items-center justify-center ${
                  course.status === 'completed' ? 'bg-gray-800 text-white hover:bg-gray-700' :
                  course.status === 'in-progress' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                  'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}>
                  {course.status === 'completed' ? 'Qayta ko\'rish' :
                   course.status === 'in-progress' ? (
                     <><PlayCircle className="w-4 h-4 mr-2" /> Davom etish</>
                   ) : 'Boshlash'}
                </button>
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Suggested */}
      <div className="pt-8 border-t border-gray-800/50">
        <h2 className="text-xl font-bold mb-6">Tavsiya etiladigan kurslar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 border-dashed rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Kriptografiyaga Kirish</h3>
              <p className="text-sm text-gray-400 mb-4">Ma'lumotlarni himoyalash sirlari va zamonaviy shifrlash usullari.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1" /> 12 soat</span>
              <Link href="/learn/cryptography">
                <button className="text-emerald-500 text-sm font-medium hover:text-emerald-400">Ko'rish &rarr;</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
