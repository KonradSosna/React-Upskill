import { TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const InvoiceNumberField = () => {
  //   const { register } = useFormContext();

  return (
    <TextField variant="standard" type="test" id="numberField" label="No." />
  );
};
