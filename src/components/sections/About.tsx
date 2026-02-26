'use client';

import Image from 'next/image';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      {/* Subtle top border glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #16e0bd, transparent)',
        }}
      />

      <div className="section-container">
        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            WHO I AM
          </p>
          <h2 className="section-heading gradient-text" style={{ maxWidth: 480 }}>
            About Me
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 380px)',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, fontWeight: 500, fontStyle: 'italic' }}>
              &ldquo;{profile.tagline}&rdquo;
            </p>

            {profile.about.bio.map((para, i) => (
              <p key={i} style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.85 }}>
                {para}
              </p>
            ))}

            {/* Education */}
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                Education
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {profile.education.map((edu) => (
                  <div
                    key={edu.institution}
                    style={{
                      padding: '0.9rem 1rem',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                    }}
                  >
                    <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.88rem' }}>{edu.degree}</p>
                    <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: 2 }}>{edu.institution}</p>
                    <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: 2 }}>
                      {edu.period} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Photo + Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Profile image */}
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                aspectRatio: '4/3',
              }}
            >
              <Image
                src="/img/josh-pfp.jpg"
                alt="Josh Trivedi"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.7) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 16,
                  right: 16,
                }}
              >
                <p style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.9rem' }}>{profile.name}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{profile.location}</p>
              </div>
            </div>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {profile.about.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{h.icon}</span>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
