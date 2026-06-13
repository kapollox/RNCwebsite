import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { WhyRNC } from '@/components/home/WhyRNC';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <WhyRNC />
      <ContactCTA />
    </>
  );
}
