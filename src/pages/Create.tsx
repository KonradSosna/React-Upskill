import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Container, Grid, styled, TextField } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import AppInput from '../components/atoms/AppInput';
import InvoiceForm from '../components/invoice/InvoiceForm';
import InvoiceItem from '../components/invoice/InvoiceItem';
import {
  InvoiceState,
  addItem,
  removeItem,
  updateItem,
  setNumber,
  setValidDate,
  setCreatedDate,
  validateForm,
} from '../store/invoiceSlice';
import { isValidDate, parseDate } from '../utils/index';

const ButtonsGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
});

const ButtonsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
  gap: 20,
});

const AddItemButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '40px 0',
});

const DatesBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function CreateInvoice() {
  const { t } = useTranslation();

  const state = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice
  );

  const createdDateComputed = createSelector(
    (state: InvoiceState) => state.createdDate,
    (dateAsString: string | null) =>
      dateAsString ? new Date(dateAsString) : null
  );

  const validDateComputed = createSelector(
    (state: InvoiceState) => state.validDate,
    (dateAsString: string | null) =>
      dateAsString ? new Date(dateAsString) : null
  );

  const dispatch = useDispatch();

  function onCreatedDateChange(date: Date | null) {
    if (isValidDate(date)) {
      dispatch(setCreatedDate({ createdDate: parseDate(date) }));
    } else {
      dispatch(setCreatedDate({ createdDate: null }));
    }
  }

  function onValidDateChange(date: Date | null) {
    if (isValidDate(date)) {
      dispatch(setValidDate({ validDate: parseDate(date) }));
    } else {
      dispatch(setValidDate({ validDate: null }));
    }
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <AppInput
            field={state.invoiceNumber}
            onFieldChange={({ value }: { value: string }) =>
              dispatch(setNumber({ number: value }))
            }
          ></AppInput>
        </Grid>
        <ButtonsGrid item xs={6}>
          <ButtonsBox>
            <Button variant="contained">{t('commons.cancel')}</Button>
            <Button
              variant="contained"
              onClick={() => dispatch(validateForm())}
            >
              {t('commons.save')}
            </Button>
          </ButtonsBox>
        </ButtonsGrid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatesBox>
              <DatePicker
                label={t('invoice.form.createdDate')}
                value={createdDateComputed(state)}
                inputFormat="MM/dd/yyyy"
                onChange={onCreatedDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!createdDateComputed(state)}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
              <DatePicker
                label={t('invoice.form.validUntilDate')}
                value={validDateComputed(state)}
                onChange={onValidDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!validDateComputed(state)}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
            </DatesBox>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <InvoiceForm></InvoiceForm>
      <InvoiceItem
        items={state.items}
        deleteItem={(index: number) => dispatch(removeItem({ index }))}
        onFieldChange={(payload: any) => dispatch(updateItem(payload))}
      ></InvoiceItem>
      <AddItemButton>
        <Button variant="contained" onClick={() => dispatch(addItem())}>
          {t('commons.addItem')}
        </Button>
      </AddItemButton>
    </Container>
  );
}
