import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { WhyRNC } from '@/components/home/WhyRNC';
import { BrandsStrip } from '@/components/home/BrandsStrip';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <CategoryGrid />
      <WhyRNC />
      <BrandsStrip />
      <ContactCTA />
    </>
  );
}
