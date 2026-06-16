'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Plus, LogOut, FolderTree, FileSpreadsheet, Loader2, ClipboardList } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }

    const supabase = createSupabaseBrowser();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setUserEmail(session.user.email ?? '');
        setChecking(false);
      }
    });

    // Token yenilenince veya oturum kapanınca tepki ver
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.replace('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-muted">
        <Loader2 size={22} className="animate-spin text-text-subtle" />
      </div>
    );
  }

  const logout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const navLinks = [
    { href: '/admin',            label: 'Ürünler',      icon: <LayoutDashboard size={15} /> },
    { href: '/admin/urun-ekle',  label: 'Ürün Ekle',    icon: <Plus size={15} /> },
    { href: '/admin/kategoriler',label: 'Kategoriler',   icon: <FolderTree size={15} /> },
    { href: '/admin/toplu-yukle',label: 'Toplu Yükle',   icon: <FileSpreadsheet size={15} /> },
    { href: '/admin/loglar',     label: 'İşlem Logları', icon: <ClipboardList size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-surface-muted flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary shrink-0 flex flex-col">
        <div className="px-4 py-4 border-b border-white/10">
          <div className="bg-white rounded-[3px] px-2.5 py-1 inline-flex items-center">
            <Image
              src="/images/logo/rnc-ana-logo.png"
              alt="RNC Motor"
              width={96}
              height={32}
              className="h-[24px] w-auto"
            />
          </div>
          <p className="text-white/40 text-[10px] font-mono tracking-wider mt-2">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
                pathname === href
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-white/10">
          {userEmail && (
            <p className="text-white/30 text-[10px] font-mono truncate mb-2 px-1">{userEmail}</p>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors w-full"
          >
            <LogOut size={15} />
            Çıkış
          </button>
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
