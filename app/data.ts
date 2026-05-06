import termsData from './terms.json';
import type { Term } from './types';

export const allTerms: Term[] = termsData as Term[];

export const categories = [...new Set(allTerms.map(t => t.category))].sort();

export function getTermBySlug(slug: string): Term | undefined {
  return allTerms.find(t => t.id === slug);
}

export function getTermsByCategory(category: string): Term[] {
  return allTerms.filter(t => t.category === category).sort((a, b) => a.term.localeCompare(b.term));
}

export function searchTerms(query: string): Term[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allTerms.filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.abbreviation?.toLowerCase().includes(q) ||
    t.definition.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  ).sort((a, b) => {
    const aStarts = a.term.toLowerCase().startsWith(q) ? -1 : 0;
    const bStarts = b.term.toLowerCase().startsWith(q) ? -1 : 0;
    return aStarts - bStarts || a.term.localeCompare(b.term);
  });
}

export function getRelatedTerms(term: Term): Term[] {
  return term.related
    .map(name => allTerms.find(t => t.term.toLowerCase() === name.toLowerCase() || t.abbreviation?.toLowerCase() === name.toLowerCase()))
    .filter(Boolean) as Term[];
}

export function getFeaturedTerms(): Term[] {
  const featured = ['gdp', 'inflation', 'compound-interest', 'fiscal-policy', 'cryptocurrency', 'dollar-cost-averaging'];
  return featured.map(id => allTerms.find(t => t.id === id)).filter(Boolean) as Term[];
}

export const categoryColors: Record<string, string> = {
  'Macroeconomics': '#2563eb',
  'Personal Finance': '#16a34a',
  'Investing': '#9333ea',
  'Banking & Institutions': '#0891b2',
  'Digital & Technology': '#ea580c',
  'Economics & Theory': '#b45309',
  'Business & Entrepreneurship': '#dc2626',
  'Economic History': '#4b5563',
};

export const categoryIcons: Record<string, string> = {
  'Macroeconomics': '🌍',
  'Personal Finance': '💰',
  'Investing': '📈',
  'Banking & Institutions': '🏦',
  'Digital & Technology': '💻',
  'Economics & Theory': '📚',
  'Business & Entrepreneurship': '🚀',
  'Economic History': '🏛️',
};
