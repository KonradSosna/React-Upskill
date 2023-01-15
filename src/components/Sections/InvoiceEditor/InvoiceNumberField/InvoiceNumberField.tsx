import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Invoice } from '../../../../models/Invoice-model';

export const InvoiceNumberField = () => {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext<Invoice>();

  useEffect(() => {
    setFocus('no', { shouldSelect: true });
  }, []);

  return (
    <TextField
      data-testid="noField"
      variant="standard"
      type="test"
      id="numberField"
      label="No."
      error={!!errors.no}
      helperText={!!errors.no && 'This field is required'}
      {...register(`no`, { required: 'This field is required' })}
    />
  );
};
