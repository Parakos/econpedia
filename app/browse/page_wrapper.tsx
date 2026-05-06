import { Suspense } from 'react';
import BrowseClient from './BrowseClient';

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'40px 24px', color:'var(--text-muted)' }}>
        Loading…
      </div>
    }>
      <BrowseClient />
    </Suspense>
  );
}
