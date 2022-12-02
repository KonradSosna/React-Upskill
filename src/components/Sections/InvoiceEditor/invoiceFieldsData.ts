import { CompanyType } from '../../../models/Invoice-model';

export const invoiceFields = (type: CompanyType) => {
  return [
    {
      label: 'Company name',
      registerNames: `${type}.name`,
    },
    {
      label: 'City',
      registerNames: `${type}.city`,
    },
    {
      label: 'Street',
      registerNames: `${type}.street`,
    },
    {
      label: 'Postcode',
      registerNames: `${type}.postcode`,
    },
    {
      label: 'Nip',
      registerNames: `${type}.nip`,
    },
    {
      label: 'Phone',
      registerNames: `${type}.phone`,
    },
    {
      label: 'Mail',
      registerNames: `${type}.mail`,
    },
    {
      label: 'Bank account',
      registerNames: `${type}.bankAccount`,
    },
  ];
};
