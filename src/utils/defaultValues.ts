import * as yup from 'yup';

import { FormField } from '../hooks/useInvoice';
import { regexpValidation } from './validations';

export const INVOICE_USER_FIELDS = [
  {
    label: 'invoice.form.companyName',
    valid: true,
    value: '',
    key: 'companyName',
    type: 'text',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.city',
    value: '',
    valid: true,
    key: 'city',
    type: 'text',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.street',
    value: '',
    valid: true,
    key: 'street',
    type: 'text',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.postCode',
    value: '',
    valid: true,
    key: 'postcode',
    type: 'text',
    rules: yup
      .string()
      .required()
      .matches(regexpValidation.postcode, 'post code is incorrect'),
  },
  {
    label: 'invoice.form.nip',
    value: '',
    valid: true,
    type: 'number',
    key: 'nip',
    rules: yup.string().min(10).max(10).required(),
  },
  {
    label: 'invoice.form.phone',
    value: '',
    valid: true,
    key: 'phone',
    type: 'text',
    rules: yup
      .string()
      .required()
      .matches(regexpValidation.phoneNumber, 'phone number is incorrect'),
  },
  {
    label: 'invoice.form.email',
    value: '',
    valid: true,
    type: 'email',
    key: 'email',
    rules: yup.string().required().email(),
  },
  {
    label: 'invoice.form.bankAccount',
    value: '',
    valid: true,
    key: 'bankAccount',
    type: 'text',
    rules: yup
      .string()
      .required()
      .matches(
        regexpValidation.bankAccountNumber,
        'bank account number is incorrect'
      ),
  },
];

export const INVOICE_ITEM_FIELDS = [
  {
    label: 'invoice.form.name',
    value: '',
    valid: true,
    key: 'name',
    type: 'text',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.amount',
    value: '',
    valid: true,
    type: 'number',
    key: 'amount',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.unit',
    value: '',
    valid: true,
    key: 'unit',
    type: 'text',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.tax',
    value: '',
    valid: true,
    type: 'number',
    key: 'tax',
    rules: yup.string().required(),
  },
  {
    label: 'invoice.form.price',
    value: '',
    valid: true,
    type: 'number',
    key: 'price',
    rules: yup.string().required(),
  },
];

export const INVOIEC_NUMBER_FIELD = {
  label: 'invoice.form.no',
  value: '',
  valid: true,
  key: 'number',
  type: 'text',
  rules: yup.string().required(),
};

export function createInitialDates() {
  const createdDate = new Date();
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + 7);

  return {
    createdDate,
    validDate,
  };
}

export function createValidationSchema() {
  const validationSchema: any = {
    number: INVOIEC_NUMBER_FIELD.rules,
  };
  INVOICE_USER_FIELDS.forEach((field: FormField) => {
    validationSchema[`sender-${field.key}`] = field.rules;
    validationSchema[`recipient-${field.key}`] = field.rules;
  });
  return validationSchema;
}
