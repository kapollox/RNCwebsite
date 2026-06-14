'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

type TransKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

interface SectionDef {
  eyebrowKey: TransKey;
  titleKey: TransKey;
  bodyKey: TransKey;
  ctaType?: 'catalog' | 'whatsapp' | 'final';
}

const SECTION_DEFS: SectionDef[] = [
  { eyebrowKey: 'hero_s0_eyebrow', titleKey: 'hero_s0_title', bodyKey: 'hero_s0_body', ctaType: 'catalog' },
  { eyebrowKey: 'hero_s1_eyebrow', titleKey: 'hero_s1_title', bodyKey: 'hero_s1_body' },
  { eyebrowKey: 'hero_s2_eyebrow', titleKey: 'hero_s2_title', bodyKey: 'hero_s2_body' },
  { eyebrowKey: 'hero_s3_eyebrow', titleKey: 'hero_s3_title', bodyKey: 'hero_s3_body' },
  { eyebrowKey: 'hero_s4_eyebrow', titleKey: 'hero_s4_title', bodyKey: 'hero_s4_body', ctaType: 'whatsapp' },
  { eyebrowKey: 'hero_s5_eyebrow', titleKey: 'hero_s5_title', bodyKey: 'hero_s5_body', ctaType: 'final' },
];

export function ScrollSections({ activeIndex }: { activeIndex: number }) {
  const { t } = useLanguage();
  const def = SECTION_DEFS[activeIndex] ?? SECTION_DEFS[0];

  return (
    <div className="pointer-events-none select-none">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="inline-block w-8 h-px bg-[#ff3b30] shrink-0" />
        <span
          key={`ey-${activeIndex}`}
          className="text-[#ff3b30] text-[10px] font-bold tracking-[0.22em] uppercase animate-fadeIn"
        >
          {t(def.eyebrowKey)}
        </span>
      </div>

      {/* Title */}
      <h2
        key={`ti-${activeIndex}`}
        className="font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] xl:text-[3.5rem] font-black text-[#1a1a1a] leading-[1.02] tracking-tight mb-4 whitespace-pre-line animate-fadeUp"
      >
        {t(def.titleKey)}
      </h2>

      {/* Body */}
      <p
        key={`bo-${activeIndex}`}
        className="text-[#64748b] text-sm md:text-base leading-relaxed max-w-sm animate-fadeIn"
      >
        {t(def.bodyKey)}
      </p>

      {/* CTA */}
      {def.ctaType && (
        <div className="pointer-events-auto mt-7">
          {def.ctaType === 'catalog' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/parca-listesi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff3b30] text-white text-sm font-bold rounded-sm hover:bg-[#c1121f] active:scale-[0.98] transition-all duration-150"
              >
                {t('hero_cta_catalog')}
                <ArrowRight size={15} />
              </Link>
              <WhatsAppButton size="md" label={t('hero_cta_whatsapp')} className="justify-center" />
            </div>
          )}

          {def.ctaType === 'whatsapp' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton size="md" label={t('hero_s4_cta_wa')} className="justify-center" />
              <Link
                href="/markalar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-black/15 text-[#1a1a1a] text-sm font-bold rounded-sm hover:bg-black/5 active:scale-[0.98] transition-all duration-150"
              >
                {t('hero_s4_cta_brands')}
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {def.ctaType === 'final' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/parca-listesi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff3b30] text-white text-sm font-bold rounded-sm hover:bg-[#c1121f] active:scale-[0.98] transition-all duration-150"
              >
                {t('hero_s5_cta_catalog')}
                <ArrowRight size={15} />
              </Link>
              <WhatsAppButton size="md" label={t('hero_s5_cta_wa')} className="justify-center" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function StatBar() {
  const { t } = useLanguage();
  const stats = [
    { value: '10+',  key: 'hero_stat_experience' as const },
    { value: '500+', key: 'hero_stat_parts'       as const },
    { value: '7/24', key: 'hero_stat_support'     as const },
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 pt-5 border-t border-black/10">
      {stats.map((s) => (
        <div key={s.key} className="flex flex-col gap-0.5">
          <span className="font-display text-2xl font-black text-[#1a1a1a] leading-none">{s.value}</span>
          <span className="text-[#94a3b8] text-[10px] font-semibold tracking-[0.12em] uppercase">
            {t(s.key)}
          </span>
        </div>
      ))}
    </div>
  );
}
