'use client';
import { User, Mail, Lock, Bell, Shield } from 'lucide-react';

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Sozlamalar</h1>
        <p className="text-gray-400">Profilingiz va hisobingiz parametrlarini boshqaring.</p>
      </div>

      {/* Profile Setting */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Shaxsiy ma'lumotlar</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Ism</label>
              <input type="text" defaultValue="Sardor" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:border-emerald-500 focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Familiya</label>
              <input type="text" defaultValue="Abdullaev" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:border-emerald-500 focus:outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center"><Mail className="w-4 h-4 mr-2" /> Elektron pochta</label>
            <input type="email" defaultValue="sardor@example.com" disabled className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed" />
          </div>
          <div className="pt-4 flex justify-end">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Saqlash
            </button>
          </div>
        </div>
      </div>

      {/* Password Setting */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <Lock className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Parolni o'zgartirish</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Joriy parol</label>
            <input type="password" placeholder="••••••••" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:border-emerald-500 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Yangi parol</label>
            <input type="password" placeholder="Yangi parol" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:border-emerald-500 focus:outline-none" />
          </div>
          <div className="pt-4 flex justify-end">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Parolni yangilash
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Setting */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <Bell className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Bildirishnomalar</h2>
        </div>
        <div className="p-6 space-y-4">
          {[
            { id: 'n1', label: 'Yangi kurslar haqida xabar berish' },
            { id: 'n2', label: 'Haftalik o\'zlashtirish hisoboti' },
            { id: 'n3', label: 'CTF musobaqalari e\'lonlari' }
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
