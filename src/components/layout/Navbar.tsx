'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/parca-listesi', label: 'Parça Listesi' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center justify-center w-8 h-8 bg-accent text-white font-display font-black text-sm rounded-sm select-none">
              R
            </span>
            <span className="font-display font-bold text-xl text-primary tracking-tight">
              NC Motor
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold tracking-wide transition-colors duration-150',
                    isActive
                      ? 'text-accent border-b-2 border-accent pb-0.5'
                      : 'text-text-muted hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right — Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+90XXXXXXXXXX"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-150"
            >
              <Phone size={15} />
              <span className="font-medium">0 (XXX) XXX XX XX</span>
            </a>
            <a
              href="https://wa.me/905XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-sm hover:bg-accent-dark transition-colors duration-150"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="container-main py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-3 rounded-sm text-sm font-semibold tracking-wide transition-colors duration-150',
                    isActive
                      ? 'text-accent bg-surface-muted'
                      : 'text-primary hover:bg-surface-muted'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
              <a
                href="tel:+90XXXXXXXXXX"
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-muted"
              >
                <Phone size={15} />
                0 (XXX) XXX XX XX
              </a>
              <a
                href="https://wa.me/905XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white text-sm font-semibold rounded-sm hover:bg-accent-dark transition-colors"
              >
                WhatsApp ile İletişim
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
