import Link from 'next/link';
import SearchBar from './components/SearchBar';
import CategoryBadge from './components/CategoryBadge';
import { getFeaturedTerms, categories, categoryIcons, categoryColors, allTerms } from './data';

export default function Home() {
  const featured = getFeaturedTerms();
  return (
    <div>
      {/* Hero */}
      <section style={{ maxWidth: '780px', margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div className="fade-up fade-up-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 14px', borderRadius: '20px', marginBottom: '28px',
          background: 'var(--accent-bg)', border: '1px solid rgba(240,192,64,0.2)',
          fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.06em',
        }}>📖 {allTerms.length} TERMS · FREE · FOR STUDENTS</div>

        <h1 className="fade-up fade-up-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,72px)',
          fontWeight: 700, lineHeight: 1.1, marginBottom: '20px',
        }}>
          Economics,<br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>finally explained.</span>
        </h1>

        <p className="fade-up fade-up-3" style={{
          fontSize: '18px', color: 'var(--text-muted)', maxWidth: '540px',
          margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Every economics term you need — with clear definitions, origins,
          real-world examples, and an AI you can ask anything.
        </p>

        <div className="fade-up fade-up-4" style={{ maxWidth: '560px', margin: '0 auto 48px', position: 'relative', zIndex: 10000 }}>
          <SearchBar large />
        </div>

        <div className="fade-up fade-up-5" style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ n: allTerms.length, l: 'Terms' }, { n: categories.length, l: 'Categories' }, { n: '✓', l: 'Free forever' }, { n: '✨', l: 'AI-powered' }].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--accent)' }}>{n}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div className="gradient-line" style={{ borderRadius: '2px' }} />
      </div>

      {/* Featured */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700 }}>Featured Terms</h2>
          <Link href="/browse" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>Browse all {allTerms.length} →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '16px' }}>
          {featured.map((term, i) => (
            <Link key={term.id} href={`/terms/${term.id}`} className="term-card fade-up" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <CategoryBadge category={term.category} />
                {term.abbreviation && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', background: 'var(--bg3)', padding: '2px 8px', borderRadius: '4px' }}>{term.abbreviation}</span>}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>{term.term}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{term.definition.slice(0, 110)}…</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, marginBottom: '28px' }}>Browse by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '12px' }}>
            {categories.map(cat => {
              const count = allTerms.filter(t => t.category === cat).length;
              const color = categoryColors[cat] ?? '#6b7280';
              const icon = categoryIcons[cat] ?? '📖';
              return (
                <Link key={cat} href={`/browse?category=${encodeURIComponent(cat)}`} style={{
                  padding: '18px 20px', borderRadius: '10px', background: 'var(--bg)',
                  border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s',
                }}>
                  <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.3 }}>{cat}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>{count} term{count !== 1 ? 's' : ''}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <div className="highlight-box" style={{ display: 'inline-block', padding: '24px 40px', borderRadius: '0 12px 12px 0' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic' }}>
            "The first step to mastering economics is learning its language."
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/browse" style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', background: 'var(--accent)', color: 'var(--bg)', display: 'inline-block' }}>Browse all terms</Link>
            <Link href="/search" style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: '1px solid var(--border-light)', color: 'var(--text)', display: 'inline-block' }}>Search</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
