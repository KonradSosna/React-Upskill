import { TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Invoice } from '../../../../models/Invoice-model';

export const InvoiceNumberField = () => {
  const { register } = useFormContext<Invoice>();

  return (
    <TextField variant="standard" type="test" id="numberField" label="No." {...register(`no`)} />
  );
};
