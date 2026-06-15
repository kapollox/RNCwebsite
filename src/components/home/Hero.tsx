'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: '10+', label: t('new_hero_stat1_label') },
    { value: '500+', label: t('new_hero_stat2_label') },
    { value: '7/24', label: t('new_hero_stat3_label') },
  ];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src="/images/main/rnc-main.jpg"
          alt=""
          fill
          className="object-cover object-center scale-105"
          quality={95}
          priority
          aria-hidden="true"
        />
        {/* Koyu katmanlar: sol yoğun, sağ açık */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b0f]/97 via-[#080b0f]/80 to-[#080b0f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0f]/80 via-transparent to-[#080b0f]/30" />
        {/* Kırmızı ışık vurgusu — sol alt */}
        <div className="absolute bottom-0 left-0 w-96 h-64 bg-accent/8 blur-[80px] pointer-events-none" />
      </div>

      {/* Üst kırmızı çizgi */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent z-10" />

      {/* İçerik */}
      <div className="relative z-10 container-main flex flex-col justify-center" style={{ minHeight: '92vh', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-[680px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-10 h-px bg-accent shrink-0" />
            <span className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase">
              {t('new_hero_eyebrow')}
            </span>
          </div>

          {/* Ana başlık */}
          <h1
            className="font-display font-black text-white leading-[1.03] tracking-tight mb-7"
            style={{ fontSize: 'clamp(2.1rem, 5.5vw, 4rem)' }}
          >
            {t('new_hero_title_plain')}{' '}
            <span className="relative">
              <span className="text-accent">{t('new_hero_title_accent')}</span>
            </span>{' '}
            {t('new_hero_title_suffix')}
          </h1>

          {/* Ayırıcı çizgi */}
          <div className="flex items-center gap-4 mb-7">
            <div className="w-12 h-[2px] bg-accent" />
            <div className="w-4 h-[2px] bg-accent/40" />
          </div>

          {/* Alt başlık */}
          <p className="text-slate-300/90 text-base md:text-[1.05rem] leading-relaxed mb-10 max-w-[540px]">
            {t('new_hero_desc')}
          </p>

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link
              href="/parca-listesi"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-accent text-white text-sm font-bold rounded-[3px] hover:bg-accent-dark active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20"
            >
              {t('new_hero_cta_catalog')}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/905462096969"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/8 border border-white/15 text-white text-sm font-semibold rounded-[3px] hover:bg-white/14 hover:border-white/25 transition-all duration-150 backdrop-blur-sm"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              {t('new_hero_cta_whatsapp')}
            </a>
          </div>

          {/* İstatistikler */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="font-display text-[2rem] font-black text-white leading-none">{s.value}</span>
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.14em] uppercase">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aşağı ok */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <ChevronDown size={20} className="text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
