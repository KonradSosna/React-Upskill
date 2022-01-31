import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  validationMessage: string;
  key: string;
}

export interface InvoiceItem {
  id: number;
  name: string;
  amount: number;
  unit: string;
  tax: number;
  price: number;
}

export interface InvoiceState {
  senderData: FormField[];
  recipientData: FormField[];
  items: FormField[][];
  invoiceNumber: FormField;
  createdDate: string | null;
  validDate: string | null;
  isFormValid: boolean;
  showError: boolean;
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

const { createdDate, validDate } = createInitialDates();

const initialState: InvoiceState = {
  senderData: INVOICE_USER_FIELDS,
  recipientData: INVOICE_USER_FIELDS,
  items: [],
  invoiceNumber: INVOIEC_NUMBER_FIELD,
  createdDate: createdDate,
  validDate: validDate,
  isFormValid: false,
  showError: false,
};

function validateField(field: FormField) {
  return validator[field.key]
    ? validator[field.key](field.value)
    : validator.default(field.value);
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

function validateFormFieldList(list: FormField[]) {
  return list
    .map((field: FormField) => {
      if (!field.value) {
        field.valid = false;
      }
      return field;
    })
    .every((field: FormField) => !!field.value);
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
    setCreatedDate: (state, action: PayloadAction<{ createdDate: any }>) => {
      state.createdDate = action.payload.createdDate;
    },
    setValidDate: (state, action: PayloadAction<{ validDate: any }>) => {
      state.validDate = action.payload.validDate;
    },
    validateForm: (state) => {
      const isRecipientDataValid = validateFormFieldList(state.recipientData);
      const isSenderDataValid = validateFormFieldList(state.senderData);

      if (!state.invoiceNumber.value) {
        state.invoiceNumber.valid = false;
      }

      const itemsAreValid = state.items.length
        ? state.items.every((list: FormField[]) => validateFormFieldList(list))
        : false;

      state.showError = true;

      state.isFormValid =
        isRecipientDataValid &&
        isSenderDataValid &&
        itemsAreValid &&
        !!state.createdDate &&
        !!state.validDate &&
        !!state.invoiceNumber.value &&
        !!state.items.length;
    },
    setShowError: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showError = action.payload.show;
    },
  },
});

const selectors = {
  selectCreatedDate: createSelector(
    (state: InvoiceState) => state.createdDate,
    (dateAsString: string | null) =>
      dateAsString ? new Date(dateAsString) : null
  ),
  selectValidDate: createSelector(
    (state: InvoiceState) => state.validDate,
    (dateAsString: string | null) =>
      dateAsString ? new Date(dateAsString) : null
  ),
  selectRecipient: createSelector(
    (state: InvoiceState) => state.recipientData,
    (list: FormField[]) => {
      const recipient: { [key: string]: string } = {};
      list.forEach((item: FormField) => {
        recipient[item.key] = item.value;
      });
      return recipient;
    }
  ),
  selectSender: createSelector(
    (state: InvoiceState) => state.senderData,
    (list: FormField[]) => {
      const sender: { [key: string]: string } = {};
      list.forEach((item: FormField) => {
        sender[item.key] = item.value;
      });
      return sender;
    }
  ),
  selectItems: createSelector(
    (state: InvoiceState) => state.items,
    (items: FormField[][]) => {
      const newItems: InvoiceItem[] = [];
      items.forEach((list: FormField[], index: number) => {
        const [name, amount, unit, tax, price] = list;
        newItems.push({
          id: index,
          name: name.value,
          amount: +amount.value,
          unit: unit.value,
          tax: +tax.value,
          price: +price.value,
        });
        return newItems;
      });
    }
  ),
};

export const {
  selectCreatedDate,
  selectItems,
  selectRecipient,
  selectSender,
  selectValidDate,
} = selectors;

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
  setShowError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
