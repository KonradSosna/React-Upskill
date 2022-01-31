// eslint-disable-next-line no-unused-vars
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ApiService from '../services/api';
import { InvoiceState, validateForm } from '../store/invoiceSlice';

export default function useInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFormValid = useSelector(
    (state: { invoice: InvoiceState }) => state.invoice.isFormValid
  );

  async function createInvoice(invoice: any) {
    dispatch(validateForm());

    if (isFormValid) {
      await ApiService.post('invoices', invoice);
      navigate('/');
    }
  }

  return { createInvoice };
}
