// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { Invoice } from '../intefaces/invoices';
import ApiService from '../services/api';
import { formatDate } from '../utils';

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const transformInvoiceDateField = (invoices: Invoice[]) =>
    invoices.map((invoice: Invoice) => ({
      ...invoice,
      createdDate: formatDate(invoice.createdDate),
      validDate: formatDate(invoice.validDate),
    }));

  async function fetchInvoices() {
    const { data } = await ApiService.get('invoices');
    const transformedInvoices = transformInvoiceDateField(data);
    setInvoices(transformedInvoices);
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  return invoices;
}
