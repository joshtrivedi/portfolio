'use client';

import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z
const FACES = [
  { color: '#2563eb', label: '',      section: 'skills' },
  { color: '#16a34a', label: '',    section: 'projects' },
  { color: '#f1f5f9', label: '',       section: 'about' },
  { color: '#ca8a04', label: '',  section: 'experience' },
  { color: '#dc2626', label: '',        section: 'home' },
  { color: '#ea580c', label: '',     section: 'contact' },
];

const INNER = '#111827';
const GAP = 1.02;
const SIZE = 0.94;

const CUBIES: { pos: [number, number, number]; colors: string[] }[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      CUBIES.push({
        pos: [x * GAP, y * GAP, z * GAP],
        colors: [
          x === 1  ? FACES[0].color : INNER,
          x === -1 ? FACES[1].color : INNER,
          y === 1  ? FACES[2].color : INNER,
          y === -1 ? FACES[3].color : INNER,
          z === 1  ? FACES[4].color : INNER,
          z === -1 ? FACES[5].color : INNER,
        ],
      });
    }
  }
}

const LABELS = [
  { pos: [1.65, 0, 0]  as [number,number,number], label: 'Skills',     dark: false },
  { pos: [-1.65, 0, 0] as [number,number,number], label: 'Projects',   dark: false },
  { pos: [0, 1.65, 0]  as [number,number,number], label: 'About',      dark: true  },
  { pos: [0, -1.65, 0] as [number,number,number], label: 'Experience', dark: true  },
  { pos: [0, 0, 1.65]  as [number,number,number], label: 'Home',       dark: false },
  { pos: [0, 0, -1.65] as [number,number,number], label: 'Contact',    dark: false },
];

function resolveFace(face: THREE.Face, object: THREE.Object3D): string {
  const n = face.normal.clone().transformDirection(object.matrixWorld);
  const ax = Math.abs(n.x), ay = Math.abs(n.y), az = Math.abs(n.z);
  if (ax >= ay && ax >= az) return n.x > 0 ? 'skills'     : 'projects';
  if (ay >= ax && ay >= az) return n.y > 0 ? 'about'      : 'experience';
  return n.z > 0                            ? 'home'       : 'contact';
}

interface SceneProps {
  onNavigate: (section: string) => void;
  hoveredFace: string | null;
  setHoveredFace: (f: string | null) => void;
}

function Scene({ onNavigate, hoveredFace, setHoveredFace }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const mats = useRef(
    CUBIES.map((c) =>
      c.colors.map((col) => new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, metalness: 0.05 }))
    )
  );

  useFrame(() => {
    if (!groupRef.current || dragging.current) return;
    groupRef.current.rotation.y += 0.004;
    groupRef.current.rotation.x += 0.0015;
  });

  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    moved.current = false;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current) return;
    if (dragging.current) {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
      groupRef.current.rotation.y += dx * 0.009;
      groupRef.current.rotation.x += dy * 0.009;
      last.current = { x: e.clientX, y: e.clientY };
    } else if (e.face) {
      setHoveredFace(resolveFace(e.face, e.object));
    }
  }, [setHoveredFace]);

  const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    if (!moved.current && e.face) onNavigate(resolveFace(e.face, e.object));
    dragging.current = false;
  }, [onNavigate]);

  const onPointerOut = useCallback(() => {
    if (!dragging.current) setHoveredFace(null);
  }, [setHoveredFace]);

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
    >
      {CUBIES.map((cubie, i) => (
        <mesh key={i} position={cubie.pos} material={mats.current[i]}>
          <boxGeometry args={[SIZE, SIZE, SIZE]} />
        </mesh>
      ))}

      {LABELS.map((lbl) => (
        <Html key={lbl.label} position={lbl.pos} center occlude={false}>
          <div
            style={{
              padding: '1px 5px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: hoveredFace === lbl.label.toLowerCase() ? '#ffd700' : (lbl.dark ? '#111' : '#fff'),
              pointerEvents: 'none',
              userSelect: 'none',
              textShadow: lbl.dark ? 'none' : '0 1px 3px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

interface RubiksCubeProps {
  onNavigate?: (section: string) => void;
}

export default function RubiksCube({ onNavigate }: RubiksCubeProps) {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  const handleNavigate = useCallback((section: string) => {
    if (onNavigate) { onNavigate(section); return; }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [onNavigate]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ cursor: hoveredFace ? 'pointer' : 'grab' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-4, -3, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 6, -4]} intensity={0.4} color="#3b82f6" />

        <Scene
          onNavigate={handleNavigate}
          hoveredFace={hoveredFace}
          setHoveredFace={setHoveredFace}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.68rem',
        color: '#475569',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '0.04em',
      }}>
        drag · click a face to navigate
      </div>
    </div>
  );
}
