import { TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import { CompanyType } from '../../../../models/Invoice-model';
import { useErrorDetails } from '../../../../utils/helpers/useErrorDetails';
import { invoiceFields } from '../invoiceFieldsData';

export const Recipient = () => {
  const { hasErrorCompanyForm } = useErrorDetails();
  const { register } = useFormContext();

  return (
    <Stack>
      <Typography variant="h3" sx={{ height: 100, marginTop: '30px' }}>
        Recipient
      </Typography>

      {invoiceFields.map(({ label, registerNames, type }) => {
        const error = hasErrorCompanyForm(CompanyType.RECIPIENT, registerNames);

        return (
          <TextField
            data-testid={`${CompanyType.RECIPIENT}.${registerNames}`}
            type={type}
            variant="standard"
            id={label}
            label={label}
            key={label}
            error={!!error}
            helperText={error}
            {...register(`${CompanyType.RECIPIENT}.${registerNames}`, {
              required: 'This field is required',
            })}
          />
        );
      })}
    </Stack>
  );
};
