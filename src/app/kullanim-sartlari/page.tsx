import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | RNC Motor',
  description: 'RNC Motor web sitesi kullanım şartları ve koşulları.',
};

export default function KullanimSartlariPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Üst bant */}
      <div className="bg-primary py-10 md:py-14">
        <div className="container-main">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            Ana Sayfa
          </Link>
          <h1 className="font-display font-black text-white text-2xl md:text-3xl">
            Kullanım Şartları
          </h1>
          <p className="text-white/50 text-sm mt-2">Son güncelleme: Haziran 2026</p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto">

          <Section title="1. Genel Koşullar">
            <p>
              Bu web sitesini (<strong>rnc-motor.com</strong>) ziyaret etmek veya kullanmak, aşağıdaki kullanım şartlarını
              kabul ettiğiniz anlamına gelir. Bu şartları kabul etmiyorsanız siteyi kullanmayınız.
            </p>
            <p>
              RNC Motor, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar.
              Güncel şartlar her zaman bu sayfada yayımlanır.
            </p>
          </Section>

          <Section title="2. Sitenin Kullanım Amacı">
            <p>
              Bu web sitesi, RNC Motor tarafından sunulan motosiklet yedek parçalarına ilişkin ürün
              kataloğunu görüntülemek ve iletişim kurmak amacıyla oluşturulmuştur.
            </p>
            <p>Site üzerinden yapabileceğiniz işlemler:</p>
            <ul>
              <li>Ürün kataloğunu inceleme</li>
              <li>WhatsApp veya iletişim formu üzerinden bilgi talep etme</li>
              <li>Marka ve kategori bazlı ürün arama</li>
            </ul>
          </Section>

          <Section title="3. Fikri Mülkiyet">
            <p>
              Bu sitede yer alan tüm içerikler (metin, görsel, logo, tasarım, yazılım kodu) RNC Motor'a
              aittir veya lisanslı olarak kullanılmaktadır. İzin alınmadan kopyalanamaz, çoğaltılamaz
              veya ticari amaçla kullanılamaz.
            </p>
          </Section>

          <Section title="4. Ürün Bilgileri ve Fiyatlar">
            <p>
              Sitede yer alan ürün bilgileri, açıklamalar ve fiyatlar bilgilendirme amaçlıdır.
              RNC Motor, ürün bilgilerinde hata veya eksiklik bulunması durumunda sorumluluk kabul etmez.
            </p>
            <p>
              Fiyatlar piyasa koşullarına göre önceden bildirim yapılmaksızın değiştirilebilir.
              Güncel fiyat bilgisi için WhatsApp veya telefon üzerinden iletişime geçiniz.
            </p>
          </Section>

          <Section title="5. Kullanıcı Yükümlülükleri">
            <p>Siteyi kullanan kişiler aşağıdaki kurallara uymakla yükümlüdür:</p>
            <ul>
              <li>Siteyi yalnızca yasal amaçlarla kullanmak</li>
              <li>Sisteme zarar verecek yazılım veya kod göndermemek</li>
              <li>Başkalarının haklarını ihlal eden içerik paylaşmamak</li>
              <li>Yanıltıcı bilgi vermemek</li>
            </ul>
          </Section>

          <Section title="6. Sorumluluk Sınırlaması">
            <p>
              RNC Motor, sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Teknik arızalar,
              bakım çalışmaları veya üçüncü taraf kaynaklı sorunlar nedeniyle hizmetin geçici olarak
              kesintiye uğraması halinde sorumluluk kabul edilmez.
            </p>
          </Section>

          <Section title="7. Bağlantılı Siteler">
            <p>
              Web sitemiz üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin içeriğinden
              RNC Motor sorumlu tutulamaz. Bağlantılı siteleri ziyaret etmeden önce kendi gizlilik
              politikalarını incelemenizi öneririz.
            </p>
          </Section>

          <Section title="8. Geçerli Hukuk">
            <p>
              Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir. Olası uyuşmazlıklarda
              Gaziantep mahkemeleri ve icra daireleri yetkilidir.
            </p>
          </Section>

          <Section title="9. İletişim">
            <p>Kullanım şartlarına ilişkin sorularınız için:</p>
            <ul>
              <li><strong>Telefon:</strong> 0 (546) 209 69 69</li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/905462096969" className="text-accent hover:underline">wa.me/905462096969</a></li>
              <li><strong>Adres:</strong> Şehitkamil / Gaziantep</li>
            </ul>
          </Section>

          <div className="mt-10 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={14} />
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-display font-bold text-primary text-lg mb-3 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="text-text-muted text-[15px] leading-relaxed space-y-3 [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:text-primary [&_a]:text-accent">
        {children}
      </div>
    </div>
  );
}
