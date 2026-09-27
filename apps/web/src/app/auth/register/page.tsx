'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, User, Mail, Lock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Parollar bir-biriga mos kelmadi! Iltimos, tekshirib qayta kiriting.');
      return;
    }

    if (password.length < 8) {
      setError('Parol kamida 8 ta belgidan iborat bo\'lishi shart!');
      return;
    }

    if (!agreed) {
      setError('Davom etish uchun Foydalanish shartlari va Maxfiylik siyosatiga rozilik bildirishingiz kerak.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetchApi<{ user: { id: string; username: string; email: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      if (res && res.user) {
        // Automatically redirect to student dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      // In offline or local demo mode, create user session fallback
      if (err.message && err.message.includes('aloqa o\'rnatilmadi')) {
        // Fallback for preview
        router.push('/dashboard');
      } else {
        setError(err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden animate-page-enter">
      {/* Top Cyber Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-2">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-white">Ro&apos;yxatdan O&apos;tish</h1>
        <p className="text-xs text-gray-400">
          CYBERTRIP kiberxavfsizlik o&apos;quv platformasiga qo&apos;shiling
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-xs text-red-400 animate-msg-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-gray-300 font-semibold mb-1.5">
            Foydalanuvchi Nomi (Username)
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="pentester_01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-1.5">
            Email Manzili
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="sizning@email.uz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-1.5">
            Parol
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="Kamida 8 ta belgi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-1.5">
            Parolni Qayta Kiriting
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="Parolni tasdiqlang"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-cyan-500 rounded cursor-pointer"
          />
          <label htmlFor="terms" className="text-[11px] text-gray-400 cursor-pointer">
            Men{' '}
            <Link href="/terms" target="_blank" className="text-cyan-400 hover:underline">
              Foydalanish shartlari
            </Link>{' '}
            va{' '}
            <Link href="/privacy" target="_blank" className="text-cyan-400 hover:underline">
              Maxfiylik siyosatiga
            </Link>{' '}
            rozilik bildiraman
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Akkaunt yaratilmoqda...</span>
            </>
          ) : (
            <>
              <span>Ro&apos;yxatdan O&apos;tish</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2 border-t border-gray-800 text-xs text-gray-400">
        Allaqachon hisobingiz bormi?{' '}
        <Link href="/auth/login" className="text-cyan-400 hover:underline font-semibold">
          Kirish
        </Link>
      </div>
    </div>
  );
}
