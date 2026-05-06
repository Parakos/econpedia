'use client';
import { useState } from 'react';
import type { Term } from '../types';

const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? '';

export default function GeminiPanel({ term }: { term: Term }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

  const suggestions = [
    `Give me a simple real-world example of ${term.term}`,
    `How does ${term.term} affect everyday life?`,
    `What's the difference between ${term.term} and related concepts?`,
    `Why is ${term.term} important for teenagers to understand?`,
  ];

  async function ask(q: string) {
    if (!q.trim()) return;
    if (!GEMINI_KEY) {
      setError('No Gemini API key found. Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.');
      return;
    }
    setLoading(true);
    setError('');
    setAnswer('');

    const context = `You are an engaging economics teacher explaining concepts to teenagers aged 14-18. 
Term: "${term.term}" ${term.abbreviation ? `(${term.abbreviation})` : ''}
Category: ${term.category}
Definition: ${term.definition}

Answer the student's question clearly, in 2-4 short paragraphs. Use simple language, relatable examples (smartphones, social media, sports, food), and be enthusiastic. Avoid jargon. Format with plain text only, no markdown.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${context}\n\nStudent question: ${q}` }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
          }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';
      setAnswer(text);
      setHistory(h => [...h, { q, a: text }]);
      setQuestion('');
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gemini-panel" style={{ marginTop: '32px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '18px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer', gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '22px' }}>✨</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--text)', fontWeight: 600 }}>
              Ask Gemini about this term
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Powered by Google Gemini — ask anything about {term.term}
            </div>
          </div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '18px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          ▼
        </span>
      </button>

      {open && (
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(91,156,246,0.15)' }}>

          {/* Suggestion chips */}
          {history.length === 0 && (
            <div style={{ paddingTop: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Try asking:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => ask(s)}
                    style={{
                      padding: '7px 14px', borderRadius: '20px', fontSize: '12px',
                      background: 'rgba(91,156,246,0.1)', border: '1px solid rgba(91,156,246,0.2)',
                      color: 'var(--blue)', cursor: 'pointer', fontFamily: 'var(--font-body)',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(91,156,246,0.2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(91,156,246,0.1)')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {history.map((item, i) => (
            <div key={i} style={{ marginTop: '16px' }}>
              <div style={{
                fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
                marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span>🧑‍🎓</span> {item.q}
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '14px 16px',
                fontSize: '14px', color: 'var(--text)', lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}>
                <span style={{ marginRight: '8px' }}>✨</span>{item.a}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <span style={{ animation: 'pulse 1s ease-in-out infinite', display: 'inline-block' }}>✨</span>
              Gemini is thinking…
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              marginTop: '12px', padding: '12px 14px', borderRadius: '8px',
              background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.2)',
              color: 'var(--red)', fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          {/* Input */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <input
              className="search-input"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && ask(question)}
              placeholder={`Ask anything about ${term.term}…`}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', fontSize: '14px' }}
            />
            <button
              onClick={() => ask(question)}
              disabled={loading || !question.trim()}
              style={{
                padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: question.trim() && !loading ? 'var(--accent)' : 'var(--bg3)',
                color: question.trim() && !loading ? 'var(--bg)' : 'var(--text-dim)',
                fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >
              {loading ? '…' : 'Ask ✨'}
            </button>
          </div>

          <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-dim)' }}>
            Requires a free Gemini API key in <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg3)', padding: '1px 5px', borderRadius: '3px' }}>.env.local</code>
          </div>
        </div>
      )}
    </div>
  );
}
