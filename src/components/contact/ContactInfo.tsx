'use client';

import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function ContactInfo() {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/905462096969?text=${encodeURIComponent(t('contact_wa_pretext'))}`;

  return (
    <div className="flex flex-col gap-5">
      {/* WhatsApp — primary card */}
      <div className="bg-primary rounded-sm p-7">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
            <MessageCircle size={24} className="text-whatsapp" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black tracking-[0.16em] uppercase text-white/40 mb-1.5 block">
              {t('contact_priority_label')}
            </span>
            <h2 className="font-display font-bold text-white text-xl mb-2">
              {t('contact_wa_title')}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {t('contact_wa_desc')}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors duration-150"
            >
              <MessageCircle size={16} />
              {t('contact_wa_button')}
            </a>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Phone */}
        <div className="bg-surface border border-border rounded-sm p-5">
          <div className="w-9 h-9 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-4">
            <Phone size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-subtle mb-1.5 block">
            {t('contact_phone_label')}
          </span>
          <a
            href="tel:+905462096969"
            className="text-primary font-semibold text-sm hover:text-accent transition-colors"
          >
            0 (546) 209 69 69
          </a>
        </div>

        {/* Address */}
        <div className="bg-surface border border-border rounded-sm p-5">
          <div className="w-9 h-9 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-4">
            <MapPin size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-subtle mb-1.5 block">
            {t('contact_address_label')}
          </span>
          <p className="text-primary font-semibold text-sm leading-snug">
            Şehitkamil / Gaziantep
          </p>
        </div>

        {/* Working Hours */}
        <div className="bg-surface border border-border rounded-sm p-5">
          <div className="w-9 h-9 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-4">
            <Clock size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-subtle mb-1.5 block">
            {t('contact_hours_label')}
          </span>
          <div className="text-sm space-y-0.5">
            <p className="text-primary font-semibold">{t('contact_hours_weekday')}</p>
            <p className="text-primary font-semibold">{t('contact_hours_saturday')}</p>
            <p className="text-text-muted">{t('contact_hours_sunday')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
