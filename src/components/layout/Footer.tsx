'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

const partLinkDefs: { href: string; key: TranslationKey }[] = [
  { href: '/parca-listesi/elektrik-grubu', key: 'footer_part_electrical' },
  { href: '/parca-listesi/fren-balata-grubu', key: 'footer_part_brake' },
  { href: '/parca-listesi/motor-aksami', key: 'footer_part_engine' },
  { href: '/parca-listesi/egzoz-grubu', key: 'footer_part_exhaust' },
  { href: '/parca-listesi/zincirler-ve-zincir-disli-setleri', key: 'footer_part_chain' },
  { href: '/parca-listesi/on-arka-teker-grubu', key: 'footer_part_wheel' },
];

export function Footer() {
  const { t } = useLanguage();

  const partLinks = partLinkDefs.map((d) => ({ href: d.href, label: t(d.key) }));

  const companyLinks = [
    { href: '/hakkimizda', label: t('footer_link_about') },
    { href: '/iletisim', label: t('footer_link_contact') },
    { href: '/', label: t('footer_link_home') },
  ];

  return (
    <footer className="bg-footer-bg text-footer-text">
      {/* Main footer grid */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center bg-black rounded-sm px-2 py-1 mb-4">
              <Image
                src="/images/logo/rnc-motor-logo.png"
                alt="RNC Motor"
                width={160}
                height={44}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {t('footer_brand_desc')}
            </p>
            <a
              href="https://wa.me/905462096969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors duration-150"
            >
              <MessageCircle size={16} />
              {t('footer_whatsapp')}
            </a>
          </div>

          {/* Parts column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              {t('footer_parts_title')}
            </h4>
            <ul className="space-y-2.5">
              {partLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              {t('footer_company_title')}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              {t('footer_contact_title')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>0 (546) 209 69 69</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>Şehitkamil / Gaziantep</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {t('footer_hours_weekday')}
                  <br />
                  {t('footer_hours_sunday')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-dark">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} RNC Motor. {t('footer_copyright')}</p>
          <p className="text-xs">{t('footer_tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
