'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <div className="container-main relative z-10 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Copy */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-7">
              <span className="inline-block w-8 h-px bg-accent shrink-0" />
              <span className="text-accent text-[11px] font-bold tracking-[0.18em] uppercase">
                {t('hero_eyebrow')}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black text-white leading-[1.0] tracking-tight mb-6">
              {t('hero_title1')}
              <br />
              {t('hero_title2')}
              <br />
              <span className="text-accent">{t('hero_title3')}</span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              {t('hero_desc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                href="/parca-listesi"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-bold rounded-sm hover:bg-accent-dark active:scale-[0.98] transition-all duration-150"
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

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-5 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-3xl font-black text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-slate-400 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative hidden lg:block">
            {/* Accent frame */}
            <div className="absolute -inset-px rounded-sm border border-white/10" />
            {/* Corner accent */}
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-accent rounded-tr-sm" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-accent rounded-bl-sm" />

            <div className="relative h-[480px] xl:h-[540px] rounded-sm overflow-hidden">
              <Image
                src="/images/main/rnc-main.jpg"
                alt="RNC Motor — Motosiklet yedek parça"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
                quality={90}
                priority
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0d1117]/30" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
