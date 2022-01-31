import React from 'react';

import SaveIcon from '@mui/icons-material/Save';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AppInput from '../components/atoms/AppInput';
import InvoiceForm from '../components/invoice/InvoiceForm';
import InvoiceItems from '../components/invoice/InvoiceItems';
import useInvoice from '../hooks/useInvoice';
import {
  InvoiceState,
  addItem,
  removeItem,
  updateItem,
  setNumber,
  setValidDate,
  setCreatedDate,
  selectCreatedDate,
  selectValidDate,
  selectItems,
  selectRecipient,
  selectSender,
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
  alignItems: 'center',
  gap: 20,
});

const AddItemButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '40px 0',
  alignItems: 'center',
});

const DatesBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { createInvoice } = useInvoice();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const state = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice
  );

  const createdDate = selectCreatedDate(state);
  const validDate = selectValidDate(state);
  const recipient = selectRecipient(state);
  const sender = selectSender(state);
  const items = selectItems(state);

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

  function createNewInvoice() {
    createInvoice({
      number: state.invoiceNumber.value,
      createdDate: state.createdDate,
      validDate: state.validDate,
      recipient,
      sender,
      items,
    });
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
            <Button
              color="info"
              variant="contained"
              onClick={() => navigate('/')}
            >
              {t('commons.cancel')}
            </Button>
            <Button
              color="info"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={createNewInvoice}
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
                value={createdDate}
                inputFormat="MM/dd/yyyy"
                onChange={onCreatedDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!createdDate}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
              <DatePicker
                label={t('invoice.form.validUntilDate')}
                value={validDate}
                onChange={onValidDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!validDate}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
            </DatesBox>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <InvoiceForm></InvoiceForm>
      <InvoiceItems
        items={state.items}
        deleteItem={(index: number) => dispatch(removeItem({ index }))}
        onFieldChange={(payload: any) => dispatch(updateItem(payload))}
      ></InvoiceItems>
      <AddItemButton>
        {!state.items.length && state.showError && (
          <Box m={2}>
            <Typography component="span" color="red">
              {t('invoice.validations.itemRequired')}
            </Typography>
          </Box>
        )}
        <Button variant="contained" onClick={() => dispatch(addItem())}>
          {t('commons.addItem')}
        </Button>
      </AddItemButton>
    </Container>
  );
}
