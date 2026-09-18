'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { profile } from '@/data/profile';

const RubiksCube = dynamic(() => import('@/components/RubiksCube'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}
    >
      Loading cube...
    </div>
  ),
});

const CubeModal = dynamic(() => import('@/components/RubiksCube/CubeModal'), { ssr: false });

export default function Hero() {
  const [scrambleSignal, setScrambleSignal] = useState(0);
  const [solveSignal, setSolveSignal] = useState(0);
  const [cubeState, setCubeState] = useState<'idle' | 'animating'>('idle');
  const [cubeModalOpen, setCubeModalOpen] = useState(false);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Radial glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        className="section-container"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Open to work */}
          {profile.openToWork.status && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    animation: 'pulse 2s infinite',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.03em' }}>
                  OPEN TO WORK
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  · {profile.openToWork.locations.join(' & ')}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {profile.openToWork.roles.map((role) => (
                  <span
                    key={role}
                    style={{
                      padding: '0.25rem 0.7rem',
                      borderRadius: 9999,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      background: 'rgba(var(--accent-rgb),0.08)',
                      border: '1px solid rgba(var(--accent-rgb),0.2)',
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              {profile.name}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              <span className="gradient-text">CTO</span>
              <span style={{ color: 'var(--text-muted)' }}> & </span>
              <span style={{ color: 'var(--text-primary)' }}>Co-Founder</span>
            </p>
          </div>

          {/* Role */}
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            CTO & Co-Founder at{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Predeeption</span>, building a
            production LLM system with Augmented RAG for EV battery analytics, incubated by{' '}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Inria Startup Studio</span> with{' '}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>CNRS</span> partnership.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { value: '5+', label: 'Years Exp.' },
              { value: '#433', label: 'Google Hashcode' },
              { value: 'Top 10%', label: 'Kaggle CryoET' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                  className="gradient-text"
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--on-accent)',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              View Work
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                background: 'transparent',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              GitHub
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--accent)',
                background: 'transparent',
                border: '1px solid rgba(var(--accent-rgb),0.2)',
                textDecoration: 'none',
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right: Rubik's Cube */}
        <div
          style={{
            position: 'relative',
            height: 420,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', height: 380 }}>
            <RubiksCube
              scrambleSignal={scrambleSignal}
              solveSignal={solveSignal}
              onStateChange={setCubeState}
            />
          </div>

          {/* Cube controls */}
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setScrambleSignal((s) => s + 1)}
              disabled={cubeState === 'animating'}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: 8,
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                background: cubeState === 'animating' ? 'var(--border)' : 'rgba(var(--accent-rgb),0.1)',
                border: `1px solid ${cubeState === 'animating' ? 'var(--border)' : 'rgba(var(--accent-rgb),0.35)'}`,
                color: cubeState === 'animating' ? 'var(--text-muted)' : 'var(--accent)',
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
                border: `1px solid ${cubeState === 'animating' ? 'var(--border)' : 'var(--border)'}`,
                color: cubeState === 'animating' ? 'var(--text-muted)' : 'var(--text-secondary)',
                cursor: cubeState === 'animating' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Solve
            </button>
            <button
              onClick={() => setCubeModalOpen(true)}
              title="Expand"
              aria-label="Open fullscreen cube"
              style={{
                padding: '0.4rem 0.55rem',
                borderRadius: 8,
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                lineHeight: 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <polyline points="1,5 1,1 5,1" />
                <polyline points="9,1 13,1 13,5" />
                <polyline points="13,9 13,13 9,13" />
                <polyline points="5,13 1,13 1,9" />
              </svg>
            </button>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 4 }}>
              drag to rotate
            </span>
          </div>
        </div>
      </div>

      {cubeModalOpen && <CubeModal onClose={() => setCubeModalOpen(false)} />}

      {/* Mobile: stack cube below text */}
      <style>{`
        @media (max-width: 768px) {
          #home > div.section-container {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
