'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Shield } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for observability
    console.error('Unhandled Next.js Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#0B0F17] border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 animate-page-enter text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-xl shadow-amber-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            TIZIM XATOLIGI ANIQLANDI
          </span>
          <h1 className="text-2xl font-black text-white">
            Sahifani yuklashda xatolik yuz berdi
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            Kutilmagan muammo tufayli komponent to&apos;xtatildi. Iltimos, sahifani qayta yuklang yoki bosh sahifaga qayting.
          </p>
          {error?.message && (
            <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-left font-mono text-[11px] text-gray-400 break-words max-h-24 overflow-y-auto">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Qayta Urinish</span>
          </button>

          <Link
            href="/"
            className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-gray-300 font-semibold text-xs rounded-xl border border-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Bosh Sahifa</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
