import { useLocation, useNavigate } from 'react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { Recipient } from './InvoiceRecipientFields/InvoiceRecipientFields';
import { Sender } from './InvoiceSenderFields/InvoiceSenderFields';
import { StyledContainer } from './InvoiceEditor.styles';
import { InvoiceDatePicker } from './InvoiceDatePicker/InvoiceDatePicker';
import { InvoiceNumberField } from './InvoiceNumberField/InvoiceNumberField';
import { InvoiceButtons } from './InvoiceButtons/InvoiceButtons';
import { AddItem } from './InvoiceAddItem/InvoiceAddItem';
import { InvoiceProps } from '../../../models/Invoice-model';
import { defaultFormValues } from '../../../utils/helpers/defaultFormValues';
import { saveNewInvoice, updateInvoice } from '../../../services/api.service';

type InvoiceEditorProps = {
  isEditMode?: boolean;
};

export const InvoiceEditor = ({ isEditMode }: InvoiceEditorProps) => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const methods = useForm<InvoiceProps>({
    defaultValues: state ? state.response : defaultFormValues,
  });
  const onSubmit: SubmitHandler<InvoiceProps> = (data) => data;

  const handleNewInvoiceSave = () => {
    const invoiceData = methods.getValues();
    invoiceData.id = uuid();
    saveNewInvoice(invoiceData);
    navigate('/invoices');
  };

  const handleEditedInvoiceSave = () => {
    const invoiceData = methods.getValues();
    updateInvoice(invoiceData);
    navigate('/invoices');
  };

  const handleCancel = () => navigate('/invoices');

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StyledContainer>
          <Container>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={6}>
                <InvoiceNumberField />
              </Grid>
              <Grid item xs={6}>
                <Grid container justifyContent="flex-end">
                  <InvoiceButtons
                    onCancel={handleCancel}
                    onSave={isEditMode ? handleEditedInvoiceSave : handleNewInvoiceSave}
                  />
                </Grid>
              </Grid>
              <InvoiceDatePicker control={methods.control} />
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
      </form>
    </FormProvider>
  );
};
