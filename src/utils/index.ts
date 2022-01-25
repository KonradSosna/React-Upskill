import { format, parseISO } from 'date-fns';

export const createArrayFromNumber = (n: number) => Array.from(Array(n).keys());

export const formatDate = (date: string) =>
  format(parseISO(date), 'MM/dd/yyyy');

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
