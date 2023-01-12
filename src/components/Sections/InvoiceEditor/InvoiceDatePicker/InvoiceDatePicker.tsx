import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StyledDatePicker } from './InvoiceDatePicker.styles';

export const InvoiceDatePicker = ({ control }: any) => {
  return (
    <>
      <StyledDatePicker>
        <Controller
          control={control}
          rules={{ required: true }}
          name="createdDate"
          render={({ field: { onChange, ...restField }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Created date"
                onChange={onChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={!!error && 'Date is required'}
                    error={!!error}
                  />
                )}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
      </StyledDatePicker>
      <StyledDatePicker>
        <Controller
          control={control}
          rules={{ required: true }}
          name="validUntilDate"
          render={({ field: { onChange, ...restField }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Valid until date"
                onChange={onChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={!!error && 'Date is required'}
                    error={!!error}
                  />
                )}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
      </StyledDatePicker>
    </>
  );
};
