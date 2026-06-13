import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function ContactCTA() {
  return (
    <section className="bg-primary">
      {/* Red accent top line */}
      <div className="h-1 bg-accent" />

      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA text */}
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              İletişim
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-5">
              Aradığınız Honda Parçasını
              <br />
              Birlikte Bulalım.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">
              Model adı, yıl bilgisi veya parça kodunuzla WhatsApp'tan yazın.
              Parça uyumluluğunu kontrol edip en kısa sürede geri dönüyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                size="lg"
                label="Şimdi WhatsApp'tan Yazın"
                className="justify-center sm:justify-start"
              />
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-slate-700 text-slate-300 text-sm font-semibold rounded-sm hover:bg-slate-800 hover:text-white transition-colors duration-150"
              >
                İletişim Sayfası
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="bg-surface-dark rounded-sm border border-border-dark p-8">
            <h3 className="font-display font-bold text-white text-sm mb-6 uppercase tracking-widest">
              İletişim Bilgileri
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <MessageCircle size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    WhatsApp
                  </p>
                  <p className="text-white text-sm font-medium">
                    0 (XXX) XXX XX XX
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Pzt – Cts 09:00 – 18:00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    Telefon
                  </p>
                  <a
                    href="tel:+90XXXXXXXXXX"
                    className="text-white text-sm font-medium hover:text-accent transition-colors"
                  >
                    0 (XXX) XXX XX XX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-accent/10 border border-accent/20">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    Konum
                  </p>
                  <p className="text-white text-sm font-medium">
                    İstanbul, Türkiye
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
