import type { Metadata } from 'next';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'İletişim | RNC Motor',
  description:
    'RNC Motor iletişim bilgileri. WhatsApp, telefon ve adres. Honda motosiklet yedek parça sorularınız için bize ulaşın.',
};

export default function IletisimPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-surface-muted border-b border-border">
        <div className="container-main py-12 md:py-16">
          <span className="text-[10px] font-black tracking-[0.18em] uppercase text-accent mb-4 block">
            İLETİŞİM
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-primary tracking-tight mb-3">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-text-muted max-w-lg leading-relaxed">
            Honda yedek parça sorularınız için WhatsApp üzerinden bize ulaşabilir, telefon veya ziyaret yoluyla destek alabilirsiniz.
          </p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="bg-surface">
        <div className="container-main py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
