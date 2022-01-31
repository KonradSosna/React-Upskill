import React from 'react';

import { TextField } from '@mui/material';
import debounce from 'lodash-es/debounce';
import { useTranslation } from 'react-i18next';

import { FormField } from '../../store/invoiceSlice';

const DELAY = 100;

export default function AppInput(props: {
  field: FormField;
  onFieldChange: ({ value, key }: { value: string; key: string }) => void;
}) {
  const { t } = useTranslation();
  function handleChange({ value, key }: { value: string; key: string }) {
    props.onFieldChange({ value, key });
  }

  const debouncedHandler = debounce(handleChange, DELAY);

  return (
    <TextField
      label={t(props.field.label)}
      variant="standard"
      onChange={(e) =>
        debouncedHandler({ value: e.target.value, key: props.field.key })
      }
      fullWidth
      required={!!props.field.validationMessage}
      helperText={!props.field.valid ? t(props.field.validationMessage) : ''}
      error={!props.field.valid}
      type={props.field.type}
    />
  );
}
