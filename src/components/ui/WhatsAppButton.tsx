import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '905XXXXXXXXX'; // Gerçek numara buraya girilecek
const DEFAULT_MESSAGE =
  'Merhaba, Honda motosikletim için parça sorgulamak istiyorum. Model / yıl / parça adı bilgilerini paylaşacağım.';

interface WhatsAppButtonProps {
  message?: string;
  partName?: string;
  partNumber?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function WhatsAppButton({
  message,
  partName,
  partNumber,
  size = 'md',
  className,
  label,
}: WhatsAppButtonProps) {
  const finalMessage =
    message ??
    (partName && partNumber
      ? `Merhaba, "${partName}" (Parça No: ${partNumber}) hakkında bilgi almak istiyorum.`
      : DEFAULT_MESSAGE);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  };

  return (
    <a
      href={buildWhatsAppUrl(finalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-sm',
        'bg-whatsapp text-white hover:bg-whatsapp-dark',
        'transition-colors duration-150 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2',
        sizeClasses[size],
        className
      )}
    >
      <MessageCircle className="shrink-0" size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
      {label ?? 'WhatsApp\'tan Sor'}
    </a>
  );
}

/* Floating WhatsApp button — fixed bottom-right corner */
export function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center w-14 h-14 rounded-full',
        'bg-whatsapp text-white hover:bg-whatsapp-dark',
        'shadow-lg hover:shadow-xl transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2'
      )}
    >
      <MessageCircle size={28} />
    </a>
  );
}
