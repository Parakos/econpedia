import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>📉</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>
        Term Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
        This term doesn't exist in our dictionary yet — but we're always adding more.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/browse" style={{
          padding: '11px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
          background: 'var(--accent)', color: 'var(--bg)',
        }}>Browse all terms</Link>
        <Link href="/search" style={{
          padding: '11px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
          border: '1px solid var(--border-light)', color: 'var(--text)',
        }}>Search</Link>
      </div>
    </div>
  );
}
