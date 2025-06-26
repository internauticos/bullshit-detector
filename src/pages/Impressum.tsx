
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Mail, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Impressum = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('impressum.title')}
            </h1>
          </div>

          {/* Responsible for Content */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Building className="w-8 h-8 text-blue-600" />
                {t('impressum.responsible')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Bullshit Detector Project</p>
                <p>Open Source Community Initiative</p>
                <p>This is an open source project available to everyone</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Mail className="w-8 h-8 text-green-600" />
                {t('impressum.contact')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-700">
                <p>For questions about this open source project:</p>
                <p>GitHub: <a href="https://github.com" className="text-blue-600 hover:underline">github.com/bullshit-detector</a></p>
                <p>Community contributions welcome</p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                {t('impressum.disclaimer')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {t('impressum.disclaimerText')}
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Scale className="w-8 h-8 text-purple-600" />
                {t('impressum.liability')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {t('impressum.liabilityText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
