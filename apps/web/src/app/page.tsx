'use client';

import Link from 'next/link';
import { 
  Shield, Terminal, Zap, ArrowRight, CheckCircle2, Lock, 
  Users, Trophy, Globe, Sparkles, Award, Cpu, BookOpen,
  Check, Server, Key, Eye, HelpCircle, Layers
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* ── 1. HERO SECTION (High Readability & Clear Value Prop) ── */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden border-b border-gray-800/80 cyber-grid-bg">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Left: Punchy Headline & Clear CTAs */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-900/90 border border-gray-800 px-4 py-1.5 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
              <span className="text-gray-300 font-medium">Professional Kiber-Poligon:</span>
              <span className="text-cyan-400 font-bold font-mono">140+ talaba onlayn</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Kiberxavfsizlikni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">real amaliyot</span> orqali egallang
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Quruq nazariyasiz, brauzer orqali haqiqiy veb-zaifliklarni fosh eting, Linux tizimlarini audit qiling, CTF musobaqalarida jamoaviy bellashing va davlat darajasidagi professional sertifikatga ega bo'ling.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/learn">
                <button className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center space-x-2">
                  <span>O'rganishni Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/labs">
                <button className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-sm font-bold text-gray-200 rounded-xl transition-colors flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Laboratoriyalar (60+)</span>
                </button>
              </Link>
            </div>

            {/* Quick Proof Metrics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-mono text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>60+ Veb-Lablar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Linux Terminal Lab</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>CTF Arena</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Onlayn Verifikatsiya</span>
              </div>
            </div>

          </div>

          {/* Right: Technical Console Mockup */}
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
                  <span className="text-[11px] font-mono text-gray-400 ml-2">cybertrip-range: bash</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  ACTIVE RANGE
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-gray-300 space-y-2 h-72 overflow-hidden bg-black/70">
                <p className="text-gray-500"># CyberTrip Range Sandbox v3.4</p>
                <p className="text-emerald-400">
                  kali@cybertrip:~$ nmap -sV -p 80,8080 target-app.lab
                </p>
                <p className="text-gray-400">
                  PORT     STATE SERVICE VERSION<br />
                  80/tcp   open  http    Nginx 1.24 (Vulnerable Target)<br />
                  8080/tcp open  http    Node.js / Express API Gateway
                </p>
                <p className="text-emerald-400 pt-1">
                  kali@cybertrip:~$ sqlmap -u "http://target/search?q=1" --dbs
                </p>
                <p className="text-amber-400">
                  [+] Parameter 'q' is vulnerable to UNION-based SQL Injection!
                </p>
                <p className="text-cyan-400">
                  [+] Available databases: ['cyberbooks', 'secret_vault', 'users']
                </p>
                <p className="text-emerald-400 font-bold flex items-center">
                  <span>kali@cybertrip:~$ cat /secret/flag.txt</span>
                </p>
                <p className="text-cyan-300 font-bold bg-cyan-950/40 p-2 rounded border border-cyan-500/30">
                  {"FLAG{cybertrip_sqli_expert_2026}"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. CORE METHODOLOGY & PILLARS ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Ta'lim Metodologiyasi
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Nega Aynan CYBERTRIP.UZ?</h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Biz shunchaki video darslik emasmiz — biz xavfsizlik mutaxassisi kabi fikrlash va harakat qilishni o'rgatamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0B0F17] border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              1. Tizimli O'quv Dasturlari
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Web Fundamentals, Web Security Fundamentals, Linux Basics va Tarmoq xavfsizligi bo'yicha bosqichma-bosqich tizimli o'quv dasturlari. Har bir dars o'zbek tilida, aniq misollar va qisqa testlar bilan boyitilgan.
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
              2. 60+ Real Veb-Laboratoriya
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              SQL Injection, XSS, SSRF, IDOR/BOLA, XXE, SSTI, Command Injection va File Upload zaifliklarini to'g'ridan-to'g'ri brauzerdagi alohida simulyator poligonida server-side tekshiruvlar orqali yeching.
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
              3. Jamoaviy CTF & Turnirlar
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              O'z kiber-jamoangizni shakllantiring, real vaqt rejimidagi scoreboardda yetakchilik qiling, bayroqlarni fosh eting va respublika miqyosidagi rasmiy kiber-chempionatlarda qatnashing.
            </p>
            <Link href="/ctf" className="inline-flex items-center text-xs font-bold text-purple-400 hover:underline pt-2">
              CTF Arenaga kirish →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 3. FEATURED HANDS-ON LABS SHOWCASE ── */}
      <section className="py-20 px-4 bg-[#090D14] border-y border-gray-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Haqiqiy Nishon Ilovalar
              </span>
              <h2 className="text-3xl font-black text-white">Amaliy Mashg'ulot Poligonlari</h2>
              <p className="text-sm text-gray-300 max-w-xl">
                Har bir laboratoriya alohida mustaqil mini-ilovaga ega bo'lib, xavfsizlik zaifliklarini amalda fosh qilish uchun mo'ljallangan.
              </p>
            </div>

            <Link href="/labs">
              <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl transition-colors flex items-center space-x-2">
                <span>Barcha 60 ta laboratoriyani ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Lab 1: SQLi CyberBooks */}
            <Link href="/labs/sql-injection/sql-injection-cyberbooks" className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                      SQL INJECTION
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      +200 XP
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    CyberBooks Baza Eksploitatsiyasi
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    Qidiruv maydonida UNION SQL Injection orqali admin parollari va maxfiy flagni ma'lumotlar bazasidan ajratib oling.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Nishon: CyberBooks</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">Boshlash →</span>
                </div>
              </div>
            </Link>

            {/* Lab 2: IDOR OrderHub */}
            <Link href="/labs/idor-bola/idor-order-receipt" className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      IDOR & BOLA
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      +250 XP
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    OrderHub Begona Buyurtma Audit
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    Avtorizatsiya tekshiruvidagi kamchilik orqali boshqa mijozlarning maxfiy korporativ hisob-fakturalarini o'qing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Nishon: OrderHub</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">Boshlash →</span>
                </div>
              </div>
            </Link>

            {/* Lab 3: JWT Bypass */}
            <Link href="/labs/jwt/jwt-none-algorithm-bypass" className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                      JWT SECURITY
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      +350 XP
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    JWT "alg: none" Imzo Aylanib O'tish
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    JSON Web Token sarlavhasini o'zgartirib imzosiz admin tokenini yasang va maxfiy API ma'lumotlariga ruxsat oling.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Nishon: CyberAPI</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">Boshlash →</span>
                </div>
              </div>
            </Link>

            {/* Lab 4: Linux PrivEsc */}
            <Link href="/labs/linux/linux-find-flag" className="group">
              <div className="h-full bg-[#0B0F17] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                      LINUX CLI
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      +150 XP
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Linux Fayl Tizimi va Qidiruv
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    Konsolda grep, find va SUID huquqlari yordamida yashirin konfiguratsiya fayllari orasidagi flagni aniqlang.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Nishon: Kali Range</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">Boshlash →</span>
                </div>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* ── 4. CERTIFICATE & VERIFICATION SECTION ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#0B0F17] via-[#120D1D] to-[#070A0E] border border-purple-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Award className="w-80 h-80 text-purple-400" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full inline-flex items-center">
                <Award className="w-3.5 h-3.5 mr-1.5" /> Rasmiy Sertifikatsiya
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Professional Kiberxavfsizlik Sertifikati
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Kurslar va laboratoriyalarni muvaffaqiyatli yakunlaganingizdan so'ng, har bir sertifikat unikal ID raqami va kriptografik QR markerga ega bo'ladi. Ish beruvchilar va hamkorlar sertifikatingizni istalgan paytda <code className="text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">cybertrip.uz/verify/[id]</code> orqali tekshirishlari mumkin.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/certifications">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all">
                    Sertifikatlar Dasturi
                  </button>
                </Link>
                <Link href="/verify/CT-2026-8841">
                  <button className="px-5 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-bold text-gray-300 rounded-xl transition-colors">
                    Sertifikatni Tekshirish Demo
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-[#070A0E] border border-purple-500/40 rounded-2xl p-6 shadow-2xl flex-shrink-0 text-center space-y-3 max-w-xs w-full">
              <Award className="w-16 h-16 text-purple-400 mx-auto" />
              <div className="text-sm font-bold text-white">CYBERTRIP CERTIFIED</div>
              <div className="text-xs text-gray-400">Web Security Professional</div>
              <div className="text-[11px] font-mono text-cyan-400 bg-gray-900 border border-gray-800 p-2 rounded">
                ID: CT-2026-XXXX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FINAL HIGH-CONVERSION CTA BANNER ── */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Kiber-Sayohatga Tayyormisiz?
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Kiberxavfsizlik sohasida amaliy ko'nikmaga ega mutaxassis bo'ling. Hoziroq ro'yxatdan o'ting va dastlabki laboratoriyalarni bepul ishga tushiring.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3.5">
          <Link href="/register">
            <button className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Bepul Ro'yxatdan O'tish</span>
            </button>
          </Link>
          <Link href="/pricing">
            <button className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-sm font-bold text-gray-300 rounded-xl transition-colors">
              Tariflarni Ko'rish
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
