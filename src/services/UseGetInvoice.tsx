import { useEffect, useState } from 'react';
import { InvoiceProps } from '../models/Invoice-model';
import { toast } from 'react-toastify';
import { newAxios } from './AxiosInstance';

const useRequest = (handler: any) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const request = async (invoice?: InvoiceProps | string) => {
    setIsLoading(true);
    try {
      const response = await handler(invoice);
      setData(response.data);
    } catch (err) {
      setError(error || (err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    data,
    request,
  };
};
const useFetch = (url: string) => {
  const { error, isLoading, data, request } = useRequest(async () => {
    return await newAxios.get(url);
  });

  useEffect(() => {
    request();
  }, [url]);

  return {
    error,
    isLoading,
    data,
    request,
  };
};

export const useGetInvoiceData = (id?: string) => {
  const url = id ? `/invoices/${id}` : '/invoices';
  const { error, isLoading, data, request } = useFetch(url);

  const refetch = () => {
    request();
  };
  return {
    error,
    isLoading,
    data,
    refetch,
  };
};

export const useSaveInvoice = () => {
  const { error, isLoading, data, request } = useRequest(async (invoice: InvoiceProps) => {
    return await newAxios.post('/invoices', invoice);
  });

  const save = async (invoice?: InvoiceProps) => {
    try {
      await request(invoice);
      toast.success('Successfully saved new invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error('Error while saving new invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return {
    error,
    isLoading,
    data,
    save,
  };
};

export const useUpdateInvoice = () => {
  const { error, isLoading, data, request } = useRequest(async (invoice: InvoiceProps) => {
    return await newAxios.put(`/invoices/${invoice.id}`, invoice);
  });

  const update = async (invoice?: InvoiceProps) => {
    try {
      await request(invoice);
      toast.success('Successfully updated invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error('Error while updating invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return {
    error,
    isLoading,
    data,
    update,
  };
};

export const useDeleteInvoice = () => {
  const { error, isLoading, data, request } = useRequest(async (id: string) => {
    return await newAxios.delete(`/invoices/${id}`);
  });

  const deleteInv = async (id?: string) => {
    try {
      await request(id);
      toast.success('Successfully deleted invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error('Error while deleting invoice', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return {
    error,
    isLoading,
    data,
    deleteInv,
  };
};
