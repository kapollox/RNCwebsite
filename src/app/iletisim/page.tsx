import type { Metadata } from 'next';
import { ContactPageHeader } from '@/components/contact/ContactPageHeader';
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
      <ContactPageHeader />

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
