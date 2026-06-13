'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Lightbulb, MoveVertical, Shield, Settings2,
  Zap, Wind, CircleDot, SlidersHorizontal, Gauge, Lock,
  ShieldCheck, Cog, Package, Cable, Circle, MoveDown,
  Wrench, Link as LinkIcon, Star,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Lightbulb, MoveVertical, Shield, Settings2,
  Zap, Wind, CircleDot, SlidersHorizontal, Gauge, Lock,
  ShieldCheck, Cog, Package, Cable, Circle, MoveDown,
  Wrench, Link: LinkIcon, Star,
};

interface CategoryTileProps {
  name: string;
  href: string;
  iconName?: string;
  imageSlug?: string;
  badge?: string;
  description?: string;
}

export function CategoryTile({
  name,
  href,
  iconName,
  imageSlug,
  badge,
  description,
}: CategoryTileProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!imageSlug && !imgError;
  const IconComponent = iconName ? ICON_MAP[iconName] : null;

  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-surface border border-border rounded-sm overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-200"
    >
      {/* Visual area — slightly taller ratio */}
      <div className="relative aspect-[5/4] overflow-hidden bg-[#F1F5F9]">
        {showImage ? (
          <Image
            src={`/images/categories/${imageSlug}.jpg`}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{
              backgroundColor: '#F1F5F9',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Top-left catalog accent mark */}
            <div className="absolute top-0 left-0 w-[3px] h-10 bg-accent opacity-50" />

            {IconComponent ? (
              <div className="w-20 h-20 rounded-sm bg-white border border-border shadow flex items-center justify-center group-hover:border-accent group-hover:bg-rose-50 transition-colors duration-200">
                <IconComponent size={36} className="text-accent" strokeWidth={1.25} />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-sm bg-white border border-border shadow flex items-center justify-center">
                <span className="text-[11px] font-mono tracking-wider text-text-subtle uppercase select-none">
                  {name.substring(0, 3)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/90 text-[10px] font-semibold text-text-muted rounded-sm border border-border/60 backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Text area — flex-1 ensures equal card height across a row */}
      <div className="flex-1 p-4 flex items-start justify-between gap-2 border-t border-border bg-surface group-hover:bg-surface-muted transition-colors duration-150">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-primary text-sm leading-snug group-hover:text-accent transition-colors duration-150 line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="text-text-muted text-xs mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <ArrowRight
          size={14}
          className="shrink-0 mt-0.5 text-text-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </Link>
  );
}
