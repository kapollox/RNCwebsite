'use client';

import { useLanguage } from '@/context/LanguageContext';

const placeholderStyle = {
  backgroundColor: '#F1F5F9',
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
} as const;

const gridPlaceholderStyle = {
  backgroundColor: '#F1F5F9',
  backgroundImage:
    'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
} as const;

export function AboutOperations() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-20">
        <div className="mb-12">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            {t('ops_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          {/* Left — large placeholder */}
          <div
            className="md:col-span-8 relative h-64 md:h-full rounded-sm overflow-hidden border border-border"
            style={gridPlaceholderStyle}
          >
            <div className="absolute top-0 left-0 w-[3px] h-20 bg-accent opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 border-t border-border/50 bg-white/60 backdrop-blur-sm">
              <span className="text-[10px] font-mono tracking-[0.14em] text-text-subtle uppercase">
                {t('ops_storage_label')}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-4 flex flex-col gap-6 h-full">
            {/* Small placeholder */}
            <div
              className="flex-1 relative rounded-sm overflow-hidden border border-border min-h-[140px]"
              style={placeholderStyle}
            >
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-border/50 bg-white/60 backdrop-blur-sm">
                <span className="text-[10px] font-mono tracking-[0.14em] text-text-subtle uppercase">
                  {t('ops_operations_label')}
                </span>
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-surface-muted border border-border rounded-sm p-6 shrink-0">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="font-display text-4xl font-black text-primary block leading-none">
                    10+
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-text-subtle mt-2 block leading-snug">
                    {t('ops_stat1_label')}
                  </span>
                </div>
                <div>
                  <span className="font-display text-4xl font-black text-primary block leading-none">
                    500+
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-text-subtle mt-2 block leading-snug">
                    {t('ops_stat2_label')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
