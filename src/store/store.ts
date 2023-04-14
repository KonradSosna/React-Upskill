import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Invoice } from '../intefaces/invoices';

import { InvoiceState } from './types';

const initialState: InvoiceState = {
  theme: 'light',
};

const invoiceSlice = createSlice({
  name: 'invoiceList',
  initialState: initialState,
  reducers: {
    setTheme: (
      state: InvoiceState,
      action: PayloadAction<'light' | 'dark'>
    ) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = invoiceSlice.actions;

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => 'invoices',
    }),
    getInvoice: builder.query<Invoice, string>({
      query: (index) => `invoices/${index}`,
    }),
    updateInvoice: builder.mutation<Invoice, Invoice>({
      query: (invoice) => ({
        url: `invoices/${invoice.id}`,
        method: 'PUT',
        body: invoice,
      }),
    }),
    addInvoice: builder.mutation<Invoice, Invoice>({
      query: (invoice) => ({
        url: 'invoices',
        method: 'POST',
        body: invoice,
      }),
    }),
    deleteInvoice: builder.mutation<Invoice, string>({
      query: (id) => ({
        url: `invoices/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// export const store = configureStore({
//   reducer: {
//     [invoicesApi.reducerPath]: invoicesApi.reducer,
//     invoiceList: invoiceSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(invoicesApi.middleware),
// });

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      [invoicesApi.reducerPath]: invoicesApi.reducer,
      invoiceList: invoiceSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(invoicesApi.middleware),
  });
};
