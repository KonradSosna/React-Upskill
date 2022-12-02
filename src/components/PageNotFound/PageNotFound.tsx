import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
  const { t } = useTranslation();
  return <div>{t('notFound')}</div>;
};
