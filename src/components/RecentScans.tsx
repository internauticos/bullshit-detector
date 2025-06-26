
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Demo data for recent fake news detections
const demoScans = [
  {
    id: 1,
    title: "Scientists Discover Aliens Living in Antarctica",
    url: "https://fake-news-site.com/aliens-antarctica",
    domain: "fake-news-site.com",
    bullshitRating: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    verdict: 'bullshit' as const
  },
  {
    id: 2,
    title: "New Study: Drinking Water Causes Cancer",
    url: "https://unreliable-health.net/water-cancer-study",
    domain: "unreliable-health.net",
    bullshitRating: 88,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    verdict: 'bullshit' as const
  },
  {
    id: 3,
    title: "Government Plans to Replace All Birds with Drones",
    url: "https://conspiracy-central.org/birds-drones-government",
    domain: "conspiracy-central.org",
    bullshitRating: 92,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    verdict: 'bullshit' as const
  },
  {
    id: 4,
    title: "Local Man Claims He Can Fly After Eating Spinach",
    url: "https://satirical-times.com/flying-spinach-man",
    domain: "satirical-times.com",
    bullshitRating: 85,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    verdict: 'bullshit' as const
  }
];

const RecentScans = () => {
  const { t } = useLanguage();

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return t('time.justNow') || 'Just now';
    } else if (diffInHours === 1) {
      return t('time.oneHourAgo') || '1 hour ago';
    } else {
      return `${diffInHours} ${t('time.hoursAgo') || 'hours ago'}`;
    }
  };

  const getBullshitRatingColor = (rating: number) => {
    if (rating >= 90) return 'text-red-600 bg-red-100';
    if (rating >= 80) return 'text-red-500 bg-red-50';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('recentScans.title') || 'Recent Fake News Detections'}
        </h2>
        <p className="text-gray-600">
          {t('recentScans.subtitle') || 'Latest articles flagged by our AI as potentially misleading'}
        </p>
        <Badge variant="secondary" className="mt-2">
          {t('recentScans.demo') || 'Demo Data'}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {demoScans.map((scan) => (
          <Card key={scan.id} className="border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <Badge variant="destructive" className="text-xs">
                    {t('results.bullshit') || 'Fake News'}
                  </Badge>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${getBullshitRatingColor(scan.bullshitRating)}`}>
                  {scan.bullshitRating}/100
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {scan.title}
                </h3>
              </div>

              <div className="text-xs text-gray-600">
                <div className="flex items-center gap-1 mb-1">
                  <ExternalLink className="h-3 w-3" />
                  <span className="truncate">{scan.domain}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(scan.timestamp)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-red-200">
                <p className="text-xs text-red-700">
                  {t('recentScans.warning') || 'This content has been flagged as potentially misleading or false.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;
