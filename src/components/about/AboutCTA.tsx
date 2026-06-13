'use client';

import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export function AboutCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary">
      <div className="container-main py-20 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] font-black tracking-[0.18em] uppercase text-accent">
              {t('about_cta_section_eyebrow')}
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
            {t('about_cta_section_title')}
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 text-sm md:text-base">
            {t('about_cta_section_desc')}
          </p>
          <WhatsAppButton label={t('about_cta_section_button')} size="lg" />
        </div>
      </div>
    </section>
  );
}
