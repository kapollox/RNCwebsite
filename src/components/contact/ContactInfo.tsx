import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(
  'Merhaba, Honda motosikletim için parça sorgulamak istiyorum. Model / yıl / parça adı bilgilerini paylaşacağım.'
)}`;

export function ContactInfo() {
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
              ÖNCELİKLİ İLETİŞİM
            </span>
            <h2 className="font-display font-bold text-white text-xl mb-2">
              WhatsApp ile Hızlı Ulaşım
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Parça kodu, model bilgisi veya uyumluluk sorularınız için WhatsApp üzerinden hızlı ve net yanıt alabilirsiniz.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors duration-150"
            >
              <MessageCircle size={16} />
              WhatsApp&apos;ı Aç
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
            TELEFON
          </span>
          <a
            href="tel:+90XXXXXXXXXX"
            className="text-primary font-semibold text-sm hover:text-accent transition-colors"
          >
            0 (XXX) XXX XX XX
          </a>
        </div>

        {/* Address */}
        <div className="bg-surface border border-border rounded-sm p-5">
          <div className="w-9 h-9 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-4">
            <MapPin size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-subtle mb-1.5 block">
            ADRES
          </span>
          <p className="text-primary font-semibold text-sm leading-snug">
            Adres bilgisi eklenecek
          </p>
        </div>

        {/* Working Hours */}
        <div className="bg-surface border border-border rounded-sm p-5">
          <div className="w-9 h-9 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-4">
            <Clock size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-subtle mb-1.5 block">
            ÇALIŞMA SAATLERİ
          </span>
          <div className="text-sm space-y-0.5">
            <p className="text-primary font-semibold">Hft içi: 09:00 – 18:00</p>
            <p className="text-primary font-semibold">Cumartesi: 09:00 – 14:00</p>
            <p className="text-text-muted">Pazar: Kapalı</p>
          </div>
        </div>
      </div>
    </div>
  );
}
