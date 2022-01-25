import React, { useState } from 'react';

import { Delete } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Container, Grid, styled, TextField } from '@mui/material';

import AppForm from '../components/organisms/AppForm';

// import { useTranslation } from 'react-i18next';

const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
  gap: 20,
});

export default function CreateInvoice() {
  // const { t } = useTranslation();
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const recipientFields = [
    {
      label: 'Company Name',
      valid: true,
      value: 'eee',
    },
    {
      label: 'City',
      value: '',
      valid: true,
    },
    {
      label: 'Street',
      value: '',
      valid: true,
    },
    {
      label: 'Postcode',
      value: '',
      valid: true,
    },
    {
      label: 'NIP',
      value: '',
      valid: true,
      type: 'number',
    },
    {
      label: 'Tel',
      value: '',
      valid: true,
    },
    {
      label: 'E-mail',
      value: '',
      valid: true,
      type: 'email',
    },
    {
      label: 'Bank account',
      value: '',
      valid: true,
    },
  ];

  const senderFormFields = [
    {
      label: 'Company Name',
      valid: true,
      value: 'eee',
    },
    {
      label: 'City',
      value: '',
      valid: true,
    },
    {
      label: 'Street',
      value: '',
      valid: true,
    },
    {
      label: 'Postcode',
      value: '',
      valid: true,
    },
    {
      label: 'NIP',
      value: '',
      valid: true,
      type: 'number',
    },
    {
      label: 'Tel',
      value: '',
      valid: true,
    },
    {
      label: 'E-mail',
      value: '',
      valid: true,
      type: 'email',
    },
    {
      label: 'Bank account',
      value: '',
      valid: true,
    },
  ];

  const [fields, setFields] = useState<any[]>(recipientFields);
  const [senderFields, setSenderFields] = useState<any[]>(senderFormFields);

  const baseItem = [
    {
      label: 'name',
    },
    {
      label: 'amount',
    },
    {
      label: 'unit',
    },
    {
      label: 'tax',
    },
    {
      label: 'price',
    },
  ];

  const items: any[] = [];

  function addItem() {
    items.push(baseItem);
  }

  function onFieldChange({ value, key }: { value: string; key: string }) {
    const copyArr = [...fields];

    const updatedEl = copyArr.find((el: any) => el.label === key);

    if (updatedEl) {
      updatedEl.value = value;
    }

    setFields(copyArr);
  }

  function onSenderFieldChange({ value, key }: { value: string; key: string }) {
    const copyArr = [...senderFields];

    const updatedEl = copyArr.find((el: any) => el.label === key);

    if (updatedEl) {
      updatedEl.value = value;
    }

    setSenderFields(copyArr);
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField label="No." variant="standard"></TextField>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <ButtonsContainer>
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Save</Button>
          </ButtonsContainer>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={6}>
          <AppForm
            title="Recipient"
            fields={fields}
            onFieldChange={onFieldChange}
          ></AppForm>
        </Grid>
        <Grid item xs={6}>
          <AppForm
            title="Sender"
            fields={senderFields}
            onFieldChange={onSenderFieldChange}
          ></AppForm>
        </Grid>
      </Grid>
      {items.map((item, index) => (
        <Grid container spacing={4} key={index}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <TextField
                id="standard-basic"
                label="Amount"
                variant="standard"
              />
              <TextField id="standard-basic" label="Unit" variant="standard" />
              <TextField id="standard-basic" label="Tax" variant="standard" />
              <TextField id="standard-basic" label="Price" variant="standard" />
              <Delete></Delete>
            </Box>
          </Grid>
        </Grid>
      ))}

      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', margin: '40px 0' }}
      >
        <Button variant="contained" onClick={addItem}>
          add item
        </Button>
      </Box>
    </Container>
  );
}
