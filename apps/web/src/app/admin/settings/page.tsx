'use client';

import { useState } from 'react';
import { 
  Settings, Save, Shield, Database, Lock, 
  CheckCircle2, Bell, Globe, KeyRound 
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('CYBERTRIP.UZ');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [dockerSessionTimeoutMinutes, setDockerSessionTimeoutMinutes] = useState(45);
  const [ctfDynamicScoring, setCtfDynamicScoring] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-page-enter">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Tizim Sozlamalari</h1>
        <p className="text-xs text-gray-400 mt-1">
          CYBERTRIP.UZ global platforma parametrlari, sessiya muddatlari va xavfsizlik konfiguratsiyasi
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-xs text-emerald-300 animate-msg-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Sozlamalar muvaffaqiyatli saqlandi! Tizim yangilandi.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-800">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Asosiy Sozlamalar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">Platforma Nomi</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">
                Laboratoriya Sessiya Taymeri (Daqiqa)
              </label>
              <input
                type="number"
                value={dockerSessionTimeoutMinutes}
                onChange={(e) => setDockerSessionTimeoutMinutes(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>
          </div>
        </div>

        {/* Access & Security */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-800">
            <Shield className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Xavfsizlik va Kirish Siyosati</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800">
              <div>
                <p className="font-bold text-gray-200">Foydalanuvchilarni Ro&apos;yxatdan O&apos;tkazish</p>
                <p className="text-gray-500 text-[11px]">Yangi talabalar o&apos;zlari mustaqil hisob ochishiga ruxsat</p>
              </div>
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800">
              <div>
                <p className="font-bold text-gray-200">CTF Dinamik Ball Tizimi (Decay Scoring)</p>
                <p className="text-gray-500 text-[11px]">Ko&apos;p talaba yechgan sayin topshiriq bali kamayib boradi</p>
              </div>
              <input
                type="checkbox"
                checked={ctfDynamicScoring}
                onChange={(e) => setCtfDynamicScoring(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800">
              <div>
                <p className="font-bold text-gray-200">Texnik Ishlar Rejimi (Maintenance Mode)</p>
                <p className="text-gray-500 text-[11px]">Platformani vaqtinchalik o&apos;chirish va faqat adminlarga ruxsat berish</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Sozlamalarni Saqlash</span>
          </button>
        </div>
      </form>
    </div>
  );
}
