# Teal Redesign & Realistic Rubik's Cube Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the entire portfolio color system from blue/purple to teal/black/white, and rebuild the Rubik's cube as a standalone realistic interactive puzzle with scramble/solve mechanics.

**Architecture:** Full color token swap across all components driven by updated CSS variables in globals.css; RubiksCube rewritten with proper cubie state tracking (gridPos + faceColors), move queue animation, and MeshPhysicalMaterial for glossy plastic look.

**Tech Stack:** Next.js 15, TypeScript, React 19, Three.js, @react-three/fiber, @react-three/drei, Tailwind CSS v3

---

### Task 1: Global CSS — Teal Color System

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace CSS custom properties**

Replace the entire `:root` block (lines 5–19) with:

```css
:root {
  --bg-primary:    #080808;
  --bg-card:       #111111;
  --bg-card-hover: #181818;
  --border:        #1e1e1e;
  --text-primary:  #ffffff;
  --text-secondary:#a0a0a0;
  --text-muted:    #555555;
  --accent:        #16e0bd;
  --accent-dim:    #0fa08a;
  --glow:          rgba(22, 224, 189, 0.12);
}
```

**Step 2: Update utility classes**

Replace `.card:hover` block:
```css
.card:hover {
  border-color: rgba(22, 224, 189, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px var(--glow);
}
```

Replace `.tag`:
```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  background: rgba(22, 224, 189, 0.08);
  color: var(--accent);
  border: 1px solid rgba(22, 224, 189, 0.2);
}
```

Replace `.gradient-text`:
```css
.gradient-text {
  background: linear-gradient(135deg, var(--accent), #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Replace scrollbar thumb hover:
```css
::-webkit-scrollbar-thumb:hover { background: var(--accent); }
```

Replace selection highlight:
```css
::selection { background: rgba(22, 224, 189, 0.25); color: var(--text-primary); }
```

**Step 3: Verify visually**

Run `npm run dev` from `Projects/portfolio/` and open http://localhost:3000. The page background should be near-black (#080808), all gradient text should shift from blue/purple to teal/white. Cards should glow teal on hover.

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style: migrate color system to teal/black/white palette"
```

---

### Task 2: profile.ts — Update Skill Category Colors

**Files:**
- Modify: `src/data/profile.ts`

**Step 1: Update the `color` field for each skill category**

The 6 skill categories currently use blue/purple. Replace with a teal-based family:

| Category | Old color | New color |
|---|---|---|
| AI / ML | `#8b5cf6` | `#16e0bd` |
| Full-Stack | `#3b82f6` | `#0fa08a` |
| Mobile | `#22d3ee` | `#5eead4` |
| DevOps / Cloud | `#f59e0b` | `#2dd4bf` |
| Databases | `#ef4444` | `#14b8a6` |
| Languages | `#10b981` | `#99f6e4` |

Find each `color:` field in the `skills` array and apply the replacement above.

**Step 2: Commit**

```bash
git add src/data/profile.ts
git commit -m "style: update skill category colors to teal palette"
```

---

### Task 3: Navigation.tsx — Color Sweep

**Files:**
- Modify: `src/components/Navigation.tsx`

**Step 1: Replace all hardcoded blue/purple values**

| Location | Old value | New value |
|---|---|---|
| `background` when scrolled (line 46) | `rgba(5, 10, 20, 0.95)` | `rgba(8, 8, 8, 0.95)` |
| `borderBottom` when scrolled (line 49) | `1px solid #1a2744` | `1px solid #1e1e1e` |
| Active link `color` (line 86) | `#3b82f6` | `#16e0bd` |
| Active link `background` (line 87) | `rgba(59,130,246,0.1)` | `rgba(22,224,189,0.08)` |
| CTA button `background` gradient (line 107) | `linear-gradient(135deg, #3b82f6, #8b5cf6)` | `linear-gradient(135deg, #16e0bd, #0fa08a)` |
| CTA button `color` (line 106) | `#e2e8f0` | `#080808` |
| Mobile menu `background` (line 144) | `rgba(5, 10, 20, 0.98)` | `rgba(8, 8, 8, 0.98)` |
| Mobile menu `borderTop` (line 145) | `1px solid #1a2744` | `1px solid #1e1e1e` |
| Mobile menu link `borderBottom` (line 161) | `1px solid #1a2744` | `1px solid #1e1e1e` |
| Logo muted span `color` (line 68) | `#475569` | `var(--text-muted)` |

**Step 2: Verify**

Nav logo "JT" should show teal/white gradient. Active link should be teal. Hire Me button should be teal with dark text.

