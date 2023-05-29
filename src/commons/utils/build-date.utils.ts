import { format } from 'date-fns';

export const buildDate = (date: Date, pattern = 'MM/yyyy'): string => {
  return format(date, 'MM/yyyy');
};
