'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building, Users, Shield, Plus, Mail, CheckCircle2, 
  Clock, BarChart3, BookOpen, AlertCircle, ArrowUpRight, 
  ExternalLink, Search, UserCheck, MoreVertical, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  assignedPath: string;
  labsCompleted: number;
  progressPercent: number;
  status: 'ACTIVE' | 'INVITED';
  joinedAt: string;
}

export default function CompanyWorkspacePage() {
  const [activeTab, setActiveTab] = useState<'employees' | 'assignments' | 'analytics'>('employees');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'EMPLOYEE' | 'MANAGER'>('EMPLOYEE');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Seat metrics
  const totalSeats = 15;
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Alisher Rahmonov', email: 'alisher@orientfin.uz', role: 'ADMIN', assignedPath: 'Web Pentest Asoslari', labsCompleted: 14, progressPercent: 85, status: 'ACTIVE', joinedAt: '2024-02-10' },
    { id: '2', name: 'Zulayho Karimova', email: 'zulayho@orientfin.uz', role: 'MANAGER', assignedPath: 'SOC va Blue Team', labsCompleted: 11, progressPercent: 70, status: 'ACTIVE', joinedAt: '2024-02-15' },
    { id: '3', name: 'Sherzodbek Yusupov', email: 'sherzod@orientfin.uz', role: 'EMPLOYEE', assignedPath: 'Web Pentest Asoslari', labsCompleted: 8, progressPercent: 55, status: 'ACTIVE', joinedAt: '2024-03-01' },
    { id: '4', name: 'Madina Ismoilova', email: 'madina@orientfin.uz', role: 'EMPLOYEE', assignedPath: 'Linux va Tizim Xavfsizligi', labsCompleted: 6, progressPercent: 40, status: 'ACTIVE', joinedAt: '2024-03-12' },
    { id: '5', name: 'Nodirbek Hasanov', email: 'nodir@orientfin.uz', role: 'EMPLOYEE', assignedPath: 'Tarmoq Xavfsizligi', labsCompleted: 4, progressPercent: 25, status: 'ACTIVE', joinedAt: '2024-04-05' },
    { id: '6', name: 'Farrux Toirov', email: 'farrux@orientfin.uz', role: 'EMPLOYEE', assignedPath: 'Web Pentest Asoslari', labsCompleted: 0, progressPercent: 0, status: 'INVITED', joinedAt: '2024-05-01' },
  ]);

  const usedSeats = employees.length;
  const remainingSeats = totalSeats - usedSeats;
  const usagePercentage = Math.round((usedSeats / totalSeats) * 100);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newEmp: Employee = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      assignedPath: 'Web Pentest Asoslari',
      labsCompleted: 0,
      progressPercent: 0,
      status: 'INVITED',
      joinedAt: 'Bugun',
    };

    setEmployees((prev) => [...prev, newEmp]);
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setShowInviteModal(false);
      setInviteEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Workspace Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-xl flex-shrink-0">
                <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center text-emerald-400">
                  <Building className="w-8 h-8" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl md:text-3xl font-black text-white">Orient FinTech LLC</h1>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    BUSINESS PLAN
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Korporativ xodimlar kiberxavfsizlik malakasini oshirish va ichki testlar paneli
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInviteModal(true)}
                disabled={remainingSeats <= 0}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Xodim Taklif Qilish</span>
              </button>

              <Link href="/checkout?plan=BUSINESS">
                <button className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 rounded-xl transition-colors">
                  O'rinlarni Ko'paytirish
                </button>
              </Link>
            </div>
          </div>

          {/* Seat Quotas & KPI Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-800/80">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Band O'rinlar (Seats):</span>
                <span className="font-bold text-white">{usedSeats} / {totalSeats}</span>
              </div>
              <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden border border-gray-800">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500 block">
                {remainingSeats} ta bo'sh litsenziya mavjud
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">O'rtacha O'zlashtirish</span>
              <span className="text-xl font-bold text-emerald-400">58%</span>
              <span className="text-[10px] text-gray-500 block mt-0.5">Barcha o'quv dasturlari bo'yicha</span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Bajarilgan Lablar</span>
              <span className="text-xl font-bold text-white">43 ta</span>
              <span className="text-[10px] text-gray-500 block mt-0.5">Xodimlar tomonidan muvaffaqiyatli</span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Keyingi To'lov</span>
              <span className="text-xl font-bold text-gray-300">15-Iyun, 2024</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Avtomatik Bank Kartasidan</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('employees')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'employees'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Xodimlar Ro'yxati ({employees.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Biriktirilgan Kurslar & Topshiriqlar</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Xavfsizlik & Zaifliklar Auditi</span>
          </button>
        </div>

        {/* Tab 1: Employees Roster */}
        {activeTab === 'employees' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Xodimlar Malakasi va Faolligi</h3>
                <p className="text-[11px] text-gray-400">Har bir xodimning laboratoriyalarni bajarishi va amaliy yutuqlari</p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Xodimni izlash..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-950/80 text-gray-500 border-b border-gray-800 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Xodim</th>
                    <th className="py-3 px-4">Roli</th>
                    <th className="py-3 px-4">O'quv Yo'nalishi</th>
                    <th className="py-3 px-4">Bajarilgan Lablar</th>
                    <th className="py-3 px-4">O'zlashtirish</th>
                    <th className="py-3 px-4">Holat</th>
                    <th className="py-3 px-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80 text-gray-300">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{emp.name}</span>
                            <span className="text-[10px] text-gray-500 block">{emp.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          emp.role === 'ADMIN'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : emp.role === 'MANAGER'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : 'bg-gray-800 text-gray-300'
                        }`}>
                          {emp.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-gray-200">
                        {emp.assignedPath}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white">{emp.labsCompleted}</span>
                        <span className="text-gray-500 text-[10px]"> / 30 lab</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="w-24 space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="font-semibold text-emerald-400">{emp.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-gray-800">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${emp.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {emp.status === 'ACTIVE' ? (
                          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Faol
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3 mr-1" /> Kutilmoqda
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button className="text-gray-500 hover:text-white p-1 rounded hover:bg-gray-800">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Assignments */}
        {activeTab === 'assignments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Web Pentest Asoslari', desc: 'Barcha frontend va backend dasturchilar uchun OWASP Top 10 himoyasi', assignedCount: 4, dueDate: '30-Iyun, 2024' },
              { title: 'SOC va Hodisalarni Tahlil Qilish', desc: 'Xavfsizlik monitoring xodimlari uchun log tahlili va tahdidlarni aniqlash', assignedCount: 2, dueDate: '15-Iyul, 2024' },
              { title: 'Linux va Tizim Administratorligi Xavfsizligi', desc: 'DevOps va tizim ma\'murlari uchun server hardening', assignedCount: 1, dueDate: '25-Iyun, 2024' },
            ].map((asg, i) => (
              <div key={i} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                      Majburiy Kurs
                    </span>
                    <span className="text-[11px] text-gray-500">{asg.dueDate} gacha</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{asg.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{asg.desc}</p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{asg.assignedCount} nafar xodim o'qimoqda</span>
                  <button className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center">
                    Tafsilotlar <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Security & Vulnerability Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Xodimlarning Zaif Mavzular Reytingi</h3>
              <p className="text-xs text-gray-400">Xodimlar laboratoriyalarda eng ko'p qiyinchilikka uchragan kiber-hujum turlari:</p>

              <div className="space-y-3 pt-2">
                {[
                  { topic: 'SSRF & Cloud Metadata Access', errorRate: '68% xatolik' },
                  { topic: 'SQL Injection — Blind Union', errorRate: '52% xatolik' },
                  { topic: 'IDOR & Broken Object Authorization', errorRate: '35% xatolik' },
                  { topic: 'Reflected XSS Filter Bypass', errorRate: '22% xatolik' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-200">{item.topic}</span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.errorRate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Korporativ Sertifikatlar</h3>
              <p className="text-xs text-gray-400">Imtihondan o'tgan va sertifikat olgan xodimlar:</p>

              <div className="space-y-3 pt-2">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Alisher Rahmonov</h5>
                    <span className="text-[10px] text-emerald-400">Certified Web Pentest Specialist</span>
                  </div>
                  <Link href="/verify/cert-web-9942">
                    <button className="text-xs font-semibold text-emerald-400 hover:underline flex items-center">
                      Tekshirish <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Invite Employee Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E141D] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <UserCheck className="w-5 h-5" />
              <span>Yangi Xodimni Taklif Qilish</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Xodimning korporativ elektron pochtasini kiriting. Unga ro'yxatdan o'tish va kompaniya hisobiga ulanish uchun havola yuboriladi.
            </p>

            {inviteSuccess ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center text-emerald-400 text-xs font-bold space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                Taklifnoma muvaffaqiyatli yuborildi!
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Korporativ Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="xodim@orientfin.uz"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Ruxsat Darajasi (Role)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInviteRole('EMPLOYEE')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                        inviteRole === 'EMPLOYEE'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-gray-900 border-gray-800 text-gray-400'
                      }`}
                    >
                      Xodim (Employee)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInviteRole('MANAGER')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                        inviteRole === 'MANAGER'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-gray-900 border-gray-800 text-gray-400'
                      }`}
                    >
                      Menejer (Manager)
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-xl transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    Taklifnomani Yuborish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
