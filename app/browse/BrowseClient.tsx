'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { allTerms, categories, categoryColors, categoryIcons } from '../data';
import CategoryBadge from '../components/CategoryBadge';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function BrowseClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeLetter, setActiveLetter] = useState<string|null>(null);
  const [activeCategory, setActiveCategory] = useState<string|null>(null);

  useEffect(() => {
    setActiveCategory(searchParams.get('category'));
    setActiveLetter(searchParams.get('letter'));
  }, [searchParams]);

  function setFilter(type: 'category'|'letter', value: string|null) {
    const params = new URLSearchParams();
    if (type === 'category' && value) params.set('category', value);
    if (type === 'letter' && value) params.set('letter', value);
    router.push(`/browse?${params.toString()}`);
  }

  let filtered = [...allTerms];
  if (activeCategory) filtered = filtered.filter(t => t.category === activeCategory);
  if (activeLetter) filtered = filtered.filter(t => t.term[0].toUpperCase() === activeLetter);
  filtered.sort((a,b) => a.term.localeCompare(b.term));
  const letterSet = new Set(allTerms.map(t => t.term[0].toUpperCase()));

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'40px 24px' }}>
      <div style={{ marginBottom:'36px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5vw,44px)', fontWeight:700, marginBottom:'8px' }}>Browse Terms</h1>
        <p style={{ color:'var(--text-muted)', fontSize:'15px' }}>
          {filtered.length} of {allTerms.length} terms
          {(activeCategory||activeLetter) && (
            <button onClick={() => router.push('/browse')} style={{ marginLeft:'12px', padding:'2px 10px', borderRadius:'12px', background:'var(--bg3)', border:'1px solid var(--border)', fontSize:'12px', color:'var(--text-muted)', cursor:'pointer' }}>× Clear filters</button>
          )}
        </p>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <div style={{ fontSize:'11px', color:'var(--text-dim)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'10px' }}>Filter by Category</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {categories.map(cat => {
            const color = categoryColors[cat]??'#6b7280';
            const icon = categoryIcons[cat]??'📖';
            const isActive = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setFilter('category', isActive ? null : cat)} style={{ padding:'6px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.15s', background:isActive ? color : `${color}15`, color:isActive ? '#fff' : color, border:`1px solid ${color}40` }}>
                {icon} {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:'32px' }}>
        <div style={{ fontSize:'11px', color:'var(--text-dim)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'10px' }}>Filter by Letter</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
          {ALPHABET.map(l => (
            <button key={l} onClick={() => letterSet.has(l) && setFilter('letter', activeLetter === l ? null : l)}
              className={`alpha-btn ${!letterSet.has(l)?'disabled':''} ${activeLetter===l?'active':''}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="gradient-line" style={{ marginBottom:'32px', borderRadius:'2px' }} />

      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 24px', color:'var(--text-muted)' }}>
          <div style={{ fontSize:'40px', marginBottom:'16px' }}>🔍</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'20px', marginBottom:'8px' }}>No terms found</div>
          <button onClick={() => router.push('/browse')} style={{ color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontSize:'14px' }}>Clear filters</button>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
          {filtered.map(term => (
            <Link key={term.id} href={`/terms/${term.id}`} className="term-card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                <CategoryBadge category={term.category} />
                {term.abbreviation && <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-dim)', background:'var(--bg3)', padding:'2px 6px', borderRadius:'3px' }}>{term.abbreviation}</span>}
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'17px', fontWeight:600, marginBottom:'6px', lineHeight:1.3 }}>{term.term}</h3>
              <p style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:1.55 }}>{term.definition.slice(0,90)}…</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
