import { Button, Grid } from '@mui/material';

type InvoiceButtonsProps = {
  onSave: () => void;
  onCancel: () => void;
};
export const InvoiceButtons = ({ onSave, onCancel }: InvoiceButtonsProps) => {
  return (
    <>
      <Grid item xs={2}>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </Grid>
    </>
  );
};