**Step 3: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "style: update navigation colors to teal palette"
```

---

### Task 4: About.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/About.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| Top border glow `background` (line 18) | `#3b82f6` | `#16e0bd` |
| "WHO I AM" label `color` (line 25) | `#3b82f6` | `var(--accent)` |
| Education institution `color` (line 70) | `#3b82f6` | `var(--accent)` |
| Profile image border (line 88) | `1px solid #1a2744` | `1px solid var(--border)` |
| Image gradient overlay (line 103) | `rgba(5,10,20,0.7)` | `rgba(8,8,8,0.7)` |

**Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "style: update about section colors to teal palette"
```

---

### Task 5: Skills.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/Skills.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| Section background gradient (line 13) | `rgba(59,130,246,0.03)` | `rgba(22,224,189,0.03)` |
| "TECHNICAL EXPERTISE" label `color` (line 19) | `#8b5cf6` | `var(--accent)` |
| Badge border (line 108) | `1px solid #1a2744` | `1px solid var(--border)` |

**Step 2: Commit**

```bash
git add src/components/sections/Skills.tsx
git commit -m "style: update skills section colors to teal palette"
```

---

### Task 6: Experience.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/Experience.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| Top border glow `background` (line 17) | `#8b5cf6` | `#16e0bd` |
| "CAREER JOURNEY" label `color` (line 23) | `#f59e0b` | `var(--accent)` |
| Timeline vertical line gradient (line 39) | `#3b82f6, #8b5cf6 60%` | `#16e0bd, #0fa08a 60%` |
| Current dot gradient (line 56) | `#3b82f6, #8b5cf6` | `#16e0bd, #0fa08a` |
| Current dot inactive bg (line 57) | `#1a2744` | `#1e1e1e` |
| Current dot border color (line 58) | `#3b82f6` / `#1a2744` | `#16e0bd` / `#1e1e1e` |
| Current dot glow shadow (line 59) | `rgba(59,130,246,0.5)` | `rgba(22,224,189,0.5)` |
| Company name `color` (line 105) | `#3b82f6` | `var(--accent)` |
| Bullet arrow `color` (line 134) | `#3b82f6` | `var(--accent)` |

**Step 2: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "style: update experience section colors to teal palette"
```

---

### Task 7: Projects.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| Section background gradient (line 13) | `rgba(139,92,246,0.03)` | `rgba(22,224,189,0.03)` |
| "WHAT I'VE BUILT" label `color` (line 19) | `#10b981` | `var(--accent)` |
| Image placeholder background (line 51) | `linear-gradient(135deg, #0a1628, #111827)` | `linear-gradient(135deg, #0a0a0a, #111111)` |
| Image overlay gradient (line 89) | `rgba(10,22,40,0.9)` | `rgba(8,8,8,0.9)` |

**Step 2: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "style: update projects section colors to teal palette"
```

---

### Task 8: Certifications.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/Certifications.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| "CONTINUOUS LEARNING" label `color` (line 14) | `#22d3ee` | `var(--accent)` |
| Selected button border (line 33) | `rgba(59,130,246,0.5)` | `rgba(22,224,189,0.4)` |
| Selected button shadow (line 39) | `rgba(59,130,246,0.15)` | `var(--glow)` |
| Issuer text `color` (line 45) | `#3b82f6` | `var(--accent)` |
| Lightbox backdrop (line 58) | `rgba(5,10,20,0.92)` | `rgba(8,8,8,0.92)` |
| Lightbox inner background (line 72) | `#0a1628` | `#111111` |
| Lightbox inner border (line 73) | `1px solid #1a2744` | `1px solid var(--border)` |
| Lightbox issuer `color` (line 113) | `#3b82f6` | `var(--accent)` |

**Step 2: Commit**

```bash
git add src/components/sections/Certifications.tsx
git commit -m "style: update certifications section colors to teal palette"
```

---

### Task 9: Contact.tsx — Color Sweep

**Files:**
- Modify: `src/components/sections/Contact.tsx`

**Step 1: Update contactLinks array colors (lines 5–52)**

Change the `color` field for each contact card:
- Email: `#3b82f6` → `#16e0bd`
- LinkedIn: `#0ea5e9` → `#5eead4`
- GitHub: `#e2e8f0` → `#a0a0a0`
- Phone: `#10b981` → `#2dd4bf`

**Step 2: Replace remaining hardcoded colors**

