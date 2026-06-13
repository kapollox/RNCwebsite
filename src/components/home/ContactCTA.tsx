'use client';

import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary">
      {/* Red accent top line */}
      <div className="h-1 bg-accent" />

      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA text */}
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              {t('cta_eyebrow')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-5">
              {t('cta_title_line1')}
              <br />
              {t('cta_title_line2')}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">
              {t('cta_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                size="lg"
                label={t('cta_whatsapp')}
                className="justify-center sm:justify-start"
              />
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-slate-700 text-slate-300 text-sm font-semibold rounded-sm hover:bg-slate-800 hover:text-white transition-colors duration-150"
              >
                {t('cta_contact_page')}
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="bg-surface-dark rounded-sm border border-border-dark p-8">
            <h3 className="font-display font-bold text-white text-sm mb-6 uppercase tracking-widest">
              {t('cta_info_title')}
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <MessageCircle size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    {t('cta_wa_label')}
                  </p>
                  <p className="text-white text-sm font-medium">
                    0 (546) 209 69 69
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {t('cta_wa_hours')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    {t('cta_phone_label')}
                  </p>
                  <a
                    href="tel:+905462096969"
                    className="text-white text-sm font-medium hover:text-accent transition-colors"
                  >
                    0 (546) 209 69 69
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    {t('cta_location_label')}
                  </p>
                  <p className="text-white text-sm font-medium">
                    Şehitkamil / Gaziantep
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
