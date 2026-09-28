'use client';

import Link from 'next/link';
import { Wrench, Shield, RefreshCw, AlertCircle, Clock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[450px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        
        {/* Logo */}
        <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-black tracking-tight text-white mb-2">
          <span>CYBER<span className="text-cyan-400">TRIP</span></span>
          <span className="text-[10px] font-mono font-bold text-black bg-cyan-400 px-1.5 py-0.5 rounded">.UZ</span>
        </Link>

        {/* Maintenance Box */}
        <div className="bg-[#0B0F17] border border-amber-500/30 rounded-3xl p-8 shadow-2xl shadow-amber-500/5 space-y-5">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/10">
            <Wrench className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Rejali Profilaktika Ishlari</span>
            </div>
            <h1 className="text-2xl font-black text-white">Tizim Yangilanmoqda</h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              CYBERTRIP.UZ poligon serverlari va xavfsizlik infratuzilmasi rejaviy texnik ko&apos;rikdan o&apos;tkazilmoqda. Tez orada barcha laboratoriyalar to&apos;liq faoliyatini tiklaydi.
            </p>
          </div>

          <div className="bg-[#070A0E] border border-gray-800 rounded-xl p-4 text-xs font-mono text-gray-400 space-y-1.5 text-left">
            <div className="flex justify-between">
              <span className="text-gray-500">Holat:</span>
              <span className="text-amber-400 font-bold">Maintenance In Progress</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Kutilayotgan vaqt:</span>
              <span className="text-gray-300">~ 15 daqiqa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Konteynerlar holati:</span>
              <span className="text-emerald-400">Izolyatsiyalangan</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sahifani Qayta Yuklash</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 font-mono">
          CYBERTRIP.UZ Secure Infrastructure &copy; 2026
        </p>

      </div>
    </div>
  );
}
