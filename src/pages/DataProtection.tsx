
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Cookie, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DataProtection = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('dataProtection.title')}
            </h1>
          </div>

          {/* Overview */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                {t('dataProtection.overview')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('dataProtection.overviewText')}
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Database className="w-8 h-8 text-green-600" />
                {t('dataProtection.dataCollection')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('dataProtection.dataCollectionText')}
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Cookie className="w-8 h-8 text-amber-600" />
                {t('dataProtection.cookies')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('dataProtection.cookiesText')}
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-purple-600" />
                {t('dataProtection.rights')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('dataProtection.rightsText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
