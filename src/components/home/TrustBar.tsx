import { Award, BookOpen, MessageCircle } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: '10+ Yıl Honda Deneyimi',
    description:
      'Honda motosiklet yedek parçası alanında on yılı aşkın sektör deneyimi.',
  },
  {
    icon: BookOpen,
    title: 'Doğru Parça Bilgisi',
    description:
      'Model ve seri numarasına göre doğru parçayı belirliyoruz; yanlış parça riski sıfır.',
  },
  {
    icon: MessageCircle,
    title: 'Hızlı WhatsApp Yanıtı',
    description:
      'Parça kodu, uyumluluk ve stok soruları için anında WhatsApp desteği.',
  },
];

export function TrustBar() {
  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-surface px-8 py-8 flex items-start gap-4"
              >
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-sm bg-surface-muted border border-border">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
