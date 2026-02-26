'use client';

import Image from 'next/image';
import { profile } from '@/data/profile';
import { imgPath } from '@/lib/imgPath';

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent, rgba(22,224,189,0.03) 50%, transparent)',
      }}
    >
      <div className="section-container">
        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            WHAT I&apos;VE BUILT
          </p>
          <h2 className="section-heading gradient-text">Projects</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: 8 }}>
            From AI research to production apps — a selection of work across domains.
          </p>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {profile.projects.map((project, i) => (
            <div
              key={i}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Image / Placeholder */}
              <div
                style={{
                  height: 180,
                  position: 'relative',
                  background: 'linear-gradient(135deg, #0a0a0a, #111111)',
                  overflow: 'hidden',
                }}
              >
                {project.image ? (
                  <Image
                    src={imgPath(project.image)}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.85 }}
                    unoptimized={project.image.endsWith('.gif')}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2.5rem',
                        opacity: 0.15,
                      }}
                    >
                      {i === 0 ? '🔋' : i === 4 ? '🗺️' : '⚙️'}
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.9) 100%)',
                  }}
                />

                {/* Confidential badge */}
                {project.isConfidential && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      padding: '0.25rem 0.6rem',
                      borderRadius: 6,
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#ef4444',
                      letterSpacing: '0.05em',
                    }}
                  >
                    CONFIDENTIAL
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    lineHeight: 1.3,
                  }}
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      {project.title}
                      <svg
                        style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.83rem',
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {project.tags.map((tag) => (
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
    </section>
  );
}
