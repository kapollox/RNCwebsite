import { Search, Package, MessageCircle } from 'lucide-react';

const steps = [
  {
    phase: 'AŞAMA 01',
    icon: Search,
    title: 'Parça Bilgisi ve Uyumluluk',
    description:
      'Model, yıl, motor kodu ve seri farklarını dikkate alarak doğru parça grubunu belirlemeye odaklanırız. Yanlış parça seçimi zaman ve maliyet kaybına neden olur; bu yüzden doğru tanımlama her şeyin başıdır.',
    accent: false,
  },
  {
    phase: 'AŞAMA 02',
    icon: Package,
    title: 'Güvenilir Tedarik',
    description:
      'Sektör deneyimimiz ve parça bilgimizle müşterilerimize güvenilir ürün yönlendirmesi ve düzenli tedarik desteği sunarız. Çalıştığımız ürün gruplarını iyi tanır, uyumluluk sorularına net yanıt veririz.',
    accent: false,
  },
  {
    phase: 'AŞAMA 03',
    icon: MessageCircle,
    title: 'Hızlı İletişim',
    description:
      'Parça kodu, uyumluluk ve stok soruları için WhatsApp üzerinden hızlı ve net iletişim kurarız. Teknik desteğimiz yalnızca satış öncesiyle sınırlı değildir; alım sonrası da yanınızdayız.',
    accent: true,
  },
];

export function AboutProcess() {
  return (
    <section className="bg-surface-muted border-y border-border">
      <div className="container-main py-20">
        <div className="mb-14">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            Çalışma Prensibimiz
          </h2>
          <p className="text-text-muted mt-2 leading-relaxed max-w-xl">
            Doğru parça tedariği yalnızca ürün bulmak değildir; model, yıl, seri ve uyumluluk bilgisini doğru analiz etmeyi gerektirir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.phase} className="relative group py-8 md:py-0">
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-px transition-colors duration-200 ${
                    step.accent
                      ? 'bg-border group-hover:bg-accent'
                      : 'bg-border group-hover:bg-primary'
                  }`}
                />
                <div className="pt-8">
                  <span
                    className={`text-[10px] font-black tracking-[0.16em] uppercase mb-3 block ${
                      step.accent ? 'text-accent' : 'text-text-subtle'
                    }`}
                  >
                    {step.phase}
                  </span>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon
                      size={18}
                      className={step.accent ? 'text-accent' : 'text-primary'}
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display font-bold text-primary text-lg leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
                {/* Mobile divider (hidden on md+) */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-border md:hidden" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
