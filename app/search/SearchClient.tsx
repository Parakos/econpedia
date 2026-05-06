'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import CategoryBadge from '../components/CategoryBadge';
import { searchTerms, allTerms } from '../data';
import type { Term } from '../types';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Term[]>([]);
  const query = searchParams.get('q') ?? '';

  useEffect(() => {
    setResults(query ? searchTerms(query) : []);
  }, [query]);

  return (
    <div style={{ maxWidth:'860px', margin:'0 auto', padding:'40px 24px' }}>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,4vw,38px)', fontWeight:700, marginBottom:'24px' }}>Search</h1>
      <div style={{ marginBottom:'32px' }}><SearchBar autoFocus large /></div>

      {query && (
        <div style={{ marginBottom:'20px', color:'var(--text-muted)', fontSize:'14px' }}>
          {results.length > 0
            ? <><strong style={{ color:'var(--text)' }}>{results.length}</strong> result{results.length!==1?'s':''} for <strong style={{ color:'var(--accent)' }}>"{query}"</strong></>
            : <>No results for <strong style={{ color:'var(--accent)' }}>"{query}"</strong></>
          }
        </div>
      )}
      {!query && <div style={{ color:'var(--text-muted)', fontSize:'15px', marginBottom:'32px' }}>Search across {allTerms.length} economics terms by name, abbreviation, or keyword.</div>}

      {results.length > 0 ? (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {results.map(term => (
            <Link key={term.id} href={`/terms/${term.id}`} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'18px 20px', display:'flex', alignItems:'flex-start', gap:'16px', transition:'all 0.15s' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:600 }}>{term.term}</span>
                  {term.abbreviation && <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)', background:'var(--bg3)', padding:'2px 7px', borderRadius:'4px' }}>{term.abbreviation}</span>}
                  <CategoryBadge category={term.category} />
                </div>
                <p style={{ fontSize:'13px', color:'var(--text-muted)', lineHeight:1.6 }}>{term.definition.slice(0,140)}…</p>
              </div>
              <span style={{ color:'var(--text-dim)', fontSize:'18px', flexShrink:0 }}>→</span>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>🤔</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'22px', marginBottom:'10px' }}>Nothing found</div>
          <p style={{ fontSize:'14px' }}>Try a different keyword, or <Link href="/browse" style={{ color:'var(--accent)' }}>browse all terms</Link>.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'10px', marginTop:'8px' }}>
          {['GDP','Inflation','Bitcoin','Recession','Budget','Interest','Mortgage','Dividend'].map(s=>(
            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} style={{ padding:'10px 14px', borderRadius:'8px', fontSize:'13px', fontWeight:500, background:'var(--bg2)', border:'1px solid var(--border)', color:'var(--text-muted)', transition:'all 0.15s', textAlign:'center' }}>{s}</Link>
          ))}
        </div>
      )}
    </div>
  );
}
