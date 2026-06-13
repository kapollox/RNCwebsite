import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutMissionVision } from '@/components/about/AboutMissionVision';
import { AboutProcess } from '@/components/about/AboutProcess';
import { AboutOperations } from '@/components/about/AboutOperations';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'Hakkımızda | RNC Motor',
  description:
    'RNC Motor, Honda motosiklet yedek parça tedariğinde 10 yılı aşkın deneyimiyle güvenilir yönlendirme ve hızlı iletişim sunan kurumsal bir tedarik firmasıdır.',
};

export default function HakkimizdaPage() {
  return (
    <>
      <AboutHero />
      <AboutMissionVision />
      <AboutProcess />
      <AboutOperations />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
