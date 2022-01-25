import React from 'react';

import { TextField } from '@mui/material';
import debounce from 'lodash-es/debounce';

import { FormField } from '../../store/invoiceSlice';

const DELAY = 300;

export default function AppInput(props: {
  field: FormField;
  onFieldChange: ({ value, key }: { value: string; key: string }) => void;
}) {
  function handleChange({ value, key }: { value: string; key: string }) {
    props.onFieldChange({ value, key });
  }

  const debouncedHandler = debounce(handleChange, DELAY);

  return (
    <TextField
      label={props.field.label}
      variant="standard"
      onChange={(e) =>
        debouncedHandler({ value: e.target.value, key: props.field.key })
      }
      fullWidth
      helperText={!props.field.valid ? props.field.validationMessage : ''}
      error={!props.field.valid}
      type={props.field.type || 'text'}
    />
  );
}
