import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | RNC Motor',
  description: 'RNC Motor gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.',
};

export default function GizlilikPolitikasiPage() {
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
            Gizlilik Politikası
          </h1>
          <p className="text-white/50 text-sm mt-2">Son güncelleme: Haziran 2026</p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose-legal">

          <Section title="1. Veri Sorumlusu">
            <p>
              Bu Gizlilik Politikası, <strong>RNC Motor</strong> (bundan böyle "RNC Motor", "biz" veya "şirket" olarak anılacaktır)
              tarafından hazırlanmıştır. Şehitkamil / Gaziantep adresinde faaliyet gösteren RNC Motor,
              6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatını taşımaktadır.
            </p>
          </Section>

          <Section title="2. Toplanan Veriler">
            <p>Web sitemizi kullandığınızda aşağıdaki veriler toplanabilir:</p>
            <ul>
              <li><strong>İletişim formu:</strong> Ad, telefon numarası, e-posta adresi ve ilettiğiniz mesaj içeriği.</li>
              <li><strong>WhatsApp iletişimi:</strong> WhatsApp üzerinden ilettiğiniz mesajlar WhatsApp'ın gizlilik politikası kapsamındadır.</li>
              <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, ziyaret edilen sayfalar ve ziyaret süresi gibi anonim kullanım verileri.</li>
            </ul>
          </Section>

          <Section title="3. Verilerin Kullanım Amacı">
            <p>Toplanan kişisel veriler yalnızca şu amaçlarla kullanılır:</p>
            <ul>
              <li>İletişim taleplerinize yanıt vermek</li>
              <li>Ürün ve hizmet bilgisi sunmak</li>
              <li>Siparişlerinizi ve taleplerinizi takip etmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
            <p>Verileriniz üçüncü taraflarla pazarlama amacıyla paylaşılmaz, satılmaz.</p>
          </Section>

          <Section title="4. Verilerin Saklanması">
            <p>
              Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca veya yasal saklama
              yükümlülükleri çerçevesinde saklanır. Amaç ortadan kalktığında veriler silinir veya anonim hale getirilir.
            </p>
          </Section>

          <Section title="5. Üçüncü Taraf Hizmetler">
            <p>Web sitemiz aşağıdaki üçüncü taraf hizmetlerini kullanmaktadır:</p>
            <ul>
              <li><strong>Supabase:</strong> Veritabanı ve depolama altyapısı. Supabase'in gizlilik politikası geçerlidir.</li>
              <li><strong>Vercel:</strong> Web barındırma hizmeti. Vercel'in gizlilik politikası geçerlidir.</li>
              <li><strong>WhatsApp:</strong> Müşteri iletişimi. Meta'nın gizlilik politikası geçerlidir.</li>
            </ul>
          </Section>

          <Section title="6. KVKK Kapsamındaki Haklarınız">
            <p>6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Kanunun 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
            </ul>
            <p>
              Bu haklarınızı kullanmak için{' '}
              <a href="tel:+905462096969" className="text-accent hover:underline">0 (546) 209 69 69</a>{' '}
              numaralı telefondan veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </Section>

          <Section title="7. Çerezler (Cookies)">
            <p>
              Web sitemiz, oturum yönetimi için zorunlu çerezler kullanmaktadır. Bu çerezler sitenin
              düzgün çalışması için gereklidir ve pazarlama amacı taşımaz.
            </p>
          </Section>

          <Section title="8. Politika Değişiklikleri">
            <p>
              Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olması durumunda
              site üzerinden bilgilendirme yapılacaktır. Politikanın güncel versiyonu her zaman bu sayfada yayımlanır.
            </p>
          </Section>

          <Section title="9. İletişim">
            <p>
              Gizlilik politikamıza ilişkin sorularınız için:
            </p>
            <ul>
              <li><strong>Telefon:</strong> 0 (546) 209 69 69</li>
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
