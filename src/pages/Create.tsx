import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Container, Grid, styled, TextField } from '@mui/material';
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
  // setCreatedDate,
  validateForm,
} from '../store/invoiceSlice';
import { INVOIEC_NUMBER_FIELD } from '../utils/defaultValues';
import { parseDate } from '../utils/index';

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

  const items = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.items
  );
  // const createdDate = useSelector(
  //   (state: { invoice: InvoiceState }) => state.invoice.createdDate
  // );
  const validDate = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.validDate
  );
  // const isFormValid = useSelector(
  //   (state: { invoice: InvoiceState }) => state.invoice.isFormValid
  // );

  const dispatch = useDispatch();
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <AppInput
            field={INVOIEC_NUMBER_FIELD}
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
                value={value}
                inputFormat="MM/dd/yyyy"
                onChange={(date: any) => {
                  setValue(date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!value}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
              <DatePicker
                label={t('invoice.form.validUntilDate')}
                inputFormat="MM/dd/yyyy"
                value={validDate}
                onChange={(date: any) =>
                  dispatch(setValidDate({ validDate: parseDate(date) }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </DatesBox>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <InvoiceForm></InvoiceForm>
      <InvoiceItem
        items={items}
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
