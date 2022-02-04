// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { Invoice } from '../intefaces/invoices';
import ApiService from '../services/api';

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  async function fetchInvoices() {
    const { data } = await ApiService.get('invoices');
    setInvoices(data);
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  return { invoices, setInvoices };
}
