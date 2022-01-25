// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export default function useCreateInvoiceForm() {
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

  function onFieldChange({
    value,
    key,
    list,
  }: {
    value: string;
    key: string;
    list: any[];
    setList: (list: any[]) => void;
  }) {
    const copyArr = [...list];

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
  return;
}
