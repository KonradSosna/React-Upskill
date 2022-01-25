import React from 'react';

import { Delete } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  styled,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import AppInput from '../components/atoms/AppInput';
import AppForm from '../components/organisms/AppForm';
import {
  InvoiceState,
  updateRecipientField,
  updateSenderField,
  addItem,
  removeItem,
  updateItem,
} from '../store/invoiceSlice';

// import { useTranslation } from 'react-i18next';

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

const ItemsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 6,
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

function ItemRow(props: { items: any[]; deleteItem: any; onFieldChange: any }) {
  return (
    <>
      {props.items.map(([name, amount, unit, tax, price], index) => (
        <Grid container spacing={4} key={index}>
          <Grid item xs={6}>
            <AppInput
              field={name}
              onFieldChange={(payload) =>
                props.onFieldChange({ index, ...payload })
              }
            ></AppInput>
          </Grid>
          <Grid item xs={6}>
            <ItemsBox>
              <AppInput
                field={amount}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={unit}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={tax}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={price}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <IconButton onClick={() => props.deleteItem(index)}>
                <Delete></Delete>
              </IconButton>
            </ItemsBox>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

function InvoiceForm() {
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
          title="Recipient"
          fields={recipientData}
          onFieldChange={(payload: any) =>
            dispatch(updateRecipientField(payload))
          }
        ></AppForm>
      </Grid>
      <Grid item xs={6}>
        <AppForm
          title="Sender"
          fields={senderData}
          onFieldChange={(payload: any) => dispatch(updateSenderField(payload))}
        ></AppForm>
      </Grid>
    </Grid>
  );
}

export default function CreateInvoice() {
  // const { t } = useTranslation();

  const items = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.items
  );

  const dispatch = useDispatch();
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField label="No." variant="standard"></TextField>
        </Grid>
        <ButtonsGrid item xs={6}>
          <ButtonsBox>
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Save</Button>
          </ButtonsBox>
        </ButtonsGrid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatesBox>
              <DesktopDatePicker
                label="Created date"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Valid until date"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </DatesBox>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <InvoiceForm></InvoiceForm>
      <ItemRow
        items={items}
        deleteItem={(index: number) => dispatch(removeItem({ index }))}
        onFieldChange={(payload: any) => dispatch(updateItem(payload))}
      ></ItemRow>
      <AddItemButton>
        <Button variant="contained" onClick={() => dispatch(addItem())}>
          add item
        </Button>
      </AddItemButton>
    </Container>
  );
}
