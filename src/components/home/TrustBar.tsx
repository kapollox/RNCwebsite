'use client';

import { Award, Target, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function TrustBar() {
  const { t } = useLanguage();

  const trustItems = [
    { icon: Award,         title: t('trust_title1'), description: t('trust_desc1') },
    { icon: Target,        title: t('trust_title2'), description: t('trust_desc2') },
    { icon: MessageCircle, title: t('trust_title3'), description: t('trust_desc3') },
  ];

  return (
    <section className="bg-[#0d1117] border-b border-white/6">
      <div className="container-main py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-5 px-8 py-9 hover:bg-white/[0.03] transition-colors duration-200"
              >
                {/* İkon kutusu */}
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-[3px] bg-accent/10 border border-accent/20 group-hover:bg-accent/15 group-hover:border-accent/35 transition-colors duration-200">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] leading-relaxed">
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
