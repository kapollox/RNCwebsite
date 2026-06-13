'use client';

import { Shield, Settings2, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutValues() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      label: t('values1_label'),
      description: t('values1_desc'),
    },
    {
      icon: Settings2,
      label: t('values2_label'),
      description: t('values2_desc'),
    },
    {
      icon: Users,
      label: t('values3_label'),
      description: t('values3_desc'),
    },
  ];

  return (
    <section className="bg-surface-muted border-y border-border">
      <div className="container-main py-20">
        <div className="mb-12">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            {t('values_section_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.label}
                className="bg-surface border border-border rounded-sm p-7 hover:border-primary transition-colors duration-150"
              >
                <div className="w-10 h-10 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-5">
                  <Icon size={19} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black tracking-[0.16em] uppercase text-accent mb-3 block">
                  {val.label}
                </span>
                <p className="text-text-muted text-sm leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
