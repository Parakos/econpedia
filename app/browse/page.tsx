import { Suspense } from 'react';
import BrowseClient from './BrowseClient';
export default function BrowsePage() {
  return <Suspense fallback={<div style={{padding:'60px 24px',color:'var(--text-muted)',textAlign:'center'}}>Loading…</div>}><BrowseClient /></Suspense>;
}
