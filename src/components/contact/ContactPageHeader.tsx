'use client';

import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/context/LanguageContext';

export function ContactPageHeader() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface-muted border-b border-border">
      <div className="container-main py-12 md:py-16">
        <Breadcrumb items={[{ label: '', labelKey: 'breadcrumb_contact' }]} />
        <span className="text-[10px] font-black tracking-[0.18em] uppercase text-accent mb-4 block">
          {t('contact_page_eyebrow')}
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-black text-primary tracking-tight mb-3">
          {t('contact_page_title')}
        </h1>
        <p className="text-text-muted max-w-lg leading-relaxed">
          {t('contact_page_desc')}
        </p>
      </div>
    </section>
  );
}
