
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Users, FileText, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                {t('about.mission.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('about.mission.description1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.mission.description2')}
              </p>
            </CardContent>
          </Card>

          {/* What We Stand For */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  {t('about.principles.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {t('about.principles.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-600" />
                  {t('about.literacy.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {t('about.literacy.description')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* GitHub/Open Source Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Github className="w-8 h-8 text-gray-800" />
                {t('about.openSource.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('about.openSource.description')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('about.openSource.hosting')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.openSource.collaboration')}
              </p>
            </CardContent>
          </Card>

          {/* Our Vision */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="w-8 h-8 text-orange-600" />
                {t('about.vision.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('about.vision.description')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('about.vision.point1')}</li>
                <li>{t('about.vision.point2')}</li>
                <li>{t('about.vision.point3')}</li>
                <li>{t('about.vision.point4')}</li>
                <li>{t('about.vision.point5')}</li>
              </ul>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{t('about.howItWorks.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('about.howItWorks.step1.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('about.howItWorks.step1.description')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('about.howItWorks.step2.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('about.howItWorks.step2.description')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('about.howItWorks.step3.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('about.howItWorks.step3.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
