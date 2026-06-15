'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const BRANDS = [
  { id: 'rks',     name: 'RKS Motor',   logo: '/images/brands/rks.jpeg',     featured: true  },
  { id: 'kuba',    name: 'Kuba Motor',   logo: '/images/brands/kuba.png',     featured: true  },
  { id: 'mondial', name: 'Mondial',      logo: '/images/brands/mondial.jpeg', featured: false },
  { id: 'arora',   name: 'Arora',        logo: '/images/brands/arora.jpg',    featured: false },
  { id: 'yuki',    name: 'Yuki',         logo: '/images/brands/yuki.png',     featured: false },
];

export function BrandsStrip() {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-[#f4f6f8] border-b border-[#e2e8f0]">
      <div className="container-main py-14 md:py-16">

        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-accent shrink-0" />
              <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
                {t('markalar_featured_eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-black text-primary text-2xl md:text-3xl leading-tight tracking-tight">
              {t('markalar_featured_title')}
            </h2>
            <p className="text-text-muted text-sm mt-2 max-w-lg">
              {t('markalar_featured_desc')}
            </p>
          </div>
          <Link
            href="/markalar"
            className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors whitespace-nowrap shrink-0"
          >
            {locale === 'en' ? 'All Brands' : 'Tüm Markalar'}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href="/markalar"
              className="group relative flex flex-col items-center justify-center bg-white border border-[#e2e8f0] rounded-[4px] hover:border-accent hover:shadow-[0_4px_20px_rgba(230,57,70,0.08)] transition-all duration-200 overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Logo */}
              <div className="relative w-full h-full p-5">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Hover alt çizgi */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />

              {/* Marka adı — hover'da görünür */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-accent/[0.03] transition-colors duration-200 flex items-end justify-center pb-2.5 opacity-0 group-hover:opacity-100">
                <span className="text-[10px] font-bold text-accent tracking-wide">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