| Location | Old | New |
|---|---|---|
| Section background gradient (line 61) | `rgba(59,130,246,0.04)` | `rgba(22,224,189,0.03)` |
| Top divider glow `background` (line 72) | `#22d3ee` | `#16e0bd` |
| "GET IN TOUCH" label `color` (line 78) | `#22d3ee` | `var(--accent)` |
| CTA button gradient (line 159) | `#3b82f6, #8b5cf6` | `#16e0bd, #0fa08a` |
| CTA button `color` | `#fff` | `#080808` |
| CTA button shadow (line 161) | `rgba(59,130,246,0.3)` | `rgba(22,224,189,0.25)` |

**Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "style: update contact section colors to teal palette"
```

---

### Task 10: Footer.tsx — Color Sweep

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Replace hardcoded colors**

| Location | Old | New |
|---|---|---|
| `borderTop` (line 8) | `1px solid #1a2744` | `1px solid var(--border)` |
| `background` (line 9) | `rgba(10, 22, 40, 0.5)` | `rgba(8, 8, 8, 0.6)` |

**Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "style: update footer colors to teal palette"
```

---

### Task 11: RubiksCube — Full Rewrite

**Files:**
- Modify: `src/components/RubiksCube/index.tsx`

This is a complete rewrite. Replace the entire file content with the following implementation.

**Key concepts:**
- `cubieData` ref: array of 27 `{ gridPos: [x,y,z], faceColors: string[6] }` objects
- `moveQueue` ref: pending moves to execute
- `solveSequence` ref: applied moves in order (for undo on solve)
- `currentMove` + `moveProgress` refs: drive single-move animation in `useFrame`
- `meshRefs` ref: one `THREE.Mesh` per cubie for direct mutation
- Standard cube face colors: White (+Y), Yellow (-Y), Red (+Z), Orange (-Z), Blue (+X), Green (-X)
- `MeshPhysicalMaterial` with `roughness:0.15, clearcoat:1, clearcoatRoughness:0.1` for glossy plastic

**Full implementation:**

```typescript
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────
const GAP = 1.05;
const STICKER_SIZE = 0.82;
const PLASTIC = '#050505';
const MOVE_SPEED = 4.5; // radians/sec → full 90° in ~0.35s

// Standard Rubik's cube face colors
// BoxGeometry face order: +X(0), -X(1), +Y(2), -Y(3), +Z(4), -Z(5)
const FACE_COLORS: Record<string, string> = {
  '+x': '#1a6fce', // Blue  (Right)
  '-x': '#16a34a', // Green (Left)
  '+y': '#f8f8f8', // White (Top)
  '-y': '#eab308', // Yellow (Bottom)
  '+z': '#dc2626', // Red   (Front)
  '-z': '#ea580c', // Orange (Back)
};

// ─── Types ─────────────────────────────────────────────────────────────────────
type Axis = 'x' | 'y' | 'z';
interface Move { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 }

interface CubieData {
  gridPos: [number, number, number];
  faceColors: string[]; // [+X, -X, +Y, -Y, +Z, -Z]
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

// Rotate a grid position 90° around an axis
function rotateGridPos(
  pos: [number, number, number],
  axis: Axis,
  dir: 1 | -1,
): [number, number, number] {
  const [x, y, z] = pos;
  if (axis === 'y') return dir === 1 ? [z, y, -x] : [-z, y, x];
  if (axis === 'x') return dir === 1 ? [x, -z, y] : [x, z, -y];
  return dir === 1 ? [-y, x, z] : [y, -x, z]; // z axis
}

// Remap face colors after 90° rotation around axis
// BoxGeometry indices: +X=0, -X=1, +Y=2, -Y=3, +Z=4, -Z=5
function remapColors(colors: string[], axis: Axis, dir: 1 | -1): string[] {
  const c = colors;
  if (axis === 'y') {
    // +90° Y: +Z→+X, +X→-Z, -Z→-X, -X→+Z
    return dir === 1
      ? [c[4], c[5], c[2], c[3], c[1], c[0]]
      : [c[5], c[4], c[2], c[3], c[0], c[1]];
  }
  if (axis === 'x') {
    // +90° X: +Y→+Z, +Z→-Y, -Y→-Z, -Z→+Y
    return dir === 1
      ? [c[0], c[1], c[5], c[4], c[2], c[3]]
      : [c[0], c[1], c[4], c[5], c[3], c[2]];
  }
  // z axis: +90° Z: +X→+Y, +Y→-X, -X→-Y, -Y→+X
  return dir === 1
    ? [c[3], c[2], c[0], c[1], c[4], c[5]]
    : [c[2], c[3], c[1], c[0], c[4], c[5]];
}

function axisIndex(axis: Axis): 0 | 1 | 2 {
  return axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
}

function randomMoves(n: number): Move[] {
  const axes: Axis[] = ['x', 'y', 'z'];
  const layers: (-1 | 0 | 1)[] = [-1, 1];
  const dirs: (1 | -1)[] = [1, -1];
  const moves: Move[] = [];
  for (let i = 0; i < n; i++) {
    moves.push({
      axis: axes[Math.floor(Math.random() * 3)],
      layer: layers[Math.floor(Math.random() * 2)],
      dir: dirs[Math.floor(Math.random() * 2)],
    });
  }
  return moves;
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

  // Cubie logical state
  const cubieData = useRef<CubieData[]>(buildInitialCubies());

  // Move queue
  const moveQueue = useRef<Move[]>([]);
  const solveSequence = useRef<Move[]>([]);

  // Current animation state
  const currentMove = useRef<Move | null>(null);
  const moveProgress = useRef(0);
  const movingIndices = useRef<number[]>([]);
  const startPositions = useRef<THREE.Vector3[]>([]);
  const startQuaternions = useRef<THREE.Quaternion[]>([]);

  // Mesh refs
  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(27).fill(null));

