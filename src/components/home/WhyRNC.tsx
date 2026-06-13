import { SectionHeader } from '@/components/ui/SectionHeader';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    number: '01',
    title: '10 Yılı Aşkın Honda Deneyimi',
    description:
      'Sadece Honda motosiklet parçaları üzerine odaklanmış, model bazlı derin bilgi birikimi. CB, CBR, CRF, PCX, Forza serilerinde uzman yönlendirme.',
  },
  {
    number: '02',
    title: 'Doğru Parça Kodu, Doğru Uyum',
    description:
      'Üretim yılı ve model varyantına göre doğru parça numarasını belirliyoruz. "Uymaz" sürprizi yaşamadan doğru parçaya ulaşın.',
  },
  {
    number: '03',
    title: 'Hızlı WhatsApp Yönlendirmesi',
    description:
      'Çalışma saatleri içinde parça sorularınıza hızlı yanıt. Teknik bilgi, stok durumu ve uyumluluk kontrolü tek mesajda.',
  },
  {
    number: '04',
    title: 'Kurumsal ve Güvenilir Hizmet',
    description:
      'On yıldır sektörde faaliyet gösteren, referansları olan bir işletme. Bireysel ve kurumsal müşterilere aynı özeni gösteriyoruz.',
  },
];

export function WhyRNC() {
  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Header + context */}
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Neden RNC Motor?"
              title="Honda Parça Uzmanlığını Yakından Tanıyın"
              description="Her Honda modeli farklı parça gerektirir. Yıl, seri ve varyant farkları göz ardı edildiğinde yanlış parça, zaman ve para kaybı anlamına gelir. Biz bu karmaşıklığı sizin için çözüyoruz."
            />

            {/* Visual accent block */}
            <div className="border-l-4 border-accent pl-6 py-2 mt-8">
              <p className="text-text-muted text-sm leading-relaxed">
                Honda CB'den CRF offroad serilerine, PCX scooter'dan CBR
                supersport serisine kadar kapsamlı parça kataloğu ve teknik
                bilgi desteği.
              </p>
            </div>
          </div>

          {/* Right: Reasons list */}
          <div className="space-y-0">
            {reasons.map((reason, index) => (
              <div
                key={reason.number}
                className="flex gap-5 py-7 border-b border-border last:border-b-0"
              >
                <div className="shrink-0 pt-0.5">
                  <span className="part-number text-accent font-bold text-xs">
                    {reason.number}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <h3 className="font-display font-bold text-primary text-sm">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
