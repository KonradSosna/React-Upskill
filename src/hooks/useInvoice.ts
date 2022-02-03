// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ApiService from '../services/api';
import { isValidDate, parseDate } from '../utils';
import {
  createInitialDates,
  createValidationSchema,
  INVOICE_ITEM_FIELDS,
} from '../utils/defaultValues';
import { useYupValidationResolver } from './useYupValidation';

export interface FormDates {
  created: Date | null;
  valid: Date | null;
}
export interface FormField {
  rules: any;
  label: string;
  valid: boolean;
  value: string;
  type: string;
  key: string;
}

export interface Recipient {
  companyName: string;
  city: string;
  street: string;
  postcode: string;
  nip: number | string;
  phone: string;
  email: string;
  bankAccount: string;
  [key: string]: string | number;
}

export interface Sender extends Recipient {}

export interface Item {
  id: string;
  name: string;
  amount: number | string;
  unit: string;
  tax: number | string;
  price: number | string;
}
export interface Invoice {
  id: string | number;
  number: string;
  createdDate: string | null;
  validDate: string | null;
  recipient: {
    companyName: string;
    city: string;
    street: string;
    postcode: string;
    nip: number | string;
    phone: string;
    email: string;
    bankAccount: string;
  };
  sender: {
    companyName: string;
    city: string;
    street: string;
    postcode: string;
    nip: number | string;
    phone: string;
    email: string;
    bankAccount: string;
  };
  items: Item[];
}

const { createdDate, validDate } = createInitialDates();

export default function useInvoice() {
  const navigate = useNavigate();

  const [dates, setDates] = useState<FormDates>({
    created: createdDate,
    valid: validDate,
  });

  const validationSchema = createValidationSchema();
  const resolver = useYupValidationResolver(yup.object(validationSchema));
  const { handleSubmit, control } = useForm({ resolver });

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
      setDates({ ...dates, created: date });
    } else {
      setDates({ ...dates, created: null });
    }
  }

  function onValidDateChange(date: Date | null) {
    if (isValidDate(date)) {
      setDates({ ...dates, valid: date });
    } else {
      setDates({ ...dates, valid: null });
    }
  }

  const onSubmit = async (data: any) => {
    const recipient: Recipient = {
      companyName: '',
      city: '',
      street: '',
      postcode: '',
      nip: 0,
      phone: '',
      email: '',
      bankAccount: '',
    };
    const sender: Sender = {
      companyName: '',
      city: '',
      street: '',
      postcode: '',
      nip: 0,
      phone: '',
      email: '',
      bankAccount: '',
    };

    Object.keys(data)
      .filter((key: string) => key.includes('recipient'))
      .forEach((key: string) => {
        const [, name] = key.split('-');
        recipient[name] = data[key];
      });
    Object.keys(data)
      .filter((key: string) => key.includes('sender'))
      .forEach((key: string) => {
        const [, name] = key.split('-');
        sender[name] = data[key];
      });

    const itemsList: Item[] = [];
    items.forEach((item: FormField[], index: number) => {
      const [name, amount, unit, tax, price] = item;
      const data: Item = {
        name: name.value,
        id: index + name.value,
        amount: amount.value,
        unit: unit.value,
        tax: tax.value,
        price: price.value,
      };
      itemsList.push(data);
    });

    const invoice = {
      id: 1,
      number: data.number,
      createdDate: parseDate(dates.created),
      validDate: parseDate(dates.valid),
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
  };

  return {
    onCreatedDateChange,
    onValidDateChange,
    handleSubmit,
    onSubmit,
    addItem,
    navigate,
    removeItem,
    control,
    dates,
    items,
  };
}