  // Material refs (6 materials per cubie)
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

  // Drag state
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  // ── Respond to scramble/solve signals ─────────────────────────────────────
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

  // ── Sync materials to cubieData ───────────────────────────────────────────
  function syncMaterials() {
    cubieData.current.forEach((cd, i) => {
      cd.faceColors.forEach((col, f) => {
        const mat = matRefs.current[i][f];
        mat.color.set(col);
        mat.clearcoat = col === PLASTIC ? 0 : 1.0;
        mat.roughness = col === PLASTIC ? 0.5 : 0.15;
        mat.needsUpdate = true;
      });
    });
  }

  // ── Frame loop ─────────────────────────────────────────────────────────────
  useFrame((_, delta) => {
    // Auto-rotate when idle
    if (groupRef.current && !dragging.current && !currentMove.current && moveQueue.current.length === 0) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x += 0.0015;
    }

    // Dequeue next move
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

      startQuaternions.current = movingIndices.current.map(() =>
        new THREE.Quaternion()
      );
    }

    // Animate current move
    if (currentMove.current) {
      moveProgress.current = Math.min(1, moveProgress.current + delta * MOVE_SPEED);
      const angle = (moveProgress.current * Math.PI) / 2 * currentMove.current.dir;

      const rotQuat = new THREE.Quaternion();
      const axisVec = new THREE.Vector3(
        currentMove.current.axis === 'x' ? 1 : 0,
        currentMove.current.axis === 'y' ? 1 : 0,
        currentMove.current.axis === 'z' ? 1 : 0,
      );
      rotQuat.setFromAxisAngle(axisVec, angle);

      movingIndices.current.forEach((ci, idx) => {
        const mesh = meshRefs.current[ci];
        if (!mesh) return;
        const newPos = startPositions.current[idx].clone().applyQuaternion(rotQuat);
        mesh.position.copy(newPos);
        mesh.quaternion.copy(rotQuat);
      });

      // Move complete
      if (moveProgress.current >= 1) {
        const { axis, dir } = currentMove.current;
        const ai = axisIndex(axis);

        movingIndices.current.forEach((ci) => {
          const mesh = meshRefs.current[ci];
          if (mesh) {
            mesh.quaternion.identity();
          }
          const cd = cubieData.current[ci];
          const newPos = rotateGridPos(cd.gridPos, axis, dir);
          cd.gridPos = newPos;
          // Snap mesh position
          if (mesh) {
            mesh.position.set(newPos[0] * GAP, newPos[1] * GAP, newPos[2] * GAP);
          }
          cd.faceColors = remapColors(cd.faceColors, axis, dir);
          _ = ai; // suppress unused warning
        });

        syncMaterials();
        currentMove.current = null;

        if (moveQueue.current.length === 0) {
          onStateChange('idle');
        }
      }
    }
  });

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    moved.current = false;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current || !dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
    groupRef.current.rotation.y += dx * 0.009;
    groupRef.current.rotation.x += dy * 0.009;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragging.current = false;
  }, []);

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
```

**Step 2: Fix unused variable lint error**

The line `_ = ai;` is a workaround. Remove it and instead remove the `axisIndex` call from the finalise block since `ai` isn't used for position snapping (positions are computed via `rotateGridPos`). Clean up:

```typescript
// In the "Move complete" block, remove:
const ai = axisIndex(axis);
// and remove:
_ = ai;
```

The `axisIndex` function is still used above for `movingIndices` selection — only the unused `ai` in the finalise block needs removal.

**Step 3: Verify**

Open http://localhost:3000. The cube should show:
- Black plastic body with coloured stickers (white top, yellow bottom, red front, orange back, blue right, green left)
- Visible black frame between stickers
- Glossy plastic sheen on stickers
- Drag to rotate

**Step 4: Commit**

```bash
git add src/components/RubiksCube/index.tsx
git commit -m "feat: rebuild Rubik's cube with realistic materials and scramble/solve logic"
```

---

### Task 12: Hero.tsx — Controls UI + Color Sweep

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Step 1: Add scramble/solve state and wire to RubiksCube**

Add these state variables inside the `Hero` component function:

```typescript
const [scrambleSignal, setScrambleSignal] = useState(0);
const [solveSignal, setSolveSignal] = useState(0);
const [cubeState, setCubeState] = useState<'idle' | 'animating'>('idle');
```

Import `useState` at the top:
```typescript
import { useState } from 'react';
```

Update the `<RubiksCube />` usage to pass signals:
```tsx
<RubiksCube
  scrambleSignal={scrambleSignal}
  solveSignal={solveSignal}
  onStateChange={setCubeState}
