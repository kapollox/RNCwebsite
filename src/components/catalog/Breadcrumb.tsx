'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

export interface BreadcrumbItem {
  label: string;
  labelEn?: string;
  labelKey?: TranslationKey;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { t, locale } = useLanguage();

  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-text-muted hover:text-primary transition-colors"
          >
            <Home size={13} />
            <span>{t('breadcrumb_home')}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const resolvedLabel = item.labelKey
            ? t(item.labelKey)
            : (locale === 'en' && item.labelEn ? item.labelEn : item.label);
          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight size={13} className="text-text-subtle shrink-0" />
              {isLast || !item.href ? (
                <span className={isLast ? 'text-primary font-semibold' : 'text-text-muted'}>
                  {resolvedLabel}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  {resolvedLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
