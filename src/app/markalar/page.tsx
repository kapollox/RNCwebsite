'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/context/LanguageContext';

interface FeaturedBrand {
  id: string;
  name: string;
  logo: string;
  descTr: string;
  descEn: string;
  originTr: string;
  originEn: string;
}

interface SimpleBrand {
  id: string;
  name: string;
}

const featuredBrands: FeaturedBrand[] = [
  {
    id: 'honda',
    name: 'Honda',
    logo: '/images/brands/honda.png',
    descTr: 'Japonya kökenli dünya devi Honda, CB, CBR, CRF, PCX ve Forza serileriyle her sürücü profiline uygun model sunar. RNC Motor olarak Honda yedek parçalarında uzmanlaşmış kadromuzla doğru parçayı doğru modele eşleştiriyoruz.',
    descEn: 'Honda, the Japanese global giant, offers models for every rider profile with CB, CBR, CRF, PCX and Forza series. At RNC Motor, our specialized team matches the right Honda spare part to the right model.',
    originTr: 'Japonya',
    originEn: 'Japan',
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    logo: '/images/brands/yamaha.png',
    descTr: 'Spor ve şehir içi motosiklet segmentlerinde güçlü bir yere sahip Japon markasıdır. YZF, MT ve NMAX serileriyle geniş bir kullanıcı kitlesine hitap eder.',
    descEn: 'A strong Japanese brand in sport and urban motorcycle segments. With YZF, MT and NMAX series, it appeals to a wide range of riders.',
    originTr: 'Japonya',
    originEn: 'Japan',
  },
  {
    id: 'bajaj',
    name: 'Bajaj',
    logo: '/images/brands/bajaj.png',
    descTr: 'Hindistan merkezli ve dünya genelinde yaygın satış ağına sahip motosiklet üreticisidir. Pulsar serisiyle öne çıkan marka, uygun fiyat-performans dengesiyle tercih edilir.',
    descEn: 'An Indian motorcycle manufacturer with a widespread global sales network. Known for the Pulsar series, preferred for its price-performance balance.',
    originTr: 'Hindistan',
    originEn: 'India',
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    logo: '/images/brands/suzuki.png',
    descTr: 'Spor ve touring motosikletlerden scooter\'a geniş bir ürün gamıyla dünya pazarlarında söz sahibi olan Japon markasıdır. GSX ve Burgman serileriyle öne çıkar.',
    descEn: 'A Japanese brand with a wide product range from sport and touring motorcycles to scooters. Stands out with GSX and Burgman series.',
    originTr: 'Japonya',
    originEn: 'Japan',
  },
  {
    id: 'cfmoto',
    name: 'CF Moto',
    logo: '/images/brands/cfmoto.png',
    descTr: 'Çin merkezli CF Moto, orta segment ve adventure motosiklet kategorisinde hızla büyüyen bir markadır. 300NK ve 650MT gibi modelleriyle dünya pazarında dikkat çekmektedir.',
    descEn: 'China-based CF Moto is a rapidly growing brand in mid-segment and adventure categories. It draws attention worldwide with models like 300NK and 650MT.',
    originTr: 'Çin',
    originEn: 'China',
  },
  {
    id: 'mondial',
    name: 'Mondial',
    logo: '/images/brands/mondial.jpeg',
    descTr: 'İtalyan kökenli Mondial, özellikle scooter ve hafif motosiklet kategorisinde kaliteli ürünleriyle bilinmektedir. Türkiye pazarında güçlü bir kullanıcı tabanına sahiptir.',
    descEn: 'Italian-origin Mondial is known for its quality products, especially in the scooter and lightweight motorcycle category. It has a strong user base in the Turkish market.',
    originTr: 'İtalya',
    originEn: 'Italy',
  },
];

