
import { useTranslation } from 'react-i18next';

export const useNavigationLinks = () => {
  const { t } = useTranslation();
  
  return [
    { to: "/", label: "Home" },
    { to: "/early-access", label: "Early Access" },
    { to: "/blog", label: "Blog" }
  ];
};
