import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Award, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Xush kelibsiz, Hacker!</h1>
        <p className="text-secondary">Sizning kiberxavfsizlik bo'yicha joriy statistikangiz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Jami XP" value="1,250" icon={<Zap className="text-yellow-500" />} />
        <StatCard title="Tugallangan Lablar" value="12" icon={<Target className="text-accent-green" />} />
        <StatCard title="Olingan Yutuqlar" value="5" icon={<Award className="text-accent-purple" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Joriy O'rganish</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold text-primary">Web Pentest Asoslari</h3>
              <p className="text-sm text-secondary mb-3">Modul 2: SQL Injection</p>
              <ProgressBar progress={45} showLabel />
            </div>
            <Link href="/learn/web-pentest/sql-injection"><Button className="w-full">Davom etish</Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tavsiya Etilgan Laboratoriyalar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'XSS Asoslari', xp: 50 },
              { title: 'Nmap Scanning', xp: 40 },
            ].map((lab, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-elevated rounded-lg border border-subtle">
                <div>
                  <div className="font-medium">{lab.title}</div>
                  <div className="text-xs text-accent-green">+{lab.xp} XP</div>
                </div>
                <Button variant="outline" size="sm">Boshlash</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
