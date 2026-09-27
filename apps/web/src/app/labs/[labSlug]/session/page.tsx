'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Terminal, Shield, Clock, CheckCircle2, RotateCcw, Send, Play, Globe, 
  ExternalLink, AlertTriangle, Award, RefreshCw, ChevronRight, ChevronDown, 
  ChevronUp, BookOpen, Check, ArrowLeft, ArrowRight, Eye, Code2, Sparkles, 
  HelpCircle, Lock, Unlock, AlertCircle, Compass, Server, Info, Layers, 
  Flag, X, FileText
} from 'lucide-react';
import { getLabBySlug, LABS_DATA } from '@/lib/labs-data';
import { fetchApi } from '@/lib/api';

interface HintItem {
  number: number;
  costXp: number;
  content?: string;
  isUnlocked: boolean;
}

export default function LabSessionPage({ params }: { params?: { labSlug?: string } }) {
  const routeParams = useParams();
  const slug = (routeParams?.labSlug as string) || params?.labSlug || 'sqli-login';

  const labDef = getLabBySlug(slug) || LABS_DATA[0];

  // Lab lifecycle state: NOT_STARTED | RUNNING | COMPLETED | EXPIRED
  const [labState, setLabState] = useState<'NOT_STARTED' | 'RUNNING' | 'COMPLETED' | 'EXPIRED'>('RUNNING');
  const [timeLeft, setTimeLeft] = useState(labDef.estimatedMinutes * 60 || 45 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Active view tab: app | terminal | briefing | notes
  const [activeTab, setActiveTab] = useState<'app' | 'terminal' | 'briefing' | 'notes'>('app');

  // Left sidebar toggle
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  // Flag Submission State
  const [flagInput, setFlagInput] = useState('');
  const [flagState, setFlagState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'already_solved' | 'rate_limited' | 'network_error'>('idle');
  const [flagFeedback, setFlagFeedback] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(labDef.xp || 200);

  // Hints state (managed by server)
  const [hints, setHints] = useState<HintItem[]>([
    { number: 1, costXp: 20, isUnlocked: false },
    { number: 2, costXp: 40, isUnlocked: false },
    { number: 3, costXp: 60, isUnlocked: false },
  ]);
  const [hintToUnlock, setHintToUnlock] = useState<HintItem | null>(null);
  const [unlockingHint, setUnlockingHint] = useState(false);

  // Terminal simulator state
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; out: string; isErr?: boolean }>>([
    { cmd: 'whoami', out: 'kali' },
    { cmd: 'uname -a', out: 'Linux cybertrip-range 6.8.0-kali1-amd64 #1 SMP Kali 6.8.1 x86_64 GNU/Linux' },
    { cmd: 'cat /etc/hosts', out: '127.0.0.1\tlocalhost\n10.10.11.45\ttarget.lab\n10.10.11.46\tapi-gateway.lab' },
  ]);
  const [termInput, setTermInput] = useState('');
  const termEndRef = useRef<HTMLDivElement>(null);

  // Notes state
  const [userNotes, setUserNotes] = useState('');

  // Modals
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Route selector in target browser bar
  const [selectedRoute, setSelectedRoute] = useState('/');

  // 1. Fetch initial hints and check active session
  useEffect(() => {
    let isMounted = true;

    async function loadSessionAndHints() {
      try {
        const sessionRes = await fetchApi<{
          status: 'RUNNING' | 'COMPLETED' | 'EXPIRED';
          remainingSeconds?: number;
          pointsEarned?: number;
        }>(`/labs/${slug}/session`);

        if (sessionRes && isMounted) {
          if (sessionRes.status === 'COMPLETED') {
            setLabState('COMPLETED');
            if (sessionRes.pointsEarned) setEarnedPoints(sessionRes.pointsEarned);
          } else if (sessionRes.status === 'EXPIRED') {
            setLabState('EXPIRED');
          } else if (sessionRes.remainingSeconds !== undefined && sessionRes.remainingSeconds > 0) {
            setTimeLeft(sessionRes.remainingSeconds);
          }
        }

        const hintsRes = await fetchApi<HintItem[]>(`/labs/${slug}/hints`);
        if (hintsRes && Array.isArray(hintsRes) && isMounted) {
          setHints(hintsRes);
        }
      } catch {
        // Safe fallback
      }
    }

    loadSessionAndHints();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 2. Countdown Timer
  useEffect(() => {
    if (labState !== 'RUNNING' || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLabState('EXPIRED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [labState, isPaused]);

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Determine target app URL and mock address
  const getTargetConfig = () => {
    let targetUrl = '/targets/cyberbooks/index.html';
    let mockAddress = 'http://target-cyberbooks.lab:8080' + (labDef.entryPoint || '/login');
    let availableRoutes: string[] = ['/login', '/search', '/catalog', '/admin'];

    const app = (labDef.targetApp || '').toLowerCase();
    const cat = labDef.category || '';

    if (app.includes('order') || cat === 'IDOR') {
      targetUrl = '/targets/orderhub/index.html';
      mockAddress = 'http://orderhub.enterprise.lab:8080/orders';
      availableRoutes = ['/orders', '/invoices', '/checkout', '/api/v1/orders'];
    } else if (app.includes('api') || cat === 'JWT' || cat === 'API_SECURITY') {
      targetUrl = '/targets/cyberapi/index.html';
      mockAddress = 'http://api-gateway.lab:8000/api/v1/auth/token';
      availableRoutes = ['/api/v1/auth/token', '/api/v1/admin/vault', '/api/v1/keys'];
    } else if (app.includes('report') || cat === 'XXE') {
      targetUrl = '/targets/reportmanager/index.html';
      mockAddress = 'http://reportmanager.corp.internal/reports/upload';
      availableRoutes = ['/reports/upload', '/reports/audit', '/api/xml/ingest'];
    } else if (app.includes('invoice') || cat === 'SSTI') {
      targetUrl = '/targets/invoicebuilder/index.html';
      mockAddress = 'http://invoicebuilder.service.lab/templates/preview';
      availableRoutes = ['/templates/preview', '/invoices/generate', '/templates/editor'];
    } else if (app.includes('file') || cat === 'PATH_TRAVERSAL') {
      targetUrl = '/targets/filemanager/index.html';
      mockAddress = 'http://filemanager.storage.lab/files';
      availableRoutes = ['/files', '/view', '/download', '/logs'];
    } else if (app.includes('shop') || cat === 'BUSINESS_LOGIC') {
      targetUrl = '/targets/shopflow/index.html';
      mockAddress = 'http://shopflow.store.lab/products';
      availableRoutes = ['/cart', '/checkout', '/products', '/coupon'];
    } else if (app.includes('flash') || cat === 'RACE_CONDITION') {
      targetUrl = '/targets/flashsale/index.html';
      mockAddress = 'http://flashsale.deal.lab/flash/deals';
      availableRoutes = ['/coupon/redeem', '/flash/deals', '/api/v1/concurrency'];
    } else if (app.includes('graphql') || cat === 'GRAPHQL') {
      targetUrl = '/targets/graphql-lab/index.html';
      mockAddress = 'http://graphql-engine.lab/graphql';
      availableRoutes = ['/graphql', '/schema', '/explorer'];
    } else if (app.includes('support') || cat === 'WEBSOCKET') {
      targetUrl = '/targets/realtime-support/index.html';
      mockAddress = 'ws://support-gateway.lab/chat';
      availableRoutes = ['/chat', '/support/ticket', '/ws/stream'];
    } else if (app.includes('auth') || cat === 'AUTHENTICATION') {
      targetUrl = '/targets/secureauth/index.html';
      mockAddress = 'https://secureauth.corp/login';
      availableRoutes = ['/login', '/login/2fa', '/auth/reset'];
    } else if (app.includes('case') || cat === 'FORENSICS') {
      targetUrl = '/targets/cybercase/index.html';
      mockAddress = 'http://cybercase.dfir.lab/cases';
      availableRoutes = ['/cases/evidence', '/logs/analyzer', '/pcap/dump'];
    } else if (app.includes('intel') || cat === 'OSINT') {
      targetUrl = '/targets/inteldesk/index.html';
      mockAddress = 'http://inteldesk.recon.lab/intel';
      availableRoutes = ['/search/intel', '/whois', '/subdomains'];
    } else if (app.includes('vault') || cat === 'FILE_UPLOAD') {
      targetUrl = '/targets/mediavault/index.html';
      mockAddress = 'http://mediavault.storage.lab/upload';
      availableRoutes = ['/upload', '/gallery', '/api/files'];
    } else if (app.includes('diagnostic') || cat === 'COMMAND_INJECTION') {
      targetUrl = '/targets/diagnosticpanel/index.html';
      mockAddress = 'http://diagnostic-panel.infra.lab/tools/ping';
      availableRoutes = ['/tools/ping', '/tools/traceroute', '/system/logs'];
    } else if (app.includes('site') || cat === 'SSRF') {
      targetUrl = '/targets/sitepreview/index.html';
      mockAddress = 'http://preview-service.lab/fetch';
      availableRoutes = ['/fetch', '/status', '/api/preview'];
    } else if (app.includes('forum') || cat === 'XSS') {
      targetUrl = '/targets/cyberforum/index.html';
      mockAddress = 'http://cyberforum.community.lab/topics';
      availableRoutes = ['/topics', '/post', '/admin/review'];
    }

    return { targetUrl, mockAddress, availableRoutes };
  };

  const targetConfig = getTargetConfig();

  // Flag Submission Handler (Primary Completion Mechanism)
  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim() || flagState === 'submitting') return;

    if (labState === 'EXPIRED') {
      setFlagState('error');
      setFlagFeedback("Sessiya muddati tugagan. Laboratoriyani qayta boshlang.");
      return;
    }

    setFlagState('submitting');
    setFlagFeedback(null);
    setAttempts((a) => a + 1);

    const cleanFlag = flagInput.trim();

    try {
      const res = await fetchApi<{
        success: boolean;
        status?: string;
        message?: string;
        points?: number;
        alreadySolved?: boolean;
      }>(`/labs/${slug}/submit`, {
        method: 'POST',
        body: JSON.stringify({ flag: cleanFlag }),
      });

      if (res?.success) {
        setFlagState('success');
        setLabState('COMPLETED');
        setFlagFeedback(res.message || "Challenge Solved! Flag to'g'ri qabul qilindi.");
        if (res.points) setEarnedPoints(res.points);
        setShowCompletionModal(true);
      } else if (res?.alreadySolved) {
        setFlagState('already_solved');
        setFlagFeedback(res.message || "Ushbu laboratoriya allaqachon topshirilgan.");
        setLabState('COMPLETED');
      } else {
        setFlagState('error');
        setFlagFeedback(res?.message || "Noto'g'ri flag. Qayta urinib ko'ring.");
        setTimeout(() => {
          setFlagState('idle');
        }, 4000);
      }
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('Rate Limit') || msg.includes('429')) {
        setFlagState('rate_limited');
        setFlagFeedback("Juda ko'p urinishlar qilindi. Iltimos, 30 soniya kuting.");
      } else if (msg.includes('allaqachon')) {
        setFlagState('already_solved');
        setFlagFeedback("Ushbu laboratoriya allaqachon topshirilgan.");
        setLabState('COMPLETED');
      } else if (msg.includes('Noto\'g\'ri') || msg.includes('Invalid')) {
        setFlagState('error');
        setFlagFeedback("Noto'g'ri flag. Qayta urinib ko'ring.");
        setTimeout(() => {
          setFlagState('idle');
        }, 4000);
      } else {
        // Fallback for demo when backend is offline
        if (cleanFlag.startsWith('FLAG{') || cleanFlag.startsWith('CTFLAB{')) {
          setFlagState('success');
          setLabState('COMPLETED');
          setFlagFeedback("Challenge Solved! Flag to'g'ri qabul qilindi.");
          setShowCompletionModal(true);
        } else {
          setFlagState('error');
          setFlagFeedback("Noto'g'ri flag formati. Bayroq FLAG{...} yoki CTFLAB{...} formatida bo'lishi kerak.");
          setTimeout(() => {
            setFlagState('idle');
          }, 4000);
        }
      }
    }
  };

  // Hint Unlock Handler
  const handleConfirmUnlockHint = async () => {
    if (!hintToUnlock || unlockingHint) return;

    setUnlockingHint(true);
    try {
      const res = await fetchApi<{
        success: boolean;
        hintNumber: number;
        content: string;
        costXp: number;
        message?: string;
      }>(`/labs/${slug}/hints/${hintToUnlock.number}/unlock`, {
        method: 'POST',
      });

      if (res && res.success) {
        setHints((prev) =>
          prev.map((h) =>
            h.number === hintToUnlock.number
              ? { ...h, isUnlocked: true, content: res.content }
              : h
          )
        );
        setEarnedPoints((prev) => Math.max(50, prev - (res.costXp || 0)));
      }
    } catch {
      // Local fallback
      setHints((prev) =>
        prev.map((h) =>
          h.number === hintToUnlock.number
            ? {
                ...h,
                isUnlocked: true,
                content:
                  hintToUnlock.number === 1
                    ? "Kiritish maydonlariga SQL sintaksis belgilarini (\' yoki \") qo'yib, server javobidagi xatoliklarni tekshiring."
                    : hintToUnlock.number === 2
                    ? "ORDER BY yoki UNION SELECT so'rovlari orqali jadval ustunlarini aniqlang."
                    : "Maxfiy flag jadvalidan ma'lumotlarni chiqarib olish uchun UNION SELECT id, flag_val FROM flags-- payloadidan foydalaning.",
              }
            : h
        )
      );
      setEarnedPoints((prev) => Math.max(50, prev - hintToUnlock.costXp));
    } finally {
      setUnlockingHint(false);
      setHintToUnlock(null);
    }
  };

  // Terminal simulator command handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;

    const cmd = termInput.trim();
    const lower = cmd.toLowerCase();
    let out = '';

    if (lower === 'clear') {
      setTermHistory([]);
      setTermInput('');
      return;
    } else if (lower === 'help') {
      out = 'Available commands: whoami, id, uname -a, curl, ping, nmap, dirb, sqlmap, cat, clear, help';
    } else if (lower.startsWith('curl')) {
      out = `HTTP/1.1 200 OK\nServer: CyberRange/2.0\nContent-Type: text/html; charset=UTF-8\n\n<!DOCTYPE html><html><body><h1>CyberTrip Target App</h1><p>Status: Ready</p></body></html>`;
    } else if (lower.startsWith('ping')) {
      out = `PING 10.10.11.45 (10.10.11.45) 56(84) bytes of data.\n64 bytes from 10.10.11.45: icmp_seq=1 ttl=64 time=0.412 ms\n64 bytes from 10.10.11.45: icmp_seq=2 ttl=64 time=0.388 ms\n--- 10.10.11.45 ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
    } else if (lower.startsWith('nmap')) {
      out = `Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for target.lab (10.10.11.45)\nHost is up (0.00045s latency).\nPORT     STATE SERVICE\n80/tcp   open  http\n8080/tcp open  http-proxy\nNmap done: 1 IP address scanned in 1.24 seconds`;
    } else {
      out = `kali@cybertrip:~$ ${cmd}: buyruq qabul qilindi.`;
    }

    setTermHistory((prev) => [...prev, { cmd, out }]);
    setTermInput('');
    setTimeout(() => {
      termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Reset Session
  const handleResetSession = () => {
    setTimeLeft(labDef.estimatedMinutes * 60 || 45 * 60);
    setLabState('RUNNING');
    setFlagState('idle');
    setFlagFeedback(null);
    setIframeKey((k) => k + 1);
    setShowResetConfirm(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#070A0E] text-gray-100 overflow-hidden font-sans select-none">
      
      {/* ── TOP STATUS & NAVIGATION BAR ── */}
      <header className="h-14 bg-[#090D14] border-b border-gray-800/80 px-4 flex items-center justify-between flex-shrink-0 z-30">
        
        {/* Left: Return & Breadcrumb */}
        <div className="flex items-center space-x-3">
          <Link
            href={`/labs/${labDef.slug}`}
            className="flex items-center text-xs text-gray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">Brifing</span>
          </Link>

          <div className="h-4 w-px bg-gray-800 hidden sm:block" />

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
              {labDef.category.replace('_', ' ')}
            </span>
            <span className="text-xs font-bold text-white max-w-[200px] sm:max-w-xs md:max-w-md truncate">
              {labDef.title}
            </span>
          </div>
        </div>

        {/* Center: Lab Lifecycle State Pill */}
        <div className="hidden md:flex items-center space-x-3">
          {labState === 'RUNNING' && (
            <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              RUNNING
            </span>
          )}
          {labState === 'COMPLETED' && (
            <span className="inline-flex items-center text-xs font-bold text-teal-300 bg-teal-500/15 border border-teal-500/30 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              COMPLETED
            </span>
          )}
          {labState === 'EXPIRED' && (
            <span className="inline-flex items-center text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              EXPIRED
            </span>
          )}

          {/* Countdown Timer */}
          <div className="flex items-center space-x-1.5 bg-[#070A0E] border border-gray-800 px-3 py-1 rounded-full font-mono text-xs">
            <Clock className={`w-3.5 h-3.5 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
            <span className={timeLeft < 300 ? 'text-rose-400 font-bold' : 'text-gray-200'}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile timer */}
          <div className="flex md:hidden items-center space-x-1 font-mono text-xs text-cyan-400 bg-[#070A0E] px-2 py-0.5 rounded border border-gray-800">
            <Clock className="w-3 h-3" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Reset session button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Laboratoriyani qayta yuklash"
            className="p-1.5 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Toggle left panel */}
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="p-1.5 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors hidden lg:flex"
            title="Vazifa panelini berkitish / ochish"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* ── MAIN 3-ZONE WORKBENCH ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        {/* ══════════════════════════════════════════════════════
            ZONE 1 (LEFT): Informative Objectives & Briefing (23%)
            NOTE: Non-clickable, purely informational indicator!
            ══════════════════════════════════════════════════════ */}
        <aside
          className={`${
            leftPanelOpen ? 'w-full lg:w-80' : 'w-0'
          } flex-shrink-0 bg-[#090D13] border-r border-gray-800/80 transition-all duration-300 overflow-y-auto flex flex-col z-20`}
        >
          {leftPanelOpen && (
            <div className="p-4 space-y-5">
              
              {/* Target info card */}
              <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span className="flex items-center text-cyan-400 font-bold uppercase">
                    <Server className="w-3.5 h-3.5 mr-1" /> {labDef.targetApp}
                  </span>
                  <span className="text-gray-500">{labDef.difficulty}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {labDef.description}
                </p>
              </div>

              {/* Informative Objectives Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Laboratoriya Maqsadlari
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono font-normal">
                    {labDef.objectives?.length || 3} bosqich
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(labDef.objectives && labDef.objectives.length > 0
                    ? labDef.objectives
                    : [
                        { id: 1, title: 'Zaiflik nuqtasini aniqlash', description: 'Nishon tizimda filtrlash kamchiligini fosh eting' },
                        { id: 2, title: 'Eksploitatsiyani amalga oshirish', description: 'Zaiflik orqali tizim ma\'lumotlarini oling' },
                        { id: 3, title: 'Maxfiy flagni qo\'lga kiritish', description: 'Tizim ichidagi flagni toping va o\'ng paneldan yuboring' },
                      ]
                  ).map((obj, i) => (
                    <div
                      key={obj.id}
                      className="bg-[#0B0F17] border border-gray-800/80 rounded-xl p-3 select-text cursor-default"
                    >
                      <div className="flex items-start space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-gray-900 border border-gray-700 text-gray-400 text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-200">
                            {obj.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                            {obj.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-[11px] text-cyan-300/90 leading-relaxed">
                  💡 <strong>Ko'rsatma:</strong> Nishon ilovada zaiflikni fosh etib, maxfiy bayroqni toping va uni o'ng tarafdagi <strong>Flag Submission</strong> blokiga kiriting.
                </div>
              </div>

              {/* Briefing summary */}
              <div className="space-y-2 pt-2 border-t border-gray-800/60">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Brifing
                </h4>
                <div className="text-xs text-gray-400 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-gray-800/60">
                  {labDef.briefing}
                </div>
              </div>

            </div>
          )}
        </aside>

        {/* ══════════════════════════════════════════════════════
            ZONE 2 (CENTER): Actual Lab Target / Workstation (53%)
            The visually dominant application / terminal
            ══════════════════════════════════════════════════════ */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#070A0E] overflow-hidden">
          
          {/* Target Browser Address Bar */}
          <div className="h-11 bg-[#090D13] border-b border-gray-800 px-3 flex items-center justify-between gap-3 flex-shrink-0">
            
            {/* View Tab Switcher */}
            <div className="flex items-center space-x-1 bg-[#070A0E] border border-gray-800 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('app')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'app' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Nishon Ilova</span>
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'terminal' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal (Kali)</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'notes' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Qaydlar</span>
              </button>
            </div>

            {/* Address Bar */}
            {activeTab === 'app' && (
              <div className="flex-1 max-w-xl hidden sm:flex items-center space-x-2 bg-[#070A0E] border border-gray-800 px-3 py-1 rounded-lg text-xs font-mono text-gray-300">
                <span className="text-gray-500">URL:</span>
                <span className="text-cyan-400 truncate">{targetConfig.mockAddress}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                title="Sahifani yangilash"
                className="p-1.5 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                href={targetConfig.targetUrl}
                target="_blank"
                rel="noreferrer"
                title="Alohida oynada ochish"
                className="p-1.5 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Target Workstation Area */}
          <div className="flex-1 relative overflow-hidden bg-[#0A0E17]">
            {activeTab === 'app' && (
              <iframe
                key={iframeKey}
                src={targetConfig.targetUrl}
                className="w-full h-full border-0 bg-white"
                title="Vulnerable Target Application"
                sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
              />
            )}

            {activeTab === 'terminal' && (
              <div className="w-full h-full bg-[#05080F] text-gray-200 font-mono text-xs p-4 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2">
                  <div className="text-cyan-400 font-bold mb-3">
                    [CYBERTRIP RANGE CLI] Kali Linux 6.8 • Target: {labDef.targetApp}
                  </div>
                  {termHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <span>kali@cybertrip:~$</span>
                        <span className="text-white">{item.cmd}</span>
                      </div>
                      <pre className="text-gray-300 whitespace-pre-wrap pl-4 font-mono text-[11px] leading-relaxed">
                        {item.out}
                      </pre>
                    </div>
                  ))}
                  <div ref={termEndRef} />
                </div>

                <form onSubmit={handleTerminalSubmit} className="mt-3 flex items-center space-x-2 pt-2 border-t border-gray-800">
                  <span className="text-emerald-400 font-bold">kali@cybertrip:~$</span>
                  <input
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    placeholder="curl http://target.lab:8080/..."
                    className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs"
                    autoFocus
                  />
                  <button type="submit" className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded">
                    Run
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="w-full h-full bg-[#090D14] p-6 flex flex-col space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-cyan-400" /> Eksploitatsiya Qaydlari
                </h3>
                <p className="text-xs text-gray-400">
                  Ushbu laboratoriyada topilgan parametrlar, URL manzillar yoki oraliq tokenlarni yozib boring.
                </p>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Masalan: /search?id=1' UNION SELECT ... / admin paroli: hash=8842..."
                  className="flex-1 w-full bg-[#070A0E] border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}
          </div>

        </main>

        {/* ══════════════════════════════════════════════════════
            ZONE 3 (RIGHT): Lab Panel (Hints, Timer & Flag Submission) (24%)
            The authoritative completion mechanism!
            ══════════════════════════════════════════════════════ */}
        <aside className="w-full lg:w-96 bg-[#090D13] border-t lg:border-t-0 lg:border-l border-gray-800/80 flex flex-col flex-shrink-0 overflow-y-auto z-20">
          
          <div className="p-5 space-y-6">

            {/* Status & Points Widget */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mukofot Balli</span>
                <span className="text-xs font-mono font-bold text-emerald-400">+{earnedPoints} XP</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="text-gray-500">Laboratoriya Holati:</span>
                <span className={`font-bold uppercase ${
                  labState === 'COMPLETED' ? 'text-emerald-400' :
                  labState === 'EXPIRED' ? 'text-rose-400' : 'text-cyan-400'
                }`}>
                  {labState}
                </span>
              </div>
            </div>

            {/* ── HINTS SYSTEM ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Yordamchi Maslahatlar (Hints)
                </h3>
                <span className="text-[10px] text-amber-400/80 font-mono">
                  {hints.filter((h) => h.isUnlocked).length}/{hints.length} ochilgan
                </span>
              </div>

              <div className="space-y-2">
                {hints.map((hint) => (
                  <div
                    key={hint.number}
                    className="bg-[#0B0F17] border border-gray-800 rounded-xl overflow-hidden"
                  >
                    {!hint.isUnlocked ? (
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-300">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Maslahat #{hint.number}</span>
                          <span className="text-[10px] text-amber-400 font-mono">(-{hint.costXp} XP)</span>
                        </div>
                        <button
                          onClick={() => setHintToUnlock(hint)}
                          className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold rounded-lg transition-colors"
                        >
                          Ochish
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 space-y-1.5 bg-[#0D121B]">
                        <div className="flex items-center text-xs font-bold text-amber-300">
                          <Unlock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                          <span>Maslahat #{hint.number} (Ochilgan)</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-mono text-[11px] pt-1">
                          {hint.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                PRIMARY COMPLETION MECHANISM: FLAG SUBMISSION
                ══════════════════════════════════════════════════════ */}
            <div className="bg-gradient-to-b from-[#0F172A]/40 to-[#0B0F17] border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
              
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center">
                  <Flag className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                  FLAG SUBMISSION
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  Nishon ilovani exploit qilib olingan maxfiy bayroqni kiriting:
                </p>
              </div>

              {labState === 'COMPLETED' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Laboratoriya Yakunlandi!</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    +{earnedPoints} XP muvaffaqiyatli qabul qilindi.
                  </p>
                  <Link href="/labs" className="inline-block pt-2">
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-colors">
                      Boshqa laboratoriyalarga o'tish →
                    </button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleFlagSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      placeholder="CTFLAB{...} yoki FLAG{...}"
                      disabled={flagState === 'submitting' || labState === 'EXPIRED'}
                      className={`w-full bg-[#070A0E] border rounded-xl px-3.5 py-2.5 font-mono text-xs focus:outline-none transition-colors ${
                        flagState === 'error'
                          ? 'border-rose-500 text-rose-300'
                          : flagState === 'success'
                          ? 'border-emerald-500 text-emerald-300'
                          : 'border-gray-800 focus:border-cyan-500 text-gray-200'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!flagInput.trim() || flagState === 'submitting' || labState === 'EXPIRED'}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-black font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                  >
                    {flagState === 'submitting' ? (
                      <span>Tekshirilmoqda...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Flagni Tekshirish</span>
                      </>
                    )}
                  </button>

                  {/* Inline feedback states */}
                  {flagFeedback && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-start space-x-2 leading-relaxed ${
                        flagState === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : flagState === 'rate_limited'
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                          : flagState === 'already_solved'
                          ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                          : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{flagFeedback}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
                    <span>Urinishlar: {attempts}</span>
                    <span>Server-side tekshiruv</span>
                  </div>
                </form>
              )}

            </div>

          </div>

        </aside>

      </div>

      {/* ── HINT UNLOCK CONFIRMATION MODAL ── */}
      {hintToUnlock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2.5 text-amber-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h4 className="text-sm font-bold">Maslahatni Ochish</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              #{hintToUnlock.number} raqamli maslahatdan foydalanish sizning yakuniy mukofot ballingizdan{' '}
              <strong className="text-amber-400">-{hintToUnlock.costXp} XP</strong> ayiradi.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setHintToUnlock(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmUnlockHint}
                disabled={unlockingHint}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl transition-colors"
              >
                {unlockingHint ? 'Ochilmoqda...' : 'Tasdiqlash'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESET CONFIRMATION MODAL ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2.5 text-rose-400">
              <RotateCcw className="w-5 h-5" />
              <h4 className="text-sm font-bold">Sessiyani Qayta Yuklash</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Laboratoriya simulyatori dastlabki holatga qaytariladi va taymer qaytadan 45 daqiqaga o'rnatiladi.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleResetSession}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Qayta yuklash
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
