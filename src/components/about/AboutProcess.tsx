'use client';

import { Search, Package, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutProcess() {
  const { t } = useLanguage();

  const steps = [
    {
      phase: t('process_phase1'),
      icon: Search,
      title: t('process_step1_title'),
      description: t('process_step1_desc'),
      accent: false,
    },
    {
      phase: t('process_phase2'),
      icon: Package,
      title: t('process_step2_title'),
      description: t('process_step2_desc'),
      accent: false,
    },
    {
      phase: t('process_phase3'),
      icon: MessageCircle,
      title: t('process_step3_title'),
      description: t('process_step3_desc'),
      accent: true,
    },
  ];

  return (
    <section className="bg-surface-muted border-y border-border">
      <div className="container-main py-20">
        <div className="mb-14">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            {t('process_section_title')}
          </h2>
          <p className="text-text-muted mt-2 leading-relaxed max-w-xl">
            {t('process_section_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.phase} className="relative group py-8 md:py-0">
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-px transition-colors duration-200 ${
                    step.accent
                      ? 'bg-border group-hover:bg-accent'
                      : 'bg-border group-hover:bg-primary'
                  }`}
                />
                <div className="pt-8">
                  <span
                    className={`text-[10px] font-black tracking-[0.16em] uppercase mb-3 block ${
                      step.accent ? 'text-accent' : 'text-text-subtle'
                    }`}
                  >
                    {step.phase}
                  </span>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon
                      size={18}
                      className={step.accent ? 'text-accent' : 'text-primary'}
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display font-bold text-primary text-lg leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
                {/* Mobile divider (hidden on md+) */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-border md:hidden" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
