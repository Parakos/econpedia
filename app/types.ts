export interface Term {
  id: string;
  term: string;
  abbreviation: string | null;
  category: string;
  definition: string;
  origin: string;
  examples: string[];
  related: string[];
}
