'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Users, 
  Calendar, 
  ArrowRight, 
  Copy, 
  Check, 
  UserPlus, 
  ShieldCheck, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface UserTournament {
  id: string;
  tournamentId: string;
  tournamentTitle: string;
  status: 'ONGOING' | 'UPCOMING' | 'CONCLUDED';
  format: 'TEAM' | 'INDIVIDUAL';
  teamName?: string;
  isCaptain?: boolean;
  inviteCode?: string;
  teammates?: string[];
  userScore: number;
  userRank: number;
  totalParticipants: number;
  dates: string;
  hasCertificate?: boolean;
  certificateId?: string;
}

export default function MyTournamentsPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const myTournaments: UserTournament[] = [
    {
      id: 'reg-01',
      tournamentId: 'cyber-shield-2026',
      tournamentTitle: 'Toshkent Kiber Qalqon CTF 2026',
      status: 'ONGOING',
      format: 'TEAM',
      teamName: 'Toshkent RedTeam',
      isCaptain: true,
      inviteCode: 'TRT-9842-CYBER',
      teammates: ['Siz (Kapitan)', 'Javohir_Sec', 'Anvar_Pwn', 'Malika_Crypto'],
      userScore: 850,
      userRank: 4,
      totalParticipants: 142,
      dates: '10 Oktyabr 2026 — 12 Oktyabr 2026',
    },
    {
      id: 'reg-02',
      tournamentId: 'web-pentest-cup-2026',
      tournamentTitle: 'Web Pentest Master Cup 2026',
      status: 'UPCOMING',
      format: 'INDIVIDUAL',
      userScore: 0,
      userRank: 0,
      totalParticipants: 88,
      dates: '25 Oktyabr 2026',
    },
    {
      id: 'reg-03',
      tournamentId: 'spring-ctf-open-2026',
      tournamentTitle: 'CyberTrip Spring Open CTF',
      status: 'CONCLUDED',
      format: 'INDIVIDUAL',
      userScore: 1250,
      userRank: 8,
      totalParticipants: 310,
      dates: '01 May 2026 — 02 May 2026',
      hasCertificate: true,
      certificateId: 'CT-2026-CERT-001',
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-base pb-24">
      {/* Header */}
      <div className="border-b border-subtle bg-gradient-to-b from-[#111827] to-base py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                ISHTIROKCHI KABINETI
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                Mening <span className="text-accent-green">Turnirlarim</span>
              </h1>
              <p className="text-secondary text-sm lg:text-base mt-1">
                Siz ro'yxatdan o'tgan musobaqalar, jamoa a'zolari va erishilgan natijalar boshqaruvi.
              </p>
            </div>

            <Link href="/tournaments">
              <Button variant="primary" className="gap-2">
                Barcha turnirlar <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 space-y-8">
        {/* Active & Registered Tournaments */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-green" />
            Faol va Kelgusi Turnirlar
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myTournaments
              .filter((t) => t.status !== 'CONCLUDED')
              .map((t) => (
                <Card key={t.id} className="bg-card border-subtle hover:border-gray-600 transition-all">
                  <CardHeader className="pb-3 border-b border-subtle">
                    <div className="flex items-center justify-between">
                      {t.status === 'ONGOING' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          HOZIR JONLI
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          <Clock className="w-3.5 h-3.5" />
                          RO'YXATDAN O'TILGAN
                        </span>
                      )}

                      <span className="text-xs font-mono text-secondary bg-elevated px-2 py-0.5 rounded">
                        {t.format === 'TEAM' ? 'Jamoaviy' : 'Individual'}
                      </span>
                    </div>

                    <CardTitle className="text-xl font-bold text-primary mt-2">
                      {t.tournamentTitle}
                    </CardTitle>
                    <p className="text-xs text-secondary">{t.dates}</p>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Performance metrics if ongoing */}
                    {t.status === 'ONGOING' && (
                      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-elevated/40 border border-subtle text-center">
                        <div>
                          <span className="text-[11px] text-secondary uppercase block">Reyting</span>
                          <span className="text-lg font-bold text-accent-green">#{t.userRank}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-secondary uppercase block">Ball</span>
                          <span className="text-lg font-bold text-primary">{t.userScore} XP</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-secondary uppercase block">Jamoalar</span>
                          <span className="text-lg font-bold text-secondary">{t.totalParticipants}</span>
                        </div>
                      </div>
                    )}

                    {/* Team Details if Team Format */}
                    {t.format === 'TEAM' && t.teamName && (
                      <div className="p-4 rounded-xl bg-elevated/30 border border-subtle space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-400" />
                            <span className="font-semibold text-sm text-primary">{t.teamName}</span>
                            {t.isCaptain && (
                              <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30">
                                Kapitansiz
                              </span>
                            )}
                          </div>
                        </div>

                        {t.inviteCode && (
                          <div className="flex items-center justify-between bg-base p-2.5 rounded-lg border border-subtle text-xs">
                            <span className="text-secondary">Taklif kodi: <strong className="font-mono text-primary">{t.inviteCode}</strong></span>
                            <button
                              onClick={() => handleCopyCode(t.inviteCode!)}
                              className="text-accent-green hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              {copiedCode ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedCode ? "Nusxalandi" : "Nusxalash"}
                            </button>
                          </div>
                        )}

                        {t.teammates && (
                          <div className="space-y-1 pt-1">
                            <span className="text-xs text-secondary block font-medium">Jamoa a'zolari:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {t.teammates.map((mate, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-elevated text-xs font-mono text-gray-300 border border-subtle">
                                  {mate}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2">
                      <Link href={`/tournaments/${t.tournamentId}`}>
                        <Button variant="primary" className="w-full justify-center gap-2">
                          Turnir maydoniga kirish <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Tournament History & Certificates */}
        <div className="space-y-6 pt-6 border-t border-subtle">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            O'tgan Turnirlar va Yutuqlar Arxivi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTournaments
              .filter((t) => t.status === 'CONCLUDED')
              .map((t) => (
                <Card key={t.id} className="bg-card border-subtle flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>Yakunlangan</span>
                      <span>{t.dates}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-primary mt-2">
                      {t.tournamentTitle}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-elevated/40 text-sm">
                      <span className="text-secondary">Egallangan o'rin:</span>
                      <strong className="text-accent-green font-mono font-bold text-base">#{t.userRank} / {t.totalParticipants}</strong>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-elevated/40 text-sm">
                      <span className="text-secondary">To'plangan ball:</span>
                      <strong className="text-primary font-mono font-bold">{t.userScore} XP</strong>
                    </div>

                    {t.hasCertificate && t.certificateId && (
                      <Link href={`/verify/${t.certificateId}`} className="block">
                        <Button variant="outline" className="w-full justify-center gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                          <ShieldCheck className="w-4 h-4" />
                          Sertifikatni ko'rish (PDF)
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
