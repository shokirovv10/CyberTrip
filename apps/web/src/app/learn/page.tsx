import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Globe, Terminal, Shield, Lock, Search, Activity } from 'lucide-react';

export default function LearnPage() {
  const paths = [
    { slug: 'web-pentest', title: 'Web Pentest', desc: 'Veb ilovalarni zaifliklarga tekshirishni o\'rganing', icon: <Globe className="w-6 h-6 text-blue-500" />, courses: 4, diff: 'INTERMEDIATE' },
    { slug: 'linux', title: 'Linux Vaqti', desc: 'Xakerlarning asosiy operatsion tizimi bilan tanishuv', icon: <Terminal className="w-6 h-6 text-yellow-500" />, courses: 3, diff: 'BEGINNER' },
    { slug: 'network', title: 'Tarmoq Xavfsizligi', desc: 'Tarmoqlar qanday ishlashi va ularni himoyalash', icon: <Activity className="w-6 h-6 text-green-500" />, courses: 5, diff: 'BEGINNER' },
    { slug: 'crypto', title: 'Kriptografiya', desc: 'Ma\'lumotlarni shifrlash sirlari', icon: <Lock className="w-6 h-6 text-purple-500" />, courses: 2, diff: 'ADVANCED' },
    { slug: 'soc', title: 'SOC / Blue Team', desc: 'Hujumlarni aniqlash va ularga qarshi kurashish', icon: <Shield className="w-6 h-6 text-indigo-500" />, courses: 6, diff: 'INTERMEDIATE' },
    { slug: 'osint', title: 'OSINT', desc: 'Ochiq manbalardan ma\'lumot to\'plash', icon: <Search className="w-6 h-6 text-teal-500" />, courses: 2, diff: 'BEGINNER' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">O'rganish Yo'laklari</h1>
        <p className="text-secondary text-lg">O'zingizga qiziq bo'lgan yo'nalishni tanlang va bosqichma-bosqich o'rganib, amaliyotda sinab ko'ring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map(path => (
          <Link key={path.slug} href={`/learn/${path.slug}`}>
            <Card className="h-full hover:border-gray-600 transition-colors group">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="p-3 bg-elevated rounded-lg group-hover:scale-110 transition-transform">{path.icon}</div>
                <Badge difficulty={path.diff as any}>{path.diff}</Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 group-hover:text-accent-blue transition-colors">{path.title}</CardTitle>
                <p className="text-secondary text-sm mb-4 line-clamp-2">{path.desc}</p>
                <div className="text-xs font-medium text-primary">{path.courses} ta kurs</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
