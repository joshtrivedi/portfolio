'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { Move } from './index';
import { NAMED_MOVES } from './index';

const RubiksCube = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
        fontSize: '0.85rem',
      }}
    >
      Loading cube...
    </div>
  ),
});

const MOVE_FACE_COLOR: Record<string, string> = {
  'U':  '#f8f8f8',
  "U'": '#f8f8f8',
  'D':  '#eab308',
  "D'": '#eab308',
  'R':  '#1a6fce',
  "R'": '#1a6fce',
  'L':  '#16a34a',
  "L'": '#16a34a',
  'F':  '#dc2626',
  "F'": '#dc2626',
  'B':  '#ea580c',
  "B'": '#ea580c',
};

const MOVE_PAIRS: [string, string][] = [
  ['U',  "U'"],
  ['D',  "D'"],
  ['R',  "R'"],
  ['L',  "L'"],
  ['F',  "F'"],
  ['B',  "B'"],
];

interface CubeModalProps {
  onClose: () => void;
}

export default function CubeModal({ onClose }: CubeModalProps) {
  const [scrambleSignal, setScrambleSignal] = useState(0);
  const [solveSignal, setSolveSignal] = useState(0);
  const [cubeState, setCubeState] = useState<'idle' | 'animating'>('idle');
  const [moveSignal, setMoveSignal] = useState<{ move: Move; id: number } | undefined>(undefined);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const triggerMove = useCallback((moveName: string) => {
    const move = NAMED_MOVES[moveName];
    if (!move) return;
    setMoveSignal((prev) => ({ move, id: (prev?.id ?? 0) + 1 }));
  }, []);

  const isDisabled = cubeState === 'animating';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111111',
          border: '1px solid #1e1e1e',
          borderRadius: 20,
          width: '100%',
          maxWidth: 860,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(22,224,189,0.08)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.9rem 1.25rem',
            borderBottom: '1px solid #1e1e1e',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16e0bd', letterSpacing: '0.1em' }}>
            INTERACTIVE SOLVE
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 8,
              color: '#ef4444',
              cursor: 'pointer',
              width: 32,
              height: 32,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="cube-modal-body" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Canvas */}
          <div style={{ flex: '1 1 0', minWidth: 0, minHeight: 300 }}>
            <RubiksCube
              scrambleSignal={scrambleSignal}
              solveSignal={solveSignal}
              moveSignal={moveSignal}
              onStateChange={setCubeState}
            />
          </div>

          {/* Control panel */}
          <div
            className="cube-modal-panel"
            style={{
              width: 210,
              flexShrink: 0,
              borderLeft: '1px solid #1e1e1e',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.1rem 0.9rem',
              overflowY: 'auto',
            }}
          >
            {/* Scramble / Solve */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 700, color: '#555', letterSpacing: '0.12em', marginBottom: 2 }}>
                CONTROLS
              </p>
              <button
                onClick={() => setScrambleSignal((s) => s + 1)}
                disabled={isDisabled}
                style={{
                  padding: '0.45rem 0',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  background: isDisabled ? '#1e1e1e' : 'rgba(22,224,189,0.1)',
                  border: `1px solid ${isDisabled ? '#1e1e1e' : 'rgba(22,224,189,0.35)'}`,
                  color: isDisabled ? '#555' : '#16e0bd',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Scramble
              </button>
              <button
                onClick={() => setSolveSignal((s) => s + 1)}
                disabled={isDisabled}
                style={{
                  padding: '0.45rem 0',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  background: 'transparent',
                  border: `1px solid ${isDisabled ? '#1e1e1e' : '#333'}`,
                  color: isDisabled ? '#555' : '#a0a0a0',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Solve
              </button>
            </div>

            {/* Move buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 700, color: '#555', letterSpacing: '0.12em', marginBottom: 2 }}>
                MOVES
              </p>
              {MOVE_PAIRS.map(([normal, prime]) => {
                const color = MOVE_FACE_COLOR[normal];
                const isWhite = color === '#f8f8f8';
                return (
                  <div key={normal} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                    {[normal, prime].map((label) => (
                      <button
                        key={label}
                        onClick={() => triggerMove(label)}
                        disabled={isDisabled}
                        style={{
                          padding: '0.4rem 0',
                          borderRadius: 7,
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          letterSpacing: '0.02em',
                          background: isDisabled ? '#1a1a1a' : (isWhite ? 'rgba(248,248,248,0.12)' : `${color}22`),
                          border: `1px solid ${isDisabled ? '#222' : (isWhite ? 'rgba(248,248,248,0.3)' : `${color}66`)}`,
                          color: isDisabled ? '#444' : (isWhite ? '#e2e8f0' : color),
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: '0.62rem', color: '#444', lineHeight: 1.6, marginTop: 'auto' }}>
              Drag to rotate view.
              <br />
              U=top · D=bottom
              <br />
              R=right · L=left
              <br />
              F=front · B=back
              <br />
              ′ = counterclockwise
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cube-modal-body { flex-direction: column !important; }
          .cube-modal-panel {
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid #1e1e1e !important;
            max-height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
