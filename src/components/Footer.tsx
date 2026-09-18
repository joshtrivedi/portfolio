import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      <div
        className="section-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
            <span className="gradient-text">Josh Trivedi</span>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>
            {profile.location}
          </p>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Built with Next.js · TypeScript · Three.js
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
