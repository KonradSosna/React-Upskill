export interface Headers {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

export interface FormDates {
  created: any;
  valid: any;
}
export interface FormField {
  rules: any;
  label: string;
  valid: boolean;
  value: string;
  type: string;
  key: string;
}

export interface Recipient {
  companyName: string;
  city: string;
  street: string;
  postcode: string;
  nip: number | string;
  phone: string;
  email: string;
  bankAccount: string;
  [key: string]: string | number;
}

export interface Sender extends Recipient {}

export interface Item {
  id: string;
  name: string;
  amount: number | string;
  unit: string;
  tax: number | string;
  price: number | string;
}
export interface Invoice {
  id: string;
  number: string;
  createdDate: string | null;
  validDate: string | null;
  recipient: Recipient;
  sender: Sender;
  items: Item[];
}