const allBrands: SimpleBrand[] = [
  { id: 'tvs', name: 'TVS' },
  { id: 'kuba', name: 'Kuba' },
  { id: 'rks', name: 'RKS Motorsiklet' },
  { id: 'monero', name: 'Monero' },
  { id: 'sfr', name: 'SFR' },
  { id: 'anlas', name: 'Anlas' },
  { id: 'carub', name: 'Carub' },
  { id: 'wogen', name: 'Wogen' },
  { id: 'ngk', name: 'NGK' },
  { id: 'bosch', name: 'Bosch' },
  { id: 'michelin', name: 'Michelin' },
  { id: 'motul', name: 'Motul' },
  { id: 'keihin', name: 'Keihin' },
  { id: 'bando', name: 'Bando' },
  { id: 'drpulley', name: 'Dr.Pulley' },
  { id: 'msr', name: 'MSR' },
  { id: 'rizoma', name: 'Rizoma' },
  { id: 'narva', name: 'Narva' },
  { id: 'shengwey', name: 'Shengwey' },
  { id: 'lnsmoto', name: 'LNS Moto' },
  { id: 'arwic', name: 'Arwic' },
  { id: 'zhongli', name: 'Zhongli' },
  { id: 'boss', name: 'Boss Parla' },
];

/** Marka adından monogram üretir (logo placeholder). */
function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü0-9 ]/g, '').trim();
  const words = cleaned.split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return cleaned.slice(0, 2).toUpperCase();
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-8 h-px bg-accent" />
        <span className="text-accent text-[11px] font-bold tracking-[0.16em] uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-text-muted text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  );
}

function FeaturedCard({ brand }: { brand: FeaturedBrand }) {
  const { locale } = useLanguage();
  const desc = locale === 'en' ? brand.descEn : brand.descTr;
  const origin = locale === 'en' ? brand.originEn : brand.originTr;

  return (
    <article className="group relative flex flex-col bg-surface border border-border rounded-sm overflow-hidden hover:border-primary hover:shadow-md transition-all duration-200">
      {/* Logo / görsel alanı */}
      <div className="relative h-44 flex items-center justify-center bg-white border-b border-border overflow-hidden p-8">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="relative object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 z-10 text-[10px] font-bold tracking-[0.1em] uppercase text-text-subtle bg-surface border border-border px-2 py-0.5 rounded-sm">
          {origin}
        </span>
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-black text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-150">
          {brand.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
      </div>

      {/* Alt accent çizgi (hover) */}
      <div className="h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </article>
  );
}

function LogoTile({ brand }: { brand: SimpleBrand }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-2.5 aspect-square bg-surface border border-border rounded-sm p-3 hover:border-primary hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150">
      <span className="font-display font-black text-2xl text-primary/20 group-hover:text-accent/50 transition-colors duration-200 select-none">
        {monogram(brand.name)}
      </span>
      <span className="text-[11px] font-semibold text-text-muted group-hover:text-primary transition-colors duration-150 text-center leading-tight">
        {brand.name}
      </span>
    </div>
  );
}

export default function MarkalarPage() {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb items={[{ label: 'Markalarımız', labelKey: 'breadcrumb_brands' }]} />

      {/* Sayfa başlığı */}
      <div className="mb-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-black text-primary tracking-tight mb-3">
          {t('markalar_title')}
        </h1>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          {t('markalar_description')}
        </p>
      </div>

      {/* Öne Çıkan Markalar */}
      <section className="mb-20 md:mb-28">
        <SectionHeader
          eyebrow={t('markalar_featured_eyebrow')}
          title={t('markalar_featured_title')}
          description={t('markalar_featured_desc')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featuredBrands.map((brand) => (
            <FeaturedCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* Ayırıcı */}
      <div className="border-t border-border mb-16 md:mb-20" />

      {/* Tüm Markalar */}
      <section className="mb-10">
        <SectionHeader
          eyebrow={t('markalar_all_eyebrow')}
          title={t('markalar_all_title')}
          description={t('markalar_all_desc')}
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3 md:gap-4">
          {allBrands.map((brand) => (
            <LogoTile key={brand.id} brand={brand} />
          ))}
        </div>
      </section>
    </>
  );
}
