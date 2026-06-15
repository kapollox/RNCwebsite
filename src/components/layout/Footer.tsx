'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

const partLinkDefs: { href: string; key: TranslationKey }[] = [
  { href: '/parca-listesi/elektrik-grubu',                  key: 'footer_part_electrical' },
  { href: '/parca-listesi/fren-balata-grubu',               key: 'footer_part_brake' },
  { href: '/parca-listesi/motor-aksami',                    key: 'footer_part_engine' },
  { href: '/parca-listesi/egzoz-grubu',                     key: 'footer_part_exhaust' },
  { href: '/parca-listesi/zincirler-ve-zincir-disli-setleri', key: 'footer_part_chain' },
  { href: '/parca-listesi/on-arka-teker-grubu',             key: 'footer_part_wheel' },
];

const legalLinkDefs: { href: string; key: TranslationKey }[] = [
  { href: '/gizlilik-politikasi', key: 'footer_legal_privacy' },
  { href: '/kullanim-sartlari',   key: 'footer_legal_terms' },
  { href: '/iade-kosullari',      key: 'footer_legal_returns' },
];

export function Footer() {
  const { t } = useLanguage();

  const partLinks    = partLinkDefs.map((d) => ({ href: d.href, label: t(d.key) }));
  const legalLinks   = legalLinkDefs.map((d) => ({ href: d.href, label: t(d.key) }));
  const companyLinks = [
    { href: '/hakkimizda', label: t('footer_link_about') },
    { href: '/iletisim',   label: t('footer_link_contact') },
    { href: '/',           label: t('footer_link_home') },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-[#8a9ab0]">
      {/* Üst kırmızı şerit */}
      <div className="h-[3px] bg-accent" />

      {/* Ana grid */}
      <div className="container-main py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Marka kolonu */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-5 hover:opacity-85 transition-opacity">
              <div className="bg-white rounded-[4px] px-3 py-1.5 inline-flex items-center">
                <Image
                  src="/images/logo/rnc-ana-logo.png"
                  alt="RNC Motor"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed mb-6 max-w-[240px] text-[#6b7a8d]">
              {t('footer_brand_desc')}
            </p>
            <a
              href="https://wa.me/905462096969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-[13px] font-bold rounded-[3px] hover:bg-[#20bc5a] active:scale-[0.98] transition-all duration-150 shadow-md shadow-[#25D366]/20"
            >
              <MessageCircle size={15} />
              {t('footer_whatsapp')}
            </a>
          </div>

          {/* Parça kategorileri */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.14em] uppercase mb-5 pb-3 border-b border-white/8">
              {t('footer_parts_title')}
            </h4>
            <ul className="space-y-2.5">
              {partLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[13px] text-[#6b7a8d] hover:text-white transition-colors duration-150"
                  >
                    <ArrowRight size={11} className="text-accent opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.14em] uppercase mb-5 pb-3 border-b border-white/8">
              {t('footer_company_title')}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[13px] text-[#6b7a8d] hover:text-white transition-colors duration-150"
                  >
                    <ArrowRight size={11} className="text-accent opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.14em] uppercase mb-5 pb-3 border-b border-white/8">
              {t('footer_contact_title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[13px]">
                <Phone size={14} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-[#6b7a8d]">0 (546) 209 69 69</span>
              </li>
              <li className="flex items-start gap-3 text-[13px]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-[#6b7a8d]">Şehitkamil / Gaziantep</span>
              </li>
              <li className="flex items-start gap-3 text-[13px]">
                <Clock size={14} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-[#6b7a8d] leading-relaxed">
                  {t('footer_hours_weekday')}
                  <br />
                  {t('footer_hours_sunday')}
                </span>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.14em] uppercase mb-5 pb-3 border-b border-white/8">
              {t('footer_legal_title')}
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[13px] text-[#6b7a8d] hover:text-white transition-colors duration-150"
                  >
                    <ArrowRight size={11} className="text-accent opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-white/6">
        <div className="container-main py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#4a5568]">
          <p>© {new Date().getFullYear()} RNC Motor. {t('footer_copyright')}</p>
          <p>{t('footer_tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
