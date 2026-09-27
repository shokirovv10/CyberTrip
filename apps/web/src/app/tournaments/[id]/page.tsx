'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Clock, 
  ShieldAlert, 
  Flame, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Flag,
  MessageSquare,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Search,
  Hash,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TournamentChallenge {
  id: string;
  title: string;
  category: string;
  points: number;
  solvesCount: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  isSolved: boolean;
  description: string;
}

interface ScoreboardRow {
  rank: number;
  name: string;
  type: 'TEAM' | 'USER';
  score: number;
  solves: number;
  lastSolve: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  time: string;
  isUrgent?: boolean;
}

interface ChatMsg {
  id: string;
  user: string;
  team?: string;
  text: string;
  time: string;
  isOrg?: boolean;
}

export default function TournamentDetailPage() {
  const params = useParams();
  const tournamentId = params?.id as string;

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHALLENGES' | 'SCOREBOARD' | 'PARTICIPANTS' | 'ANNOUNCEMENTS' | 'CHAT'>('CHALLENGES');

  // Interactive Flag Submission state
  const [selectedChallenge, setSelectedChallenge] = useState<TournamentChallenge | null>(null);
  const [submittedFlag, setSubmittedFlag] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submissionFeedback, setSubmissionFeedback] = useState('');

  // Interactive Live Chat state
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { id: '1', user: 'CyberTrip Admin', isOrg: true, text: "Xush kelibsiz! Barcha topshiriqlar faol holatda. Savollar bo'lsa chatda yozishingiz mumkin.", time: '10:00' },
    { id: '2', user: 'Javohir_Sec', team: 'Toshkent RedTeam', text: "Web-02 topshirig'ida port ochiqmi yoki tekshirish kerakmi?", time: '10:14' },
    { id: '3', user: 'CyberTrip Admin', isOrg: true, text: "Ha, target server 8080-portda ishlamoqda. Docker containerlar stabil.", time: '10:16' },
    { id: '4', user: 'BlackHat_Uz', team: 'Samarkand Cyber', text: "Flag formatini eslatib yuboring iltimos.", time: '10:20' },
    { id: '5', user: 'CyberTrip Admin', isOrg: true, text: "Flag formati barcha topshiriqlar uchun: FLAG{...}", time: '10:21' },
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Sample Tournament Data
  const tournament = {
    title: 'Toshkent Kiber Qalqon CTF 2026',
    status: 'ONGOING',
    format: 'Jamoaviy (2-4 kishi)',
    prizePool: "15,000,000 so'm",
    startDate: '10 Oktyabr 2026, 10:00',
    endDate: '12 Oktyabr 2026, 22:00',
    timeLeft: '18 soat 42 daqiqa',
    userTeam: 'Toshkent RedTeam',
    userRank: 4,
    userScore: 850,
  };

  const [challenges, setChallenges] = useState<TournamentChallenge[]>([
    {
      id: 'c1',
      title: 'SQLi: Secret Database Extraction',
      category: 'Web',
      points: 250,
      solvesCount: 34,
      difficulty: 'INTERMEDIATE',
      isSolved: true,
      description: "Tizimning qidiruv formasidagi Blind SQL Injection zaifligidan foydalanib admin parolini va maxfiy jadvaldagi flagni o'g'irlang.",
    },
    {
      id: 'c2',
      title: 'JWT Algorithm Confusion (None Attack)',
      category: 'Web',
      points: 300,
      solvesCount: 19,
      difficulty: 'ADVANCED',
      isSolved: false,
      description: "API tokenini manipulyatsiya qiling. 'alg: none' va 'HS256 -> RS256' zaifliklari orqali superadmin huquqini qo'lga kiriting.",
    },
    {
      id: 'c3',
      title: 'Command Injection via Ping Service',
      category: 'Web',
      points: 200,
      solvesCount: 52,
      difficulty: 'BEGINNER',
      isSolved: true,
      description: "Tarmoq diagnostika panelidagi filtrni chetlab o'tib, server terminalida root buyruqlarini bajaring.",
    },
    {
      id: 'c4',
      title: 'Buffer Overflow: Return to Win',
      category: 'Pwn',
      points: 400,
      solvesCount: 8,
      difficulty: 'ADVANCED',
      isSolved: false,
      description: "Linux x86_64 ELF binar faylida 64-bit stack overflow amalga oshirib instruction pointer (RIP) ni print_flag() funksiyasiga yo'naltiring.",
    },
    {
      id: 'c5',
      title: 'RSA Faulty Key Factorization',
      category: 'Crypto',
      points: 200,
      solvesCount: 41,
      difficulty: 'INTERMEDIATE',
      isSolved: false,
      description: "Zaif tasodifiy sonlar generatori (PRNG) sababli hosil qilingan umumiy modul N ni Wiener hujumi orqali faktorizatsiya qiling.",
    },
    {
      id: 'c6',
      title: 'Memory Dump Malware Forensics',
      category: 'Forensics',
      points: 350,
      solvesCount: 14,
      difficulty: 'ADVANCED',
      isSolved: false,
      description: "Volatility vositasi orqali Windows xotira dumpini tahlil qiling va yashiringan C2 server ip manzilini hamda flagni toping.",
    }
  ]);

  const scoreboardData: ScoreboardRow[] = [
    { rank: 1, name: 'CyberShield Tashkent', type: 'TEAM', score: 1450, solves: 5, lastSolve: '11:42:15' },
    { rank: 2, name: 'ZeroDay Samarkand', type: 'TEAM', score: 1200, solves: 4, lastSolve: '12:10:04' },
    { rank: 3, name: 'Fergana Hackers Guild', type: 'TEAM', score: 950, solves: 3, lastSolve: '12:35:50' },
    { rank: 4, name: 'Toshkent RedTeam (Siz)', type: 'TEAM', score: 850, solves: 3, lastSolve: '12:44:21' },
    { rank: 5, name: 'Bukhara Cyber Wolves', type: 'TEAM', score: 700, solves: 2, lastSolve: '11:15:33' },
    { rank: 6, name: 'Andijan Security Lab', type: 'TEAM', score: 500, solves: 2, lastSolve: '10:55:12' },
  ];

  const announcementsData: Announcement[] = [
    {
      id: 'a1',
      title: "Vazifalar qo'shildi: Yangi Pwn va Forensics kategoriyalari ochildi!",
      content: "Barcha ishtirokchilar e'tiboriga: reja bo'yicha soat 12:00 da qo'shimcha 2 ta yuqori balli topshiriq faollashtirildi.",
      time: '12:00, 10-Oktyabr',
      isUrgent: true,
    },
    {
      id: 'a2',
      title: "Fair-Play monitoring tizimi faol",
      content: "Bir xil IP yoki umumiy proxy orqali shubhali flag kiritish holatlari avtomatik tekshiruvdan o'tkazilmoqda.",
      time: '10:30, 10-Oktyabr',
    }
  ];

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge || !submittedFlag.trim()) return;

    setSubmissionStatus('loading');
    
    // Simulate real backend submission
    setTimeout(() => {
      if (submittedFlag.trim().toUpperCase().includes('FLAG{') || submittedFlag.trim().length > 6) {
        setSubmissionStatus('success');
        setSubmissionFeedback(`Tabriklaymiz! Flag to'g'ri. Jamoangizga +${selectedChallenge.points} ball qo'shildi.`);
        setChallenges((prev) =>
          prev.map((c) => (c.id === selectedChallenge.id ? { ...c, isSolved: true, solvesCount: c.solvesCount + 1 } : c))
        );
      } else {
        setSubmissionStatus('error');
        setSubmissionFeedback("Noto'g'ri flag! Iltimos, zaiflikni chuqurroq tahlil qiling yoki formatni tekshiring.");
      }
    }, 800);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg: ChatMsg = {
      id: Date.now().toString(),
      user: 'Siz (Toshkent RedTeam)',
      team: 'Toshkent RedTeam',
      text: newChatText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setNewChatText('');
  };

  return (
    <div className="min-h-screen bg-base pb-24">
      {/* Tournament Live Header */}
      <div className="border-b border-subtle bg-gradient-to-b from-[#111827] to-base py-8">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/tournaments" className="hover:text-primary transition-colors">Turnirlar</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary font-medium">{tournament.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                JONLI TURNIR
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                {tournament.format}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-primary tracking-tight">
                {tournament.title}
              </h1>
              <p className="text-secondary text-sm lg:text-base">
                O'zbekiston kiber-qalqoni uchun milliy chempionat. Qolgan vaqt: <strong className="text-accent-green font-mono">{tournament.timeLeft}</strong>
              </p>
            </div>

            {/* Current User Team Status Banner */}
            <div className="flex items-center gap-4 bg-card border border-emerald-500/30 p-4 rounded-xl shadow-lg">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-accent-green">
                <Crown className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-secondary">Jamoangiz: <strong className="text-primary">{tournament.userTeam}</strong></div>
                <div className="flex items-center gap-4 text-sm">
                  <span>Reyting: <strong className="text-accent-green">#{tournament.userRank}</strong></span>
                  <span>Ball: <strong className="text-primary">{tournament.userScore} XP</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-subtle">
            {[
              { key: 'CHALLENGES', label: 'Vazifalar (CTF)', count: challenges.length },
              { key: 'SCOREBOARD', label: 'Jonli Reyting', count: scoreboardData.length },
              { key: 'OVERVIEW', label: "Umumiy ma'lumot" },
              { key: 'ANNOUNCEMENTS', label: "E'lonlar", count: announcementsData.length },
              { key: 'CHAT', label: 'Jonli Chat', count: chatMessages.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-accent-green text-black shadow-lg shadow-emerald-500/10'
                    : 'text-secondary hover:text-primary hover:bg-card'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                    activeTab === tab.key ? 'bg-black/20 text-black' : 'bg-elevated text-secondary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area by Tab */}
      <div className="container mx-auto px-4 mt-8">
        {/* TAB 1: CHALLENGES */}
        {activeTab === 'CHALLENGES' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenges List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">Musobaqa Vazifalari</h3>
                <span className="text-xs text-secondary">
                  Yechilgan: <strong className="text-accent-green">{challenges.filter(c => c.isSolved).length}</strong> / {challenges.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((c) => {
                  const isSelected = selectedChallenge?.id === c.id;

                  return (
                    <Card
                      key={c.id}
                      onClick={() => {
                        setSelectedChallenge(c);
                        setSubmissionStatus('idle');
                        setSubmittedFlag('');
                      }}
                      className={`cursor-pointer transition-all duration-200 border-subtle hover:border-gray-600 ${
                        isSelected ? 'border-accent-green bg-[#131f1d]' : 'bg-card'
                      } ${c.isSolved ? 'border-l-4 border-l-accent-green' : ''}`}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-elevated text-blue-400 border border-subtle">
                            {c.category}
                          </span>
                          <span className="font-bold text-sm text-accent-green font-mono">
                            {c.points} XP
                          </span>
                        </div>
                        <CardTitle className="text-base font-bold text-primary mt-2">
                          {c.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between text-xs text-secondary mt-3">
                          <span>{c.solvesCount} ta yechim</span>
                          {c.isSolved ? (
                            <span className="inline-flex items-center gap-1 text-accent-green font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yechildi
                            </span>
                          ) : (
                            <span className="text-gray-400">Yechilmagan</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Selected Challenge Submission Workspace */}
            <div className="space-y-6">
              {selectedChallenge ? (
                <Card className="bg-card border-subtle sticky top-24">
                  <CardHeader className="border-b border-subtle pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-secondary uppercase">{selectedChallenge.category}</span>
                      <span className="font-bold text-accent-green text-sm">{selectedChallenge.points} XP</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-primary mt-1">
                      {selectedChallenge.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2">Tavsif</h4>
                      <p className="text-sm text-gray-300 leading-relaxed bg-elevated/50 p-3.5 rounded-lg border border-subtle">
                        {selectedChallenge.description}
                      </p>
                    </div>

                    {/* Target Application Link / Spawn */}
                    <div className="p-4 rounded-xl bg-[#0e1622] border border-blue-500/20 space-y-2">
                      <div className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        Target Infratuzilma
                      </div>
                      <p className="text-xs text-secondary">
                        Topshiriq uchun ajratilgan izolyatsiyalangan kiber-laboratoriya konteyneri:
                      </p>
                      <a
                        href="/targets/cyberbooks/index.html"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-accent-green hover:underline pt-1"
                      >
                        http://ctf-target-{selectedChallenge.id}.cybertrip.uz <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Flag Submission Form */}
                    <form onSubmit={handleFlagSubmit} className="space-y-3">
                      <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
                        Flag Tops Hirish (Format: FLAG&#123;...&#125;)
                      </label>
                      <div className="space-y-2">
                        <Input
                          placeholder="FLAG{cyber_..."
                          value={submittedFlag}
                          onChange={(e) => setSubmittedFlag(e.target.value)}
                          disabled={submissionStatus === 'loading' || selectedChallenge.isSolved}
                          className="font-mono text-sm bg-elevated border-subtle focus:border-accent-green"
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={submissionStatus === 'loading' || !submittedFlag.trim() || selectedChallenge.isSolved}
                          className="w-full justify-center gap-2"
                        >
                          <Flag className="w-4 h-4" />
                          {submissionStatus === 'loading' ? 'Tekshirilmoqda...' : selectedChallenge.isSolved ? 'Bu vazifa allaqachon yechilgan' : 'Flagni tekshirish'}
                        </Button>
                      </div>

                      {/* Status Feedback */}
                      {submissionStatus === 'success' && (
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-accent-green text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{submissionFeedback}</span>
                        </div>
                      )}
                      {submissionStatus === 'error' && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>{submissionFeedback}</span>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-8 rounded-xl border border-dashed border-subtle text-center text-secondary space-y-3">
                  <Flag className="w-8 h-8 mx-auto text-secondary/50" />
                  <p className="text-sm">Batafsil ma'lumot va flag topshirish uchun chap tomondan biron bir topshiriqni tanlang.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SCOREBOARD */}
        {activeTab === 'SCOREBOARD' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Jonli Musobaqa Reytingi (Live Scoreboard)
                </h3>
                <p className="text-sm text-secondary">
                  Natijalar har bir to'g'ri topshirilgan flagdan so'ng real vaqtda qayta hisoblanadi.
                </p>
              </div>
              <div className="text-xs font-mono text-secondary bg-elevated px-3 py-1.5 rounded border border-subtle">
                Oxirgi yangilanish: Bir necha soniya oldin
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-subtle bg-card">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-subtle bg-elevated/40 text-xs font-bold text-secondary uppercase tracking-wider">
                    <th className="py-3 px-4">O'rin</th>
                    <th className="py-3 px-4">Jamoa / Ishtirokchi</th>
                    <th className="py-3 px-4 text-center">Yechilgan vazifalar</th>
                    <th className="py-3 px-4">Oxirgi Yechim</th>
                    <th className="py-3 px-4 text-right">Umumiy Ball</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle">
                  {scoreboardData.map((row) => {
                    const isUserTeam = row.name.includes('Siz');
                    return (
                      <tr 
                        key={row.rank} 
                        className={`transition-colors ${isUserTeam ? 'bg-emerald-500/10 font-medium' : 'hover:bg-elevated/30'}`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold">
                          {row.rank === 1 && <span className="text-yellow-400">🥇 #1</span>}
                          {row.rank === 2 && <span className="text-gray-300">🥈 #2</span>}
                          {row.rank === 3 && <span className="text-amber-600">🥉 #3</span>}
                          {row.rank > 3 && <span className="text-secondary">#{row.rank}</span>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-semibold ${isUserTeam ? 'text-accent-green' : 'text-primary'}`}>
                            {row.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-secondary">
                          {row.solves} ta
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-secondary">
                          {row.lastSolve}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-accent-green text-base">
                          {row.score} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl bg-card border border-subtle p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">Musobaqa Formati va Maqsadi</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Toshkent Kiber Qalqon CTF — O'zbekistonning barcha talabalari, amaliyotchi xakerlari va axborot xavfsizligi mutaxassislari uchun mo'ljallangan eng yirik amaliy kiberxavfsizlik bellashuvidir.
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  Musobaqa Jeopardy formatida o'tkazilib, qatnashchilarga Web zaifliklar, Pwn (binary exploitation), Forensics, Cryptography va Reverse Engineering yo'nalishlarida real zaif tizimlar taqdim etiladi.
                </p>
              </div>

              <div className="rounded-xl bg-card border border-subtle p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">Mukofotlar va Sovrin Jamg'armasi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <span className="text-2xl">🥇</span>
                    <h5 className="font-bold text-yellow-400 mt-1">1-O'rin</h5>
                    <p className="text-lg font-extrabold text-primary mt-1">8,000,000 UZS</p>
                    <span className="text-xs text-secondary block mt-1">+ CyberTrip Gold Diplomi</span>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-400/10 border border-gray-400/30">
                    <span className="text-2xl">🥈</span>
                    <h5 className="font-bold text-gray-300 mt-1">2-O'rin</h5>
                    <p className="text-lg font-extrabold text-primary mt-1">4,500,000 UZS</p>
                    <span className="text-xs text-secondary block mt-1">+ CyberTrip Silver Diplomi</span>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-700/10 border border-amber-700/30">
                    <span className="text-2xl">🥉</span>
                    <h5 className="font-bold text-amber-500 mt-1">3-O'rin</h5>
                    <p className="text-lg font-extrabold text-primary mt-1">2,500,000 UZS</p>
                    <span className="text-xs text-secondary block mt-1">+ CyberTrip Bronze Diplomi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-card border border-subtle p-6 space-y-4">
                <h4 className="text-base font-bold text-primary">Jadval va Muddat</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-secondary block">Boshlanish vaqti</span>
                    <strong className="text-primary">{tournament.startDate}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-secondary block">Tugash vaqti</span>
                    <strong className="text-primary">{tournament.endDate}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-secondary block">Sovrin fondi</span>
                    <strong className="text-accent-green">{tournament.prizePool}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeTab === 'ANNOUNCEMENTS' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {announcementsData.map((ann) => (
              <div
                key={ann.id}
                className={`p-6 rounded-xl border ${
                  ann.isUrgent ? 'border-amber-500/40 bg-[#1f1a14]' : 'border-subtle bg-card'
                } space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-primary flex items-center gap-2">
                    {ann.isUrgent && <AlertCircle className="w-4 h-4 text-amber-400" />}
                    {ann.title}
                  </h4>
                  <span className="text-xs font-mono text-secondary">{ann.time}</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: LIVE CHAT */}
        {activeTab === 'CHAT' && (
          <div className="max-w-3xl mx-auto rounded-xl border border-subtle bg-card flex flex-col h-[600px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-subtle bg-elevated/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent-green" />
                <span className="font-bold text-primary text-sm">Turnir Jonli Muloqot Kanali</span>
              </div>
              <span className="text-xs text-secondary">Anti-Spam faol (5 sek limit)</span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-semibold ${msg.isOrg ? 'text-yellow-400 font-bold' : 'text-accent-green'}`}>
                      {msg.user}
                    </span>
                    {msg.team && (
                      <span className="text-[10px] text-secondary font-mono bg-elevated px-1.5 py-0.5 rounded">
                        [{msg.team}]
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500 ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-200 bg-elevated/40 p-2.5 rounded-lg border border-subtle">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-subtle bg-elevated/20 flex gap-2">
              <Input
                placeholder="Xabar yozing (savollar, murojaatlar)..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                className="bg-elevated border-subtle text-sm focus:border-accent-green"
              />
              <Button type="submit" variant="primary" disabled={!newChatText.trim()} className="gap-2">
                <Send className="w-4 h-4" />
                <span>Yuborish</span>
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
