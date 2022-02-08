import React, { useEffect, useRef, useState } from 'react';

import { Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import AppInput from '../components/atoms/AppInput';
import AppForm from '../components/organisms/AppForm';
import useInvoice from '../hooks/useInvoice';
import {
  INVOICE_USER_FIELDS,
  INVOIEC_NUMBER_FIELD,
} from '../utils/defaultValues';

export const ItemsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 6,
});

export const ButtonsGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
});

export const ButtonsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 20,
});

export const AddItemButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '40px 0',
  alignItems: 'center',
});

export const DatesBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function CreateInvoice() {
  const [formHeight, setFormHeight] = useState(0);
  const { t } = useTranslation();
  const {
    dates,
    onCreatedDateChange,
    onValidDateChange,
    addItem,
    handleSubmit,
    onSubmit,
    control,
    navigate,
    items,
    removeItem,
  } = useInvoice();

  const formRef = useRef<any>(null);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, [items]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <Container>
        <Typography variant="h4">Form height: {formHeight} px</Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <AppInput
              control={control}
              label={t('invoice.form.no')}
              name={INVOIEC_NUMBER_FIELD.key}
              fieldKey={INVOIEC_NUMBER_FIELD.key}
              rules={INVOIEC_NUMBER_FIELD.rules}
              type={INVOIEC_NUMBER_FIELD.type}
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
                type="submit"
                color="info"
                variant="contained"
                startIcon={<SaveIcon />}
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
                  value={dates.created}
                  inputFormat="MM/dd/yyyy"
                  onChange={onCreatedDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="createdDate"
                      required
                      error={!dates.created}
                      helperText={params?.inputProps?.placeholder}
                    />
                  )}
                />
                <DatePicker
                  label={t('invoice.form.validUntilDate')}
                  value={dates.valid}
                  onChange={onValidDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      error={!dates.valid}
                      helperText={params?.inputProps?.placeholder}
                    />
                  )}
                />
              </DatesBox>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <AppForm
              control={control}
              title={t('invoice.recipient')}
              fields={INVOICE_USER_FIELDS}
            ></AppForm>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <AppForm
              control={control}
              title={t('invoice.sender')}
              fields={INVOICE_USER_FIELDS}
            ></AppForm>
          </Grid>
        </Grid>

        {items.map(([name, amount, unit, tax, price], index) => (
          <Grid container spacing={4} key={index}>
            <Grid item xs={6}>
              <AppInput
                key={name.key}
                control={control}
                label={t(name.label)}
                rules={name.rules}
                type={name.type}
                name={`${index}-${name.key}`}
                fieldKey={`${index}-${name.key}`}
              ></AppInput>
            </Grid>
            <Grid item xs={6}>
              <ItemsBox>
                <AppInput
                  key={amount.key}
                  control={control}
                  label={t(amount.label)}
                  rules={amount.rules}
                  type={amount.type}
                  name={`${index}-${amount.key}`}
                  fieldKey={`${index}-${amount.key}`}
                ></AppInput>
                <AppInput
                  key={unit.key}
                  control={control}
                  label={t(unit.label)}
                  rules={unit.rules}
                  type={unit.type}
                  name={`${index}-${unit.key}`}
                  fieldKey={`${index}-${unit.key}`}
                ></AppInput>
                <AppInput
                  key={tax.key}
                  control={control}
                  label={t(tax.label)}
                  rules={tax.rules}
                  type={tax.type}
                  name={`${index}-${tax.key}`}
                  fieldKey={`${index}-${tax.key}`}
                ></AppInput>
                <AppInput
                  key={price.key}
                  control={control}
                  label={t(price.label)}
                  rules={price.rules}
                  type={price.type}
                  name={`${index}-${price.key}`}
                  fieldKey={`${index}-${price.key}`}
                ></AppInput>
                <IconButton onClick={() => removeItem(index)}>
                  <Delete></Delete>
                </IconButton>
              </ItemsBox>
            </Grid>
          </Grid>
        ))}
        <AddItemButton>
          <Button variant="contained" onClick={addItem}>
            {t('commons.addItem')}
          </Button>
        </AddItemButton>
      </Container>
    </form>
  );
}
