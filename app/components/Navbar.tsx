'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(14,15,17,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '20px',
            fontStyle: 'italic', color: 'var(--accent)', fontWeight: 600,
          }}>EconPedia</span>
          <span style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)', letterSpacing: '0.1em',
            background: 'var(--bg3)', padding: '2px 6px', borderRadius: '4px',
          }}>BETA</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link href="/" className={`nav-link${path === '/' ? ' active' : ''}`}>Home</Link>
          <Link href="/browse" className={`nav-link${path.startsWith('/browse') ? ' active' : ''}`}>Browse</Link>
          <Link href="/search" className={`nav-link${path === '/search' ? ' active' : ''}`}>Search</Link>
        </div>
      </div>
      <div className="gradient-line" />
    </nav>
  );
}
