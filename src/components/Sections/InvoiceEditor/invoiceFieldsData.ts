import { CompanyType } from '../../../models/Invoice-model';

export const invoiceFields = (type: CompanyType) => {
  return [
    {
      label: 'Company name',
      registerNames: `${type}.name`,
      type: 'text',
    },
    {
      label: 'City',
      registerNames: `${type}.city`,
      type: 'text',
    },
    {
      label: 'Street',
      registerNames: `${type}.street`,
      type: 'text',
    },
    {
      label: 'Postcode',
      registerNames: `${type}.postcode`,
      type: 'text',
    },
    {
      label: 'Nip',
      registerNames: `${type}.nip`,
      type: 'text',
    },
    {
      label: 'Phone',
      registerNames: `${type}.phone`,
      type: 'tel',
    },
    {
      label: 'Mail',
      registerNames: `${type}.mail`,
      type: 'email',
    },
    {
      label: 'Bank account',
      registerNames: `${type}.bankAccount`,
      type: 'text',
    },
  ];
};
