'use client';

import { useState } from 'react';
import { 
  User, Shield, Lock, Bell, Laptop, Moon, Sun, 
  CheckCircle2, KeyRound, Smartphone, AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'sessions' | 'notifications'>('account');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState('Sardorbek Abdullayev');
  const [username, setUsername] = useState('pentester_01');
  const [email, setEmail] = useState('talaba@cybertrip.uz');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [ctfAlerts, setCtfAlerts] = useState(true);
  const [labReminders, setLabReminders] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-page-enter">
      <PageHeader
        title="Foydalanuvchi Sozlamalari"
        subtitle="Akkaunt xavfsizligi, shaxsiy ma'lumotlar, faol sessiyalar va bildirishnomalarni boshqarish"
      />

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-xs text-emerald-300 animate-msg-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>O&apos;zgarishlar muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-1 border-b border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: 'account', label: 'Profil & Akkaunt', icon: User },
          { id: 'security', label: 'Xavfsizlik & Parol', icon: Lock },
          { id: 'sessions', label: 'Faol Qurilmalar', icon: Laptop },
          { id: 'notifications', label: 'Xabarnomalar', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <form onSubmit={handleSave} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800">
            Shaxsiy Ma&apos;lumotlar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">To&apos;liq Ism</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">Foydalanuvchi Nomi (Username)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1.5">Email Manzili (O&apos;zgarmas)</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-850/80 border border-gray-800 rounded-xl px-4 py-2.5 text-gray-400 cursor-not-allowed font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Saqlash
            </button>
          </div>
        </form>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <form onSubmit={handleSave} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800">
            Parolni Yangilash
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">Joriy Parol</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">Yangi Parol</label>
              <input
                type="password"
                placeholder="Kamida 8 ta belgi"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1.5">Yangi Parolni Tasdiqlash</label>
              <input
                type="password"
                placeholder="Parolni takrorlang"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Parolni Yangilash
            </button>
          </div>
        </form>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800">
            Faol Sessiyalar (Active Sessions)
          </h3>

          <div className="space-y-3 font-sans">
            <div className="p-3.5 bg-gray-900 border border-emerald-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-white text-xs">Windows 11 / Chrome (Joriy qurilma)</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">FAOL</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">IP: 84.54.120.45 • Toshkent, O&apos;zbekiston</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-gray-300 text-xs">iOS 17 / Safari</p>
                  <p className="text-[11px] text-gray-500 font-mono">IP: 178.218.201.12 • Oxirgi faollik: 3 kun oldin</p>
                </div>
              </div>
              <button className="text-rose-400 hover:text-rose-300 font-semibold text-[11px]">
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSave} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800">
            Bildirishnoma Sozlamalari
          </h3>

          <div className="space-y-3 font-sans">
            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl">
              <div>
                <p className="font-bold text-gray-200">Muhim Xavfsizlik Xabarlari</p>
                <p className="text-gray-400 text-[11px]">Tizimga yangi IP yoki brauzerdan kirilganda emailga xabar yuborish</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl">
              <div>
                <p className="font-bold text-gray-200">CTF Musobaqalar Eslatmasi</p>
                <p className="text-gray-400 text-[11px]">Yangi kiber-janglar boshlanishidan 24 soat oldin ogohlantirish</p>
              </div>
              <input
                type="checkbox"
                checked={ctfAlerts}
                onChange={(e) => setCtfAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 border border-gray-800 rounded-xl">
              <div>
                <p className="font-bold text-gray-200">Kundalik Streak Eslatmasi</p>
                <p className="text-gray-400 text-[11px]">Har kungi mini-topshiriqni bajarish eslatmasi</p>
              </div>
              <input
                type="checkbox"
                checked={labReminders}
                onChange={(e) => setLabReminders(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Saqlash
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
