import React from 'react';

import { Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../../hooks/useInvoice';
import AppInput from '../atoms/AppInput';

export default function AppForm({
  fields,
  title,
  control,
}: {
  fields: FormField[];
  title: string;
  control: Control;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h2">{title}</Typography>

      {fields.map((item: FormField) => (
        <AppInput
          key={item.key}
          fieldKey={`${title.toLocaleLowerCase()}-${item.key}`}
          control={control}
          label={t(item.label)}
          rules={item.rules}
          type={item.type}
          name={`${title.toLocaleLowerCase()}-${item.key}`}
        />
      ))}
    </>
  );
}
