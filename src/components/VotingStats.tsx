
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Star, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getVotingStats, getVotes } from '@/utils/votingStorage';

const VotingStats = () => {
  const { t } = useLanguage();
  const stats = getVotingStats();
  const allVotes = getVotes();

  if (stats.totalVotes === 0) {
    return null;
  }

  // Calculate additional accuracy insights
  const agreeVotes = allVotes.filter(vote => vote.wasAccurate).length;
  const disagreeVotes = allVotes.filter(vote => !vote.wasAccurate).length;
  const strongAgreement = allVotes.filter(vote => vote.wasAccurate && vote.userRating >= 4).length;
  const strongDisagreement = allVotes.filter(vote => !vote.wasAccurate && vote.userRating >= 4).length;

  const getAccuracyColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAccuracyDescription = (rate: number) => {
    if (rate >= 80) return t('stats.highAgreement');
    if (rate >= 60) return t('stats.moderateAgreement');
    if (rate >= 40) return t('stats.mixedFeedback');
    return t('stats.lowAgreement');
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          {t('stats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{t('stats.totalVotes')}</span>
            </div>
            <Badge variant="secondary" className="text-lg font-bold">
              {stats.totalVotes}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-blue-700">{t('stats.avgRating')}</span>
            </div>
            <Badge variant="secondary" className="text-lg font-bold">
              {stats.averageRating}/5
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-blue-700">{t('stats.aiAccuracy')}</span>
            </div>
            <Badge variant="secondary" className={`text-lg font-bold ${getAccuracyColor(stats.accuracyRate)}`}>
              {stats.accuracyRate}%
            </Badge>
          </div>
        </div>

        {/* Detailed accuracy breakdown */}
        <div className="bg-white rounded-lg p-3 border mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {t('stats.accuracyBreakdown')}
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('stats.agreeWithAi')}</span>
              <span className="font-medium text-green-600">{agreeVotes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('stats.disagreeWithAi')}</span>
              <span className="font-medium text-red-600">{disagreeVotes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('stats.strongAgreement')}</span>
              <span className="font-medium text-green-700">{strongAgreement}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('stats.strongDisagreement')}</span>
              <span className="font-medium text-red-700">{strongDisagreement}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-gray-600 text-center">
              {getAccuracyDescription(stats.accuracyRate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VotingStats;
