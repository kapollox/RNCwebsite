'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { href: '/parca-listesi', label: t('nav_parts') },
    { href: '/hakkimizda', label: t('nav_about') },
    { href: '/iletisim', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center bg-black rounded-sm px-2 py-1"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/logo/rnc-motor-logo.png"
              alt="RNC Motor"
              width={160}
              height={44}
              className="h-8 md:h-10 w-auto"
              priority
            />
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

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+905462096969"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-150"
            >
              <Phone size={15} />
              <span className="font-medium">0 (546) 209 69 69</span>
            </a>
            <a
              href="https://wa.me/905462096969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-sm hover:bg-accent-dark transition-colors duration-150"
            >
              {t('nav_whatsapp')}
            </a>
            {/* Language toggle */}
            <div className="flex items-center border border-border rounded-sm overflow-hidden">
              <button
                onClick={() => setLocale('tr')}
                className={cn(
                  'px-2.5 py-1 text-xs font-bold tracking-wide transition-colors duration-150',
                  locale === 'tr' ? 'bg-primary text-white' : 'text-text-muted hover:text-primary'
                )}
              >
                TR
              </button>
              <div className="w-px h-4 bg-border" />
              <button
                onClick={() => setLocale('en')}
                className={cn(
                  'px-2.5 py-1 text-xs font-bold tracking-wide transition-colors duration-150',
                  locale === 'en' ? 'bg-primary text-white' : 'text-text-muted hover:text-primary'
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t('nav_menu_close') : t('nav_menu_open')}
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
                href="tel:+905462096969"
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-muted"
              >
                <Phone size={15} />
                0 (546) 209 69 69
              </a>
              <a
                href="https://wa.me/905462096969"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white text-sm font-semibold rounded-sm hover:bg-accent-dark transition-colors"
              >
                {t('nav_whatsapp_mobile')}
              </a>
              {/* Mobile language toggle */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={() => setLocale('tr')}
                  className={cn(
                    'px-4 py-2 text-xs font-bold rounded-sm border transition-colors duration-150',
                    locale === 'tr'
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-text-muted hover:text-primary'
                  )}
                >
                  TR
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={cn(
                    'px-4 py-2 text-xs font-bold rounded-sm border transition-colors duration-150',
                    locale === 'en'
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-text-muted hover:text-primary'
                  )}
                >
                  EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
