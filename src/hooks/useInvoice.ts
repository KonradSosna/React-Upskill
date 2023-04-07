import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { FormDates, FormField } from '../intefaces/invoices';
import { invoicesApi } from '../store/store';
import {
  formatDate,
  isValidDate,
  parseDate,
  transformItems,
  transformUserFields,
} from '../utils';
import {
  createInitialDates,
  createValidationSchema,
  INVOICE_ITEM_FIELDS,
} from '../utils/defaultValues';
import { useYupValidationResolver } from './useYupValidation';
import { useSnackbar } from 'notistack';

const { createdDate, validDate } = createInitialDates();

export default function useInvoice() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { refetch } = invoicesApi.useGetInvoicesQuery();
  const [updateInvoice] = invoicesApi.useUpdateInvoiceMutation();
  const [addInvoice] = invoicesApi.useAddInvoiceMutation();
  const [deleteInvoice] = invoicesApi.useDeleteInvoiceMutation();

  const [dates, setDates] = useState<FormDates>({
    created: createdDate.toISOString(),
    valid: validDate.toISOString(),
  });

  const validationSchema = createValidationSchema();
  const resolver = useYupValidationResolver(yup.object(validationSchema));
  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm({ resolver });

  const [items, setItems] = useState<FormField[][]>([]);

  function addItem() {
    setItems([...items, INVOICE_ITEM_FIELDS]);
  }

  function removeItem(index: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setItems((_tems) =>
      items.filter((_item, itemIndex) => itemIndex !== index)
    );
  }

  function onCreatedDateChange(date: Date | null) {
    if (isValidDate(date)) {
      setDates({ ...dates, created: date?.toISOString() });
    } else {
      setDates({ ...dates, created: null });
    }
  }

  function onValidDateChange(date: Date | null) {
    if (isValidDate(date)) {
      setDates({ ...dates, valid: date?.toISOString() });
    } else {
      setDates({ ...dates, valid: null });
    }
  }

  async function onSubmit(data: any) {
    const recipient = transformUserFields(data, 'recipient');
    const sender = transformUserFields(data, 'sender');
    const itemsList = transformItems(data);

    const invoice = {
      id: Date.now().toString(),
      number: data.number,
      createdDate: formatDate(dates.created),
      validDate: formatDate(dates.valid),
      recipient,
      sender,
      items: itemsList,
    };

    try {
      await addInvoice(invoice);
      enqueueSnackbar('Invoice created', { variant: 'success' });
      navigate('/');
      await refetch();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function onUpdate(data: any) {
    const recipient = transformUserFields(data, 'recipient');
    const sender = transformUserFields(data, 'sender');
    const itemsList = transformItems(data);

    const invoice = {
      id: data.id,
      number: data.number,
      createdDate: formatDate(dates.created),
      validDate: formatDate(dates.valid),
      recipient,
      sender,
      items: itemsList,
    };

    try {
      await updateInvoice(invoice);
      enqueueSnackbar('Invoice updated', { variant: 'success' });
      navigate('/');
      await refetch();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error updating invoice', {
        variant: 'error',
      });

      throw error;
    }
  }

  async function fetchInvoice(
    data: any,
    error?: FetchBaseQueryError | SerializedError
  ) {
    if (error) {
      console.error(error);
      enqueueSnackbar('There was an error fetching invoice', {
        variant: 'error',
      });
      navigate('/404');
      return;
    }

    const invoice = { ...data };

    if (data) {
      Object.keys(data.recipient).forEach((key) => {
        invoice[`recipient-${key}`] = data.recipient[key];
      });
      Object.keys(data.sender).forEach((key: string) => {
        invoice[`sender-${key}`] = data.recipient[key];
      });
    }

    const itemsList: any = [];
    data?.items.forEach((item: any, index: number) => {
      itemsList.push(INVOICE_ITEM_FIELDS);
      Object.keys(item).forEach((key: string) => {
        invoice[`${index}-${key}`] = item[key];
      });
    });

    setItems([...itemsList]);

    if (data) {
      setDates({
        created: parseDate(data.createdDate),
        valid: parseDate(data.validDate),
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sender, recipient, ...rest } = invoice;

    reset(rest);
  }

  async function handleDeleteInvoice(id: string) {
    try {
      await deleteInvoice(id);
      enqueueSnackbar('Invoice deleted', { variant: 'success' });
      await refetch();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    onCreatedDateChange,
    onValidDateChange,
    handleSubmit,
    onSubmit,
    addItem,
    navigate,
    removeItem,
    fetchInvoice,
    onUpdate,
    setDates,
    handleDeleteInvoice,
    control,
    dates,
    items,
    trigger,
    errors,
  };
}
