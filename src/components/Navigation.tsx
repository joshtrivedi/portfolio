'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(5, 10, 20, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a2744' : '1px solid transparent',
      }}
    >
      <div
        className="section-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#e2e8f0',
            textDecoration: 'none',
          }}
        >
          <span className="gradient-text">JT</span>
          <span style={{ color: '#475569', marginLeft: 6 }}>/ dev</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '0.25rem' }} className="hidden md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#3b82f6' : '#94a3b8',
                  background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="mailto:josh.trivedi@gmail.com"
          className="hidden md:inline-flex"
          style={{
            padding: '0.45rem 1.1rem',
            borderRadius: 8,
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#e2e8f0',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
        >
          Hire me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#e2e8f0',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(5, 10, 20, 0.98)',
            borderTop: '1px solid #1a2744',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                borderBottom: '1px solid #1a2744',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
