
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ResultCard from './ResultCard';
import VotingStats from './VotingStats';
import LanguageSelector from './LanguageSelector';
import { analyzeContent } from '@/utils/contentAnalyzer';

interface AnalysisResult {
  url: string;
  title: string;
  verdict: 'bullshit' | 'ok';
  confidence: number;
  reasons: string[];
  timestamp: Date;
  bullshitRating: number;
}

const BullshitDetector = () => {
  const { t, language } = useLanguage();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: t('error.title'),
        description: t('error.enterUrl'),
        variant: "destructive"
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: t('error.invalidUrl'),
        description: t('error.invalidUrl'),
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeContent(url, language);
      setResults(prev => [result, ...prev]);
      
      toast({
        title: t('success.analysisComplete'),
        description: `${t('success.analysisComplete')}: ${result.verdict === 'bullshit' ? `${result.bullshitRating}/100 ${t('success.bullshitDetected')}` : t('success.looksLegitimate')}`,
        variant: result.verdict === 'bullshit' ? "destructive" : "default"
      });
      
      setUrl('');
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: t('error.analysisFailed'),
        description: t('error.analysisFailedDesc'),
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">{t('app.title')}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('app.description')}
          </p>
          
          {/* Language Selector */}
          <div className="flex justify-center mt-6">
            <LanguageSelector />
          </div>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder={t('input.placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg h-12"
                  disabled={isAnalyzing}
                />
              </div>
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="h-12 px-8 text-lg font-semibold"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('input.analyzing')}
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    {t('input.button')}
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>{t('input.description')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Voting Stats */}
        <div className="mb-8">
          <VotingStats />
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('results.title')}</h2>
            {results.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !isAnalyzing && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">{t('empty.title')}</h3>
            <p className="text-gray-400">{t('empty.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BullshitDetector;
