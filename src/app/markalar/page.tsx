'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/context/LanguageContext';
import { Star } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo: string | null;
  descTr: string;
  descEn: string;
  featured: boolean;
}

const BRANDS: Brand[] = [
  {
    id: 'rks',
    name: 'RKS Motor',
    logo: '/images/brands/rks.jpeg',
    descTr: 'Türkiye\'de güçlü bayi ağına ve geniş model yelpazesine sahip markalardan biri. RNC Motor olarak parça desteğimizi verdiğimiz markalar arasında yer alır.',
    descEn: 'One of the brands with a strong dealer network and wide model range in Turkey. We provide spare parts support for RKS Motor.',
    featured: true,
  },
  {
    id: 'kuba',
    name: 'Kuba Motor',
    logo: '/images/brands/kuba.png',
    descTr: 'RKS ile aynı grup altında faaliyet gösteren, Türkiye\'de yaygın olarak tercih edilen markalardan. Parça ve servis desteğimiz mevcuttur.',
    descEn: 'Operating under the same group as RKS, Kuba is one of the widely preferred brands in Turkey. We provide parts and service support.',
    featured: true,
  },
  {
    id: 'mondial',
    name: 'Mondial',
    logo: '/images/brands/mondial.jpeg',
    descTr: 'Uzun yıllardır Türkiye\'de en çok satan markalar arasında yer alan, güçlü üretim ve dağıtım altyapısına sahip marka.',
    descEn: 'A brand with strong production and distribution infrastructure that has been among the best-selling in Turkey for many years.',
    featured: false,
  },
  {
    id: 'arora',
    name: 'Arora',
    logo: '/images/brands/arora.jpg',
    descTr: 'Uygun fiyatlı modelleri ve yaygın bayi ağı ile Türkiye\'de bilinen markalardan. RNC Motor olarak parça desteğimizi sunuyoruz.',
    descEn: 'A well-known brand in Turkey with affordable models and a wide dealer network. We provide spare parts support for Arora.',
    featured: false,
  },
  {
    id: 'yuki',
    name: 'Yuki',
    logo: '/images/brands/yuki.png',
    descTr: 'Özellikle scooter segmentinde güçlü olan, Türkiye\'de faaliyet gösteren markalardan. Parça desteğimiz mevcuttur.',
    descEn: 'One of the brands active in Turkey, particularly strong in the scooter segment. We provide spare parts support for Yuki.',
    featured: false,
  },
];

function monogram(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function LogoArea({ brand, height }: { brand: Brand; height: string }) {
  return (
    <div className={`relative ${height} flex flex-col items-center justify-center bg-white border-b border-border overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="relative font-display font-black text-6xl text-primary/10 group-hover:text-accent/20 transition-colors duration-300 select-none leading-none">
          {monogram(brand.name)}
        </span>
      )}
    </div>
  );
}

function FeaturedCard({ brand, locale }: { brand: Brand; locale: string }) {
  const desc = locale === 'en' ? brand.descEn : brand.descTr;
  return (
    <article className="group relative flex flex-col bg-surface border border-border rounded-sm overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
      <LogoArea brand={brand} height="h-44" />
      {/* Öne çıkan rozeti */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.14em] uppercase text-accent bg-white border border-accent/30 px-2 py-0.5 rounded-sm shadow-sm">
          <Star size={9} strokeWidth={2.5} />
          {locale === 'en' ? 'Featured' : 'Öne Çıkan'}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-black text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-150">
          {brand.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </article>
  );
}

function RegularCard({ brand, locale }: { brand: Brand; locale: string }) {
  const desc = locale === 'en' ? brand.descEn : brand.descTr;
  return (
    <article className="group flex flex-col bg-surface border border-border rounded-sm overflow-hidden hover:border-accent hover:shadow-sm transition-all duration-200">
      <LogoArea brand={brand} height="h-32" />
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-base text-primary mb-2 group-hover:text-accent transition-colors duration-150">
          {brand.name}
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
      </div>
      <div className="h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </article>
  );
}

export default function MarkalarPage() {
  const { t, locale } = useLanguage();

  const featured = BRANDS.filter((b) => b.featured);
  const regular  = BRANDS.filter((b) => !b.featured);

  return (
    <>
      <Breadcrumb items={[{ label: 'Desteklediğimiz Markalar', labelKey: 'breadcrumb_brands' }]} />

      {/* Sayfa başlığı */}
      <div className="mb-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-black text-primary tracking-tight mb-3">
          {t('markalar_title')}
        </h1>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          {t('markalar_description')}
        </p>
      </div>

      {/* Öne Çıkan: RKS + Kuba */}
      <section className="mb-16">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="inline-block w-8 h-px bg-accent shrink-0" />
          <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
            {t('markalar_featured_eyebrow')}
          </span>
        </div>
        <p className="text-text-muted text-sm mb-8 max-w-xl">
          {t('markalar_featured_desc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {featured.map((brand) => (
            <FeaturedCard key={brand.id} brand={brand} locale={locale} />
          ))}
        </div>
      </section>

      <div className="border-t border-border mb-14" />

      {/* Diğer markalar */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="inline-block w-8 h-px bg-accent shrink-0" />
          <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
            {t('markalar_all_eyebrow')}
          </span>
        </div>
        <p className="text-text-muted text-sm mb-8 max-w-xl">
          {t('markalar_all_desc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {regular.map((brand) => (
            <RegularCard key={brand.id} brand={brand} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
