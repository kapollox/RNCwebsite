'use client';

import { Target, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AboutMissionVision() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-20">
        <div className="mb-12">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            {t('mission_section_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission — wider card */}
          <div className="md:col-span-2 bg-surface border border-border rounded-sm p-8 hover:bg-surface-muted transition-colors duration-150">
            <div className="w-12 h-12 bg-surface-muted border border-border rounded-sm flex items-center justify-center mb-6">
              <Target size={22} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-primary text-xl mb-4">{t('mission_title')}</h3>
            <p className="text-text-muted leading-relaxed">
              {t('mission_text')}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-surface border border-border rounded-sm p-8 hover:bg-surface-muted transition-colors duration-150">
            <div className="w-12 h-12 bg-surface-muted border border-border rounded-sm flex items-center justify-center mb-6">
              <Eye size={22} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-primary text-xl mb-4">{t('vision_title')}</h3>
            <p className="text-text-muted leading-relaxed">
              {t('vision_text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
