import React from 'react';

import { TextField } from '@mui/material';
import { useController, Control } from 'react-hook-form';

export default function AppInput({
  control,
  name,
  label,
  rules,
  type,
  fieldKey,
}: {
  control: Control;
  name: string;
  label: string;
  type: string;
  fieldKey: string;
  rules: any;
}) {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  return (
    <TextField
      fullWidth
      type={type}
      variant="standard"
      label={label}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={name}
      inputRef={field.ref}
      error={!!errors[fieldKey]}
      helperText={errors[fieldKey] ? errors[fieldKey].message : ''}
    />
  );
}
