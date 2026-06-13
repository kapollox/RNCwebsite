'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  const stats = [
    { value: '10+', label: t('hero_stat_experience') },
    { value: '500+', label: t('hero_stat_parts') },
    { value: '7/24', label: t('hero_stat_support') },
  ];

  return (
    <section className="hero-grid-pattern relative overflow-hidden">
      {/* Red accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <div className="container-main relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-8 h-px bg-accent" />
            <span className="text-accent text-xs font-semibold tracking-[0.14em] uppercase">
              {t('hero_eyebrow')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            {t('hero_title1')}
            <br />
            {t('hero_title2')}
            <br />
            <span className="text-accent">{t('hero_title3')}</span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            {t('hero_desc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link
              href="/parca-listesi"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary text-sm font-bold rounded-sm hover:bg-slate-100 transition-colors duration-150"
            >
              {t('hero_cta_catalog')}
              <ArrowRight size={16} />
            </Link>
            <WhatsAppButton
              size="md"
              label={t('hero_cta_whatsapp')}
              className="justify-center"
            />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-black text-white">
                  {stat.value}
                </span>
                <span className="text-slate-400 text-xs font-medium tracking-wide uppercase mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
