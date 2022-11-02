import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StyledDatePicker } from "./InvoiceDatePicker.styles";

export const InvoiceDatePicker = ({ control }: any) => {
  return (
    <>
      <StyledDatePicker>
        <Controller
          control={control}
          name="createdDate"
          render={({ field: { onChange, ...restField } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Created date"
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
      </StyledDatePicker>
      <StyledDatePicker>
        <Controller
          control={control}
          name="validUntilDate"
          render={({ field: { onChange, ...restField } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Valid until date"
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
      </StyledDatePicker>
    </>
  );
};
