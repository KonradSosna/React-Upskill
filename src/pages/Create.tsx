import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';

import AppInput from '../components/atoms/AppInput';
import AppForm from '../components/organisms/AppForm';
import useInvoice from '../hooks/useInvoice';
import {
  INVOICE_USER_FIELDS,
  INVOIEC_NUMBER_FIELD,
} from '../utils/defaultValues';
import styled from 'styled-components';

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

function a11yProps(index: number) {
  return {
    id: `claim-report-tab-${index}`,
    'aria-controls': `claim-report-tab-${index}`,
  };
}

const StyledTab = styled(Tab)({
  color: 'white',
  fontSize: '16px',
  backgroundColor: '#556cd6',
  borderRadius: '15px',
  // margin: `${!isMobile ? '0 30px' : '0 10px'} `,
  // padding: `${!isMobile ? '0 45px' : '0 10px'} `,
  margin: '0 30px',
  padding: '0 45px',
  textTransform: 'capitalize',

  '&:hover': {
    backgroundColor: '#3B4B95',
  },

  '&.Mui-selected': {
    backgroundColor: '#242e5c',
    color: 'white',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`claim-report-tabpanel-${index}`}
      aria-labelledby={`claim-report-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

type TButtonProps = {
  text: string;
  variant?: 'contained' | 'outlined' | 'text';
  sx?: CSSProperties | any;
  onClick?: (v: any) => void;
  disable?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const FormButton: FC<TButtonProps> = ({
  text,
  variant,
  sx,
  onClick,
  disable,
  loading,
  type,
}) => {
  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      type={type}
      disabled={disable}
      variant={variant ? variant : 'contained'}
      sx={{
        width: '200px',
        height: '50px',
        textTransform: 'capitalize',
        marginTop: '40px',
        fontSize: '15px',
        ...sx,
      }}
    >
      {text}
    </LoadingButton>
  );
};

export default function CreateInvoice() {
  const [formHeight, setFormHeight] = useState(0);
  const [value, setValue] = useState(0);
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
    trigger,
    errors,
  } = useInvoice();

  const formRef = useRef<any>(null);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, [items]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue > value)
      trigger().then((isValid: boolean) => isValid && setValue(newValue));
    else setValue(newValue);
  };

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
        <Grid container direction="column" spacing={4} sx={{ marginTop: 4 }}>
          <Grid item marginBottom="20px">
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <StyledTab label="Step 1 - Recipient" {...a11yProps(0)} />
                <StyledTab label="Step 2 - Sender" {...a11yProps(1)} />
                <StyledTab label="Step 3 - Expense Report" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TabPanel value={value} index={0}>
              <AppForm
                control={control}
                title={t('invoice.recipient')}
                fields={INVOICE_USER_FIELDS}
              />
              <FormButton
                text="Continue"
                type="submit"
                onClick={() =>
                  trigger().then((isValid: boolean) => isValid && setValue(2))
                }
              />
            </TabPanel>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TabPanel value={value} index={1}>
              <AppForm
                control={control}
                title={t('invoice.sender')}
                fields={INVOICE_USER_FIELDS}
              />
              <FormButton
                text="Continue"
                type="submit"
                onClick={() =>
                  trigger().then((isValid: boolean) => isValid && setValue(2))
                }
              />
            </TabPanel>
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
                  <Delete />
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
