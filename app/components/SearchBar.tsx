'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchTerms } from '../data';
import type { Term } from '../types';
import CategoryBadge from './CategoryBadge';

export default function SearchBar({ autoFocus = false, large = false }: { autoFocus?: boolean; large?: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Term[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 1) {
      setResults(searchTerms(query).slice(0, 6));
      setOpen(true);
      setActive(-1);
    } else {
      setOpen(false);
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, -1)); }
    if (e.key === 'Enter') {
      if (active >= 0 && results[active]) {
        router.push(`/terms/${results[active].id}`);
        setOpen(false); setQuery('');
      } else if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
      }
    }
    if (e.key === 'Escape') setOpen(false);
  }

  function go(id: string) {
    router.push(`/terms/${id}`);
    setOpen(false); setQuery('');
  }

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: large ? '18px' : '14px',
          top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-dim)', fontSize: large ? '18px' : '16px', pointerEvents: 'none',
        }}>🔍</span>
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => query && setOpen(true)}
          placeholder="Search 125 economics terms…"
          style={{
            width: '100%',
            padding: large ? '16px 20px 16px 50px' : '11px 16px 11px 42px',
            borderRadius: '10px',
            fontSize: large ? '17px' : '15px',
          }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer',
              fontSize: '18px', lineHeight: 1,
            }}>×</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '10px', overflow: 'hidden', zIndex: 10000,
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        }}>
          {results.map((t, i) => (
            <button key={t.id} onClick={() => go(t.id)}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 16px',
                background: active === i ? 'var(--bg3)' : 'transparent',
                border: 'none', borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '12px',
              }}
              onMouseEnter={() => setActive(i)}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--text)', fontWeight: 600 }}>
                  {t.term}
                  {t.abbreviation && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', marginLeft: '8px', fontStyle: 'normal' }}>
                      {t.abbreviation}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                  {t.definition.slice(0, 80)}…
                </div>
              </div>
              <CategoryBadge category={t.category} />
            </button>
          ))}
          {query.trim() && (
            <button onClick={() => { router.push(`/search?q=${encodeURIComponent(query.trim())}`); setOpen(false); }}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 16px',
                background: 'var(--bg3)', border: 'none', cursor: 'pointer',
                fontSize: '13px', color: 'var(--text-muted)',
              }}>
              See all results for <strong style={{ color: 'var(--accent)' }}>"{query}"</strong> →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
