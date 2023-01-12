import { useState } from 'react';
import axios from 'axios';
import { InvoiceProps } from '../models/Invoice-model';
import { toast } from 'react-toastify';

const useGetInvoice = () => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const getInvoiceData = async (id?: string) => {
    setIsLoading(true);
    try {
      const url = id ? `http://localhost:3001/invoices/${id}` : 'http://localhost:3001/invoices';
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNewInvoice = async (invoice: InvoiceProps) => {
    try {
      const response = await axios.post('http://localhost:3001/invoices', invoice);

      toast.success('Successfully saved new invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      setError(err as Error);
      toast.error('Error while saving new invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const updateInvoice = async (invoice: InvoiceProps) => {
    try {
      const response = await axios.put(`http://localhost:3001/invoices/${invoice.id}`, invoice);

      toast.success('Successfully updated invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      setError(err as Error);
      toast.error('Error while updating invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/invoices/${id}`);

      toast.success('Successfully deleted invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      setError(err as Error);
      toast.error('Error while deleting invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return {
    error,
    isLoading,
    getInvoiceData,
    saveNewInvoice,
    updateInvoice,
    deleteInvoice,
  };
};

export default useGetInvoice;
