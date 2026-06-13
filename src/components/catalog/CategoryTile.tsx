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
  image?: string;
  iconName?: string;
  badge?: string;
  description?: string;
}

export function CategoryTile({
  name,
  href,
  image,
  iconName,
  badge,
  description,
}: CategoryTileProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!image && !imgError;
  const IconComponent = iconName ? ICON_MAP[iconName] : null;

  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-surface border border-border rounded-sm overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-200"
    >
      {/* Visual area — white bg for product shots, contain so nothing is cropped */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {showImage ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={90}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: '#F8FAFC',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="absolute top-0 left-0 w-[3px] h-10 bg-accent opacity-50" />
            {IconComponent ? (
              <div className="w-20 h-20 rounded-sm bg-white border border-border shadow-sm flex items-center justify-center group-hover:border-accent group-hover:bg-rose-50 transition-colors duration-200">
                <IconComponent size={36} className="text-accent" strokeWidth={1.25} />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-sm bg-white border border-border shadow-sm flex items-center justify-center">
                <span className="text-[11px] font-mono tracking-wider text-text-subtle uppercase select-none">
                  {name.substring(0, 3)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text area */}
      <div className="flex-1 p-4 flex flex-col gap-1 border-t border-border bg-surface group-hover:bg-surface-muted transition-colors duration-150">
        <h3 className="font-display font-bold text-primary text-sm leading-snug group-hover:text-accent transition-colors duration-150 line-clamp-2">
          {name}
        </h3>
        {description && (
          <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          {badge && (
            <span className="text-[10px] text-text-subtle font-medium">{badge}</span>
          )}
          <ArrowRight
            size={14}
            className="shrink-0 text-text-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150 ml-auto"
          />
        </div>
      </div>
    </Link>
  );
}
