import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Invoice } from '../../../../models/Invoice-model';

export const InvoiceNumberField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Invoice>();

  return (
    <TextField
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
