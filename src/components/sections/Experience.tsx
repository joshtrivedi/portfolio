'use client';

import { profile } from '@/data/profile';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
        }}
      />

      <div className="section-container">
        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            CAREER JOURNEY
          </p>
          <h2 className="section-heading gradient-text">Experience</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6 60%, transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {profile.experience.map((exp, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: -28,
                    top: 20,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: exp.current
                      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                      : '#1a2744',
                    border: `2px solid ${exp.current ? '#3b82f6' : '#1a2744'}`,
                    boxShadow: exp.current ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
                  }}
                />

                <div
                  className="card"
                  style={{ padding: '1.5rem' }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#e2e8f0',
                          }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            style={{
                              padding: '0.15rem 0.6rem',
                              borderRadius: 9999,
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              color: '#10b981',
                              background: 'rgba(16,185,129,0.1)',
                              border: '1px solid rgba(16,185,129,0.3)',
                            }}
                          >
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.9rem', marginTop: 2 }}>
                        {exp.company}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 500 }}>
                        {exp.startDate} — {exp.endDate}
                      </p>
                      <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: 2 }}>
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <ul style={{ marginBottom: '1rem' }}>
                    {exp.description.map((point, j) => (
                      <li
                        key={j}
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.85rem',
                          lineHeight: 1.7,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          marginBottom: '0.3rem',
                        }}
                      >
                        <span style={{ color: '#3b82f6', marginTop: 4, flexShrink: 0 }}>›</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
