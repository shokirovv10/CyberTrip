import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CTFPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-accent-purple">CTF Musobaqalar</h1>
        <p className="text-secondary text-lg">O'z mahoratingizni sinab ko'ring va reytingda yuqoriga ko'tariling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="md:col-span-2 border-accent-purple/30 bg-gradient-to-br from-card to-accent-purple/10">
          <CardContent className="p-8">
            <Badge className="bg-accent-purple/20 text-accent-purple border-accent-purple mb-4">Faol Musobaqa</Badge>
            <h2 className="text-3xl font-bold mb-2">Hacker's Quest 2024</h2>
            <p className="text-secondary mb-6">48 soatlik qiziqarli musobaqa. O'z jamoangiz bilan ishtirok eting va sovg'alarni yutib oling!</p>
            <div className="flex gap-4">
              <Link href="/ctf/events/quest-2024" className="px-6 py-2 bg-accent-purple text-white rounded-lg font-medium hover:bg-purple-600 transition-colors">Ishtirok etish</Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Ishtirokchilar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['1', '2', '3'].map((rank, i) => (
              <div key={rank} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-orange-600'}`}>#{rank}</span>
                  <span className="font-medium">hacker_{rank}</span>
                </div>
                <span className="text-accent-purple">{3000 - i * 500} pt</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <h3 className="text-2xl font-bold mb-6">Doimiy Mashqlar</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Web', 'Crypto', 'Forensics', 'Reverse', 'Pwn', 'Misc'].map(cat => (
          <Link key={cat} href={`/ctf/challenges?cat=${cat.toLowerCase()}`}>
            <Card className="hover:border-accent-purple transition-colors text-center py-6">
              <CardTitle>{cat}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
