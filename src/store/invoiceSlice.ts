import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  INVOICE_ITEM_FIELDS,
  INVOICE_USER_FIELDS,
  INVOIEC_NUMBER_FIELD,
} from '../utils/defaultValues';
import validator from '../utils/formValidator';

export interface FormField {
  label: string;
  valid: boolean;
  value: string;
  type: string;
  validationMessage?: string;
  key: string;
}

export interface InvoiceState {
  senderData: FormField[];
  recipientData: FormField[];
  items: FormField[][];
  invoiceNumber: FormField;
  createdDate: string | null;
  validDate: string;
  isFormValid: boolean;
}

function createInitialDates() {
  const createdDate = new Date();
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + 7);

  return {
    createdDate: createdDate.toISOString(),
    validDate: validDate.toISOString(),
  };
}

const { validDate } = createInitialDates();

const initialState: InvoiceState = {
  senderData: INVOICE_USER_FIELDS,
  recipientData: INVOICE_USER_FIELDS,
  items: [],
  invoiceNumber: INVOIEC_NUMBER_FIELD,
  createdDate: null,
  validDate,
  isFormValid: false,
};

function validateField(field: FormField) {
  return (field.valid = validator[field.key](field.value));
}

function updateField(
  list: FormField[],
  payload: { value: string; key: string }
) {
  const field = list.find((item: FormField) => item.key === payload.key);
  if (field) {
    field.value = payload.value;
    field.valid = validateField(field);
  }
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateRecipientField: (
      state,
      action: PayloadAction<{ value: string; key: string }>
    ) => {
      updateField(state.recipientData, action.payload);
    },
    updateSenderField: (
      state,
      action: PayloadAction<{ value: string; key: string }>
    ) => {
      updateField(state.senderData, action.payload);
    },
    addItem: (state) => {
      state.items.push(INVOICE_ITEM_FIELDS);
    },
    removeItem: (state, action: PayloadAction<{ index: number }>) => {
      state.items.splice(action.payload.index, 1);
    },
    updateItem: (
      state,
      action: PayloadAction<{ index: number; value: string; key: string }>
    ) => {
      const list = state.items[action.payload.index];
      updateField(list, action.payload);
    },
    setNumber: (state, action: PayloadAction<{ number: string }>) => {
      state.invoiceNumber.value = action.payload.number;
      state.invoiceNumber.valid = !!action.payload.number;
    },
    setCreatedDate: (state, action: PayloadAction<{ createdDate: string }>) => {
      state.createdDate = action.payload.createdDate;
    },
    setValidDate: (state, action: PayloadAction<{ validDate: string }>) => {
      state.validDate = action.payload.validDate;
    },
    validateForm: (state) => {
      const isRecipientDataValid = state.recipientData
        .map((field: FormField) => {
          if (!field.value) {
            field.valid = false;
          }

          return field;
        })
        .every((field: FormField) => !!field.value);
      const isSenderDataValid = state.senderData
        .map((field: FormField) => {
          if (!field.value) {
            field.valid = false;
          }
          return field;
        })
        .every((field: FormField) => !!field.value);

      state.isFormValid =
        isRecipientDataValid && isSenderDataValid && !!state.createdDate;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateRecipientField,
  updateSenderField,
  addItem,
  removeItem,
  updateItem,
  setNumber,
  setCreatedDate,
  setValidDate,
  validateForm,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
