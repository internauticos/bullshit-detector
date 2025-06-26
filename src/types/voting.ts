
export interface Vote {
  id: string;
  analysisUrl: string;
  userRating: 1 | 2 | 3 | 4 | 5; // 1-5 star rating
  feedback: string;
  timestamp: Date;
  wasAccurate: boolean; // whether user agrees with the AI verdict
}

export interface VotingStats {
  totalVotes: number;
  averageRating: number;
  accuracyRate: number; // percentage of users who agreed with AI
}
