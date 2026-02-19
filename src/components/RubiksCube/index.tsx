'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Face config: index maps to Three.js BoxGeometry face order
// BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z
const FACE_CONFIG = [
  { dir: '+x', color: '#2563eb', label: 'Skills',      section: 'skills' },      // Right  – Blue
  { dir: '-x', color: '#16a34a', label: 'Projects',    section: 'projects' },    // Left   – Green
  { dir: '+y', color: '#f1f5f9', label: 'About',       section: 'about' },       // Top    – White
  { dir: '-y', color: '#ca8a04', label: 'Experience',  section: 'experience' },  // Bottom – Yellow
  { dir: '+z', color: '#dc2626', label: 'Home',        section: 'home' },        // Front  – Red
  { dir: '-z', color: '#ea580c', label: 'Contact',     section: 'contact' },     // Back   – Orange
];

// Returns material colors for a cubie at grid position (x, y, z)
function getCubieMaterials(gx: number, gy: number, gz: number): THREE.MeshStandardMaterial[] {
  const inner = '#111827';
  return [
    new THREE.MeshStandardMaterial({ color: gx === 1  ? FACE_CONFIG[0].color : inner, roughness: 0.15, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: gx === -1 ? FACE_CONFIG[1].color : inner, roughness: 0.15, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: gy === 1  ? FACE_CONFIG[2].color : inner, roughness: 0.15, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: gy === -1 ? FACE_CONFIG[3].color : inner, roughness: 0.15, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: gz === 1  ? FACE_CONFIG[4].color : inner, roughness: 0.15, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: gz === -1 ? FACE_CONFIG[5].color : inner, roughness: 0.15, metalness: 0.1 }),
  ];
}

// Face label positions and orientations for the outer face centers
const FACE_LABELS = [
  { position: [1.55, 0, 0]  as [number,number,number], rotation: [0, Math.PI / 2, 0]  as [number,number,number], label: 'Skills',     color: '#fff' },
  { position: [-1.55, 0, 0] as [number,number,number], rotation: [0, -Math.PI / 2, 0] as [number,number,number], label: 'Projects',   color: '#fff' },
  { position: [0, 1.55, 0]  as [number,number,number], rotation: [-Math.PI / 2, 0, 0] as [number,number,number], label: 'About',      color: '#111' },
  { position: [0, -1.55, 0] as [number,number,number], rotation: [Math.PI / 2, 0, 0]  as [number,number,number], label: 'Experience', color: '#111' },
  { position: [0, 0, 1.55]  as [number,number,number], rotation: [0, 0, 0]             as [number,number,number], label: 'Home',       color: '#fff' },
  { position: [0, 0, -1.55] as [number,number,number], rotation: [0, Math.PI, 0]       as [number,number,number], label: 'Contact',    color: '#fff' },
];

interface CubeProps {
  onFaceClick: (section: string) => void;
  hoveredFace: string | null;
  setHoveredFace: (face: string | null) => void;
}

