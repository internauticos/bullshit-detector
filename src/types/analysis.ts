
export interface AnalysisResult {
  url: string;
  title: string;
  verdict: 'bullshit' | 'ok';
  confidence: number;
  reasons: string[];
  timestamp: Date;
  bullshitRating: number; // 0-100 scale
}

export interface AnalysisScore {
  verdict: 'bullshit' | 'ok';
  confidence: number;
  bullshitRating: number;
  reasons: string[];
}
