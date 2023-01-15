export const mockData = [
  {
    id: '1',
    no: 'Invoice 1',
    createdDate: '2022-11-30T23:00:00.000Z',
    validUntilDate: '2022-12-22T22:59:44.000Z',
    amount: '100',
  },
  {
    id: '2',
    no: 'Invoice 2',
    createdDate: '2022-11-30T23:00:00.000Z',
    validUntilDate: '2022-12-22T22:59:44.000Z',
    amount: '200',
  },
];

export const mockInvoice = {
  id: '1',
  number: '',
  recipient: {
    name: 'companyName',
    city: 'companyName',
    street: 'companyName',
    postalCode: '',
    nip: 'companyName',
    phone: 'companyName',
    mail: 'v@wp.pl',
    bankAccount: 'companyName',
    postcode: 'v',
  },
  sender: {
    name: 'companyName',
    city: 'companyName',
    street: 'companyName',
    postalCode: '',
    nip: 'companyName',
    phone: 'companyName',
    mail: 'companyName@wp.pl',
    bankAccount: 'companyName',
    postcode: 'companyName',
  },
  items: [],
  no: '1234',
  createdDate: '2023-01-05T20:40:43.000Z',
  validUntilDate: '2023-01-13T20:40:43.000Z',
  item: [],
};
