'use client';

import { CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    number: '01',
    title: 'Model Bazlı Doğru Parça Seçimi',
    description: 'Her motosiklet modelinin farklı parça ihtiyacı vardır. Yıl, seri ve varyant bilgisine göre doğru parçayı belirleyerek yanlış alım riskini ortadan kaldırıyoruz.',
  },
  {
    number: '02',
    title: 'Hızlı ve Doğru İletişim Desteği',
    description: 'Çalışma saatleri içinde parça sorularınıza hızlı dönüş sağlıyoruz. Stok durumu, uyumluluk ve teknik bilgi desteği tek mesajla.',
  },
  {
    number: '03',
    title: 'Güvenilir Tedarik ve Teslimat',
    description: 'Desteklediğimiz markalar için düzenli stok ve hızlı kargo imkanı sunuyoruz. Zamanında teslimat önceliğimizdir.',
  },
  {
    number: '04',
    title: 'Kurumsal ve Şeffaf Hizmet Anlayışı',
    description: 'Yıllardır sektörde faaliyet gösteren, referansları olan bir işletmeyiz. Müşterilerimize karşı şeffaf, çözüm odaklı ve güvenilir bir hizmet sunuyoruz.',
  },
];

export function WhyRNC() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#111418]">
      {/* Kırmızı ışık sağ üst */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[120px] pointer-events-none" />
      {/* Sol alt hafif vurgu */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-main py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Sol — sticky başlık */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-accent shrink-0" />
              <span className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase">Neden Biz?</span>
            </div>
            <h2 className="font-display font-black text-white text-3xl md:text-4xl leading-[1.05] tracking-tight mb-6">
              Neden RNC Motor?
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-6" />
            <p className="text-slate-400 text-[0.95rem] leading-relaxed max-w-sm">
              Yılların tecrübesi ve güvenilir tedarik zinciriyle desteklediğimiz markalar için kaliteli yedek parça sunuyoruz. Model bazlı doğru parça seçimi, hızlı teslimat ve uzman teknik destekle müşterilerimizin zaman ve maliyet kaybını önlüyoruz.
            </p>
          </div>

          {/* Sağ — maddeler */}
          <div className="border-t border-white/10">
            {reasons.map((reason, i) => (
              <div
                key={reason.number}
                className="group flex gap-5 py-7 border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors duration-150 -mx-4 px-4 rounded-sm"
              >
                {/* Numara */}
                <div className="shrink-0 w-10 pt-0.5 text-right">
                  <span className="font-mono text-accent text-xs font-bold opacity-70">{reason.number}</span>
                </div>

                {/* İkon + içerik */}
                <div className="flex-1">
                  <div className="flex items-start gap-2.5 mb-2">
                    <CheckCircle2
                      size={16}
                      className="text-accent shrink-0 mt-0.5 opacity-80"
                      strokeWidth={2.5}
                    />
                    <h3 className="font-display font-bold text-white text-[0.9rem] leading-snug">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-[0.82rem] leading-relaxed pl-[26px]">
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
