'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
}

export function LoadingScreen({ progress, isReady }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => setFadeOut(true), 300);
      setTimeout(() => setVisible(false), 950);
    }
  }, [isReady]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0a0a0a',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 650ms cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Logo */}
      <div
        className="relative mb-10"
        style={{
          filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.10))',
          opacity: fadeOut ? 0 : 1,
          transform: fadeOut ? 'scale(0.96)' : 'scale(1)',
          transition: 'opacity 500ms ease, transform 500ms ease',
        }}
      >
        <Image
          src="/images/rnclogosu.png"
          alt="RNC Motor"
          width={160}
          height={160}
          priority
          className="object-contain rounded-sm"
          style={{ width: 'auto', height: 'auto', maxWidth: 160, maxHeight: 160 }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-40 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-[#ff3b30] rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 280ms ease-out',
          }}
        />
      </div>

      {/* Yüzde */}
      <span className="mt-3 text-[10px] font-mono tracking-[0.18em] text-white/30 uppercase select-none">
        {Math.round(progress)}%
      </span>
    </div>
  );
}
