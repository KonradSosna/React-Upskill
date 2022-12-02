import { format } from 'date-fns';

export const formatDate = (date: string) => {
  return date === null
    ? 'wrong date'
    : date === ''
    ? 'wrong date'
    : format(new Date(date), 'dd/MM/yyyy');
};
