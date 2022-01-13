import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CreateInvoice() {
  const { t } = useTranslation();
  return <p>{t('nav.add_new_invoice')}</p>;
}
