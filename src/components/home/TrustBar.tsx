'use client';

import { Award, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function TrustBar() {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: Award,
      title: t('trust_title1'),
      description: t('trust_desc1'),
    },
    {
      icon: BookOpen,
      title: t('trust_title2'),
      description: t('trust_desc2'),
    },
    {
      icon: MessageCircle,
      title: t('trust_title3'),
      description: t('trust_desc3'),
    },
  ];

  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-surface px-8 py-8 flex items-start gap-4"
              >
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-sm bg-surface-muted border border-border">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
