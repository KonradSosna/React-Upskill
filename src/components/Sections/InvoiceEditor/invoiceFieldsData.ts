import { CompanyType } from '../../../models/Invoice-model';

export const invoiceFields = [
  {
    label: 'Company name',
    registerNames: `name`,
    type: 'text',
  },
  {
    label: 'City',
    registerNames: `city`,
    type: 'text',
  },
  {
    label: 'Street',
    registerNames: `street`,
    type: 'text',
  },
  {
    label: 'Postcode',
    registerNames: `postcode`,
    type: 'text',
  },
  {
    label: 'Nip',
    registerNames: `nip`,
    type: 'text',
  },
  {
    label: 'Phone',
    registerNames: `phone`,
    type: 'tel',
  },
  {
    label: 'Mail',
    registerNames: `mail`,
    type: 'email',
  },
  {
    label: 'Bank account',
    registerNames: `bankAccount`,
    type: 'text',
  },
];
