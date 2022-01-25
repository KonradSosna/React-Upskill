import React from 'react';

import { Typography } from '@mui/material';

import { FormField } from '../../store/invoiceSlice';
import AppInput from '../atoms/AppInput';

export default function AppForm(props: {
  fields: FormField[];
  onFieldChange: any;
  title: string;
}) {
  return (
    <>
      <Typography variant="h2">{props.title}</Typography>
      {props.fields.map((field: FormField) => (
        <AppInput
          key={field.label}
          field={field}
          onFieldChange={props.onFieldChange}
        />
      ))}
    </>
  );
}
