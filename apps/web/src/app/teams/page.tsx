'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  Search, 
  Trophy, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TeamItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  avatarUrl: string;
  isPrivate: boolean;
  membersCount: number;
  score: number;
  ownerName: string;
  tags: string[];
}

export default function TeamsCatalogPage() {
  const [search, setSearch] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [joinStatus, setJoinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [joinMsg, setJoinMsg] = useState('');

  const teams: TeamItem[] = [
    {
      id: 'team-01',
      slug: 'toshkent-redteam',
      name: 'Toshkent RedTeam',
      description: 'Web pentest va offensive kiberxavfsizlik bo\'yicha O\'zbekiston yetakchi jamoasi.',
      avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150',
      isPrivate: false,
      membersCount: 4,
      score: 1850,
      ownerName: 'CyberAdmin',
      tags: ['Web Pentest', 'Bug Bounty', 'Offensive'],
    },
    {
      id: 'team-02',
      slug: 'samarkand-zero-day',
      name: 'Samarkand ZeroDay Guild',
      description: 'Reverse engineering, binar eksploitatsiya va CTF pwn yo\'nalishiga ixtisoslashgan jamoa.',
      avatarUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150',
      isPrivate: false,
      membersCount: 3,
      score: 1420,
      ownerName: 'Rustam_RE',
      tags: ['Reverse', 'Pwn', 'Binary'],
    },
    {
      id: 'team-03',
      slug: 'fergana-blue-shields',
      name: 'Fergana Blue Shields',
      description: 'SOC tahlilchilari, incident response va tizim mudofaasi bo\'yicha birlashgan mutaxassislar.',
      avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
      isPrivate: false,
      membersCount: 5,
      score: 1290,
      ownerName: 'Sardor_SOC',
      tags: ['Blue Team', 'SOC', 'DFIR'],
    },
    {
      id: 'team-04',
      slug: 'bukhara-cyber-wolves',
      name: 'Bukhara Cyber Wolves',
      description: 'Kriptografiya va tarmoq auditi bo\'yicha ixtisoslashgan professional jamoa.',
      avatarUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126975?w=150',
      isPrivate: false,
      membersCount: 4,
      score: 1100,
      ownerName: 'Jasur_Crypto',
      tags: ['Crypto', 'Network', 'Audit'],
    },
  ];

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setJoinStatus('loading');
    setTimeout(() => {
      if (inviteCode.trim().length >= 4) {
        setJoinStatus('success');
        setJoinMsg(`Muvaffaqiyatli qo'shildingiz! Jamoa sahifasiga yo'naltirilmoqda...`);
      } else {
        setJoinStatus('error');
        setJoinMsg('Noto\'g\'ri taklif kodi. Qaytadan tekshiring.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-base pb-24">
      {/* Top Banner */}
      <div className="border-b border-subtle bg-gradient-to-b from-[#0F172A] to-base py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                CYBERTRIP JAMOALAR EKOTIZIMI
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
                Kiberxavfsizlik <span className="text-accent-green">Jamoalari</span>
              </h1>
              <p className="text-secondary text-base lg:text-lg leading-relaxed">
                Birgalikda o'rganing, CTF va turnirlarda bellashing, zaifliklarni tahlil qiling. 
                O'z jamoangizni tuzing yoki mavjud kiber-guruhlarga qo'shiling.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/teams/create">
                  <Button variant="primary" size="lg" className="gap-2 font-semibold shadow-lg shadow-emerald-500/20">
                    <Plus className="w-4 h-4" /> Jamoa yaratish
                  </Button>
                </Link>
                <Link href="/tournaments">
                  <Button variant="outline" size="lg" className="border-gray-700">
                    Turnirlar maydoni
                  </Button>
                </Link>
              </div>
            </div>

            {/* Join via Invite Code Card */}
            <div className="w-full lg:w-96 p-6 rounded-2xl bg-card border border-subtle shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <KeyRound className="w-4 h-4 text-accent-green" />
                <span>Taklif kodi orqali qo'shilish</span>
              </div>
              <p className="text-xs text-secondary">
                Agar jamoa sardori sizga maxsus kod bergan bo'lsa, uni quyiga kiriting:
              </p>

              <form onSubmit={handleJoinByCode} className="space-y-3">
                <Input
                  placeholder="TRT-9842-CYBER"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="font-mono text-sm bg-elevated border-subtle focus:border-accent-green uppercase"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={joinStatus === 'loading' || !inviteCode.trim()}
                  className="w-full justify-center text-xs"
                >
                  {joinStatus === 'loading' ? 'Tekshirilmoqda...' : 'Jamoaga qo\'shilish'}
                </Button>

                {joinStatus === 'success' && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-accent-green text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{joinMsg}</span>
                  </div>
                )}
                {joinStatus === 'error' && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{joinMsg}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 space-y-8">
        {/* Search & Statistics Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <Input
              placeholder="Jamoa nomi yoki yo'nalishi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-subtle text-sm"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-secondary">
            <span>Jami jamoalar: <strong className="text-primary">{teams.length}</strong></span>
            <span>Faol a'zolar: <strong className="text-accent-green">16 ta kiber mutaxassis</strong></span>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="bg-card border-subtle hover:border-gray-600 transition-all duration-200 flex flex-col justify-between group">
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-elevated border border-subtle overflow-hidden flex items-center justify-center font-bold text-accent-green text-lg">
                      {team.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold group-hover:text-accent-green transition-colors">
                        {team.name}
                      </CardTitle>
                      <span className="text-xs text-secondary">Sardor: <strong className="text-primary">{team.ownerName}</strong></span>
                    </div>
                  </div>

                  {team.isPrivate ? (
                    <span className="p-1 rounded bg-elevated text-secondary" title="Yopiq jamoa">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Ochiq
                    </span>
                  )}
                </div>

                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {team.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <div className="flex flex-wrap gap-1">
                  {team.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-elevated text-gray-300 border border-subtle">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-subtle text-xs">
                  <div>
                    <span className="text-secondary block mb-0.5">A'zolar</span>
                    <strong className="text-primary text-sm flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-accent-green" />
                      {team.membersCount} kishi
                    </strong>
                  </div>
                  <div>
                    <span className="text-secondary block mb-0.5">Musobaqa Bali</span>
                    <strong className="text-accent-green text-sm flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                      {team.score} XP
                    </strong>
                  </div>
                </div>

                <div className="pt-1">
                  <Link href={`/teams/${team.slug}`} className="block w-full">
                    <Button variant="outline" className="w-full justify-center gap-2 text-xs font-semibold group-hover:border-accent-green">
                      Jamoa profiliga o'tish <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
