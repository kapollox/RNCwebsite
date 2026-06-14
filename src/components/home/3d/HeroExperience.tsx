'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingScreen } from './LoadingScreen';
import { ScrollSections, StatBar } from './ScrollSections';
import { SCROLL_STATES, SCROLL_STATES_MOBILE } from './TireScene';

gsap.registerPlugin(ScrollTrigger);

const TireScene = dynamic(
  () => import('./TireScene').then((m) => ({ default: m.TireScene })),
  { ssr: false }
);

// ─────────────────────────────────────────────
const SECTION_COUNT = SCROLL_STATES.length; // 6
const TOTAL_HEIGHT_VH = SECTION_COUNT * 100;

type Proxy = {
  posX: number; posY: number; posZ: number;
  rotX: number; rotY: number; rotZ: number;
  scale: number;
};

interface AnyState {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

function stateToProxy(states: readonly AnyState[], idx = 0): Proxy {
  const s = states[idx];
  return {
    posX: s.position[0], posY: s.position[1], posZ: s.position[2],
    rotX: s.rotation[0], rotY: s.rotation[1], rotZ: s.rotation[2],
    scale: s.scale,
  };
}

// ─────────────────────────────────────────────
export function HeroExperience() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const textWrapRef   = useRef<HTMLDivElement>(null);
  const proxyRef      = useRef<Proxy>(stateToProxy(SCROLL_STATES));
  const isMobileRef   = useRef(false);

  const [activeIndex,  setActiveIndex]  = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [phase, setPhase]               = useState<'loading' | 'intro' | 'scroll'>('loading');
  const [sceneLoaded,  setSceneLoaded]  = useState(false);

  // ── Phase 1: Loading ──────────────────────────
  useEffect(() => {
    let raf: number;
    let p = 0;
    const tick = () => {
      p = Math.min(p + (sceneLoaded ? 12 : 0.7), 100);
      setLoadProgress(p);
      if (p >= 100) {
        setTimeout(() => setPhase('intro'), 350);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sceneLoaded]);

  // ── Phase 2: Intro animation ──────────────────
  useEffect(() => {
    if (phase !== 'intro') return;
    isMobileRef.current = window.innerWidth < 768;
    const states: AnyState[] = isMobileRef.current ? SCROLL_STATES_MOBILE : [...SCROLL_STATES];

    // Proxy'yi ilk state'e ayarla
    Object.assign(proxyRef.current, stateToProxy(states, 0));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setPhase('scroll') });

      tl.fromTo(
        canvasWrapRef.current,
        { opacity: 0, scale: 0.93 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' },
        0
      );
      // Model'i intro sırasında hero state'ine çek (proxy üzerinden)
      tl.to(
        proxyRef.current,
        {
          posX: states[0].position[0],
          posY: states[0].position[1],
          posZ: states[0].position[2],
          rotX: states[0].rotation[0],
          rotY: states[0].rotation[1],
          rotZ: states[0].rotation[2],
          scale: states[0].scale,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        0.2
      );
      tl.fromTo(
        textWrapRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        0.9
      );
    });

    return () => ctx.revert();
  }, [phase]);

  // ── Phase 3: Scroll timeline ──────────────────
  useEffect(() => {
    if (phase !== 'scroll') return;
    const states: AnyState[] = isMobileRef.current ? SCROLL_STATES_MOBILE : [...SCROLL_STATES];
    const segDur = 1 / (SECTION_COUNT - 1);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
          onUpdate: (self) => {
            const raw = self.progress * (SECTION_COUNT - 1);
            setActiveIndex(Math.min(SECTION_COUNT - 1, Math.floor(raw + 0.4)));
          },
        },
      });

      states.forEach((state, i) => {
        if (i === 0) return;
        tl.to(
          proxyRef.current,
          {
            posX: state.position[0],
            posY: state.position[1],
            posZ: state.position[2],
            rotX: state.rotation[0],
            rotY: state.rotation[1],
            rotZ: state.rotation[2],
            scale: state.scale,
            ease: 'none',
            duration: segDur,
          },
          (i - 1) * segDur
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [phase]);

  return (
    <>
      <LoadingScreen progress={loadProgress} isReady={phase !== 'loading'} />

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_HEIGHT_VH}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ backgroundColor: '#f3f3f3' }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />

          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ff3b30] z-30" />

          {/* Section dots */}
          <div className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
            {SCROLL_STATES.map((s, i) => (
              <div
                key={s.id}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeIndex ? '7px' : '4px',
                  height: i === activeIndex ? '7px' : '4px',
                  backgroundColor: i === activeIndex ? '#ff3b30' : 'rgba(0,0,0,0.18)',
                }}
              />
            ))}
          </div>

          {/* ── CANVAS — full viewport ── */}
          <div
            ref={canvasWrapRef}
            className="absolute inset-0 z-10"
            style={{ opacity: phase === 'loading' ? 0 : 1 }}
          >
            <Suspense fallback={null}>
              <TireScene
                proxyRef={proxyRef}
                isMobile={isMobileRef.current}
                onLoaded={() => setSceneLoaded(true)}
              />
            </Suspense>
          </div>

          {/* ── SOL-ALT gradient maskesi — metin okunurluğu ── */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: [
                'linear-gradient(to right, rgba(243,243,243,0.92) 0%, rgba(243,243,243,0.7) 38%, rgba(243,243,243,0) 62%)',
                'linear-gradient(to top,   rgba(243,243,243,0.85) 0%, rgba(243,243,243,0) 35%)',
              ].join(', '),
            }}
          />

          {/* ── METİN — sol-alt overlay ── */}
          <div
            ref={textWrapRef}
            className="absolute inset-0 z-20 flex items-end lg:items-center pointer-events-none"
            style={{ opacity: phase === 'loading' ? 0 : 1 }}
          >
            <div className="w-full max-w-lg px-6 sm:px-10 md:px-12 lg:px-16 pb-16 lg:pb-0 pointer-events-auto">
              <ScrollSections activeIndex={activeIndex} />
              {activeIndex === 0 && (
                <div className="mt-6">
                  <StatBar />
                </div>
              )}
            </div>
          </div>

          {/* Scroll hint */}
          {activeIndex === 0 && phase === 'scroll' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1.5 pointer-events-none">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-black/25">scroll</span>
              <div className="w-px h-7 bg-gradient-to-b from-black/20 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
