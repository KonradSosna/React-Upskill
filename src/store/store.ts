import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const store = configureStore({
  reducer: {
    invoiceList: invoiceSlice.reducer,
  },
});
