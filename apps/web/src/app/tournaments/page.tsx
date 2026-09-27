'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Clock, 
  ShieldAlert, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Award,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Tournament {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: 'ONGOING' | 'REGISTRATION_OPEN' | 'UPCOMING' | 'CONCLUDED';
  format: 'INDIVIDUAL' | 'TEAM';
  prizePool: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  maxParticipants?: number;
  challengesCount: number;
  categories: string[];
  isFeatured?: boolean;
}

const TOURNAMENTS_DATA: Tournament[] = [
  {
    id: 'cyber-shield-2026',
    slug: 'toshkent-kiber-qalqon-2026',
    title: 'Toshkent Kiber Qalqon CTF 2026',
    description: "O'zbekistonning eng yirik milliy kiberxavfsizlik turniri. Web pentest, reverse engineering va tarmoq xavfsizligi bo'yicha amaliy topshiriqlar.",
    status: 'ONGOING',
    format: 'TEAM',
    prizePool: "15,000,000 so'm",
    startDate: '2026-10-10 10:00',
    endDate: '2026-10-12 22:00',
    participantsCount: 142,
    maxParticipants: 200,
    challengesCount: 18,
    categories: ['Web', 'Crypto', 'Pwn', 'Forensics', 'Reverse'],
    isFeatured: true,
  },
  {
    id: 'web-pentest-cup-2026',
    slug: 'web-pentest-cup-2026',
    title: 'Web Pentest Master Cup',
    description: "Faqatgina murakkab Web xavfsizlik zaifliklari (SQLi, SSRF, IDOR, Race Condition, JWT exploitlari) bo'yicha maxsus individual chempionat.",
    status: 'REGISTRATION_OPEN',
    format: 'INDIVIDUAL',
    prizePool: "7,500,000 so'm",
    startDate: '2026-10-25 14:00',
    endDate: '2026-10-26 20:00',
    participantsCount: 88,
    maxParticipants: 150,
    challengesCount: 12,
    categories: ['Web Pentest', 'API Security', 'OAuth2'],
  },
  {
    id: 'blue-team-defense-league',
    slug: 'blue-team-defense-league',
    title: 'SOC & Blue Team Mudofaa Ligasi',
    description: "Hujumlarni aniqlash, SIEM tizimlarida tahlil qilish, insidentlarni bartaraf etish va threat hunting bo'yicha real stsenariylar.",
    status: 'UPCOMING',
    format: 'TEAM',
    prizePool: "10,000,000 so'm",
    startDate: '2026-11-14 09:00',
    endDate: '2026-11-15 18:00',
    participantsCount: 45,
    challengesCount: 10,
    categories: ['SOC', 'Log Analysis', 'Incident Response'],
  },
  {
    id: 'spring-ctf-open-2026',
    slug: 'spring-ctf-open-2026',
    title: 'CyberTrip Spring Open CTF',
    description: "Bahorgi ochiq CTF musobaqasi. Barcha darajadagi ishtirokchilar uchun mo'ljallangan Jeopardy uslubidagi kiber bellashuv.",
    status: 'CONCLUDED',
    format: 'INDIVIDUAL',
    prizePool: "5,000,000 so'm",
    startDate: '2026-05-01 10:00',
    endDate: '2026-05-02 22:00',
    participantsCount: 310,
    challengesCount: 20,
    categories: ['Web', 'Linux', 'Stego', 'Misc'],
  },
  {
    id: 'bug-bounty-cup-uz',
    slug: 'bug-bounty-cup-uz',
    title: "O'zbekiston Bug Bounty Qahramonlari",
    description: "Haqiqiy target infratuzilmalarda 0-day va zaifliklarni topish hamda mas'uliyatli xabar berish bo'yicha sinov.",
    status: 'CONCLUDED',
    format: 'INDIVIDUAL',
    prizePool: "12,000,000 so'm",
    startDate: '2026-03-20 12:00',
    endDate: '2026-03-22 18:00',
    participantsCount: 240,
    challengesCount: 15,
    categories: ['Bug Bounty', 'Web', 'Mobile'],
  }
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState<'ALL' | 'ONGOING' | 'REGISTRATION_OPEN' | 'UPCOMING' | 'CONCLUDED'>('ALL');

  const filteredTournaments = TOURNAMENTS_DATA.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const featured = TOURNAMENTS_DATA.find((t) => t.isFeatured) || TOURNAMENTS_DATA[0];

  return (
    <div className="min-h-screen bg-base pb-24">
      {/* Top Banner & Title */}
      <div className="relative overflow-hidden border-b border-subtle bg-gradient-to-b from-[#0F172A] to-base py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                CYBERTRIP TOURNAMENT ARENA
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
                Kiberxavfsizlik <span className="text-accent-green">Turnirlari</span>
              </h1>
              <p className="text-secondary text-base lg:text-lg leading-relaxed">
                Real vaqt rejimida O'zbekiston va xalqaro mutaxassislar bilan bellashing. 
                Sovrinli o'rinlar, nufuzli reyting ballari va rasmiy kiberxavfsizlik sertifikatlarini qo'lga kiriting.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="#all-tournaments">
                  <Button variant="primary">
                    Turnirlarni ko'rish
                  </Button>
                </Link>
                <Link href="/my-tournaments">
                  <Button variant="outline" className="border-gray-700 hover:border-gray-500">
                    Mening turnirlarim
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="p-5 rounded-xl bg-card border border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-secondary uppercase font-semibold">Jami sovrinlar</span>
                </div>
                <div className="text-2xl font-bold text-primary">50+ mln UZS</div>
              </div>

              <div className="p-5 rounded-xl bg-card border border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-secondary uppercase font-semibold">Ishtirokchilar</span>
                </div>
                <div className="text-2xl font-bold text-primary">1,400+</div>
              </div>

              <div className="p-5 rounded-xl bg-card border border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-secondary uppercase font-semibold">Faol musobaqa</span>
                </div>
                <div className="text-2xl font-bold text-accent-green">Jonli efirda</div>
              </div>

              <div className="p-5 rounded-xl bg-card border border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-secondary uppercase font-semibold">Rasmiy diplom</span>
                </div>
                <div className="text-2xl font-bold text-primary">QR-Tasdiqli</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 space-y-12">
        {/* Featured Live/Major Tournament Spotlight */}
        {featured && (
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-[#111c1e] via-[#111827] to-[#1e1329] p-8 lg:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    HOZIR JONLI EFIRDA
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold">
                    {featured.format === 'TEAM' ? "Jamoaviy Format (2-4 kishi)" : "Shaxsiy Format"}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-semibold">
                    {featured.challengesCount} ta vazifalar
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                  {featured.title}
                </h2>
                <p className="text-secondary text-base leading-relaxed">
                  {featured.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-secondary">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Muddat: <strong className="text-primary">{featured.startDate} — {featured.endDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Qatnashchilar: <strong className="text-primary">{featured.participantsCount} jamoa</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Mukofot fondi: <strong className="text-accent-green text-base">{featured.prizePool}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
                <Link href={`/tournaments/${featured.id}`}>
                  <Button variant="primary" size="lg" className="w-full justify-center gap-2 text-base font-semibold shadow-lg shadow-emerald-500/20">
                    Turnirga kirish <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href={`/tournaments/${featured.id}#scoreboard`}>
                  <Button variant="outline" size="lg" className="w-full justify-center border-gray-700 hover:border-gray-500">
                    Jonli Natijalar (Live Scoreboard)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter Navigation */}
        <div id="all-tournaments" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-subtle">
          <div>
            <h3 className="text-2xl font-bold text-primary">Barcha Kiber Turnirlar</h3>
            <p className="text-sm text-secondary">Kelgusi musobaqalarga ro'yxatdan o'ting yoki o'tgan bellashuvlar arxividan foydalaning</p>
          </div>

          <div className="flex flex-wrap gap-2 p-1 bg-card rounded-lg border border-subtle">
            {(
              [
                { key: 'ALL', label: 'Barchasi' },
                { key: 'ONGOING', label: 'Jonli' },
                { key: 'REGISTRATION_OPEN', label: 'Ro\'yxatdan o\'tish ochiq' },
                { key: 'UPCOMING', label: 'Kelgusi' },
                { key: 'CONCLUDED', label: 'Tugallangan' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  filter === item.key
                    ? 'bg-accent-green text-black font-semibold shadow'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((t) => {
            const isOngoing = t.status === 'ONGOING';
            const isOpen = t.status === 'REGISTRATION_OPEN';
            const isUpcoming = t.status === 'UPCOMING';
            const isConcluded = t.status === 'CONCLUDED';

            return (
              <Card 
                key={t.id} 
                className="flex flex-col justify-between hover:border-gray-600 transition-all duration-300 group hover:-translate-y-1 bg-card border-subtle"
              >
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    {isOngoing && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        JONLI EFIRDA
                      </span>
                    )}
                    {isOpen && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        RO'YXAT OCHIQ
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Clock className="w-3 h-3" />
                        TEZ KUNDA
                      </span>
                    )}
                    {isConcluded && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
                        TUGALLANGAN
                      </span>
                    )}

                    <span className="text-xs font-medium text-secondary bg-elevated px-2 py-0.5 rounded border border-subtle">
                      {t.format === 'TEAM' ? 'Jamoa' : 'Yakka'}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold group-hover:text-accent-green transition-colors leading-snug">
                    {t.title}
                  </CardTitle>
                  <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 pt-2">
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {t.categories.map((cat, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-elevated text-gray-300 rounded text-[11px] font-mono border border-subtle">
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-subtle text-xs">
                    <div>
                      <span className="text-secondary block mb-0.5">Sovrin Fondi</span>
                      <span className="font-bold text-accent-green text-sm">{t.prizePool}</span>
                    </div>
                    <div>
                      <span className="text-secondary block mb-0.5">Ishtirokchilar</span>
                      <span className="font-bold text-primary text-sm">{t.participantsCount} qatnashchi</span>
                    </div>
                    <div>
                      <span className="text-secondary block mb-0.5">Boshlanish</span>
                      <span className="font-medium text-gray-300">{t.startDate}</span>
                    </div>
                    <div>
                      <span className="text-secondary block mb-0.5">Vazifalar soni</span>
                      <span className="font-medium text-gray-300">{t.challengesCount} ta lab/CTF</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1">
                    <Link href={`/tournaments/${t.id}`} className="block w-full">
                      <Button 
                        variant={isOngoing ? "primary" : isOpen ? "primary" : "outline"} 
                        className="w-full justify-center gap-2 text-sm font-semibold"
                      >
                        {isOngoing ? "Musobaqaga qo'shilish" : isOpen ? "Ro'yxatdan o'tish" : "Tafsilotlar"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tournament Rules & Fair Play Section */}
        <div className="rounded-2xl border border-subtle bg-card p-8 lg:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-primary">CyberTrip Musobaqa Qoidalari va Fair-Play</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2 p-5 rounded-xl bg-elevated/50 border border-subtle">
              <div className="font-semibold text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mustaqil Yechim
              </div>
              <p className="text-secondary leading-relaxed">
                Har bir ishtirokchi yoki jamoa bayroqlar (flags) va eksploitlarni mustaqil ravishda topishi shart. Yechimlarni begona shaxslar bilan almashish qat'iyan taqiqlanadi.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-elevated/50 border border-subtle">
              <div className="font-semibold text-primary flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                Infratuzilma Xavfsizligi
              </div>
              <p className="text-secondary leading-relaxed">
                Musobaqa platformasining o'ziga (scoreboard, server API, boshqa jamoalarning kompyuterlariga) DDoS yoki hujum qilish diskvalifikatsiyaga sabab bo'ladi.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-elevated/50 border border-subtle">
              <div className="font-semibold text-primary flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Rasmiy Sertifikat va Mukofot
              </div>
              <p className="text-secondary leading-relaxed">
                G'oliblar o'z yechimlari bo'yicha qisqacha Writeup (texnik hisobot) topshirgandan so'ng sovrinlar va O'zbekiston kiber-reyting ballari beriladi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
