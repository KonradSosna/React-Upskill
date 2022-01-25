import React from 'react';

import { Typography } from '@mui/material';

import AppInput from '../atoms/AppInput';

export default function AppForm(props: {
  fields: any[];
  onFieldChange: any;
  title: string;
}) {
  return (
    <>
      <Typography variant="h2">{props.title}</Typography>
      {props.fields.map((field: any) => (
        <AppInput
          key={field.label}
          field={field}
          onFieldChange={props.onFieldChange}
        />
      ))}
    </>
  );
}
