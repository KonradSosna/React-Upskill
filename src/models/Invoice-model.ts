export type Invoice = {
  id: string;
  no: string;
  createdDate: string;
  validUntilDate: string;
  amount: string;
};

export type InvoiceCompanyProps = {
  id: string;
  name: string;
  city: string;
  street: string;
  postcode: string;
  nip: string;
  phone: string;
  mail: string;
  bankAccount: string;
};

export type InvoiceItemProps = {
  id: string;
  name?: string;
  amount?: string;
  unit?: string;
  tax?: string;
  price?: string;
};

export type InvoiceProps = {
  id?: string;
  number?: string;
  createdDate?: string;
  validDate?: string;
  recipient?: InvoiceCompanyProps;
  sender?: InvoiceCompanyProps;
  items?: InvoiceItemProps[];
};

export enum CompanyType {
  SENDER = 'sender',
  RECIPIENT = 'recipient',
}
