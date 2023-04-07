import { useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Container, Grid, IconButton, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  AddItemButton,
  ButtonsBox,
  ButtonsGrid,
  DatesBox,
  ItemsBox,
} from './Create';
import AppInput from '../components/atoms/AppInput';
import AppForm from '../components/organisms/AppForm';
import useInvoice from '../hooks/useInvoice';
import {
  INVOICE_USER_FIELDS,
  INVOIEC_NUMBER_FIELD,
} from '../utils/defaultValues';
import { invoicesApi } from '../store/store';

function InvoiceSkeleton() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Skeleton animation="wave" height={70} />
        </Grid>
        <ButtonsGrid item xs={6}>
          <ButtonsBox>
            <Skeleton animation="wave" height={70} width={100} />
            <Skeleton animation="wave" height={70} width={100} />
          </ButtonsBox>
        </ButtonsGrid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <DatesBox>
            <Skeleton animation="wave" height={70} width={200} />
            <Skeleton animation="wave" height={70} width={200} />
          </DatesBox>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" height={70} />
        </Grid>
      </Grid>
      <Skeleton animation="wave" height={70} />
      <AddItemButton>
        <Skeleton animation="wave" height={70} width={200} />
      </AddItemButton>
    </Container>
  );
}

export default function CreateInvoice() {
  const paramsRouter = useParams();

  const { t } = useTranslation();
  const {
    dates,
    onCreatedDateChange,
    onValidDateChange,
    addItem,
    handleSubmit,
    onUpdate,
    control,
    navigate,
    items,
    removeItem,
    fetchInvoice,
  } = useInvoice();

  const { data, isFetching, error } = invoicesApi.useGetInvoiceQuery(
    paramsRouter.id!,
    {
      skip: !paramsRouter.id,
    }
  );

  useEffect(() => {
    if (data && !isFetching) fetchInvoice(data, error);
  }, [data, isFetching]);

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      {isFetching ? (
        <InvoiceSkeleton />
      ) : (
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <AppInput
                control={control}
                label={t('invoice.form.no')}
                name={INVOIEC_NUMBER_FIELD.key}
                fieldKey={INVOIEC_NUMBER_FIELD.key}
                rules={INVOIEC_NUMBER_FIELD.rules}
                type={INVOIEC_NUMBER_FIELD.type}
              />
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
                    renderInput={(params: any) => (
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
                    renderInput={(params: any) => (
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
                    name={`${index}-${unit.key}`}
                    fieldKey={`${index}-${unit.key}`}
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
      )}
    </form>
  );
}
