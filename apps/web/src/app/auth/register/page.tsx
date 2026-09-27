'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement register POST /api/auth/register
  };

  return (
    <Card className="w-full shadow-2xl border-subtle">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Ro'yxatdan o'tish</CardTitle>
        <p className="text-secondary text-sm mt-2">Kiberxavfsizlik sayohatingizni boshlang</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Foydalanuvchi nomi</label>
            <Input type="text" placeholder="username" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Email</label>
            <Input type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Parol</label>
            <Input type="password" placeholder="Kamida 8 ta belgi" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Parolni tasdiqlash</label>
            <Input type="password" placeholder="Parolni takrorlang" required />
          </div>
          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" className="mt-1 rounded border-subtle bg-elevated text-accent-green focus:ring-accent-green" required />
            <label htmlFor="terms" className="text-sm text-secondary">
              Men <Link href="/terms" className="text-accent-blue hover:underline">Foydalanish shartlari</Link> va <Link href="/privacy" className="text-accent-blue hover:underline">Maxfiylik siyosatiga</Link> roziman
            </label>
          </div>
          <Button type="submit" className="w-full mt-4">Ro'yxatdan o'tish</Button>
        </form>
        <div className="mt-6 text-center text-sm text-secondary">
          Allaqachon akkauntingiz bormi? <Link href="/auth/login" className="text-accent-blue hover:underline">Kirish</Link>
        </div>
      </CardContent>
    </Card>
  );
}
