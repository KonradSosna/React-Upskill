import { format, isValid, parse, parseISO } from 'date-fns';

import { Recipient, Sender } from '../intefaces/invoices';

export const createArrayFromNumber = (n: number) => Array.from(Array(n).keys());

export const formatDate = (date: string | null) => {
  return date && format(parseISO(date), 'MM/dd/yyyy');
};

export const parseDate = (date: string | null) =>
  date && parse(date, 'MM/dd/yyyy', new Date()).toISOString();

export const isValidDate = (date: Date | string | null) => isValid(date);

export function transformItems(data: any) {
  const items: any[] = [];

  const itemsData = Object.keys(data).filter((key: string) =>
    Number.isInteger(parseInt(key))
  );

  itemsData.forEach((key: string) => {
    const [num, prop] = key.split('-');

    if (!items[+num]) {
      items[+num] = {};
    }
    items[+num][prop] = data[key];
  });

  return items;
}

export function transformUserFields(data: any, path: string) {
  const user: Recipient | Sender = {
    companyName: '',
    city: '',
    street: '',
    postcode: '',
    nip: 0,
    phone: '',
    email: '',
    bankAccount: '',
  };
  Object.keys(data)
    .filter((key: string) => key.includes(path))
    .forEach((key: string) => {
      const [, name] = key.split('-');
      user[name] = data[key];
    });
  return user;
}
