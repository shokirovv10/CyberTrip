'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement login POST /api/auth/login
  };

  return (
    <Card className="w-full shadow-2xl border-subtle">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Tizimga kirish</CardTitle>
        <p className="text-secondary text-sm mt-2">Akkauntingizga kiring va o'rganishni davom ettiring</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Email</label>
            <Input type="email" placeholder="Sizning emailingiz" required />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-primary">Parol</label>
              <Link href="/auth/forgot" className="text-xs text-accent-blue hover:underline">Parolni unutdingizmi?</Link>
            </div>
            <Input type="password" placeholder="Parolingiz" required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded border-subtle bg-elevated text-accent-green focus:ring-accent-green" />
            <label htmlFor="remember" className="text-sm text-secondary">Meni eslab qol</label>
          </div>
          <Button type="submit" className="w-full mt-4">Kirish</Button>
        </form>
        <div className="mt-6 text-center text-sm text-secondary">
          Akkauntingiz yo'qmi? <Link href="/auth/register" className="text-accent-blue hover:underline">Ro'yxatdan o'tish</Link>
        </div>
      </CardContent>
    </Card>
  );
}
