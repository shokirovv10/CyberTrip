import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Shield, 
  Terminal, 
  Globe, 
  Lock, 
  Activity, 
  Search, 
  ChevronRight, 
  Trophy, 
  Zap, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5" />
            O'zbekistondagi №1 Kiber-Poligon va Ta'lim Ekotizimi
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-primary leading-tight">
            <span className="text-accent-green">CYBER</span>TRIP.UZ
          </h1>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl leading-relaxed">
            Haqiqiy Web Pentest, Linux, Tarmoq xavfsizligi va CTF laboratoriyalari. Nazariyadan amaliyotgacha, brauzer orqali xavfsiz muhitda o'rganing.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/learn">
              <Button size="lg" variant="primary" className="shadow-lg shadow-emerald-500/20 gap-2">
                O'rganishni boshlash <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/labs">
              <Button size="lg" variant="outline" className="border-gray-700 hover:border-gray-500">
                Amaliy Laboratoriyalar
              </Button>
            </Link>
            <Link href="/tournaments">
              <Button size="lg" variant="ghost" className="text-accent-green hover:bg-emerald-500/10 gap-1.5">
                <Trophy className="w-4 h-4" /> Turnirlar
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-secondary">
            <div className="flex items-center gap-2"><span className="font-bold text-primary">5,000+</span> Talabalar</div>
            <div className="flex items-center gap-2"><span className="font-bold text-primary">150+</span> Darslar</div>
            <div className="flex items-center gap-2"><span className="font-bold text-primary">30+</span> Laboratoriyalar</div>
            <div className="flex items-center gap-2"><span className="font-bold text-primary">50M+ UZS</span> Mukofotlar</div>
          </div>
        </div>
        
        {/* Interactive Decorative Terminal */}
        <div className="flex-1 w-full max-w-xl">
          <div className="rounded-xl overflow-hidden border border-subtle bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center px-4 py-2 bg-elevated border-b border-subtle gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-2 text-xs font-mono text-secondary">hacker@cybertrip: ~ (Kali Linux)</div>
            </div>
            <div className="p-4 font-mono text-sm text-gray-300 h-64 overflow-hidden space-y-1">
              <p className="text-accent-green">guest@cybertrip:~$ nmap -sC -sV target.cybertrip.uz</p>
              <p className="text-gray-400">Starting Nmap 7.94 ( https://nmap.org )</p>
              <p className="text-gray-400">Nmap scan report for target.cybertrip.uz (10.10.14.8)</p>
              <p className="text-gray-400">PORT     STATE SERVICE VERSION</p>
              <p className="text-emerald-400">22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu</p>
              <p className="text-emerald-400">80/tcp   open  http    nginx 1.18.0 (Vulnerable App)</p>
              <p className="text-blue-400">|_http-title: CyberBooks - Online Library</p>
              <p className="text-accent-green pt-1">guest@cybertrip:~$ sqlmap -u "http://target/search?q=test" --dbs</p>
              <p className="text-yellow-400">[+] GET parameter 'q' is vulnerable: UNION query (5 columns)</p>
              <p className="text-emerald-400 font-bold">[+] Available databases: ['cyberbooks', 'secret_vault']</p>
              <p className="text-accent-green animate-pulse">guest@cybertrip:~$ _</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Tournaments Spotlight Section */}
      <section className="bg-gradient-to-r from-[#0d161a] via-[#111827] to-[#1a1124] py-16 border-y border-subtle">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Jonli Musobaqalar Maydoni
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-primary">CyberTrip Kiber Turnirlari</h2>
            </div>
            <Link href="/tournaments">
              <Button variant="outline" className="gap-2 border-gray-700 hover:border-gray-500">
                Barcha turnirlar <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-emerald-500/30 p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    HOZIR JONLI
                  </span>
                  <span className="font-bold text-accent-green font-mono text-sm">15,000,000 UZS</span>
                </div>
                <h3 className="text-xl font-bold text-primary">Toshkent Kiber Qalqon CTF 2026</h3>
                <p className="text-sm text-secondary line-clamp-2">
                  O'zbekistonning eng yirik milliy jamoaviy CTF musobaqasi. Web, Pwn, Crypto va Forensics yo'nalishlarida 140+ jamoa bellashmoqda.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-subtle mt-4">
                <span className="text-xs text-secondary">Qatnashchilar: 142 jamoa</span>
                <Link href="/tournaments/cyber-shield-2026">
                  <Button variant="primary" size="sm" className="gap-1.5">
                    Turnirga kirish <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="bg-card border-subtle p-6 flex flex-col justify-between hover:border-gray-600 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    RO'YXAT OCHIQ
                  </span>
                  <span className="font-bold text-accent-green font-mono text-sm">7,500,000 UZS</span>
                </div>
                <h3 className="text-xl font-bold text-primary">Web Pentest Master Cup 2026</h3>
                <p className="text-sm text-secondary line-clamp-2">
                  Individual Web xavfsizlik chempionati: SQLi, SSRF, IDOR va Business Logic zaifliklarini ekspluatatsiya qilish bo'yicha chempionat.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-subtle mt-4">
                <span className="text-xs text-secondary">Boshlanish: 25 Oktyabr</span>
                <Link href="/tournaments/web-pentest-cup-2026">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    Ro'yxatdan o'tish <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3 text-primary">O'rganish Yo'laklari</h2>
              <p className="text-secondary max-w-2xl text-sm lg:text-base">
                O'zingizga mos yo'nalishni tanlang va professional amaliyotchi darajasigacha qadamma-qadam rivojlaning.
              </p>
            </div>
            <Link href="/learn" className="hidden md:flex items-center gap-1 text-accent-blue hover:underline text-sm font-semibold">
              Barchasini ko'rish <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Web Pentest Asoslari', icon: <Globe />, lessons: 42, diff: 'BEGINNER', color: 'text-blue-500', desc: 'SQLi, XSS, CSRF, IDOR va API xavfsizligi' },
              { title: 'Linux va Tizim Xavfsizligi', icon: <Terminal />, lessons: 28, diff: 'BEGINNER', color: 'text-yellow-500', desc: 'Linux buyruqlari, huquqlar, bash skriptlar va hardening' },
              { title: 'Tarmoq Xavfsizligi', icon: <Activity />, lessons: 35, diff: 'INTERMEDIATE', color: 'text-green-500', desc: 'TCP/IP, Wireshark, Nmap, paketlar tahlili va MITM' },
              { title: 'Kriptografiya Asoslari', icon: <Lock />, lessons: 20, diff: 'INTERMEDIATE', color: 'text-purple-500', desc: 'RSA, AES, xesh funksiyalar va shifrlash usullari' },
              { title: 'SOC va Blue Team', icon: <Shield />, lessons: 45, diff: 'ADVANCED', color: 'text-indigo-500', desc: 'SIEM monitoring, insidentlar tahlili va mudofaa' },
              { title: 'OSINT va Razvedka', icon: <Search />, lessons: 20, diff: 'BEGINNER', color: 'text-teal-500', desc: 'Ochiq manbalar orqali ma\'lumot yig\'ish va kiber razvedka' },
            ].map((path, i) => (
              <Link key={i} href="/learn" className="block">
                <Card className="hover:border-gray-600 transition-all duration-200 group cursor-pointer bg-card h-full flex flex-col justify-between">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-elevated flex items-center justify-center mb-4 ${path.color}`}>
                      {path.icon}
                    </div>
                    <CardTitle className="group-hover:text-accent-green transition-colors text-lg">
                      {path.title}
                    </CardTitle>
                    <p className="text-xs text-secondary mt-1">{path.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-subtle">
                      <span className="text-xs text-secondary font-mono">{path.lessons} ta dars</span>
                      <Badge difficulty={path.diff as any}>{path.diff}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Range & Realistic Labs Preview */}
      <section className="bg-card py-20 border-y border-subtle">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-green uppercase tracking-wider mb-2">
                <Cpu className="w-3.5 h-3.5" />
                Interaktiv Kiber-Poligon
              </div>
              <h2 className="text-3xl font-extrabold text-primary">Haqiqiy Zaiflik Laboratoriyalari</h2>
              <p className="text-secondary text-sm mt-1">Brauzeringizda ishga tushadigan real veb-ilovalar va xakerlik qurollari</p>
            </div>
            <Link href="/labs">
              <Button variant="primary" className="gap-2">
                30+ Laboratoriyalarni ko'rish <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'SQL Injection: CyberBooks', cat: 'SQLi', diff: 'BEGINNER', xp: 200, time: '45 daq' },
              { title: 'Stored XSS: CyberForum', cat: 'XSS', diff: 'BEGINNER', xp: 150, time: '30 daq' },
              { title: 'IDOR: SecureDocs Portal', cat: 'IDOR', diff: 'INTERMEDIATE', xp: 200, time: '30 daq' },
              { title: 'Command Injection: Panel', cat: 'RCE', diff: 'INTERMEDIATE', xp: 300, time: '45 daq' },
            ].map((lab, i) => (
              <Card key={i} className="bg-elevated/40 border-subtle hover:border-emerald-500/50 transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-elevated text-emerald-400 border border-subtle">
                      {lab.cat}
                    </span>
                    <Badge difficulty={lab.diff as any}>{lab.diff}</Badge>
                  </div>
                  <h4 className="font-bold text-primary text-base mb-1">{lab.title}</h4>
                  <span className="text-xs text-secondary font-mono">Davomiyligi: {lab.time}</span>
                </div>
                <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent-green">+{lab.xp} XP</span>
                  <Link href="/labs" className="text-xs text-secondary hover:text-primary flex items-center gap-1">
                    Boshlash <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-subtle bg-gradient-to-r from-[#111827] via-[#161f30] to-[#111827] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-accent-green text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Shaffof va Qulay Tariflar
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
                Kiberxavfsizlik mutaxassisi bo'lish yo'lini tanlang
              </h2>
              <p className="text-secondary text-sm lg:text-base leading-relaxed">
                Bepul sinab ko'ring yoki barcha amaliy laboratoriyalar, Linux terminali, eksklyuziv turnirlar va QR-kodli rasmiy sertifikatlarga ega bo'lish uchun Pro tarifiga o'ting.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-secondary">
                <span className="flex items-center gap-1 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" /> Click, Payme, Uzum to'lovlari
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" /> Istalgan vaqtda bekor qilish
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <Link href="/pricing">
                <Button size="lg" variant="primary" className="w-full justify-center gap-2 font-semibold">
                  Tariflarni taqqoslash <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/account/subscription">
                <Button size="lg" variant="outline" className="w-full justify-center border-gray-700">
                  Hisob va Limitlar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 border-t border-subtle bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ta'lim Metodologiyasi</h2>
          <p className="text-secondary max-w-xl mx-auto text-sm mb-12">
            Haqiqiy xavfsizlik nazariyani faqat xavfsiz laboratoriyada buzib ko'rib, tahlil qilingandagina o'zlashtiriladi.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-semibold text-secondary">
            <span className="px-4 py-2 bg-elevated rounded-lg border border-subtle text-primary">1. O'rganing</span>
            <ChevronRight className="text-subtle w-4 h-4" />
            <span className="px-4 py-2 bg-elevated rounded-lg border border-subtle text-primary">2. Tushuning</span>
            <ChevronRight className="text-subtle w-4 h-4" />
            <span className="px-4 py-2 bg-elevated rounded-lg border border-subtle text-primary">3. Mashq qiling</span>
            <ChevronRight className="text-subtle w-4 h-4" />
            <span className="px-4 py-2 bg-elevated rounded-lg border border-subtle text-primary">4. Buzib ko'ring</span>
            <ChevronRight className="text-subtle w-4 h-4" />
            <span className="px-4 py-2 bg-elevated rounded-lg border border-subtle text-primary">5. Tahlil qiling</span>
            <ChevronRight className="text-subtle w-4 h-4" />
            <span className="px-4 py-2 bg-accent-green/10 text-accent-green border border-accent-green/30 rounded-lg">6. Egallang</span>
          </div>
        </div>
      </section>
    </div>
  );
}
