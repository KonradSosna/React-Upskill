import { TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import { CompanyType } from '../../../../models/Invoice-model';
import { useErrorDetails } from '../../../../utils/helpers/useErrorDetails';
import { invoiceFields } from '../invoiceFieldsData';

export const Sender = () => {
  const { hasErrorCompanyForm } = useErrorDetails();
  const { register } = useFormContext();

  return (
    <Stack>
      <Typography variant="h3" sx={{ height: 100, marginTop: '30px' }}>
        Sender
      </Typography>
      {invoiceFields(CompanyType.SENDER).map(({ label, registerNames, type }) => (
        <TextField
          type={type}
          variant="standard"
          id={label}
          label={label}
          key={label}
          error={hasErrorCompanyForm(registerNames)}
          helperText={hasErrorCompanyForm(registerNames) && 'This field is required'}
          {...register(registerNames, { required: 'This field is required' })}
        />
      ))}
    </Stack>
  );
};
