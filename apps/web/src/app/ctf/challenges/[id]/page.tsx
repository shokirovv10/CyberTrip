'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Flag, Download, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { use } from 'react';

export default function CTFChallengePage({ params }: { params: any }) {
  const resolvedParams: { id: string } =
    params && typeof (params as any)?.then === 'function' ? use(params as any) : (params || {});
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(a => a + 1);
    if (flag === 'CYBERTRIP{test_flag_123}') {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <Link href="/ctf/challenges" className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Barcha topshiriqlarga qaytish
        </Link>

        <div className="bg-gray-900 border border-gray-800/50 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Flag className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-md text-xs font-medium border border-purple-500/20">Web</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md text-xs font-medium border border-emerald-500/20">Oson</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-100">SQL Injection 101</h1>
              </div>
              <div className="text-right bg-gray-950 p-4 rounded-xl border border-gray-800">
                <span className="block text-2xl font-bold text-purple-400">100</span>
                <span className="text-xs text-gray-500 font-mono uppercase">Points</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            <div className="prose prose-invert prose-purple max-w-none">
              <p>
                Ushbu veb-sayt foydalanuvchilarni autentifikatsiya qilish uchun oddiy tizimdan foydalanadi. 
                Saytning login sahifasini aylanib o'tib, admin sifatida tizimga kiring va flagni oling.
              </p>
              <p>Manzil: <code>http://chal.cybertrip.uz:3001</code></p>
            </div>

            {/* Files */}
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-900 p-2 rounded">
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-200">source_code.zip</div>
                  <div className="text-xs text-gray-500">24 KB</div>
                </div>
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">Yuklab olish</button>
            </div>

            {/* Hint */}
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="w-full bg-gray-950 p-4 flex items-center justify-between text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Yordamchi ko'rsatma (Ixtiyoriy)
                </div>
                {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHint && (
                <div className="p-4 bg-gray-900 border-t border-gray-800 text-sm text-gray-300">
                  SQL so'rovida qanday qilib mantiqiy true qiymatini hosil qilish mumkinligini o'ylab ko'ring. ' OR '1'='1 esingizdami?
                </div>
              )}
            </div>

            {/* Submission */}
            <div className="pt-6 border-t border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Flagni kiritish</h3>
              
              {status === 'success' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-emerald-400 mb-1">Tabriklaymiz!</h4>
                  <p className="text-sm text-emerald-500/80">Siz ushbu topshiriqni muvaffaqiyatli yakunladingiz va 100 ball oldingiz.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="CYBERTRIP{...}"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className={`flex-1 bg-gray-950 border rounded-xl px-4 py-3 font-mono text-sm focus:outline-none transition-colors
                        ${status === 'error' ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500 text-gray-200'}
                      `}
                    />
                    <button 
                      type="submit"
                      disabled={!flag}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 disabled:text-gray-500 text-white px-8 py-3 rounded-xl font-bold transition-colors"
                    >
                      Topshirish
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Noto'g'ri flag. Iltimos, qayta urinib ko'ring.</p>
                  )}
                  <p className="text-xs text-gray-500 text-right">Urinishlar soni: {attempts}</p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
