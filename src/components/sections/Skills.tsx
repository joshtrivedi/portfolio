'use client';

import Image from 'next/image';
import { profile } from '@/data/profile';

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.03) 50%, transparent)',
      }}
    >
      <div className="section-container">
        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            TECHNICAL EXPERTISE
          </p>
          <h2 className="section-heading gradient-text">
            Skills & Technologies
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: 8 }}>
            Spanning AI research, full-stack engineering, mobile, and cloud.
          </p>
        </div>

        {/* Skill categories grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {profile.skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="card"
              style={{ padding: '1.5rem' }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: skillGroup.color,
                    boxShadow: `0 0 12px ${skillGroup.color}80`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: 9999,
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      color: '#94a3b8',
                      background: `${skillGroup.color}12`,
                      border: `1px solid ${skillGroup.color}30`,
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Badges section */}
        <div style={{ marginTop: '3rem' }}>
          <p style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem' }}>
            IBM / COURSERA BADGES
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {profile.badges.map((src, i) => (
              <div
                key={i}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid #1a2744',
                  padding: 4,
                  background: 'var(--bg-card)',
                  transition: 'transform 0.2s',
                }}
              >
                <Image
                  src={src}
                  alt={`Badge ${i + 1}`}
                  width={56}
                  height={56}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
