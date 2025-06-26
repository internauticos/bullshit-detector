import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { saveVote, getVotesForUrl } from '@/utils/votingStorage';
import { Vote } from '@/types/voting';

interface VotingSectionProps {
  analysisUrl: string;
  aiVerdict: 'bullshit' | 'ok';
  onVoteSubmitted?: () => void; // Callback to trigger re-ranking
}

const VotingSection = ({ analysisUrl, aiVerdict, onVoteSubmitted }: VotingSectionProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [wasAccurate, setWasAccurate] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingVotes = getVotesForUrl(analysisUrl);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleAccuracyVote = (accurate: boolean) => {
    setWasAccurate(accurate);
  };

  const handleSubmitVote = async () => {
    if (userRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (wasAccurate === null) {
      toast({
        title: "Accuracy Vote Required", 
        description: "Please indicate if you agree with our analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const vote: Vote = {
        id: Date.now().toString(),
        analysisUrl,
        userRating: userRating as 1 | 2 | 3 | 4 | 5,
        feedback: feedback.trim(),
        timestamp: new Date(),
        wasAccurate
      };

      saveVote(vote);
      setHasVoted(true);

      // Trigger re-ranking in parent component
      if (onVoteSubmitted) {
        onVoteSubmitted();
      }

      toast({
        title: "Thank you for your feedback!",
        description: "Your vote has been recorded and the bullshit rating has been updated based on community feedback.",
        variant: "default"
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasVoted || existingVotes.length > 0) {
    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Community Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-2">
            {hasVoted ? "Thanks for your feedback!" : "You've already provided feedback for this article."}
          </p>
          <div className="text-sm text-blue-600">
            Total votes for this article: {existingVotes.length}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          Help Improve Our Detection
        </CardTitle>
        <p className="text-sm text-gray-600">
          Your feedback helps us improve the bullshit detection algorithm
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Accuracy Vote */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            Do you agree with our analysis? (Article is {aiVerdict === 'bullshit' ? 'bullshit' : 'legitimate'})
          </h4>
          <div className="flex gap-3">
            <Button
              variant={wasAccurate === true ? "default" : "outline"}
              onClick={() => handleAccuracyVote(true)}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              Yes, I agree
            </Button>
            <Button
              variant={wasAccurate === false ? "destructive" : "outline"}
              onClick={() => handleAccuracyVote(false)}
              className="flex items-center gap-2"
            >
              <ThumbsDown className="h-4 w-4" />
              No, I disagree
            </Button>
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Rate our analysis quality:</h4>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= userRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {userRating === 1 && "Poor"}
              {userRating === 2 && "Fair"}
              {userRating === 3 && "Good"}
              {userRating === 4 && "Very Good"}
              {userRating === 5 && "Excellent"}
            </p>
          )}
        </div>

        {/* Feedback Text */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Additional feedback (optional):</h4>
          <Textarea
            placeholder="Tell us what we got right or wrong, or suggest improvements..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[80px]"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {feedback.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitVote}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VotingSection;
