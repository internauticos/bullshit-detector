
import { Vote, VotingStats } from '@/types/voting';

const STORAGE_KEY = 'bullshit_detector_votes';

export const saveVote = (vote: Vote): void => {
  try {
    const existingVotes = getVotes();
    const updatedVotes = [...existingVotes, vote];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVotes));
  } catch (error) {
    console.error('Error saving vote:', error);
  }
};

export const getVotes = (): Vote[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const votes = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return votes.map((vote: any) => ({
      ...vote,
      timestamp: new Date(vote.timestamp)
    }));
  } catch (error) {
    console.error('Error loading votes:', error);
    return [];
  }
};

export const getVotingStats = (): VotingStats => {
  const votes = getVotes();
  
  if (votes.length === 0) {
    return {
      totalVotes: 0,
      averageRating: 0,
      accuracyRate: 0
    };
  }

  const totalRating = votes.reduce((sum, vote) => sum + vote.userRating, 0);
  const accurateVotes = votes.filter(vote => vote.wasAccurate).length;

  // Calculate weighted accuracy - give more weight to votes with higher confidence (rating)
  const weightedAccuracy = votes.reduce((sum, vote) => {
    const weight = vote.userRating; // Higher ratings carry more weight
    const accuracyScore = vote.wasAccurate ? weight : 0;
    return sum + accuracyScore;
  }, 0);

  const totalWeight = votes.reduce((sum, vote) => sum + vote.userRating, 0);
  const weightedAccuracyRate = totalWeight > 0 ? (weightedAccuracy / totalWeight) * 100 : 0;

  return {
    totalVotes: votes.length,
    averageRating: Math.round((totalRating / votes.length) * 10) / 10,
    accuracyRate: Math.round(weightedAccuracyRate)
  };
};

export const getVotesForUrl = (url: string): Vote[] => {
  return getVotes().filter(vote => vote.analysisUrl === url);
};

export const calculateCommunityAdjustedRating = (originalRating: number, url: string): number => {
  const votes = getVotesForUrl(url);
  
  if (votes.length === 0) {
    return originalRating;
  }

  // Calculate community consensus
  const accurateVotes = votes.filter(vote => vote.wasAccurate).length;
  const inaccurateVotes = votes.length - accurateVotes;
  const accuracyRatio = votes.length > 0 ? accurateVotes / votes.length : 0.5;
  
  // Calculate average user rating (1-5 scale, convert to adjustment factor)
  const avgUserRating = votes.reduce((sum, vote) => sum + vote.userRating, 0) / votes.length;
  const ratingAdjustment = (avgUserRating - 3) * 5; // Convert 1-5 scale to -10 to +10 adjustment
  
  // Apply community consensus adjustment
  let adjustedRating = originalRating;
  
  // If community strongly disagrees with AI verdict, adjust rating
  if (accuracyRatio < 0.3 && votes.length >= 3) {
    // Strong disagreement - significant adjustment towards middle
    if (originalRating > 60) {
      adjustedRating = Math.max(30, originalRating - 30);
    } else {
      adjustedRating = Math.min(70, originalRating + 30);
    }
  } else if (accuracyRatio < 0.5 && votes.length >= 5) {
    // Moderate disagreement
    if (originalRating > 60) {
      adjustedRating = Math.max(40, originalRating - 20);
    } else {
      adjustedRating = Math.min(60, originalRating + 20);
    }
  }
  
  // Apply user rating adjustment
  adjustedRating += ratingAdjustment;
  
  // Ensure rating stays within bounds
  return Math.max(0, Math.min(100, Math.round(adjustedRating)));
};
