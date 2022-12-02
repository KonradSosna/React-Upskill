import { TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import { CompanyType, InvoiceCompanyProps } from '../../../../models/Invoice-model';
import { invoiceFields } from '../invoiceFieldsData';

export const Recipient = () => {
  const { register } = useFormContext();

  return (
    <Stack>
      <Typography variant="h3" sx={{ height: 100, marginTop: '30px' }}>
        Recipient
      </Typography>

      {invoiceFields(CompanyType.RECIPIENT).map(({ label, registerNames }) => (
        <TextField
          variant="standard"
          id={label}
          label={label}
          key={label}
          {...register(registerNames)}
        />
      ))}
    </Stack>
  );
};