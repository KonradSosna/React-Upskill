import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormContext } from "react-hook-form";
import { invoiceFields } from "../invoiceFieldsData";

export const Recipient = () => {
  //   const { register } = useFormContext();

  return (
    <Stack>
      <Typography variant="h3" sx={{ height: 100, marginTop: "30px" }}>
        Recipient
      </Typography>
      {invoiceFields.map(({ label }) => (
        <TextField variant="standard" id={label} label={label} key={label} />
      ))}
    </Stack>
  );
};
