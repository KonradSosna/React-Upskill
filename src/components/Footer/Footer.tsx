import { useTranslation } from 'react-i18next';
import { StyledFooter } from './Footer.styles';

export const Footer = () => {
  const { t } = useTranslation();
  return <StyledFooter>{t('footer')}</StyledFooter>;
};
