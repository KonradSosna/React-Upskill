import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Recipient } from "./InvoiceRecipientFields/InvoiceRecipientFields";
import { Sender } from "./InvoiceSenderFields/InvoiceSenderFields";
import { StyledContainer } from "./InvoiceEditor.styles";
import { Container } from "@mui/system";
import { InvoiceDatePicker } from "./InvoiceDatePicker/InvoiceDatePicker";
import { InvoiceNumberField } from "./InvoiceNumberField/InvoiceNumberField";
import { InvoiceButtons } from "./InvoiceButtons/InvoiceButtons";
import { AddItem } from "./InvoiceAddItem/InvoiceAddItem";

export const InvoiceEditor = () => {
  const { control } = useForm();

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={6}>
            <InvoiceNumberField />
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              justifyContent="flex-end"
            >
              <InvoiceButtons />
            </Grid>
          </Grid>
          <InvoiceDatePicker control={control} />
        </Grid>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={6}>
            <Recipient />
          </Grid>
          <Grid item xs={6}>
            <Sender />
          </Grid>
        </Grid>
        <AddItem />
      </Container>
    </StyledContainer>
  );
};
