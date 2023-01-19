import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useYupValidationResolver } from './useYupValidation';
import { FormDates, FormField } from '../intefaces/invoices';
import ApiService from '../services/api';
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

const { createdDate, validDate } = createInitialDates();

export default function useInvoice() {
  const navigate = useNavigate();

  const [dates, setDates] = useState<FormDates>({
    created: createdDate.toISOString(),
    valid: validDate.toISOString(),
  });

  const validationSchema = createValidationSchema();
  const resolver = useYupValidationResolver(yup.object(validationSchema));
  const { handleSubmit, control, reset } = useForm({ resolver });

  const [items, setItems] = useState<FormField[][]>([]);

  function addItem() {
    setItems([...items, INVOICE_ITEM_FIELDS]);
  }

  function removeItem(index: number) {
    setItems((items) =>
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
      await ApiService.post('invoices', invoice);
      navigate('/');
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
      await ApiService.patch(`invoices/${data.id}`, invoice);
      navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function fetchInvoice(id: string) {
    try {
      const { data }: { data: any } = await ApiService.get(`invoices/${id}`);
      const invoice: any = { ...data };
      Object.keys(data.recipient).forEach((key: string) => {
        invoice[`recipient-${key}`] = data.recipient[key];
      });
      Object.keys(data.sender).forEach((key: string) => {
        invoice[`sender-${key}`] = data.recipient[key];
      });
      const itemsList: any = [];
      data.items.forEach((item: any, index: number) => {
        itemsList.push(INVOICE_ITEM_FIELDS);
        Object.keys(item).forEach((key: string) => {
          invoice[`${index}-${key}`] = item[key];
        });
      });
      setItems([...itemsList]);

      setDates({
        created: parseDate(data.createdDate),
        valid: parseDate(data.validDate),
      });

      const { sender, recipient, ...rest } = invoice;

      reset(rest);
    } catch (error) {
      console.error(error);
      navigate('/404');
    }
  }

  async function deleteInvoice(id: string | number, cb: () => void) {
    try {
      await ApiService.delete(`invoices/${id}`);
      cb();
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
    deleteInvoice,
    control,
    dates,
    items,
  };
}