function RubiksCubeGroup({ onFaceClick, hoveredFace, setHoveredFace }: CubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const mouseStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  // Build 27 cubies
  const cubies = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubies.push({ x, y, z, materials: getCubieMaterials(x, y, z) });
      }
    }
  }

  const gap = 1.02;
  const size = 0.94;

  // Detect which outer face was clicked via raycasting
  const handlePointerUp = useCallback(
    (e: THREE.Event) => {
      if (mouseMoved.current) return;
      const event = e as unknown as { point: THREE.Vector3; face: THREE.Face | null; object: THREE.Mesh };
      if (!event.face || !groupRef.current) return;

      const normal = event.face.normal.clone();
      normal.transformDirection(event.object.matrixWorld);

      const absX = Math.abs(normal.x);
      const absY = Math.abs(normal.y);
      const absZ = Math.abs(normal.z);

      let section = '';
      if (absX >= absY && absX >= absZ) section = normal.x > 0 ? 'skills' : 'projects';
      else if (absY >= absX && absY >= absZ) section = normal.y > 0 ? 'about' : 'experience';
      else section = normal.z > 0 ? 'home' : 'contact';

      onFaceClick(section);
    },
    [onFaceClick]
  );

  // Hover detection
  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      const event = e as unknown as { face: THREE.Face | null; object: THREE.Mesh };
      if (!event.face) { setHoveredFace(null); return; }
      const normal = event.face.normal.clone();
      normal.transformDirection(event.object.matrixWorld);
      const absX = Math.abs(normal.x);
      const absY = Math.abs(normal.y);
      const absZ = Math.abs(normal.z);
      let face = '';
      if (absX >= absY && absX >= absZ) face = normal.x > 0 ? 'skills' : 'projects';
      else if (absY >= absX && absY >= absZ) face = normal.y > 0 ? 'about' : 'experience';
      else face = normal.z > 0 ? 'home' : 'contact';
      setHoveredFace(face);
    },
    [setHoveredFace]
  );

  // Mouse drag handlers on the canvas element
  useEffect(() => {
    const canvas = gl.domElement;
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      mouseMoved.current = false;
      mouseStart.current = { x: e.clientX, y: e.clientY };
      rotationVelocity.current = { x: 0, y: 0 };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !groupRef.current) return;
      const dx = e.clientX - mouseStart.current.x;
      const dy = e.clientY - mouseStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) mouseMoved.current = true;
      rotationVelocity.current = { x: dy * 0.008, y: dx * 0.008 };
      groupRef.current.rotation.y += dx * 0.008;
      groupRef.current.rotation.x += dy * 0.008;
      mouseStart.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      mouseMoved.current = false;
      mouseStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !groupRef.current) return;
      const dx = e.touches[0].clientX - mouseStart.current.x;
      const dy = e.touches[0].clientY - mouseStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) mouseMoved.current = true;
      groupRef.current.rotation.y += dx * 0.008;
      groupRef.current.rotation.x += dy * 0.008;
      mouseStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDragging.current = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [gl]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (!isDragging.current) {
      // Auto-rotate when idle
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
      // Decay velocity
      rotationVelocity.current.x *= 0.95;
      rotationVelocity.current.y *= 0.95;
    }
  });

  return (
    <group ref={groupRef}>
      {cubies.map(({ x, y, z, materials }) => (
        <mesh
          key={`${x}-${y}-${z}`}
          position={[x * gap, y * gap, z * gap]}
          material={materials}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerOut={() => setHoveredFace(null)}
        >
          <boxGeometry args={[size, size, size]} />
        </mesh>
      ))}

      {/* Face labels on outer face centers */}
      {FACE_LABELS.map((faceLabel) => (
        <Text
          key={faceLabel.label}
          position={faceLabel.position}
          rotation={faceLabel.rotation}
          fontSize={0.18}
          color={hoveredFace === faceLabel.label.toLowerCase() ? '#ffd700' : faceLabel.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.01}
          outlineColor="#00000040"
        >
          {faceLabel.label}
        </Text>
      ))}
    </group>
  );
}

interface RubiksCubeProps {
  onNavigate?: (section: string) => void;
}

export default function RubiksCube({ onNavigate }: RubiksCubeProps) {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleFaceClick = useCallback(
    (section: string) => {
      if (onNavigate) {
        onNavigate(section);
      } else {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [onNavigate]
  );

  useEffect(() => {
    setTooltip(hoveredFace ? `Go to ${FACE_LABELS.find(f => f.label.toLowerCase() === hoveredFace)?.label ?? hoveredFace}` : null);
  }, [hoveredFace]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ cursor: hoveredFace ? 'pointer' : 'grab' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#3b82f6" />

        <RubiksCubeGroup
          onFaceClick={handleFaceClick}
          hoveredFace={hoveredFace}
          setHoveredFace={setHoveredFace}
        />
      </Canvas>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 22, 40, 0.95)',
            border: '1px solid #1a2744',
            borderRadius: 8,
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            color: '#94a3b8',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip}
        </div>
      )}

      {/* Hint */}
      <div
        className="cube-hint"
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.7rem',
          color: '#475569',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
        }}
      >
        drag to rotate • click a face to navigate
      </div>
    </div>
  );
}
