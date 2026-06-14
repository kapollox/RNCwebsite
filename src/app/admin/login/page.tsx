'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === adminPassword) {
      sessionStorage.setItem('rnc-admin', '1');
      sessionStorage.setItem('rnc-admin-token', password);
      router.push('/admin');
    } else {
      setError('Şifre hatalı.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-surface border border-border rounded-sm p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-black rounded-sm px-3 py-1.5">
              <Image
                src="/images/logo/rnc-motor-logo.png"
                alt="RNC Motor"
                width={120}
                height={33}
                className="h-7 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
              <Lock size={14} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-primary text-base">Admin Girişi</h1>
              <p className="text-text-subtle text-xs">RNC Motor Yönetim Paneli</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresi"
                autoFocus
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {error && (
              <p className="text-accent text-xs font-semibold">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
