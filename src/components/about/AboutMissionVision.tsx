import { Target, Eye } from 'lucide-react';

export function AboutMissionVision() {
  return (
    <section className="bg-surface border-b border-border">
      <div className="container-main py-20">
        <div className="mb-12">
          <h2 className="font-display text-2xl md:text-[2rem] font-black text-primary tracking-tight">
            Kurumsal Yaklaşım
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission — wider card */}
          <div className="md:col-span-2 bg-surface border border-border rounded-sm p-8 hover:bg-surface-muted transition-colors duration-150">
            <div className="w-12 h-12 bg-surface-muted border border-border rounded-sm flex items-center justify-center mb-6">
              <Target size={22} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-primary text-xl mb-4">Misyonumuz</h3>
            <p className="text-text-muted leading-relaxed">
              Motosiklet yedek parça tedariğinde doğru bilgi, güvenilir yönlendirme ve hızlı iletişimle müşterilerimizin ihtiyaç duyduğu parçaya en uygun şekilde ulaşmasını sağlamak. Model, yıl ve seri farklarını dikkate alarak her müşterimize özel ve güvenilir çözüm sunmak temel önceliğimizdir.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-surface border border-border rounded-sm p-8 hover:bg-surface-muted transition-colors duration-150">
            <div className="w-12 h-12 bg-surface-muted border border-border rounded-sm flex items-center justify-center mb-6">
              <Eye size={22} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-primary text-xl mb-4">Vizyonumuz</h3>
            <p className="text-text-muted leading-relaxed">
              Honda motosiklet yedek parçalarında güvenilir, düzenli ve profesyonel tedarik anlayışıyla; servisler, ustalar, satıcılar ve bireysel kullanıcılar için tercih edilen çözüm ortağı olmak.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
