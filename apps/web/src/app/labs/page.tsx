import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LabsPage() {
  const labs = [
    { slug: 'sql-injection-101', title: 'SQL Injection 101', cat: 'WEB', diff: 'BEGINNER', time: '30 min', xp: 50 },
    { slug: 'xss-stored', title: 'Stored XSS orqali Cookie o\'g\'irlash', cat: 'WEB', diff: 'INTERMEDIATE', time: '45 min', xp: 100 },
    { slug: 'nmap-scan', title: 'Nmap orqali tarmoqni skanerlash', cat: 'NETWORK', diff: 'BEGINNER', time: '20 min', xp: 40 },
    { slug: 'buffer-overflow', title: 'Buffer Overflow Asoslari', cat: 'REVERSE', diff: 'ADVANCED', time: '2 soat', xp: 200 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Toifalar</h3>
          <div className="space-y-2">
            {['Barchasi', 'Web Xavfsizligi', 'Tarmoq', 'Kriptografiya', 'Forenzika'].map(t => (
              <label key={t} className="flex items-center gap-2 text-sm text-secondary hover:text-primary">
                <input type="checkbox" className="rounded border-subtle bg-elevated" /> {t}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Qiyinchilik</h3>
          <div className="space-y-2">
            {['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'].map(d => (
              <label key={d} className="flex items-center gap-2 text-sm text-secondary hover:text-primary">
                <input type="checkbox" className="rounded border-subtle bg-elevated" /> <Badge difficulty={d as any} className="scale-75 origin-left">{d}</Badge>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Amaliy Laboratoriyalar</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {labs.map(lab => (
            <Card key={lab.slug} className="flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">{lab.cat}</Badge>
                  <Badge difficulty={lab.diff as any}>{lab.diff}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{lab.title}</h3>
                <div className="flex gap-4 text-xs text-secondary mb-6 mt-auto">
                  <span>⏱ {lab.time}</span>
                  <span className="text-accent-green">⭐ {lab.xp} XP</span>
                </div>
                <Link href={`/labs/${lab.slug}`}>
                  <Button className="w-full">Boshlash</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
