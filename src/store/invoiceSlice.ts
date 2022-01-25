import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_FORM_STATE = [
  {
    label: 'Company Name',
    valid: true,
    value: 'eee',
    key: 'companyName',
  },
  {
    label: 'City',
    value: '',
    valid: true,
    key: 'city',
  },
  {
    label: 'Street',
    value: '',
    valid: true,
    key: 'street',
  },
  {
    label: 'Postcode',
    value: '',
    valid: true,
    key: 'postcode',
  },
  {
    label: 'NIP',
    value: '',
    valid: true,
    type: 'number',
    key: 'nip',
  },
  {
    label: 'Tel',
    value: '',
    valid: true,
    key: 'phone',
  },
  {
    label: 'E-mail',
    value: '',
    valid: true,
    type: 'email',
    key: 'email',
  },
  {
    label: 'Bank account',
    value: '',
    valid: true,
    key: 'bankAccount',
  },
];

const ITEM_ROW = [
  {
    label: 'name',
    value: '',
    valid: true,
    key: 'name',
  },
  {
    label: 'amount',
    value: '',
    valid: true,
    type: 'number',
    key: 'amount',
  },
  {
    label: 'unit',
    value: '',
    valid: true,
    key: 'unit',
  },
  {
    label: 'tax',
    value: '',
    valid: true,
    type: 'number',
    key: 'number',
  },
  {
    label: 'price',
    value: '',
    valid: true,
    type: 'number',
    key: 'price',
  },
];

export interface FormField {
  label: string;
  valid: boolean;
  value: string;
  type?: string;
  validationMessage?: string;
  key: string;
}

export interface InvoiceState {
  senderData: FormField[];
  recipientData: FormField[];
  items: FormField[][];
}

const initialState: InvoiceState = {
  senderData: INITIAL_FORM_STATE,
  recipientData: INITIAL_FORM_STATE,
  items: [],
};

function updateField(
  list: FormField[],
  payload: { value: string; key: string }
) {
  let field = list.find((item: FormField) => item.label === payload.key);
  if (field) {
    field.value = payload.value;
    field.valid = !!payload.value;
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
      state.items.push(ITEM_ROW);
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
  },
});

// Action creators are generated for each case reducer function
export const {
  updateRecipientField,
  updateSenderField,
  addItem,
  removeItem,
  updateItem,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
