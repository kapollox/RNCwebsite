import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İade Koşulları | RNC Motor',
  description: 'RNC Motor iade ve değişim koşulları. 14 günlük cayma hakkı ve iade süreci.',
};

export default function IadeKosullariPage() {
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
            İade Koşulları
          </h1>
          <p className="text-white/50 text-sm mt-2">Son güncelleme: Haziran 2026</p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto">

          <Section title="1. Yasal Cayma Hakkı">
            <p>
              6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
              uyarınca tüketiciler, teslimat tarihinden itibaren <strong>14 (on dört) gün</strong> içinde
              herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin satın aldıkları ürünü iade
              etme hakkına sahiptir.
            </p>
          </Section>

          <Section title="2. İade Koşulları">
            <p>İade talebinin kabul edilebilmesi için aşağıdaki koşulların sağlanması gerekir:</p>
            <ul>
              <li>Ürün kullanılmamış, takılmamış ve orijinal ambalajında olmalıdır.</li>
              <li>Ürünle birlikte gelen tüm aksesuarlar eksiksiz iade edilmelidir.</li>
              <li>Fatura veya sipariş belgesi iade ile birlikte gönderilmelidir.</li>
              <li>Ürün üzerinde herhangi bir hasar, çizik veya değişiklik bulunmamalıdır.</li>
            </ul>
          </Section>

          <Section title="3. İade Edilemeyen Ürünler">
            <p>Aşağıdaki durumlarda iade talebi kabul edilmez:</p>
            <ul>
              <li>Ürün araç üzerine takılmış veya kullanılmış ise</li>
              <li>Ambalaj açılmış ve ürün montaj izleri taşıyorsa</li>
              <li>Müşteri talebiyle özel sipariş verilerek temin edilen ürünler</li>
              <li>Hijyen ve güvenlik açısından iadesi uygun olmayan parçalar</li>
            </ul>
          </Section>

          <Section title="4. İade Süreci">
            <p>İade talebinde bulunmak için:</p>
            <ul>
              <li>
                <strong>1. Adım:</strong> WhatsApp (<a href="https://wa.me/905462096969" className="text-accent hover:underline">0546 209 69 69</a>) veya
                telefon ile bizimle iletişime geçin, sipariş numaranızı ve iade nedeninizi belirtin.
              </li>
              <li>
                <strong>2. Adım:</strong> İade onayı aldıktan sonra ürünü orijinal ambalajında ve
                faturasıyla birlikte belirtilen adrese kargo ile gönderin.
              </li>
              <li>
                <strong>3. Adım:</strong> Ürün tarafımıza ulaştıktan ve kontrol edildikten sonra
                iade işlemi başlatılır.
              </li>
            </ul>
          </Section>

          <Section title="5. Ücret İadesi">
            <p>
              İade koşullarını sağlayan ürünler için ödeme iadesi, ürünün tarafımıza ulaşmasından
              itibaren <strong>14 iş günü</strong> içinde yapılır. İade, ödemenin yapıldığı yöntemle
              gerçekleştirilir.
            </p>
            <p>
              İade kargo ücreti, ürünün hatalı veya hasarlı teslim edildiği durumlar dışında
              alıcıya aittir.
            </p>
          </Section>

          <Section title="6. Değişim">
            <p>
              Yanlış ürün gönderimi veya ürün hatası durumunda değişim talep edebilirsiniz.
              Değişim sürecinde kargo masrafları RNC Motor tarafından karşılanır.
            </p>
            <p>
              Değişim talebi için WhatsApp veya telefon üzerinden bizimle iletişime geçmeniz yeterlidir.
            </p>
          </Section>

          <Section title="7. Garanti">
            <p>
              Ürünlerimiz, üretici garantisi kapsamındadır. Garanti süresi ürüne göre değişmekle
              birlikte genel olarak <strong>2 yıl</strong>dır. Garanti kapsamı dışındaki arızalar
              (yanlış montaj, kaza hasarı vb.) garanti ihlali sayılır.
            </p>
          </Section>

          <Section title="8. İletişim">
            <p>İade ve değişim talepleriniz için:</p>
            <ul>
              <li><strong>WhatsApp / Telefon:</strong> 0 (546) 209 69 69</li>
              <li><strong>Adres:</strong> Şehitkamil / Gaziantep</li>
              <li><strong>Çalışma Saatleri:</strong> Pzt – Cts 09:00 – 18:00</li>
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
