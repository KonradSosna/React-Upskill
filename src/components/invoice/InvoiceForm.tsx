import React from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  InvoiceState,
  updateRecipientField,
  updateSenderField,
} from '../../store/invoiceSlice';
import AppForm from '../organisms/AppForm';

export default function InvoiceForm() {
  const { t } = useTranslation();

  const recipientData = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.recipientData
  );
  const senderData = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.senderData
  );
  const dispatch = useDispatch();

  return (
    <Grid container spacing={4} sx={{ marginTop: 4 }}>
      <Grid item xs={6}>
        <AppForm
          title={t('invoice.recipient')}
          fields={recipientData}
          onFieldChange={(payload: { key: string; value: string }) =>
            dispatch(updateRecipientField(payload))
          }
        ></AppForm>
      </Grid>
      <Grid item xs={6}>
        <AppForm
          title={t('invoice.sender')}
          fields={senderData}
          onFieldChange={(payload: { key: string; value: string }) =>
            dispatch(updateSenderField(payload))
          }
        ></AppForm>
      </Grid>
    </Grid>
  );
}
