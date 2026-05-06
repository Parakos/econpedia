import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTermBySlug, getRelatedTerms, allTerms, categoryColors } from '../../data';
import CategoryBadge from '../../components/CategoryBadge';
import GeminiPanel from '../../components/GeminiPanel';

export async function generateStaticParams() {
  return allTerms.map(t => ({ slug: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return { title: 'Term Not Found' };
  return {
    title: `${term.term}${term.abbreviation ? ` (${term.abbreviation})` : ''} – EconPedia`,
    description: term.definition.slice(0, 155),
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const related = getRelatedTerms(term);
  const color = categoryColors[term.category] ?? '#6b7280';

  // Get prev/next for navigation
  const sorted = [...allTerms].sort((a, b) => a.term.localeCompare(b.term));
  const idx = sorted.findIndex(t => t.id === term.id);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', fontSize: '13px', color: 'var(--text-dim)' }}>
        <Link href="/" style={{ color: 'var(--text-dim)' }}>Home</Link>
        <span>›</span>
        <Link href="/browse" style={{ color: 'var(--text-dim)' }}>Browse</Link>
        <span>›</span>
        <Link href={`/browse?category=${encodeURIComponent(term.category)}`} style={{ color: color }}>
          {term.category}
        </Link>
        <span>›</span>
        <span style={{ color: 'var(--text-muted)' }}>{term.term}</span>
      </div>

      {/* Header */}
      <div className="fade-up fade-up-1" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <CategoryBadge category={term.category} size="md" />
          {term.abbreviation && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)',
              background: 'var(--bg3)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border)',
            }}>
              {term.abbreviation}
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '8px' }}>
          {term.term}
        </h1>
        {term.abbreviation && (
          <p style={{ fontSize: '15px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
            /{term.abbreviation}/
          </p>
        )}
      </div>

      <div className="gradient-line" style={{ marginBottom: '32px', borderRadius: '2px' }} />

      {/* Definition */}
      <section className="fade-up fade-up-2" style={{ marginBottom: '36px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '14px',
        }}>
          <span style={{ width: '3px', height: '20px', background: 'var(--accent)', borderRadius: '2px', flexShrink: 0 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>Definition</h2>
        </div>
        <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--text)' }}>
          {term.definition}
        </p>
      </section>

      {/* Origin */}
      <section className="fade-up fade-up-3" style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ width: '3px', height: '20px', background: 'var(--blue)', borderRadius: '2px', flexShrink: 0 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>Origin &amp; History</h2>
        </div>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '20px 22px',
        }}>
          <span style={{ fontSize: '28px', marginRight: '10px', verticalAlign: 'middle' }}>🏛️</span>
          <span style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-muted)' }}>{term.origin}</span>
        </div>
      </section>

      {/* Examples */}
      <section className="fade-up fade-up-4" style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ width: '3px', height: '20px', background: 'var(--green)', borderRadius: '2px', flexShrink: 0 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>Real-World Examples</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {term.examples.map((ex, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '16px 18px',
            }}>
              <span style={{
                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(76,175,130,0.15)', border: '1px solid rgba(76,175,130,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)',
              }}>
                {i + 1}
              </span>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text)', margin: 0 }}>{ex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Terms */}
      {related.length > 0 && (
        <section className="fade-up fade-up-5" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ width: '3px', height: '20px', background: 'var(--accent-dim)', borderRadius: '2px', flexShrink: 0 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>Related Terms</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {related.map(r => (
              <Link key={r.id} href={`/terms/${r.id}`}
                style={{
                  padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500,
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  color: 'var(--text-muted)', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                <span>{term.category === r.category ? '🔗' : '↗'}</span>
                {r.term}
                {r.abbreviation && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>({r.abbreviation})</span>}
              </Link>
            ))}
            {/* show unlinked related that didn't resolve */}
            {term.related
              .filter(name => !related.find(r => r.term.toLowerCase() === name.toLowerCase() || r.abbreviation?.toLowerCase() === name.toLowerCase()))
              .map(name => (
                <span key={name} style={{
                  padding: '8px 16px', borderRadius: '20px', fontSize: '13px',
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--text-dim)',
                }}>
                  {name}
                </span>
              ))}
          </div>
        </section>
      )}

      {/* Gemini Ask AI */}
      <div className="fade-up fade-up-6">
        <GeminiPanel term={term} />
      </div>

      {/* Prev / Next nav */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '48px',
        borderTop: '1px solid var(--border)', paddingTop: '32px',
      }}>
        {prev ? (
          <Link href={`/terms/${prev.id}`} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px',
            padding: '16px', transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '0.05em' }}>← PREVIOUS</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600 }}>{prev.term}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/terms/${next.id}`} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px',
            padding: '16px', transition: 'all 0.2s', textAlign: 'right',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '0.05em' }}>NEXT →</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600 }}>{next.term}</div>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
