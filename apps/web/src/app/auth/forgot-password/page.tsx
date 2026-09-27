'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Mail, ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await fetchApi('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      setSubmitted(true);
    } catch {
      // Graceful fallback for security — always inform user email was sent
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0B0F17] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden animate-page-enter">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-2">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-white">Parolni Qayta Tiklash</h1>
        <p className="text-xs text-gray-400">
          Akkauntingizga bog&apos;langan email manzilini kiriting
        </p>
      </div>

      {submitted ? (
        <div className="space-y-5 py-4 text-center">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Xat muvaffaqiyatli yuborildi!</h3>
            <p className="text-xs text-gray-400">
              <strong className="text-cyan-400">{email}</strong> manziliga parolni qayta tiklash bo&apos;yicha yo&apos;riqnoma jo&apos;natildi.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kirish sahifasiga qaytish</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Yuborilmoqda...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Tiklash Havolasini Yuborish</span>
              </>
            )}
          </button>

          <div className="text-center pt-2 border-t border-gray-800 text-xs text-gray-400">
            <Link href="/auth/login" className="hover:text-cyan-400 transition-colors inline-flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kirishga qaytish</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
