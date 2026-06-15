'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.session) {
      setError('E-posta veya şifre hatalı.');
      setLoading(false);
      return;
    }

    // Rol kontrolü
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
      await supabase.auth.signOut();
      setError('Bu hesabın admin paneline erişim yetkisi yok.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-surface border border-border rounded-sm p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-[4px] px-3 py-2 inline-flex items-center">
              <Image
                src="/images/logo/rnc-ana-logo.png"
                alt="RNC Motor"
                width={120}
                height={40}
                className="h-[28px] w-auto"
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
                E-posta
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rnc-motor.com"
                  autoFocus
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block">
                Şifre
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-accent text-xs font-semibold bg-rose-50 border border-rose-200 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
