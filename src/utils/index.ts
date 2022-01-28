import { format, parseISO, isValid } from 'date-fns';

export const createArrayFromNumber = (n: number) => Array.from(Array(n).keys());

export const formatDate = (date: string) =>
  format(parseISO(date), 'MM/dd/yyyy');

export const parseDate = (date: Date | string | null) =>
  date ? new Date(date).toISOString() : null;

export const isValidDate = (date: Date | string | null) => {
  return isValid(date);
};
