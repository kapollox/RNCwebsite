'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, Fragment } from 'react';
import { Menu, X, Phone, ShoppingCart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const { totalCount } = useCart();

  const navLinks = [
    { href: '/',              label: t('footer_link_home') },
    { href: '/parca-listesi', label: t('nav_parts') },
    { href: '/markalar',      label: t('nav_brands') },
    { href: '/hakkimizda',    label: t('nav_about') },
    { href: '/iletisim',      label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8ecf0] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="container-main">
        <div className="flex items-center justify-between h-[60px] md:h-[68px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-85 transition-opacity"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/logo/rnc-ana-logo.png"
              alt="RNC Motor"
              width={140}
              height={48}
              className="h-9 md:h-10 w-auto mix-blend-multiply"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[13px] font-semibold tracking-wide transition-colors duration-150 relative py-1',
                    isActive
                      ? 'text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:rounded-full'
                      : 'text-[#4a5568] hover:text-[#1a1a1a]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Sepet */}
            <Link
              href="/sepet"
              className="relative p-2 text-[#64748b] hover:text-[#1a1a1a] transition-colors"
            >
              <ShoppingCart size={19} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 flex items-center justify-center bg-accent text-white text-[9px] font-bold rounded-full leading-none">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>

            {/* Telefon */}
            <a
              href="tel:+905462096969"
              className="flex items-center gap-1.5 text-[13px] text-[#64748b] hover:text-[#1a1a1a] transition-colors px-2"
            >
              <Phone size={14} />
              <span className="font-medium">0 (546) 209 69 69</span>
            </a>

            {/* Dil toggle */}
            <div className="flex items-center border border-[#e2e8f0] rounded-[3px] overflow-hidden">
              {(['tr', 'en'] as const).map((lang, i) => (
                <Fragment key={lang}>
                  {i > 0 && <div className="w-px h-4 bg-[#e2e8f0]" />}
                  <button
                    onClick={() => setLocale(lang)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors duration-150',
                      locale === lang
                        ? 'bg-[#1a1a1a] text-white'
                        : 'text-[#64748b] hover:text-[#1a1a1a]'
                    )}
                  >
                    {lang.toUpperCase()}
                  </button>
                </Fragment>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/905462096969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-[13px] font-bold rounded-[3px] hover:bg-[#20bc5a] active:scale-[0.98] transition-all duration-150 shadow-sm shadow-[#25D366]/25"
            >
              <MessageCircle size={14} />
              {t('nav_whatsapp')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#1a1a1a] hover:text-accent transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t('nav_menu_close') : t('nav_menu_open')}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menü */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e8ecf0] shadow-lg">
          <nav className="container-main py-3 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-3.5 rounded-[3px] text-[14px] font-semibold tracking-wide transition-colors duration-150 border-b border-[#f1f5f9] last:border-0',
                    isActive ? 'text-accent' : 'text-[#1a1a1a] hover:text-accent'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-1 border-t border-[#e8ecf0] flex flex-col gap-2">
              <Link
                href="/sepet"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-[3px] text-[14px] font-semibold text-[#1a1a1a] hover:bg-[#f8fafc] transition-colors"
              >
                <span className="flex items-center gap-2"><ShoppingCart size={16} />{t('nav_cart')}</span>
                {totalCount > 0 && (
                  <span className="px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full">{totalCount}</span>
                )}
              </Link>
              <a
                href="tel:+905462096969"
                className="flex items-center gap-2 px-3 py-2.5 text-[14px] text-[#64748b]"
              >
                <Phone size={14} />0 (546) 209 69 69
              </a>
              <a
                href="https://wa.me/905462096969"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] text-white text-[14px] font-bold rounded-[3px] hover:bg-[#20bc5a] transition-colors"
              >
                <MessageCircle size={16} />
                {t('nav_whatsapp_mobile')}
              </a>
              <div className="flex items-center justify-center gap-2 pt-1">
                {(['tr', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    className={cn(
                      'px-5 py-2 text-[12px] font-bold rounded-[3px] border transition-colors duration-150',
                      locale === lang
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                        : 'border-[#e2e8f0] text-[#64748b] hover:text-[#1a1a1a]'
                    )}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
