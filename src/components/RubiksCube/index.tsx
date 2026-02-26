'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────
const GAP = 1.05;
const STICKER_SIZE = 0.82;
const PLASTIC = '#050505';
const MOVE_SPEED = 4.5;

const FACE_COLORS: Record<string, string> = {
  '+x': '#1a6fce',
  '-x': '#16a34a',
  '+y': '#f8f8f8',
  '-y': '#eab308',
  '+z': '#dc2626',
  '-z': '#ea580c',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Axis = 'x' | 'y' | 'z';
interface Move { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 }
interface CubieData {
  gridPos: [number, number, number];
  faceColors: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildInitialCubies(): CubieData[] {
  const cubies: CubieData[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubies.push({
          gridPos: [x, y, z],
          faceColors: [
            x === 1  ? FACE_COLORS['+x'] : PLASTIC,
            x === -1 ? FACE_COLORS['-x'] : PLASTIC,
            y === 1  ? FACE_COLORS['+y'] : PLASTIC,
            y === -1 ? FACE_COLORS['-y'] : PLASTIC,
            z === 1  ? FACE_COLORS['+z'] : PLASTIC,
            z === -1 ? FACE_COLORS['-z'] : PLASTIC,
          ],
        });
      }
    }
  }
  return cubies;
}

function rotateGridPos(
  pos: [number, number, number],
  axis: Axis,
  dir: 1 | -1,
): [number, number, number] {
  const [x, y, z] = pos;
  if (axis === 'y') return dir === 1 ? [z, y, -x]  : [-z, y, x];
  if (axis === 'x') return dir === 1 ? [x, -z, y]  : [x, z, -y];
  return                 dir === 1 ? [-y, x, z]  : [y, -x, z];
}

function remapColors(colors: string[], axis: Axis, dir: 1 | -1): string[] {
  const c = colors;
  if (axis === 'y') return dir === 1 ? [c[4],c[5],c[2],c[3],c[1],c[0]] : [c[5],c[4],c[2],c[3],c[0],c[1]];
  if (axis === 'x') return dir === 1 ? [c[0],c[1],c[5],c[4],c[2],c[3]] : [c[0],c[1],c[4],c[5],c[3],c[2]];
  return               dir === 1 ? [c[3],c[2],c[0],c[1],c[4],c[5]] : [c[2],c[3],c[1],c[0],c[4],c[5]];
}

function axisIndex(axis: Axis): 0 | 1 | 2 {
  return axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
}

function randomMoves(n: number): Move[] {
  const axes: Axis[] = ['x', 'y', 'z'];
  const layers: (-1 | 0 | 1)[] = [-1, 1];
  const dirs: (1 | -1)[] = [1, -1];
  return Array.from({ length: n }, () => ({
    axis: axes[Math.floor(Math.random() * 3)],
    layer: layers[Math.floor(Math.random() * 2)],
    dir: dirs[Math.floor(Math.random() * 2)],
  }));
}

function invertMove(m: Move): Move {
  return { ...m, dir: (m.dir === 1 ? -1 : 1) as 1 | -1 };
}

// ─── Scene ────────────────────────────────────────────────────────────────────
interface SceneProps {
  scrambleSignal: number;
  solveSignal: number;
  onStateChange: (state: 'idle' | 'animating') => void;
}