/>
```

**Step 2: Replace face legend with Scramble/Solve controls**

Remove the entire face legend `<div>` (the one containing the color dot links, roughly lines 259–302).

Replace it with:

```tsx
{/* Cube controls */}
<div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
  <button
    onClick={() => setScrambleSignal((s) => s + 1)}
    disabled={cubeState === 'animating'}
    style={{
      padding: '0.4rem 1.1rem',
      borderRadius: 8,
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      background: cubeState === 'animating' ? '#1e1e1e' : 'rgba(22,224,189,0.1)',
      border: `1px solid ${cubeState === 'animating' ? '#1e1e1e' : 'rgba(22,224,189,0.35)'}`,
      color: cubeState === 'animating' ? '#555' : '#16e0bd',
      cursor: cubeState === 'animating' ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
    }}
  >
    Scramble
  </button>
  <button
    onClick={() => setSolveSignal((s) => s + 1)}
    disabled={cubeState === 'animating'}
    style={{
      padding: '0.4rem 1.1rem',
      borderRadius: 8,
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      background: 'transparent',
      border: `1px solid ${cubeState === 'animating' ? '#1e1e1e' : '#1e1e1e'}`,
      color: cubeState === 'animating' ? '#555' : '#555',
      cursor: cubeState === 'animating' ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
    }}
  >
    Solve
  </button>
  <span style={{ fontSize: '0.65rem', color: '#555', alignSelf: 'center', marginLeft: 4 }}>
    drag to rotate
  </span>
</div>
```

**Step 3: Color sweep on remaining Hero elements**

| Location | Old | New |
|---|---|---|
| Grid background orb 1 (line ~57) | `rgba(59,130,246,0.12)` | `rgba(22,224,189,0.08)` |
| Grid background orb 2 (line ~68) | `rgba(139,92,246,0.1)` | `rgba(22,224,189,0.05)` |
| Status badge border | `rgba(16,185,129,0.3)` | `rgba(22,224,189,0.3)` |
| Status badge background | `rgba(16,185,129,0.08)` | `rgba(22,224,189,0.08)` |
| Status badge color | `#10b981` | `#16e0bd` |
| Status dot background | `#10b981` | `#16e0bd` |
| "View Work" button gradient | `#3b82f6, #8b5cf6` | `#16e0bd, #0fa08a` |
| "View Work" button text color | `#fff` | `#080808` |
| GitHub button border | `1px solid #1a2744` | `1px solid #1e1e1e` |
| LinkedIn button color | `#0ea5e9` | `#16e0bd` |
| LinkedIn button border | `rgba(14,165,233,0.25)` | `rgba(22,224,189,0.2)` |
| Nav hint bottom text (remove) | `drag · click a face to navigate` | (removed, replaced by controls) |

**Step 4: Verify end-to-end**

- Load http://localhost:3000
- Cube shows realistic colors with black plastic frame
- Click **Scramble** — 18 random moves animate smoothly
- Click **Solve** — reverses back to solved state
- Buttons are disabled while animating
- Drag the cube to view all faces
- Status badge, CTA buttons, gradient text all use teal

**Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add scramble/solve controls and teal color sweep to hero"
```

---

### Task 13: Push to Remote

```bash
git push origin dev
```

Verify all commits are pushed:
```bash
git log --oneline origin/dev
```
