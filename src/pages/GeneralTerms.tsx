
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GeneralTerms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('generalTerms.title')}
            </h1>
          </div>

          {/* Acceptance of Terms */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                {t('generalTerms.acceptance')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('generalTerms.acceptanceText')}
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                {t('generalTerms.useOfService')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('generalTerms.useOfServiceText')}
              </p>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-amber-600" />
                {t('generalTerms.limitations')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('generalTerms.limitationsText')}
              </p>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-600" />
                {t('generalTerms.prohibited')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('generalTerms.prohibitedText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneralTerms;