function Scene({ scrambleSignal, solveSignal, onStateChange }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cubieData = useRef<CubieData[]>(buildInitialCubies());

  const moveQueue = useRef<Move[]>([]);
  const solveSequence = useRef<Move[]>([]);
  const currentMove = useRef<Move | null>(null);
  const moveProgress = useRef(0);
  const movingIndices = useRef<number[]>([]);
  const startPositions = useRef<THREE.Vector3[]>([]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(27).fill(null));

  const matRefs = useRef<THREE.MeshPhysicalMaterial[][]>(
    cubieData.current.map((c) =>
      c.faceColors.map(
        (col) =>
          new THREE.MeshPhysicalMaterial({
            color: col,
            roughness: col === PLASTIC ? 0.5 : 0.15,
            metalness: 0.0,
            clearcoat: col === PLASTIC ? 0 : 1.0,
            clearcoatRoughness: 0.08,
          })
      )
    )
  );

  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scrambleSignal === 0) return;
    const moves = randomMoves(18);
    solveSequence.current = [...solveSequence.current, ...moves];
    moveQueue.current = [...moveQueue.current, ...moves];
  }, [scrambleSignal]);

  useEffect(() => {
    if (solveSignal === 0) return;
    const inverse = solveSequence.current.map(invertMove).reverse();
    moveQueue.current = [...moveQueue.current, ...inverse];
    solveSequence.current = [];
  }, [solveSignal]);

  function syncMaterials() {
    cubieData.current.forEach((cd, i) => {
      cd.faceColors.forEach((col, f) => {
        const mat = matRefs.current[i]?.[f];
        if (!mat) return;
        mat.color.set(col);
        mat.clearcoat = col === PLASTIC ? 0 : 1.0;
        mat.roughness = col === PLASTIC ? 0.5 : 0.15;
        mat.needsUpdate = true;
      });
    });
  }

  useFrame((_, delta) => {
    if (groupRef.current && !dragging.current && !currentMove.current && moveQueue.current.length === 0) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x += 0.0015;
    }

    if (!currentMove.current && moveQueue.current.length > 0) {
      const move = moveQueue.current.shift()!;
      currentMove.current = move;
      moveProgress.current = 0;
      onStateChange('animating');

      const ai = axisIndex(move.axis);
      movingIndices.current = cubieData.current
        .map((c, i) => (c.gridPos[ai] === move.layer ? i : -1))
        .filter((i) => i !== -1);

      startPositions.current = movingIndices.current.map((i) => {
        const [gx, gy, gz] = cubieData.current[i].gridPos;
        return new THREE.Vector3(gx * GAP, gy * GAP, gz * GAP);
      });
    }

    if (currentMove.current) {
      moveProgress.current = Math.min(1, moveProgress.current + delta * MOVE_SPEED);
      const angle = (moveProgress.current * Math.PI * 0.5) * currentMove.current.dir;

      const axisVec = new THREE.Vector3(
        currentMove.current.axis === 'x' ? 1 : 0,
        currentMove.current.axis === 'y' ? 1 : 0,
        currentMove.current.axis === 'z' ? 1 : 0,
      );
      const rotQuat = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);

      movingIndices.current.forEach((ci, idx) => {
        const mesh = meshRefs.current[ci];
        if (!mesh) return;
        mesh.position.copy(startPositions.current[idx].clone().applyQuaternion(rotQuat));
        mesh.quaternion.copy(rotQuat);
      });

      if (moveProgress.current >= 1) {
        const { axis, dir } = currentMove.current;
        movingIndices.current.forEach((ci) => {
          const mesh = meshRefs.current[ci];
          const cd = cubieData.current[ci];
          cd.gridPos = rotateGridPos(cd.gridPos, axis, dir);
          if (mesh) {
            mesh.position.set(cd.gridPos[0] * GAP, cd.gridPos[1] * GAP, cd.gridPos[2] * GAP);
            mesh.quaternion.identity();
          }
          cd.faceColors = remapColors(cd.faceColors, axis, dir);
        });
        syncMaterials();
        currentMove.current = null;
        if (moveQueue.current.length === 0) onStateChange('idle');
      }
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    moved.current = false;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current || !dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
    groupRef.current.rotation.y += dx * 0.009;
    groupRef.current.rotation.x += dy * 0.009;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragging.current = false;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {cubieData.current.map((cubie, i) => (
        <mesh
          key={i}
          ref={(m) => { meshRefs.current[i] = m; }}
          position={[cubie.gridPos[0] * GAP, cubie.gridPos[1] * GAP, cubie.gridPos[2] * GAP]}
          material={matRefs.current[i]}
        >
          <boxGeometry args={[STICKER_SIZE, STICKER_SIZE, STICKER_SIZE]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
interface RubiksCubeProps {
  scrambleSignal?: number;
  solveSignal?: number;
  onStateChange?: (state: 'idle' | 'animating') => void;
}

export default function RubiksCube({
  scrambleSignal = 0,
  solveSignal = 0,
  onStateChange = () => {},
}: RubiksCubeProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      style={{ cursor: 'grab', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={2.0} />
      <pointLight position={[-5, -4, -5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 7, -4]} intensity={0.3} color="#16e0bd" />
      <Scene
        scrambleSignal={scrambleSignal}
        solveSignal={solveSignal}
        onStateChange={onStateChange}
      />
    </Canvas>
  );
}
