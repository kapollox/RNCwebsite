import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppButton';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RNC Motor — Honda Motosiklet Yedek Parça',
    template: '%s | RNC Motor',
  },
  description:
    'Honda motosiklet yedek parçasında 10 yılı aşkın deneyim. CB, CBR, CRF, PCX, Forza serilerinde doğru parça bilgisi ve güvenilir yönlendirme. WhatsApp ile hızlı destek.',
  keywords: [
    'Honda motosiklet yedek parça',
    'Honda CB parça',
    'Honda CBR parça',
    'Honda CRF parça',
    'motosiklet fren balatası',
    'motosiklet zincir dişli',
    'RNC Motor',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${hankenGrotesk.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
