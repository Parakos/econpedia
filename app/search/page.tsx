import { Suspense } from 'react';
import SearchClient from './SearchClient';
export default function SearchPage() {
  return <Suspense fallback={<div style={{padding:'60px 24px',color:'var(--text-muted)',textAlign:'center'}}>Loading…</div>}><SearchClient /></Suspense>;
}
