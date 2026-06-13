import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function AboutHero() {
  return (
    <section className="bg-surface-muted border-b border-border">
      <div className="container-main py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="pr-0 md:pr-6">
            <span className="inline-block text-[10px] font-black tracking-[0.18em] uppercase text-accent mb-5">
              KURUMSAL — HAKKIMIZDA
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-black text-primary leading-[1.15] tracking-tight mb-6">
              RNC Motor:<br />
              Doğru Parçaya<br />
              Güvenle Ulaşmak
            </h1>
            <p className="text-text-muted leading-relaxed mb-4">
              RNC Motor, motosiklet yedek parça tedariğinde 10 yılı aşkın sektör deneyimiyle, özellikle Honda motosiklet gruplarında doğru parça bilgisi ve güvenilir yönlendirme sunan kurumsal bir tedarik firmasıdır.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              Kurulduğumuz günden bu yana servislerin, ustaların, parça satıcılarının ve profesyonel kullanıcıların en çok ihtiyaç duyduğu şeyin sadece &ldquo;parça bulmak&rdquo; olmadığını biliyoruz. Asıl ihtiyaç; doğru parçayı, doğru modele, doğru bilgiyle ulaştırabilmektir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/parca-listesi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors duration-150"
              >
                Parça Kataloğunu İncele
                <ArrowRight size={15} />
              </Link>
              <WhatsAppButton label="WhatsApp ile Parça Sor" />
            </div>
          </div>

          {/* Right — placeholder for future facility/parts image */}
          <div
            className="relative h-64 md:h-[440px] rounded-sm overflow-hidden border border-border"
            style={{
              backgroundColor: '#F1F5F9',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            <div className="absolute top-0 left-0 w-[3px] h-14 bg-accent opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-sm bg-white border border-border shadow-sm flex items-center justify-center">
                <Building2 size={28} className="text-text-subtle" strokeWidth={1.25} />
              </div>
              <span className="text-[10px] font-mono tracking-[0.16em] text-text-subtle uppercase select-none">
                GÖRSEL EKLENECEK
              </span>
            </div>
            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 border-t border-border/50">
              <span className="text-[10px] font-mono tracking-[0.14em] text-text-subtle uppercase">
                DEPO VE OPERASYON ALANI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
