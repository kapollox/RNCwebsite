'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export function AboutHero() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface-muted border-b border-border">
      <div className="container-main py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="pr-0 md:pr-6">
            <span className="inline-block text-[10px] font-black tracking-[0.18em] uppercase text-accent mb-5">
              {t('about_eyebrow')}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-black text-primary leading-[1.15] tracking-tight mb-6">
              {t('about_title1')}<br />
              {t('about_title2')}<br />
              {t('about_title3')}
            </h1>
            <p className="text-text-muted leading-relaxed mb-4">
              {t('about_p1')}
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              {t('about_p2')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/parca-listesi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors duration-150"
              >
                {t('about_cta_catalog')}
                <ArrowRight size={15} />
              </Link>
              <WhatsAppButton label={t('about_cta_whatsapp')} />
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative h-64 md:h-[440px] rounded-sm overflow-hidden border border-border">
            <Image
              src="/images/about/hero-teker.jpg"
              alt="RNC Motor — Honda motosiklet"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
