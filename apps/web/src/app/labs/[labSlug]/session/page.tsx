'use client';

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { 
  Terminal, Shield, Clock, CheckCircle2, RotateCcw, Send, Play, Globe, 
  ExternalLink, AlertTriangle, Award, RefreshCw, ChevronRight, BookOpen, 
  Check, ArrowLeft, ArrowRight, Eye, Code2, Sparkles, HelpCircle, Lock, 
  Unlock, AlertCircle, Compass 
} from 'lucide-react';
import { getLabBySlug, LABS_DATA } from '@/lib/labs-data';
import { getLevelForXp, ACHIEVEMENTS } from '@/lib/gamification';

interface LabObjective {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  manualEvidence?: string;
  autoKey?: string;
}

interface Hint {
  level: number;
  title: string;
  penalty: number;
  content: string;
  unlocked: boolean;
}

export default function LabSessionPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.labSlug;

  const [activeTab, setActiveTab] = useState<'app' | 'terminal' | 'briefing' | 'review'>('app');
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [confirmUnlockHint, setConfirmUnlockHint] = useState<Hint | null>(null);
  const [selectedRoute, setSelectedRoute] = useState('/');

  // Personal notes & resume lab state
  const [userNotes, setUserNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Terminal state
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; out: string; isErr?: boolean }>>([
    { cmd: 'whoami', out: 'kali' },
    { cmd: 'uname -a', out: 'Linux cybertrip-attacker 6.8.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.8.1 x86_64 GNU/Linux' },
  ]);
  const [currentCmd, setCurrentCmd] = useState('');
  const termEndRef = useRef<HTMLDivElement>(null);

  // Determine lab configuration based on slug
  const getLabConfig = () => {
    const labDef = getLabBySlug(slug);
    if (labDef) {
      let targetUrl = '/targets/cyberbooks/index.html';
      let mockAddress = 'http://target-cyberbooks.lab:8080';
      let availableRoutes = [labDef.entryPoint, '/login', '/search', '/admin'];

      if (labDef.targetApp.toLowerCase().includes('forum')) {
        targetUrl = '/targets/cyberforum/index.html';
        mockAddress = 'http://cyberforum.lab:8080';
        availableRoutes = ['/', '/comments', '/profile', '/search', '/login', '/admin'];
      } else if (labDef.targetApp.toLowerCase().includes('docs') || labDef.category === 'IDOR') {
        targetUrl = '/targets/securedocs/index.html';
        mockAddress = 'https://securedocs.corp/api/v1';
        availableRoutes = ['/documents', '/profile', '/settings', '/download'];
      } else if (labDef.targetApp.toLowerCase().includes('diagnostic') || labDef.category === 'COMMAND_INJECTION') {
        targetUrl = '/targets/diagnosticpanel/index.html';
        mockAddress = 'http://diagnostics.internal.server';
        availableRoutes = ['/ping', '/traceroute', '/dns', '/system-status'];
      } else if (labDef.category === 'LINUX') {
        targetUrl = '/targets/cyberbooks/index.html';
        mockAddress = 'ssh kali@cybertrip-linux-range:22';
        availableRoutes = ['Terminal', '/var/log', '/etc/passwd'];
      } else {
        targetUrl = '/targets/cyberbooks/index.html';
        mockAddress = `http://${labDef.targetApp.toLowerCase()}.lab:8080`;
        availableRoutes = [labDef.entryPoint, '/search', '/login', '/admin'];
      }

      return {
        title: `${labDef.targetApp} — ${labDef.title}`,
        category: labDef.category,
        targetUrl,
        mockAddress,
        availableRoutes,
        xpReward: labDef.xp,
        hints: labDef.hints.map((h) => ({
          level: h.level,
          title: h.title,
          penalty: h.penalty,
          content: h.content,
          unlocked: false,
        })),
        objectives: labDef.objectives.map((o) => ({
          id: o.id,
          title: o.title,
          description: o.description,
          completed: false,
          autoKey: o.autoKey || `obj_${o.id}`,
        })),
      };
    }

    // Default fallback
    return {
      title: 'CyberBooks — SQL Injection (SQLi)',
      category: 'SQL_INJECTION',
      targetUrl: '/targets/cyberbooks/index.html',
      mockAddress: 'http://target-cyberbooks.lab:8080',
      availableRoutes: ['/books', '/search', '/login', '/authors', '/admin'],
      xpReward: 300,
      hints: [
        { level: 1, title: 'Kontseptual Yo\'llanma', penalty: 10, content: 'Qidiruv so\'rovi parametri SQL query bilan bevosita birlashtirilgan. Bitta qo\'shtirnoq (\') yozib xatolikni tekshiring.', unlocked: false },
        { level: 2, title: 'Aniq Zaiflik Maydoni', penalty: 25, content: 'Kitoblarni qidirishda UNION SELECT orqali boshqa jadvallardagi (users) ma\'lumotlarni olish mumkin.', unlocked: false },
        { level: 3, title: 'Exploit Sintaksisi', penalty: 50, content: 'Login sahifasida parolsiz kirish uchun: admin\' OR 1=1 --', unlocked: false },
      ],
      objectives: [
        { id: 1, title: 'SQL sintaksis xatosini keltirib chiqaring', description: 'Qidiruv maydonida bitta qo\'shtirnoq (\') yordamida ma\'lumotlar bazasi xatosini oching', completed: false, autoKey: 'error_triggered' },
        { id: 2, title: 'UNION Injection orqali bazadagi ma\'lumotlarni oling', description: 'UNION SELECT orqali foydalanuvchilar (users) yoki jadvallar ro\'yxatini chiqaring', completed: false, autoKey: 'union_injection' },
        { id: 3, title: 'Parolsiz Administrator sifatida kiring', description: 'Login formasida SQL injection (\' OR 1=1 --) orqali tizimga kiring', completed: false, autoKey: 'auth_bypass' },
      ],
    };
  };

  const labConfig = getLabConfig();
  const [objectives, setObjectives] = useState<LabObjective[]>(labConfig.objectives);
  const [hints, setHints] = useState<Hint[]>(labConfig.hints);
  const [currentXpReward, setCurrentXpReward] = useState(labConfig.xpReward);

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Listen to postMessage from the embedded target app
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'lab_evidence') {
        const evType = event.data.evidence?.type;
        const flag = event.data.evidence?.data?.flag || event.data.evidence?.flag;

        setObjectives((prev) =>
          prev.map((obj) => {
            if (obj.autoKey && (obj.autoKey === evType || (evType && evType.includes(obj.autoKey)))) {
              return { ...obj, completed: true };
            }
            if (flag && obj.description.toLowerCase().includes('flag')) {
              return { ...obj, completed: true };
            }
            return obj;
          })
        );

        setNotification(`🎯 [Maqsad bajarildi!] "${evType || 'Dalil qabul qilindi'}"`);
        setTimeout(() => setNotification(null), 5000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = objectives.filter((o) => o.completed).length;
  const isAllCompleted = completedCount === objectives.length;

  const handleManualCheck = (id: number) => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, completed: !obj.completed } : obj))
    );
  };

  const handleUnlockHint = (hint: Hint) => {
    setHints((prev) =>
      prev.map((h) => (h.level === hint.level ? { ...h, unlocked: true } : h))
    );
    setCurrentXpReward((prev) => Math.max(50, prev - hint.penalty));
    setConfirmUnlockHint(null);
    setNotification(`💡 Maslahat #${hint.level} ochildi (-${hint.penalty} XP penalti)`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleResetLab = () => {
    setObjectives(labConfig.objectives.map((o) => ({ ...o, completed: false })));
    setIframeKey((k) => k + 1);
    setTermHistory([
      { cmd: 'whoami', out: 'kali' },
      { cmd: 'uname -a', out: 'Linux cybertrip-attacker 6.8.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.8.1 x86_64 GNU/Linux' },
    ]);
    setShowResetConfirm(false);
    setNotification('🔄 Laboratoriya dastlabki holatiga qaytarildi');
    setTimeout(() => setNotification(null), 4000);
  };

  // Simulated Terminal Commands
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = currentCmd.trim();
    if (!cmd) return;

    let out = '';
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setTermHistory([]);
      setCurrentCmd('');
      return;
    } else if (lower === 'help') {
      out = 'Qo\'llab-quvvatlanadigan buyruqlar:\n  nmap, curl, sqlmap, dirb, ping, cat, ls, whoami, id, uname, clear, help';
    } else if (lower.startsWith('nmap')) {
      out = `Starting Nmap 7.94SVN ( https://nmap.org )\nNmap scan report for target.lab (192.168.1.100)\nHost is up (0.00042s latency).\nNot shown: 997 closed ports\nPORT     STATE SERVICE VERSION\n22/tcp   open  ssh     OpenSSH 9.2p1 Debian\n80/tcp   open  http    Apache httpd 2.4.57\n8080/tcp open  http    Node.js Express framework\n\nNmap done: 1 IP address (1 host up) scanned in 2.14 seconds`;
    } else if (lower.startsWith('curl')) {
      out = `HTTP/1.1 200 OK\nServer: Apache/2.4.57 (Debian)\nContent-Type: text/html; charset=UTF-8\nX-Powered-By: Cybertrip-Lab-Target\n\n<!DOCTYPE html><html><head><title>Target Application</title>...</html>`;
    } else if (lower.startsWith('sqlmap')) {
      out = `[+] sqlmap/1.8.2#stable\n[*] testing connection to target URL\n[+] GET parameter 'q' is vulnerable to UNION query SQL injection!\n[*] Target DBMS: PostgreSQL 16.2\n[+] Fetched 3 databases: [public, cyberbooks, pg_catalog]`;
      setObjectives((prev) => prev.map((o, idx) => (idx === 1 ? { ...o, completed: true } : o)));
    } else if (lower === 'id') {
      out = 'uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),100(users)';
    } else if (lower === 'whoami') {
      out = 'kali';
    } else if (lower === 'ls' || lower === 'ls -la') {
      out = 'drwxr-xr-x 4 kali kali 4096 Sep 27 12:00 .\ndrwxr-xr-x 3 root root 4096 Sep 27 10:15 ..\n-rw-r--r-- 1 kali kali  320 Sep 27 11:30 notes.txt\n-rwxr-xr-x 1 kali kali 1024 Sep 27 11:45 exploit.py';
    } else {
      out = `bash: ${cmd.split(' ')[0]}: buyruq topilmadi. Yordam uchun 'help' yozing.`;
    }

    setTermHistory((prev) => [...prev, { cmd, out }]);
    setCurrentCmd('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* ── Top Bar ── */}
      <header className="h-14 bg-[#0B0F15] border-b border-gray-800/80 flex items-center justify-between px-5 flex-shrink-0 z-20">
        <div className="flex items-center space-x-4">
          <Link
            href={`/labs/${slug}`}
            className="flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-gray-900 border border-gray-800 px-2.5 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Brifingga qaytish
          </Link>
          <div className="h-4 w-px bg-gray-800"></div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm text-gray-200">{labConfig.title}</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              FAOL POLIGON
            </span>
          </div>
        </div>

        {/* Tab switchers in header */}
        <div className="hidden md:flex items-center bg-[#070A0E] p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('app')}
            className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'app'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 mr-1.5" /> Target Ilova
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'terminal'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 mr-1.5" /> Terminal
          </button>
          <button
            onClick={() => setActiveTab('briefing')}
            className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'briefing'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Brifing
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'review'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> After Lab Review
          </button>
        </div>

        {/* Right Timer & Status Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            title="Shaxsiy eslatmalar (Notes)"
            className={`p-1.5 border rounded-lg transition-colors ${showNotes ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'}`}
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowHintModal(true)}
            className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Maslahatlar ({hints.filter(h => h.unlocked).length}/3)</span>
          </button>

          <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
            <Clock className={`w-3.5 h-3.5 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`} />
            <span className={`font-mono text-xs font-bold ${timeLeft < 300 ? 'text-rose-500' : 'text-gray-200'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            title="Laboratoriyani qayta ishga tushirish (Reset)"
            className="p-1.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowCompletionModal(true)}
            className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              isAllCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Yakunlash ({completedCount}/{objectives.length})
          </button>
        </div>
      </header>

      {/* ── Notification Toast ── */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-3 text-sm animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── Main Workspace ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Interactive Target Application or Terminal (72%) */}
        <div className="flex-1 flex flex-col bg-[#05070A] overflow-hidden border-r border-gray-800/80">
          
          {/* Target App Tab */}
          {activeTab === 'app' && (
            <div className="flex-1 flex flex-col h-full">
              {/* Fake Browser Chrome with Dynamic Route Switcher */}
              <div className="h-11 bg-[#0E131A] border-b border-gray-800 flex items-center px-4 space-x-3 flex-shrink-0">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>

                {/* Dynamic Route Switcher Tabs */}
                <div className="flex items-center space-x-1 bg-gray-950 p-1 rounded-lg border border-gray-800 text-[11px]">
                  <Compass className="w-3 h-3 text-cyan-400 ml-1 mr-0.5" />
                  {labConfig.availableRoutes.map((route) => (
                    <button
                      key={route}
                      onClick={() => {
                        setSelectedRoute(route);
                        setIframeKey((k) => k + 1);
                      }}
                      className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
                        selectedRoute === route
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {route}
                    </button>
                  ))}
                </div>

                <div className="flex-1 max-w-lg mx-auto flex items-center bg-[#070A0E] border border-gray-800 px-3 py-1 rounded-md text-xs font-mono text-gray-400">
                  <span className="text-emerald-500 mr-1.5">🔒</span>
                  <span className="truncate">{labConfig.mockAddress}{selectedRoute !== '/' ? selectedRoute : ''}</span>
                </div>

                <a
                  href={labConfig.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Yangi oynada ochish"
                  className="text-gray-500 hover:text-gray-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Live Iframe Target */}
              <div className="flex-1 relative bg-white">
                <iframe
                  key={iframeKey}
                  src={labConfig.targetUrl}
                  className="w-full h-full border-none"
                  title="Vulnerable Lab Target Application"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups"
                />
              </div>
            </div>
          )}

          {/* Attacker Kali Terminal Tab */}
          {activeTab === 'terminal' && (
            <div className="flex-1 flex flex-col bg-[#05070A] font-mono text-xs overflow-hidden">
              <div className="h-9 bg-[#0B0F15] border-b border-gray-800 flex items-center justify-between px-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300 font-semibold">kali@cybertrip-pentester: ~</span>
                </div>
                <span className="text-[11px] text-gray-500">Bash v5.2</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-2">
                <div className="text-gray-500 text-[11px]">
                  CyberTrip Kali Linux Attacker Container v2.4 [Sandbox Isolated]<br />
                  Target subnet: 192.168.1.0/24. Buyruqlar uchun 'help' yozing.
                </div>

                {termHistory.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <span className="text-gray-500">┌──(kali㉿cybertrip)-[~]</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">└─$</span>
                      <span className="text-gray-200 font-bold">{h.cmd}</span>
                    </div>
                    <pre className="text-gray-400 whitespace-pre-wrap pl-4 font-mono text-[11px]">
                      {h.out}
                    </pre>
                  </div>
                ))}
                <div ref={termEndRef} />
              </div>

              <form onSubmit={handleTerminalSubmit} className="h-10 bg-[#0B0F15] border-t border-gray-800 flex items-center px-4">
                <span className="text-emerald-400 mr-2 font-bold">kali@cybertrip:~$</span>
                <input
                  type="text"
                  value={currentCmd}
                  onChange={(e) => setCurrentCmd(e.target.value)}
                  placeholder="nmap, sqlmap, dirb, curl..."
                  className="flex-1 bg-transparent text-gray-100 outline-none font-mono text-xs"
                />
              </form>
            </div>
          )}

          {/* Briefing Tab */}
          {activeTab === 'briefing' && (
            <div className="flex-1 bg-[#090D14] p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Laboratoriya Brifingi</span>
                  <h1 className="text-2xl font-bold mt-1 text-white">{labConfig.title}</h1>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Ushbu laboratoriyada siz real zaif veb-ilovaga qarshi amaliy hujumlarni amalga oshirasiz. Hujum usullari, zaiflik tabiatini aniqlash va zarur dalillarni olish sizning asosiy vazifangizdir.
                  </p>
                </div>

                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-200">Muhim qoidalar:</h3>
                  <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
                    <li>Barcha harakatlar to'liq izolyatsiya qilingan sandbox muhitida ro'y beradi.</li>
                    <li>Zaiflikni aniqlaganingizdan so'ng, tizim avtomatik ravishda dalilni qabul qiladi.</li>
                    <li>Agar qiyinchilikka duch kelsangiz, 3-bosqichli Maslahatlar (Hints) tizimidan foydalanishingiz mumkin.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* After Lab Review Tab */}
          {activeTab === 'review' && (
            <div className="flex-1 bg-[#090D14] p-8 overflow-y-auto space-y-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="border-b border-gray-800 pb-4">
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Amaliy Tahlil & Xulosa</span>
                  <h1 className="text-2xl font-black text-white mt-1">After Lab Review: {labConfig.title}</h1>
                  <p className="text-gray-400 text-xs mt-1">Laboratoriyada yuz bergan jarayonlar, manba kodi zaifligi va himoyalanish metodikasi.</p>
                </div>

                {/* 1. What happened? */}
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-cyan-400">1. Nima sodir bo'ldi? (What happened?)</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Kirish nuqtasida foydalanuvchi tomonidan yuborilgan parametrlar server tomonidan to'g'ri tekshirilmasdan va filtrlanmasdan qabul qilinganligi sababli tizim xavfsizlik chegaralari chetlab o'tildi.
                  </p>
                </div>

                {/* 2. Why did it happen? */}
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-amber-400">2. Nega bu yuz berdi? (Why did it happen?)</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Ishlab chiquvchi kiruvchi kiritmalarni xavfsiz sanitizatsiya qilish yoki parametrlashtirilgan interfeyslardan (Prepared Statements, Context-aware escaping) foydalanish o'rniga, to'g'ridan-to'g'ri birlashtirgan.
                  </p>
                </div>

                {/* 3. What was vulnerable? */}
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-rose-400">3. Qaysi parametr zaif edi? (What was vulnerable?)</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-mono">
                    Kirish nuqtasi: <strong className="text-white">{labConfig.availableRoutes[0] || '/'}</strong><br />
                    Zaiflik toifasi: <strong className="text-cyan-400">{labConfig.category}</strong> (CWE-89 / CWE-79 / CWE-639)
                  </p>
                </div>

                {/* 4. How should it be fixed? */}
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400">4. Uni qanday tuzatish kerak? (How should it be fixed?)</h3>
                  <div className="bg-black/80 border border-gray-800 rounded-xl p-4 font-mono text-xs text-emerald-300">
                    // Xavfsiz Kod Namunasi (Backend Remediation)<br />
                    db.query('SELECT * FROM accounts WHERE id = ? AND tenant_id = ?', [userId, tenantId]);
                  </div>
                </div>

                {/* 5. What should a defender look for? */}
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-bold text-purple-400">5. Himoyachi (SOC / Blue Team) nimani qidirishi kerak? (Defender log signature)</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    WAF va Web Access loglarida shubhali belgilarga ega so'rovlar, qisqa vaqt oralig'ida qaytarilgan 500 va 403 status kodlari anomaliyalari monitoring qilinishi kerak.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Personal Notes Drawer ── */}
        {showNotes && (
          <div className="fixed bottom-4 right-4 z-40 w-96 bg-[#0B0F17] border border-cyan-500/40 rounded-2xl shadow-2xl p-4 space-y-3 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1" /> Shaxsiy Pentest Eslatmalari
              </span>
              <button onClick={() => setShowNotes(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <textarea
              rows={5}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Topilgan parametrlar, sinov payloadlari va eslatmalarni bu yerga yozing (avtomatik saqlanadi)..."
              className="w-full bg-[#070A0E] border border-gray-800 rounded-xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
            />
            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <span>Holat: Avtomatik saqlandi</span>
              <span className="text-emerald-400">✓ LocalStorage</span>
            </div>
          </div>
        )}

        {/* Right: Objectives & Verification Sidebar (28%) */}
        <aside className="w-full lg:w-96 bg-[#0B0F15] flex flex-col flex-shrink-0 border-t lg:border-t-0 overflow-y-auto">
          
          <div className="p-4 border-b border-gray-800/80 bg-[#0E131A] flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-200">Maqsadlar & Tekshirish</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {completedCount} / {objectives.length} topshiriq bajarildi
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
              +{currentXpReward} XP
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-900 h-1.5">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${(completedCount / objectives.length) * 100}%` }}
            ></div>
          </div>

          {/* Objectives List */}
          <div className="p-4 space-y-4 flex-1">
            {objectives.map((obj) => (
              <div
                key={obj.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  obj.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-gray-200'
                    : 'bg-gray-900/60 border-gray-800/80 text-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleManualCheck(obj.id)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      obj.completed
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-gray-700 bg-gray-950 text-transparent hover:border-gray-500'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="flex-1">
                    <h4 className={`text-xs font-semibold ${obj.completed ? 'text-emerald-300' : 'text-gray-200'}`}>
                      {obj.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                      {obj.description}
                    </p>

                    {obj.completed ? (
                      <span className="inline-flex items-center text-[10px] text-emerald-400 font-medium mt-2 bg-emerald-500/10 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Muvaffaqiyatli tasdiqlandi
                      </span>
                    ) : (
                      <div className="mt-2.5 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Dalil yoki flag kiriting..."
                          className="flex-1 bg-black border border-gray-800 rounded px-2 py-1 text-[11px] text-gray-200 outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={() => handleManualCheck(obj.id)}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-[10px] font-semibold px-2 py-1 rounded"
                        >
                          Tekshirish
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-3.5 text-xs text-blue-300/80 leading-relaxed">
              💡 <strong>Avtomatik tekshiruv:</strong> Chap tomondagi brauzerda hujumni bajarganingizda, dalillar avtomatik tarzda ushbu panelga yetkaziladi.
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-4 border-t border-gray-800/80 bg-[#0E131A]">
            <button
              disabled={!isAllCompleted}
              onClick={() => setShowCompletionModal(true)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                isAllCompleted
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Laboratoriyani Yakunlash (+{currentXpReward} XP)</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ── Progressive Hint Modal ── */}
      {showHintModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E141D] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>3-Bosqichli Maslahatlar Tizimi</span>
              </div>
              <button onClick={() => setShowHintModal(false)} className="text-gray-500 hover:text-white text-xs">
                Yopish ×
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Har bir maslahatni ochish laboratoriya mukofotidan (XP) ma'lum miqdorda ayirib tashlaydi. Ehtiyotkorlik bilan foydalaning!
            </p>

            <div className="space-y-3">
              {hints.map((h) => (
                <div
                  key={h.level}
                  className={`p-4 rounded-xl border transition-all ${
                    h.unlocked
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-gray-900 border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">#{h.level} - {h.title}</span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded border border-amber-500/20">
                        -{h.penalty} XP
                      </span>
                    </div>

                    {h.unlocked ? (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
                        <Unlock className="w-3 h-3 mr-1" /> Ochilgan
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmUnlockHint(h)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-[10px] rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Lock className="w-2.5 h-2.5" />
                        <span>Ochish</span>
                      </button>
                    )}
                  </div>

                  {h.unlocked ? (
                    <p className="text-xs text-gray-300 leading-relaxed font-mono bg-black/60 p-2.5 rounded-lg border border-gray-800">
                      {h.content}
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-500 italic">
                      Ushbu maslahat qulflangan. Ochish uchun tugmani bosing.
                    </p>
                  )}
                </div>
              ))}
            </div>

            {confirmUnlockHint && (
              <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>#{confirmUnlockHint.level} maslahatni ochishni tasdiqlaysizmi?</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Laboratoriya mukofotidan <strong>{confirmUnlockHint.penalty} XP</strong> ushlab qolinadi.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setConfirmUnlockHint(null)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-lg"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={() => handleUnlockHint(confirmUnlockHint)}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg"
                  >
                    Ha, ochilsin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Reset Confirmation Modal ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E141D] border border-gray-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <RotateCcw className="w-5 h-5" />
              <span>Laboratoriyani Qayta Yuklash</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Target ilova, sessiya holati va terminal tarixi tozalansinmi?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-xl"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleResetLab}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl"
              >
                Qayta yuklash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Completion Modal (Section 8 Format) ── */}
      {showCompletionModal && (() => {
        const totalXp = 2450;
        const levelData = getLevelForXp(totalXp + currentXpReward);
        const achievement = ACHIEVEMENTS.find(a => 
          labConfig.category.includes('SQL') ? a.code === 'sql_hunter' : 
          labConfig.category.includes('XSS') ? a.code === 'xss_explorer' : 
          a.code === 'first_lab'
        ) || ACHIEVEMENTS[2];

        return (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#0E141D] border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
              
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  ✓ Lab Completed
                </span>
                <h2 className="text-xl font-black text-white mt-3">{labConfig.title}</h2>
              </div>

              {/* Lab Stats Card */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center font-mono">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Reward</span>
                  <span className="text-sm font-black text-emerald-400">+{currentXpReward} XP</span>
                </div>
                <div className="border-x border-gray-800 px-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Objectives</span>
                  <span className="text-sm font-black text-cyan-400">{objectives.length} / {objectives.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Time</span>
                  <span className="text-sm font-black text-gray-200">{formatTime(45 * 60 - timeLeft)}</span>
                </div>
              </div>

              {/* Unlocked Achievement */}
              <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-center space-x-3 text-left">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Achievement:</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">+{achievement.xpReward} XP</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{achievement.title}</h4>
                </div>
              </div>

              {/* Dashboard Gamification Progress */}
              <div className="bg-[#070A0E] border border-gray-800 rounded-2xl p-4 space-y-2 text-left font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-sans">TOTAL XP</span>
                  <span className="text-emerald-400 font-bold">{(totalXp + currentXpReward).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-sans">LEVEL</span>
                  <span className="text-white font-bold">{levelData.currentLevel.level} — {levelData.currentLevel.name}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>NEXT LEVEL</span>
                    <span className="text-cyan-400 font-semibold">{levelData.xpRemaining} XP remaining</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-gray-800">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${levelData.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href="/labs"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  Keyingi laboratoriyaga o'tish →
                </Link>
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Yopish
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
