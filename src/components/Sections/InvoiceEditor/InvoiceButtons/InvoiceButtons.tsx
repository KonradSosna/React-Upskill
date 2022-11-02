import { Button, Grid } from "@mui/material";

export const InvoiceButtons = () => {
  return (
    <>
      <Grid item xs={2}>
        <Button variant="contained">Cancel</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained">Save</Button>
      </Grid>
    </>
  );
};
