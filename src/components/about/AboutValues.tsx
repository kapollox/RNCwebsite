import { Shield, Settings2, Users } from 'lucide-react';

const values = [
  {
    icon: Shield,
    label: 'GÜVENİLİR TEDARİK',
    description:
      'Yıllara dayanan sektör tecrübemizle, ihtiyaç duyulan parçaları doğru bilgiyle ve güvenilir yönlendirmeyle sunarız.',
  },
  {
    icon: Settings2,
    label: 'HONDA PARÇA UZMANLIĞI',
    description:
      'Honda motosiklet gruplarında model, yıl ve uyumluluk detaylarını dikkate alarak doğru parça seçimine destek oluruz.',
  },
  {
    icon: Users,
    label: 'PROFESYONEL HİZMET',
    description:
      'Servisler, ustalar, satıcılar ve bireysel kullanıcılar için hızlı iletişim, net bilgi ve çözüm odaklı destek sağlarız.',
  },
];

export function AboutValues() {
  return (
    <section className="bg-surface-muted border-y border-border">
      <div className="container-main py-20">
        <div className="mb-12">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            Değerlerimiz
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.label}
                className="bg-surface border border-border rounded-sm p-7 hover:border-primary transition-colors duration-150"
              >
                <div className="w-10 h-10 rounded-sm border border-border bg-surface-muted flex items-center justify-center mb-5">
                  <Icon size={19} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black tracking-[0.16em] uppercase text-accent mb-3 block">
                  {val.label}
                </span>
                <p className="text-text-muted text-sm leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
