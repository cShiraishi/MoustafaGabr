export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number | null;
  citations: number;
  link: string;
};

export type ScholarMetrics = {
  citations: number;
  hIndex: number;
  i10Index: number;
};

export type ScholarSource = "serpapi" | "scrape" | "snapshot";

export type ScholarProfile = {
  name: string;
  affiliation: string;
  interests: string[];
  metrics: ScholarMetrics;
  citationsPerYear: { year: number; citations: number }[];
  publications: Publication[];
  source: ScholarSource;
  fetchedAt: string;
};

export declare function decodeEntities(input?: string): string;

export declare function fetchFromSerpApi(options: {
  scholarId: string;
  apiKey: string;
  fetchImpl?: typeof fetch;
}): Promise<ScholarProfile>;

export declare function fetchFromScrape(options: {
  scholarId: string;
  fetchImpl?: typeof fetch;
  pageSize?: number;
}): Promise<ScholarProfile>;

export declare function fetchScholarProfile(options?: {
  scholarId: string;
  serpApiKey?: string;
  allowScrape?: boolean;
  snapshot?: ScholarProfile | null;
  fetchImpl?: typeof fetch;
  onWarn?: (message: string) => void;
}): Promise<ScholarProfile>;
