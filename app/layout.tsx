import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'EconPedia – Economics Dictionary for Teens',
  description: 'A clear, engaging economics dictionary. 125 terms explained simply with origins, examples, and AI explanations.',
  metadataBase: new URL('https://econpedia.vercel.app'),
  openGraph: {
    title: 'EconPedia – Economics Dictionary for Teens',
    description: '125 economics terms explained simply — definitions, origins, real-world examples, and AI explanations.',
    url: 'https://econpedia.vercel.app',
    siteName: 'EconPedia',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'EconPedia – Economics Dictionary',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EconPedia – Economics Dictionary for Teens',
    description: '125 economics terms explained simply.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <footer style={{
          borderTop: '1px solid var(--border)', padding: '32px 24px',
          textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px',
          fontFamily: 'var(--font-body)', marginTop: '80px'
        }}>
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '16px', fontStyle: 'italic' }}>EconPedia</span>
          <span style={{ margin: '0 12px', color: 'var(--border-light)' }}>·</span>
          125 economic terms explained simply
          <span style={{ margin: '0 12px', color: 'var(--border-light)' }}>·</span>
          Built for students
        </footer>
      </body>
    </html>
  );
}
