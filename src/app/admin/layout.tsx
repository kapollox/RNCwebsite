'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Plus, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const auth = sessionStorage.getItem('rnc-admin');
    if (!auth) router.push('/admin/login');
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  const logout = () => {
    sessionStorage.removeItem('rnc-admin');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface-muted flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary shrink-0 flex flex-col">
        <div className="px-4 py-4 border-b border-white/10">
          <div className="bg-black rounded-sm px-2 py-1 inline-flex">
            <Image
              src="/images/logo/rnc-motor-logo.png"
              alt="RNC Motor"
              width={100}
              height={28}
              className="h-6 w-auto"
            />
          </div>
          <p className="text-white/40 text-[10px] font-mono tracking-wider mt-2">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
              pathname === '/admin'
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard size={15} />
            Ürünler
          </Link>
          <Link
            href="/admin/urun-ekle"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
              pathname === '/admin/urun-ekle'
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Plus size={15} />
            Ürün Ekle
          </Link>
        </nav>

        <div className="px-2 py-4 border-t border-white/10">
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
