import { useLocation, useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import { Box, Container } from '@mui/system';
import { Grid, LinearProgress } from '@mui/material';
import { Recipient } from './InvoiceRecipientFields/InvoiceRecipientFields';
import { Sender } from './InvoiceSenderFields/InvoiceSenderFields';
import { StyledContainer } from './InvoiceEditor.styles';
import { InvoiceDatePicker } from './InvoiceDatePicker/InvoiceDatePicker';
import { InvoiceNumberField } from './InvoiceNumberField/InvoiceNumberField';
import { InvoiceButtons } from './InvoiceButtons/InvoiceButtons';
import { AddItem } from './InvoiceAddItem/InvoiceAddItem';
import { InvoiceProps } from '../../../models/Invoice-model';
import { defaultFormValues } from '../../../utils/helpers/defaultFormValues';
import {
  useGetInvoiceData,
  useSaveInvoice,
  useUpdateInvoice,
} from '../../../services/UseGetInvoice';
import { useEffect } from 'react';

type InvoiceEditorProps = {
  isEditMode?: boolean;
};

export const InvoiceEditor = ({ isEditMode }: InvoiceEditorProps) => {
  const { state } = useLocation();
  const { data, isLoading } = useGetInvoiceData(isEditMode && state.id);
  const { save } = useSaveInvoice();
  const { update } = useUpdateInvoice();
  const navigate = useNavigate();
  const methods = useForm<InvoiceProps>({
    defaultValues: data ? data : defaultFormValues,
  });

  useEffect(() => {
    if (data && state) {
      methods.reset(data);
    }
  }, [data]);

  const onSubmit = (submitData: InvoiceProps) => {
    if (isEditMode) {
      update(submitData);
      navigate('/invoices');
    } else {
      save({ ...submitData, id: uuid() });
      navigate('/invoices');
    }
  };

  const handleCancel = () => navigate('/invoices');

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
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
                      <InvoiceButtons onCancel={handleCancel} />
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
      )}
    </>
  );
};
