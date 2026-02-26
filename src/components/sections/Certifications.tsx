'use client';

import { useState } from 'react';
import Image from 'next/image';
import { profile } from '@/data/profile';

export default function Certifications() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="certifications" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-container">
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            CONTINUOUS LEARNING
          </p>
          <h2 className="section-heading gradient-text">Certifications</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {profile.certifications.map((cert, i) => (
            <button
              key={i}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${selected === i ? 'rgba(22,224,189,0.4)' : 'var(--border)'}`,
                borderRadius: 12,
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selected === i ? 'var(--glow)' : 'none',
              }}
            >
              <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.4, marginBottom: 4 }}>
                {cert.name}
              </p>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 500 }}>{cert.issuer}</p>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selected !== null && (
          <div
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(8,8,8,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: 700,
                width: '100%',
                background: '#111111',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* Close btn */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 10,
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
                }}
              >
                ×
              </button>

              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={profile.certifications[selected].image}
                  alt={profile.certifications[selected].name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '1rem 1.25rem' }}>
                <p style={{ color: '#e2e8f0', fontWeight: 700 }}>{profile.certifications[selected].name}</p>
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{profile.certifications[selected].issuer}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
