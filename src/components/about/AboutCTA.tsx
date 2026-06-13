import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function AboutCTA() {
  return (
    <section className="bg-primary">
      <div className="container-main py-20 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] font-black tracking-[0.18em] uppercase text-accent">
              PARÇA SORGULAMA
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
            Aradığınız Honda Parçası İçin Bize Yazın
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 text-sm md:text-base">
            Model, yıl veya parça kodu bilgisiyle WhatsApp üzerinden bize ulaşın; doğru parça yönlendirmesi için yardımcı olalım.
          </p>
          <WhatsAppButton label="WhatsApp ile Parça Sor" size="lg" />
        </div>
      </div>
    </section>
  );
}
