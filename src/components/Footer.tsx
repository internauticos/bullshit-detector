
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/impressum" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('footer.impressum')}
                </Link>
              </li>
              <li>
                <Link to="/data-protection" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('footer.dataProtection')}
                </Link>
              </li>
              <li>
                <Link to="/general-terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('footer.generalTerms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.policies')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('footer.aiPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.copyright')}</h3>
            <p className="text-gray-400 text-sm">
              © 2024 {t('app.title')}. {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
