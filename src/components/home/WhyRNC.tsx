'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function WhyRNC() {
  const { t } = useLanguage();

  const reasons = [
    {
      number: '01',
      title: t('why_reason1_title'),
      description: t('why_reason1_desc'),
    },
    {
      number: '02',
      title: t('why_reason2_title'),
      description: t('why_reason2_desc'),
    },
    {
      number: '03',
      title: t('why_reason3_title'),
      description: t('why_reason3_desc'),
    },
    {
      number: '04',
      title: t('why_reason4_title'),
      description: t('why_reason4_desc'),
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background image */}
      <Image
        src="/images/main/rnc-main.jpg"
        alt=""
        fill
        className="object-cover"
        quality={85}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 container-main py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28 [&_h2]:text-white [&_p]:text-white/75">
            <SectionHeader
              eyebrow={t('why_eyebrow')}
              title={t('why_title')}
              description={t('why_desc')}
            />
            <div className="border-l-4 border-accent pl-6 py-2 mt-8">
              <p className="text-white/65 text-sm leading-relaxed">
                {t('why_quote')}
              </p>
            </div>
          </div>

          {/* Right: Reasons list */}
          <div className="space-y-0">
            {reasons.map((reason) => (
              <div
                key={reason.number}
                className="flex gap-5 py-7 border-b border-white/15 last:border-b-0"
              >
                <div className="shrink-0 pt-0.5">
                  <span className="part-number text-accent font-bold text-xs">
                    {reason.number}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <h3 className="font-display font-bold text-white text-sm">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
