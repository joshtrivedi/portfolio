'use client';

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
        color: '#1a2744',
        fontSize: '0.85rem',
      }}
    >
      Loading cube...
    </div>
  ),
});

export default function Hero() {
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
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
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
          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.3rem 0.9rem',
                borderRadius: 9999,
                border: '1px solid rgba(16,185,129,0.3)',
                background: 'rgba(16,185,129,0.08)',
                fontSize: '0.78rem',
                color: '#10b981',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'pulse 2s infinite',
                  display: 'inline-block',
                }}
              />
              Open to collaboration
            </span>
          </div>

          {/* Name */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#e2e8f0',
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
              <span className="gradient-text">AI Engineer</span>
              <span style={{ color: '#475569' }}> & </span>
              <span style={{ color: '#e2e8f0' }}>Full-Stack Developer</span>
            </p>
          </div>

          {/* Role */}
          <p
            style={{
              fontSize: '1rem',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Co-Founder & CTO at{' '}
            <span style={{ color: '#3b82f6', fontWeight: 600 }}>Predeeption</span> — building
            agentic AI systems, diffusion models, and production-grade full-stack applications
            backed by{' '}
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>Inria</span> &{' '}
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>Scaleway</span>.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { value: '5+', label: 'Years Exp.' },
              { value: '#433', label: 'Google Hashcode' },
              { value: '27+', label: 'Certifications' },
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
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2, fontWeight: 500 }}>
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
                color: '#fff',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
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
                color: '#e2e8f0',
                background: 'transparent',
                border: '1px solid #1a2744',
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
                color: '#0ea5e9',
                background: 'transparent',
                border: '1px solid rgba(14,165,233,0.25)',
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
            <RubiksCube />
          </div>

          {/* Face legend */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            {[
              { color: '#dc2626', label: 'Home' },
              { color: '#f1f5f9', label: 'About' },
              { color: '#2563eb', label: 'Skills' },
              { color: '#ca8a04', label: 'Experience' },
              { color: '#16a34a', label: 'Projects' },
              { color: '#ea580c', label: 'Contact' },
            ].map((f) => (
              <a
                key={f.label}
                href={`#${f.label.toLowerCase()}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.7rem',
                  color: '#475569',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: f.color,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </div>

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
