
import { useTranslation } from 'react-i18next';

export const useNavigationLinks = () => {
  const { t } = useTranslation();
  
  return [
    { to: "/", label: t('common.menu.home') },
    { to: "/early-access", label: t('common.menu.earlyAccess') },
    { to: "/blog", label: t('common.menu.blog') }
  ];
};
