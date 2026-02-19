'use client';

import { profile } from '@/data/profile';

const contactLinks = [
  {
    label: 'Email',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/josh-trivedi',
    href: profile.contact.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: '#0ea5e9',
  },
  {
    label: 'GitHub',
    value: 'github.com/joshtrivedi',
    href: profile.contact.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: '#e2e8f0',
  },
  {
    label: 'Phone',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    color: '#10b981',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.04))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
        }}
      />

      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#22d3ee', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            GET IN TOUCH
          </p>
          <h2 className="section-heading gradient-text" style={{ marginBottom: '1rem' }}>
            Let&apos;s Connect
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Eager to collaborate on scaling AI agent ecosystems, automating workflows, or debating Gemini vs OpenAI.
            Open to moonshot projects at the intersection of AI and human creativity.
          </p>
        </div>

        {/* Contact cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
            maxWidth: 900,
            margin: '0 auto 3rem',
          }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: `${link.color}15`,
                  border: `1px solid ${link.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: link.color,
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>
              <div>
                <p style={{ color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>
                  {link.label}
                </p>
                <p style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>
                  {link.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Big CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={`mailto:${profile.contact.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.5rem',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            Send me a message
          </a>
        </div>
      </div>
    </section>
  );
}
