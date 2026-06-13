import Link from 'next/link';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const partLinks = [
  { href: '/parca-listesi/elektrik-grubu', label: 'Elektrik Grubu' },
  { href: '/parca-listesi/fren-balata-grubu', label: 'Fren & Balata' },
  { href: '/parca-listesi/motor-aksami', label: 'Motor Aksamı' },
  { href: '/parca-listesi/egzoz-grubu', label: 'Egzoz Grubu' },
  { href: '/parca-listesi/zincirler-ve-zincir-disli-setleri', label: 'Zincir & Dişli' },
  { href: '/parca-listesi/on-arka-teker-grubu', label: 'Teker Grubu' },
];

const companyLinks = [
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
  { href: '/', label: 'Ana Sayfa' },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      {/* Main footer grid */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 bg-accent text-white font-display font-black text-sm rounded-sm select-none">
                R
              </span>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                NC Motor
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Honda motosiklet yedek parçasında 10 yılı aşkın deneyim. Doğru
              parça bilgisi, hızlı yönlendirme, güvenilir hizmet.
            </p>
            <a
              href="https://wa.me/905XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors duration-150"
            >
              <MessageCircle size={16} />
              WhatsApp ile Yazın
            </a>
          </div>

          {/* Parts column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              Parça Kategorileri
            </h4>
            <ul className="space-y-2.5">
              {partLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              Kurumsal
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>0 (XXX) XXX XX XX</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  Pzt – Cts: 09:00 – 18:00
                  <br />
                  Pazar: Kapalı
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-dark">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} RNC Motor. Tüm hakları saklıdır.</p>
          <p className="text-xs">
            Honda motosiklet yedek parça kataloğu ve bilgi merkezi
          </p>
        </div>
      </div>
    </footer>
  );
}
