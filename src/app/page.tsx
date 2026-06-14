import { HeroExperience } from '@/components/home/3d/HeroExperience';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { WhyRNC } from '@/components/home/WhyRNC';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroExperience />
      <TrustBar />
      <CategoryGrid />
      <WhyRNC />
      <ContactCTA />
    </>
  );
}
