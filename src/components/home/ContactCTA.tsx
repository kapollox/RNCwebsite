'use client';

import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0d1117] relative overflow-hidden">
      {/* Kırmızı üst şerit */}
      <div className="h-[3px] bg-accent" />
      {/* Arka plan ışık efekti */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Sol: CTA */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-accent shrink-0" />
              <p className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase">
                {t('cta_eyebrow')}
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-[1.05] tracking-tight mb-5">
              {t('cta_title_line1')}
              <br />
              <span className="text-accent">{t('cta_title_line2')}</span>
            </h2>
            <p className="text-slate-400 text-[0.95rem] leading-relaxed mb-8 max-w-md">
              {t('cta_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                size="lg"
                label={t('cta_whatsapp')}
                className="justify-center sm:justify-start shadow-lg shadow-[#25D366]/20"
              />
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/15 text-slate-300 text-sm font-semibold rounded-[3px] hover:bg-white/6 hover:border-white/25 hover:text-white transition-all duration-150"
              >
                {t('cta_contact_page')}
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Sağ: İletişim kartı */}
          <div className="bg-white/[0.04] rounded-[4px] border border-white/10 p-7 backdrop-blur-sm">
            <h3 className="font-display font-bold text-white text-xs mb-6 uppercase tracking-[0.14em] pb-4 border-b border-white/10">
              {t('cta_info_title')}
            </h3>
            <ul className="space-y-5">
              {/* WhatsApp */}
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-[3px] bg-[#25D366]/10 border border-[#25D366]/20">
                  <MessageCircle size={16} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.12em] mb-1">
                    {t('cta_wa_label')}
                  </p>
                  <p className="text-white text-sm font-semibold">0 (546) 209 69 69</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{t('cta_wa_hours')}</p>
                </div>
              </li>
              {/* Telefon */}
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-[3px] bg-accent/10 border border-accent/20">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.12em] mb-1">
                    {t('cta_phone_label')}
                  </p>
                  <a
                    href="tel:+905462096969"
                    className="text-white text-sm font-semibold hover:text-accent transition-colors"
                  >
                    0 (546) 209 69 69
                  </a>
                </div>
              </li>
              {/* Konum */}
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-[3px] bg-accent/10 border border-accent/20">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.12em] mb-1">
                    {t('cta_location_label')}
                  </p>
                  <p className="text-white text-sm font-semibold">Şehitkamil / Gaziantep</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
