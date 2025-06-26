
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, ExternalLink, Clock, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import VotingSection from './VotingSection';
import { calculateCommunityAdjustedRating, getVotesForUrl } from '@/utils/votingStorage';

interface AnalysisResult {
  url: string;
  title: string;
  verdict: 'bullshit' | 'ok';
  confidence: number;
  reasons: string[];
  timestamp: Date;
  bullshitRating?: number;
}

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const { t } = useLanguage();
  const { url, title, verdict, confidence, reasons, timestamp, bullshitRating = 0 } = result;
  
  const [adjustedRating, setAdjustedRating] = useState(bullshitRating);
  const [communityVotes, setCommunityVotes] = useState(0);
  
  useEffect(() => {
    const votes = getVotesForUrl(url);
    setCommunityVotes(votes.length);
    const newAdjustedRating = calculateCommunityAdjustedRating(bullshitRating, url);
    setAdjustedRating(newAdjustedRating);
  }, [url, bullshitRating]);

  const handleVoteSubmitted = () => {
    // Recalculate the adjusted rating when a new vote is submitted
    const votes = getVotesForUrl(url);
    setCommunityVotes(votes.length);
    const newAdjustedRating = calculateCommunityAdjustedRating(bullshitRating, url);
    setAdjustedRating(newAdjustedRating);
  };
  
  const isBullshit = verdict === 'bullshit';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBullshitRatingColor = (rating: number) => {
    if (rating >= 80) return 'text-red-600 bg-red-100';
    if (rating >= 60) return 'text-orange-600 bg-orange-100';
    if (rating >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getBullshitDescription = (rating: number) => {
    if (rating >= 80) return t('rating.extremelySuspicious');
    if (rating >= 60) return t('rating.highlyQuestionable');
    if (rating >= 40) return t('rating.somewhatSuspicious');
    if (rating >= 20) return t('rating.mildlyQuestionable');
    return t('rating.appearsLegitimate');
  };

  return (
    <div className="space-y-4">
      <Card className={`transition-all duration-300 hover:shadow-lg ${
        isBullshit 
          ? 'border-red-200 bg-red-50 hover:bg-red-100' 
          : 'border-green-200 bg-green-50 hover:bg-green-100'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {isBullshit ? (
                <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
              )}
              <div>
                <Badge 
                  variant={isBullshit ? "destructive" : "default"}
                  className={`text-lg px-4 py-1 font-bold ${
                    isBullshit 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isBullshit ? t('results.bullshit') : t('results.ok')}
                </Badge>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}>
                    {confidence}% {t('results.confidence')}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Bullshit Rating */}
          <div className="bg-white rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {t('results.rating')}
                {communityVotes > 0 && (
                  <span className="text-xs text-blue-600 flex items-center gap-1 ml-2">
                    <Users className="h-3 w-3" />
                    {t('results.communityAdjusted')}
                  </span>
                )}
              </h4>
              <div className="flex items-center gap-2">
                {bullshitRating !== adjustedRating && (
                  <div className="text-xs text-gray-500 line-through">
                    {bullshitRating}/100
                  </div>
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getBullshitRatingColor(adjustedRating)}`}>
                  {adjustedRating}/100
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  adjustedRating >= 60 ? 'bg-red-500' : adjustedRating >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${adjustedRating}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-600">{getBullshitDescription(adjustedRating)}</p>
              {communityVotes > 0 && (
                <p className="text-xs text-blue-600">{communityVotes} {t('stats.totalVotes').toLowerCase()}</p>
              )}
            </div>
          </div>

          {/* Article Title */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('results.articleTitle')}</h3>
            <p className="text-gray-700 italic">"{title}"</p>
          </div>

          {/* URL */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">{t('results.sourceUrl')}</h4>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm break-all flex items-center gap-1"
            >
              {url}
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>

          {/* Analysis Reasons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              {isBullshit ? t('results.redFlags') : t('results.credibilityIndicators')}
            </h4>
            <ul className="space-y-1">
              {reasons.map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className={`text-xs mt-1 ${isBullshit ? 'text-red-500' : 'text-green-500'}`}>
                    {isBullshit ? '⚠️' : '✓'}
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Warning/Info Message */}
          <div className={`p-3 rounded-lg text-sm ${
            isBullshit 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {isBullshit ? (
              <p>
                <strong>{t('results.warningTitle')}</strong> {t('results.warningText')}
              </p>
            ) : (
              <p>
                <strong>{t('results.infoTitle')}</strong> {t('results.infoText')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voting Section */}
      <VotingSection 
        analysisUrl={url} 
        aiVerdict={verdict} 
        onVoteSubmitted={handleVoteSubmitted}
      />
    </div>
  );
};

export default ResultCard;
