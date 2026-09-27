'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, ArrowRight, CheckCircle2, Circle, Lock, 
  Terminal, Shield, Award, Sparkles, BookOpen, Layers,
  ChevronRight, PlayCircle, ExternalLink, Cpu
} from 'lucide-react';

export default function RoadmapPage() {
  const [selectedTrack, setSelectedTrack] = useState<'web-pentest' | 'blue-team' | 'bug-bounty'>('web-pentest');

  const tracks = {
    'web-pentest': {
      title: 'Web Pentester Yo\'l Xaritasi',
      subtitle: 'Noldan professional darajadagi Web Penetration Tester darajasigacha',
      steps: [
        { id: 1, title: 'Kompyuter Asoslari', code: 'CMP', lessons: 8, status: 'completed', desc: 'OS, fayl tizimlari, protsessor va xotira tuzilishi.' },
        { id: 2, title: 'Linux Fundamentals', code: 'LNX', lessons: 12, status: 'completed', desc: 'Terminal, fayllar, permissions, SUID va jarayonlar boshqaruvi.' },
        { id: 3, title: 'Networking Fundamentals', code: 'NET', lessons: 12, status: 'completed', desc: 'OSI, TCP/IP, portlar, DNS va tarmoq trafigi tahlili.' },
        { id: 4, title: 'Internet & HTTP', code: 'INT', lessons: 10, status: 'in_progress', desc: 'HTTP/HTTPS, cookie, sessiyalar, status kodlar va sarlavhalar.' },
        { id: 5, title: 'Web Fundamentals', code: 'WEB', lessons: 8, status: 'locked', desc: 'HTML formalar, DOM arxitekturasi, JS konteksti va SOP/CORS.' },
        { id: 6, title: 'Web Pentest Fundamentals', code: 'WPT', lessons: 12, status: 'locked', desc: 'Burp Suite, hujum yuzasi, kirish nuqtalarini aniqlash metodikasi.' },
        { id: 7, title: 'OWASP Web Security', code: 'OW', lessons: 18, status: 'locked', desc: 'SQLi, XSS, CSRF, IDOR, SSRF, XXE va SSTI zaifliklari.' },
        { id: 8, title: 'Authentication & Authorization', code: 'AUT', lessons: 10, status: 'locked', desc: 'Parol xeshlash, brute-force himoyasi, JWT va RBAC tahlili.' },
        { id: 9, title: 'API Security', code: 'API', lessons: 12, status: 'locked', desc: 'REST API, BOLA/IDOR, Mass Assignment va GraphQL zaifliklari.' },
        { id: 10, title: 'Advanced Web Pentest', code: 'AWP', lessons: 14, status: 'locked', desc: 'Biznes mantiq xatolari, Race Conditions va RCE ekspluatatsiyasi.' },
        { id: 11, title: 'Final Assessment & Sertifikat', code: 'EXAM', lessons: 1, status: 'locked', desc: 'CyberRange da to\'liq amaliy imtihon va QR diplom.' }
      ]
    },
    'blue-team': {
      title: 'SOC & Blue Team Analyst Yo\'l Xaritasi',
      subtitle: 'Kiber-hujumlarni aniqlash, tahlil qilish va himoyalanish bo\'yicha mutaxassis',
      steps: [
        { id: 1, title: 'Kompyuter & OS Asoslari', code: 'CMP', lessons: 8, status: 'completed', desc: 'Operatsion tizim yadrosi, xizmatlar va jurnallar tuzilishi.' },
        { id: 2, title: 'Linux & Terminal Asoslari', code: 'LNX', lessons: 12, status: 'completed', desc: 'Linux jurnallari (/var/log), audit vositalari va jarayonlar monitoringi.' },
        { id: 3, title: 'Tarmoq Xavfsizligi & Tahlil', code: 'NET', lessons: 12, status: 'in_progress', desc: 'TCP/IP paketlari, Wireshark, ochiq portlar va protokollar auditi.' },
        { id: 4, title: 'Kiberxavfsizlik Asoslari', code: 'SEC', lessons: 10, status: 'locked', desc: 'CIA Triad, AAA ramkasi, kiber tahdidlar va perimetr himoyasi.' },
        { id: 5, title: 'Digital Forensics', code: 'FOR', lessons: 12, status: 'locked', desc: 'Dalillar yig\'ish, Chain of Custody, xotira va disk tahlili (Volatility).' },
        { id: 6, title: 'Blue Team & SOC Operatsiyalari', code: 'SOC', lessons: 12, status: 'locked', desc: 'SIEM tizimlari, log monitoring, Sigma qoidalari va MITRE ATT&CK.' },
        { id: 7, title: 'Hodisalarga Javob Qaytarish (IR)', code: 'IR', lessons: 6, status: 'locked', desc: 'NIST/SANS doirasida insidentlarni bartaraf qilish va mustahkamlash.' }
      ]
    },
    'bug-bounty': {
      title: 'Bug Bounty Hunter Yo\'l Xaritasi',
      subtitle: 'Real veb dasturlardagi xavflarni topib mukofot (bounty) yutish yo\'li',
      steps: [
        { id: 1, title: 'Web & HTTP Anatomiyasi', code: 'WEB', lessons: 18, status: 'completed', desc: 'Client-server muloqoti, headerlar, cookie va parametrlar.' },
        { id: 2, title: 'Recon & OSINT Razvedkasi', code: 'OSN', lessons: 10, status: 'in_progress', desc: 'Subdomain enumeration (amass), GitHub dorks, shodan va hujum yuzasi.' },
        { id: 3, title: 'OWASP Top 10 Zaifliklar', code: 'OW', lessons: 18, status: 'locked', desc: 'XSS, IDOR, SSRF, SQLi va biznes mantiq xatolarini qidirish.' },
        { id: 4, title: 'API & Broken Auth', code: 'API', lessons: 12, status: 'locked', desc: 'BOLA, JWT zaifliklari va ruxsatlarni oshirish ssenariylari.' },
        { id: 5, title: 'Biznes Mantiq & Race Conditions', code: 'AWP', lessons: 14, status: 'locked', desc: 'Kupon takrorlash, to\'lov manipulyatsiyasi va parallel so\'rovlar.' },
        { id: 6, title: 'Professional Hisobot Yozish', code: 'REP', lessons: 4, status: 'locked', desc: 'HackerOne/Bugcrowd andozasida sifatli PoC tayyorlash.' }
      ]
    }
  };

  const currentTrack = tracks[selectedTrack];

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-flex items-center">
            <Compass className="w-3.5 h-3.5 mr-1.5" /> Karyera Navigatsiyasi
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Kiberxavfsizlik Yo'l Xaritalari (Roadmap)
          </h1>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            Qayerdan boshlash va qayerga borishni aniq ko'ring. Boshlang'ich bilimlardan to xalqaro darajadagi mutaxassislikkacha bosqichma-bosqich yo'l.
          </p>
        </div>

        {/* Track Switcher */}
        <div className="flex justify-center">
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-1.5 flex flex-wrap gap-1 text-xs font-bold">
            <button
              onClick={() => setSelectedTrack('web-pentest')}
              className={`px-5 py-2.5 rounded-xl transition-all ${selectedTrack === 'web-pentest' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              🌐 Web Pentester Track
            </button>
            <button
              onClick={() => setSelectedTrack('blue-team')}
              className={`px-5 py-2.5 rounded-xl transition-all ${selectedTrack === 'blue-team' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              🛡️ SOC & Blue Team Track
            </button>
            <button
              onClick={() => setSelectedTrack('bug-bounty')}
              className={`px-5 py-2.5 rounded-xl transition-all ${selectedTrack === 'bug-bounty' ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              🎯 Bug Bounty Hunter Track
            </button>
          </div>
        </div>

        {/* Track Title Card */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl space-y-2">
          <h2 className="text-2xl font-black text-white">{currentTrack.title}</h2>
          <p className="text-xs md:text-sm text-cyan-400">{currentTrack.subtitle}</p>
        </div>

        {/* Visual Roadmap Stepper */}
        <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-500 before:to-gray-800">
          {currentTrack.steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div key={step.id} className="relative group">
                {/* Node Bullet */}
                <div
                  className={`absolute -left-6 md:-left-10 top-5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : isInProgress
                      ? 'bg-cyan-500 border-cyan-400 text-black animate-pulse'
                      : 'bg-[#070A0E] border-gray-700 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isInProgress ? (
                    <PlayCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Lock className="w-2.5 h-2.5" />
                  )}
                </div>

                {/* Step Content Card */}
                <div
                  className={`bg-[#0B0F17] border rounded-2xl p-5 md:p-6 transition-all shadow-xl space-y-3 ${
                    isCompleted
                      ? 'border-emerald-500/30 hover:border-emerald-500'
                      : isInProgress
                      ? 'border-cyan-500/50 shadow-cyan-500/10'
                      : 'border-gray-800 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">
                        #{step.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-[#070A0E] border border-gray-800 px-2 py-0.5 rounded">
                        {step.lessons} dars
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          Tugallandi
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                          Jarayonda
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>

                  <div className="pt-2 flex justify-end">
                    <Link href="/learn">
                      <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Darslarni ko'rish</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
