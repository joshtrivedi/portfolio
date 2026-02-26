# Design: Teal Color Scheme + Realistic Rubik's Cube

**Date:** 2026-02-26
**Status:** Approved

---

## Overview

Two parallel changes:
1. Migrate the entire color system from blue/purple to teal/black/white, matching the original static portfolio's aesthetic.
2. Rebuild the Rubik's cube as a standalone interactive puzzle (scramble/solve) with realistic plastic materials — removing all navigation logic.

---

## 1. Color System

Replace all CSS variables and hardcoded colors across every component.

### New Palette

| Variable          | Value              | Purpose                        |
|-------------------|--------------------|--------------------------------|
| `--bg-primary`    | `#080808`          | Page background (near-black)   |
| `--bg-card`       | `#111111`          | Card surface                   |
| `--bg-card-hover` | `#181818`          | Card hover state               |
| `--border`        | `#1e1e1e`          | Subtle dividers                |
| `--text-primary`  | `#ffffff`          | Body / heading text            |
| `--text-secondary`| `#a0a0a0`          | Subtext                        |
| `--text-muted`    | `#555555`          | Labels, hints                  |
| `--accent`        | `#16e0bd`          | Primary teal (old project)     |
| `--accent-dim`    | `#0fa08a`          | Teal hover / pressed           |
| `--glow`          | `rgba(22,224,189,0.12)` | Glow shadows             |

### Gradient text
`linear-gradient(135deg, #16e0bd, #ffffff)` — replaces blue→purple.

### What changes per file
- `globals.css` — CSS vars, utility classes (`.card`, `.tag`, `.gradient-text`), scrollbar, selection
- `Navigation.tsx` — active indicator, hover underline, frosted backdrop tint
- `Hero.tsx` — gradient text, CTA button, status badge border, cube controls
- `About.tsx` — card hover glow, badge accents
- `Skills.tsx` — dot accents, tag pills, card hover
- `Experience.tsx` — timeline line, current-role dot, tech tags
- `Projects.tsx` — card hover, link icon, tags
- `Certifications.tsx` — button hover, modal backdrop
- `Contact.tsx` — card accents, CTA button
- `Footer.tsx` — social link hover

---

## 2. Rubik's Cube — Realistic Interactive Puzzle

### Visual Realism

| Property | Value |
|---|---|
| Face colors | Standard: White (+Y), Yellow (-Y), Red (+Z), Orange (-Z), Blue (+X), Green (-X) |
| Plastic body | `#000000` |
| Sticker size | `0.82` (down from `0.94`) — exposes black frame |
| Material | `MeshPhysicalMaterial` |
| `roughness` | `0.15` |
| `clearcoat` | `1.0` |
| `clearcoatRoughness` | `0.1` |

### Interactivity — Scramble / Solve

**State:**
- 27 cubies, each tracking `gridPos: [x,y,z]` (integer -1/0/1) and `faceColors: string[6]`
- `moveQueue: Move[]` — drives animations sequentially
- `solveSequence: Move[]` — records applied moves for undo

**Move structure:**
```ts
type Axis = 'x' | 'y' | 'z';
type Move = { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 };
```

**Per-move animation:**
1. Select all cubies where `gridPos[axis] === layer`
2. Rotate them as a group 90° around the axis (`dir` sets CW/CCW)
3. On completion: snap positions, remap face colors, dequeue next move

**Scramble:** Push 18 random moves to `moveQueue`, record each in `solveSequence`.

**Solve:** Push inverse of `solveSequence` in reverse order to `moveQueue`, clear `solveSequence`.

**Drag:** Rotates the whole cube group (unchanged).

**Auto-spin:** Resumes when `moveQueue` is empty and not dragging.

### UI Controls (Hero.tsx)

Replace face legend with:
```
[ Scramble ]   [ Solve ]
```
- Teal accent style
- `Scramble` disabled while solving / animating
- `Solve` disabled if already solved or while scrambling
- Hint text: `drag to rotate`

### Removed
- `resolveFace()` — navigation resolver
- `LABELS[]` — Html face labels
- `onNavigate` prop
- `hoveredFace` state
- Face legend in Hero

---

## Files Changed

| File | Change type |
|---|---|
| `src/app/globals.css` | Color system overhaul |
| `src/components/RubiksCube/index.tsx` | Full rewrite (realism + scramble/solve) |
| `src/components/sections/Hero.tsx` | Controls UI + color sweep |
| `src/components/Navigation.tsx` | Color sweep |
| `src/components/sections/About.tsx` | Color sweep |
| `src/components/sections/Skills.tsx` | Color sweep |
| `src/components/sections/Experience.tsx` | Color sweep |
| `src/components/sections/Projects.tsx` | Color sweep |
| `src/components/sections/Certifications.tsx` | Color sweep |
| `src/components/sections/Contact.tsx` | Color sweep |
| `src/components/Footer.tsx` | Color sweep |
