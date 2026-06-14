'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// SCROLL_STATES — tam viewport'a yayılan hareket
// Honda Shadow RS 2010: ~2 birim bbox, orijinde
// ─────────────────────────────────────────────
export const SCROLL_STATES = [
  // 0 — Hero: tam yan profil, sağda konumlanmış
  // rotY = Math.PI/2 → sol yan; model sağa yaslanmış, tüm silüet görünür
  {
    id: 'hero',
    position: [0.8, -0.05, 0] as [number, number, number],
    rotation: [0.03, Math.PI / 2 + 0.05, 0] as [number, number, number],
    scale: 1.45,
  },
  // 1 — 3/4 ön-sol: sola kayar, ön detaylar ortaya çıkmaya başlar
  {
    id: 'threequarter',
    position: [-0.4, 0.0, 0] as [number, number, number],
    rotation: [0.06, Math.PI - 0.55, 0.01] as [number, number, number],
    scale: 1.55,
  },
  // 2 — Close-up sol: yakın çekim, ön-sol detay
  {
    id: 'closeup',
    position: [-1.0, 0.05, 0.3] as [number, number, number],
    rotation: [0.08, Math.PI - 0.28, 0.01] as [number, number, number],
    scale: 1.7,
  },
  // 3 — Tam ön: merkeze oturur, doğrudan karşıdan
  {
    id: 'front',
    position: [0.1, -0.05, 0] as [number, number, number],
    rotation: [0.02, Math.PI, 0] as [number, number, number],
    scale: 1.58,
  },
  // 4 — Hafif sağ-ön: fronttan çıkar, çapraz açıya geçer
  {
    id: 'diagonal',
    position: [0.7, 0.0, 0] as [number, number, number],
    rotation: [0.04, Math.PI + 0.4, -0.01] as [number, number, number],
    scale: 1.52,
  },
  // 5 — Final: ön görünüm, hafif alçak ve merkezi
  // rotY = Math.PI → tam önden, sakin kapanış pozu
  {
    id: 'final',
    position: [0.0, -0.08, 0] as [number, number, number],
    rotation: [0.05, Math.PI, 0] as [number, number, number],
    scale: 1.6,
  },
] as const;

// Mobil state'leri — X daha dar, scale biraz küçük
export const SCROLL_STATES_MOBILE = SCROLL_STATES.map((s) => ({
  ...s,
  position: [s.position[0] * 0.45, s.position[1] * 0.6, s.position[2]] as [number, number, number],
  scale: s.scale * 0.82,
}));

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─────────────────────────────────────────────
// Model
// ─────────────────────────────────────────────
type Proxy = {
  posX: number; posY: number; posZ: number;
  rotX: number; rotY: number; rotZ: number;
  scale: number;
};

interface BikeModelProps {
  proxyRef: React.MutableRefObject<Proxy>;
}

function BikeModel({ proxyRef }: BikeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/honda_shadow_rs_2010.glb');

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const p = proxyRef.current;
    // Soft damping — scrub:1.5 zaten proxy'yi yavaşlatıyor,
    // model tarafında hafif ek yumuşatma yeterli
    const ease = 1 - Math.pow(0.06, delta);

    groupRef.current.position.x = lerp(groupRef.current.position.x, p.posX, ease);
    groupRef.current.position.y = lerp(groupRef.current.position.y, p.posY, ease);
    groupRef.current.position.z = lerp(groupRef.current.position.z, p.posZ, ease);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, p.rotX, ease);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, p.rotY, ease);
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, p.rotZ, ease);
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, p.scale, ease));
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// ─────────────────────────────────────────────
// Lights — off-white bg için (F3F3F3)
// ─────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.6} />
      {/* Ana key — üst sağ */}
      <directionalLight position={[5, 7, 3]} intensity={2.0} color="#ffffff" />
      {/* Ön fill */}
      <directionalLight position={[-2, 0, 6]} intensity={0.7} color="#f5f5f5" />
      {/* Sol krom vurgusu */}
      <pointLight position={[-5, 4, 1]} intensity={0.9} color="#ffffff" />
      {/* Alt kırmızı accent */}
      <pointLight position={[0, -4, 0]} intensity={0.6} color="#ff3b30" />
    </>
  );
}

// ─────────────────────────────────────────────
// Canvas
// ─────────────────────────────────────────────
interface TireSceneProps {
  proxyRef: React.MutableRefObject<Proxy>;
  isMobile: boolean;
  onLoaded: () => void;
}

export function TireScene({ proxyRef, isMobile, onLoaded }: TireSceneProps) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0.15, 4.8], fov: 50 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      onCreated={() => onLoaded()}
    >
      <SceneLights />
      <BikeModel proxyRef={proxyRef} />
      <Environment preset="studio" />
    </Canvas>
  );
}

useGLTF.preload('/models/honda_shadow_rs_2010.glb');
