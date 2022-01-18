import { format, parseISO } from 'date-fns';

export const createArrayFromNumber = (n: number) => Array.from(Array(n).keys());

export const formatDate = (date: string) =>
  format(parseISO(date), 'MM/dd/yyyy');
