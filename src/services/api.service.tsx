import axios from 'axios';
import { InvoiceProps } from '../models/Invoice-model';

export const getInvoices = async () => {
  return await axios
    .get('http://localhost:3001/invoices')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getInvoice = async (id: string) => {
  return await axios
    .get('http://localhost:3001/invoices/' + id)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const saveNewInvoice = (invoice: InvoiceProps) => {
  axios
    .post('http://localhost:3001/invoices', invoice)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateInvoice = (invoice: InvoiceProps) => {
  axios
    .put('http://localhost:3001/invoices/' + invoice.id, invoice)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};

export const deleteInvoice = (id: string) => {
  axios
    .delete('http://localhost:3001/invoices/' + id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
