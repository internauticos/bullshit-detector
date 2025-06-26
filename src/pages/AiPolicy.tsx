
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Search, AlertTriangle, Eye, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AiPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('aiPolicy.title')}
            </h1>
          </div>

          {/* Purpose */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-600" />
                {t('aiPolicy.purpose')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aiPolicy.purposeText')}
              </p>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Search className="w-8 h-8 text-blue-600" />
                {t('aiPolicy.methodology')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aiPolicy.methodologyText')}
              </p>
            </CardContent>
          </Card>

          {/* AI Limitations */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                {t('aiPolicy.limitations')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aiPolicy.limitationsText')}
              </p>
            </CardContent>
          </Card>

          {/* Transparency */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Eye className="w-8 h-8 text-green-600" />
                {t('aiPolicy.transparency')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aiPolicy.transparencyText')}
              </p>
            </CardContent>
          </Card>

          {/* Bias Mitigation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-orange-600" />
                {t('aiPolicy.bias')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aiPolicy.biasText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiPolicy;
